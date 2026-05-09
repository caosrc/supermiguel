class HUDSystem {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.healthBars = [];
        this.starTexts = [];
        this.coinText = null;
        this.levelText = null;
        this.rewindBar = null;
        this.rewindBarBg = null;
        this.comboText = null;
        this._build();
    }

    _build() {
        const s = this.scene;
        this.container = s.add.container(0, 0).setDepth(300).setScrollFactor(0);

        const bg = s.add.graphics();
        bg.fillStyle(0x000000, 0.55);
        bg.fillRoundedRect(8, 8, 280, 52, 10);
        this.container.add(bg);

        s.add.text(16, 16, '❤️', { fontSize: '18px' }).setScrollFactor(0).setDepth(301);

        this.healthBars = [];
        for (let i = 0; i < 3; i++) {
            const heart = s.add.graphics().setScrollFactor(0).setDepth(301);
            heart.fillStyle(0xff4444, 1);
            heart.fillCircle(44 + i * 28, 22, 10);
            heart.fillStyle(0xff6666, 1);
            heart.fillCircle(40 + i * 28, 18, 6);
            heart.fillCircle(48 + i * 28, 18, 6);
            this.healthBars.push(heart);
        }

        const coinIcon = s.add.graphics().setScrollFactor(0).setDepth(301);
        coinIcon.fillStyle(0xffd700, 1);
        coinIcon.fillCircle(148, 22, 10);
        coinIcon.fillStyle(0xffec6e, 1);
        coinIcon.fillCircle(145, 19, 5);
        this.container.add(coinIcon);

        this.coinText = s.add.text(162, 14, '0', {
            fontSize: '18px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        }).setScrollFactor(0).setDepth(301);

        const starIcon = s.add.graphics().setScrollFactor(0).setDepth(301);
        starIcon.fillStyle(0xffffff, 1);
        drawStar(starIcon, 210, 22, 5, 12, 6, 0);
        starIcon.fillStyle(0xffeb3b, 1);
        drawStar(starIcon, 210, 22, 5, 11, 5.5, 0);
        this.container.add(starIcon);

        this.starText = s.add.text(224, 14, '0/3', {
            fontSize: '18px', fill: '#ffeb3b', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        }).setScrollFactor(0).setDepth(301);

        const rbg = s.add.graphics().setScrollFactor(0).setDepth(301);
        rbg.fillStyle(0x1a0030, 0.8);
        rbg.fillRoundedRect(GAME_W - 170, 8, 162, 26, 8);
        this.rewindBarBg = rbg;

        this.rewindBar = s.add.graphics().setScrollFactor(0).setDepth(302);

        this.rewindLabel = s.add.text(GAME_W - 168, 10, '⏪ REWIND', {
            fontSize: '11px', fill: '#ce93d8', fontStyle: 'bold',
        }).setScrollFactor(0).setDepth(303);

        this.levelText = s.add.text(GAME_W / 2, 12, '', {
            fontSize: '15px', fill: '#ffffff', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(301);

        this.comboText = s.add.text(GAME_W / 2, 60, '', {
            fontSize: '26px', fill: '#ffd700', fontStyle: 'bold', stroke: '#ff6600', strokeThickness: 5,
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(301).setAlpha(0);
    }

    update(miguel, rewindHistory) {
        if (!miguel) return;

        this.healthBars.forEach((h, i) => {
            h.setAlpha(i < miguel.health ? 1 : 0.2);
        });

        if (this.coinText) this.coinText.setText(miguel.coins || 0);
        if (this.starText) this.starText.setText((miguel.stars || 0) + '/3');

        const pct = rewindHistory ? Math.min(1, rewindHistory.length / (MAX_REWIND_SECONDS * 60)) : 0;
        if (this.rewindBar) {
            this.rewindBar.clear();
            this.rewindBar.fillStyle(0x7c4dff, 1);
            this.rewindBar.fillRoundedRect(GAME_W - 168, 10, 158 * pct, 22, 6);
            this.rewindBar.fillStyle(0xce93d8, 0.5);
            this.rewindBar.fillRoundedRect(GAME_W - 168, 10, 40 * pct, 22, 6);
        }
    }

    setLevelText(txt) {
        if (this.levelText) this.levelText.setText(txt);
    }

    showCombo(text) {
        if (!this.comboText) return;
        this.comboText.setText(text).setAlpha(1).setScale(1.4);
        this.scene.tweens.add({
            targets: this.comboText,
            alpha: 0, scaleX: 1, scaleY: 1, y: 40,
            duration: 1200, ease: 'Power2',
            onComplete: () => { this.comboText.y = 60; }
        });
    }

    destroy() {
        if (this.container) this.container.destroy();
    }
}
