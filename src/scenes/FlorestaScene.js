class FlorestaScene extends Phaser.Scene {
    constructor() { super('FlorestaScene'); }

    init(data) { this.saveData = data.save || SaveSystem.defaultData(); }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 3000;

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

        this.dialog.show('Bem-vindo à Mata Encantada! Respeite a natureza e explore com cuidado!', 'Narrador', 4000);

        const backBtn = this.add.text(20, 20, '🗺️ Mapa', {
            fontSize: '17px', fill: '#FFFFFF', backgroundColor: '#00000099', padding: { x: 10, y: 6 }
        }).setScrollFactor(0).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => this._saveAndExit());
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x0D1F0A, 0x0D1F0A, 0x1A3D0E, 0x1A3D0E, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height);
        sky.setScrollFactor(0.05);

        const midBg = this.add.graphics();
        midBg.fillStyle(0x0F2D08, 0.8);
        for (let x = 0; x < this.WORLD_WIDTH; x += 160) {
            midBg.fillRect(x + 40, height - 380, 30, 300);
            midBg.fillCircle(x + 55, height - 390, 55);
        }
        midBg.setScrollFactor(0.25);

        for (let i = 0; i < 16; i++) {
            const gt = this.add.image(80 + i * 190 + Phaser.Math.Between(-20, 20), height - 180, 'giant_tree');
            gt.setScale(Phaser.Math.FloatBetween(0.9, 1.6)).setScrollFactor(Phaser.Math.FloatBetween(0.5, 0.8)).setDepth(1);
        }

        for (let i = 0; i < 30; i++) {
            const v = this.add.image(Phaser.Math.Between(100, this.WORLD_WIDTH - 100), Phaser.Math.Between(60, height - 140), 'vine');
            v.setAlpha(0.6).setScrollFactor(Phaser.Math.FloatBetween(0.6, 0.9)).setDepth(2);
        }

        const glowColors = [0x00FF88, 0x88FF00, 0xFFFF00, 0x00FFFF];
        for (let i = 0; i < 60; i++) {
            const gx = Phaser.Math.Between(50, this.WORLD_WIDTH - 50);
            const gy = Phaser.Math.Between(50, height - 100);
            const gfx = this.add.graphics().setScrollFactor(Phaser.Math.FloatBetween(0.4, 0.9)).setDepth(3);
            gfx.fillStyle(Phaser.Utils.Array.GetRandom(glowColors), 0.8);
            gfx.fillCircle(gx, gy, Phaser.Math.Between(2, 4));
            this.tweens.add({ targets: gfx, alpha: 0.1, duration: Phaser.Math.Between(600, 2000), yoyo: true, repeat: -1 });
        }

        this.platforms = this.physics.add.staticGroup();

        const gr = this.platforms.create(this.WORLD_WIDTH / 2, height - 20, 'ground_floresta');
        gr.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const platformDefs = [
            { x: 280,  y: height - 140, key: 'platform_galho', w: 1.0 },
            { x: 500,  y: height - 185, key: 'platform_galho', w: 0.8 },
            { x: 720,  y: height - 155, key: 'platform_galho', w: 1.1 },
            { x: 950,  y: height - 200, key: 'platform_galho', w: 0.9 },
            { x: 1180, y: height - 170, key: 'platform_galho', w: 1.0 },
            { x: 1420, y: height - 210, key: 'platform_galho', w: 0.8 },
            { x: 1680, y: height - 175, key: 'platform_galho', w: 1.1 },
            { x: 1900, y: height - 195, key: 'platform_galho', w: 0.9 },
            { x: 2120, y: height - 165, key: 'platform_galho', w: 1.0 },
            { x: 2380, y: height - 205, key: 'platform_galho', w: 0.8 },
            { x: 2650, y: height - 180, key: 'platform_galho', w: 1.1 },
            { x: 2870, y: height - 155, key: 'platform_galho', w: 1.0 },
        ];
        platformDefs.forEach(({ x, y, key, w }) => {
            const p = this.platforms.create(x, y, key);
            p.setScale(w, 1).refreshBody();
            this.add.image(x - 30, y - 40, 'cogumelo').setScale(0.5).setDepth(4);
        });

        const mushroomDecos = [180, 440, 660, 860, 1100, 1340, 1580, 1820, 2060, 2300, 2560, 2780];
        mushroomDecos.forEach((x, i) => {
            this.add.image(x, height - 68, i % 2 === 0 ? 'cogumelo' : 'cogumelo_azul')
                .setScale(0.7 + Math.random() * 0.3).setDepth(5);
        });

        const checkpoint = this.platforms.create(2900, height - 55, 'checkpoint');
        checkpoint.refreshBody();
        this.checkpointX = 2900;
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
            { key: 'jardineiro', x: 300,  y: height - 90,
              dialog: () => ['Jardineiro: As árvores produzem oxigênio! Cuide bem das plantas!', 'Jardineiro'],
              onInteract: (s) => { s.energia = Math.min(100, s.energia + 10); return 12; } },
            { key: 'fada', x: 1100, y: height - 90,
              dialog: () => ['Fada: Esta floresta tem séculos de história! Não quebre galhos!', 'Fada da Floresta'],
              onInteract: (s) => { s.saude = Math.min(100, s.saude + 15); return 15; } },
            { key: 'professora', x: 2000, y: height - 90,
              dialog: () => ['Professora: Os vagalumes se iluminam para se comunicar! Incrível!', 'Professora Rosa'],
              onInteract: (s) => { return 18; } },
            { key: 'pai', x: 2700, y: height - 90,
              dialog: () => ['Pai: Chegou ao fim da floresta! Você é um explorador incrível!', 'Pai'],
              onInteract: (s) => { s.amizadeFamilia += 10; return 20; } },
        ];
        defs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key).setDepth(8);
            npc.npcData = def;
            this.tweens.add({ targets: npc, y: def.y - 6, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            const bubble = this.add.text(def.x, def.y - 55, '💬', { fontSize: '16px' }).setDepth(9);
            this.tweens.add({ targets: bubble, alpha: 0.3, duration: 800, yoyo: true, repeat: -1 });
            npc.bubble = bubble;
            this.npcs.push(npc);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins        = this.physics.add.staticGroup();

        const items = [
            { key: 'fruta',   x: 400,  y: height - 90,  type: 'fruta'   },
            { key: 'agua',    x: 680,  y: height - 90,  type: 'agua'    },
            { key: 'cogumelo',x: 900,  y: height - 200, type: 'cogumelo'},
            { key: 'flor',    x: 1250, y: height - 215, type: 'flor'    },
            { key: 'energia', x: 1500, y: height - 90,  type: 'energia' },
            { key: 'fruta',   x: 1800, y: height - 210, type: 'fruta'   },
            { key: 'agua',    x: 2100, y: height - 90,  type: 'agua'    },
            { key: 'powerup_tenis', x: 600, y: height - 200, type: 'tenis' },
            { key: 'powerup_capacete', x: 1700, y: height - 90, type: 'capacete' },
        ];
        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key).setDepth(8);
            obj.itemType = item.type;
            this.tweens.add({ targets: obj, y: item.y - 8, duration: 900, yoyo: true, repeat: -1 });
        });

        const coinXs = [200,350,510,660,820,980,1140,1300,1460,1620,1780,1940,2100,2260,2420,2600,2750,2900];
        coinXs.forEach((x, i) => {
            const py = i % 3 === 0 ? height - 170 : (i % 3 === 1 ? height - 210 : height - 95);
            const c = this.coins.create(x, py, 'moeda').setDepth(7);
            this.tweens.add({ targets: c, angle: 360, duration: 1200, repeat: -1 });
        });
    }

    _createEnemies(height) {
        this.enemies = this.physics.add.group();
        const defs = [
            { key: 'bee',  x: 550,  y: height - 160, speed:  70, range: 120, type: 'bee'  },
            { key: 'sapo', x: 850,  y: height - 90,  speed:  60, range: 130, type: 'frog' },
            { key: 'bee',  x: 1300, y: height - 185, speed:  90, range: 100, type: 'bee'  },
            { key: 'sapo', x: 1600, y: height - 90,  speed:  55, range: 140, type: 'frog' },
            { key: 'bee',  x: 2000, y: height - 155, speed:  80, range: 120, type: 'bee'  },
            { key: 'sapo', x: 2300, y: height - 90,  speed:  65, range: 130, type: 'frog' },
            { key: 'bee',  x: 2600, y: height - 170, speed:  75, range: 110, type: 'bee'  },
        ];
        defs.forEach(def => {
            const e = this.enemies.create(def.x, def.y, def.key);
            e.setDepth(8).setScale(0.85);
            e.setVelocityX(-def.speed);
            e.setCollideWorldBounds(true).setBounceX(1);
            e.enemyType  = def.type;
            e.patrolLeft  = def.x - def.range;
            e.patrolRight = def.x + def.range;
            e._baseY   = def.y;
            e._time    = Phaser.Math.FloatBetween(0, Math.PI * 2);
            e._jumped  = false;
        });
    }

    _createBouncePads(height) {
        this.bouncePads = this.physics.add.staticGroup();
        [380, 820, 1450, 1950, 2450].forEach(x => {
            const pad = this.bouncePads.create(x, height - 58, 'bounce_mushroom');
            pad.refreshBody();
            this.add.text(x, height - 80, '🍄 Bounce!', { fontSize: '10px', fill: '#FF6600' }).setOrigin(0.5).setDepth(6);
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
        const type = item.itemType;
        item.destroy();
        let msg = '', pts = 0;
        switch (type) {
            case 'fruta':    this.stats.fome = Math.min(100, this.stats.fome + 25); msg = 'Frutas da floresta! Vitaminas naturais!'; pts = 15; break;
            case 'agua':     this.stats.energia = Math.min(100, this.stats.energia + 15); msg = 'Água fresca da mata! Que gostosa!'; pts = 10; break;
            case 'cogumelo': this.stats.saude = Math.min(100, this.stats.saude + 20); msg = 'Cogumelo mágico! Força dobrada!'; pts = 20; break;
            case 'flor':     this.stats.amizadeFamilia += 5; msg = 'Flor rara! Que lindo presente!'; pts = 25; break;
            case 'energia':  this.stats.energia = Math.min(100, this.stats.energia + 30); msg = 'Energia da floresta!'; pts = 12; break;
            case 'tenis':
                this.playerState.hasTenis = true;
                this.playerState.tenisTimer = 15000;
                msg = '👟 Tênis Turbo! Velocidade dobrada por 15 segundos!'; pts = 30;
                break;
            case 'capacete':
                this.playerState.hasHelmet = true;
                msg = '⛑️ Capacete! Proteção contra 1 inimigo!'; pts = 30;
                break;
        }
        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnParticles(player.x, player.y, 0x00FF88);
    }

    _onCoin(player, coin) {
        coin.destroy();
        this.stats.moedas  += 1;
        this.stats.pontos  += 2;
        this._spawnParticles(player.x, player.y, 0xFFD700);
    }

    _onNPC(npc) {
        if (this.playerState.interacting) return;
        this.playerState.interacting = true;
        const def = npc.npcData;
        const [msg, speaker] = def.dialog(this.stats);
        this.stats.pontos += def.onInteract(this.stats);
        this.dialog.show(msg, speaker, 3500);
        this.time.delayedCall(4200, () => { this.playerState.interacting = false; });
    }

    _onEnemyHit(player, enemy) {
        if (this._playerHurt) return;
        if (this.playerState.hasHelmet) {
            this.playerState.hasHelmet = false;
            enemy.destroy();
            this.dialog.show('⛑️ O capacete te protegeu! Inimigo derrotado!', null, 2000);
            this._spawnParticles(enemy.x, enemy.y, 0xFFD700);
            return;
        }
        this._playerHurt = true;
        this.stats.saude   = Math.max(0, this.stats.saude   - 15);
        this.stats.energia = Math.max(0, this.stats.energia - 10);
        const msgs = { bee: 'Ai! A abelha picou! Cuidado com os insetos!', frog: 'O sapo pulou em você! Fique atento!' };
        this.dialog.show(msgs[enemy.enemyType] || 'Cuidado com os inimigos!', null, 2200);
        this.player.setTint(0xFF4444);
        this.cameras.main.shake(200, 0.01);
        this.player.setVelocityY(-250);
        this.time.delayedCall(1200, () => { this.player.clearTint(); this._playerHurt = false; });
    }

    _onBounce(player, pad) {
        if (player.body.touching.down || player.body.blocked.down) {
            player.setVelocityY(-620);
            this._spawnParticles(player.x, player.y, 0xFF6600);
        }
    }

    _startStatDecay() {
        this.time.addEvent({
            delay: 2500, loop: true,
            callback: () => {
                this.stats.fome    = Math.max(0, this.stats.fome    - 1.0);
                this.stats.sono    = Math.max(0, this.stats.sono    - 0.5);
                this.stats.energia = Math.max(0, this.stats.energia - 0.3);
                if (this.stats.fome < 20 && !this.dialog.isVisible)
                    this.dialog.show('Está com fome! Procure frutas na floresta!', null, 2500);
            }
        });
    }

    _spawnParticles(x, y, color) {
        const keys = { [0xFFD700]: 'particle_yellow', [0x00FF88]: 'particle_green', [0xFF6600]: 'particle_yellow' };
        const key = keys[color] || 'particle_green';
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, key).setDepth(20);
            this.tweens.add({ targets: p, x: x + Phaser.Math.Between(-50, 50), y: y + Phaser.Math.Between(-60, -10), alpha: 0, duration: 600, onComplete: () => p.destroy() });
        }
    }

    _saveAndExit() {
        const sd = SaveSystem.load() || {};
        const visited = sd.cidadesVisitadas || [];
        if (!visited.includes('floresta')) visited.push('floresta');
        SaveSystem.save({ pontos: this.stats.pontos, moedas: this.stats.moedas, fase: this.stats.fase, amizadeFamilia: this.stats.amizadeFamilia, cidadesVisitadas: visited, medalhas: sd.medalhas || [] });
        this.scene.start('MapScene');
    }

    update(time, delta) {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        if (this.playerState.hasTenis) {
            this.playerState.tenisTimer -= delta;
            if (this.playerState.tenisTimer <= 0) { this.playerState.hasTenis = false; this.dialog.show('O Tênis Turbo acabou!', null, 1500); }
        }

        const baseWalk = this.playerState.hasTenis ? 380 : 200;
        const baseRun  = this.playerState.hasTenis ? 560 : 360;
        let vx = 0;
        if (left)  { vx = -(shift ? baseRun : baseWalk); this.player.setFlipX(true); }
        if (right) { vx =  (shift ? baseRun : baseWalk); this.player.setFlipX(false); }
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
            if (e.enemyType === 'bee') {
                e._time += 0.04;
                e.y = e._baseY + Math.sin(e._time) * 35;
            }
            if (e.x <= e.patrolLeft)  { e.setVelocityX(Math.abs(e.body.velocity.x)); e.setFlipX(false); }
            if (e.x >= e.patrolRight) { e.setVelocityX(-Math.abs(e.body.velocity.x)); e.setFlipX(true); }
        });

        if (this.player.x >= this.checkpointX - 60 && !this._levelDone) {
            this._levelDone = true;
            this.stats.pontos += 80;
            this.dialog.show('🌳 Parabéns! Você completou a Mata Encantada! A natureza agradece!', 'Narrador', 4000);
            this._showFaseEffect();
            this.time.delayedCall(3000, () => this._saveAndExit());
        }

        this.hud.update(this.stats);
    }

    _showFaseEffect() {
        const { width, height } = this.scale;
        const flash = this.add.graphics().setScrollFactor(0).setDepth(200);
        flash.fillStyle(0x00FF88, 0.6);
        flash.fillRect(0, 0, width, height);
        this.tweens.add({ targets: flash, alpha: 0, duration: 800, onComplete: () => flash.destroy() });
        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 60, () => {
                const s = this.add.image(this.player.x + Phaser.Math.Between(-100, 100), this.player.y + Phaser.Math.Between(-80, 80), 'estrela').setScale(1.5).setDepth(150);
                this.tweens.add({ targets: s, alpha: 0, y: s.y - 60, duration: 900, onComplete: () => s.destroy() });
            });
        }
    }

    shutdown() {
        if (this.hud)    this.hud.destroy();
        if (this.dialog) this.dialog.destroy();
    }
}
