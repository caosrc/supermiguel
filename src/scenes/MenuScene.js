class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }

    create() {
        const { width: w, height: h } = this.scale;
        this._W = w; this._H = h;
        this._smTick = 0;
        this._smInterval = 95;
        this._cloudData = [];
        this._cloudGfx = [];

        this._drawPaperSky(w, h);
        this._drawHills(w, h);
        this._drawGround(w, h);
        this._drawTrees(w, h);
        this._initClouds(w, h);
        this._drawPaperTitle(w, h);
        this._drawMiguel(w, h);
        this._drawPaperMenu(w, h);
        this._drawPaperHints(w, h);

        const data = SaveSystem.load();
        const saveTxt = this.add.text(18, h - 30,
            `⭐ ${data.totalStars} estrelas   🪙 ${data.totalCoins} moedas`,
            { fontSize: '13px', fill: '#ffe0a0', stroke: '#2a1800', strokeThickness: 3 }
        ).setDepth(20);
        this._wobbleObjs = [saveTxt];
    }

    update(time, delta) {
        this._smTick += delta;
        if (this._smTick < this._smInterval) return;
        this._smTick -= this._smInterval;

        this._stepClouds();
        this._wobbleObjs.forEach(o => {
            if (!o || !o.active) return;
            o.x += (Math.random() - 0.5) * 0.9;
            o.y += (Math.random() - 0.5) * 0.6;
        });
    }

    _drawPaperSky(w, h) {
        const g = this.add.graphics().setDepth(0);
        g.fillStyle(0xb8dcea, 1);
        g.fillRect(0, 0, w, h);
        g.fillGradientStyle(0xa8d4e8, 0xa8d4e8, 0xdaeef8, 0xdaeef8, 1);
        g.fillRect(0, 0, w, h);
        g.fillStyle(0x88b8d0, 0.22);
        for (let i = 0; i < 14; i++) {
            const rx = Phaser.Math.Between(0, w);
            const ry = Phaser.Math.Between(0, h * 0.55);
            g.fillEllipse(rx, ry, Phaser.Math.Between(60, 200), Phaser.Math.Between(4, 14));
        }
        g.lineStyle(1.5, 0x7aaabf, 0.18);
        for (let i = 0; i < 8; i++) {
            const ly = Phaser.Math.Between(10, h * 0.5);
            g.beginPath(); g.moveTo(0, ly); g.lineTo(w, ly + Phaser.Math.Between(-8, 8));
            g.strokePath();
        }
    }

    _drawHills(w, h) {
        const g = this.add.graphics().setDepth(1);
        const farHills = [
            { cx: 0,   cy: h - 200, rx: 220, ry: 95,  c: 0x8fb87a },
            { cx: 320, cy: h - 190, rx: 280, ry: 105, c: 0x80ab6a },
            { cx: 680, cy: h - 205, rx: 260, ry: 100, c: 0x8dc07c },
            { cx: w,   cy: h - 195, rx: 240, ry: 98,  c: 0x85b272 },
        ];
        farHills.forEach(h2 => {
            g.fillStyle(h2.c, 1);
            g.fillEllipse(h2.cx, h2.cy, h2.rx * 2, h2.ry * 2);
            g.lineStyle(2.5, 0x5a8040, 0.6);
            g.strokeEllipse(h2.cx, h2.cy, h2.rx * 2, h2.ry * 2);
        });

        const nearHills = [
            { cx: -40,  cy: h - 155, rx: 260, ry: 110, c: 0x5a8c45 },
            { cx: 380,  cy: h - 145, rx: 300, ry: 118, c: 0x4e8040 },
            { cx: 760,  cy: h - 158, rx: 280, ry: 112, c: 0x528843 },
            { cx: w+40, cy: h - 148, rx: 250, ry: 108, c: 0x507e3e },
        ];
        nearHills.forEach(h2 => {
            g.fillStyle(h2.c, 1);
            g.fillEllipse(h2.cx, h2.cy, h2.rx * 2, h2.ry * 2);
            g.lineStyle(3, 0x2d5a20, 0.65);
            g.strokeEllipse(h2.cx, h2.cy, h2.rx * 2, h2.ry * 2);
        });
    }

    _drawGround(w, h) {
        const g = this.add.graphics().setDepth(2);
        g.fillStyle(0x3d6630, 1);
        g.fillRect(0, h - 112, w, 22);
        g.lineStyle(3, 0x1e3a10, 0.9);
        g.strokeRect(0, h - 112, w, 22);
        g.fillStyle(0x6a4220, 1);
        g.fillRect(0, h - 90, w, 90);
        g.lineStyle(2.5, 0x3a1e08, 0.8);
        g.strokeRect(0, h - 90, w, 90);
        for (let i = 0; i < w; i += 32) {
            g.lineStyle(1, 0x4a2c0a, 0.4);
            g.beginPath(); g.moveTo(i, h - 90); g.lineTo(i + 28, h); g.strokePath();
        }
        g.fillStyle(0x7a4e28, 0.5);
        for (let i = 0; i < w; i += 80) {
            g.fillEllipse(i + 30, h - 85, 55, 10);
        }
    }

    _drawTrees(w, h) {
        const g = this.add.graphics().setDepth(3);
        const positions = [60, 180, 350, 500, 640, 790, 920];
        positions.forEach((tx, idx) => {
            const sc   = 0.82 + (idx % 3) * 0.12;
            const base = h - 108;
            const tH   = 65 * sc;
            const tW   = 14 * sc;
            const lR   = 38 * sc;

            g.fillStyle(0x000000, 0.12);
            g.fillEllipse(tx + 3, base + 5, 80 * sc, 18 * sc);

            g.fillStyle(0x3a1800, 1);
            g.fillRect(tx - tW / 2, base - tH, tW, tH + 6);
            g.lineStyle(2, 0x1a0800, 0.95);
            g.strokeRect(tx - tW / 2, base - tH, tW, tH + 6);

            const leafColors = [0x2d7032, 0x358040, 0x226028];
            [[0, -tH - lR * 0.5, lR], [-lR * 0.6, -tH * 0.55, lR * 0.7], [lR * 0.6, -tH * 0.55, lR * 0.65], [0, -tH - lR, lR * 0.6]].forEach(([ox, oy, r], ci) => {
                g.fillStyle(leafColors[ci % 3], 1);
                g.fillCircle(tx + ox, base + oy, r);
                g.lineStyle(2.5, 0x143818, 0.8);
                g.strokeCircle(tx + ox, base + oy, r);
            });

            g.fillStyle(0x4caf50, 0.35);
            g.fillCircle(tx - lR * 0.25, base - tH - lR * 0.7, lR * 0.38);
        });
    }

    _initClouds(w, h) {
        this._cloudData = [];
        this._cloudGfx = [];
        for (let i = 0; i < 7; i++) {
            const cd = {
                x:     Phaser.Math.Between(-60, w + 60),
                y:     Phaser.Math.Between(28, 180),
                sc:    0.52 + Math.random() * 0.72,
                speed: Phaser.Math.Between(14, 48),
                jX:    0, jY: 0,
                rot:   (Math.random() - 0.5) * 4,
            };
            this._cloudData.push(cd);
            this._cloudGfx.push(this.add.graphics().setDepth(4));
        }
        this._renderClouds();
    }

    _renderClouds() {
        const w = this._W;
        this._cloudData.forEach((c, i) => {
            const g = this._cloudGfx[i];
            const sc = c.sc;
            g.clear();
            g.x = c.x + c.jX;
            g.y = c.y + c.jY;
            g.setAngle(c.rot);

            g.fillStyle(0x6688a0, 0.18);
            g.fillEllipse(5, 5, 108 * sc, 36 * sc);
            g.fillEllipse(-26 * sc + 5, -12 * sc + 5, 60 * sc, 34 * sc);
            g.fillEllipse(26 * sc + 5, -10 * sc + 5, 50 * sc, 28 * sc);

            g.fillStyle(0xeef5ff, 1);
            g.fillEllipse(0, 0, 108 * sc, 36 * sc);
            g.fillEllipse(-26 * sc, -12 * sc, 60 * sc, 34 * sc);
            g.fillEllipse(26 * sc, -10 * sc, 50 * sc, 28 * sc);

            g.lineStyle(1.8, 0x8aabbf, 0.55);
            g.strokeEllipse(0, 0, 108 * sc, 36 * sc);
            g.strokeEllipse(-26 * sc, -12 * sc, 60 * sc, 34 * sc);
        });
    }

    _stepClouds() {
        const { _W: w } = this;
        this._cloudData.forEach(c => {
            c.x   += c.speed * this._smInterval / 1000;
            c.jX   = (Math.random() - 0.5) * 2.2;
            c.jY   = (Math.random() - 0.5) * 1.5;
            c.rot  = (Math.random() - 0.5) * 3.5;
            if (c.x > w + 180) {
                c.x = -180;
                c.y = Phaser.Math.Between(28, 180);
            }
        });
        this._renderClouds();
    }

    _drawPaperTitle(w, h) {
        const g = this.add.graphics().setDepth(5);
        const px = w / 2, py = 72, pw = 560, ph = 112;

        g.fillStyle(0x000000, 0.28);
        g.fillRoundedRect(px - pw / 2 + 6, py - ph / 2 + 7, pw, ph, 16);

        g.fillStyle(0xd4a050, 1);
        g.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 14);

        g.fillStyle(0xc08030, 0.45);
        for (let i = 0; i < pw; i += 22) {
            g.fillRect(px - pw / 2 + i, py - ph / 2, 11, ph);
        }

        g.lineStyle(3.5, 0x7a4800, 0.95);
        g.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 14);
        g.lineStyle(1.5, 0xffd090, 0.45);
        g.strokeRoundedRect(px - pw / 2 + 5, py - ph / 2 + 5, pw - 10, ph - 10, 10);

        const title = this.add.text(w / 2, py - 12, 'Super Miguel', {
            fontSize: '62px', fill: '#FFD700', fontStyle: 'bold',
            stroke: '#5a2800', strokeThickness: 9,
            shadow: { x: 3, y: 3, color: '#2a1000', blur: 2, fill: true }
        }).setOrigin(0.5).setDepth(6).setAngle(-0.8);

        this.add.text(w / 2, py + 36, 'As Aventuras de Miguel', {
            fontSize: '19px', fill: '#fff5d0', stroke: '#4a2800', strokeThickness: 4
        }).setOrigin(0.5).setDepth(6).setAngle(0.4);

        let dir = 1;
        const wobT = () => {
            if (!title.active) return;
            const jAngle = (Math.random() - 0.5) * 1.2 - 0.8;
            const jScl   = 1.0 + (Math.random() - 0.5) * 0.06;
            title.setAngle(jAngle).setScale(jScl);
            dir = -dir;
            this.time.delayedCall(90 + Math.random() * 60, wobT);
        };
        this.time.delayedCall(120, wobT);
    }

    _drawMiguel(w, h) {
        const mx = w / 2 - 215, my = h - 94;
        const sh = this.add.graphics().setDepth(9);
        sh.fillStyle(0x000000, 0.22); sh.fillEllipse(mx, h - 102, 62, 14);

        const m = this.add.image(mx, my, 'miguel_stand').setScale(0.21).setDepth(10);

        let smTimer = 0;
        const smInterval = 95;
        const baseSc = 0.21;

        this.events.on('update', (time, delta) => {
            smTimer += delta;
            if (smTimer < smInterval) return;
            smTimer -= smInterval;
            const jS = baseSc + (Math.random() - 0.5) * 0.007;
            const jA = (Math.random() - 0.5) * 2.8;
            const jX = mx + (Math.random() - 0.5) * 2.2;
            const jY = my + (Math.random() - 0.5) * 1.8;
            m.setScale(jS).setAngle(jA).setPosition(jX, jY);
        });
    }

    _drawPaperMenu(w, h) {
        const btns = [
            { label: '🎮  Jogar Aventura',    scene: 'WorldMapScene',  c: 0x1a5c9a, hov: 0x1e88e5, rot: -1.0 },
            { label: '🚲  Fase da Bicicleta', scene: 'BicicletaScene', c: 0xb84800, hov: 0xe65100, rot:  0.8 },
            { label: '📂  Continuar',          action: 'continue',      c: 0x2a6e28, hov: 0x43a047, rot: -0.6 },
            { label: '🏆  Recordes',           action: 'records',       c: 0x5a1890, hov: 0x8e24aa, rot:  0.9 },
            { label: '🗑️  Apagar Progresso',   action: 'reset',         c: 0x9a1010, hov: 0xe53935, rot: -0.7 },
        ];

        const bx = w / 2 + 80;
        btns.forEach((btn, i) => {
            const by  = h - 268 + i * 58;
            const rot = btn.rot;
            const bg  = this.add.graphics().setDepth(15);

            const draw = (c, hov) => {
                bg.clear();
                bg.fillStyle(0x000000, 0.22);
                bg.fillRoundedRect(bx - 177 + 4, by - 22 + 4, 360, 46, 11);
                bg.fillStyle(c, hov ? 1 : 0.92);
                bg.fillRoundedRect(bx - 177, by - 22, 360, 46, 11);
                bg.fillStyle(0xffffff, 0.12);
                bg.fillRoundedRect(bx - 177, by - 22, 360, 12, { tl: 11, tr: 11, bl: 0, br: 0 });
                bg.lineStyle(3, 0x000000, 0.55);
                bg.strokeRoundedRect(bx - 177, by - 22, 360, 46, 11);
                bg.lineStyle(1.5, 0xffffff, 0.2);
                bg.strokeRoundedRect(bx - 175, by - 20, 356, 42, 9);
            };
            draw(btn.c, false);

            const txt = this.add.text(bx, by, btn.label, {
                fontSize: '18px', fill: '#fff', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 3
            }).setOrigin(0.5).setDepth(16).setAngle(rot);

            const z = this.add.zone(bx, by, 360, 46).setInteractive({ useHandCursor: true }).setDepth(17);

            z.on('pointerover', () => {
                draw(btn.hov, true);
                txt.setScale(1.04).setAngle(rot + (Math.random() - 0.5) * 1.5);
            });
            z.on('pointerout', () => {
                draw(btn.c, false);
                txt.setScale(1).setAngle(rot);
            });
            z.on('pointerdown', () => {
                if (btn.scene)              this.scene.start(btn.scene);
                else if (btn.action === 'continue') this.scene.start('WorldMapScene');
                else if (btn.action === 'reset')    { SaveSystem.reset(); this.scene.restart(); }
                else if (btn.action === 'records')  this._showRecords();
            });
        });
    }

    _drawPaperHints(w, h) {
        const g = this.add.graphics().setDepth(20);
        g.fillStyle(0x000000, 0.40);
        g.fillRoundedRect(w / 2 + 80 - 190, h - 34, 380, 22, 6);
        g.lineStyle(1, 0xffd090, 0.3);
        g.strokeRoundedRect(w / 2 + 80 - 190, h - 34, 380, 22, 6);
        this.add.text(w / 2 + 80, h - 23,
            '← → Mover  |  ↑ Pular  |  Z Ação  |  R Rebobinar tempo',
            { fontSize: '10px', fill: '#ffd09088' }
        ).setOrigin(0.5).setDepth(21);
    }

    _showRecords() {
        const { width: w, height: h } = this.scale;
        const data = SaveSystem.load();
        const ov   = this.add.graphics().setDepth(400);
        ov.fillStyle(0x000000, 0.58); ov.fillRect(0, 0, w, h);
        ov.fillStyle(0x2a1a08, 0.98); ov.fillRoundedRect(w / 2 - 305, h / 2 - 245, 610, 490, 22);
        ov.fillStyle(0xc08030, 0.2);
        for (let i = 0; i < 610; i += 22) {
            ov.fillRect(w / 2 - 305 + i, h / 2 - 245, 11, 490);
        }
        ov.lineStyle(4, 0xd4a050, 1); ov.strokeRoundedRect(w / 2 - 305, h / 2 - 245, 610, 490, 22);
        ov.lineStyle(2, 0xffd090, 0.3); ov.strokeRoundedRect(w / 2 - 299, h / 2 - 239, 598, 478, 18);

        this.add.text(w / 2, h / 2 - 215, '🏆 Recordes por Mundo', {
            fontSize: '24px', fill: '#ffd700', fontStyle: 'bold', stroke: '#2a1000', strokeThickness: 5
        }).setOrigin(0.5).setDepth(401);

        WORLDS.forEach((world, i) => {
            const wd        = data.worlds[world.id] || {};
            const stars     = Object.values(wd.levels || {}).reduce((s, l) => s + (l.stars || 0), 0);
            const completed = Object.values(wd.levels || {}).filter(l => l.completed).length;
            const y         = h / 2 - 160 + i * 38;
            this.add.text(w / 2 - 278, y,
                (wd.unlocked ? '' : '🔒 ') + world.name,
                { fontSize: '14px', fill: '#ffe0b0' }
            ).setDepth(401);
            this.add.text(w / 2 + 88, y,
                `${completed}/10 fases  ⭐ ${stars}/30`,
                { fontSize: '14px', fill: '#ffd700' }
            ).setDepth(401);
        });

        this.add.text(w / 2, h / 2 + 214, '✖ Fechar', {
            fontSize: '20px', fill: '#ff8866', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(401).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.scene.restart());
    }
}
