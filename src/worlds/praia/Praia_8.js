class Praia_8 extends BaseGameScene {
    constructor() {
        super('Praia_8', { worldId: 'praia', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0xf5deb3, 60);

        lb.addPlatform(280, 236, 110, 22, 0xf5deb3);
        lb.addPlatform(607, 276, 151, 22, 0x6d4c41);
        lb.addPlatform(910, 267, 159, 22, 0x5d4037);
        lb.addPlatform(1210, 290, 153, 22, 0x795548);
        lb.addPlatform(1612, 199, 119, 22, 0x8d6e63);
        lb.addPlatform(1765, 281, 141, 22, 0xf5deb3);
        lb.addPlatform(1996, 256, 137, 22, 0x6d4c41);
        lb.addPlatform(2625, 233, 161, 22, 0x5d4037);
        lb.addPlatform(2888, 260, 134, 22, 0x795548);
        lb.addPlatform(3151, 203, 135, 22, 0x8d6e63);
        lb.addPlatform(3550, 283, 145, 22, 0xf5deb3);
        lb.addPlatform(3624, 321, 116, 22, 0x6d4c41);
        lb.addPlatform(3892, 257, 170, 22, 0x5d4037);
        lb.addPlatform(4128, 276, 120, 22, 0x795548);
        lb.addPlatform(4326, 200, 169, 22, 0x8d6e63);
        lb.addPlatform(4780, 303, 116, 22, 0xf5deb3);
        lb.addPlatform(5048, 279, 141, 22, 0x6d4c41);
        lb.addPlatform(5278, 242, 145, 22, 0x5d4037);
        lb.addPlatform(5482, 273, 154, 22, 0x795548);
        lb.addPlatform(6550, 238, 165, 22, 0x8d6e63);
        lb.addPlatform(5980, 245, 160, 22, 0xf5deb3);
        lb.addPlatform(6370, 315, 168, 22, 0x6d4c41);
        lb.addPlatform(7210, 227, 166, 22, 0x5d4037);
        lb.addPlatform(8008, 250, 121, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(386, 330);
        lb.addCoin(692, 330);
        lb.addCoin(998, 330);
        lb.addCoin(1304, 330);
        lb.addCoin(1610, 330);
        lb.addCoin(1916, 330);
        lb.addCoin(2222, 330);
        lb.addCoin(2528, 330);
        lb.addCoin(2834, 330);
        lb.addCoin(3140, 330);
        lb.addCoin(3446, 330);
        lb.addCoin(3752, 330);
        lb.addCoin(4058, 330);

        lb.addStar(570, 207);
        lb.addStar(1718, 188);
        lb.addStar(2920, 195);

        lb.addEnemy(478, 340, 'crab', 126);
        lb.addEnemy(991, 340, 'fish', 153);
        lb.addEnemy(1574, 340, 'crab', 165);
        lb.addEnemy(2146, 340, 'fish', 114);
        lb.addEnemy(2647, 340, 'crab', 111);
        lb.addEnemy(3253, 340, 'fish', 145);
        lb.addEnemy(3796, 340, 'crab', 100);

        lb.addHazard(582, h-80, 64, 20, 'water');
        lb.addHazard(1119, h-80, 64, 20, 'spike');
        lb.addHazard(1754, h-80, 64, 20, 'water');
        lb.addHazard(2399, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(433, 310, 'bush', 1.0);
        lb.addDecoration(786, 310, 'rock', 0.9);
        lb.addDecoration(1139, 310, 'flower', 0.9);
        lb.addDecoration(1492, 310, 'mushroom', 0.9);
        lb.addDecoration(1845, 310, 'tree', 1.0);
        lb.addDecoration(2198, 310, 'bush', 0.8);
        lb.addDecoration(2551, 310, 'rock', 1.1);
        lb.addDecoration(2904, 310, 'flower', 0.9);
        lb.addDecoration(3257, 310, 'mushroom', 0.8);
        lb.addDecoration(3610, 310, 'tree', 0.9);
        lb.addDecoration(3963, 310, 'bush', 0.9);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
