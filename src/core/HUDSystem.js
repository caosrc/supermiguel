class HUDSystem {
    constructor(scene) {
        this.scene       = scene;
        this.container   = null;
        this.healthBars  = [];
        this.coinText    = null;
        this.starText    = null;
        this.levelText   = null;
        this.rewindBar   = null;
        this.rewindBarBg = null;
        this.comboText   = null;
        this._smElapsed  = 0;
        this._smInterval = 95;
        this._smAngleH   = 0;
        this._build();
    }

    _build() {
        const s = this.scene;

        const bg = s.add.graphics().setScrollFactor(0).setDepth(300);
        bg.fillStyle(0x000000, 0.35);
        bg.fillRoundedRect(6, 6, 300, 58, 10);
        for (let i = 0; i < 300; i += 18) {
            bg.fillStyle(0xd4a050, 0.06);
            bg.fillRect(6 + i, 6, 9, 58);
        }
        bg.lineStyle(2.5, 0xd4a050, 0.55);
        bg.strokeRoundedRect(6, 6, 300, 58, 10);
        bg.lineStyle(1, 0xffd090, 0.22);
        bg.strokeRoundedRect(10, 10, 292, 50, 7);

        this.healthBars = [];
        for (let i = 0; i < 3; i++) {
            const heart = s.add.graphics().setScrollFactor(0).setDepth(301);
            heart.fillStyle(0x000000, 0.3);
            heart.fillTriangle(22 + i * 30 + 1, 30, 40 + i * 30 + 1, 30, 31 + i * 30 + 1, 42);
            heart.fillCircle(17 + i * 30 + 1, 26, 7);
            heart.fillCircle(27 + i * 30 + 1, 26, 7);
            heart.fillStyle(0xff3333, 1);
            heart.fillTriangle(21 + i * 30, 30, 39 + i * 30, 30, 30 + i * 30, 42);
            heart.fillCircle(16 + i * 30, 26, 7);
            heart.fillCircle(26 + i * 30, 26, 7);
            heart.fillStyle(0xff7777, 0.7);
            heart.fillCircle(14 + i * 30, 24, 3);
            heart.lineStyle(1.5, 0x880000, 0.6);
            heart.strokeTriangle(21 + i * 30, 30, 39 + i * 30, 30, 30 + i * 30, 42);
            this.healthBars.push(heart);
        }

        const coinShadow = s.add.graphics().setScrollFactor(0).setDepth(301);
        coinShadow.fillStyle(0x000000, 0.3); coinShadow.fillCircle(154, 34, 11);

        const coinIcon = s.add.graphics().setScrollFactor(0).setDepth(301);
        coinIcon.fillStyle(0xffd700, 1); coinIcon.fillCircle(152, 32, 11);
        coinIcon.fillStyle(0xffec6e, 1); coinIcon.fillCircle(149, 29, 5);
        coinIcon.fillStyle(0xffa000, 1); coinIcon.fillCircle(152, 32, 4);
        coinIcon.lineStyle(2, 0xb8860b, 0.9); coinIcon.strokeCircle(152, 32, 11);

        this.coinText = s.add.text(167, 20, '0', {
            fontSize: '18px', fill: '#ffd700', fontStyle: 'bold',
            stroke: '#2a1000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(301);

        const starIcon = s.add.graphics().setScrollFactor(0).setDepth(301);
        starIcon.fillStyle(0x000000, 0.25);
        drawStar(starIcon, 217, 34, 5, 12, 6, 0);
        starIcon.fillStyle(0xffeb3b, 1);
        drawStar(starIcon, 215, 32, 5, 12, 6, 0);
        starIcon.fillStyle(0xffffff, 0.5);
        drawStar(starIcon, 215, 32, 5, 5, 2.5, 0);
        starIcon.lineStyle(2, 0xb8860b, 0.7);
        drawStar(starIcon, 215, 32, 5, 12, 6, 0);

        this.starText = s.add.text(230, 20, '0/3', {
            fontSize: '18px', fill: '#ffeb3b', fontStyle: 'bold',
            stroke: '#2a1000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(301);

        const rbg = s.add.graphics().setScrollFactor(0).setDepth(301);
        rbg.fillStyle(0x000000, 0.45);
        rbg.fillRoundedRect(GAME_W - 175, 6, 169, 30, 9);
        rbg.lineStyle(2, 0x7c4dff, 0.6);
        rbg.strokeRoundedRect(GAME_W - 175, 6, 169, 30, 9);
        this.rewindBarBg = rbg;

        this.rewindBar = s.add.graphics().setScrollFactor(0).setDepth(302);

        this.rewindLabel = s.add.text(GAME_W - 172, 11, '⏪ REBOBINAR', {
            fontSize: '10px', fill: '#ce93d8', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(303);

        this.levelText = s.add.text(GAME_W / 2, 11, '', {
            fontSize: '15px', fill: '#ffe0b0', fontStyle: 'bold',
            stroke: '#1a0a00', strokeThickness: 3
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(301);

        this.comboText = s.add.text(GAME_W / 2, 62, '', {
            fontSize: '26px', fill: '#ffd700', fontStyle: 'bold',
            stroke: '#b84800', strokeThickness: 5
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(301).setAlpha(0);
    }

    update(miguel, rewindHistory) {
        if (!miguel) return;

        this._smElapsed += this.scene.game.loop.delta;
        if (this._smElapsed >= this._smInterval) {
            this._smElapsed -= this._smInterval;
            this._smAngleH   = (Math.random() - 0.5) * 3.5;
            this.healthBars.forEach((h, i) => {
                h.setAngle(i < miguel.health ? (Math.random() - 0.5) * 4 : 0);
                h.setAlpha(i < miguel.health ? 1 : 0.2);
            });
            if (this.levelText) this.levelText.setAngle((Math.random() - 0.5) * 1.2);
        }

        if (this.coinText) this.coinText.setText(miguel.coins || 0);
        if (this.starText) this.starText.setText((miguel.stars || 0) + '/3');

        const pct = rewindHistory ? Math.min(1, rewindHistory.length / (MAX_REWIND_SECONDS * 60)) : 0;
        if (this.rewindBar) {
            this.rewindBar.clear();
            if (pct > 0) {
                this.rewindBar.fillStyle(0x7c4dff, 1);
                this.rewindBar.fillRoundedRect(GAME_W - 173, 8, 165 * pct, 26, 7);
                this.rewindBar.fillStyle(0xce93d8, 0.45);
                this.rewindBar.fillRoundedRect(GAME_W - 173, 8, 44 * pct, 13, 5);
            }
        }
    }

    setLevelText(txt) {
        if (this.levelText) this.levelText.setText(txt);
    }

    showCombo(text) {
        if (!this.comboText) return;
        this.comboText.setText(text).setAlpha(1).setScale(1.45)
            .setAngle((Math.random() - 0.5) * 5);
        this.scene.tweens.add({
            targets: this.comboText,
            alpha: 0, scaleX: 0.95, scaleY: 0.95, y: 40,
            duration: 1200, ease: 'Power2',
            onComplete: () => {
                if (this.comboText) this.comboText.y = 62;
            }
        });
    }

    destroy() {
        if (this.container) this.container.destroy();
    }
}
