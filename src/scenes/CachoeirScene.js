class CachoeirScene extends Phaser.Scene {
    constructor() { super('CachoeirScene'); }
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
        this.waterZones = [{ x1: 550, x2: 850 }, { x1: 1350, x2: 1650 }, { x1: 2100, x2: 2400 }];

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createCollectibles(height);
        this._createEnemies(height);
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud    = new HUDSystem(this);
        this._startStatDecay();
        this.dialog.show('Bem-vindo à Cachoeira Cristalina! Cuidado com a correnteza!', 'Narrador', 4000);

        const backBtn = this.add.text(20, 20, '🗺️ Mapa', {
            fontSize: '17px', fill: '#FFFFFF', backgroundColor: '#00000099', padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => this._saveAndExit());
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x4FC3F7, 0x4FC3F7, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height);
        sky.setScrollFactor(0.08);

        const mist = this.add.graphics();
        mist.fillStyle(0xFFFFFF, 0.18);
        for (let x = 0; x < this.WORLD_WIDTH; x += 200) {
            mist.fillEllipse(x + 100, height - 80, 220, 60);
        }
        mist.setScrollFactor(0.3);

        for (let i = 0; i < 10; i++) {
            const cl = this.add.image(60 + i * 280, Phaser.Math.Between(20, 100), 'cloud');
            cl.setAlpha(0.75).setScale(Phaser.Math.FloatBetween(0.8, 1.3)).setScrollFactor(Phaser.Math.FloatBetween(0.2, 0.5));
            this.tweens.add({ targets: cl, x: cl.x + 25, duration: Phaser.Math.Between(5000, 9000), yoyo: true, repeat: -1 });
        }

        const cliffsBack = this.add.graphics().setScrollFactor(0.35);
        cliffsBack.fillStyle(0x6080A0);
        for (let x = 0; x < this.WORLD_WIDTH; x += 240) {
            cliffsBack.fillRect(x, height - 300, 80, 250);
            cliffsBack.fillRect(x + 140, height - 220, 60, 180);
        }

        const waterfalls = [580, 1380, 2150];
        waterfalls.forEach(wx => {
            for (let row = 0; row < 6; row++) {
                const wf = this.add.image(wx, height - 340 + row * 40, 'waterfall').setDepth(3).setAlpha(0.75);
                this.tweens.add({ targets: wf, alpha: 0.5, duration: Phaser.Math.Between(300, 700), yoyo: true, repeat: -1 });
            }
            const spray = this.add.graphics().setDepth(4);
            spray.fillStyle(0xFFFFFF, 0.3);
            spray.fillEllipse(wx, height - 58, 80, 30);
        });

        this.waterZones.forEach(zone => {
            const wg = this.add.graphics().setDepth(2);
            wg.fillStyle(0x1E90FF, 0.35);
            wg.fillRect(zone.x1, height - 50, zone.x2 - zone.x1, 35);
            this.tweens.add({ targets: wg, alpha: 0.15, duration: 800, yoyo: true, repeat: -1 });
            this.add.text((zone.x1 + zone.x2) / 2, height - 74, '🌊 Correnteza!', {
                fontSize: '11px', fill: '#1E90FF', stroke: '#FFFFFF', strokeThickness: 2
            }).setOrigin(0.5).setDepth(5);
        });

        this.platforms = this.physics.add.staticGroup();
        const gr = this.platforms.create(this.WORLD_WIDTH / 2, height - 20, 'ground_cachoeira');
        gr.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const platDefs = [
            { x: 280,  y: height - 145, key: 'platform_rock', w: 1.0 },
            { x: 480,  y: height - 185, key: 'platform_log',  w: 1.1 },
            { x: 700,  y: height - 160, key: 'platform_rock', w: 0.9 },
            { x: 920,  y: height - 195, key: 'platform_log',  w: 1.0 },
            { x: 1150, y: height - 170, key: 'platform_rock', w: 1.1 },
            { x: 1380, y: height - 205, key: 'platform_log',  w: 0.9 },
            { x: 1600, y: height - 175, key: 'platform_rock', w: 1.0 },
            { x: 1820, y: height - 200, key: 'platform_log',  w: 1.1 },
            { x: 2050, y: height - 165, key: 'platform_rock', w: 0.9 },
            { x: 2280, y: height - 195, key: 'platform_log',  w: 1.0 },
            { x: 2500, y: height - 175, key: 'platform_rock', w: 1.1 },
            { x: 2700, y: height - 155, key: 'platform_rock', w: 1.0 },
        ];
        platDefs.forEach(({ x, y, key, w }) => {
            const p = this.platforms.create(x, y, key);
            p.setScale(w, 1).refreshBody();
            this.add.image(x - 30, y - 10, 'rock').setScale(0.4).setDepth(3);
            this.tweens.add({ targets: p, x: p.x + (key === 'platform_log' ? 60 : 0), duration: Phaser.Math.Between(2000, 3500), yoyo: true, repeat: -1, ease: 'Sine.easeInOut', onUpdate: () => p.refreshBody() });
        });

        for (let i = 0; i < 14; i++) {
            this.add.image(80 + i * 210 + Phaser.Math.Between(-15, 15), height - 100, 'rock').setScale(0.5 + Math.random() * 0.5).setDepth(3);
        }
        for (let i = 0; i < 10; i++) {
            this.add.image(120 + i * 280, height - 130, 'tree').setScale(0.8).setDepth(2);
        }

        const crystal_positions = [300,560,780,1000,1200,1420,1680,1900,2120,2350,2580,2750];
        crystal_positions.forEach((x, i) => {
            this.add.image(x, height - 75, i % 2 === 0 ? 'crystal' : 'crystal_green').setScale(0.6).setDepth(4);
            this.tweens.add({ targets: this.add.image(x, height - 75, i % 2 === 0 ? 'crystal' : 'crystal_green').setScale(0.6).setDepth(4).setAlpha(0.4), alpha: 0.9, duration: 800 + i * 80, yoyo: true, repeat: -1 });
        });

        const checkpoint = this.platforms.create(2740, height - 55, 'checkpoint');
        checkpoint.refreshBody();
        this.checkpointX = 2740;
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
            { key: 'pescador', x: 320, y: height - 90,
              dialog: () => ['Pescador: Não jogue lixo no rio! Os peixes precisam de água limpa!', 'Pescador João'],
              onInteract: s => { s.amizadeFamilia += 5; return 12; } },
            { key: 'mae', x: 1000, y: height - 90,
              dialog: () => ['Mãe: A água é um bem precioso! Economize sempre!', 'Mãe'],
              onInteract: s => { s.fome = Math.min(100, s.fome + 15); s.amizadeFamilia += 5; return 15; } },
            { key: 'cientista', x: 1800, y: height - 90,
              dialog: () => ['Cientista: 70% do planeta é coberto de água, mas só 3% é potável!', 'Dra. Clara'],
              onInteract: s => { return 18; } },
            { key: 'avo', x: 2500, y: height - 90,
              dialog: () => ['Avó: Que cachoeira linda! Obrigada por cuidar da nossa natureza!', 'Avó Maria'],
              onInteract: s => { s.amizadeFamilia += 10; s.saude = Math.min(100, s.saude + 15); return 20; } },
        ];
        defs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key).setDepth(8);
            npc.npcData = def;
            this.tweens.add({ targets: npc, y: def.y - 6, duration: 1300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
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
            { key: 'agua_pura', x: 380,  y: height - 90,  type: 'agua_pura' },
            { key: 'peixe',     x: 680,  y: height - 200, type: 'peixe'     },
            { key: 'crystal',   x: 950,  y: height - 210, type: 'crystal'   },
            { key: 'agua_pura', x: 1200, y: height - 90,  type: 'agua_pura' },
            { key: 'peixe',     x: 1500, y: height - 195, type: 'peixe'     },
            { key: 'crystal',   x: 1750, y: height - 90,  type: 'crystal'   },
            { key: 'agua_pura', x: 2000, y: height - 210, type: 'agua_pura' },
            { key: 'peixe',     x: 2300, y: height - 90,  type: 'peixe'     },
            { key: 'powerup_tenis',    x: 820,  y: height - 200, type: 'tenis'    },
            { key: 'powerup_capacete', x: 2050, y: height - 185, type: 'capacete' },
        ];
        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key).setDepth(8);
            obj.itemType = item.type;
            this.tweens.add({ targets: obj, y: item.y - 9, duration: 950, yoyo: true, repeat: -1 });
        });
        const coinXs = [210,360,500,640,800,960,1100,1240,1400,1560,1700,1840,2000,2160,2320,2480,2620,2720];
        coinXs.forEach((x, i) => {
            const py = i % 3 === 0 ? height - 160 : (i % 3 === 1 ? height - 200 : height - 90);
            const c = this.coins.create(x, py, 'moeda').setDepth(7);
            this.tweens.add({ targets: c, angle: 360, duration: 1100, repeat: -1 });
        });
    }

    _createEnemies(height) {
        this.enemies = this.physics.add.group();
        const defs = [
            { key: 'fish_enemy', x: 650,  y: height - 90, speed: 0,  range: 0,   type: 'fish' },
            { key: 'sapo',       x: 1050, y: height - 90, speed: 60, range: 130, type: 'frog' },
            { key: 'fish_enemy', x: 1450, y: height - 90, speed: 0,  range: 0,   type: 'fish' },
            { key: 'sapo',       x: 1850, y: height - 90, speed: 55, range: 140, type: 'frog' },
            { key: 'fish_enemy', x: 2200, y: height - 90, speed: 0,  range: 0,   type: 'fish' },
            { key: 'sapo',       x: 2550, y: height - 90, speed: 65, range: 120, type: 'frog' },
        ];
        defs.forEach(def => {
            const e = this.enemies.create(def.x, def.y, def.key).setDepth(8).setScale(0.85);
            e.setCollideWorldBounds(true).setBounceX(1);
            e.enemyType = def.type;
            e.patrolLeft  = def.x - def.range;
            e.patrolRight = def.x + def.range;
            e._baseY   = def.y;
            e._jumpTimer = Phaser.Math.Between(1000, 3000);
            if (def.speed > 0) e.setVelocityX(-def.speed);
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
    }

    _onCollect(player, item) {
        const type = item.itemType; item.destroy();
        let msg = '', pts = 0;
        switch (type) {
            case 'agua_pura': this.stats.energia = Math.min(100, this.stats.energia + 20); this.stats.saude = Math.min(100, this.stats.saude + 10); msg = '💧 Água pura da cachoeira! Deliciosa!'; pts = 15; break;
            case 'peixe':     this.stats.fome    = Math.min(100, this.stats.fome + 25); msg = '🐟 Peixe fresquinho! Proteína saudável!'; pts = 12; break;
            case 'crystal':   this.stats.amizadeFamilia += 5; msg = '💎 Cristal raro! Que descoberta incrível!'; pts = 30; break;
            case 'tenis':     this.playerState.hasTenis = true; this.playerState.tenisTimer = 15000; msg = '👟 Tênis Turbo ativado!'; pts = 30; break;
            case 'capacete':  this.playerState.hasHelmet = true; msg = '⛑️ Capacete equipado!'; pts = 30; break;
        }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnParticles(player.x, player.y, 0x4FC3F7);
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
        const msgs = { fish: 'O peixe te acertou! Cuidado com animais selvagens!', frog: 'O sapo pulou em você!' };
        this.dialog.show(msgs[enemy.enemyType] || 'Cuidado!', null, 2200);
        this.player.setTint(0x4FC3F7);
        this.cameras.main.shake(200, 0.01);
        this.player.setVelocityY(-250);
        this.time.delayedCall(1200, () => { this.player.clearTint(); this._playerHurt = false; });
    }

    _startStatDecay() {
        this.time.addEvent({ delay: 2500, loop: true, callback: () => {
            this.stats.fome    = Math.max(0, this.stats.fome    - 0.9);
            this.stats.sono    = Math.max(0, this.stats.sono    - 0.5);
            this.stats.energia = Math.max(0, this.stats.energia - 0.3);
            if (this.stats.fome < 20 && !this.dialog.isVisible) this.dialog.show('Com fome! Procure um peixe!', null, 2500);
        }});
    }

    _spawnParticles(x, y, color) {
        const k = color === 0xFFD700 ? 'particle_yellow' : 'particle_blue';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, k).setDepth(20);
            this.tweens.add({ targets: p, x: x + Phaser.Math.Between(-50, 50), y: y + Phaser.Math.Between(-60, -10), alpha: 0, duration: 600, onComplete: () => p.destroy() });
        }
    }

    _saveAndExit() {
        const sd = SaveSystem.load() || {};
        const visited = sd.cidadesVisitadas || [];
        if (!visited.includes('cachoeira')) visited.push('cachoeira');
        SaveSystem.save({ pontos: this.stats.pontos, moedas: this.stats.moedas, fase: this.stats.fase, amizadeFamilia: this.stats.amizadeFamilia, cidadesVisitadas: visited, medalhas: sd.medalhas || [] });
        this.scene.start('MapScene');
    }

    update(time, delta) {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        if (this.playerState.hasTenis) { this.playerState.tenisTimer -= delta; if (this.playerState.tenisTimer <= 0) { this.playerState.hasTenis = false; } }

        let vx = 0;
        const bw = this.playerState.hasTenis ? 380 : 200;
        const br = this.playerState.hasTenis ? 560 : 360;
        if (left)  { vx = -(shift ? br : bw); this.player.setFlipX(true); }
        if (right) { vx =  (shift ? br : bw); this.player.setFlipX(false); }

        const inWater = this.waterZones.some(z => this.player.x > z.x1 && this.player.x < z.x2 && this.player.y > this.scale.height - 70);
        if (inWater) vx -= 80;

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
            if (e.enemyType === 'fish') {
                e._jumpTimer -= delta;
                if (e._jumpTimer <= 0 && (e.body.touching.down || e.body.blocked.down)) {
                    e.setVelocityY(-380);
                    e._jumpTimer = Phaser.Math.Between(2000, 4000);
                }
            } else {
                if (e.x <= e.patrolLeft)  { e.setVelocityX(Math.abs(e.body.velocity.x)); e.setFlipX(false); }
                if (e.x >= e.patrolRight) { e.setVelocityX(-Math.abs(e.body.velocity.x)); e.setFlipX(true); }
            }
        });

        if (this.player.x >= this.checkpointX - 60 && !this._levelDone) {
            this._levelDone = true;
            this.stats.pontos += 80;
            this.dialog.show('💧 Parabéns! Você explorou a Cachoeira Cristalina! Cuide sempre da água!', 'Narrador', 4000);
            this.time.delayedCall(3000, () => this._saveAndExit());
        }

        this.hud.update(this.stats);
    }

    shutdown() { if (this.hud) this.hud.destroy(); if (this.dialog) this.dialog.destroy(); }
}
