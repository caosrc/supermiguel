class Praia_3 extends BaseGameScene {
    constructor() {
        super('Praia_3', { worldId: 'praia', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 286, 117, 22, 0xf5deb3);
        lb.addPlatform(588, 326, 158, 22, 0x6d4c41);
        lb.addPlatform(888, 211, 143, 22, 0x5d4037);
        lb.addPlatform(1285, 307, 129, 22, 0x795548);
        lb.addPlatform(1444, 206, 141, 22, 0x8d6e63);
        lb.addPlatform(1860, 328, 161, 22, 0xf5deb3);
        lb.addPlatform(2188, 282, 139, 22, 0x6d4c41);
        lb.addPlatform(2443, 240, 144, 22, 0x5d4037);
        lb.addPlatform(2904, 292, 165, 22, 0x795548);
        lb.addPlatform(3079, 244, 128, 22, 0x8d6e63);
        lb.addPlatform(3570, 269, 155, 22, 0xf5deb3);
        lb.addPlatform(3371, 315, 139, 22, 0x6d4c41);
        lb.addPlatform(4180, 269, 118, 22, 0x5d4037);
        lb.addPlatform(4284, 253, 155, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(626, 200);
        lb.addStar(1520, 178);
        lb.addStar(2382, 171);

        lb.addEnemy(470, 340, 'crab', 143);
        lb.addEnemy(997, 340, 'fish', 175);
        lb.addEnemy(1583, 340, 'crab', 154);
        lb.addEnemy(2094, 340, 'fish', 159);



        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(356, 310, 'bush', 0.9);
        lb.addDecoration(632, 310, 'rock', 0.9);
        lb.addDecoration(908, 310, 'flower', 0.8);
        lb.addDecoration(1184, 310, 'mushroom', 1.1);
        lb.addDecoration(1460, 310, 'tree', 1.0);
        lb.addDecoration(1736, 310, 'bush', 0.9);
        lb.addDecoration(2012, 310, 'rock', 1.0);
        lb.addDecoration(2288, 310, 'flower', 1.0);
        lb.addDecoration(2564, 310, 'mushroom', 0.8);
        lb.addDecoration(2840, 310, 'tree', 1.0);
        lb.addDecoration(3116, 310, 'bush', 1.0);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
