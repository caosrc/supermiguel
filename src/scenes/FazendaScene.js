class FazendaScene extends Phaser.Scene {
    constructor() {
        super('FazendaScene');
    }

    init(data) {
        this.saveData = data.save || SaveSystem.defaultData();
    }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 2400;

        this.stats = {
            pontos:         this.saveData.pontos || 0,
            moedas:         this.saveData.moedas || 0,
            fase:           this.saveData.fase   || 5,
            energia:        100,
            saude:          100,
            fome:           100,
            sono:           100,
            amizadeFamilia: this.saveData.amizadeFamilia || 0,
            animaisAlimentados: 0
        };

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createAnimals(height);
        this._createCollectibles(height);
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud = new HUDSystem(this);

        this._startStatDecay();

        this.dialog.show(
            'Bem-vindo à Fazenda dos Avós em Resende Costa! Ajude a família e cuide dos animais!',
            'Narrador',
            4500
        );

        const backBtn = this.add.text(this.WORLD_WIDTH - 20, 20, '⬅ Lagoa Dourada', {
            fontSize: '17px',
            fill: '#FFFFFF',
            backgroundColor: '#000000AA',
            padding: { x: 10, y: 6 }
        }).setOrigin(1, 0).setScrollFactor(1).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => {
            this._saveAndExit();
        });

        this._startMissions();
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87CEEB, 0xFAD7A0, 0xF0E68C, 0x87CEEB, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height - 100);
        sky.setScrollFactor(0.15);

        for (let i = 0; i < 8; i++) {
            this.add.image(
                180 + i * 300 + Phaser.Math.Between(-30, 30),
                Phaser.Math.Between(30, 100),
                'cloud'
            ).setAlpha(0.75).setScrollFactor(0.3);
        }

        this.platforms = this.physics.add.staticGroup();

        const groundY = height - 20;
        const ground = this.platforms.create(this.WORLD_WIDTH / 2, groundY, 'ground_farm');
        ground.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const grPath = this.add.graphics();
        grPath.fillStyle(0xC4A882);
        grPath.fillRect(0, height - 60, this.WORLD_WIDTH, 30);
        grPath.fillStyle(0xD4B892);
        for (let x = 0; x < this.WORLD_WIDTH; x += 60) {
            grPath.fillRect(x, height - 60, 30, 30);
        }

        const platformDefs = [
            { x: 350,  y: height - 130, w: 140 },
            { x: 680,  y: height - 160, w: 110 },
            { x: 1020, y: height - 145, w: 130 },
            { x: 1380, y: height - 170, w: 100 },
            { x: 1720, y: height - 150, w: 140 },
            { x: 2060, y: height - 165, w: 110 },
        ];
        platformDefs.forEach(({ x, y, w }) => {
            const p = this.platforms.create(x, y, 'platform2');
            p.setScale(w / 100, 1).refreshBody();
        });

        const houseDefs = [
            { x: 200,  key: 'fazenda', y: height - 148 },
            { x: 600,  key: 'house',   y: height - 148 },
            { x: 1100, key: 'house2',  y: height - 148 },
            { x: 1700, key: 'fazenda', y: height - 148 },
            { x: 2200, key: 'house3',  y: height - 148 },
        ];
        houseDefs.forEach(({ x, key, y }) => this.add.image(x, y, key).setScale(1.15));

        for (let i = 0; i < 16; i++) {
            this.add.image(80 + i * 150, height - 115, 'tree').setScale(0.75 + Math.random() * 0.3);
        }
        for (let i = 0; i < 20; i++) {
            this.add.image(60 + i * 120, height - 72, 'bush').setScale(0.8 + Math.random() * 0.2);
        }

        const pond = this.add.graphics();
        pond.fillStyle(0x4FC3F7, 0.85);
        pond.fillEllipse(1400, height - 55, 180, 50);
        pond.lineStyle(3, 0x1976D2, 0.7);
        pond.strokeEllipse(1400, height - 55, 180, 50);
        this.add.text(1400, height - 68, '🌊 Lago', { fontSize: '13px', fill: '#1976D2' }).setOrigin(0.5);
    }

    _createPlayer(height) {
        this.player = this.physics.add.sprite(120, height - 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);
        this.player.setDepth(10);
        this.playerShadow = this.add.ellipse(0, 0, 30, 8, 0x000000, 0.2);
        this.playerShadow.setDepth(9);
    }

    _createNPCs(height) {
        this.npcs = [];
        const npcDefs = [
            {
                key: 'avo', x: 280, y: height - 90,
                dialog: () => ['Avó Maria: Que bom te ver! Quer ajudar a regar as plantas?', 'Avó Maria'],
                onInteract: (stats) => { stats.amizadeFamilia += 10; stats.fome = Math.min(100, stats.fome + 25); return 15; }
            },
            {
                key: 'pai', x: 750, y: height - 90,
                dialog: () => ['Avô João: Vamos cuidar das galinhas juntos! Os animais precisam de nós!', 'Avô João'],
                onInteract: (stats) => { stats.amizadeFamilia += 8; return 12; }
            },
            {
                key: 'mae', x: 1300, y: height - 90,
                dialog: () => ['Mãe: Que fazenda bonita! Não se esqueça de beber água no calor!', 'Mãe'],
                onInteract: (stats) => { stats.energia = Math.min(100, stats.energia + 10); return 10; }
            },
            {
                key: 'primo', x: 1900, y: height - 90,
                dialog: () => ['Primo Lucas: Vamos empinar pipa? É muito divertido!', 'Primo Lucas'],
                onInteract: (stats) => { stats.energia = Math.min(100, stats.energia + 8); return 12; }
            },
            {
                key: 'professora', x: 2300, y: height - 90,
                dialog: () => ['Tia Ana: Sempre respeite os animais da fazenda!', 'Tia Ana'],
                onInteract: (stats) => { return 10; }
            },
        ];

        npcDefs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key);
            npc.setDepth(8);
            npc.npcData = def;
            this.tweens.add({
                targets: npc,
                y: def.y - 6,
                duration: 1400 + Phaser.Math.Between(-200, 200),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            const bubble = this.add.text(def.x, def.y - 55, '💬', { fontSize: '18px' }).setDepth(9);
            this.tweens.add({ targets: bubble, alpha: 0.3, duration: 900, yoyo: true, repeat: -1 });
            npc.bubble = bubble;
            this.npcs.push(npc);
        });
    }

    _createAnimals(height) {
        this.animals = [];
        const animalDefs = [
            { x: 500,  y: height - 88, key: 'cachorro' },
            { x: 900,  y: height - 88, key: 'galinha'  },
            { x: 1100, y: height - 88, key: 'galinha'  },
            { x: 1500, y: height - 88, key: 'cachorro' },
            { x: 1800, y: height - 88, key: 'galinha'  },
        ];

        animalDefs.forEach((def, i) => {
            const animal = this.physics.add.image(def.x, def.y, def.key);
            animal.setCollideWorldBounds(true);
            animal.setDepth(9);
            animal.fed = false;
            animal.animalIdx = i;

            const labelMap = { cachorro: 'Bidu', galinha: 'Galinha' };
            const label = this.add.text(def.x, def.y - 40, labelMap[def.key] || def.key, {
                fontSize: '12px', fill: '#333333', backgroundColor: '#FFFFFFAA',
                padding: { x: 4, y: 2 }
            }).setDepth(10).setOrigin(0.5);
            animal.label = label;

            this.tweens.add({
                targets: animal,
                x: def.x + Phaser.Math.Between(-60, 60),
                duration: Phaser.Math.Between(1500, 3000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.animals.push(animal);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins = this.physics.add.staticGroup();

        const items = [
            { key: 'agua',   x: 400,  y: height - 90, type: 'agua'   },
            { key: 'comida', x: 650,  y: height - 90, type: 'comida' },
            { key: 'agua',   x: 1050, y: height - 90, type: 'agua'   },
            { key: 'suco',   x: 1250, y: height - 90, type: 'suco'   },
            { key: 'comida', x: 1650, y: height - 90, type: 'comida' },
            { key: 'remedio',x: 2000, y: height - 90, type: 'remedio'},
            { key: 'cama',   x: 2200, y: height - 90, type: 'cama'   },
            { key: 'bola',   x: 850,  y: height - 95, type: 'bola'   },
        ];
        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key);
            obj.itemType = item.type;
            obj.setDepth(8);
            this.tweens.add({
                targets: obj,
                y: item.y - 9,
                duration: 950 + Phaser.Math.Between(-100, 100),
                yoyo: true,
                repeat: -1
            });
        });

        const coinPositions = [320, 480, 720, 960, 1140, 1400, 1580, 1820, 2060, 2180, 2300];
        coinPositions.forEach(x => {
            const coin = this.coins.create(x, height - 155, 'moeda');
            coin.setDepth(7);
            this.tweens.add({ targets: coin, angle: 360, duration: 1200, repeat: -1 });
        });
    }

    _setupCamera(width, height) {
        this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, height);
    }

    _setupControls() {
        this.cursors  = this.input.keyboard.createCursorKeys();
        this.keyZ     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.touchState = { left: false, right: false, jump: false, action: false };
    }

    _setupTouchControls() {
        const addTouch = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchState[key] = true; }, { passive: false });
            el.addEventListener('touchend',   (e) => { e.preventDefault(); this.touchState[key] = false; }, { passive: false });
            el.addEventListener('mousedown',  () => { this.touchState[key] = true; });
            el.addEventListener('mouseup',    () => { this.touchState[key] = false; });
        };
        addTouch('btn-esquerda', 'left');
        addTouch('btn-direita',  'right');
        addTouch('btn-pular',    'jump');
        addTouch('btn-acao',     'action');
    }

    _setupCollisions() {
        this.physics.add.collider(this.player, this.platforms);
        this.animals.forEach(a => this.physics.add.collider(a, this.platforms));

        this.physics.add.overlap(this.player, this.collectibles, this._onCollectItem, null, this);
        this.physics.add.overlap(this.player, this.coins, this._onCoin, null, this);

        this.npcs.forEach(npc => {
            this.physics.add.overlap(this.player, npc, () => this._onNPCOverlap(npc), null, this);
        });

        this.animals.forEach(animal => {
            this.physics.add.overlap(this.player, animal, () => this._onAnimalOverlap(animal), null, this);
        });
    }

    _onCollectItem(player, item) {
        const type = item.itemType;
        item.destroy();
        let msg = '', pts = 0;
        switch (type) {
            case 'agua':
                this.stats.energia = Math.min(100, this.stats.energia + 15);
                this.stats.saude   = Math.min(100, this.stats.saude + 5);
                msg = 'Água fresquinha da fazenda! Beber água é muito importante!';
                pts = 10;
                break;
            case 'comida':
                this.stats.fome    = Math.min(100, this.stats.fome + 30);
                this.stats.energia = Math.min(100, this.stats.energia + 10);
                msg = 'Pão de queijo da avó! Uma delícia mineira!';
                pts = 15;
                break;
            case 'suco':
                this.stats.fome    = Math.min(100, this.stats.fome + 12);
                msg = 'Suco de fruta natural da fazenda!';
                pts = 8;
                break;
            case 'remedio':
                this.stats.saude = Math.min(100, this.stats.saude + 20);
                msg = 'Remédio tomado! Sempre com ajuda dos adultos!';
                pts = 15;
                break;
            case 'cama':
                this.stats.energia = 100;
                this.stats.sono    = 100;
                msg = 'Descansou na casa dos avós! Que sono gostoso!';
                pts = 20;
                break;
            case 'bola':
                this.stats.energia = Math.min(100, this.stats.energia + 8);
                msg = 'Brincando no quintal com os primos!';
                pts = 10;
                break;
        }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnCollectParticles(player.x, player.y);
    }

    _onCoin(player, coin) {
        coin.destroy();
        this.stats.moedas += 1;
        this.stats.pontos += 2;
        this._spawnCollectParticles(player.x, player.y, 0xFFD700);
    }

    _onNPCOverlap(npc) {
        if (this.interacting) return;
        this.interacting = true;
        const def = npc.npcData;
        const [msg, speaker] = def.dialog(this.stats);
        const pts = def.onInteract(this.stats);
        this.stats.pontos += pts;
        this.dialog.show(msg, speaker, 3200);
        this.time.delayedCall(4000, () => { this.interacting = false; });
    }

    _onAnimalOverlap(animal) {
        if (animal.fed || this.interacting) return;
        this.interacting = true;
        animal.fed = true;
        this.stats.animaisAlimentados++;
        this.stats.pontos += 12;
        this.stats.amizadeFamilia += 5;

        const msgs = {
            cachorro: 'Você alimentou o Bidu! Cuidar dos animais é muito importante!',
            galinha: 'Você alimentou as galinhas! Elas agradecem!'
        };
        const msg = msgs[animal.texture.key] || 'Você cuidou do animal!';
        this.dialog.show(msg, null, 2800);

        animal.setTint(0x00FF88);
        if (animal.label) {
            animal.label.setStyle({ fill: '#007700', backgroundColor: '#AAFFAAAA' });
            animal.label.setText('✓ ' + animal.label.text);
        }

        this._spawnCollectParticles(animal.x, animal.y, 0x00FF88);
        this.time.delayedCall(3500, () => { this.interacting = false; });

        if (this.stats.animaisAlimentados >= 3) {
            this.time.delayedCall(1000, () => {
                this.dialog.show('Parabéns! Você cuidou de todos os animais da fazenda!', 'Narrador', 4000);
                this.stats.pontos += 50;
                this._showFaseEffect();
            });
        }
    }

    _startStatDecay() {
        this.time.addEvent({
            delay: 2500,
            loop: true,
            callback: () => {
                this.stats.fome    = Math.max(0, this.stats.fome    - 1);
                this.stats.sono    = Math.max(0, this.stats.sono    - 0.5);
                this.stats.energia = Math.max(0, this.stats.energia - 0.3);
                if (this.stats.fome < 20 && !this.dialog.isVisible) {
                    this.dialog.show('Está com fome! A avó tem pão de queijo esperando!', null, 2500);
                }
            }
        });
    }

    _startMissions() {
        this.time.delayedCall(8000, () => {
            if (!this.dialog.isVisible) {
                this.dialog.show('Missão: Alimente os animais da fazenda!', 'Narrador', 3000);
            }
        });
    }

    _spawnCollectParticles(x, y, color) {
        const key = color === 0xFFD700 ? 'particle_yellow' : 'particle_green';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, key).setDepth(20);
            this.tweens.add({
                targets: p,
                x: x + Phaser.Math.Between(-50, 50),
                y: y + Phaser.Math.Between(-60, -10),
                alpha: 0,
                duration: 600,
                onComplete: () => p.destroy()
            });
        }
    }

    _showFaseEffect() {
        const { width, height } = this.scale;
        const flash = this.add.graphics();
        flash.fillStyle(0xFFFFFF, 1);
        flash.fillRect(0, 0, width, height);
        flash.setScrollFactor(0).setDepth(200);
        this.tweens.add({ targets: flash, alpha: 0, duration: 800, onComplete: () => flash.destroy() });
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 60, () => {
                const star = this.add.image(
                    this.player.x + Phaser.Math.Between(-100, 100),
                    this.player.y + Phaser.Math.Between(-80, 80),
                    'estrela'
                ).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).setDepth(150);
                this.tweens.add({ targets: star, alpha: 0, y: star.y - 60, duration: 900, onComplete: () => star.destroy() });
            });
        }
    }

    _saveAndExit() {
        SaveSystem.save({
            pontos: this.stats.pontos,
            moedas: this.stats.moedas,
            fase: this.stats.fase,
            amizadeFamilia: this.stats.amizadeFamilia,
            cidadesVisitadas: ['Lagoa Dourada', 'Resende Costa'],
            medalhas: this.saveData.medalhas || []
        });
        this.scene.start('MenuScene');
    }

    update() {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        const walk = 200, run = 360;
        let vx = 0;
        if (left)  { vx = -(shift ? run : walk); this.player.setFlipX(true); }
        if (right) { vx =  (shift ? run : walk); this.player.setFlipX(false); }
        this.player.setVelocityX(vx);
        if (up && onGround) this.player.setVelocityY(-500);

        this.playerShadow.setPosition(this.player.x, this.player.body.bottom + 4);

        this.animals.forEach(a => {
            if (a.label) a.label.setPosition(a.x, a.y - 44);
        });

        this.hud.update(this.stats);
    }

    shutdown() {
        if (this.hud) this.hud.destroy();
        if (this.dialog) this.dialog.destroy();
    }
}
