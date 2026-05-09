class Escola_5 extends BaseGameScene {
    constructor() {
        super('Escola_5', { worldId: 'escola', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 233, 122, 22, 0x795548);
        lb.addPlatform(574, 296, 164, 22, 0x6d4c41);
        lb.addPlatform(942, 219, 143, 22, 0x5d4037);
        lb.addPlatform(1132, 292, 163, 22, 0x795548);
        lb.addPlatform(1588, 212, 142, 22, 0x8d6e63);
        lb.addPlatform(1720, 283, 127, 22, 0x795548);
        lb.addPlatform(2290, 273, 158, 22, 0x6d4c41);
        lb.addPlatform(2247, 231, 115, 22, 0x5d4037);
        lb.addPlatform(2576, 283, 137, 22, 0x795548);
        lb.addPlatform(3088, 213, 149, 22, 0x8d6e63);
        lb.addPlatform(3160, 257, 143, 22, 0x795548);
        lb.addPlatform(3536, 300, 155, 22, 0x6d4c41);
        lb.addPlatform(4252, 254, 110, 22, 0x5d4037);
        lb.addPlatform(4323, 271, 156, 22, 0x795548);
        lb.addPlatform(4984, 202, 158, 22, 0x8d6e63);
        lb.addPlatform(4975, 302, 128, 22, 0x795548);
        lb.addPlatform(5432, 282, 125, 22, 0x6d4c41);
        lb.addPlatform(5941, 265, 111, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(596, 189);
        lb.addStar(1596, 210);
        lb.addStar(2588, 184);

        lb.addEnemy(473, 340, 'robot', 154);
        lb.addEnemy(974, 340, 'ghost', 103);
        lb.addEnemy(1587, 340, 'robot', 107);
        lb.addEnemy(2083, 340, 'ghost', 112);
        lb.addEnemy(2716, 340, 'robot', 172);

        lb.addHazard(533, h-80, 64, 20, 'spike');
        lb.addHazard(1178, h-80, 64, 20, 'lava');
        lb.addHazard(1749, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(387, 310, 'bush', 0.9);
        lb.addDecoration(694, 310, 'rock', 0.9);
        lb.addDecoration(1001, 310, 'flower', 1.0);
        lb.addDecoration(1308, 310, 'mushroom', 0.9);
        lb.addDecoration(1615, 310, 'tree', 0.9);
        lb.addDecoration(1922, 310, 'bush', 0.9);
        lb.addDecoration(2229, 310, 'rock', 1.0);
        lb.addDecoration(2536, 310, 'flower', 1.0);
        lb.addDecoration(2843, 310, 'mushroom', 0.9);
        lb.addDecoration(3150, 310, 'tree', 0.8);
        lb.addDecoration(3457, 310, 'bush', 1.1);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'professora', { name: 'Professora', lines: ['Muito bem, Miguel! Continue aprendendo!', 'A educação é o maior tesouro!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
