class Praia_4 extends BaseGameScene {
    constructor() {
        super('Praia_4', { worldId: 'praia', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 241, 165, 22, 0xf5deb3);
        lb.addPlatform(581, 307, 120, 22, 0x6d4c41);
        lb.addPlatform(878, 246, 127, 22, 0x5d4037);
        lb.addPlatform(1126, 261, 163, 22, 0x795548);
        lb.addPlatform(1480, 191, 146, 22, 0x8d6e63);
        lb.addPlatform(1970, 323, 145, 22, 0xf5deb3);
        lb.addPlatform(2278, 267, 145, 22, 0x6d4c41);
        lb.addPlatform(2345, 259, 139, 22, 0x5d4037);
        lb.addPlatform(2984, 273, 159, 22, 0x795548);
        lb.addPlatform(3169, 227, 138, 22, 0x8d6e63);
        lb.addPlatform(3240, 284, 117, 22, 0xf5deb3);
        lb.addPlatform(3525, 302, 156, 22, 0x6d4c41);
        lb.addPlatform(3964, 261, 156, 22, 0x5d4037);
        lb.addPlatform(4310, 290, 152, 22, 0x795548);
        lb.addPlatform(4858, 237, 134, 22, 0x8d6e63);
        lb.addPlatform(5290, 312, 157, 22, 0xf5deb3);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(619, 183);
        lb.addStar(1585, 180);
        lb.addStar(2532, 170);

        lb.addEnemy(411, 340, 'crab', 113);
        lb.addEnemy(1010, 340, 'fish', 170);
        lb.addEnemy(1539, 340, 'crab', 168);
        lb.addEnemy(2089, 340, 'fish', 160);
        lb.addEnemy(2706, 340, 'crab', 140);

        lb.addHazard(522, h-80, 64, 20, 'water');
        lb.addHazard(1142, h-80, 64, 20, 'spike');
        lb.addHazard(1715, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(372, 310, 'bush', 1.1);
        lb.addDecoration(664, 310, 'rock', 1.1);
        lb.addDecoration(956, 310, 'flower', 1.1);
        lb.addDecoration(1248, 310, 'mushroom', 0.9);
        lb.addDecoration(1540, 310, 'tree', 0.9);
        lb.addDecoration(1832, 310, 'bush', 0.8);
        lb.addDecoration(2124, 310, 'rock', 0.9);
        lb.addDecoration(2416, 310, 'flower', 1.0);
        lb.addDecoration(2708, 310, 'mushroom', 0.8);
        lb.addDecoration(3000, 310, 'tree', 1.1);
        lb.addDecoration(3292, 310, 'bush', 1.1);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
