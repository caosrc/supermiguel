class Praia_1 extends BaseGameScene {
    constructor() {
        super('Praia_1', { worldId: 'praia', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 271, 131, 22, 0xf5deb3);
        lb.addPlatform(601, 284, 116, 22, 0x6d4c41);
        lb.addPlatform(942, 241, 143, 22, 0x5d4037);
        lb.addPlatform(1159, 297, 124, 22, 0x795548);
        lb.addPlatform(1432, 210, 134, 22, 0x8d6e63);
        lb.addPlatform(1890, 301, 149, 22, 0xf5deb3);
        lb.addPlatform(2044, 247, 112, 22, 0x6d4c41);
        lb.addPlatform(2513, 233, 151, 22, 0x5d4037);
        lb.addPlatform(2912, 291, 136, 22, 0x795548);
        lb.addPlatform(3133, 200, 141, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(551, 178);
        lb.addStar(1416, 179);
        lb.addStar(2182, 171);

        lb.addEnemy(461, 340, 'crab', 105);
        lb.addEnemy(1029, 340, 'fish', 106);
        lb.addEnemy(1584, 340, 'crab', 174);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(326, 310, 'bush', 1.0);
        lb.addDecoration(572, 310, 'rock', 0.9);
        lb.addDecoration(818, 310, 'flower', 1.1);
        lb.addDecoration(1064, 310, 'mushroom', 0.9);
        lb.addDecoration(1310, 310, 'tree', 1.0);
        lb.addDecoration(1556, 310, 'bush', 0.8);
        lb.addDecoration(1802, 310, 'rock', 0.9);
        lb.addDecoration(2048, 310, 'flower', 0.9);
        lb.addDecoration(2294, 310, 'mushroom', 0.8);
        lb.addDecoration(2540, 310, 'tree', 0.8);
        lb.addDecoration(2786, 310, 'bush', 1.1);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
