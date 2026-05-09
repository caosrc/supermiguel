class Praia_2 extends BaseGameScene {
    constructor() {
        super('Praia_2', { worldId: 'praia', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 235, 160, 22, 0xf5deb3);
        lb.addPlatform(604, 325, 162, 22, 0x6d4c41);
        lb.addPlatform(902, 217, 129, 22, 0x5d4037);
        lb.addPlatform(1165, 302, 129, 22, 0x795548);
        lb.addPlatform(1600, 206, 111, 22, 0x8d6e63);
        lb.addPlatform(1820, 304, 126, 22, 0xf5deb3);
        lb.addPlatform(2014, 264, 160, 22, 0x6d4c41);
        lb.addPlatform(2492, 213, 123, 22, 0x5d4037);
        lb.addPlatform(2736, 273, 114, 22, 0x795548);
        lb.addPlatform(3151, 191, 116, 22, 0x8d6e63);
        lb.addPlatform(3150, 289, 118, 22, 0xf5deb3);
        lb.addPlatform(3712, 304, 131, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(576, 187);
        lb.addStar(1419, 209);
        lb.addStar(2278, 184);

        lb.addEnemy(426, 340, 'crab', 120);
        lb.addEnemy(1022, 340, 'fish', 164);
        lb.addEnemy(1577, 340, 'crab', 110);
        lb.addEnemy(2136, 340, 'fish', 151);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(341, 310, 'bush', 0.8);
        lb.addDecoration(602, 310, 'rock', 1.0);
        lb.addDecoration(863, 310, 'flower', 0.9);
        lb.addDecoration(1124, 310, 'mushroom', 0.9);
        lb.addDecoration(1385, 310, 'tree', 1.1);
        lb.addDecoration(1646, 310, 'bush', 0.8);
        lb.addDecoration(1907, 310, 'rock', 0.9);
        lb.addDecoration(2168, 310, 'flower', 0.9);
        lb.addDecoration(2429, 310, 'mushroom', 1.0);
        lb.addDecoration(2690, 310, 'tree', 0.9);
        lb.addDecoration(2951, 310, 'bush', 0.8);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
