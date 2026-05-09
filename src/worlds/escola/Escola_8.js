class Escola_8 extends BaseGameScene {
    constructor() {
        super('Escola_8', { worldId: 'escola', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 231, 126, 22, 0x795548);
        lb.addPlatform(569, 274, 120, 22, 0x6d4c41);
        lb.addPlatform(890, 216, 111, 22, 0x5d4037);
        lb.addPlatform(1216, 260, 151, 22, 0x795548);
        lb.addPlatform(1600, 235, 148, 22, 0x8d6e63);
        lb.addPlatform(1920, 321, 163, 22, 0x795548);
        lb.addPlatform(2284, 265, 152, 22, 0x6d4c41);
        lb.addPlatform(2443, 266, 164, 22, 0x5d4037);
        lb.addPlatform(2752, 269, 161, 22, 0x795548);
        lb.addPlatform(2908, 207, 142, 22, 0x8d6e63);
        lb.addPlatform(3370, 248, 120, 22, 0x795548);
        lb.addPlatform(3470, 317, 168, 22, 0x6d4c41);
        lb.addPlatform(4036, 238, 130, 22, 0x5d4037);
        lb.addPlatform(4310, 297, 132, 22, 0x795548);
        lb.addPlatform(4830, 239, 148, 22, 0x8d6e63);
        lb.addPlatform(4930, 284, 115, 22, 0x795548);
        lb.addPlatform(4952, 275, 144, 22, 0x6d4c41);
        lb.addPlatform(5057, 233, 169, 22, 0x5d4037);
        lb.addPlatform(5788, 279, 115, 22, 0x795548);
        lb.addPlatform(6740, 198, 167, 22, 0x8d6e63);
        lb.addPlatform(6260, 230, 149, 22, 0x795548);
        lb.addPlatform(7294, 309, 146, 22, 0x6d4c41);
        lb.addPlatform(6660, 216, 112, 22, 0x5d4037);
        lb.addPlatform(7778, 278, 146, 22, 0x795548);

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

        lb.addStar(634, 195);
        lb.addStar(1725, 176);
        lb.addStar(2885, 195);

        lb.addEnemy(418, 340, 'robot', 103);
        lb.addEnemy(1003, 340, 'ghost', 148);
        lb.addEnemy(1568, 340, 'robot', 135);
        lb.addEnemy(2144, 340, 'ghost', 148);
        lb.addEnemy(2674, 340, 'robot', 104);
        lb.addEnemy(3201, 340, 'ghost', 114);
        lb.addEnemy(3790, 340, 'robot', 178);

        lb.addHazard(554, h-80, 64, 20, 'spike');
        lb.addHazard(1132, h-80, 64, 20, 'lava');
        lb.addHazard(1753, h-80, 64, 20, 'spike');
        lb.addHazard(2333, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(433, 310, 'bush', 0.8);
        lb.addDecoration(786, 310, 'rock', 1.0);
        lb.addDecoration(1139, 310, 'flower', 1.1);
        lb.addDecoration(1492, 310, 'mushroom', 0.9);
        lb.addDecoration(1845, 310, 'tree', 1.1);
        lb.addDecoration(2198, 310, 'bush', 1.1);
        lb.addDecoration(2551, 310, 'rock', 1.1);
        lb.addDecoration(2904, 310, 'flower', 1.1);
        lb.addDecoration(3257, 310, 'mushroom', 1.0);
        lb.addDecoration(3610, 310, 'tree', 1.1);
        lb.addDecoration(3963, 310, 'bush', 0.9);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0xfce4ec, 0xfce4ec, 0xfff9f9, 0xfff9f9, 1);
        bg.fillRect(0, 0, LW, h);
        bg.fillStyle(0xffe0b2,1); bg.fillRect(200,h-200,300,150);
        bg.fillStyle(0xff7043,1); bg.fillRect(190,h-220,320,30);
        bg.fillStyle(0x1565c0,1);
        for(var wx=0;wx<5;wx++){ for(var wy=0;wy<3;wy++){ bg.fillRect(220+wx*55,h-195+wy*45,35,30); } }
        bg.fillStyle(0x8d6e63,1); bg.fillRect(330,h-140,40,60);
        bg.fillStyle(0x888888,1); bg.fillRect(560,h-200,6,150);
        bg.fillStyle(0x4caf50,1); bg.fillTriangle(566,h-200,566,h-160,606,h-180);
        bg.fillStyle(0xe57373,1); bg.fillRect(700,h-100,10,60); bg.fillRect(760,h-100,10,60);
        bg.fillRect(700,h-100,70,8);
        bg.fillStyle(0x1565c0,1); bg.fillRect(712,h-92,6,50); bg.fillRect(748,h-92,6,50);
        bg.fillStyle(0xffffff,0.7);
        for(var i=0;i<LW;i+=260){ bg.fillRoundedRect(i+40,h-350,80,30,8); bg.fillRoundedRect(i+55,h-365,50,20,6); }

        bg.fillStyle(0x795548, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x4caf50, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
