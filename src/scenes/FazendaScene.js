class FazendaScene extends Phaser.Scene {
    constructor() { super('FazendaScene'); }
    init(data) { this.saveData = data.save || SaveSystem.defaultData(); }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 2400;

        this.stats = {
            pontos: this.saveData.pontos || 0, moedas: this.saveData.moedas || 0,
            fase: this.saveData.fase || 5, energia: 100, saude: 100,
            fome: 100, sono: 100, amizadeFamilia: this.saveData.amizadeFamilia || 0,
            animaisAlimentados: 0
        };
        this.playerState = { interacting: false, hasHelmet: false, hasTenis: false, tenisTimer: 0 };

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createAnimals(height);
        this._createCollectibles(height);
        this._createEnemies(height);
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud    = new HUDSystem(this);
        this._startStatDecay();
        this._startMissions();

        this.dialog.show('Bem-vindo à Fazenda dos Avós em Resende Costa! Ajude a família e cuide dos animais!', 'Narrador', 4500);

        const backBtn = this.add.text(20, 20, '🗺️ Mapa', {
            fontSize: '17px', fill: '#FFFFFF', backgroundColor: '#00000099', padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => this._saveAndExit());
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87CEEB, 0xFAD7A0, 0xF0E68C, 0x87CEEB, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height - 100);
        sky.setScrollFactor(0.15);

        const farmBg = this.add.graphics().setScrollFactor(0.3);
        farmBg.fillStyle(0x228B22, 0.3);
        for (let x = 0; x < this.WORLD_WIDTH; x += 200) {
            farmBg.fillEllipse(x + 80, height - 130, 180, 60);
        }

        for (let i = 0; i < 8; i++) {
            this.add.image(180 + i * 300 + Phaser.Math.Between(-30, 30), Phaser.Math.Between(30, 100), 'cloud')
                .setAlpha(0.75).setScrollFactor(0.3);
        }

        this.platforms = this.physics.add.staticGroup();

        const groundY = height - 20;
        const ground = this.platforms.create(this.WORLD_WIDTH / 2, groundY, 'ground_farm');
        ground.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const grPath = this.add.graphics();
        grPath.fillStyle(0xC4A882);
        grPath.fillRect(0, height - 60, this.WORLD_WIDTH, 30);
        grPath.fillStyle(0xD4B892);
        for (let x = 0; x < this.WORLD_WIDTH; x += 60) grPath.fillRect(x, height - 60, 30, 30);

        const platformDefs = [
            { x: 350, y: height - 130, w: 140 }, { x: 680, y: height - 160, w: 110 },
            { x: 1020, y: height - 145, w: 130 }, { x: 1380, y: height - 170, w: 100 },
            { x: 1720, y: height - 150, w: 140 }, { x: 2060, y: height - 165, w: 110 },
        ];
        platformDefs.forEach(({ x, y, w }) => {
            const p = this.platforms.create(x, y, 'platform2');
            p.setScale(w / 100, 1).refreshBody();
        });

        [{ x: 200, key: 'fazenda' }, { x: 600, key: 'house' }, { x: 1100, key: 'house2' },
         { x: 1700, key: 'fazenda' }, { x: 2200, key: 'house3' }].forEach(({ x, key }) => this.add.image(x, height - 148, key).setScale(1.15));

        for (let i = 0; i < 16; i++) this.add.image(80 + i * 150, height - 115, 'tree').setScale(0.75 + Math.random() * 0.3);
        for (let i = 0; i < 20; i++) this.add.image(60 + i * 120, height - 72, 'bush').setScale(0.8 + Math.random() * 0.2);

        const pond = this.add.graphics();
        pond.fillStyle(0x4FC3F7, 0.85);
        pond.fillEllipse(1400, height - 55, 180, 50);
        pond.lineStyle(3, 0x1976D2, 0.7);
        pond.strokeEllipse(1400, height - 55, 180, 50);
        this.add.text(1400, height - 68, '🌊 Lago', { fontSize: '13px', fill: '#1976D2' }).setOrigin(0.5);

        const checkpoint = this.platforms.create(2340, height - 55, 'checkpoint');
        checkpoint.refreshBody();
        this.checkpointX = 2340;
    }

    _createPlayer(height) {
        this.player = this.physics.add.sprite(120, height - 95, 'miguel', 1);
        this.player.setCollideWorldBounds(true).setBounce(0.05).setDepth(10).setScale(0.18);
        this.player.setCrop(0, 100, 256, 284);
        this.player.body.setSize(90, 200, false);
        this.player.body.setOffset(83, 100);
        this.player.play('miguel_parado');
        this.playerShadow = this.add.ellipse(0, 0, 30, 8, 0x000000, 0.2).setDepth(9);
    }

    _createNPCs(height) {
        this.npcs = [];
        const defs = [
            { key: 'avo', x: 280, y: height - 90,
              dialog: () => ['Avó Maria: Que bom te ver! Quer ajudar a regar as plantas?', 'Avó Maria'],
              onInteract: s => { s.amizadeFamilia += 10; s.fome = Math.min(100, s.fome + 25); return 15; } },
            { key: 'pai', x: 750, y: height - 90,
              dialog: () => ['Avô João: Vamos cuidar das galinhas! Os animais precisam de nós!', 'Avô João'],
              onInteract: s => { s.amizadeFamilia += 8; return 12; } },
            { key: 'mae', x: 1300, y: height - 90,
              dialog: () => ['Mãe: Que fazenda bonita! Não esqueça de beber água no calor!', 'Mãe'],
              onInteract: s => { s.energia = Math.min(100, s.energia + 10); return 10; } },
            { key: 'primo', x: 1900, y: height - 90,
              dialog: () => ['Primo Lucas: Vamos empinar pipa? É muito divertido!', 'Primo Lucas'],
              onInteract: s => { s.energia = Math.min(100, s.energia + 8); return 12; } },
            { key: 'professora', x: 2200, y: height - 90,
              dialog: () => ['Tia Ana: Respeite os animais da fazenda! Eles têm sentimentos!', 'Tia Ana'],
              onInteract: () => 10 },
        ];
        defs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key).setDepth(8);
            npc.npcData = def;
            this.tweens.add({ targets: npc, y: def.y - 6, duration: 1400 + Phaser.Math.Between(-200, 200), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            const b = this.add.text(def.x, def.y - 55, '💬', { fontSize: '18px' }).setDepth(9);
            this.tweens.add({ targets: b, alpha: 0.3, duration: 900, yoyo: true, repeat: -1 });
            npc.bubble = b;
            this.npcs.push(npc);
        });
    }

    _createAnimals(height) {
        this.animals = [];
        [{ x: 500, y: height - 88, key: 'cachorro' }, { x: 900, y: height - 88, key: 'galinha' },
         { x: 1100, y: height - 88, key: 'galinha' }, { x: 1500, y: height - 88, key: 'cachorro' },
         { x: 1800, y: height - 88, key: 'galinha' }].forEach((def, i) => {
            const a = this.physics.add.image(def.x, def.y, def.key).setCollideWorldBounds(true).setDepth(9);
            a.fed = false;
            const labelMap = { cachorro: 'Bidu', galinha: 'Galinha' };
            const lbl = this.add.text(def.x, def.y - 40, labelMap[def.key] || def.key, { fontSize: '12px', fill: '#333333', backgroundColor: '#FFFFFFAA', padding: { x: 4, y: 2 } }).setDepth(10).setOrigin(0.5);
            a.label = lbl;
            this.tweens.add({ targets: a, x: def.x + Phaser.Math.Between(-60, 60), duration: Phaser.Math.Between(1500, 3000), yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            this.animals.push(a);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins        = this.physics.add.staticGroup();
        [{ key: 'agua', x: 400, y: height - 90, type: 'agua' }, { key: 'comida', x: 650, y: height - 90, type: 'comida' },
         { key: 'agua', x: 1050, y: height - 90, type: 'agua' }, { key: 'suco', x: 1250, y: height - 90, type: 'suco' },
         { key: 'comida', x: 1650, y: height - 90, type: 'comida' }, { key: 'remedio', x: 2000, y: height - 90, type: 'remedio' },
         { key: 'cama', x: 2150, y: height - 90, type: 'cama' }, { key: 'bola', x: 850, y: height - 95, type: 'bola' },
         { key: 'powerup_tenis', x: 600, y: height - 175, type: 'tenis' }, { key: 'powerup_capacete', x: 1600, y: height - 175, type: 'capacete' },
        ].forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key).setDepth(8);
            obj.itemType = item.type;
            this.tweens.add({ targets: obj, y: item.y - 9, duration: 950 + Phaser.Math.Between(-100, 100), yoyo: true, repeat: -1 });
        });
        [320,480,720,960,1140,1400,1580,1820,2060,2180,2300].forEach(x => {
            const c = this.coins.create(x, height - 155, 'moeda').setDepth(7);
            this.tweens.add({ targets: c, angle: 360, duration: 1200, repeat: -1 });
        });
    }

    _createEnemies(height) {
        this.enemies = this.physics.add.group();
        [{ x: 550, y: height - 90 }, { x: 1150, y: height - 90 }, { x: 1750, y: height - 90 }].forEach(def => {
            const e = this.enemies.create(def.x, def.y, 'sapo').setDepth(8).setScale(0.85);
            e.setCollideWorldBounds(true).setBounceX(1);
            e.enemyType = 'frog'; e.patrolLeft = def.x - 130; e.patrolRight = def.x + 130;
            e.setVelocityX(-60);
        });
    }

    _setupCamera(width, height) {
        this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, height);
    }

    _setupControls() {
        this.cursors   = this.input.keyboard.createCursorKeys();
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
        this.animals.forEach(a => this.physics.add.collider(a, this.platforms));
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.collectibles, this._onCollectItem, null, this);
        this.physics.add.overlap(this.player, this.coins, this._onCoin, null, this);
        this.npcs.forEach(npc => this.physics.add.overlap(this.player, npc, () => this._onNPCOverlap(npc), null, this));
        this.animals.forEach(a => this.physics.add.overlap(this.player, a, () => this._onAnimalOverlap(a), null, this));
        this.physics.add.overlap(this.player, this.enemies, this._onEnemyHit, null, this);
    }

    _onCollectItem(player, item) {
        const type = item.itemType; item.destroy();
        let msg = '', pts = 0;
        switch (type) {
            case 'agua':     this.stats.energia = Math.min(100, this.stats.energia + 15); this.stats.saude = Math.min(100, this.stats.saude + 5); msg = 'Água fresquinha da fazenda!'; pts = 10; break;
            case 'comida':   this.stats.fome = Math.min(100, this.stats.fome + 30); this.stats.energia = Math.min(100, this.stats.energia + 10); msg = 'Pão de queijo da avó! Uma delícia mineira!'; pts = 15; break;
            case 'suco':     this.stats.fome = Math.min(100, this.stats.fome + 12); msg = 'Suco de fruta natural da fazenda!'; pts = 8; break;
            case 'remedio':  this.stats.saude = Math.min(100, this.stats.saude + 20); msg = 'Remédio tomado! Sempre com ajuda dos adultos!'; pts = 15; break;
            case 'cama':     this.stats.energia = 100; this.stats.sono = 100; msg = 'Descansou na casa dos avós! Que sono gostoso!'; pts = 20; break;
            case 'bola':     this.stats.energia = Math.min(100, this.stats.energia + 8); msg = 'Brincando no quintal com os primos!'; pts = 10; break;
            case 'tenis':    this.playerState.hasTenis = true; this.playerState.tenisTimer = 15000; msg = '👟 Tênis Turbo ativado!'; pts = 30; break;
            case 'capacete': this.playerState.hasHelmet = true; msg = '⛑️ Capacete equipado!'; pts = 30; break;
        }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnParticles(player.x, player.y);
    }

    _onCoin(player, coin) { coin.destroy(); this.stats.moedas += 1; this.stats.pontos += 2; this._spawnParticles(player.x, player.y, 0xFFD700); }

    _onNPCOverlap(npc) {
        if (this.playerState.interacting) return;
        this.playerState.interacting = true;
        const [msg, speaker] = npc.npcData.dialog(this.stats);
        this.stats.pontos += npc.npcData.onInteract(this.stats);
        this.dialog.show(msg, speaker, 3200);
        this.time.delayedCall(4000, () => { this.playerState.interacting = false; });
    }

    _onAnimalOverlap(animal) {
        if (animal.fed || this.playerState.interacting) return;
        this.playerState.interacting = true;
        animal.fed = true;
        this.stats.animaisAlimentados++;
        this.stats.pontos += 12; this.stats.amizadeFamilia += 5;
        const msgs = { cachorro: 'Você alimentou o Bidu! Cuidar dos animais é muito importante!', galinha: 'Você alimentou as galinhas! Elas agradecem!' };
        this.dialog.show(msgs[animal.texture.key] || 'Você cuidou do animal!', null, 2800);
        animal.setTint(0x00FF88);
        if (animal.label) { animal.label.setStyle({ fill: '#007700', backgroundColor: '#AAFFAAAA' }); animal.label.setText('✓ ' + animal.label.text); }
        this._spawnParticles(animal.x, animal.y, 0x00FF88);
        this.time.delayedCall(3500, () => { this.playerState.interacting = false; });
        if (this.stats.animaisAlimentados >= 3) {
            this.time.delayedCall(1000, () => { this.dialog.show('Parabéns! Você cuidou de todos os animais da fazenda!', 'Narrador', 4000); this.stats.pontos += 50; });
        }
    }

    _onEnemyHit(player, enemy) {
        if (this._playerHurt) return;
        if (this.playerState.hasHelmet) { this.playerState.hasHelmet = false; enemy.destroy(); this.dialog.show('⛑️ O capacete te protegeu!', null, 2000); return; }
        this._playerHurt = true;
        this.stats.saude   = Math.max(0, this.stats.saude   - 12);
        this.stats.energia = Math.max(0, this.stats.energia - 8);
        this.dialog.show('O sapo da fazenda pulou em você!', null, 2200);
        this.player.setTint(0xFF8800);
        this.cameras.main.shake(200, 0.01);
        this.player.setVelocityY(-250);
        this.time.delayedCall(1200, () => { this.player.clearTint(); this._playerHurt = false; });
    }

    _startStatDecay() {
        this.time.addEvent({ delay: 2500, loop: true, callback: () => {
            this.stats.fome    = Math.max(0, this.stats.fome    - 1.0);
            this.stats.sono    = Math.max(0, this.stats.sono    - 0.5);
            this.stats.energia = Math.max(0, this.stats.energia - 0.3);
            if (this.stats.fome < 20 && !this.dialog.isVisible) this.dialog.show('Está com fome! A avó tem pão de queijo esperando!', null, 2500);
        }});
    }

    _startMissions() {
        this.time.delayedCall(8000, () => {
            if (!this.dialog.isVisible) this.dialog.show('Missão: Alimente os animais da fazenda!', 'Narrador', 3000);
        });
    }

    _spawnParticles(x, y, color) {
        const k = color === 0xFFD700 ? 'particle_yellow' : 'particle_green';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, k).setDepth(20);
            this.tweens.add({ targets: p, x: x + Phaser.Math.Between(-50, 50), y: y + Phaser.Math.Between(-60, -10), alpha: 0, duration: 600, onComplete: () => p.destroy() });
        }
    }

    _saveAndExit() {
        const sd = SaveSystem.load() || {};
        const visited = sd.cidadesVisitadas || [];
        if (!visited.includes('fazenda')) visited.push('fazenda');
        SaveSystem.save({ pontos: this.stats.pontos, moedas: this.stats.moedas, fase: this.stats.fase, amizadeFamilia: this.stats.amizadeFamilia, cidadesVisitadas: visited, medalhas: sd.medalhas || [] });
        this.scene.start('MapScene');
    }

    update(time, delta) {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        if (this.playerState.hasTenis) { this.playerState.tenisTimer -= delta; if (this.playerState.tenisTimer <= 0) this.playerState.hasTenis = false; }

        const bw = this.playerState.hasTenis ? 380 : 200;
        const br = this.playerState.hasTenis ? 560 : 360;
        let vx = 0;
        if (left)  { vx = -(shift ? br : bw); this.player.setFlipX(true); }
        if (right) { vx =  (shift ? br : bw); this.player.setFlipX(false); }
        this.player.setVelocityX(vx);
        if (up && onGround) this.player.setVelocityY(-500);

        if (!onGround) {
            if (this.player.anims.currentAnim?.key !== 'miguel_pular') this.player.play('miguel_pular', true);
        } else if (vx !== 0) {
            const anim = shift ? 'miguel_correr' : 'miguel_andar';
            if (this.player.anims.currentAnim?.key !== anim) this.player.play(anim, true);
        } else {
            if (this.player.anims.currentAnim?.key !== 'miguel_parado') this.player.play('miguel_parado', true);
        }

        this.playerShadow.setPosition(this.player.x, this.player.body.bottom + 4);
        this.animals.forEach(a => { if (a.label) a.label.setPosition(a.x, a.y - 44); });

        this.enemies.getChildren().forEach(e => {
            if (e.x <= e.patrolLeft)  { e.setVelocityX(Math.abs(e.body.velocity.x)); e.setFlipX(false); }
            if (e.x >= e.patrolRight) { e.setVelocityX(-Math.abs(e.body.velocity.x)); e.setFlipX(true); }
        });

        if (this.player.x >= this.checkpointX - 60 && !this._levelDone) {
            this._levelDone = true;
            this.stats.pontos += 80;
            this.dialog.show('🌾 Parabéns! Você completou a Fazenda dos Avós!', 'Narrador', 3500);
            this.time.delayedCall(3000, () => this._saveAndExit());
        }

        this.hud.update(this.stats);
    }

    shutdown() { if (this.hud) this.hud.destroy(); if (this.dialog) this.dialog.destroy(); }
}
