class Praia_5 extends BaseGameScene {
    constructor() {
        super('Praia_5', { worldId: 'praia', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 247, 154, 22, 0xf5deb3);
        lb.addPlatform(618, 299, 165, 22, 0x6d4c41);
        lb.addPlatform(852, 261, 122, 22, 0x5d4037);
        lb.addPlatform(1288, 285, 130, 22, 0x795548);
        lb.addPlatform(1464, 193, 149, 22, 0x8d6e63);
        lb.addPlatform(1720, 281, 134, 22, 0xf5deb3);
        lb.addPlatform(2248, 268, 117, 22, 0x6d4c41);
        lb.addPlatform(2422, 237, 147, 22, 0x5d4037);
        lb.addPlatform(2960, 292, 118, 22, 0x795548);
        lb.addPlatform(2998, 197, 145, 22, 0x8d6e63);
        lb.addPlatform(3360, 287, 150, 22, 0xf5deb3);
        lb.addPlatform(3646, 327, 121, 22, 0x6d4c41);
        lb.addPlatform(4108, 237, 148, 22, 0x5d4037);
        lb.addPlatform(4375, 259, 158, 22, 0x795548);
        lb.addPlatform(4830, 191, 134, 22, 0x8d6e63);
        lb.addPlatform(4870, 279, 151, 22, 0xf5deb3);
        lb.addPlatform(4952, 282, 119, 22, 0x6d4c41);
        lb.addPlatform(5652, 237, 115, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(599, 195);
        lb.addStar(1633, 201);
        lb.addStar(2568, 198);

        lb.addEnemy(411, 340, 'crab', 132);
        lb.addEnemy(1026, 340, 'fish', 130);
        lb.addEnemy(1574, 340, 'crab', 120);
        lb.addEnemy(2087, 340, 'fish', 141);
        lb.addEnemy(2720, 340, 'crab', 172);

        lb.addHazard(550, h-80, 64, 20, 'water');
        lb.addHazard(1131, h-80, 64, 20, 'spike');
        lb.addHazard(1798, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(387, 310, 'bush', 1.0);
        lb.addDecoration(694, 310, 'rock', 1.1);
        lb.addDecoration(1001, 310, 'flower', 1.0);
        lb.addDecoration(1308, 310, 'mushroom', 1.1);
        lb.addDecoration(1615, 310, 'tree', 0.9);
        lb.addDecoration(1922, 310, 'bush', 0.9);
        lb.addDecoration(2229, 310, 'rock', 0.9);
        lb.addDecoration(2536, 310, 'flower', 0.9);
        lb.addDecoration(2843, 310, 'mushroom', 1.0);
        lb.addDecoration(3150, 310, 'tree', 0.9);
        lb.addDecoration(3457, 310, 'bush', 0.8);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
