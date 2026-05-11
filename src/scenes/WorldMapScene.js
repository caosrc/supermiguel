class WorldMapScene extends Phaser.Scene {
    constructor() { super('WorldMapScene'); }

    create() {
        const { width: w, height: h } = this.scale;
        this._W = w; this._H = h;
        this._smTick = 0;
        this._smInterval = 95;
        this._starGfx = [];

        const data = SaveSystem.load();
        this._drawParchmentBg(w, h);
        this._drawTitle(w, h);
        this._drawWorlds(w, h, data);
        this._drawHints(w, h);
        this.input.keyboard.once('keydown-ESC', () => this.scene.start('MenuScene'));
    }

    update(time, delta) {
        this._smTick += delta;
        if (this._smTick < this._smInterval) return;
        this._smTick -= this._smInterval;
        this._starGfx.forEach(sg => {
            if (!sg || !sg.active) return;
            sg.setAngle((Math.random() - 0.5) * 6);
        });
    }

    _drawParchmentBg(w, h) {
        const g = this.add.graphics().setDepth(0);
        g.fillGradientStyle(0x1a1008, 0x1a1008, 0x100a04, 0x100a04, 1);
        g.fillRect(0, 0, w, h);

        g.fillStyle(0x2a1a08, 0.7);
        for (let i = 0; i < 80; i++) {
            const bri = Math.random();
            const x   = Math.random() * w;
            const y   = Math.random() * h;
            g.fillStyle(0xd4a050, bri * 0.06 + 0.01);
            g.fillCircle(x, y, Math.random() * 2 + 0.5);
        }
        for (let i = 0; i < 22; i++) {
            const bri = Math.random();
            g.fillStyle(0xffffff, bri * 0.8 + 0.08);
            g.fillCircle(Math.random() * w, Math.random() * h * 0.85, Math.random() * 1.5 + 0.4);
        }

        g.lineStyle(1, 0x5a3800, 0.25);
        for (let i = 0; i < 12; i++) {
            const lx1 = Math.random() * w, ly1 = Math.random() * h;
            const lx2 = lx1 + (Math.random() - 0.5) * 300, ly2 = ly1 + (Math.random() - 0.5) * 200;
            g.beginPath(); g.moveTo(lx1, ly1); g.lineTo(lx2, ly2); g.strokePath();
        }

        const frame = this.add.graphics().setDepth(1);
        frame.lineStyle(6, 0xd4a050, 0.8);
        frame.strokeRect(10, 10, w - 20, h - 20);
        frame.lineStyle(2.5, 0xffd090, 0.35);
        frame.strokeRect(17, 17, w - 34, h - 34);
        [0, 1].forEach(pass => {
            const inset = pass === 0 ? 10 : 17;
            [[inset, inset], [w - inset - 18, inset], [inset, h - inset - 18], [w - inset - 18, h - inset - 18]].forEach(([cx, cy]) => {
                frame.fillStyle(0xd4a050, pass === 0 ? 1 : 0.5);
                frame.fillRect(cx, cy, 18, 18);
                frame.lineStyle(2, 0x7a4800, 1);
                frame.strokeRect(cx, cy, 18, 18);
            });
        });
    }

    _drawTitle(w, h) {
        const g = this.add.graphics().setDepth(2);
        g.fillStyle(0x000000, 0.35);
        g.fillRoundedRect(w / 2 - 238 + 4, 8 + 4, 476, 54, 16);
        g.fillStyle(0xd4a050, 1);
        g.fillRoundedRect(w / 2 - 238, 8, 476, 54, 16);
        for (let i = 0; i < 476; i += 20) {
            g.fillStyle(0xc08030, 0.22);
            g.fillRect(w / 2 - 238 + i, 8, 10, 54);
        }
        g.lineStyle(3, 0x7a4800, 1); g.strokeRoundedRect(w / 2 - 238, 8, 476, 54, 16);
        g.lineStyle(1, 0xffd090, 0.3); g.strokeRoundedRect(w / 2 - 232, 14, 464, 42, 12);

        this.add.text(w / 2, 35, '🗺  Mapa do Mundo', {
            fontSize: '24px', fill: '#ffd700', fontStyle: 'bold',
            stroke: '#3a1800', strokeThickness: 5
        }).setOrigin(0.5).setDepth(3);

        const data = SaveSystem.load();
        this.add.text(w / 2, h - 16, `⭐ ${data.totalStars} estrelas    🪙 ${data.totalCoins} moedas`, {
            fontSize: '13px', fill: '#ffd090aa', stroke: '#1a0a00', strokeThickness: 3
        }).setOrigin(0.5).setDepth(3);
    }

    _drawWorlds(w, h, data) {
        const cols = 5, bw = 160, bh = 118, gx = 20, gy = 24;
        const totalW = cols * bw + (cols - 1) * gx;
        const startX = (w - totalW) / 2, startY = 72;

        const icons = ['🌆','🌲','🌾','💧','🏫','🏖️','🚀','🍬','🏰','✨'];

        WORLDS.forEach((world, i) => {
            const col  = i % cols, row = Math.floor(i / cols);
            const x    = startX + col * (bw + gx);
            const y    = startY + row * (bh + gy);
            const wd   = data.worlds[world.id] || { unlocked: world.unlocked, levels: {} };
            const unlocked   = wd.unlocked;
            const stars      = Object.values(wd.levels || {}).reduce((s, l) => s + (l.stars || 0), 0);
            const completed  = Object.values(wd.levels || {}).filter(l => l.completed).length;
            const tiltAngle  = (Math.random() - 0.5) * 3.5;

            const bg = this.add.graphics().setDepth(4).setAngle(tiltAngle);
            bg.x = x + bw / 2; bg.y = y + bh / 2;

            const drawCard = (hov) => {
                bg.clear();
                bg.fillStyle(0x000000, 0.32);
                bg.fillRoundedRect(-bw / 2 + 5, -bh / 2 + 5, bw, bh, 14);

                if (hov && unlocked) {
                    bg.fillStyle(world.color, 0.28);
                    bg.fillRoundedRect(-bw / 2 - 4, -bh / 2 - 4, bw + 8, bh + 8, 18);
                }

                bg.fillStyle(unlocked ? world.darkColor : 0x0e0a04, unlocked ? 0.97 : 0.88);
                bg.fillRoundedRect(-bw / 2, -bh / 2, bw, bh, 14);

                if (unlocked) {
                    for (let xi = 0; xi < bw; xi += 16) {
                        bg.fillStyle(world.color, 0.06);
                        bg.fillRect(-bw / 2 + xi, -bh / 2, 8, bh);
                    }
                }

                bg.lineStyle(3.5, unlocked ? world.color : 0x3a2810, 1);
                bg.strokeRoundedRect(-bw / 2, -bh / 2, bw, bh, 14);
                bg.lineStyle(1.5, unlocked ? 0xffffff : 0x222222, 0.2);
                bg.strokeRoundedRect(-bw / 2 + 4, -bh / 2 + 4, bw - 8, bh - 8, 10);

                if (unlocked && completed > 0) {
                    bg.fillStyle(world.color, 0.35);
                    bg.fillRoundedRect(-bw / 2 + 2, bh / 2 - 14, (bw - 4) * (completed / 10), 12,
                        { bl: 12, br: completed >= 10 ? 12 : 0 });
                }
            };
            drawCard(false);

            const iconTxt = this.add.text(x + bw / 2, y + 28, unlocked ? icons[i] : '🔒', { fontSize: '30px' })
                .setOrigin(0.5).setDepth(5).setAngle(tiltAngle + (Math.random() - 0.5) * 2);

            this.add.text(x + bw / 2, y + 58, world.name, {
                fontSize: '11px', fill: unlocked ? '#fff' : '#555', fontStyle: 'bold',
                align: 'center', wordWrap: { width: bw - 12 },
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(5).setAngle(tiltAngle);

            if (unlocked) {
                for (let s = 0; s < 3; s++) {
                    const sg = this.add.graphics().setDepth(5).setAngle(tiltAngle + (Math.random() - 0.5) * 4);
                    sg.fillStyle(s * 10 < stars ? 0xffd700 : 0x2a1800, 1);
                    drawStar(sg, x + 28 + s * 36, y + bh - 22, 5, 9, 4.5, 0);
                    this._starGfx.push(sg);
                }
                this.add.text(x + bw / 2, y + bh - 20, `${completed}/10`, {
                    fontSize: '10px', fill: '#aaa', stroke: '#000', strokeThickness: 2
                }).setOrigin(0.5).setDepth(5);

                const zone = this.add.zone(x + bw / 2, y + bh / 2, bw, bh)
                    .setInteractive({ useHandCursor: true }).setDepth(6);
                zone.on('pointerover', () => drawCard(true));
                zone.on('pointerout',  () => drawCard(false));
                zone.on('pointerdown', () => this._showLevelSelect(world, wd));
            }
        });
    }

    _drawHints(w, h) {
        this.add.text(w / 2, h - 14, 'Clique num mundo para jogar  |  ESC = Menu Principal', {
            fontSize: '11px', fill: '#d4a05066'
        }).setOrigin(0.5).setDepth(3);
    }

    _showLevelSelect(world, wd) {
        const { width: w, height: h } = this.scale;
        if (this._lsPanel) this._lsPanel.forEach(o => o.destroy());
        this._lsPanel = [];
        const add = (o) => { this._lsPanel.push(o); return o; };

        const overlay = add(this.add.graphics().setDepth(300));
        overlay.fillStyle(0x000000, 0.68); overlay.fillRect(0, 0, w, h);
        overlay.fillStyle(0x1e0e02, 0.98); overlay.fillRoundedRect(w / 2 - 285, h / 2 - 235, 570, 470, 22);
        for (let i = 0; i < 570; i += 20) {
            overlay.fillStyle(0xd4a050, 0.06);
            overlay.fillRect(w / 2 - 285 + i, h / 2 - 235, 10, 470);
        }
        overlay.lineStyle(4, world.color, 1);
        overlay.strokeRoundedRect(w / 2 - 285, h / 2 - 235, 570, 470, 22);
        overlay.lineStyle(1.5, 0xffd090, 0.25);
        overlay.strokeRoundedRect(w / 2 - 279, h / 2 - 229, 558, 458, 18);

        add(this.add.text(w / 2, h / 2 - 205, `${world.name} — Selecione a Fase`, {
            fontSize: '20px', fill: '#ffd700', fontStyle: 'bold', stroke: '#1a0a00', strokeThickness: 5
        }).setOrigin(0.5).setDepth(301));

        for (let lvl = 1; lvl <= 10; lvl++) {
            const col     = (lvl - 1) % 5, row = Math.floor((lvl - 1) / 5);
            const bx      = w / 2 - 200 + col * 84, by = h / 2 - 150 + row * 98;
            const lvlData = wd.levels[lvl] || {};
            const unlocked= lvl === 1 || wd.levels[lvl - 1]?.completed;
            const stars   = lvlData.stars || 0;
            const tilt    = (Math.random() - 0.5) * 4;

            const bg = add(this.add.graphics().setDepth(301).setAngle(tilt));
            bg.x = bx; bg.y = by;

            const drawLvl = (hov) => {
                bg.clear();
                bg.fillStyle(0x000000, 0.28);
                bg.fillRoundedRect(-36, -36, 72, 84, 10);
                bg.fillStyle(unlocked ? world.darkColor : 0x100a02, unlocked ? 0.97 : 0.88);
                bg.fillRoundedRect(-34, -34, 68, 80, 10);
                if (hov && unlocked) { bg.fillStyle(world.color, 0.22); bg.fillRoundedRect(-34, -34, 68, 80, 10); }
                bg.lineStyle(3, unlocked ? world.color : 0x2a1400, 1);
                bg.strokeRoundedRect(-34, -34, 68, 80, 10);
            };
            drawLvl(false);

            add(this.add.text(bx, by - 10, unlocked ? `${lvl}` : '🔒', {
                fontSize: unlocked ? '24px' : '18px', fill: unlocked ? '#fff' : '#444',
                fontStyle: 'bold', stroke: '#000', strokeThickness: 3
            }).setOrigin(0.5).setDepth(302).setAngle(tilt));

            for (let s = 0; s < 3; s++) {
                const sg = add(this.add.graphics().setDepth(302).setAngle(tilt + (Math.random() - 0.5) * 5));
                sg.fillStyle(s < stars ? 0xffd700 : 0x2a1800, 1);
                drawStar(sg, bx - 16 + s * 16, by + 30, 5, 7, 3.5, 0);
            }

            if (unlocked) {
                const zone = add(this.add.zone(bx, by, 68, 80).setInteractive({ useHandCursor: true }).setDepth(303));
                zone.on('pointerover', () => drawLvl(true));
                zone.on('pointerout',  () => drawLvl(false));
                zone.on('pointerdown', () => {
                    this._lsPanel.forEach(o => o.destroy());
                    const worldCap = world.id[0].toUpperCase() + world.id.slice(1);
                    this.scene.start(`${worldCap}_${lvl}`, { worldId: world.id, levelNum: lvl });
                });
            }
        }

        const close = add(this.add.text(w / 2, h / 2 + 205, '✖  Fechar', {
            fontSize: '18px', fill: '#ff8866', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(302).setInteractive({ useHandCursor: true }));
        close.on('pointerdown', () => { this._lsPanel.forEach(o => o.destroy()); this._lsPanel = []; });
    }
}
