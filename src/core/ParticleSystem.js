class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.emitters = [];
    }

    burst(x, y, color = 0xffd700, count = 12) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 80 + Math.random() * 120;
            const px = x, py = y;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - 80;
            const size = 4 + Math.random() * 6;
            const particle = this.scene.add.graphics().setDepth(150);
            particle.fillStyle(color, 1);
            particle.fillCircle(0, 0, size);
            particle.x = px;
            particle.y = py;
            this.scene.tweens.add({
                targets: particle,
                x: px + vx * 0.8,
                y: py + vy * 0.8 + 120,
                alpha: 0,
                scaleX: 0.1,
                scaleY: 0.1,
                duration: 600 + Math.random() * 400,
                ease: 'Power2',
                onComplete: () => particle.destroy(),
            });
        }
    }

    coins(x, y, count = 6) {
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
            const speed = 100 + Math.random() * 80;
            const g = this.scene.add.graphics().setDepth(150);
            g.fillStyle(0xffd700, 1);
            g.fillCircle(0, 0, 6);
            g.fillStyle(0xffec6e, 1);
            g.fillCircle(-2, -2, 3);
            g.x = x;
            g.y = y;
            this.scene.tweens.add({
                targets: g,
                x: x + Math.cos(angle) * speed * 0.6,
                y: y + Math.sin(angle) * speed - 40,
                duration: 400,
                ease: 'Power1',
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: g,
                        y: y + 200,
                        alpha: 0,
                        duration: 400,
                        ease: 'Power2',
                        onComplete: () => g.destroy(),
                    });
                }
            });
        }
    }

    stars(x, y) {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const g = this.scene.add.graphics().setDepth(150);
            g.fillStyle(0xffeb3b, 1);
            drawStar(g, 0, 0, 5, 10, 5, 0);
            g.x = x;
            g.y = y;
            this.scene.tweens.add({
                targets: g,
                x: x + Math.cos(angle) * 80,
                y: y + Math.sin(angle) * 80 - 40,
                alpha: 0,
                scaleX: 0.2,
                scaleY: 0.2,
                rotation: Math.PI * 2,
                duration: 800,
                ease: 'Power2',
                onComplete: () => g.destroy(),
            });
        }
    }

    footstep(x, y) {
        const g = this.scene.add.graphics().setDepth(50);
        g.fillStyle(0x795548, 0.4);
        g.fillEllipse(0, 0, 14, 6);
        g.x = x;
        g.y = y;
        this.scene.tweens.add({
            targets: g, alpha: 0, y: y + 4, duration: 400,
            onComplete: () => g.destroy(),
        });
    }

    waterDrop(x, y) {
        for (let i = 0; i < 5; i++) {
            const g = this.scene.add.graphics().setDepth(150);
            g.fillStyle(0x4fc3f7, 0.9);
            g.fillEllipse(0, 0, 6, 10);
            g.x = x + (Math.random() - 0.5) * 30;
            g.y = y;
            this.scene.tweens.add({
                targets: g,
                y: y + 60 + Math.random() * 40,
                x: g.x + (Math.random() - 0.5) * 30,
                alpha: 0,
                duration: 500 + Math.random() * 300,
                ease: 'Power2',
                onComplete: () => g.destroy(),
            });
        }
    }

    levelComplete(cx, cy) {
        const colors = [0xffd700, 0xff4081, 0x7c4dff, 0x00bcd4, 0x4caf50, 0xff9800];
        for (let i = 0; i < 40; i++) {
            const delay = i * 40;
            this.scene.time.delayedCall(delay, () => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                this.burst(cx + (Math.random() - 0.5) * 300, cy + (Math.random() - 0.5) * 200, color, 6);
            });
        }
    }
}
