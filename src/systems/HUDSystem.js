class HUDSystem {
    constructor(scene) {
        this.scene = scene;
        this._bars = {};
        this._texts = {};
        this._icons = {};
        this._create();
    }

    _create() {
        const { width } = this.scene.scale;

        this.panel = this.scene.add.graphics();
        this.panel.fillStyle(0x000000, 0.65);
        this.panel.fillRoundedRect(6, 6, 260, 92, 10);
        this.panel.setScrollFactor(0);
        this.panel.setDepth(90);

        const labels = [
            { key: 'energia', label: '⚡', color: 0xFFD700, y: 18 },
            { key: 'saude',   label: '❤️', color: 0xFF4444, y: 38 },
            { key: 'fome',    label: '🍎', color: 0xFF8C00, y: 58 },
            { key: 'sono',    label: '💤', color: 0x6495ED, y: 78 }
        ];

        labels.forEach(({ key, label, color, y }) => {
            this._icons[key] = this.scene.add.text(14, y, label, { fontSize: '14px' });
            this._icons[key].setScrollFactor(0).setDepth(91);

            const barBg = this.scene.add.graphics();
            barBg.fillStyle(0x333333);
            barBg.fillRoundedRect(36, y + 2, 120, 12, 4);
            barBg.setScrollFactor(0).setDepth(91);

            const bar = this.scene.add.graphics();
            bar.setScrollFactor(0).setDepth(92);
            this._bars[key] = { gfx: bar, color, maxW: 120, x: 36, y: y + 2, h: 12 };

            this._texts[key] = this.scene.add.text(162, y, '100', {
                fontSize: '13px', fill: '#FFFFFF'
            });
            this._texts[key].setScrollFactor(0).setDepth(92);
        });

        this.pontosText = this.scene.add.text(width - 10, 14, 'Pontos: 0', {
            fontSize: '18px',
            fill: '#FFD700',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(91);

        this.moedasText = this.scene.add.text(width - 10, 38, '🪙 0', {
            fontSize: '16px',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(91);

        this.faseText = this.scene.add.text(width - 10, 62, 'Fase 1', {
            fontSize: '14px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(91);
    }

    update(stats) {
        const vals = {
            energia: stats.energia,
            saude:   stats.saude,
            fome:    stats.fome,
            sono:    stats.sono
        };

        Object.entries(vals).forEach(([key, val]) => {
            const b = this._bars[key];
            b.gfx.clear();
            const clamped = Math.max(0, Math.min(100, val));
            const w = (clamped / 100) * b.maxW;
            b.gfx.fillStyle(b.color);
            b.gfx.fillRoundedRect(b.x, b.y, w, b.h, 4);
            this._texts[key].setText(Math.floor(clamped));
        });

        this.pontosText.setText('Pontos: ' + stats.pontos);
        this.moedasText.setText('🪙 ' + stats.moedas);
        this.faseText.setText('Fase ' + stats.fase);
    }

    destroy() {
        this.panel.destroy();
        Object.values(this._bars).forEach(b => b.gfx.destroy());
        Object.values(this._texts).forEach(t => t.destroy());
        Object.values(this._icons).forEach(i => i.destroy());
        this.pontosText.destroy();
        this.moedasText.destroy();
        this.faseText.destroy();
    }
}
