class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.active = false;
        this.queue = [];
        this.container = null;
        this.bg = null;
        this.text = null;
        this.nameText = null;
        this.portrait = null;
        this.continueText = null;
        this.onComplete = null;
        this._build();
    }

    _build() {
        const { width, height } = this.scene.scale;
        const bx = 20, by = height - 150, bw = width - 40, bh = 130;

        this.container = this.scene.add.container(0, 0).setDepth(500).setScrollFactor(0);

        const bg = this.scene.add.graphics();
        bg.fillStyle(0x0d0d1a, 0.92);
        bg.fillRoundedRect(bx, by, bw, bh, 16);
        bg.lineStyle(3, 0xffd700, 1);
        bg.strokeRoundedRect(bx, by, bw, bh, 16);
        this.container.add(bg);

        this.portrait = this.scene.add.graphics();
        this.portrait.fillStyle(0x1a1a2e, 1);
        this.portrait.fillRoundedRect(bx + 10, by + 10, 90, 90, 12);
        this.container.add(this.portrait);

        this.portraitImg = this.scene.add.image(bx + 55, by + 55, '').setScale(0.13).setVisible(false);
        this.container.add(this.portraitImg);

        this.nameText = this.scene.add.text(bx + 115, by + 14, '', {
            fontSize: '17px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 3,
        });
        this.container.add(this.nameText);

        this.text = this.scene.add.text(bx + 115, by + 38, '', {
            fontSize: '15px', fill: '#ffffff', wordWrap: { width: bw - 140 }, lineSpacing: 4,
        });
        this.container.add(this.text);

        this.continueText = this.scene.add.text(bx + bw - 20, by + bh - 18, '▶ Continuar [Z]', {
            fontSize: '13px', fill: '#aaaaff',
        }).setOrigin(1, 1);
        this.container.add(this.continueText);

        this.container.setVisible(false);

        this.scene.tweens.add({ targets: this.continueText, alpha: 0.3, duration: 600, yoyo: true, repeat: -1 });
    }

    show(lines, npcKey, npcName, onComplete) {
        this.queue = [...lines];
        this.npcKey = npcKey;
        this.npcName = npcName;
        this.onComplete = onComplete;
        this.active = true;
        this.container.setVisible(true);
        this.nameText.setText(npcName || '');
        this._next();

        this.scene.input.keyboard.once('keydown-Z', () => this._advance());
        this.scene.input.keyboard.once('keydown-ENTER', () => this._advance());
        this.scene.input.keyboard.once('keydown-SPACE', () => this._advance());
    }

    _next() {
        if (this.queue.length === 0) { this._close(); return; }
        const line = this.queue.shift();
        this.text.setText('');

        let idx = 0;
        if (this._typeTimer) this._typeTimer.remove();
        this._typeTimer = this.scene.time.addEvent({
            delay: 28,
            repeat: line.length - 1,
            callback: () => {
                this.text.setText(line.substring(0, idx + 1));
                idx++;
            }
        });

        if (this.npcKey) {
            try {
                this.portraitImg.setTexture(this.npcKey).setVisible(true);
            } catch { this.portraitImg.setVisible(false); }
        }
    }

    _advance() {
        if (!this.active) return;
        if (this._typeTimer && this._typeTimer.getProgress() < 1) {
            this._typeTimer.remove();
            const line = this.text.text;
            this.text.setText(line + (this.queue[0] || '').substring(line.length));
        } else {
            this._next();
            if (this.active) {
                this.scene.input.keyboard.once('keydown-Z', () => this._advance());
                this.scene.input.keyboard.once('keydown-ENTER', () => this._advance());
                this.scene.input.keyboard.once('keydown-SPACE', () => this._advance());
            }
        }
    }

    _close() {
        this.active = false;
        this.container.setVisible(false);
        if (this.onComplete) this.onComplete();
    }

    isActive() { return this.active; }

    destroy() {
        if (this.container) this.container.destroy();
    }
}
