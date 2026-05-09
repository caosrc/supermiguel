class Floresta_7 extends BaseGameScene {
    constructor() {
        super('Floresta_7', { worldId: 'floresta', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 255, 154, 22, 0x2e1a0e);
        lb.addPlatform(560, 299, 159, 22, 0x6d4c41);
        lb.addPlatform(900, 223, 162, 22, 0x5d4037);
        lb.addPlatform(1240, 295, 165, 22, 0x795548);
        lb.addPlatform(1472, 209, 122, 22, 0x8d6e63);
        lb.addPlatform(1910, 313, 145, 22, 0x2e1a0e);
        lb.addPlatform(2026, 235, 151, 22, 0x6d4c41);
        lb.addPlatform(2548, 242, 127, 22, 0x5d4037);
        lb.addPlatform(2776, 280, 166, 22, 0x795548);
        lb.addPlatform(3205, 200, 115, 22, 0x8d6e63);
        lb.addPlatform(3460, 245, 125, 22, 0x2e1a0e);
        lb.addPlatform(3910, 286, 117, 22, 0x6d4c41);
        lb.addPlatform(3724, 221, 123, 22, 0x5d4037);
        lb.addPlatform(3946, 258, 111, 22, 0x795548);
        lb.addPlatform(5026, 233, 167, 22, 0x8d6e63);
        lb.addPlatform(5185, 326, 136, 22, 0x2e1a0e);
        lb.addPlatform(5224, 257, 147, 22, 0x6d4c41);
        lb.addPlatform(6060, 233, 111, 22, 0x5d4037);
        lb.addPlatform(6004, 256, 138, 22, 0x795548);
        lb.addPlatform(6284, 248, 114, 22, 0x8d6e63);
        lb.addPlatform(6820, 257, 135, 22, 0x2e1a0e);
        lb.addPlatform(6916, 276, 117, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(552, 196);
        lb.addStar(1717, 170);
        lb.addStar(2764, 199);

        lb.addEnemy(408, 340, 'slime', 121);
        lb.addEnemy(980, 340, 'bee', 116);
        lb.addEnemy(1584, 340, 'slime', 169);
        lb.addEnemy(2110, 340, 'bee', 139);
        lb.addEnemy(2715, 340, 'slime', 149);
        lb.addEnemy(3268, 340, 'bee', 159);

        lb.addHazard(525, h-80, 64, 20, 'spike');
        lb.addHazard(1124, h-80, 64, 20, 'lava');
        lb.addHazard(1761, h-80, 64, 20, 'spike');
        lb.addHazard(2368, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(418, 310, 'bush', 0.8);
        lb.addDecoration(756, 310, 'rock', 0.8);
        lb.addDecoration(1094, 310, 'flower', 0.9);
        lb.addDecoration(1432, 310, 'mushroom', 0.9);
        lb.addDecoration(1770, 310, 'tree', 0.9);
        lb.addDecoration(2108, 310, 'bush', 0.9);
        lb.addDecoration(2446, 310, 'rock', 0.8);
        lb.addDecoration(2784, 310, 'flower', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 1.0);
        lb.addDecoration(3460, 310, 'tree', 0.9);
        lb.addDecoration(3798, 310, 'bush', 0.9);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x0d2a12, 0x0d2a12, 0x1a5a2e, 0x1a5a2e, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=300){
            var th=200+Math.sin(i)*50;
            bg.fillStyle(0x1a3a10,0.7); bg.fillCircle(i+100,h-70-th*0.6,th*0.4);
            bg.fillStyle(0x2d6a20,0.8); bg.fillCircle(i+80,h-70-th*0.7,th*0.35);
            bg.fillStyle(0x3a8a2a,0.9); bg.fillCircle(i+100,h-70-th*0.75,th*0.3);
            bg.fillStyle(0x3d2010,1); bg.fillRect(i+92,h-70-th*0.4,16,th*0.4);
        }
        bg.fillStyle(0xffffff,0.08);
        for(var i=0;i<LW;i+=60){ bg.fillEllipse(i+30,h-65,120,40); }
        bg.fillStyle(0xffff88,0.5);
        for(var i=0;i<LW;i+=180){ bg.fillCircle(i+90,h-120+(i%80),3); }

        bg.fillStyle(0x2e1a0e, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x2d8a3e, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
