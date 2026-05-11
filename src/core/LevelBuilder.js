class LevelBuilder {
    constructor(scene) {
        this.scene        = scene;
        this.platforms    = null;
        this.enemies      = null;
        this.collectibles = null;
        this.hazards      = null;
        this.decorations  = null;
        this.goal         = null;
        this.stars        = [];
        this.worldBounds  = { width: 3200, height: 540 };

        this._enemySmElapsed  = 0;
        this._enemySmInterval = 95;
    }

    init(worldWidth = 3200) {
        this.worldBounds.width = worldWidth;
        this.scene.physics.world.setBounds(0, 0, worldWidth, 800);
        this.scene.cameras.main.setBounds(0, 0, worldWidth, 600);

        this.platforms    = this.scene.physics.add.staticGroup();
        this.enemies      = this.scene.physics.add.group();
        this.collectibles = this.scene.physics.add.staticGroup();
        this.hazards      = this.scene.physics.add.staticGroup();
        this.decorations  = this.scene.add.group();
        this.stars        = [];
        return this;
    }

    addPlatform(x, y, w, h, color = COLORS.PLATFORM, alpha = 1) {
        const g = this.scene.add.graphics();
        const r = 6;

        const shadow = Phaser.Display.Color.ValueToColor(color).darken(28).color;
        g.fillStyle(shadow, 0.5 * alpha);
        g.fillRoundedRect(4, 4, w, h, r);

        g.fillStyle(color, alpha);
        g.fillRoundedRect(0, 0, w, h, r);

        const lit = Phaser.Display.Color.ValueToColor(color).brighten(22).color;
        g.fillStyle(lit, alpha * 0.55);
        g.fillRoundedRect(0, 0, w, 7, { tl: r, tr: r, bl: 0, br: 0 });

        for (let xi = 0; xi < w; xi += 28) {
            g.fillStyle(0x000000, 0.06 * alpha);
            g.fillRect(xi, 0, 14, h);
        }

        g.lineStyle(3, 0x000000, 0.65 * alpha);
        g.strokeRoundedRect(0, 0, w, h, r);
        g.lineStyle(1.2, 0xffffff, 0.18 * alpha);
        g.strokeRoundedRect(2, 2, w - 4, h - 4, r - 1);

        g.generateTexture('plat_' + x + '_' + y, w + 8, h + 8);
        g.destroy();

        const p = this.platforms.create(x + w / 2, y + h / 2, 'plat_' + x + '_' + y);
        p.refreshBody();
        p.setAlpha(alpha);
        return p;
    }

    addGroundRow(y, color = COLORS.GROUND, h = 40) {
        const w  = this.worldBounds.width;
        const g  = this.scene.add.graphics();
        const sh = Phaser.Display.Color.ValueToColor(color).darken(22).color;
        const lt = Phaser.Display.Color.ValueToColor(color).brighten(18).color;

        g.fillStyle(sh, 0.4);
        g.fillRect(0, 4, w, h);

        g.fillStyle(color, 1);
        g.fillRect(0, 0, w, h);

        g.fillStyle(lt, 0.6);
        g.fillRect(0, 0, w, 8);

        for (let xi = 0; xi < w; xi += 36) {
            g.fillStyle(0x000000, 0.07);
            g.fillRect(xi, 0, 18, h);
        }

        g.lineStyle(3, 0x000000, 0.6);
        g.strokeRect(0, 0, w, h);

        g.generateTexture('ground_row', w, h + 4);
        g.destroy();

        const p = this.platforms.create(w / 2, y + h / 2, 'ground_row');
        p.setDisplaySize(w, h + 4);
        p.refreshBody();
        return p;
    }

    addCoin(x, y, value = 1) {
        const g = this.scene.add.graphics();
        g.fillStyle(0x000000, 0.25);
        g.fillCircle(14, 14, 12);
        g.fillStyle(0xffd700, 1);
        g.fillCircle(12, 12, 12);
        g.fillStyle(0xffec6e, 1);
        g.fillCircle(9, 9, 6);
        g.fillStyle(0xffa000, 1);
        g.fillCircle(12, 12, 5);
        g.fillStyle(0xffd700, 1);
        g.fillCircle(12, 12, 3);
        g.lineStyle(2.5, 0xb8860b, 1);
        g.strokeCircle(12, 12, 12);
        g.generateTexture('coin_item', 26, 26);
        g.destroy();

        const c = this.collectibles.create(x, y, 'coin_item');
        c.setData('type', 'coin');
        c.setData('value', value);

        let smT = 0, smI = 90, bobPhase = Math.random() * Math.PI * 2;
        this.scene.events.on('update', (time, delta) => {
            if (!c.active) return;
            smT += delta;
            if (smT >= smI) {
                smT -= smI;
                bobPhase += 0.35;
                c.y = y - 7 + Math.sin(bobPhase) * 7;
                c.setAngle((Math.random() - 0.5) * 6);
            }
        });
        return c;
    }

    addStar(x, y) {
        const g = this.scene.add.graphics();
        g.fillStyle(0x000000, 0.22);
        drawStar(g, 18, 18, 5, 16, 8, 0);
        g.fillStyle(0xffeb3b, 1);
        drawStar(g, 16, 16, 5, 16, 8, 0);
        g.fillStyle(0xffffff, 0.65);
        drawStar(g, 16, 16, 5, 8, 4, 0);
        g.lineStyle(2, 0xc8a000, 0.8);
        drawStar(g, 16, 16, 5, 16, 8, 0);
        g.generateTexture('star_item', 34, 34);
        g.destroy();

        const s = this.collectibles.create(x, y, 'star_item');
        s.setData('type', 'star');
        this.stars.push(s);

        let smT = 0, smI = 90, rotPhase = Math.random() * Math.PI * 2;
        this.scene.events.on('update', (time, delta) => {
            if (!s.active) return;
            smT += delta;
            if (smT >= smI) {
                smT -= smI;
                rotPhase += 0.45;
                s.y        = y - 10 + Math.sin(rotPhase) * 10;
                s.rotation = Math.sin(rotPhase * 0.7) * 0.12;
                s.setAngle(s.angle + (Math.random() - 0.5) * 4);
            }
        });
        return s;
    }

    addEnemy(x, y, type = 'robot', patrolDist = 150) {
        const colors = {
            robot: 0x607d8b, bee: 0xffc107, fish: 0xff7043,
            ghost: 0x90caf9, slime: 0x66bb6a, bat: 0x7e57c2, crab: 0xff8f00,
        };
        const color = colors[type] || 0x888888;
        const g = this.scene.add.graphics();
        this._drawEnemy(g, type, color);
        g.generateTexture('enemy_' + type + '_' + x, 56, 56);
        g.destroy();

        const e = this.enemies.create(x, y, 'enemy_' + type + '_' + x);
        e.setData('type', type);
        e.setData('health', 1);
        e.setData('startX', x);
        e.setData('patrolDist', patrolDist);
        e.setData('dir', 1);
        e.setData('smTimer', 0);
        e.body.setAllowGravity(true);
        e.body.setCollideWorldBounds(true);
        return e;
    }

    _drawEnemy(g, type, color) {
        g.fillStyle(color, 1);
        switch (type) {
            case 'robot':
                g.fillStyle(0x000000, 0.25); g.fillRect(12, 7, 32, 34);
                g.fillStyle(color, 1);        g.fillRect(10, 5, 30, 30);
                g.fillStyle(Phaser.Display.Color.ValueToColor(color).brighten(18).color, 1);
                g.fillRect(10, 5, 30, 8);
                g.fillStyle(0xff4444, 1); g.fillCircle(18, 16, 5); g.fillCircle(32, 16, 5);
                g.fillStyle(0xffcc00, 0.7); g.fillCircle(19, 15, 2); g.fillCircle(33, 15, 2);
                g.fillStyle(0x333333, 1); g.fillRect(10, 35, 12, 14); g.fillRect(28, 35, 12, 14);
                g.fillStyle(0x555, 0.5); g.fillRect(15, 35, 4, 14); g.fillRect(33, 35, 4, 14);
                g.lineStyle(2.5, 0x000000, 0.8); g.strokeRect(10, 5, 30, 30);
                break;
            case 'bee':
                g.fillStyle(0x000000, 0.2); g.fillEllipse(27, 22, 34, 24);
                g.fillStyle(color, 1);       g.fillEllipse(25, 20, 32, 22);
                g.fillStyle(0x222222, 1);    g.fillEllipse(25, 18, 20, 8);
                g.fillStyle(0x000000, 0.5);  g.fillEllipse(22, 20, 8, 20); g.fillEllipse(28, 20, 8, 20);
                g.fillStyle(0xffffff, 0.75); g.fillEllipse(14, 14, 16, 10); g.fillEllipse(36, 14, 16, 10);
                g.lineStyle(2, 0x000000, 0.7); g.strokeEllipse(25, 20, 32, 22);
                break;
            case 'fish':
                g.fillStyle(0x000000, 0.2); g.fillEllipse(24, 27, 38, 22);
                g.fillStyle(color, 1);       g.fillEllipse(22, 25, 36, 20);
                g.fillStyle(0xff4444, 1);    g.fillTriangle(40, 20, 50, 14, 50, 30);
                g.fillStyle(0xffffff, 1);    g.fillCircle(14, 22, 5);
                g.fillStyle(0x000000, 1);    g.fillCircle(14, 22, 3);
                g.lineStyle(2, 0x000000, 0.7); g.strokeEllipse(22, 25, 36, 20);
                break;
            case 'ghost':
                g.fillStyle(color, 0.2); g.fillEllipse(27, 22, 40, 34);
                g.fillStyle(color, 0.88); g.fillEllipse(25, 20, 38, 32);
                g.fillRect(6, 18, 38, 20);
                g.fillStyle(0x1a1a2e, 1); g.fillCircle(18, 18, 5); g.fillCircle(32, 18, 5);
                g.fillStyle(0xffffff, 0.5); g.fillCircle(17, 16, 2); g.fillCircle(31, 16, 2);
                break;
            default:
                g.fillStyle(0x000000, 0.22); g.fillCircle(27, 24, 21);
                g.fillStyle(color, 1);        g.fillCircle(25, 22, 20);
                g.fillStyle(0x000000, 1);     g.fillCircle(20, 18, 4); g.fillCircle(30, 18, 4);
                g.lineStyle(2, 0x000000, 0.75); g.strokeCircle(25, 22, 20);
        }
    }

    addHazard(x, y, w, h, type = 'spike') {
        const g = this.scene.add.graphics();
        if (type === 'spike') {
            g.fillStyle(0x000000, 0.28);
            const count = Math.floor(w / 16);
            for (let i = 0; i < count; i++) g.fillTriangle(i * 16 + 2, h, i * 16 + 8, 2, i * 16 + 14, h);
            g.fillStyle(0x888888, 1);
            for (let i = 0; i < count; i++) g.fillTriangle(i * 16, h, i * 16 + 8, 0, i * 16 + 16, h);
            g.fillStyle(0xaaaaaa, 0.6);
            for (let i = 0; i < count; i++) g.fillTriangle(i * 16, h, i * 16 + 4, h * 0.4, i * 16 + 8, h);
            g.lineStyle(2, 0x333333, 0.8);
            for (let i = 0; i < count; i++) g.strokeTriangle(i * 16, h, i * 16 + 8, 0, i * 16 + 16, h);
        } else if (type === 'lava') {
            g.fillStyle(0x000000, 0.25); g.fillRect(2, 2, w, h);
            g.fillStyle(0xff4500, 1);    g.fillRect(0, 0, w, h);
            g.fillStyle(0xff8c00, 1);
            for (let i = 0; i < w; i += 20) g.fillEllipse(i + 10, 0, 20, 14);
            g.fillStyle(0xffdd00, 0.4);
            for (let i = 0; i < w; i += 40) g.fillEllipse(i + 20, 0, 12, 8);
            g.lineStyle(2.5, 0x000000, 0.7); g.strokeRect(0, 0, w, h);
        } else if (type === 'water') {
            g.fillStyle(0x000000, 0.2); g.fillRect(2, 2, w, h);
            g.fillStyle(0x0288d1, 0.85); g.fillRect(0, 0, w, h);
            g.fillStyle(0x29b6f6, 0.5);
            for (let i = 0; i < w; i += 30) g.fillEllipse(i + 15, 0, 26, 10);
            g.lineStyle(2, 0x000000, 0.55); g.strokeRect(0, 0, w, h);
        }
        g.generateTexture('hazard_' + type + '_' + x, w + 4, h + 2);
        g.destroy();
        const hz = this.hazards.create(x + w / 2, y + h / 2, 'hazard_' + type + '_' + x);
        hz.setData('type', type);
        hz.refreshBody();
        return hz;
    }

    addGoal(x, y) {
        const g = this.scene.add.graphics();
        g.fillStyle(0x000000, 0.3); g.fillRect(4, 4, 8, 80);
        g.fillStyle(0x00e676, 1);   g.fillRect(0, 0, 8, 80);
        g.fillStyle(0x00a152, 0.7); g.fillRect(0, 0, 3, 80);
        g.lineStyle(2, 0x000000, 0.7); g.strokeRect(0, 0, 8, 80);
        g.fillStyle(0x000000, 0.25); g.fillTriangle(10, 2, 10, 42, 58, 22);
        g.fillStyle(0xffd700, 1);    g.fillTriangle(8, 0, 8, 40, 56, 20);
        g.fillStyle(0xffec6e, 0.55); g.fillTriangle(8, 0, 14, 14, 30, 10);
        g.lineStyle(2, 0x000000, 0.65); g.strokeTriangle(8, 0, 8, 40, 56, 20);
        g.generateTexture('goal_flag', 60, 84);
        g.destroy();

        this.goal = this.scene.add.image(x, y, 'goal_flag').setDepth(80);
        this.scene.physics.add.existing(this.goal, true);

        let smT = 0, smI = 90;
        this.scene.events.on('update', (time, delta) => {
            if (!this.goal || !this.goal.active) return;
            smT += delta;
            if (smT >= smI) {
                smT -= smI;
                this.goal.setAngle((Math.random() - 0.5) * 3.5);
            }
        });

        const glow = this.scene.add.graphics().setDepth(79);
        this.scene.tweens.add({
            duration: 900, yoyo: true, repeat: -1,
            onUpdate: (tween) => {
                glow.clear();
                glow.fillStyle(0x00e676, 0.12 + tween.getValue() * 0.18);
                glow.fillCircle(x + 4, y - 20, 42 + tween.getValue() * 18);
            }
        });
        return this.goal;
    }

    addDecoration(x, y, type, scale = 1) {
        const g = this.scene.add.graphics().setDepth(30);
        const tiltAngle = (Math.random() - 0.5) * 3;
        this._drawDecoration(g, type, x, y);
        g.setScale(scale);
        g.setAngle(tiltAngle);
        this.decorations.add(g);
        return g;
    }

    _drawDecoration(g, type, x, y) {
        switch (type) {
            case 'tree':
                g.fillStyle(0x000000, 0.18);
                g.fillEllipse(x + 4, y + 4, 84, 22);
                g.fillStyle(0x3a1800, 1);
                g.fillRect(x - 8, y - 22, 16, 64);
                g.lineStyle(2.5, 0x1a0a00, 0.9);
                g.strokeRect(x - 8, y - 22, 16, 64);
                [[0, -42, 36], [-20, -28, 24], [20, -28, 23], [0, -58, 20]].forEach(([ox, oy, r], ci) => {
                    const leafC = [0x2d7832, 0x2d8a3e, 0x246628, 0x3da850][ci];
                    g.fillStyle(leafC, 1);
                    g.fillCircle(x + ox, y + oy, r);
                    g.lineStyle(2.5, 0x143818, 0.85);
                    g.strokeCircle(x + ox, y + oy, r);
                });
                g.fillStyle(0x4caf50, 0.4);
                g.fillCircle(x - 8, y - 52, 14);
                break;
            case 'bush':
                g.fillStyle(0x000000, 0.15);
                g.fillEllipse(x + 3, y + 4, 64, 18);
                g.fillStyle(0x2a8038, 1); g.fillCircle(x, y, 22);
                g.fillCircle(x - 16, y + 4, 16); g.fillCircle(x + 16, y + 4, 16);
                g.fillStyle(0x3daa50, 0.8); g.fillCircle(x, y - 8, 14);
                g.lineStyle(2, 0x143818, 0.8);
                g.strokeCircle(x, y, 22); g.strokeCircle(x - 16, y + 4, 16);
                break;
            case 'cloud':
                g.fillStyle(0x6688a0, 0.2);
                g.fillEllipse(x + 4, y + 4, 80, 30);
                g.fillStyle(0xeef5ff, 1);
                g.fillEllipse(x, y, 80, 30); g.fillEllipse(x - 20, y - 12, 50, 32); g.fillEllipse(x + 18, y - 10, 40, 28);
                g.lineStyle(2, 0x8aabcf, 0.5);
                g.strokeEllipse(x, y, 80, 30);
                break;
            case 'house':
                g.fillStyle(0x000000, 0.22);
                g.fillRect(x + 4, y - 48, 72, 52);
                g.fillStyle(0xf5deb3, 1); g.fillRect(x, y - 50, 70, 50);
                g.fillStyle(0xddc89a, 0.5);
                for (let i = 0; i < 70; i += 14) g.fillRect(x + i, y - 50, 7, 50);
                g.lineStyle(3, 0x2a1a00, 0.8); g.strokeRect(x, y - 50, 70, 50);
                g.fillStyle(0xb22222, 1); g.fillTriangle(x - 5, y - 50, x + 35, y - 92, x + 75, y - 50);
                g.lineStyle(2.5, 0x000000, 0.8); g.strokeTriangle(x - 5, y - 50, x + 35, y - 92, x + 75, y - 50);
                g.fillStyle(0x4169e1, 1); g.fillRect(x + 20, y - 22, 14, 22);
                g.lineStyle(2, 0x000000, 0.7); g.strokeRect(x + 20, y - 22, 14, 22);
                break;
            case 'flower':
                g.fillStyle(0x4caf50, 1); g.fillRect(x - 2, y - 8, 4, 22);
                g.lineStyle(1.5, 0x2a6a20, 0.8); g.strokeRect(x - 2, y - 8, 4, 22);
                [0, 1, 2, 3, 4].forEach(p => {
                    const a = (p / 5) * Math.PI * 2;
                    g.fillStyle(0xff69b4, 1); g.fillCircle(x + Math.cos(a) * 10, y - 16 + Math.sin(a) * 10, 6);
                    g.lineStyle(1.5, 0x000000, 0.5); g.strokeCircle(x + Math.cos(a) * 10, y - 16 + Math.sin(a) * 10, 6);
                });
                g.fillStyle(0xffeb3b, 1); g.fillCircle(x, y - 16, 7);
                g.lineStyle(2, 0xc8a000, 0.8); g.strokeCircle(x, y - 16, 7);
                break;
            case 'rock':
                g.fillStyle(0x000000, 0.2);
                g.fillEllipse(x + 3, y + 3, 46, 28);
                g.fillStyle(0x607880, 1); g.fillEllipse(x, y, 44, 28);
                g.fillStyle(0x8098a0, 1); g.fillEllipse(x - 6, y - 4, 22, 16);
                g.fillStyle(0xa0b8c0, 0.5); g.fillEllipse(x - 10, y - 6, 10, 7);
                g.lineStyle(2.5, 0x2a3838, 0.85); g.strokeEllipse(x, y, 44, 28);
                break;
            case 'mushroom':
                g.fillStyle(0x000000, 0.2); g.fillEllipse(x + 3, y - 22, 46, 34);
                g.fillStyle(0xff4444, 1);   g.fillEllipse(x, y - 24, 44, 32);
                g.fillStyle(0xcc2222, 0.4);
                for (let xi = -22; xi < 22; xi += 9) g.fillRect(x + xi, y - 38, 4, 32);
                g.fillStyle(0xffffff, 1);   g.fillCircle(x - 10, y - 28, 6); g.fillCircle(x + 10, y - 22, 5);
                g.lineStyle(2.5, 0x000000, 0.85); g.strokeEllipse(x, y - 24, 44, 32);
                g.fillStyle(0x000000, 0.22); g.fillRoundedRect(x - 6, y - 6, 18, 26, 4);
                g.fillStyle(0xf5deb3, 1);    g.fillRoundedRect(x - 8, y - 8, 16, 24, 4);
                g.lineStyle(2, 0x000000, 0.7); g.strokeRoundedRect(x - 8, y - 8, 16, 24, 4);
                break;
            case 'lamp':
                g.fillStyle(0x000000, 0.25); g.fillRect(x - 2, y - 58, 8, 62);
                g.fillStyle(0x555555, 1);     g.fillRect(x - 3, y - 60, 6, 60);
                g.lineStyle(2, 0x000000, 0.8); g.strokeRect(x - 3, y - 60, 6, 60);
                g.fillStyle(0x333333, 1);
                g.fillRect(x - 8, y - 62, 16, 6);
                g.lineStyle(2, 0x000000, 0.7); g.strokeRect(x - 8, y - 62, 16, 6);
                g.fillStyle(0xffff44, 0.35); g.fillCircle(x, y - 68, 22);
                g.fillStyle(0xffd700, 0.9);  g.fillCircle(x, y - 66, 12);
                g.lineStyle(2, 0x000000, 0.8); g.strokeCircle(x, y - 66, 12);
                break;
        }
    }

    updateEnemies(delta) {
        if (!this.enemies) return;
        this._enemySmElapsed += delta;
        const smTick = this._enemySmElapsed >= this._enemySmInterval;
        if (smTick) this._enemySmElapsed -= this._enemySmInterval;

        this.enemies.getChildren().forEach(e => {
            if (!e.active) return;
            const startX = e.getData('startX');
            const dist   = e.getData('patrolDist');
            let dir      = e.getData('dir');
            if (e.x > startX + dist) { dir = -1; e.setFlipX(true); }
            else if (e.x < startX - dist) { dir = 1; e.setFlipX(false); }
            e.setData('dir', dir);
            e.setVelocityX(dir * 70);
            e.body.setAllowGravity(true);

            if (smTick) {
                e.setAngle((Math.random() - 0.5) * 4.5);
                e.setScale(0.98 + Math.random() * 0.04);
            }
        });
    }
}
