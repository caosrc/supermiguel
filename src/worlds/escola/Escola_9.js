class Escola_9 extends BaseGameScene {
    constructor() {
        super('Escola_9', { worldId: 'escola', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 244, 159, 22, 0x795548);
        lb.addPlatform(575, 318, 139, 22, 0x6d4c41);
        lb.addPlatform(878, 261, 155, 22, 0x5d4037);
        lb.addPlatform(1249, 302, 160, 22, 0x795548);
        lb.addPlatform(1476, 225, 170, 22, 0x8d6e63);
        lb.addPlatform(1885, 296, 155, 22, 0x795548);
        lb.addPlatform(2050, 269, 118, 22, 0x6d4c41);
        lb.addPlatform(2485, 246, 124, 22, 0x5d4037);
        lb.addPlatform(2656, 254, 169, 22, 0x795548);
        lb.addPlatform(3295, 249, 139, 22, 0x8d6e63);
        lb.addPlatform(3610, 265, 164, 22, 0x795548);
        lb.addPlatform(3382, 303, 149, 22, 0x6d4c41);
        lb.addPlatform(3988, 241, 156, 22, 0x5d4037);
        lb.addPlatform(4453, 305, 137, 22, 0x795548);
        lb.addPlatform(4830, 238, 129, 22, 0x8d6e63);
        lb.addPlatform(5275, 293, 157, 22, 0x795548);
        lb.addPlatform(5608, 283, 125, 22, 0x6d4c41);
        lb.addPlatform(5516, 238, 139, 22, 0x5d4037);
        lb.addPlatform(6400, 260, 147, 22, 0x795548);
        lb.addPlatform(6075, 240, 149, 22, 0x8d6e63);
        lb.addPlatform(6360, 256, 140, 22, 0x795548);
        lb.addPlatform(7021, 273, 139, 22, 0x6d4c41);
        lb.addPlatform(7650, 216, 126, 22, 0x5d4037);
        lb.addPlatform(7088, 265, 170, 22, 0x795548);
        lb.addPlatform(7936, 245, 156, 22, 0x8d6e63);
        lb.addPlatform(7780, 290, 116, 22, 0x795548);

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

        lb.addStar(633, 187);
        lb.addStar(1845, 198);
        lb.addStar(3021, 184);

        lb.addEnemy(409, 340, 'robot', 158);
        lb.addEnemy(973, 340, 'ghost', 117);
        lb.addEnemy(1528, 340, 'robot', 125);
        lb.addEnemy(2118, 340, 'ghost', 140);
        lb.addEnemy(2684, 340, 'robot', 101);
        lb.addEnemy(3248, 340, 'ghost', 116);
        lb.addEnemy(3827, 340, 'robot', 175);

        lb.addHazard(546, h-80, 64, 20, 'spike');
        lb.addHazard(1114, h-80, 64, 20, 'lava');
        lb.addHazard(1778, h-80, 64, 20, 'spike');
        lb.addHazard(2363, h-80, 64, 20, 'lava');
        lb.addHazard(2903, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(449, 310, 'bush', 1.0);
        lb.addDecoration(818, 310, 'rock', 1.0);
        lb.addDecoration(1187, 310, 'flower', 0.8);
        lb.addDecoration(1556, 310, 'mushroom', 0.9);
        lb.addDecoration(1925, 310, 'tree', 0.9);
        lb.addDecoration(2294, 310, 'bush', 1.0);
        lb.addDecoration(2663, 310, 'rock', 1.1);
        lb.addDecoration(3032, 310, 'flower', 1.0);
        lb.addDecoration(3401, 310, 'mushroom', 1.0);
        lb.addDecoration(3770, 310, 'tree', 0.8);
        lb.addDecoration(4139, 310, 'bush', 1.0);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
