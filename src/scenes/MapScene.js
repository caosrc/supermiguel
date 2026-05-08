class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    init(data) {
        this.fromWorld = data.fromWorld || null;
    }

    create() {
        const { width, height } = this.scale;
        const save = SaveSystem.load() || SaveSystem.defaultData();

        this._drawBackground(width, height);
        this._drawPath();

        this.worlds = [
            {
                key: 'cidade',    name: 'Mundo 1\nCidade Alegre',  scene: 'GameScene',     x: 110, y: 390,
                color: 0x4169E1, light: 0x87CEEB, icon: '🏙️',  description: 'Explore a cidade, ajude a família!'
            },
            {
                key: 'fazenda',   name: 'Mundo 2\nFazenda do Sol', scene: 'FazendaScene',  x: 280, y: 300,
                color: 0x228B22, light: 0x7CFC00, icon: '🌾', description: 'Cuide dos animais da fazenda!'
            },
            {
                key: 'floresta',  name: 'Mundo 3\nMata Encantada', scene: 'FlorestaScene', x: 450, y: 250,
                color: 0x1A5C00, light: 0x32CD32, icon: '🌳', description: 'Explore a floresta mágica!'
            },
            {
                key: 'cachoeira', name: 'Mundo 4\nCachoeira Cristalina', scene: 'CachoeirScene', x: 630, y: 300,
                color: 0x0077BB, light: 0x00BFFF, icon: '💧', description: 'Aventure-se nas cachoeiras!'
            },
            {
                key: 'doces',     name: 'Mundo 5\nMundo dos Doces', scene: 'DocesScene',   x: 800, y: 390,
                color: 0xCC2277, light: 0xFF69B4, icon: '🍭', description: 'Descubra o mundo dos doces!'
            }
        ];

        const visited = save.cidadesVisitadas || [];

        this.worlds.forEach((w, i) => {
            this._drawWorldNode(w, i, visited.includes(w.key), save);
        });

        this._drawMiguelOnMap(save, visited);
        this._drawTitle(width);
        this._drawLegend(width, height, save);
        this._spawnStars(width, height);
    }

    _drawBackground(width, height) {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1B6CA8, 0x1B6CA8, 0x2E8B22, 0x2E8B22, 1);
        bg.fillRect(0, 0, width, height);

        const terrain = this.add.graphics();
        terrain.fillStyle(0x228B22);
        terrain.fillEllipse(150, 460, 300, 120);
        terrain.fillEllipse(450, 470, 400, 100);
        terrain.fillEllipse(750, 460, 280, 110);
        terrain.fillRect(0, 430, width, 70);

        terrain.fillStyle(0x1A7A1A);
        terrain.fillEllipse(280, 350, 200, 80);
        terrain.fillEllipse(470, 300, 250, 70);
        terrain.fillEllipse(650, 350, 200, 80);

        terrain.fillStyle(0x4FC3F7, 0.6);
        terrain.fillEllipse(540, 360, 120, 40);
        terrain.fillEllipse(480, 355, 80, 30);

        for (let i = 0; i < 8; i++) {
            const cloud = this.add.image(60 + i * 120 + Phaser.Math.Between(-20, 20), Phaser.Math.Between(30, 120), 'cloud');
            cloud.setAlpha(0.7).setScale(Phaser.Math.FloatBetween(0.6, 1.1));
            this.tweens.add({ targets: cloud, x: cloud.x + 20, duration: Phaser.Math.Between(4000, 8000), yoyo: true, repeat: -1 });
        }
    }

    _drawPath() {
        const path = this.add.graphics();
        path.lineStyle(12, 0xF5DEB3, 1);
        path.lineBetween(110, 390, 280, 300);
        path.lineBetween(280, 300, 450, 250);
        path.lineBetween(450, 250, 630, 300);
        path.lineBetween(630, 300, 800, 390);

        const dots = this.add.graphics();
        dots.fillStyle(0xFFD700);
        const waypoints = [
            [190, 340],[225, 312],
            [365, 270],[400, 258],
            [540, 272],[580, 284],
            [715, 345]
        ];
        waypoints.forEach(([x, y]) => dots.fillCircle(x, y, 5));
    }

    _drawWorldNode(world, idx, visited, save) {
        const R = 38;
        const g = this.add.graphics();

        g.fillStyle(0x000000, 0.3);
        g.fillCircle(world.x + 3, world.y + 3, R);

        g.fillStyle(world.color);
        g.fillCircle(world.x, world.y, R);
        g.fillStyle(world.light, 0.4);
        g.fillCircle(world.x - 10, world.y - 12, R * 0.55);

        g.lineStyle(4, 0xFFD700, visited ? 1 : 0.3);
        g.strokeCircle(world.x, world.y, R);

        if (!visited) {
            g.fillStyle(0x000000, 0.45);
            g.fillCircle(world.x, world.y, R);
            const lockTxt = this.add.text(world.x, world.y, '🔓', { fontSize: '22px' }).setOrigin(0.5);
            lockTxt.setAlpha(0.7);
        }

        const numTxt = this.add.text(world.x, world.y - 6, (idx + 1).toString(), {
            fontSize: '28px', fill: '#FFFFFF', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        const nameTxt = this.add.text(world.x, world.y + R + 10, world.name, {
            fontSize: '11px', fill: '#FFFFFF', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5, 0);

        if (visited) {
            this.add.text(world.x + R - 4, world.y - R + 4, '⭐', { fontSize: '14px' }).setOrigin(0.5);
        }

        const hitArea = this.add.zone(world.x, world.y, R * 2.2, R * 2.2).setInteractive();
        hitArea.on('pointerover', () => {
            this.tweens.add({ targets: [g, numTxt, nameTxt], scaleX: 1.12, scaleY: 1.12, duration: 120 });
            this._showTooltip(world);
        });
        hitArea.on('pointerout', () => {
            this.tweens.add({ targets: [g, numTxt, nameTxt], scaleX: 1, scaleY: 1, duration: 120 });
            this._hideTooltip();
        });
        hitArea.on('pointerdown', () => {
            this.cameras.main.flash(200, 255, 255, 255);
            this.time.delayedCall(220, () => {
                const sd = SaveSystem.load() || SaveSystem.defaultData();
                this.scene.start(world.scene, { save: sd });
            });
        });

    }

    _showTooltip(world) {
        const { width } = this.scale;
        if (this._tooltip) this._tooltip.destroy();
        this._tooltipBg = this.add.graphics();
        this._tooltipBg.fillStyle(0x000000, 0.8);
        this._tooltipBg.fillRoundedRect(width / 2 - 160, 8, 320, 36, 8);
        this._tooltip = this.add.text(width / 2, 26, world.description, {
            fontSize: '14px', fill: '#FFD700', fontStyle: 'bold'
        }).setOrigin(0.5);
    }

    _hideTooltip() {
        if (this._tooltip) { this._tooltip.destroy(); this._tooltip = null; }
        if (this._tooltipBg) { this._tooltipBg.destroy(); this._tooltipBg = null; }
    }

    _drawMiguelOnMap(save, visited) {
        const last = visited[visited.length - 1];
        const w = this.worlds.find(w => w.key === last) || this.worlds[0];
        const mig = this.add.sprite(w.x - 30, w.y - 30, 'miguel', 5);
        mig.setScale(0.12).setCrop(0, 100, 256, 284).setDepth(10);
        mig.play('miguel_parado');
        this.tweens.add({ targets: mig, y: mig.y - 6, duration: 700, yoyo: true, repeat: -1 });
    }

    _drawTitle(width) {
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.55);
        panel.fillRoundedRect(width / 2 - 200, 140, 400, 70, 12);

        this.add.text(width / 2, 158, '🗺️  Mapa das Aventuras', {
            fontSize: '24px', fill: '#FFD700', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5, 0);

        this.add.text(width / 2, 192, 'Escolha um mundo para explorar!', {
            fontSize: '14px', fill: '#FFFFFF', stroke: '#000000', strokeThickness: 2
        }).setOrigin(0.5, 0);

        const menuBtn = this.add.text(16, 14, '⬅ Menu', {
            fontSize: '16px', fill: '#FFFFFF',
            backgroundColor: '#000000AA', padding: { x: 10, y: 6 }
        }).setInteractive().setDepth(50);
        menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    }

    _drawLegend(width, height, save) {
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.55);
        panel.fillRoundedRect(8, height - 50, 260, 42, 8);

        const moedas = save.moedas || 0;
        const pontos = save.pontos || 0;
        this.add.text(18, height - 42, `🪙 ${moedas}  ⭐ ${pontos} pts`, {
            fontSize: '15px', fill: '#FFD700', fontStyle: 'bold'
        });
        this.add.text(18, height - 22, 'Dica: Explore todos os mundos!', {
            fontSize: '12px', fill: '#AAFFAA'
        });
    }

    _spawnStars(width, height) {
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                const star = this.add.image(Phaser.Math.Between(20, width - 20), Phaser.Math.Between(20, 130), 'estrela')
                    .setAlpha(0).setScale(0.4);
                this.tweens.add({
                    targets: star, alpha: 0.9, y: star.y - 30, duration: 700,
                    onComplete: () => this.tweens.add({ targets: star, alpha: 0, duration: 500, onComplete: () => star.destroy() })
                });
            }
        });
    }
}
