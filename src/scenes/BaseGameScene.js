class BaseGameScene extends Phaser.Scene {
    constructor(key, config = {}) {
        super(key);
        this.levelConfig = config;
        this.worldId = config.worldId || 'cidade';
        this.levelNum = config.levelNum || 1;
        this._initialized = false;
    }

    init(data) {
        if (data) {
            this.worldId = data.worldId || this.worldId;
            this.levelNum = data.levelNum || this.levelNum;
        }
    }

    preCreate() {
        const { width, height } = this.scale;
        this.particles = new ParticleSystem(this);
        this.levelBuilder = new LevelBuilder(this);
        this.npcSystem = new NPCSystem(this);
        this.dialogSystem = new DialogSystem(this);
        this.levelComplete = false;
        this._rewindKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this._pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this._pauseKey.on('down', () => this._togglePause());
        this.paused = false;
    }

    setupMiguel(x, y) {
        this.miguel = new MiguelCharacter(this, x, y);
        this.timeRewind = new TimeRewind(this, this.miguel);
        this.hud = new HUDSystem(this);
        const world = WORLDS.find(w => w.id === this.worldId);
        this.hud.setLevelText(`${world ? world.name : ''} — Nível ${this.levelNum}`);
        this.cameras.main.startFollow(this.miguel.sprite, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(120, 80);
    }

    setupCollisions() {
        const lb = this.levelBuilder;
        const m = this.miguel;
        if (!m || !lb.platforms) return;

        this.physics.add.collider(m.sprite, lb.platforms);
        this.physics.add.collider(lb.enemies, lb.platforms);

        if (lb.collectibles) {
            this.physics.add.overlap(m.sprite, lb.collectibles, (sprite, item) => {
                if (!item.active) return;
                const type = item.getData('type');
                if (type === 'coin') { m.collectCoin(item.getData('value') || 1); }
                else if (type === 'star') { m.collectStar(); }
                else if (type === 'heart') { m.heal(); }
                item.destroy();
            });
        }

        if (lb.hazards) {
            this.physics.add.overlap(m.sprite, lb.hazards, () => { m.hurt(); });
        }

        if (lb.enemies) {
            this.physics.add.overlap(m.sprite, lb.enemies, (mSprite, enemy) => {
                if (!enemy.active) return;
                const vy = m.body ? m.body.velocity.y : 0;
                if (vy > 100 && mSprite.y < enemy.y - 10) {
                    enemy.destroy();
                    m.body.setVelocityY(-350);
                    this.particles.burst(enemy.x, enemy.y, 0xff4444, 14);
                    this.hud.showCombo('💥 Inimigo derrotado!');
                    m.collectCoin(2);
                } else {
                    m.hurt();
                }
            });
        }

        if (lb.goal) {
            this.physics.add.overlap(m.sprite, lb.goal, () => {
                if (!this.levelComplete) this._completeLevel();
            });
        }
    }

    _completeLevel() {
        this.levelComplete = true;
        const { width: w, height: h } = this.scale;
        this.particles.levelComplete(w / 2, h / 2);

        const stars = Math.min(3, 1 + (this.miguel.coins >= 5 ? 1 : 0) + (this.miguel.health >= 2 ? 1 : 0));
        SaveSystem.completeLevel(this.worldId, this.levelNum, stars, this.miguel.coins);

        const overlay = this.add.graphics().setScrollFactor(0).setDepth(500);
        overlay.fillStyle(0x000000, 0.6); overlay.fillRect(0, 0, w, h);
        overlay.fillStyle(0x0d1b2a, 0.95); overlay.fillRoundedRect(w/2-220, h/2-140, 440, 280, 20);
        overlay.lineStyle(4, 0xffd700, 1); overlay.strokeRoundedRect(w/2-220, h/2-140, 440, 280, 20);

        this.add.text(w/2, h/2-110, '🎉 Nível Completo!', { fontSize: '30px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 5 }).setOrigin(0.5).setScrollFactor(0).setDepth(501);

        for (let i = 0; i < 3; i++) {
            const starTxt = this.add.text(w/2 - 60 + i*60, h/2-55, i < stars ? '⭐' : '☆', { fontSize: '36px' }).setOrigin(0.5).setScrollFactor(0).setDepth(501);
            this.tweens.add({ targets: starTxt, scaleX: 1.3, scaleY: 1.3, duration: 400, delay: i*150, yoyo: true });
        }

        this.add.text(w/2, h/2, `Moedas: ${this.miguel.coins} 🪙\nVida Restante: ${this.miguel.health} ❤️`, {
            fontSize: '18px', fill: '#fff', align: 'center', lineSpacing: 8,
        }).setOrigin(0.5).setScrollFactor(0).setDepth(501);

        const world = WORLDS.find(ww => ww.id === this.worldId);
        const maxLevel = world ? world.levels : 10;
        const nextLevel = this.levelNum + 1;
        const hasNext = nextLevel <= maxLevel;

        const makebtn = (label, x, color, cb) => {
            const bg = this.add.graphics().setScrollFactor(0).setDepth(501);
            bg.fillStyle(color, 0.9); bg.fillRoundedRect(x-90, h/2+65, 180, 46, 12);
            const t = this.add.text(x, h/2+88, label, { fontSize: '17px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(502);
            const z = this.add.zone(x, h/2+88, 180, 46).setInteractive({ useHandCursor: true }).setScrollFactor(0).setDepth(503);
            z.on('pointerdown', cb);
        };

        if (hasNext) {
            makebtn('➡ Próximo Nível', w/2-105, 0x1565c0, () => {
                const nextKey = this.worldId.charAt(0).toUpperCase() + this.worldId.slice(1) + '_' + nextLevel;
                this.scene.start(nextKey, { worldId: this.worldId, levelNum: nextLevel });
            });
        }
        makebtn('🗺 Mapa', hasNext ? w/2+105 : w/2, 0x2e7d32, () => this.scene.start('WorldMapScene'));

        const miguel = this.miguel;
        this.tweens.add({ targets: miguel.sprite, y: miguel.sprite.y - 20, duration: 400, ease: 'Power2', onComplete: () => { miguel.setState(MIGUEL_STATES.WIN); } });
    }

    _togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.physics.pause();
            const { width: w, height: h } = this.scale;
            this._pauseOverlay = this.add.graphics().setScrollFactor(0).setDepth(600);
            this._pauseOverlay.fillStyle(0x000000, 0.7); this._pauseOverlay.fillRect(0, 0, w, h);
            this._pauseOverlay.fillStyle(0x0d0d1a, 0.97); this._pauseOverlay.fillRoundedRect(w/2-150, h/2-80, 300, 160, 18);
            this._pauseOverlay.lineStyle(3, 0xffd700, 1); this._pauseOverlay.strokeRoundedRect(w/2-150, h/2-80, 300, 160, 18);
            this._pauseText = this.add.text(w/2, h/2-45, '⏸ Pausado', { fontSize: '26px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(601);
            this._pauseContinue = this.add.text(w/2, h/2+10, 'ESC ou P — Continuar', { fontSize: '16px', fill: '#fff' }).setOrigin(0.5).setScrollFactor(0).setDepth(601);
            this._pauseMenu = this.add.text(w/2, h/2+44, '← Voltar ao Menu', { fontSize: '16px', fill: '#ff8888' }).setOrigin(0.5).setScrollFactor(0).setDepth(601).setInteractive({ useHandCursor: true });
            this._pauseMenu.on('pointerdown', () => this.scene.start('WorldMapScene'));
        } else {
            this.physics.resume();
            if (this._pauseOverlay) this._pauseOverlay.destroy();
            if (this._pauseText) this._pauseText.destroy();
            if (this._pauseContinue) this._pauseContinue.destroy();
            if (this._pauseMenu) this._pauseMenu.destroy();
        }
    }

    update(time, delta) {
        if (this.paused || this.levelComplete) return;
        const rewinding = this._rewindKey && this._rewindKey.isDown;
        if (rewinding) {
            this.timeRewind.startRewind();
            this.timeRewind.update();
        } else {
            if (this.timeRewind.rewinding) this.timeRewind.stopRewind();
            if (this.miguel) {
                this.miguel.update(delta, this.dialogSystem.isActive());
                this.timeRewind.record(delta);
                if (this.miguel.isAction && this.miguel.isAction() && !this.dialogSystem.isActive()) {
                    this.npcSystem.npcs.forEach(npc => {
                        if (npc.canInteract(this.miguel.sprite)) npc.interact(this.dialogSystem);
                    });
                }
            }
        }
        this.npcSystem.update(this.miguel ? this.miguel.sprite : { x: -9999, y: -9999 }, this.dialogSystem.isActive());
        this.levelBuilder.updateEnemies(delta);
        if (this.hud && this.miguel) this.hud.update(this.miguel, this.timeRewind.history);
    }

    shutdown() {
        if (this.dialogSystem) this.dialogSystem.destroy();
        if (this.npcSystem) this.npcSystem.destroy();
        if (this.timeRewind) this.timeRewind.destroy();
        if (this.hud) this.hud.destroy();
    }
}
