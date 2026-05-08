class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x228B22, 0x228B22, 1);
        bg.fillRect(0, 0, width, height);

        for (let i = 0; i < 6; i++) {
            const cloud = this.add.image(
                Phaser.Math.Between(50, width - 50),
                Phaser.Math.Between(20, 120),
                'cloud'
            ).setAlpha(0.8).setScale(Phaser.Math.FloatBetween(0.7, 1.2));
            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(-30, 30),
                duration: Phaser.Math.Between(3000, 6000),
                yoyo: true,
                repeat: -1
            });
        }

        for (let i = 0; i < 8; i++) {
            this.add.image(
                60 + i * 120,
                height - 70,
                'tree'
            ).setScale(0.9);
        }

        this.add.image(width / 2, height - 20, 'ground').setScale(1);

        const titlePanel = this.add.graphics();
        titlePanel.fillStyle(0x000000, 0.45);
        titlePanel.fillRoundedRect(width / 2 - 220, 30, 440, 100, 14);

        const title = this.add.text(width / 2, 55, 'SUPER MIGUEL', {
            fontSize: '46px',
            fill: '#FFD700',
            fontStyle: 'bold',
            stroke: '#8B4513',
            strokeThickness: 6
        }).setOrigin(0.5, 0);

        this.add.text(width / 2, 112, 'Jogo Educativo de Minas Gerais', {
            fontSize: '18px',
            fill: '#FFFFFF',
            stroke: '#333333',
            strokeThickness: 2
        }).setOrigin(0.5, 0);

        this.tweens.add({
            targets: title,
            y: 50,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const miguel = this.add.sprite(width / 2, height - 95, 'miguel', 5);
        miguel.setScale(0.30);
        miguel.play('miguel_andar');
        this.tweens.add({
            targets: miguel,
            y: height - 105,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const savedData = SaveSystem.load();

        const btnNewGame = this._createButton(width / 2, height / 2 + 30, '🎮  Novo Jogo', 0x228B22, () => {
            SaveSystem.reset();
            this.scene.start('GameScene', { save: SaveSystem.defaultData() });
        });

        if (savedData) {
            const btnContinue = this._createButton(width / 2, height / 2 - 30, '▶  Continuar (Fase ' + savedData.fase + ')', 0x1E90FF, () => {
                this.scene.start('GameScene', { save: savedData });
            });
        }

        this._createButton(width / 2, height / 2 + 95, '🌄  Ir para a Fazenda', 0x8B4513, () => {
            this.scene.start('FazendaScene', { save: savedData || SaveSystem.defaultData() });
        });

        this.add.text(width / 2, height - 18, 'Use ←→ para mover | ↑ para pular | Z ou ⭐ para agir', {
            fontSize: '13px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this._setupParticles(width, height);
    }

    _createButton(x, y, label, color, callback) {
        const btn = this.add.graphics();
        btn.fillStyle(color, 1);
        btn.fillRoundedRect(-130, -22, 260, 44, 10);
        btn.lineStyle(3, 0xFFFFFF, 0.6);
        btn.strokeRoundedRect(-130, -22, 260, 44, 10);
        btn.setPosition(x, y);
        btn.setInteractive(new Phaser.Geom.Rectangle(-130, -22, 260, 44), Phaser.Geom.Rectangle.Contains);

        const txt = this.add.text(x, y, label, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        btn.on('pointerover', () => {
            btn.setScale(1.06);
            txt.setScale(1.06);
        });
        btn.on('pointerout', () => {
            btn.setScale(1);
            txt.setScale(1);
        });
        btn.on('pointerdown', () => {
            this.tweens.add({ targets: [btn, txt], scaleX: 0.96, scaleY: 0.96, duration: 80, yoyo: true, onComplete: callback });
        });

        return btn;
    }

    _setupParticles(width, height) {
        this.time.addEvent({
            delay: 800,
            loop: true,
            callback: () => {
                const star = this.add.image(
                    Phaser.Math.Between(20, width - 20),
                    Phaser.Math.Between(140, height - 80),
                    'estrela'
                ).setAlpha(0).setScale(0.5);
                this.tweens.add({
                    targets: star,
                    alpha: 0.8,
                    y: star.y - 40,
                    duration: 800,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: star,
                            alpha: 0,
                            duration: 600,
                            onComplete: () => star.destroy()
                        });
                    }
                });
            }
        });
    }
}
