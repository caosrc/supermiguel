class Praia_10 extends BaseGameScene {
    constructor() {
        super('Praia_10', { worldId: 'praia', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 248, 140, 22, 0xf5deb3);
        lb.addPlatform(620, 288, 153, 22, 0x6d4c41);
        lb.addPlatform(920, 268, 140, 22, 0x5d4037);
        lb.addPlatform(1291, 310, 147, 22, 0x795548);
        lb.addPlatform(1428, 232, 166, 22, 0x8d6e63);
        lb.addPlatform(1865, 312, 131, 22, 0xf5deb3);
        lb.addPlatform(2104, 238, 165, 22, 0x6d4c41);
        lb.addPlatform(2289, 230, 161, 22, 0x5d4037);
        lb.addPlatform(2896, 305, 154, 22, 0x795548);
        lb.addPlatform(3034, 214, 133, 22, 0x8d6e63);
        lb.addPlatform(3470, 255, 113, 22, 0xf5deb3);
        lb.addPlatform(3822, 303, 120, 22, 0x6d4c41);
        lb.addPlatform(3664, 246, 155, 22, 0x5d4037);
        lb.addPlatform(4375, 252, 158, 22, 0x795548);
        lb.addPlatform(4256, 224, 121, 22, 0x8d6e63);
        lb.addPlatform(5245, 283, 117, 22, 0xf5deb3);
        lb.addPlatform(4840, 287, 125, 22, 0x6d4c41);
        lb.addPlatform(5040, 257, 163, 22, 0x5d4037);
        lb.addPlatform(5392, 296, 143, 22, 0x795548);
        lb.addPlatform(6493, 203, 159, 22, 0x8d6e63);
        lb.addPlatform(6860, 239, 129, 22, 0xf5deb3);
        lb.addPlatform(6727, 292, 140, 22, 0x6d4c41);
        lb.addPlatform(7342, 232, 166, 22, 0x5d4037);
        lb.addPlatform(7019, 309, 126, 22, 0x795548);
        lb.addPlatform(7696, 202, 144, 22, 0x8d6e63);
        lb.addPlatform(7280, 315, 126, 22, 0xf5deb3);
        lb.addPlatform(8704, 284, 147, 22, 0x6d4c41);
        lb.addPlatform(9325, 221, 166, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(374, 330);
        lb.addCoin(668, 330);
        lb.addCoin(962, 330);
        lb.addCoin(1256, 330);
        lb.addCoin(1550, 330);
        lb.addCoin(1844, 330);
        lb.addCoin(2138, 330);
        lb.addCoin(2432, 330);
        lb.addCoin(2726, 330);
        lb.addCoin(3020, 330);
        lb.addCoin(3314, 330);
        lb.addCoin(3608, 330);
        lb.addCoin(3902, 330);
        lb.addCoin(4196, 330);
        lb.addCoin(4490, 330);

        lb.addStar(650, 197);
        lb.addStar(1888, 180);
        lb.addStar(3072, 171);

        lb.addEnemy(459, 340, 'crab', 123);
        lb.addEnemy(972, 340, 'fish', 122);
        lb.addEnemy(1551, 340, 'crab', 180);
        lb.addEnemy(2140, 340, 'fish', 127);
        lb.addEnemy(2658, 340, 'crab', 134);
        lb.addEnemy(3225, 340, 'fish', 116);
        lb.addEnemy(3806, 340, 'crab', 158);
        lb.addEnemy(4378, 340, 'fish', 161);

        lb.addHazard(578, h-80, 64, 20, 'water');
        lb.addHazard(1178, h-80, 64, 20, 'spike');
        lb.addHazard(1716, h-80, 64, 20, 'water');
        lb.addHazard(2349, h-80, 64, 20, 'spike');
        lb.addHazard(2923, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(464, 310, 'bush', 1.0);
        lb.addDecoration(848, 310, 'rock', 1.1);
        lb.addDecoration(1232, 310, 'flower', 1.0);
        lb.addDecoration(1616, 310, 'mushroom', 1.1);
        lb.addDecoration(2000, 310, 'tree', 0.9);
        lb.addDecoration(2384, 310, 'bush', 0.9);
        lb.addDecoration(2768, 310, 'rock', 1.0);
        lb.addDecoration(3152, 310, 'flower', 0.9);
        lb.addDecoration(3536, 310, 'mushroom', 1.0);
        lb.addDecoration(3920, 310, 'tree', 1.1);
        lb.addDecoration(4304, 310, 'bush', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x00bfff, 0x00bfff, 0x87ceeb, 0x87ceeb, 1);
        bg.fillRect(0, 0, LW, h);
        bg.fillStyle(0x0288d1,0.6);
        for(var i=0;i<LW;i+=120){ bg.fillEllipse(i+60,h-65,160,30); }
        bg.fillStyle(0x4fc3f7,0.4);
        for(var i=0;i<LW;i+=80){ bg.fillEllipse(i+40,h-70,100,20); }
        for(var i=100;i<LW;i+=380){
            bg.fillStyle(0x8b6914,1);
            for(var py=0;py<120;py+=10){ bg.fillEllipse(i+20+(Math.sin(py*0.3)*5),h-70-py,18,12); }
            bg.fillStyle(0x2d8a3e,1);
            bg.fillEllipse(i+20,h-195,80,30); bg.fillEllipse(i-10,h-185,60,20);
            bg.fillEllipse(i+50,h-185,60,20); bg.fillEllipse(i+20,h-210,60,25);
            bg.fillStyle(0x8b4513,1); bg.fillCircle(i+16,h-190,6); bg.fillCircle(i+24,h-192,5);
        }
        for(var i=180;i<LW;i+=350){
            bg.fillStyle(i%700===180?0xff4081:0xff9800,1);
            bg.fillEllipse(i,h-130,80,24);
            bg.fillStyle(0x555555,1); bg.fillRect(i-2,h-130,4,70);
        }

        bg.fillStyle(0xf5deb3, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0xf0c060, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
