class Praia_7 extends BaseGameScene {
    constructor() {
        super('Praia_7', { worldId: 'praia', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 288, 140, 22, 0xf5deb3);
        lb.addPlatform(574, 290, 141, 22, 0x6d4c41);
        lb.addPlatform(926, 236, 114, 22, 0x5d4037);
        lb.addPlatform(1231, 296, 135, 22, 0x795548);
        lb.addPlatform(1440, 230, 138, 22, 0x8d6e63);
        lb.addPlatform(1820, 323, 151, 22, 0xf5deb3);
        lb.addPlatform(1972, 239, 146, 22, 0x6d4c41);
        lb.addPlatform(2247, 249, 114, 22, 0x5d4037);
        lb.addPlatform(2560, 271, 148, 22, 0x795548);
        lb.addPlatform(2953, 192, 150, 22, 0x8d6e63);
        lb.addPlatform(3250, 254, 113, 22, 0xf5deb3);
        lb.addPlatform(3382, 302, 115, 22, 0x6d4c41);
        lb.addPlatform(3856, 235, 141, 22, 0x5d4037);
        lb.addPlatform(4466, 270, 139, 22, 0x795548);
        lb.addPlatform(4886, 206, 124, 22, 0x8d6e63);
        lb.addPlatform(4870, 302, 164, 22, 0xf5deb3);
        lb.addPlatform(5384, 278, 131, 22, 0x6d4c41);
        lb.addPlatform(5601, 214, 129, 22, 0x5d4037);
        lb.addPlatform(5626, 297, 134, 22, 0x795548);
        lb.addPlatform(6721, 225, 164, 22, 0x8d6e63);
        lb.addPlatform(6080, 287, 132, 22, 0xf5deb3);
        lb.addPlatform(6307, 303, 124, 22, 0x6d4c41);

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

        lb.addStar(551, 194);
        lb.addStar(1744, 193);
        lb.addStar(2809, 184);

        lb.addEnemy(414, 340, 'crab', 128);
        lb.addEnemy(998, 340, 'fish', 172);
        lb.addEnemy(1583, 340, 'crab', 119);
        lb.addEnemy(2133, 340, 'fish', 172);
        lb.addEnemy(2677, 340, 'crab', 150);
        lb.addEnemy(3265, 340, 'fish', 100);

        lb.addHazard(522, h-80, 64, 20, 'water');
        lb.addHazard(1128, h-80, 64, 20, 'spike');
        lb.addHazard(1755, h-80, 64, 20, 'water');
        lb.addHazard(2335, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(418, 310, 'bush', 0.9);
        lb.addDecoration(756, 310, 'rock', 0.9);
        lb.addDecoration(1094, 310, 'flower', 0.9);
        lb.addDecoration(1432, 310, 'mushroom', 1.0);
        lb.addDecoration(1770, 310, 'tree', 1.0);
        lb.addDecoration(2108, 310, 'bush', 1.0);
        lb.addDecoration(2446, 310, 'rock', 0.8);
        lb.addDecoration(2784, 310, 'flower', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 1.1);
        lb.addDecoration(3460, 310, 'tree', 1.1);
        lb.addDecoration(3798, 310, 'bush', 0.8);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
