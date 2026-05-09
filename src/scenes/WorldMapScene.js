class WorldMapScene extends Phaser.Scene {
    constructor() { super('WorldMapScene'); }
    create() {
        const { width: w, height: h } = this.scale;
        const data = SaveSystem.load();
        this._drawBg(w, h);
        this._drawTitle(w, h);
        this._drawWorlds(w, h, data);
        this.add.text(w/2, h-14, '← → Navegar  |  Clique para jogar  |  ESC = Menu Principal', { fontSize: '11px', fill: '#ffffff66' }).setOrigin(0.5);
        this.input.keyboard.once('keydown-ESC', () => this.scene.start('MenuScene'));
    }
    _drawBg(w, h) {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x071420, 0x071420, 0x0d2040, 0x0d2040, 1);
        bg.fillRect(0, 0, w, h);
        for (let i = 0; i < 100; i++) {
            const bri = Math.random();
            bg.fillStyle(0xffffff, bri * 0.8 + 0.1);
            bg.fillCircle(Math.random()*w, Math.random()*h*0.85, Math.random()*2+0.5);
        }
        // Milky way band
        bg.fillStyle(0x7c4dff, 0.04);
        for (let i = 0; i < 20; i++) {
            bg.fillEllipse(Math.random()*w, Math.random()*h*0.5, Math.random()*120+30, Math.random()*40+10);
        }
    }
    _drawTitle(w, h) {
        const p = this.add.graphics();
        p.fillStyle(0x000000, 0.55); p.fillRoundedRect(w/2-230, 10, 460, 54, 16);
        p.lineStyle(2.5, 0xffd700, 0.9); p.strokeRoundedRect(w/2-230, 10, 460, 54, 16);
        this.add.text(w/2, 36, '🌍  Selecione o Mundo', { fontSize: '24px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        const data = SaveSystem.load();
        this.add.text(w/2, h-32, `⭐ ${data.totalStars} estrelas    🪙 ${data.totalCoins} moedas`, { fontSize: '13px', fill: '#ffd700aa' }).setOrigin(0.5);
    }
    _drawWorlds(w, h, data) {
        const cols = 5, rows = 2, bw = 162, bh = 115, gx = 22, gy = 26;
        const totalW = cols*bw + (cols-1)*gx;
        const startX = (w - totalW)/2, startY = 76;
        WORLDS.forEach((world, i) => {
            const col = i%cols, row = Math.floor(i/cols);
            const x = startX + col*(bw+gx), y = startY + row*(bh+gy);
            const wd = data.worlds[world.id] || { unlocked: world.unlocked, levels: {} };
            const unlocked = wd.unlocked;
            const stars = Object.values(wd.levels||{}).reduce((s,l)=>s+(l.stars||0),0);
            const completed = Object.values(wd.levels||{}).filter(l=>l.completed).length;
            const icons = ['🌆','🌲','🌾','💧','🏫','🏖️','🚀','🍬','🏰','✨'];
            const bg = this.add.graphics();
            const drawCard = (hov) => {
                bg.clear();
                if (hov && unlocked) { bg.fillStyle(world.color, 0.22); bg.fillRoundedRect(x-5, y-5, bw+10, bh+10, 18); }
                bg.fillStyle(unlocked ? world.darkColor : 0x111111, unlocked ? 0.95 : 0.85);
                bg.fillRoundedRect(x, y, bw, bh, 14);
                bg.lineStyle(3, unlocked ? world.color : 0x333333, 1);
                bg.strokeRoundedRect(x, y, bw, bh, 14);
                if (unlocked && completed > 0) {
                    bg.fillStyle(world.color, 0.3);
                    bg.fillRoundedRect(x+2, y+bh-14, (bw-4)*(completed/10), 10, { bl: 12, br: completed>=10?12:0 });
                }
            };
            drawCard(false);
            this.add.text(x+bw/2, y+26, unlocked ? icons[i] : '🔒', { fontSize: '28px' }).setOrigin(0.5);
            this.add.text(x+bw/2, y+58, world.name, { fontSize: '11px', fill: unlocked?'#fff':'#555', fontStyle: 'bold', align: 'center', wordWrap: { width: bw-10 } }).setOrigin(0.5);
            if (unlocked) {
                // Star display
                for (let s=0; s<3; s++) {
                    const sg = this.add.graphics();
                    sg.fillStyle(s*10 < stars ? 0xffd700 : 0x333333, 1);
                    drawStar(sg, x+32+s*36, y+bh-20, 5, 9, 4.5, 0);
                }
                this.add.text(x+bw/2, y+78, `${completed}/10`, { fontSize: '10px', fill: '#aaa' }).setOrigin(0.5);
                const zone = this.add.zone(x+bw/2, y+bh/2, bw, bh).setInteractive({ useHandCursor: true });
                zone.on('pointerover', () => drawCard(true));
                zone.on('pointerout',  () => drawCard(false));
                zone.on('pointerdown', () => this._showLevelSelect(world, wd));
            }
        });
    }
    _showLevelSelect(world, wd) {
        const { width: w, height: h } = this.scale;
        // Clear any existing panels
        if (this._lsPanel) this._lsPanel.forEach(o => o.destroy());
        this._lsPanel = [];
        const add = (o) => { this._lsPanel.push(o); return o; };

        const overlay = add(this.add.graphics().setDepth(300));
        overlay.fillStyle(0x000000, 0.65); overlay.fillRect(0,0,w,h);
        overlay.fillStyle(0x0a1020, 0.98); overlay.fillRoundedRect(w/2-280, h/2-230, 560, 460, 22);
        overlay.lineStyle(3, world.color, 1); overlay.strokeRoundedRect(w/2-280, h/2-230, 560, 460, 22);

        add(this.add.text(w/2, h/2-200, `${world.name} — Selecione a Fase`, { fontSize: '20px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5).setDepth(301));

        for (let lvl=1; lvl<=10; lvl++) {
            const col = (lvl-1)%5, row = Math.floor((lvl-1)/5);
            const bx = w/2-200 + col*84, by = h/2-150 + row*95;
            const lvlData = wd.levels[lvl] || {};
            const unlocked = lvl===1 || wd.levels[lvl-1]?.completed;
            const stars = lvlData.stars || 0;
            const bg = add(this.add.graphics().setDepth(301));
            bg.fillStyle(unlocked ? world.darkColor : 0x111111, 0.95);
            bg.fillRoundedRect(bx-34, by-34, 68, 80, 10);
            bg.lineStyle(2, unlocked ? world.color : 0x333333, 1);
            bg.strokeRoundedRect(bx-34, by-34, 68, 80, 10);
            add(this.add.text(bx, by-10, unlocked ? `${lvl}` : '🔒', { fontSize: unlocked?'22px':'18px', fill: unlocked?'#fff':'#444', fontStyle: 'bold' }).setOrigin(0.5).setDepth(302));
            for (let s=0; s<3; s++) {
                const sg = add(this.add.graphics().setDepth(302));
                sg.fillStyle(s < stars ? 0xffd700 : 0x333333, 1);
                drawStar(sg, bx-16+s*16, by+28, 5, 7, 3.5, 0);
            }
            if (unlocked) {
                const zone = add(this.add.zone(bx, by, 68, 80).setInteractive({ useHandCursor: true }).setDepth(303));
                zone.on('pointerdown', () => {
                    this._lsPanel.forEach(o => o.destroy());
                    const worldCap = world.id[0].toUpperCase() + world.id.slice(1);
                    this.scene.start(`${worldCap}_${lvl}`, { worldId: world.id, levelNum: lvl });
                });
                zone.on('pointerover', () => { bg.clear(); bg.fillStyle(world.color, 0.3); bg.fillRoundedRect(bx-34, by-34, 68, 80, 10); bg.lineStyle(2, world.color, 1); bg.strokeRoundedRect(bx-34, by-34, 68, 80, 10); });
                zone.on('pointerout',  () => { bg.clear(); bg.fillStyle(world.darkColor, 0.95); bg.fillRoundedRect(bx-34, by-34, 68, 80, 10); bg.lineStyle(2, world.color, 1); bg.strokeRoundedRect(bx-34, by-34, 68, 80, 10); });
            }
        }
        const close = add(this.add.text(w/2, h/2+200, '✖  Fechar', { fontSize: '18px', fill: '#ff6666', fontStyle: 'bold' }).setOrigin(0.5).setDepth(302).setInteractive({ useHandCursor: true }));
        close.on('pointerdown', () => { this._lsPanel.forEach(o=>o.destroy()); this._lsPanel=[]; });
    }
}
