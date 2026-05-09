class Escola_2 extends BaseGameScene {
    constructor() {
        super('Escola_2', { worldId: 'escola', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 251, 129, 22, 0x795548);
        lb.addPlatform(584, 300, 145, 22, 0x6d4c41);
        lb.addPlatform(844, 210, 123, 22, 0x5d4037);
        lb.addPlatform(1240, 291, 157, 22, 0x795548);
        lb.addPlatform(1588, 224, 145, 22, 0x8d6e63);
        lb.addPlatform(1860, 280, 115, 22, 0x795548);
        lb.addPlatform(1966, 247, 142, 22, 0x6d4c41);
        lb.addPlatform(2261, 264, 111, 22, 0x5d4037);
        lb.addPlatform(2760, 264, 140, 22, 0x795548);
        lb.addPlatform(2872, 210, 116, 22, 0x8d6e63);
        lb.addPlatform(3190, 249, 128, 22, 0x795548);
        lb.addPlatform(3822, 301, 123, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(645, 207);
        lb.addStar(1434, 182);
        lb.addStar(2283, 210);

        lb.addEnemy(468, 340, 'robot', 134);
        lb.addEnemy(1011, 340, 'ghost', 114);
        lb.addEnemy(1551, 340, 'robot', 122);
        lb.addEnemy(2097, 340, 'ghost', 117);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(341, 310, 'bush', 1.1);
        lb.addDecoration(602, 310, 'rock', 0.9);
        lb.addDecoration(863, 310, 'flower', 1.1);
        lb.addDecoration(1124, 310, 'mushroom', 0.8);
        lb.addDecoration(1385, 310, 'tree', 1.0);
        lb.addDecoration(1646, 310, 'bush', 0.8);
        lb.addDecoration(1907, 310, 'rock', 1.1);
        lb.addDecoration(2168, 310, 'flower', 0.9);
        lb.addDecoration(2429, 310, 'mushroom', 0.8);
        lb.addDecoration(2690, 310, 'tree', 0.9);
        lb.addDecoration(2951, 310, 'bush', 1.0);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
