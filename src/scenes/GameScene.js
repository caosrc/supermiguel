class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    init(data) { this.saveData = data.save || SaveSystem.defaultData(); }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 3200;

        this.stats = {
            pontos: this.saveData.pontos, moedas: this.saveData.moedas,
            fase: this.saveData.fase, energia: 100, saude: 100, fome: 100, sono: 100,
            amizadeFamilia: this.saveData.amizadeFamilia || 0
        };
        this.playerState = { onBike: false, interacting: false, hasHelmet: false, hasTenis: false, tenisTimer: 0 };

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createCollectibles(height);
        this._createObstacles(height);
        this._createCars();
        this._createEnemies(height);
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud    = new HUDSystem(this);
        this._startStatDecay();
        this._setupAutoSave();
        this._checkFaseProgress();

        this.dialog.show('Bem-vindo a Lagoa Dourada! Explore a cidade, ajude a família e aprenda!', 'Narrador', 4000);

        const backBtn = this.add.text(20, 20, '🗺️ Mapa', {
            fontSize: '17px', fill: '#FFFFFF', backgroundColor: '#00000099', padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => this._saveAndExit());
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x4FC3F7, 0x4FC3F7, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height - 100);
        sky.setScrollFactor(0.1);

        const cityBg = this.add.graphics().setScrollFactor(0.25);
        cityBg.fillStyle(0xAAAAAA, 0.4);
        for (let x = 0; x < this.WORLD_WIDTH; x += 120) {
            const bh = Phaser.Math.Between(80, 200);
            cityBg.fillRect(x + 10, height - 60 - bh, 80, bh);
            cityBg.fillStyle(0xFFFF88, 0.3);
            for (let wy = height - 60 - bh + 10; wy < height - 70; wy += 20) {
                for (let wx = x + 16; wx < x + 80; wx += 18) cityBg.fillRect(wx, wy, 8, 10);
            }
            cityBg.fillStyle(0xAAAAAA, 0.4);
        }

        for (let i = 0; i < 14; i++) {
            const cl = this.add.image(150 + i * 230 + Phaser.Math.Between(-40, 40), Phaser.Math.Between(30, 120), 'cloud')
                .setAlpha(0.85).setScrollFactor(Phaser.Math.FloatBetween(0.2, 0.5));
            this.tweens.add({ targets: cl, x: cl.x + Phaser.Math.Between(20, 60), duration: Phaser.Math.Between(6000, 12000), yoyo: true, repeat: -1 });
        }

        this.platforms = this.physics.add.staticGroup();

        const groundY = height - 20;
        const ground = this.platforms.create(this.WORLD_WIDTH / 2, groundY, 'ground');
        ground.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const sidewalkY = height - 60;
        const sidewalk = this.platforms.create(this.WORLD_WIDTH / 2, sidewalkY, 'sidewalk');
        sidewalk.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const platformDefs = [
            { x: 300,  y: height - 130, w: 140 }, { x: 560,  y: height - 170, w: 110 },
            { x: 820,  y: height - 140, w: 140 }, { x: 1080, y: height - 190, w: 100 },
            { x: 1340, y: height - 150, w: 140 }, { x: 1600, y: height - 180, w: 110 },
            { x: 1860, y: height - 145, w: 140 }, { x: 2100, y: height - 195, w: 100 },
            { x: 2360, y: height - 155, w: 140 }, { x: 2620, y: height - 175, w: 110 },
            { x: 2880, y: height - 148, w: 140 },
        ];
        platformDefs.forEach(({ x, y, w }) => {
            const p = this.platforms.create(x, y, 'platform');
            p.setScale(w / 140, 1).refreshBody();
        });

        const houseDefs = [
            { x: 180,  key: 'house'  }, { x: 430,  key: 'house2' }, { x: 700,  key: 'house'  },
            { x: 960,  key: 'house3' }, { x: 1220, key: 'house'  }, { x: 1500, key: 'house2' },
            { x: 1760, key: 'house3' }, { x: 2020, key: 'house'  }, { x: 2280, key: 'house2' },
            { x: 2550, key: 'house3' }, { x: 2820, key: 'house'  }, { x: 3060, key: 'house2' },
        ];
        houseDefs.forEach(({ x, key }) => this.add.image(x, height - 148, key).setScale(1.1));

        [250, 500, 750, 1050, 1300, 1550, 1850, 2150, 2400, 2700, 2950].forEach(x => this.add.image(x, height - 120, 'tree').setScale(0.85));
        [350, 650, 900, 1150, 1420, 1680, 1940, 2200, 2460, 2720, 2980].forEach(x => this.add.image(x, height - 72, 'bush').setScale(0.9));

        this.add.image(900, height - 100, 'semaforo').setScale(0.85);
        this.add.image(1800, height - 100, 'semaforo').setScale(0.85);
        this.add.image(2700, height - 100, 'semaforo').setScale(0.85);
        this.add.image(900,  height - 44, 'faixa').setAlpha(0.8);
        this.add.image(1800, height - 44, 'faixa').setAlpha(0.8);

        const road = this.add.graphics();
        road.fillStyle(0x555555);
        road.fillRect(0, height - 58, this.WORLD_WIDTH, 28);
        road.fillStyle(0xFFFF00);
        for (let i = 0; i < this.WORLD_WIDTH; i += 80) road.fillRect(i, height - 46, 40, 4);

        const checkpoint = this.platforms.create(3140, height - 55, 'checkpoint');
        checkpoint.refreshBody();
        this.checkpointX = 3140;
    }

    _createPlayer(height) {
        this.player = this.physics.add.sprite(120, height - 95, 'miguel', 1);
        this.player.setCollideWorldBounds(true).setBounce(0.05).setDepth(10).setScale(0.18);
        this.player.setCrop(0, 100, 256, 284);
        this.player.body.setSize(90, 200, false);
        this.player.body.setOffset(83, 100);
        this.player.play('miguel_parado');
        this.playerShadow = this.add.ellipse(0, 0, 32, 8, 0x000000, 0.25).setDepth(9);
    }

    _createNPCs(height) {
        this.npcs = [];
        const npcDefs = [
            { key: 'pai', x: 320, y: height - 90,
              dialog: s => s.fase >= 2 ? ['Pai: Parabéns por atravessar a rua direito!', 'Pai'] : ['Pai: Filho, ande sempre na calçada!', 'Pai'],
              onInteract: s => { s.amizadeFamilia += 5; return 8; } },
            { key: 'mae', x: 600, y: height - 90,
              dialog: s => s.saude < 50 ? ['Mãe: Você está doente? Tome o remédio!', 'Mãe'] : ['Mãe: Não esqueça de beber água e comer frutas!', 'Mãe'],
              onInteract: s => { s.amizadeFamilia += 5; s.fome = Math.min(100, s.fome + 10); return 10; } },
            { key: 'professora', x: 1200, y: height - 90,
              dialog: () => ['Professora: Lembre-se de lavar as mãos antes de comer!', 'Professora Rosa'],
              onInteract: () => 12 },
            { key: 'avo', x: 1800, y: height - 90,
              dialog: () => ['Avó Maria: Vim te visitar! Fiz pão de queijo fresquinho!', 'Avó Maria'],
              onInteract: s => { s.amizadeFamilia += 10; s.fome = Math.min(100, s.fome + 25); return 15; } },
            { key: 'primo', x: 2400, y: height - 90,
              dialog: () => ['Primo Lucas: Vamos jogar futebol?', 'Primo Lucas'],
              onInteract: s => { s.energia = Math.min(100, s.energia + 5); return 10; } },
        ];
        npcDefs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key).setDepth(8);
            npc.npcData = def;
            this.tweens.add({ targets: npc, y: def.y - 6, duration: 1200 + Phaser.Math.Between(-200, 200), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            const bubble = this.add.text(def.x, def.y - 50, '💬', { fontSize: '18px' }).setDepth(9);
            this.tweens.add({ targets: bubble, alpha: 0.3, duration: 800, yoyo: true, repeat: -1 });
            npc.bubble = bubble;
            this.npcs.push(npc);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins        = this.physics.add.staticGroup();

        const items = [
            { key: 'agua',            x: 400,  y: height - 90,  type: 'agua'      },
            { key: 'comida',          x: 680,  y: height - 90,  type: 'comida'    },
            { key: 'remedio',         x: 980,  y: height - 90,  type: 'remedio'   },
            { key: 'bola',            x: 1350, y: height - 95,  type: 'bola'      },
            { key: 'suco',            x: 1560, y: height - 90,  type: 'suco'      },
            { key: 'bicicleta',       x: 2100, y: height - 95,  type: 'bicicleta' },
            { key: 'agua',            x: 2500, y: height - 90,  type: 'agua'      },
            { key: 'comida',          x: 2850, y: height - 90,  type: 'comida'    },
            { key: 'cama',            x: 3050, y: height - 95,  type: 'cama'      },
            { key: 'powerup_tenis',   x: 500,  y: height - 200, type: 'tenis'     },
            { key: 'powerup_capacete',x: 1700, y: height - 185, type: 'capacete'  },
        ];
        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key).setDepth(8);
            obj.itemType = item.type;
            this.tweens.add({ targets: obj, y: item.y - 8, duration: 900 + Phaser.Math.Between(-100, 100), yoyo: true, repeat: -1 });
        });

        const coinPositions = [280,480,560,760,840,1040,1140,1440,1640,1740,1940,2240,2340,2640,2740,2940,3040,3140];
        coinPositions.forEach((x, i) => {
            const py = i % 3 === 0 ? height - 160 : (i % 3 === 1 ? height - 195 : height - 90);
            const coin = this.coins.create(x, py, 'moeda').setDepth(7);
            this.tweens.add({ targets: coin, angle: 360, duration: 1200, repeat: -1 });
        });

        this.dog = this.physics.add.image(500, height - 90, 'cachorro').setCollideWorldBounds(true).setDepth(9);
    }

    _createObstacles(height) {
        this.obstacles = this.physics.add.staticGroup();
        [{ x: 760 }, { x: 1460 }, { x: 2060 }, { x: 2660 }].forEach(def => {
            const g = this.add.graphics();
            g.fillStyle(0xFF8C00); g.fillRect(0, 0, 28, 36);
            g.fillStyle(0xFFFFFF); g.fillTriangle(0, 0, 28, 0, 14, -12);
            g.fillStyle(0x000000); g.fillRect(10, 6, 8, 16); g.fillRect(10, 26, 8, 6);
            g.generateTexture('obstacle_' + def.x, 28, 48); g.destroy();
            this.obstacles.create(def.x, height - 78, 'obstacle_' + def.x).setDepth(8);
        });
    }

    _createCars() {
        this.cars = this.physics.add.group();
        const { height } = this.scale;
        const carY = height - 37;
        [{ x: 400, speed: -220, key: 'car_red' }, { x: 900, speed: -180, key: 'car_blue' },
         { x: 1400, speed: -240, key: 'car_yellow' }, { x: 1900, speed: -200, key: 'car_red' },
         { x: 2400, speed: -260, key: 'car_blue' }, { x: 2900, speed: -190, key: 'car_yellow' }].forEach(def => {
            const car = this.cars.create(def.x, carY, def.key);
            car.setVelocityX(def.speed).setImmovable(true).carSpeed = def.speed;
            car.setDepth(6);
        });
        this.time.addEvent({ delay: 3500, loop: true, callback: () => {
            const { height } = this.scale;
            const keys = ['car_red','car_blue','car_yellow'];
            const speeds = [-180,-220,-260,-200,-240];
            const car = this.cars.create(this.WORLD_WIDTH + 100, height - 37, Phaser.Utils.Array.GetRandom(keys));
            car.setVelocityX(Phaser.Utils.Array.GetRandom(speeds)).setImmovable(true).setDepth(6);
        }});
    }

    _createEnemies(height) {
        this.enemies = this.physics.add.group();
        [{ x: 650, y: height - 90 }, { x: 1250, y: height - 90 }, { x: 1900, y: height - 90 },
         { x: 2500, y: height - 90 }, { x: 3000, y: height - 90 }].forEach(def => {
            const e = this.enemies.create(def.x, def.y, 'robot').setDepth(8).setScale(0.8);
            e.setCollideWorldBounds(true).setBounceX(1);
            e.setVelocityX(-70);
            e.enemyType  = 'robot';
            e.patrolLeft  = def.x - 140;
            e.patrolRight = def.x + 140;
        });
    }

    _setupCamera(width, height) {
        this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, height);
    }

    _setupControls() {
        this.cursors   = this.input.keyboard.createCursorKeys();
        this.keyZ      = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyShift  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.touchState = { left: false, right: false, jump: false, action: false };
    }

    _setupTouchControls() {
        const add = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', e => { e.preventDefault(); this.touchState[key] = true; }, { passive: false });
            el.addEventListener('touchend',   e => { e.preventDefault(); this.touchState[key] = false; }, { passive: false });
            el.addEventListener('mousedown',  () => this.touchState[key] = true);
            el.addEventListener('mouseup',    () => this.touchState[key] = false);
        };
        add('btn-esquerda','left'); add('btn-direita','right'); add('btn-pular','jump'); add('btn-acao','action');
    }

    _setupCollisions() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.dog, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.collectibles, this._onCollectItem, null, this);
        this.physics.add.overlap(this.player, this.coins, this._onCoin, null, this);
        this.npcs.forEach(npc => this.physics.add.overlap(this.player, npc, () => this._onNPCOverlap(npc), null, this));
        this.physics.add.collider(this.player, this.cars, this._onCarHit, null, this);
        this.physics.add.collider(this.player, this.obstacles, this._onObstacleHit, null, this);
        this.physics.add.overlap(this.player, this.enemies, this._onEnemyHit, null, this);
    }

    _onCollectItem(player, item) {
        const type = item.itemType; item.destroy();
        let msg = '', pts = 0;
        switch (type) {
            case 'agua':     this.stats.energia = Math.min(100, this.stats.energia + 15); this.stats.saude = Math.min(100, this.stats.saude + 5); msg = 'Muito bem! Beber água faz bem à saúde!'; pts = 10; break;
            case 'comida':   this.stats.fome    = Math.min(100, this.stats.fome    + 30); this.stats.energia = Math.min(100, this.stats.energia + 10); msg = 'Hora do almoço! Coma bem e saudável!'; pts = 15; break;
            case 'remedio':  if (this.playerState.hasFever) { this.playerState.hasFever = false; this.stats.saude = Math.min(100, this.stats.saude + 30); msg = 'Muito bem! Tome remédio com ajuda dos pais!'; pts = 20; } else { msg = 'Remédio só quando preciso e com ajuda dos pais!'; pts = 5; } break;
            case 'bola':     this.stats.energia = Math.min(100, this.stats.energia + 8); msg = 'Brincar é divertido e saudável!'; pts = 10; break;
            case 'suco':     this.stats.fome = Math.min(100, this.stats.fome + 12); this.stats.energia = Math.min(100, this.stats.energia + 8); msg = 'Suco de fruta é muito saudável!'; pts = 8; break;
            case 'bicicleta':this.playerState.onBike = !this.playerState.onBike; msg = this.playerState.onBike ? 'Andando de bicicleta!' : 'Desceu da bicicleta!'; pts = 20; break;
            case 'cama':     this.stats.energia = 100; this.stats.sono = 100; msg = 'Boa noite! Dormir cedo faz bem!'; pts = 20; break;
            case 'tenis':    this.playerState.hasTenis = true; this.playerState.tenisTimer = 15000; msg = '👟 Tênis Turbo! Velocidade dobrada!'; pts = 30; break;
            case 'capacete': this.playerState.hasHelmet = true; msg = '⛑️ Capacete equipado! Proteção garantida!'; pts = 30; break;
        }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnCollectParticles(player.x, player.y);
        this._checkFaseProgress();
    }

    _onCoin(player, coin) { coin.destroy(); this.stats.moedas += 1; this.stats.pontos += 2; this._spawnCollectParticles(player.x, player.y, 0xFFD700); }

    _onNPCOverlap(npc) {
        if (this.playerState.interacting) return;
        this.playerState.interacting = true;
        const def = npc.npcData;
        const [msg, speaker] = def.dialog(this.stats);
        this.stats.pontos += def.onInteract(this.stats);
        this.dialog.show(msg, speaker, 3200);
        this.time.delayedCall(4000, () => { this.playerState.interacting = false; });
    }

    _onCarHit(player, car) {
        if (this.playerHurt) return;
        this.playerHurt = true;
        this.stats.energia = Math.max(0, this.stats.energia - 20);
        this.stats.saude   = Math.max(0, this.stats.saude   - 15);
        this.dialog.show('Cuidado! Olhe para os dois lados antes de atravessar a rua!', null, 3000);
        this.player.setTint(0xFF0000);
        this.cameras.main.shake(300, 0.015);
        this.time.delayedCall(1500, () => { this.player.clearTint(); this.playerHurt = false; });
    }

    _onObstacleHit(player) {
        if (this.playerHurt) return;
        this.playerHurt = true;
        this.stats.energia = Math.max(0, this.stats.energia - 8);
        this.dialog.show('Pule os obstáculos! Fique atento!', null, 2000);
        this.cameras.main.shake(150, 0.008);
        this.time.delayedCall(1200, () => { this.playerHurt = false; });
    }

    _onEnemyHit(player, enemy) {
        if (this._playerHurt) return;
        if (this.playerState.hasHelmet) {
            this.playerState.hasHelmet = false; enemy.destroy();
            this.dialog.show('⛑️ O capacete te protegeu! Robô destruído!', null, 2000);
            this._spawnCollectParticles(enemy.x, enemy.y, 0xFFD700); return;
        }
        this._playerHurt = true;
        this.stats.energia = Math.max(0, this.stats.energia - 12);
        this.stats.saude   = Math.max(0, this.stats.saude   - 8);
        this.dialog.show('O robô te acertou! Desvie dos inimigos!', null, 2200);
        this.player.setTint(0xFF4444);
        this.cameras.main.shake(200, 0.01);
        this.player.setVelocityY(-250);
        this.time.delayedCall(1200, () => { this.player.clearTint(); this._playerHurt = false; });
    }

    _startStatDecay() {
        this.time.addEvent({ delay: 2000, loop: true, callback: () => {
            this.stats.fome    = Math.max(0, this.stats.fome    - 1.2);
            this.stats.sono    = Math.max(0, this.stats.sono    - 0.6);
            this.stats.energia = Math.max(0, this.stats.energia - 0.4);
            if (this.stats.fome < 20 && !this.dialog.isVisible) this.dialog.show('Você está com fome! Encontre comida!', null, 2500);
            if (this.stats.sono < 20 && !this.dialog.isVisible) this.dialog.show('Está com sono! Procure uma cama!', null, 2500);
            if (!this.playerState.hasFever && Phaser.Math.Between(1, 200) === 1) {
                this.playerState.hasFever = true; this.stats.saude -= 20;
                this.dialog.show('Você ficou gripado! Encontre o remédio!', null, 3500);
            }
        }});
    }

    _setupAutoSave() {
        this.time.addEvent({ delay: 15000, loop: true, callback: () => this._doSave() });
    }

    _doSave() {
        const sd = SaveSystem.load() || {};
        const visited = sd.cidadesVisitadas || [];
        if (!visited.includes('cidade')) visited.push('cidade');
        SaveSystem.save({ pontos: this.stats.pontos, moedas: this.stats.moedas, fase: this.stats.fase, amizadeFamilia: this.stats.amizadeFamilia, cidadesVisitadas: visited, medalhas: sd.medalhas || [] });
    }

    _saveAndExit() { this._doSave(); this.scene.start('MapScene'); }

    _checkFaseProgress() {
        const pts = this.stats.pontos, fase = this.stats.fase;
        const thresholds = [
            { pts: 50,  fase: 2, msg: 'FASE 2: Hora de brincar no quintal!' },
            { pts: 120, fase: 3, msg: 'FASE 3: Vamos ao parque!' },
            { pts: 220, fase: 4, msg: 'FASE 4: Hora de jantar e dormir!' },
            { pts: 350, fase: 5, msg: 'FASE 5: Viagem para a fazenda!' },
        ];
        for (const t of thresholds) {
            if (pts >= t.pts && fase < t.fase) {
                this.stats.fase = t.fase;
                this.dialog.show(t.msg, 'Narrador', 4000);
                this._showFaseEffect();
                break;
            }
        }
    }

    _showFaseEffect() {
        const { width, height } = this.scale;
        const flash = this.add.graphics().setScrollFactor(0).setDepth(200);
        flash.fillStyle(0xFFFFFF, 1); flash.fillRect(0, 0, width, height);
        this.tweens.add({ targets: flash, alpha: 0, duration: 800, onComplete: () => flash.destroy() });
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 60, () => {
                const s = this.add.image(this.player.x + Phaser.Math.Between(-100, 100), this.player.y + Phaser.Math.Between(-80, 80), 'estrela').setScale(1.5).setDepth(150);
                this.tweens.add({ targets: s, alpha: 0, y: s.y - 60, duration: 900, onComplete: () => s.destroy() });
            });
        }
    }

    _spawnCollectParticles(x, y, color) {
        const k = color === 0xFFD700 ? 'particle_yellow' : 'particle_green';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, k).setDepth(20);
            this.tweens.add({ targets: p, x: x + Phaser.Math.Between(-50, 50), y: y + Phaser.Math.Between(-60, -10), alpha: 0, duration: 600, onComplete: () => p.destroy() });
        }
    }

    update(time, delta) {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        if (this.playerState.hasTenis) { this.playerState.tenisTimer -= delta; if (this.playerState.tenisTimer <= 0) { this.playerState.hasTenis = false; this.dialog.show('O Tênis Turbo acabou!', null, 1500); } }

        let vx = 0;
        const walk = this.playerState.hasTenis ? 380 : (this.playerState.onBike ? 340 : 200);
        const run  = this.playerState.hasTenis ? 560 : (this.playerState.onBike ? 500 : 360);
        if (left)  { vx = -(shift ? run : walk); this.player.setFlipX(true); }
        if (right) { vx =  (shift ? run : walk); this.player.setFlipX(false); }
        this.player.setVelocityX(vx);
        if (up && onGround) this.player.setVelocityY(-520);

        if (!onGround) {
            if (this.player.anims.currentAnim?.key !== 'miguel_pular') this.player.play('miguel_pular', true);
        } else if (vx !== 0) {
            const anim = shift ? 'miguel_correr' : 'miguel_andar';
            if (this.player.anims.currentAnim?.key !== anim) this.player.play(anim, true);
        } else {
            if (this.player.anims.currentAnim?.key !== 'miguel_parado') this.player.play('miguel_parado', true);
        }

        this.playerShadow.setPosition(this.player.x, this.player.body.bottom + 4);

        if (Math.abs(this.player.x - this.dog.x) > 300) this.physics.moveToObject(this.dog, this.player, 100);
        else this.dog.setVelocityX(0);

        this.enemies.getChildren().forEach(e => {
            if (e.x <= e.patrolLeft)  { e.setVelocityX(Math.abs(e.body.velocity.x)); e.setFlipX(false); }
            if (e.x >= e.patrolRight) { e.setVelocityX(-Math.abs(e.body.velocity.x)); e.setFlipX(true); }
        });

        this.cars.getChildren().forEach(car => {
            if (car.x < -200) { car.x = this.WORLD_WIDTH + 200; car.setVelocityX(car.carSpeed || -200); }
        });

        if (this.player.x >= this.checkpointX - 60 && !this._levelDone) {
            this._levelDone = true;
            this.stats.pontos += 80;
            this.dialog.show('🏙️ Parabéns! Você completou Lagoa Dourada! De volta ao mapa!', 'Narrador', 3500);
            this._showFaseEffect();
            this.time.delayedCall(3000, () => this._saveAndExit());
        }

        this.hud.update(this.stats);
    }

    shutdown() { if (this.hud) this.hud.destroy(); if (this.dialog) this.dialog.destroy(); }
}
