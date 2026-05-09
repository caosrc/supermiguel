class Praia_6 extends BaseGameScene {
    constructor() {
        super('Praia_6', { worldId: 'praia', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 265, 127, 22, 0xf5deb3);
        lb.addPlatform(591, 306, 151, 22, 0x6d4c41);
        lb.addPlatform(946, 227, 131, 22, 0x5d4037);
        lb.addPlatform(1252, 257, 114, 22, 0x795548);
        lb.addPlatform(1560, 198, 142, 22, 0x8d6e63);
        lb.addPlatform(1700, 319, 163, 22, 0xf5deb3);
        lb.addPlatform(1990, 244, 142, 22, 0x6d4c41);
        lb.addPlatform(2310, 216, 115, 22, 0x5d4037);
        lb.addPlatform(2784, 290, 157, 22, 0x795548);
        lb.addPlatform(3214, 199, 138, 22, 0x8d6e63);
        lb.addPlatform(3210, 241, 147, 22, 0xf5deb3);
        lb.addPlatform(3536, 322, 143, 22, 0x6d4c41);
        lb.addPlatform(3712, 227, 128, 22, 0x5d4037);
        lb.addPlatform(4336, 303, 111, 22, 0x795548);
        lb.addPlatform(4522, 201, 167, 22, 0x8d6e63);
        lb.addPlatform(4675, 314, 156, 22, 0xf5deb3);
        lb.addPlatform(4760, 256, 124, 22, 0x6d4c41);
        lb.addPlatform(5414, 213, 159, 22, 0x5d4037);
        lb.addPlatform(5374, 257, 118, 22, 0x795548);
        lb.addPlatform(5771, 236, 125, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(403, 330);
        lb.addCoin(726, 330);
        lb.addCoin(1049, 330);
        lb.addCoin(1372, 330);
        lb.addCoin(1695, 330);
        lb.addCoin(2018, 330);
        lb.addCoin(2341, 330);
        lb.addCoin(2664, 330);
        lb.addCoin(2987, 330);
        lb.addCoin(3310, 330);
        lb.addCoin(3633, 330);

        lb.addStar(650, 197);
        lb.addStar(1670, 182);
        lb.addStar(2680, 180);

        lb.addEnemy(459, 340, 'crab', 162);
        lb.addEnemy(1020, 340, 'fish', 146);
        lb.addEnemy(1573, 340, 'crab', 169);
        lb.addEnemy(2147, 340, 'fish', 102);
        lb.addEnemy(2698, 340, 'crab', 167);
        lb.addEnemy(3206, 340, 'fish', 110);

        lb.addHazard(598, h-80, 64, 20, 'water');
        lb.addHazard(1151, h-80, 64, 20, 'spike');
        lb.addHazard(1700, h-80, 64, 20, 'water');
        lb.addHazard(2352, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 0.9);
        lb.addDecoration(726, 310, 'rock', 1.0);
        lb.addDecoration(1049, 310, 'flower', 1.0);
        lb.addDecoration(1372, 310, 'mushroom', 0.9);
        lb.addDecoration(1695, 310, 'tree', 1.0);
        lb.addDecoration(2018, 310, 'bush', 0.9);
        lb.addDecoration(2341, 310, 'rock', 1.1);
        lb.addDecoration(2664, 310, 'flower', 0.8);
        lb.addDecoration(2987, 310, 'mushroom', 0.9);
        lb.addDecoration(3310, 310, 'tree', 1.0);
        lb.addDecoration(3633, 310, 'bush', 0.9);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
