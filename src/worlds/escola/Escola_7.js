class Escola_7 extends BaseGameScene {
    constructor() {
        super('Escola_7', { worldId: 'escola', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 247, 138, 22, 0x795548);
        lb.addPlatform(569, 293, 153, 22, 0x6d4c41);
        lb.addPlatform(912, 214, 116, 22, 0x5d4037);
        lb.addPlatform(1144, 265, 112, 22, 0x795548);
        lb.addPlatform(1464, 218, 155, 22, 0x8d6e63);
        lb.addPlatform(1720, 329, 161, 22, 0x795548);
        lb.addPlatform(2218, 238, 112, 22, 0x6d4c41);
        lb.addPlatform(2611, 269, 135, 22, 0x5d4037);
        lb.addPlatform(2880, 291, 113, 22, 0x795548);
        lb.addPlatform(2926, 204, 133, 22, 0x8d6e63);
        lb.addPlatform(3430, 245, 129, 22, 0x795548);
        lb.addPlatform(3866, 328, 148, 22, 0x6d4c41);
        lb.addPlatform(4060, 263, 152, 22, 0x5d4037);
        lb.addPlatform(4700, 291, 160, 22, 0x795548);
        lb.addPlatform(4200, 192, 153, 22, 0x8d6e63);
        lb.addPlatform(5215, 290, 126, 22, 0x795548);
        lb.addPlatform(5016, 239, 117, 22, 0x6d4c41);
        lb.addPlatform(5601, 232, 110, 22, 0x5d4037);
        lb.addPlatform(5716, 264, 165, 22, 0x795548);
        lb.addPlatform(5638, 217, 154, 22, 0x8d6e63);
        lb.addPlatform(7000, 239, 135, 22, 0x795548);
        lb.addPlatform(6349, 294, 118, 22, 0x6d4c41);

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

        lb.addStar(604, 203);
        lb.addStar(1710, 201);
        lb.addStar(2775, 172);

        lb.addEnemy(412, 340, 'robot', 103);
        lb.addEnemy(1025, 340, 'ghost', 179);
        lb.addEnemy(1549, 340, 'robot', 157);
        lb.addEnemy(2080, 340, 'ghost', 125);
        lb.addEnemy(2678, 340, 'robot', 159);
        lb.addEnemy(3260, 340, 'ghost', 139);

        lb.addHazard(595, h-80, 64, 20, 'spike');
        lb.addHazard(1139, h-80, 64, 20, 'lava');
        lb.addHazard(1741, h-80, 64, 20, 'spike');
        lb.addHazard(2315, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(418, 310, 'bush', 1.0);
        lb.addDecoration(756, 310, 'rock', 1.1);
        lb.addDecoration(1094, 310, 'flower', 0.8);
        lb.addDecoration(1432, 310, 'mushroom', 0.8);
        lb.addDecoration(1770, 310, 'tree', 1.0);
        lb.addDecoration(2108, 310, 'bush', 0.8);
        lb.addDecoration(2446, 310, 'rock', 0.9);
        lb.addDecoration(2784, 310, 'flower', 0.8);
        lb.addDecoration(3122, 310, 'mushroom', 0.9);
        lb.addDecoration(3460, 310, 'tree', 0.9);
        lb.addDecoration(3798, 310, 'bush', 0.9);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
