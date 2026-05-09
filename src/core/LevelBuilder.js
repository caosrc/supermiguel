class LevelBuilder {
    constructor(scene) {
        this.scene = scene;
        this.platforms = null;
        this.enemies = null;
        this.collectibles = null;
        this.hazards = null;
        this.decorations = null;
        this.goal = null;
        this.stars = [];
        this.worldBounds = { width: 3200, height: 540 };
    }

    init(worldWidth = 3200) {
        this.worldBounds.width = worldWidth;
        this.scene.physics.world.setBounds(0, 0, worldWidth, 800);
        this.scene.cameras.main.setBounds(0, 0, worldWidth, 600);

        this.platforms   = this.scene.physics.add.staticGroup();
        this.enemies     = this.scene.physics.add.group();
        this.collectibles= this.scene.physics.add.staticGroup();
        this.hazards     = this.scene.physics.add.staticGroup();
        this.decorations = this.scene.add.group();
        this.stars       = [];
        return this;
    }

    addPlatform(x, y, w, h, color = COLORS.PLATFORM, alpha = 1) {
        const g = this.scene.add.graphics();
        const r = 8;
        g.fillStyle(color, alpha);
        g.fillRoundedRect(0, 0, w, h, r);
        g.fillStyle(Phaser.Display.Color.ValueToColor(color).brighten(20).color, 1);
        g.fillRoundedRect(0, 0, w, 8, { tl: r, tr: r, bl: 0, br: 0 });
        g.lineStyle(2, 0x000000, 0.3);
        g.strokeRoundedRect(0, 0, w, h, r);
        g.generateTexture('plat_' + x + '_' + y, w, h);
        g.destroy();

        const p = this.platforms.create(x + w / 2, y + h / 2, 'plat_' + x + '_' + y);
        p.refreshBody();
        p.setAlpha(alpha);
        return p;
    }

    addGroundRow(y, color = COLORS.GROUND, h = 40) {
        const w = this.worldBounds.width;
        const g = this.scene.add.graphics();
        g.fillStyle(color, 1);
        g.fillRect(0, 0, w, h);
        g.fillStyle(Phaser.Display.Color.ValueToColor(color).brighten(15).color, 1);
        g.fillRect(0, 0, w, 8);
        g.generateTexture('ground_row', w, h);
        g.destroy();
        const p = this.platforms.create(w / 2, y + h / 2, 'ground_row');
        p.setDisplaySize(w, h);
        p.refreshBody();
        return p;
    }

    addCoin(x, y, value = 1) {
        const g = this.scene.add.graphics();
        g.fillStyle(0xffd700, 1);
        g.fillCircle(12, 12, 12);
        g.fillStyle(0xffec6e, 1);
        g.fillCircle(9, 9, 6);
        g.lineStyle(2, 0xc8a000, 1);
        g.strokeCircle(12, 12, 12);
        g.generateTexture('coin_item', 24, 24);
        g.destroy();

        const c = this.collectibles.create(x, y, 'coin_item');
        c.setData('type', 'coin');
        c.setData('value', value);
        this.scene.tweens.add({ targets: c, y: y - 8, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
        return c;
    }

    addStar(x, y) {
        const g = this.scene.add.graphics();
        g.fillStyle(0xffeb3b, 1);
        drawStar(g, 16, 16, 5, 16, 8, 0);
        g.fillStyle(0xffffff, 0.6);
        drawStar(g, 16, 16, 5, 8, 4, 0);
        g.generateTexture('star_item', 32, 32);
        g.destroy();

        const s = this.collectibles.create(x, y, 'star_item');
        s.setData('type', 'star');
        this.stars.push(s);
        this.scene.tweens.add({ targets: s, y: y - 12, rotation: Math.PI * 2, duration: 1200, yoyo: false, repeat: -1, ease: 'Sine.InOut' });
        return s;
    }

    addEnemy(x, y, type = 'robot', patrolDist = 150) {
        const colors = {
            robot:   0x607d8b,
            bee:     0xffc107,
            fish:    0xff7043,
            ghost:   0x90caf9,
            slime:   0x66bb6a,
            bat:     0x7e57c2,
            crab:    0xff8f00,
        };
        const color = colors[type] || 0x888888;
        const g = this.scene.add.graphics();
        this._drawEnemy(g, type, color);
        g.generateTexture('enemy_' + type + '_' + x, 50, 50);
        g.destroy();

        const e = this.enemies.create(x, y, 'enemy_' + type + '_' + x);
        e.setData('type', type);
        e.setData('health', 1);
        e.setData('startX', x);
        e.setData('patrolDist', patrolDist);
        e.setData('dir', 1);
        e.body.setAllowGravity(true);
        e.body.setCollideWorldBounds(true);
        return e;
    }

    _drawEnemy(g, type, color) {
        g.fillStyle(color, 1);
        switch (type) {
            case 'robot':
                g.fillRect(10, 5, 30, 30);
                g.fillStyle(0xff4444, 1);
                g.fillCircle(18, 16, 5);
                g.fillCircle(32, 16, 5);
                g.fillStyle(0x333333, 1);
                g.fillRect(10, 35, 12, 12);
                g.fillRect(28, 35, 12, 12);
                break;
            case 'bee':
                g.fillEllipse(25, 20, 32, 22);
                g.fillStyle(0x222222, 1);
                g.fillEllipse(25, 18, 20, 8);
                g.fillStyle(0xffffff, 0.7);
                g.fillEllipse(14, 14, 16, 10);
                g.fillEllipse(36, 14, 16, 10);
                break;
            case 'fish':
                g.fillEllipse(22, 25, 36, 20);
                g.fillStyle(0xff4444, 1);
                g.fillTriangle(40, 20, 50, 14, 50, 30);
                g.fillStyle(0xffffff, 1);
                g.fillCircle(14, 22, 5);
                g.fillStyle(0x000000, 1);
                g.fillCircle(14, 22, 3);
                break;
            case 'ghost':
                g.fillStyle(color, 0.85);
                g.fillEllipse(25, 20, 38, 32);
                g.fillRect(6, 18, 38, 20);
                g.fillStyle(0x1a1a2e, 1);
                g.fillCircle(18, 18, 5);
                g.fillCircle(32, 18, 5);
                break;
            default:
                g.fillCircle(25, 22, 20);
                g.fillStyle(0x000000, 1);
                g.fillCircle(20, 18, 4);
                g.fillCircle(30, 18, 4);
        }
    }

    addHazard(x, y, w, h, type = 'spike') {
        const g = this.scene.add.graphics();
        if (type === 'spike') {
            g.fillStyle(0x888888, 1);
            const count = Math.floor(w / 16);
            for (let i = 0; i < count; i++) {
                g.fillTriangle(i * 16, h, i * 16 + 8, 0, i * 16 + 16, h);
            }
        } else if (type === 'lava') {
            g.fillStyle(0xff4500, 1);
            g.fillRect(0, 0, w, h);
            g.fillStyle(0xff8c00, 1);
            for (let i = 0; i < w; i += 20) {
                g.fillEllipse(i + 10, 0, 20, 12);
            }
        } else if (type === 'water') {
            g.fillStyle(0x0288d1, 0.8);
            g.fillRect(0, 0, w, h);
        }
        g.generateTexture('hazard_' + type + '_' + x, w, h);
        g.destroy();
        const hz = this.hazards.create(x + w / 2, y + h / 2, 'hazard_' + type + '_' + x);
        hz.setData('type', type);
        hz.refreshBody();
        return hz;
    }

    addGoal(x, y) {
        const g = this.scene.add.graphics();
        g.fillStyle(0x00e676, 1);
        g.fillRect(0, 0, 8, 80);
        g.fillStyle(0xffd700, 1);
        g.fillTriangle(8, 0, 8, 40, 56, 20);
        g.lineStyle(2, 0x00a152, 1);
        g.strokeRect(0, 0, 8, 80);
        g.generateTexture('goal_flag', 56, 80);
        g.destroy();

        this.goal = this.scene.add.image(x, y, 'goal_flag').setDepth(80);
        this.scene.physics.add.existing(this.goal, true);

        this.scene.tweens.add({
            targets: this.goal,
            y: y - 6,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut'
        });

        const glow = this.scene.add.graphics().setDepth(79);
        this.scene.tweens.add({
            duration: 800, yoyo: true, repeat: -1,
            onUpdate: (tween) => {
                glow.clear();
                glow.fillStyle(0x00e676, 0.15 + tween.getValue() * 0.2);
                glow.fillCircle(x + 4, y - 20, 40 + tween.getValue() * 15);
            }
        });
        return this.goal;
    }

    addDecoration(x, y, type, scale = 1) {
        const g = this.scene.add.graphics().setDepth(30);
        this._drawDecoration(g, type, x, y);
        g.setScale(scale);
        this.decorations.add(g);
        return g;
    }

    _drawDecoration(g, type, x, y) {
        switch (type) {
            case 'tree':
                g.fillStyle(0x5c3010, 1);
                g.fillRect(x - 8, y - 20, 16, 60);
                g.fillStyle(0x2d8a3e, 1);
                g.fillCircle(x, y - 40, 36);
                g.fillCircle(x - 20, y - 28, 24);
                g.fillCircle(x + 20, y - 28, 24);
                g.fillStyle(0x3da850, 1);
                g.fillCircle(x - 8, y - 48, 20);
                break;
            case 'bush':
                g.fillStyle(0x33a850, 1);
                g.fillCircle(x, y, 22);
                g.fillCircle(x - 16, y + 4, 16);
                g.fillCircle(x + 16, y + 4, 16);
                g.fillStyle(0x4cba62, 1);
                g.fillCircle(x, y - 8, 14);
                break;
            case 'cloud':
                g.fillStyle(0xffffff, 0.9);
                g.fillEllipse(x, y, 80, 30);
                g.fillEllipse(x - 20, y - 12, 50, 32);
                g.fillEllipse(x + 18, y - 10, 40, 28);
                break;
            case 'house':
                g.fillStyle(0xf5deb3, 1);
                g.fillRect(x, y - 50, 70, 50);
                g.fillStyle(0xb22222, 1);
                g.fillTriangle(x - 5, y - 50, x + 35, y - 90, x + 75, y - 50);
                g.fillStyle(0x4169e1, 1);
                g.fillRect(x + 20, y - 20, 14, 20);
                g.fillStyle(0x8b6914, 1);
                g.fillRect(x + 26, y - 50, 6, 50);
                break;
            case 'flower':
                g.fillStyle(0xff69b4, 1);
                g.fillCircle(x, y - 16, 8);
                for (let i = 0; i < 5; i++) {
                    const a = (i / 5) * Math.PI * 2;
                    g.fillCircle(x + Math.cos(a) * 10, y - 16 + Math.sin(a) * 10, 6);
                }
                g.fillStyle(0xffeb3b, 1);
                g.fillCircle(x, y - 16, 6);
                g.fillStyle(0x4caf50, 1);
                g.fillRect(x - 2, y - 8, 4, 20);
                break;
            case 'rock':
                g.fillStyle(0x808080, 1);
                g.fillEllipse(x, y, 44, 28);
                g.fillStyle(0xa0a0a0, 1);
                g.fillEllipse(x - 6, y - 4, 22, 16);
                break;
            case 'mushroom':
                g.fillStyle(0xff4444, 1);
                g.fillEllipse(x, y - 24, 44, 32);
                g.fillStyle(0xffffff, 1);
                g.fillCircle(x - 10, y - 28, 6);
                g.fillCircle(x + 10, y - 22, 5);
                g.fillStyle(0xf5deb3, 1);
                g.fillRoundedRect(x - 8, y - 8, 16, 24, 4);
                break;
            case 'lamp':
                g.fillStyle(0x555555, 1);
                g.fillRect(x - 3, y - 60, 6, 60);
                g.fillStyle(0xffd700, 0.9);
                g.fillCircle(x, y - 64, 12);
                g.fillStyle(0xffff88, 0.4);
                g.fillCircle(x, y - 64, 20);
                break;
        }
    }

    updateEnemies(delta) {
        if (!this.enemies) return;
        this.enemies.getChildren().forEach(e => {
            if (!e.active) return;
            const startX = e.getData('startX');
            const dist = e.getData('patrolDist');
            let dir = e.getData('dir');
            if (e.x > startX + dist) { dir = -1; e.setFlipX(true); }
            else if (e.x < startX - dist) { dir = 1; e.setFlipX(false); }
            e.setData('dir', dir);
            e.setVelocityX(dir * 70);
            e.body.setAllowGravity(true);
        });
    }
}
