class Praia_9 extends BaseGameScene {
    constructor() {
        super('Praia_9', { worldId: 'praia', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 243, 130, 22, 0xf5deb3);
        lb.addPlatform(599, 316, 155, 22, 0x6d4c41);
        lb.addPlatform(840, 220, 166, 22, 0x5d4037);
        lb.addPlatform(1231, 261, 167, 22, 0x795548);
        lb.addPlatform(1484, 229, 154, 22, 0x8d6e63);
        lb.addPlatform(1800, 276, 152, 22, 0xf5deb3);
        lb.addPlatform(2098, 252, 117, 22, 0x6d4c41);
        lb.addPlatform(2506, 269, 148, 22, 0x5d4037);
        lb.addPlatform(2720, 261, 132, 22, 0x795548);
        lb.addPlatform(3232, 203, 154, 22, 0x8d6e63);
        lb.addPlatform(3100, 282, 157, 22, 0xf5deb3);
        lb.addPlatform(3426, 315, 120, 22, 0x6d4c41);
        lb.addPlatform(3748, 251, 157, 22, 0x5d4037);
        lb.addPlatform(4232, 268, 141, 22, 0x795548);
        lb.addPlatform(4494, 190, 134, 22, 0x8d6e63);
        lb.addPlatform(4630, 280, 139, 22, 0xf5deb3);
        lb.addPlatform(5064, 248, 160, 22, 0x6d4c41);
        lb.addPlatform(5516, 267, 120, 22, 0x5d4037);
        lb.addPlatform(5860, 279, 152, 22, 0x795548);
        lb.addPlatform(5866, 237, 151, 22, 0x8d6e63);
        lb.addPlatform(6680, 251, 138, 22, 0xf5deb3);
        lb.addPlatform(6664, 312, 124, 22, 0x6d4c41);
        lb.addPlatform(7342, 259, 164, 22, 0x5d4037);
        lb.addPlatform(7732, 274, 110, 22, 0x795548);
        lb.addPlatform(8080, 206, 118, 22, 0x8d6e63);
        lb.addPlatform(7530, 280, 117, 22, 0xf5deb3);

        lb.addCoin(80, 330);
        lb.addCoin(380, 330);
        lb.addCoin(680, 330);
        lb.addCoin(980, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1580, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2180, 330);
        lb.addCoin(2480, 330);
        lb.addCoin(2780, 330);
        lb.addCoin(3080, 330);
        lb.addCoin(3380, 330);
        lb.addCoin(3680, 330);
        lb.addCoin(3980, 330);
        lb.addCoin(4280, 330);

        lb.addStar(577, 198);
        lb.addStar(1843, 182);
        lb.addStar(3047, 206);

        lb.addEnemy(410, 340, 'crab', 105);
        lb.addEnemy(967, 340, 'fish', 117);
        lb.addEnemy(1556, 340, 'crab', 158);
        lb.addEnemy(2160, 340, 'fish', 105);
        lb.addEnemy(2657, 340, 'crab', 144);
        lb.addEnemy(3201, 340, 'fish', 140);
        lb.addEnemy(3838, 340, 'crab', 117);

        lb.addHazard(598, h-80, 64, 20, 'water');
        lb.addHazard(1115, h-80, 64, 20, 'spike');
        lb.addHazard(1775, h-80, 64, 20, 'water');
        lb.addHazard(2332, h-80, 64, 20, 'spike');
        lb.addHazard(2926, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(449, 310, 'bush', 0.8);
        lb.addDecoration(818, 310, 'rock', 0.9);
        lb.addDecoration(1187, 310, 'flower', 0.9);
        lb.addDecoration(1556, 310, 'mushroom', 1.1);
        lb.addDecoration(1925, 310, 'tree', 0.8);
        lb.addDecoration(2294, 310, 'bush', 1.0);
        lb.addDecoration(2663, 310, 'rock', 1.0);
        lb.addDecoration(3032, 310, 'flower', 0.9);
        lb.addDecoration(3401, 310, 'mushroom', 0.9);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 0.9);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
