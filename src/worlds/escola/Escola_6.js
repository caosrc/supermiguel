class Escola_6 extends BaseGameScene {
    constructor() {
        super('Escola_6', { worldId: 'escola', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 231, 168, 22, 0x795548);
        lb.addPlatform(577, 314, 120, 22, 0x6d4c41);
        lb.addPlatform(902, 270, 150, 22, 0x5d4037);
        lb.addPlatform(1231, 290, 135, 22, 0x795548);
        lb.addPlatform(1432, 217, 168, 22, 0x8d6e63);
        lb.addPlatform(1755, 286, 162, 22, 0x795548);
        lb.addPlatform(2296, 245, 144, 22, 0x6d4c41);
        lb.addPlatform(2247, 210, 155, 22, 0x5d4037);
        lb.addPlatform(2744, 272, 136, 22, 0x795548);
        lb.addPlatform(2890, 241, 126, 22, 0x8d6e63);
        lb.addPlatform(3640, 248, 141, 22, 0x795548);
        lb.addPlatform(3415, 326, 133, 22, 0x6d4c41);
        lb.addPlatform(4324, 257, 168, 22, 0x5d4037);
        lb.addPlatform(3920, 259, 120, 22, 0x795548);
        lb.addPlatform(4760, 250, 132, 22, 0x8d6e63);
        lb.addPlatform(4540, 326, 163, 22, 0x795548);
        lb.addPlatform(5208, 235, 133, 22, 0x6d4c41);
        lb.addPlatform(5448, 252, 163, 22, 0x5d4037);
        lb.addPlatform(6148, 271, 139, 22, 0x795548);
        lb.addPlatform(6569, 199, 129, 22, 0x8d6e63);

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

        lb.addStar(618, 210);
        lb.addStar(1660, 199);
        lb.addStar(2742, 191);

        lb.addEnemy(457, 340, 'robot', 101);
        lb.addEnemy(1004, 340, 'ghost', 139);
        lb.addEnemy(1593, 340, 'robot', 148);
        lb.addEnemy(2144, 340, 'ghost', 169);
        lb.addEnemy(2703, 340, 'robot', 131);
        lb.addEnemy(3244, 340, 'ghost', 140);

        lb.addHazard(581, h-80, 64, 20, 'spike');
        lb.addHazard(1106, h-80, 64, 20, 'lava');
        lb.addHazard(1749, h-80, 64, 20, 'spike');
        lb.addHazard(2356, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 0.9);
        lb.addDecoration(726, 310, 'rock', 1.0);
        lb.addDecoration(1049, 310, 'flower', 1.1);
        lb.addDecoration(1372, 310, 'mushroom', 1.0);
        lb.addDecoration(1695, 310, 'tree', 1.1);
        lb.addDecoration(2018, 310, 'bush', 0.9);
        lb.addDecoration(2341, 310, 'rock', 1.0);
        lb.addDecoration(2664, 310, 'flower', 0.9);
        lb.addDecoration(2987, 310, 'mushroom', 0.8);
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
