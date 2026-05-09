class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }
    create() {
        const { width: w, height: h } = this.scale;
        this._drawBg(w, h);
        this._drawTitle(w, h);
        this._drawMiguel(w, h);
        this._drawMenu(w, h);
        this._drawClouds(w, h);
        const data = SaveSystem.load();
        this.add.text(18, h - 36, `⭐ ${data.totalStars} estrelas  🪙 ${data.totalCoins} moedas`, { fontSize: '14px', fill: '#ffd700', stroke: '#000', strokeThickness: 3 });
    }
    _drawBg(w, h) {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xc5e8ff, 0xc5e8ff, 1);
        bg.fillRect(0, 0, w, h);
        bg.fillStyle(0x4caf50, 1); bg.fillRect(0, h - 100, w, 100);
        bg.fillStyle(0x2e7d32, 1); bg.fillRect(0, h - 108, w, 12);
        for (let i = 0; i < 7; i++) {
            const tx = i * 170 + 30;
            bg.fillStyle(0x5c3010, 1); bg.fillRect(tx - 8, h - 160, 16, 60);
            bg.fillStyle(0x2d8a3e, 1); bg.fillCircle(tx, h - 168, 38);
            bg.fillCircle(tx - 20, h - 150, 24); bg.fillCircle(tx + 20, h - 150, 24);
            bg.fillStyle(0x3da850, 1); bg.fillCircle(tx, h - 188, 22);
        }
    }
    _drawTitle(w, h) {
        const p = this.add.graphics();
        p.fillStyle(0x000000, 0.4); p.fillRoundedRect(w/2-290, 18, 580, 115, 20);
        p.lineStyle(3, 0xffd700, 1); p.strokeRoundedRect(w/2-290, 18, 580, 115, 20);
        const t = this.add.text(w/2, 60, 'Super Miguel', { fontSize: '66px', fill: '#FFD700', fontStyle: 'bold', stroke: '#8B4513', strokeThickness: 9 }).setOrigin(0.5);
        this.add.text(w/2, 118, 'As Aventuras de Miguel', { fontSize: '20px', fill: '#fff', stroke: '#333', strokeThickness: 3 }).setOrigin(0.5);
        this.tweens.add({ targets: t, scaleX: 1.03, scaleY: 1.03, duration: 1000, yoyo: true, repeat: -1 });
    }
    _drawMiguel(w, h) {
        const m = this.add.image(w/2 - 200, h - 178, 'miguel_stand').setScale(0.22).setDepth(10);
        this.tweens.add({ targets: m, y: h - 193, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
        const sh = this.add.graphics().setDepth(9);
        sh.fillStyle(0x000000, 0.2); sh.fillEllipse(w/2 - 200, h - 102, 64, 14);
    }
    _drawMenu(w, h) {
        const btns = [
            { label: '🎮  Jogar Aventura',  scene: 'WorldMapScene', color: 0x1565c0, hover: 0x1e88e5 },
            { label: '📂  Continuar',        action: 'continue',     color: 0x2e7d32, hover: 0x43a047 },
            { label: '🏆  Recordes',         action: 'records',      color: 0x6a1b9a, hover: 0x8e24aa },
            { label: '🗑️  Apagar Progresso', action: 'reset',        color: 0xb71c1c, hover: 0xe53935 },
        ];
        btns.forEach((btn, i) => {
            const bx = w/2 + 80, by = h - 262 + i * 58;
            const bg = this.add.graphics();
            const draw = (c, a) => { bg.clear(); bg.fillStyle(c, a); bg.fillRoundedRect(bx-180, by-23, 360, 46, 12); bg.lineStyle(2, 0xffffff, 0.3); bg.strokeRoundedRect(bx-180, by-23, 360, 46, 12); };
            draw(btn.color, 0.9);
            const txt = this.add.text(bx, by, btn.label, { fontSize: '18px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
            const z = this.add.zone(bx, by, 360, 46).setInteractive({ useHandCursor: true });
            z.on('pointerover', () => { draw(btn.hover, 1); txt.setScale(1.05); });
            z.on('pointerout',  () => { draw(btn.color, 0.9); txt.setScale(1); });
            z.on('pointerdown', () => {
                if (btn.scene) this.scene.start(btn.scene);
                else if (btn.action === 'continue') this.scene.start('WorldMapScene');
                else if (btn.action === 'reset') { SaveSystem.reset(); this.scene.restart(); }
                else if (btn.action === 'records') this._showRecords();
            });
        });
        this.add.text(w/2+80, h-28, '← → Mover  |  ↑/Espaço Pular  |  Z Ação  |  R Rebobinar tempo', { fontSize: '11px', fill: '#ffffff88' }).setOrigin(0.5);
    }
    _drawClouds(w, h) {
        for (let i = 0; i < 6; i++) {
            const g = this.add.graphics().setDepth(4);
            const cy = Phaser.Math.Between(40, 200), sc = 0.6 + Math.random() * 0.8;
            g.fillStyle(0xffffff, 0.82); g.fillEllipse(0,0,110,38); g.fillEllipse(-30,-12,62,36); g.fillEllipse(28,-12,52,30);
            g.x = Phaser.Math.Between(-120, w+120); g.y = cy; g.setScale(sc);
            this.tweens.add({ targets: g, x: w+200, duration: Phaser.Math.Between(14000, 28000), repeat: -1, onRepeat: () => { g.x=-200; g.y=Phaser.Math.Between(40,200); } });
        }
    }
    _showRecords() {
        const { width: w, height: h } = this.scale, data = SaveSystem.load();
        const ov = this.add.graphics().setDepth(400);
        ov.fillStyle(0x000000, 0.55); ov.fillRect(0,0,w,h);
        ov.fillStyle(0x0d0d1a, 0.98); ov.fillRoundedRect(w/2-300, h/2-240, 600, 480, 22);
        ov.lineStyle(3, 0xffd700, 1); ov.strokeRoundedRect(w/2-300, h/2-240, 600, 480, 22);
        this.add.text(w/2, h/2-210, '🏆 Recordes por Mundo', { fontSize: '24px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5).setDepth(401);
        WORLDS.forEach((world, i) => {
            const wd = data.worlds[world.id] || {}, stars = Object.values(wd.levels||{}).reduce((s,l)=>s+(l.stars||0),0), completed = Object.values(wd.levels||{}).filter(l=>l.completed).length;
            const y = h/2 - 160 + i * 38;
            this.add.text(w/2-270, y, (wd.unlocked?'':'🔒 ') + world.name, { fontSize: '14px', fill: '#fff' }).setDepth(401);
            this.add.text(w/2+90, y, `${completed}/10 fases  ⭐ ${stars}/30`, { fontSize: '14px', fill: '#ffd700' }).setDepth(401);
        });
        this.add.text(w/2, h/2+210, '✖ Fechar', { fontSize: '20px', fill: '#ff4444', fontStyle: 'bold' }).setOrigin(0.5).setDepth(401).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.restart());
    }
}
