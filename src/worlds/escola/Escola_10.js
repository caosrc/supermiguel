class Escola_10 extends BaseGameScene {
    constructor() {
        super('Escola_10', { worldId: 'escola', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 262, 141, 22, 0x795548);
        lb.addPlatform(583, 316, 141, 22, 0x6d4c41);
        lb.addPlatform(846, 264, 142, 22, 0x5d4037);
        lb.addPlatform(1225, 251, 111, 22, 0x795548);
        lb.addPlatform(1592, 202, 148, 22, 0x8d6e63);
        lb.addPlatform(1700, 328, 152, 22, 0x795548);
        lb.addPlatform(2014, 268, 165, 22, 0x6d4c41);
        lb.addPlatform(2548, 222, 169, 22, 0x5d4037);
        lb.addPlatform(2848, 293, 126, 22, 0x795548);
        lb.addPlatform(3295, 211, 155, 22, 0x8d6e63);
        lb.addPlatform(3170, 254, 154, 22, 0x795548);
        lb.addPlatform(3547, 322, 150, 22, 0x6d4c41);
        lb.addPlatform(3808, 233, 145, 22, 0x5d4037);
        lb.addPlatform(4037, 263, 113, 22, 0x795548);
        lb.addPlatform(5040, 233, 163, 22, 0x8d6e63);
        lb.addPlatform(4855, 273, 161, 22, 0x795548);
        lb.addPlatform(4968, 274, 149, 22, 0x6d4c41);
        lb.addPlatform(5482, 214, 123, 22, 0x5d4037);
        lb.addPlatform(6238, 271, 153, 22, 0x795548);
        lb.addPlatform(6075, 236, 137, 22, 0x8d6e63);
        lb.addPlatform(5940, 257, 158, 22, 0x795548);
        lb.addPlatform(6517, 293, 135, 22, 0x6d4c41);
        lb.addPlatform(6770, 214, 156, 22, 0x5d4037);
        lb.addPlatform(7571, 288, 132, 22, 0x795548);
        lb.addPlatform(7648, 207, 117, 22, 0x8d6e63);
        lb.addPlatform(7855, 316, 140, 22, 0x795548);
        lb.addPlatform(8236, 232, 148, 22, 0x6d4c41);
        lb.addPlatform(8272, 220, 135, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(374, 330);
        lb.addCoin(668, 330);
        lb.addCoin(962, 330);
        lb.addCoin(1256, 330);
        lb.addCoin(1550, 330);
        lb.addCoin(1844, 330);
        lb.addCoin(2138, 330);
        lb.addCoin(2432, 330);
        lb.addCoin(2726, 330);
        lb.addCoin(3020, 330);
        lb.addCoin(3314, 330);
        lb.addCoin(3608, 330);
        lb.addCoin(3902, 330);
        lb.addCoin(4196, 330);
        lb.addCoin(4490, 330);

        lb.addStar(566, 187);
        lb.addStar(1871, 185);
        lb.addStar(3116, 185);

        lb.addEnemy(451, 340, 'robot', 170);
        lb.addEnemy(969, 340, 'ghost', 151);
        lb.addEnemy(1533, 340, 'robot', 146);
        lb.addEnemy(2149, 340, 'ghost', 161);
        lb.addEnemy(2674, 340, 'robot', 152);
        lb.addEnemy(3222, 340, 'ghost', 109);
        lb.addEnemy(3775, 340, 'robot', 158);
        lb.addEnemy(4328, 340, 'ghost', 156);

        lb.addHazard(536, h-80, 64, 20, 'spike');
        lb.addHazard(1115, h-80, 64, 20, 'lava');
        lb.addHazard(1779, h-80, 64, 20, 'spike');
        lb.addHazard(2341, h-80, 64, 20, 'lava');
        lb.addHazard(2991, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(464, 310, 'bush', 1.0);
        lb.addDecoration(848, 310, 'rock', 0.9);
        lb.addDecoration(1232, 310, 'flower', 0.8);
        lb.addDecoration(1616, 310, 'mushroom', 0.9);
        lb.addDecoration(2000, 310, 'tree', 0.8);
        lb.addDecoration(2384, 310, 'bush', 1.0);
        lb.addDecoration(2768, 310, 'rock', 0.9);
        lb.addDecoration(3152, 310, 'flower', 1.0);
        lb.addDecoration(3536, 310, 'mushroom', 0.8);
        lb.addDecoration(3920, 310, 'tree', 1.0);
        lb.addDecoration(4304, 310, 'bush', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'professora', { name: 'Professora', lines: ['Muito bem, Miguel! Continue aprendendo!', 'A educação é o maior tesouro!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
