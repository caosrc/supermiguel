class TimeRewind {
    constructor(scene, miguel) {
        this.scene = scene;
        this.miguel = miguel;
        this.history = [];
        this.recording = true;
        this.rewinding = false;
        this.maxFrames = MAX_REWIND_SECONDS * 60;
        this.rewindGlow = null;
        this.overlay = null;
    }

    record(dt) {
        if (!this.recording || this.rewinding) return;
        const m = this.miguel;
        const state = {
            x: m.sprite.x,
            y: m.sprite.y,
            vx: m.body ? m.body.velocity.x : 0,
            vy: m.body ? m.body.velocity.y : 0,
            state: m.currentState,
            health: m.health,
            flipX: m.sprite.flipX,
        };
        this.history.push(state);
        if (this.history.length > this.maxFrames) this.history.shift();
    }

    startRewind() {
        if (this.history.length < 2) return;
        this.rewinding = true;
        this.recording = false;
        this.scene.sound.play && this.scene.sound.play('rewind_sfx', { volume: 0.5, loop: true });
        this._showRewindFX();
    }

    stopRewind() {
        this.rewinding = false;
        this.recording = true;
        this.scene.sound.stopByKey && this.scene.sound.stopByKey('rewind_sfx');
        this._hideRewindFX();
    }

    update() {
        if (!this.rewinding) return;
        if (this.history.length === 0) { this.stopRewind(); return; }
        const frame = this.history.pop();
        const m = this.miguel;
        m.sprite.x = frame.x;
        m.sprite.y = frame.y;
        if (m.body) {
            m.body.velocity.x = frame.vx;
            m.body.velocity.y = frame.vy;
            m.body.reset(frame.x, frame.y);
        }
        m.sprite.flipX = frame.flipX;
        m.health = frame.health;
        m.setState(frame.state);
    }

    _showRewindFX() {
        const { width, height } = this.scene.scale;
        if (!this.overlay) {
            this.overlay = this.scene.add.graphics();
            this.overlay.setDepth(200);
            this.overlay.setScrollFactor(0);
        }
        this.overlay.clear();
        this.overlay.fillStyle(0x7c4dff, 0.22);
        this.overlay.fillRect(0, 0, width, height);
        this.overlay.lineStyle(4, 0xce93d8, 0.8);
        this.overlay.strokeRect(4, 4, width - 8, height - 8);

        if (!this.rewindLabel) {
            this.rewindLabel = this.scene.add.text(width / 2, 40, '⏪ VOLTANDO NO TEMPO', {
                fontSize: '22px', fill: '#ce93d8', stroke: '#1a1a2e', strokeThickness: 4, fontStyle: 'bold',
            }).setOrigin(0.5).setScrollFactor(0).setDepth(201);
        }
        this.rewindLabel.setVisible(true);
    }

    _hideRewindFX() {
        if (this.overlay) { this.overlay.clear(); }
        if (this.rewindLabel) this.rewindLabel.setVisible(false);
    }

    destroy() {
        if (this.overlay) this.overlay.destroy();
        if (this.rewindLabel) this.rewindLabel.destroy();
    }
}
