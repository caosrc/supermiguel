const GraphicsHelper = {

    createPlayerSprite(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const w = 32, h = 48;
        g.fillStyle(0xFFD700);
        g.fillCircle(w / 2, 12, 10);
        g.fillStyle(0x8B4513);
        g.fillRect(8, 2, 16, 8);
        g.fillStyle(0x4169E1);
        g.fillRect(4, 22, 24, 18);
        g.fillStyle(0xFFD700);
        g.fillRect(4, 18, 8, 6);
        g.fillRect(20, 18, 8, 6);
        g.fillStyle(0x8B4513);
        g.fillRect(4, 40, 10, 8);
        g.fillRect(18, 40, 10, 8);
        g.fillStyle(0x000000);
        g.fillCircle(14, 10, 2);
        g.fillCircle(20, 10, 2);
        g.fillStyle(0xFF6B6B);
        g.fillEllipse(w / 2, 15, 6, 3);
        g.generateTexture(key, w, h);
        g.destroy();
    },

    createNPC(scene, key, bodyColor, shirtColor, hairColor) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(bodyColor || 0xFFD700);
        g.fillCircle(16, 12, 10);
        g.fillStyle(hairColor || 0x8B4513);
        g.fillRect(6, 2, 20, 8);
        g.fillStyle(shirtColor || 0xFF6347);
        g.fillRect(4, 22, 24, 18);
        g.fillStyle(bodyColor || 0xFFD700);
        g.fillRect(4, 18, 8, 6);
        g.fillRect(20, 18, 8, 6);
        g.fillStyle(0x4169E1);
        g.fillRect(4, 40, 10, 8);
        g.fillRect(18, 40, 10, 8);
        g.fillStyle(0x000000);
        g.fillCircle(13, 10, 2);
        g.fillCircle(19, 10, 2);
        g.generateTexture(key, 32, 48);
        g.destroy();
    },

    createGround(scene, key, color, width, height) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0x8B6914);
        g.fillRect(0, 0, width || 800, height || 32);
        g.fillStyle(0x228B22);
        g.fillRect(0, 0, width || 800, 8);
        g.generateTexture(key, width || 800, height || 32);
        g.destroy();
    },

    createPlatform(scene, key, color, w, h) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0x8B6914);
        g.fillRect(0, 0, w || 120, h || 20);
        g.fillStyle(color ? Phaser.Display.Color.IntegerToColor(color).lighten(20).color : 0xA0784C);
        g.fillRect(0, 0, w || 120, 6);
        g.generateTexture(key, w || 120, h || 20);
        g.destroy();
    },

    createCar(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0xFF4444);
        g.fillRoundedRect(4, 10, 72, 30, 6);
        g.fillStyle(color ? Phaser.Display.Color.IntegerToColor(color).darken(20).color : 0xCC0000);
        g.fillRoundedRect(12, 4, 52, 20, 4);
        g.fillStyle(0x87CEEB);
        g.fillRect(16, 8, 18, 12);
        g.fillRect(42, 8, 18, 12);
        g.fillStyle(0x333333);
        g.fillCircle(18, 40, 9);
        g.fillCircle(62, 40, 9);
        g.fillStyle(0x666666);
        g.fillCircle(18, 40, 5);
        g.fillCircle(62, 40, 5);
        g.fillStyle(0xFFFF00);
        g.fillRect(4, 20, 6, 8);
        g.fillStyle(0xFF0000);
        g.fillRect(70, 20, 6, 8);
        g.generateTexture(key, 80, 50);
        g.destroy();
    },

    createTree(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8B4513);
        g.fillRect(18, 50, 12, 40);
        g.fillStyle(0x228B22);
        g.fillTriangle(24, 0, 0, 50, 48, 50);
        g.fillStyle(0x2E8B22);
        g.fillTriangle(24, 15, 4, 60, 44, 60);
        g.generateTexture(key, 48, 90);
        g.destroy();
    },

    createHouse(scene, key, wallColor, roofColor) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(wallColor || 0xF5DEB3);
        g.fillRect(0, 40, 100, 70);
        g.fillStyle(roofColor || 0xB22222);
        g.fillTriangle(50, 0, -10, 50, 110, 50);
        g.fillStyle(0x8B4513);
        g.fillRect(35, 75, 28, 35);
        g.fillStyle(0x87CEEB);
        g.fillRect(10, 60, 25, 20);
        g.fillRect(65, 60, 25, 20);
        g.fillStyle(0xC0A080);
        g.fillRect(8, 58, 29, 2);
        g.fillRect(8, 80, 29, 2);
        g.fillRect(22, 58, 2, 24);
        g.generateTexture(key, 100, 110);
        g.destroy();
    },

    createCollectible(scene, key, color, symbol) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0x00BFFF);
        g.fillCircle(20, 20, 18);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(20, 20, 14);
        g.fillStyle(color || 0x00BFFF);
        g.fillCircle(20, 20, 10);
        g.generateTexture(key, 40, 40);
        g.destroy();
    },

    createWaterBottle(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x00BFFF);
        g.fillRoundedRect(8, 10, 20, 30, 4);
        g.fillStyle(0xFFFFFF);
        g.fillRect(10, 14, 6, 22);
        g.fillStyle(0x888888);
        g.fillRect(10, 6, 16, 8);
        g.generateTexture(key, 36, 44);
        g.destroy();
    },

    createFood(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xDEB887);
        g.fillEllipse(20, 24, 36, 20);
        g.fillStyle(0xFF6347);
        g.fillCircle(20, 18, 10);
        g.fillCircle(12, 22, 7);
        g.fillCircle(28, 22, 7);
        g.fillStyle(0x228B22);
        g.fillRect(18, 8, 4, 10);
        g.generateTexture(key, 40, 44);
        g.destroy();
    },

    createMedicine(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFF6347);
        g.fillRoundedRect(4, 4, 14, 32, 6);
        g.fillStyle(0xFFFFFF);
        g.fillRoundedRect(18, 4, 14, 32, 6);
        g.fillStyle(0xCCCCCC);
        g.fillRect(16, 4, 4, 32);
        g.generateTexture(key, 36, 40);
        g.destroy();
    },

    createDog(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xC8A46E);
        g.fillEllipse(28, 28, 40, 24);
        g.fillCircle(52, 22, 14);
        g.fillStyle(0xA0784C);
        g.fillEllipse(38, 8, 10, 16);
        g.fillEllipse(50, 6, 10, 16);
        g.fillStyle(0x000000);
        g.fillCircle(56, 20, 3);
        g.fillStyle(0xFFB6C1);
        g.fillEllipse(62, 28, 6, 4);
        g.fillStyle(0xC8A46E);
        g.fillRect(12, 36, 8, 18);
        g.fillRect(24, 36, 8, 18);
        g.fillRect(36, 36, 8, 18);
        g.fillRect(48, 36, 8, 18);
        g.generateTexture(key, 70, 58);
        g.destroy();
    },

    createSign(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8B6914);
        g.fillRect(28, 0, 8, 80);
        g.fillStyle(color || 0xFFFFFF);
        g.fillRect(0, 8, 64, 44);
        g.fillStyle(color ? 0x333333 : 0x333333);
        g.lineStyle(3, 0x333333);
        g.strokeRect(0, 8, 64, 44);
        g.generateTexture(key, 64, 80);
        g.destroy();
    },

    createCoin(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFD700);
        g.fillCircle(12, 12, 12);
        g.fillStyle(0xFFA500);
        g.fillCircle(12, 12, 8);
        g.fillStyle(0xFFD700);
        g.fillRect(10, 6, 4, 12);
        g.generateTexture(key, 24, 24);
        g.destroy();
    },

    createBed(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8B4513);
        g.fillRect(0, 20, 80, 10);
        g.fillRect(0, 30, 80, 30);
        g.fillStyle(0xFFFFFF);
        g.fillRect(4, 30, 72, 26);
        g.fillStyle(0x4169E1);
        g.fillRect(4, 30, 72, 12);
        g.fillStyle(0xFFFDD0);
        g.fillCircle(15, 36, 10);
        g.generateTexture(key, 80, 60);
        g.destroy();
    },

    createBike(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.lineStyle(4, 0x333333);
        g.strokeCircle(16, 30, 14);
        g.strokeCircle(54, 30, 14);
        g.fillStyle(0xFF4444);
        g.fillRect(16, 16, 38, 6);
        g.fillStyle(0x333333);
        g.fillRect(28, 10, 14, 8);
        g.fillStyle(0x888888);
        g.fillRect(38, 0, 6, 12);
        g.fillStyle(0x333333);
        g.fillRect(0, 28, 6, 6);
        g.fillRect(64, 28, 6, 6);
        g.generateTexture(key, 70, 46);
        g.destroy();
    },

    createCloud(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFFFFF);
        g.fillCircle(30, 30, 20);
        g.fillCircle(50, 25, 25);
        g.fillCircle(70, 30, 20);
        g.fillCircle(40, 20, 18);
        g.fillCircle(60, 20, 18);
        g.fillRect(20, 30, 70, 20);
        g.generateTexture(key, 100, 50);
        g.destroy();
    },

    createBush(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x228B22);
        g.fillCircle(20, 20, 16);
        g.fillCircle(36, 16, 18);
        g.fillCircle(52, 20, 16);
        g.fillCircle(28, 28, 14);
        g.fillCircle(44, 28, 14);
        g.generateTexture(key, 70, 40);
        g.destroy();
    },

    createStar(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFD700);
        const cx = 16, cy = 16, r1 = 14, r2 = 6, points = 5;
        const path = [];
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? r1 : r2;
            const angle = (i * Math.PI) / points - Math.PI / 2;
            path.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
        }
        g.fillPoints(path, true);
        g.generateTexture(key, 32, 32);
        g.destroy();
    },

    createTrafficLight(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x333333);
        g.fillRoundedRect(4, 4, 28, 70, 4);
        g.fillStyle(0xFF0000);
        g.fillCircle(18, 18, 10);
        g.fillStyle(0xFFFF00);
        g.fillCircle(18, 38, 10);
        g.fillStyle(0x00FF00);
        g.fillCircle(18, 58, 10);
        g.fillStyle(0x8B4513);
        g.fillRect(14, 74, 8, 40);
        g.generateTexture(key, 36, 114);
        g.destroy();
    },

    createCrossing(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFFFFF);
        for (let i = 0; i < 5; i++) {
            g.fillRect(i * 24, 0, 14, 60);
        }
        g.generateTexture(key, 120, 60);
        g.destroy();
    },

    createFlag(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8B4513);
        g.fillRect(4, 0, 4, 60);
        g.fillStyle(color || 0xFF4444);
        g.fillTriangle(8, 4, 8, 28, 36, 16);
        g.generateTexture(key, 40, 64);
        g.destroy();
    },

    createParticle(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0xFFD700);
        g.fillCircle(4, 4, 4);
        g.generateTexture(key, 8, 8);
        g.destroy();
    }
};
