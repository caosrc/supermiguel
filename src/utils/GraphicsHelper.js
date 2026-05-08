const GraphicsHelper = {

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
        g.fillStyle(0xFFFFFF, 0.35);
        g.fillRect(0, 0, w || 120, 6);
        g.generateTexture(key, w || 120, h || 20);
        g.destroy();
    },

    createCar(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0xFF4444);
        g.fillRoundedRect(4, 10, 72, 30, 6);
        g.fillStyle(0x000000, 0.2);
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

    createGiantTree(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x5C3010);
        g.fillRect(30, 80, 20, 120);
        g.fillStyle(0x1A5C00);
        g.fillCircle(40, 60, 45);
        g.fillStyle(0x228B22);
        g.fillCircle(25, 50, 30);
        g.fillCircle(55, 50, 30);
        g.fillCircle(40, 30, 28);
        g.fillStyle(0x2E7D00);
        g.fillCircle(40, 45, 20);
        g.generateTexture(key, 80, 200);
        g.destroy();
    },

    createMushroom(scene, key, capColor) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xF5DEB3);
        g.fillRoundedRect(22, 50, 20, 30, 4);
        g.fillStyle(capColor || 0xFF4444);
        g.fillEllipse(32, 42, 70, 50);
        g.fillStyle(0xFF8888);
        g.fillEllipse(32, 36, 60, 36);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(20, 40, 6);
        g.fillCircle(44, 36, 5);
        g.fillCircle(32, 52, 4);
        g.generateTexture(key, 64, 84);
        g.destroy();
    },

    createBounceMushroom(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xF5DEB3);
        g.fillRoundedRect(20, 40, 80, 20, 4);
        g.fillStyle(0xFF6600);
        g.fillEllipse(60, 36, 110, 44);
        g.fillStyle(0xFF9900);
        g.fillEllipse(60, 28, 90, 30);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(35, 32, 7);
        g.fillCircle(60, 28, 6);
        g.fillCircle(80, 33, 5);
        g.generateTexture(key, 120, 64);
        g.destroy();
    },

    createVine(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x228B22);
        for (let y = 0; y < 200; y += 20) {
            g.fillRect(3, y, 6, 16);
            if (y % 40 === 0) {
                g.fillStyle(0x32CD32);
                g.fillEllipse(0, y + 8, 12, 8);
                g.fillEllipse(12, y + 4, 12, 8);
                g.fillStyle(0x228B22);
            }
        }
        g.generateTexture(key, 14, 200);
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

    createRock(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0x808080);
        g.fillEllipse(60, 24, 120, 48);
        g.fillStyle(0xFFFFFF, 0.3);
        g.fillEllipse(50, 18, 70, 28);
        g.fillStyle(0x6699AA);
        g.fillEllipse(75, 14, 30, 12);
        g.generateTexture(key, 120, 48);
        g.destroy();
    },

    createLog(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8B4513);
        g.fillRoundedRect(0, 4, 110, 24, 8);
        g.fillStyle(0xA0522D);
        g.fillRoundedRect(2, 6, 106, 10, 4);
        g.fillStyle(0xDEB887);
        g.fillRect(0, 12, 110, 4);
        g.generateTexture(key, 110, 32);
        g.destroy();
    },

    createWaterfall(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        for (let i = 0; i < 5; i++) {
            const alpha = 0.4 + i * 0.1;
            g.fillStyle(0x4FC3F7, alpha);
            g.fillRect(i * 8, 0, 6, 200);
        }
        g.fillStyle(0x81D4FA, 0.6);
        g.fillRect(0, 0, 40, 8);
        g.generateTexture(key, 40, 200);
        g.destroy();
    },

    createCrystal(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0x00BFFF);
        g.fillTriangle(16, 0, 0, 30, 32, 30);
        g.fillStyle(0xFFFFFF, 0.4);
        g.fillTriangle(16, 4, 6, 26, 26, 26);
        g.fillStyle(0xFFFFFF, 0.7);
        g.fillTriangle(14, 8, 8, 20, 18, 16);
        g.fillStyle(color || 0x00BFFF);
        g.fillTriangle(16, 48, 0, 18, 32, 18);
        g.generateTexture(key, 32, 50);
        g.destroy();
    },

    createDonut(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xC8860A);
        g.fillCircle(24, 24, 22);
        g.fillStyle(0xFF69B4);
        g.fillCircle(24, 24, 18);
        g.fillStyle(0xFF1493);
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            g.fillCircle(24 + Math.cos(a) * 12, 24 + Math.sin(a) * 8, 3);
        }
        g.fillStyle(0xFFFFFF);
        g.fillCircle(18, 18, 2);
        g.fillCircle(28, 14, 2);
        g.fillStyle(0x1A0A00);
        g.fillCircle(24, 24, 8);
        g.generateTexture(key, 48, 48);
        g.destroy();
    },

    createLollipop(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xCC4400);
        g.fillRect(20, 36, 4, 40);
        g.fillStyle(0xFF4444);
        g.fillCircle(22, 24, 20);
        g.fillStyle(0xFFFF00);
        g.fillCircle(22, 24, 14);
        g.fillStyle(0xFF4444);
        g.fillCircle(22, 24, 8);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(16, 18, 4);
        g.generateTexture(key, 44, 76);
        g.destroy();
    },

    createMarshmallow(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFB6C1);
        g.fillRoundedRect(0, 6, 130, 26, 10);
        g.fillStyle(0xFFCCDD);
        g.fillRoundedRect(4, 8, 122, 14, 8);
        g.fillStyle(0xFF99AA);
        g.fillRoundedRect(0, 20, 130, 8, 4);
        g.generateTexture(key, 130, 32);
        g.destroy();
    },

    createChocolateGround(scene, key, width) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const w = width || 800;
        g.fillStyle(0x5C3317);
        g.fillRect(0, 0, w, 40);
        g.fillStyle(0x8B4513);
        g.fillRect(0, 0, w, 10);
        g.fillStyle(0x7B3A10);
        for (let x = 0; x < w; x += 60) {
            g.fillRect(x, 10, 56, 6);
        }
        g.generateTexture(key, w, 40);
        g.destroy();
    },

    createRobotEnemy(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x777788);
        g.fillRect(6, 0, 28, 20);
        g.fillStyle(0x4444AA);
        g.fillRect(10, 4, 8, 8);
        g.fillRect(22, 4, 8, 8);
        g.fillStyle(0xFF4444);
        g.fillRect(13, 6, 4, 4);
        g.fillRect(25, 6, 4, 4);
        g.fillStyle(0x888899);
        g.fillRect(4, 20, 32, 24);
        g.fillStyle(0x4444AA);
        g.fillRect(8, 24, 10, 6);
        g.fillRect(22, 24, 10, 6);
        g.fillStyle(0x777788);
        g.fillRect(0, 22, 8, 6);
        g.fillRect(32, 22, 8, 6);
        g.fillRect(8, 44, 10, 12);
        g.fillRect(22, 44, 10, 12);
        g.fillStyle(0x333344);
        g.fillRect(8, 52, 10, 6);
        g.fillRect(22, 52, 10, 6);
        g.generateTexture(key, 40, 58);
        g.destroy();
    },

    createFrogEnemy(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x228B22);
        g.fillEllipse(24, 28, 42, 32);
        g.fillStyle(0x32CD32);
        g.fillEllipse(24, 24, 36, 26);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(14, 16, 8);
        g.fillCircle(34, 16, 8);
        g.fillStyle(0x000000);
        g.fillCircle(14, 16, 5);
        g.fillCircle(34, 16, 5);
        g.fillStyle(0x55EE55);
        g.fillCircle(14, 16, 2);
        g.fillCircle(34, 16, 2);
        g.fillStyle(0xFF8888);
        g.fillEllipse(24, 34, 20, 8);
        g.fillStyle(0x228B22);
        g.fillEllipse(8, 42, 18, 10);
        g.fillEllipse(40, 42, 18, 10);
        g.generateTexture(key, 48, 52);
        g.destroy();
    },

    createBeeEnemy(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFD700);
        g.fillEllipse(24, 24, 34, 26);
        g.fillStyle(0x333300);
        g.fillRect(10, 20, 28, 5);
        g.fillRect(10, 28, 28, 5);
        g.fillStyle(0xFFD700);
        g.fillCircle(24, 14, 10);
        g.fillStyle(0x000000);
        g.fillCircle(20, 12, 2);
        g.fillCircle(28, 12, 2);
        g.fillStyle(0xADDEFF, 0.7);
        g.fillEllipse(10, 16, 18, 10);
        g.fillEllipse(38, 16, 18, 10);
        g.fillStyle(0xFF6600);
        g.fillRect(22, 34, 4, 8);
        g.generateTexture(key, 48, 42);
        g.destroy();
    },

    createFishEnemy(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFF6600);
        g.fillEllipse(28, 20, 48, 28);
        g.fillStyle(0xFF4400);
        g.fillTriangle(52, 20, 68, 8, 68, 32);
        g.fillStyle(0xFFAA00);
        g.fillEllipse(22, 16, 20, 14);
        g.fillStyle(0xFFFFFF);
        g.fillCircle(16, 16, 6);
        g.fillStyle(0x000000);
        g.fillCircle(16, 16, 3);
        g.fillStyle(0xFF6600);
        g.fillEllipse(35, 10, 14, 6);
        g.generateTexture(key, 70, 40);
        g.destroy();
    },

    createPowerUpShoe(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFF4400);
        g.fillRoundedRect(0, 14, 44, 20, 6);
        g.fillStyle(0xFF6622);
        g.fillRoundedRect(2, 6, 32, 16, 6);
        g.fillStyle(0xFFFFFF);
        g.fillRect(6, 18, 4, 4);
        g.fillRect(14, 18, 4, 4);
        g.fillRect(22, 18, 4, 4);
        g.fillStyle(0xFFD700);
        g.fillStar = undefined;
        g.fillCircle(38, 10, 6);
        g.fillStyle(0xFFFF00);
        g.fillCircle(38, 10, 4);
        g.generateTexture(key, 48, 36);
        g.destroy();
    },

    createPowerUpHelmet(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x4169E1);
        g.fillEllipse(24, 20, 44, 36);
        g.fillStyle(0x6495ED);
        g.fillEllipse(22, 16, 34, 22);
        g.fillStyle(0xFFD700);
        g.fillRect(2, 26, 44, 8);
        g.fillStyle(0x87CEEB);
        g.fillRect(10, 18, 16, 10);
        g.fillStyle(0x4169E1);
        g.fillRect(14, 16, 8, 12);
        g.generateTexture(key, 48, 40);
        g.destroy();
    },

    createCollectible(scene, key, color) {
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

    createParticle(scene, key, color) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(color || 0xFFD700);
        g.fillCircle(4, 4, 4);
        g.generateTexture(key, 8, 8);
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

    createCheckpoint(scene, key) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xFFD700);
        g.fillRect(8, 0, 6, 100);
        g.fillStyle(0xFF4444);
        g.fillRect(14, 4, 30, 20);
        g.fillStyle(0xFFFFFF);
        g.fillRect(16, 6, 26, 16);
        g.fillStyle(0xFF4444);
        const star = [{ x: 29, y: 8 }, { x: 31, y: 14 }, { x: 37, y: 14 }, { x: 32, y: 18 }, { x: 34, y: 24 }, { x: 29, y: 20 }, { x: 24, y: 24 }, { x: 26, y: 18 }, { x: 21, y: 14 }, { x: 27, y: 14 }];
        g.fillPoints(star, true);
        g.generateTexture(key, 44, 100);
        g.destroy();
    }
};
