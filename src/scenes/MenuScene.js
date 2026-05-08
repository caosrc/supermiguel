class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1B3A6B, 0x1B3A6B, 0x0D5C2E, 0x0D5C2E, 1);
        bg.fillRect(0, 0, width, height);

        for (let i = 0; i < 7; i++) {
            const cloud = this.add.image(
                Phaser.Math.Between(50, width - 50),
                Phaser.Math.Between(20, 140),
                'cloud'
            ).setAlpha(0.65).setScale(Phaser.Math.FloatBetween(0.7, 1.2));
            this.tweens.add({ targets: cloud, x: cloud.x + Phaser.Math.Between(-30, 30), duration: Phaser.Math.Between(4000, 8000), yoyo: true, repeat: -1 });
        }

        for (let i = 0; i < 8; i++) {
            this.add.image(55 + i * 115, height - 65, 'tree').setScale(0.9);
        }

        const ground = this.add.graphics();
        ground.fillStyle(0x228B22);
        ground.fillRect(0, height - 40, width, 40);

        const titlePanel = this.add.graphics();
        titlePanel.fillStyle(0x000000, 0.5);
        titlePanel.fillRoundedRect(width / 2 - 240, 24, 480, 110, 14);

        const title = this.add.text(width / 2, 42, 'SUPER MIGUEL', {
            fontSize: '50px',
            fill: '#FFD700',
            fontStyle: 'bold',
            stroke: '#8B4513',
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        this.add.text(width / 2, 108, 'As Aventuras de Miguel  ·  Jogo Educativo', {
            fontSize: '16px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5, 0);

        this.tweens.add({ targets: title, y: 36, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        const miguel = this.add.sprite(width / 2, height - 90, 'miguel', 5);
        miguel.setScale(0.24);
        miguel.setCrop(0, 100, 256, 284);
        miguel.play('miguel_andar');
        this.tweens.add({ targets: miguel, y: height - 100, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        const savedData = SaveSystem.load();

        if (savedData) {
            this._createButton(width / 2, height / 2 - 40, '▶  Continuar (Fase ' + savedData.fase + ')', 0x1E90FF, () => {
                this.scene.start('MapScene', { save: savedData });
            });
        }

        this._createButton(width / 2, height / 2 + 15, '🎮  Novo Jogo', 0x228B22, () => {
            SaveSystem.reset();
            this.scene.start('MapScene', { save: SaveSystem.defaultData() });
        });

        this._createButton(width / 2, height / 2 + 70, '🗺️  Ver Mapa dos Mundos', 0x9C27B0, () => {
            this.scene.start('MapScene', { save: savedData || SaveSystem.defaultData() });
        });

        if (savedData && savedData.moedas > 0) {
            const panel = this.add.graphics();
            panel.fillStyle(0x000000, 0.45);
            panel.fillRoundedRect(width / 2 - 140, height / 2 + 110, 280, 36, 8);
            this.add.text(width / 2, height / 2 + 128, `🪙 ${savedData.moedas} moedas   ⭐ ${savedData.pontos} pontos`, {
                fontSize: '15px', fill: '#FFD700', fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        this.add.text(width / 2, height - 12, 'Use ←→ para mover  |  ↑ para pular  |  Shift para correr', {
            fontSize: '12px', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5);

        this._setupParticles(width, height);
    }

    _createButton(x, y, label, color, callback) {
        const btn = this.add.graphics();
        btn.fillStyle(color, 1);
        btn.fillRoundedRect(-148, -22, 296, 44, 10);
        btn.lineStyle(3, 0xFFFFFF, 0.6);
        btn.strokeRoundedRect(-148, -22, 296, 44, 10);
        btn.setPosition(x, y);
        btn.setInteractive(new Phaser.Geom.Rectangle(-148, -22, 296, 44), Phaser.Geom.Rectangle.Contains);

        const txt = this.add.text(x, y, label, {
            fontSize: '19px', fill: '#FFFFFF', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5);

        btn.on('pointerover', () => { btn.setScale(1.06); txt.setScale(1.06); });
        btn.on('pointerout',  () => { btn.setScale(1);    txt.setScale(1);    });
        btn.on('pointerdown', () => {
            this.tweens.add({ targets: [btn, txt], scaleX: 0.96, scaleY: 0.96, duration: 80, yoyo: true, onComplete: callback });
        });
        return btn;
    }

    _setupParticles(width, height) {
        this.time.addEvent({
            delay: 700, loop: true,
            callback: () => {
                const star = this.add.image(
                    Phaser.Math.Between(20, width - 20),
                    Phaser.Math.Between(150, height - 80),
                    'estrela'
                ).setAlpha(0).setScale(Phaser.Math.FloatBetween(0.3, 0.7));
                this.tweens.add({
                    targets: star, alpha: 0.9, y: star.y - 45, duration: 800,
                    onComplete: () => this.tweens.add({ targets: star, alpha: 0, duration: 500, onComplete: () => star.destroy() })
                });
            }
        });
    }
}
