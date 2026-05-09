class Escola_1 extends BaseGameScene {
    constructor() {
        super('Escola_1', { worldId: 'escola', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 280, 162, 22, 0x795548);
        lb.addPlatform(614, 320, 168, 22, 0x6d4c41);
        lb.addPlatform(882, 223, 155, 22, 0x5d4037);
        lb.addPlatform(1147, 292, 131, 22, 0x795548);
        lb.addPlatform(1636, 219, 139, 22, 0x8d6e63);
        lb.addPlatform(1845, 286, 150, 22, 0x795548);
        lb.addPlatform(2278, 246, 143, 22, 0x6d4c41);
        lb.addPlatform(2597, 236, 131, 22, 0x5d4037);
        lb.addPlatform(2800, 262, 135, 22, 0x795548);
        lb.addPlatform(2917, 228, 156, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(555, 175);
        lb.addStar(1448, 208);
        lb.addStar(2162, 177);

        lb.addEnemy(417, 340, 'robot', 124);
        lb.addEnemy(996, 340, 'ghost', 152);
        lb.addEnemy(1548, 340, 'robot', 112);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(326, 310, 'bush', 0.9);
        lb.addDecoration(572, 310, 'rock', 0.8);
        lb.addDecoration(818, 310, 'flower', 1.0);
        lb.addDecoration(1064, 310, 'mushroom', 0.9);
        lb.addDecoration(1310, 310, 'tree', 0.9);
        lb.addDecoration(1556, 310, 'bush', 0.9);
        lb.addDecoration(1802, 310, 'rock', 1.0);
        lb.addDecoration(2048, 310, 'flower', 0.9);
        lb.addDecoration(2294, 310, 'mushroom', 1.0);
        lb.addDecoration(2540, 310, 'tree', 0.9);
        lb.addDecoration(2786, 310, 'bush', 0.9);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
