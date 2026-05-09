class Escola_4 extends BaseGameScene {
    constructor() {
        super('Escola_4', { worldId: 'escola', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 248, 161, 22, 0x795548);
        lb.addPlatform(582, 312, 170, 22, 0x6d4c41);
        lb.addPlatform(924, 210, 158, 22, 0x5d4037);
        lb.addPlatform(1234, 289, 111, 22, 0x795548);
        lb.addPlatform(1464, 194, 126, 22, 0x8d6e63);
        lb.addPlatform(1805, 313, 114, 22, 0x795548);
        lb.addPlatform(2056, 247, 114, 22, 0x6d4c41);
        lb.addPlatform(2338, 243, 116, 22, 0x5d4037);
        lb.addPlatform(2888, 301, 153, 22, 0x795548);
        lb.addPlatform(3025, 238, 169, 22, 0x8d6e63);
        lb.addPlatform(3390, 239, 167, 22, 0x795548);
        lb.addPlatform(3481, 276, 165, 22, 0x6d4c41);
        lb.addPlatform(4012, 268, 131, 22, 0x5d4037);
        lb.addPlatform(4323, 259, 124, 22, 0x795548);
        lb.addPlatform(4368, 247, 118, 22, 0x8d6e63);
        lb.addPlatform(5350, 320, 122, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(640, 203);
        lb.addStar(1543, 185);
        lb.addStar(2463, 171);

        lb.addEnemy(446, 340, 'robot', 113);
        lb.addEnemy(1040, 340, 'ghost', 159);
        lb.addEnemy(1570, 340, 'robot', 145);
        lb.addEnemy(2124, 340, 'ghost', 148);
        lb.addEnemy(2642, 340, 'robot', 135);

        lb.addHazard(582, h-80, 64, 20, 'spike');
        lb.addHazard(1184, h-80, 64, 20, 'lava');
        lb.addHazard(1701, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(372, 310, 'bush', 0.8);
        lb.addDecoration(664, 310, 'rock', 0.9);
        lb.addDecoration(956, 310, 'flower', 1.0);
        lb.addDecoration(1248, 310, 'mushroom', 1.1);
        lb.addDecoration(1540, 310, 'tree', 1.0);
        lb.addDecoration(1832, 310, 'bush', 1.0);
        lb.addDecoration(2124, 310, 'rock', 1.0);
        lb.addDecoration(2416, 310, 'flower', 0.9);
        lb.addDecoration(2708, 310, 'mushroom', 1.0);
        lb.addDecoration(3000, 310, 'tree', 1.0);
        lb.addDecoration(3292, 310, 'bush', 0.9);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
