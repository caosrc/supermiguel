class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.box = null;
        this.text = null;
        this.nameText = null;
        this.timer = null;
        this.isVisible = false;
        this._create();
    }

    _create() {
        const { width, height } = this.scene.scale;
        this.box = this.scene.add.graphics();
        this.box.fillStyle(0x000000, 0.8);
        this.box.fillRoundedRect(10, height - 110, width - 20, 100, 12);
        this.box.lineStyle(3, 0xFFD700, 1);
        this.box.strokeRoundedRect(10, height - 110, width - 20, 100, 12);
        this.box.setScrollFactor(0);
        this.box.setDepth(100);
        this.box.setVisible(false);

        this.nameText = this.scene.add.text(30, height - 100, '', {
            fontSize: '14px',
            fill: '#FFD700',
            fontStyle: 'bold'
        });
        this.nameText.setScrollFactor(0);
        this.nameText.setDepth(101);
        this.nameText.setVisible(false);

        this.text = this.scene.add.text(30, height - 80, '', {
            fontSize: '16px',
            fill: '#FFFFFF',
            wordWrap: { width: width - 60 },
            lineSpacing: 4
        });
        this.text.setScrollFactor(0);
        this.text.setDepth(101);
        this.text.setVisible(false);
    }

    show(message, speaker, duration) {
        if (this.timer) this.timer.remove();
        const d = duration || 3500;
        this.box.setVisible(true);
        this.text.setVisible(true);
        this.nameText.setVisible(true);
        this.text.setText(message);
        this.nameText.setText(speaker ? speaker + ':' : '');
        this.isVisible = true;
        this.timer = this.scene.time.delayedCall(d, () => {
            this.hide();
        });
    }

    hide() {
        this.box.setVisible(false);
        this.text.setVisible(false);
        this.nameText.setVisible(false);
        this.isVisible = false;
    }

    destroy() {
        if (this.timer) this.timer.remove();
        this.box.destroy();
        this.text.destroy();
        this.nameText.destroy();
    }
}
