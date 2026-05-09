class NPCSystem {
    constructor(scene) {
        this.scene = scene;
        this.npcs = [];
    }

    create(x, y, type, config = {}) {
        const npc = new NPC(this.scene, x, y, type, config);
        this.npcs.push(npc);
        return npc;
    }

    update(miguelSprite, dialogActive) {
        this.npcs.forEach(n => n.update(miguelSprite, dialogActive));
    }

    destroy() {
        this.npcs.forEach(n => n.destroy());
        this.npcs = [];
    }
}

class NPC {
    constructor(scene, x, y, type, config = {}) {
        this.scene = scene;
        this.type = type;
        this.config = config;
        this.talked = false;
        this.floating = 0;

        const palette = NPC_COLORS[type] || { body: 0xffd7a0, shirt: 0x4169e1, pants: 0x333333 };
        this.sprite = scene.add.graphics().setDepth(90);
        this._drawNPC(x, y, palette);

        this.x = x;
        this.y = y;
        this.baseY = y;

        this.bubbleGfx = scene.add.graphics().setDepth(95);
        this.bubbleText = scene.add.text(x, y - 90, '!', {
            fontSize: '22px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 4,
        }).setOrigin(0.5).setDepth(96);

        this.nameLabel = scene.add.text(x, y - 70, config.name || type, {
            fontSize: '11px', fill: '#ffffff', stroke: '#000', strokeThickness: 3,
            backgroundColor: '#00000088', padding: { x: 4, y: 2 },
        }).setOrigin(0.5).setDepth(96);

        this.interactZone = scene.add.zone(x, y, 120, 160).setDepth(85);
        scene.physics.add.existing(this.interactZone, true);

        this.floatTween = scene.tweens.add({
            targets: this.bubbleText,
            y: y - 100,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut',
        });
    }

    _drawNPC(x, y, pal) {
        const g = this.sprite;
        g.clear();

        g.fillStyle(pal.body, 1);
        g.fillCircle(x, y - 58, 22);

        g.fillStyle(pal.shirt, 1);
        g.fillRoundedRect(x - 16, y - 36, 32, 36, 6);

        g.fillStyle(pal.body, 1);
        g.fillRoundedRect(x - 5, y - 36, 8, 28, 4);
        g.fillRoundedRect(x - 20, y - 34, 8, 28, 4);

        g.fillStyle(pal.pants, 1);
        g.fillRoundedRect(x - 16, y, 14, 26, 4);
        g.fillRoundedRect(x + 2, y, 14, 26, 4);

        g.fillStyle(0x333333, 1);
        g.fillRoundedRect(x - 16, y + 22, 14, 8, 3);
        g.fillRoundedRect(x + 2, y + 22, 14, 8, 3);

        g.fillStyle(pal.body, 1);
        g.fillCircle(x - 18, y - 20, 8);
        g.fillCircle(x + 18, y - 20, 8);

        g.fillStyle(0x222222, 1);
        g.fillCircle(x - 6, y - 60, 4);
        g.fillCircle(x + 6, y - 60, 4);

        g.fillStyle(0xffffff, 1);
        g.fillCircle(x - 5, y - 61, 2);
        g.fillCircle(x + 7, y - 61, 2);

        if (pal.hair) {
            g.fillStyle(pal.hair, 1);
            g.fillEllipse(x, y - 76, 38, 22);
        }
    }

    update(miguelSprite, dialogActive) {
        const dist = Phaser.Math.Distance.Between(miguelSprite.x, miguelSprite.y, this.x, this.y);
        const near = dist < 80;
        this.bubbleGfx.clear();
        this.bubbleText.setVisible(!this.talked && near);
        if (!this.talked && near) {
            this.bubbleGfx.fillStyle(0x000000, 0.7);
            this.bubbleGfx.fillRoundedRect(this.x - 30, this.y - 115, 60, 30, 8);
            this.bubbleGfx.lineStyle(2, 0xffd700, 1);
            this.bubbleGfx.strokeRoundedRect(this.x - 30, this.y - 115, 60, 30, 8);
        }
    }

    canInteract(miguelSprite) {
        return !this.talked && Phaser.Math.Distance.Between(miguelSprite.x, miguelSprite.y, this.x, this.y) < 80;
    }

    interact(dialogSystem) {
        if (this.talked) return;
        const lines = this.config.lines || NPC_DIALOGS[this.type] || ['Olá, Miguel!'];
        this.talked = true;
        this.bubbleText.setVisible(false);
        dialogSystem.show(lines, null, this.config.name || this.type, this.config.onComplete);
    }

    destroy() {
        this.sprite.destroy();
        this.bubbleGfx.destroy();
        this.bubbleText.destroy();
        this.nameLabel.destroy();
        if (this.interactZone) this.interactZone.destroy();
        if (this.floatTween) this.floatTween.stop();
    }
}

const NPC_COLORS = {
    pai:         { body: 0xffd7a0, shirt: 0x2e8b57, pants: 0x1a1a1a, hair: 0x1a1a1a },
    mae:         { body: 0xffd7a0, shirt: 0xff69b4, pants: 0x8b4513, hair: 0x4a2400 },
    avo:         { body: 0xffc8a0, shirt: 0x9370db, pants: 0x555555, hair: 0xcccccc },
    professora:  { body: 0xffd7a0, shirt: 0x4169e1, pants: 0x333333, hair: 0x333333 },
    amigo:       { body: 0xffd7a0, shirt: 0xff4500, pants: 0x1a1a2e, hair: 0x2a1500 },
    jardineiro:  { body: 0xffa070, shirt: 0x228b22, pants: 0x5c3010, hair: 0x3a2000 },
    pescador:    { body: 0xffd7a0, shirt: 0x1e90ff, pants: 0x4a3000, hair: 0x2a1a00 },
    cientista:   { body: 0xffd7a0, shirt: 0xffffff, pants: 0x333333, hair: 0x666666 },
    cachorro:    { body: 0xc8a070, shirt: 0xc8a070, pants: 0x8b4513, hair: 0x4a2a00 },
    fada:        { body: 0xffccff, shirt: 0x9370db, pants: 0xe0b0ff, hair: 0xffd700 },
    knight:      { body: 0xc0c0c0, shirt: 0x808080, pants: 0x606060, hair: 0x333333 },
    alien:       { body: 0x80ff80, shirt: 0x006600, pants: 0x004400, hair: 0x00aa00 },
    pirata:      { body: 0xffd7a0, shirt: 0xcc0000, pants: 0x1a1a1a, hair: 0x2a1a00 },
    feiticeira:  { body: 0xffe0b0, shirt: 0x4a0080, pants: 0x2a004a, hair: 0x1a1a1a },
    robot:       { body: 0x90a4ae, shirt: 0x607d8b, pants: 0x455a64, hair: 0x37474f },
};
