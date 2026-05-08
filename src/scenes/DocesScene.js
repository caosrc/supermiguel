class DocesScene extends Phaser.Scene {
    constructor() { super('DocesScene'); }
    init(data) { this.saveData = data.save || SaveSystem.defaultData(); }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 2800;
        this.stats = {
            pontos: this.saveData.pontos || 0, moedas: this.saveData.moedas || 0,
            fase: this.saveData.fase || 1, energia: 100, saude: 100,
            fome: 100, sono: 100, amizadeFamilia: this.saveData.amizadeFamilia || 0
        };
        this.playerState = { interacting: false, hasHelmet: false, hasTenis: false, tenisTimer: 0 };

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createCollectibles(height);
        this._createEnemies(height);
        this._createBouncePads(height);
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud    = new HUDSystem(this);
        this._startStatDecay();
        this.dialog.show('Bem-vindo ao Mundo dos Doces! Frutas são melhores que doces!', 'Narrador', 4000);

        const backBtn = this.add.text(20, 20, '🗺️ Mapa', {
            fontSize: '17px', fill: '#FFFFFF', backgroundColor: '#00000099', padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => this._saveAndExit());
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0xFF99CC, 0xFF99CC, 0xFFCC99, 0xFFCC99, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height);
        sky.setScrollFactor(0.08);

        const midBg = this.add.graphics().setScrollFactor(0.3);
        midBg.fillStyle(0xFF69B4, 0.3);
        for (let x = 0; x < this.WORLD_WIDTH; x += 180) {
            midBg.fillCircle(x + 50, height - 200 + Phaser.Math.Between(-30, 30), 50);
        }

        for (let i = 0; i < 10; i++) {
            const cl = this.add.image(60 + i * 270, Phaser.Math.Between(20, 110), 'cloud');
            cl.setTint(0xFFCCDD).setAlpha(0.8).setScale(Phaser.Math.FloatBetween(0.7, 1.1)).setScrollFactor(Phaser.Math.FloatBetween(0.2, 0.5));
        }

        const lollipopPositions = [180, 420, 640, 900, 1140, 1380, 1600, 1820, 2060, 2280, 2520, 2740];
        lollipopPositions.forEach(x => {
            this.add.image(x, height - 120, 'pirulito').setScale(0.9 + Math.random() * 0.4).setDepth(2);
        });

        const donutDecos = [280, 550, 780, 1020, 1280, 1520, 1760, 2000, 2240, 2480, 2700];
        donutDecos.forEach(x => {
            const d = this.add.image(x, height - 90 - Phaser.Math.Between(60, 160), 'donut').setScale(0.7).setDepth(2);
            this.tweens.add({ targets: d, angle: 360, duration: Phaser.Math.Between(3000, 6000), repeat: -1 });
        });

        this.platforms = this.physics.add.staticGroup();
        const gr = this.platforms.create(this.WORLD_WIDTH / 2, height - 20, 'ground_doces');
        gr.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const platDefs = [
            { x: 260,  y: height - 145 },
            { x: 480,  y: height - 185 },
            { x: 700,  y: height - 160 },
            { x: 930,  y: height - 195 },
            { x: 1160, y: height - 170 },
            { x: 1380, y: height - 210 },
            { x: 1600, y: height - 180 },
            { x: 1840, y: height - 200 },
            { x: 2060, y: height - 165 },
            { x: 2290, y: height - 195 },
            { x: 2510, y: height - 175 },
            { x: 2720, y: height - 155 },
        ];
        platDefs.forEach(({ x, y }) => {
            const p = this.platforms.create(x, y, 'marshmallow').setDepth(4);
            p.refreshBody();
            this.tweens.add({ targets: p, y: y - 8, duration: Phaser.Math.Between(800, 1400), yoyo: true, repeat: -1, ease: 'Sine.easeInOut', onUpdate: () => p.refreshBody() });
        });

        const candyDecos = [150, 360, 590, 820, 1060, 1310, 1540, 1770, 2010, 2250, 2490, 2680];
        candyDecos.forEach(x => {
            const col = [0xFF4444, 0x4444FF, 0x44FF44, 0xFF8800][Phaser.Math.Between(0, 3)];
            const g2 = this.add.graphics().setDepth(3);
            g2.fillStyle(col);
            g2.fillRect(x, height - 78, 10, 50);
            g2.fillStyle(0xFFFFFF);
            g2.fillRect(x + 2, height - 78, 6, 8);
        });

        const checkpoint = this.platforms.create(2750, height - 55, 'checkpoint');
        checkpoint.refreshBody();
        this.checkpointX = 2750;
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
            { key: 'nutricionista', x: 320,  y: height - 90,
              dialog: () => ['Nutricionista: Frutas e verduras são muito mais saudáveis que doces!', 'Dra. Nutrição'],
              onInteract: s => { s.saude = Math.min(100, s.saude + 10); return 15; } },
            { key: 'dentista', x: 1100, y: height - 90,
              dialog: () => ['Dentista: Escovar os dentes 3x por dia evita cáries! Cuide do seu sorriso!', 'Dr. Dentes'],
              onInteract: s => { s.saude = Math.min(100, s.saude + 15); return 18; } },
            { key: 'mae', x: 1900, y: height - 90,
              dialog: () => ['Mãe: Comer equilibrado é o segredo da saúde! Varie os alimentos!', 'Mãe'],
              onInteract: s => { s.fome = Math.min(100, s.fome + 20); s.amizadeFamilia += 8; return 15; } },
            { key: 'confeiteiro', x: 2550, y: height - 90,
              dialog: () => ['Confeiteiro: Doces são bons, mas só de vez em quando! A saúde vem primeiro!', 'Chef Carlos'],
              onInteract: s => { s.amizadeFamilia += 5; return 12; } },
        ];
        defs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key).setDepth(8);
            npc.npcData = def;
            this.tweens.add({ targets: npc, y: def.y - 6, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            const b = this.add.text(def.x, def.y - 55, '💬', { fontSize: '16px' }).setDepth(9);
            this.tweens.add({ targets: b, alpha: 0.3, duration: 900, yoyo: true, repeat: -1 });
            npc.bubble = b;
            this.npcs.push(npc);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins        = this.physics.add.staticGroup();
        const items = [
            { key: 'fruta',   x: 400,  y: height - 90,  type: 'fruta',   pts: 20, msg: '🍎 Que fruta deliciosa! Muito mais saudável que doces!' },
            { key: 'agua',    x: 640,  y: height - 90,  type: 'agua',    pts: 15, msg: '💧 Água é sempre a melhor escolha!' },
            { key: 'doce',    x: 860,  y: height - 200, type: 'doce',    pts: 5,  msg: '🍬 Doce gostoso, mas não exagere!' },
            { key: 'fruta',   x: 1150, y: height - 200, type: 'fruta',   pts: 20, msg: '🍊 Frutas têm vitaminas essenciais!' },
            { key: 'bala',    x: 1400, y: height - 90,  type: 'bala',    pts: 5,  msg: '🍭 Balas têm muito açúcar! Com moderação!' },
            { key: 'fruta',   x: 1700, y: height - 210, type: 'fruta',   pts: 20, msg: '🍇 Uvas são ótimas para o coração!' },
            { key: 'agua',    x: 1950, y: height - 90,  type: 'agua',    pts: 15, msg: '💧 Beba bastante água todo dia!' },
            { key: 'doce',    x: 2200, y: height - 200, type: 'doce',    pts: 5,  msg: '🍫 Chocolate é bom, mas prefira o escuro!' },
            { key: 'fruta',   x: 2450, y: height - 90,  type: 'fruta',   pts: 20, msg: '🍌 Banana dá energia para brincar!' },
            { key: 'powerup_tenis',    x: 750,  y: height - 200, type: 'tenis',    pts: 30, msg: '👟 Tênis Turbo ativado!' },
            { key: 'powerup_capacete', x: 1850, y: height - 200, type: 'capacete', pts: 30, msg: '⛑️ Capacete equipado!' },
        ];
        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key).setDepth(8);
            obj.itemType = item.type; obj.itemMsg = item.msg; obj.itemPts = item.pts;
            this.tweens.add({ targets: obj, y: item.y - 9, duration: 950, yoyo: true, repeat: -1 });
        });
        const coinXs = [220,370,510,660,810,960,1110,1280,1430,1580,1730,1890,2050,2200,2360,2510,2650,2750];
        coinXs.forEach((x, i) => {
            const py = i % 3 === 0 ? height - 165 : (i % 3 === 1 ? height - 205 : height - 92);
            const c = this.coins.create(x, py, 'moeda').setDepth(7);
            this.tweens.add({ targets: c, angle: 360, duration: 1100, repeat: -1 });
        });
    }

    _createBouncePads(height) {
        this.bouncePads = this.physics.add.staticGroup();
        [400, 900, 1450, 2000, 2500].forEach(x => {
            const pad = this.bouncePads.create(x, height - 60, 'marshmallow').setDepth(5);
            pad.refreshBody();
            this.add.text(x, height - 82, '⬆ Bounce!', { fontSize: '10px', fill: '#FF1493' }).setOrigin(0.5).setDepth(6);
        });
    }

    _createEnemies(height) {
        this.enemies = this.physics.add.group();
        const defs = [
            { key: 'robot', x: 600,  y: height - 90, speed: 55, range: 120, type: 'robot' },
            { key: 'sapo',  x: 1050, y: height - 90, speed: 60, range: 130, type: 'frog'  },
            { key: 'robot', x: 1550, y: height - 90, speed: 65, range: 110, type: 'robot' },
            { key: 'sapo',  x: 2050, y: height - 90, speed: 55, range: 140, type: 'frog'  },
            { key: 'robot', x: 2400, y: height - 90, speed: 70, range: 120, type: 'robot' },
        ];
        defs.forEach(def => {
            const e = this.enemies.create(def.x, def.y, def.key).setDepth(8).setScale(0.85);
            e.setCollideWorldBounds(true).setBounceX(1);
            e.enemyType = def.type;
            e.patrolLeft  = def.x - def.range;
            e.patrolRight = def.x + def.range;
            e.setVelocityX(-def.speed);
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
        add('btn-esquerda', 'left'); add('btn-direita', 'right');
        add('btn-pular', 'jump');    add('btn-acao', 'action');
    }

    _setupCollisions() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.collectibles, this._onCollect, null, this);
        this.physics.add.overlap(this.player, this.coins, this._onCoin, null, this);
        this.npcs.forEach(npc => this.physics.add.overlap(this.player, npc, () => this._onNPC(npc), null, this));
        this.physics.add.overlap(this.player, this.enemies, this._onEnemyHit, null, this);
        this.physics.add.overlap(this.player, this.bouncePads, this._onBounce, null, this);
    }

    _onCollect(player, item) {
        const msg  = item.itemMsg  || 'Coletado!';
        const pts  = item.itemPts  || 5;
        const type = item.itemType;
        item.destroy();
        if (type === 'fruta')    { this.stats.fome    = Math.min(100, this.stats.fome    + 25); this.stats.saude = Math.min(100, this.stats.saude + 8); }
        if (type === 'agua')     { this.stats.energia = Math.min(100, this.stats.energia + 20); }
        if (type === 'doce' || type === 'bala') { this.stats.fome = Math.min(100, this.stats.fome + 10); }
        if (type === 'tenis')    { this.playerState.hasTenis = true; this.playerState.tenisTimer = 15000; }
        if (type === 'capacete') { this.playerState.hasHelmet = true; }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnParticles(player.x, player.y, 0xFF69B4);
    }

    _onCoin(player, coin) { coin.destroy(); this.stats.moedas += 1; this.stats.pontos += 2; this._spawnParticles(player.x, player.y, 0xFFD700); }

    _onNPC(npc) {
        if (this.playerState.interacting) return;
        this.playerState.interacting = true;
        const [msg, speaker] = npc.npcData.dialog(this.stats);
        this.stats.pontos += npc.npcData.onInteract(this.stats);
        this.dialog.show(msg, speaker, 3500);
        this.time.delayedCall(4200, () => { this.playerState.interacting = false; });
    }

    _onEnemyHit(player, enemy) {
        if (this._playerHurt) return;
        if (this.playerState.hasHelmet) { this.playerState.hasHelmet = false; enemy.destroy(); this.dialog.show('⛑️ O capacete te protegeu!', null, 2000); return; }
        this._playerHurt = true;
        this.stats.saude   = Math.max(0, this.stats.saude   - 12);
        this.stats.energia = Math.max(0, this.stats.energia - 8);
        const msgs = { robot: 'O robozinho te acertou! Desvie dos inimigos!', frog: 'O sapo pulou em você!' };
        this.dialog.show(msgs[enemy.enemyType] || 'Cuidado!', null, 2200);
        this.player.setTint(0xFF69B4);
        this.cameras.main.shake(200, 0.01);
        this.player.setVelocityY(-250);
        this.time.delayedCall(1200, () => { this.player.clearTint(); this._playerHurt = false; });
    }

    _onBounce(player, pad) {
        if (player.body.touching.down || player.body.blocked.down) {
            player.setVelocityY(-650);
            this._spawnParticles(player.x, player.y, 0xFF69B4);
        }
    }

    _startStatDecay() {
        this.time.addEvent({ delay: 2500, loop: true, callback: () => {
            this.stats.fome    = Math.max(0, this.stats.fome    - 0.8);
            this.stats.sono    = Math.max(0, this.stats.sono    - 0.4);
            this.stats.energia = Math.max(0, this.stats.energia - 0.3);
            if (this.stats.fome < 20 && !this.dialog.isVisible) this.dialog.show('Com fome! Procure frutas! Doces não saciam!', null, 2500);
        }});
    }

    _spawnParticles(x, y, color) {
        const k = color === 0xFFD700 ? 'particle_yellow' : 'particle_pink';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, k).setDepth(20);
            this.tweens.add({ targets: p, x: x + Phaser.Math.Between(-50, 50), y: y + Phaser.Math.Between(-60, -10), alpha: 0, duration: 600, onComplete: () => p.destroy() });
        }
    }

    _saveAndExit() {
        const sd = SaveSystem.load() || {};
        const visited = sd.cidadesVisitadas || [];
        if (!visited.includes('doces')) visited.push('doces');
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
        if (up && onGround) this.player.setVelocityY(-510);

        if (!onGround) {
            if (this.player.anims.currentAnim?.key !== 'miguel_pular') this.player.play('miguel_pular', true);
        } else if (vx !== 0) {
            const anim = shift ? 'miguel_correr' : 'miguel_andar';
            if (this.player.anims.currentAnim?.key !== anim) this.player.play(anim, true);
        } else {
            if (this.player.anims.currentAnim?.key !== 'miguel_parado') this.player.play('miguel_parado', true);
        }

        this.playerShadow.setPosition(this.player.x, this.player.body.bottom + 4);

        this.enemies.getChildren().forEach(e => {
            if (e.x <= e.patrolLeft)  { e.setVelocityX(Math.abs(e.body.velocity.x)); e.setFlipX(false); }
            if (e.x >= e.patrolRight) { e.setVelocityX(-Math.abs(e.body.velocity.x)); e.setFlipX(true); }
        });

        if (this.player.x >= this.checkpointX - 60 && !this._levelDone) {
            this._levelDone = true;
            this.stats.pontos += 80;
            this.dialog.show('🍭 Parabéns! Você completou o Mundo dos Doces! Lembre-se: frutas são sempre a melhor opção!', 'Narrador', 5000);
            this.time.delayedCall(4000, () => this._saveAndExit());
        }

        this.hud.update(this.stats);
    }

    shutdown() { if (this.hud) this.hud.destroy(); if (this.dialog) this.dialog.destroy(); }
}
