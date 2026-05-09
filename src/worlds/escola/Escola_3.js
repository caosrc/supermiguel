class Escola_3 extends BaseGameScene {
    constructor() {
        super('Escola_3', { worldId: 'escola', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 282, 148, 22, 0x795548);
        lb.addPlatform(564, 307, 129, 22, 0x6d4c41);
        lb.addPlatform(924, 241, 159, 22, 0x5d4037);
        lb.addPlatform(1132, 284, 157, 22, 0x795548);
        lb.addPlatform(1564, 238, 143, 22, 0x8d6e63);
        lb.addPlatform(1740, 321, 135, 22, 0x795548);
        lb.addPlatform(2176, 289, 166, 22, 0x6d4c41);
        lb.addPlatform(2499, 223, 113, 22, 0x5d4037);
        lb.addPlatform(2600, 271, 153, 22, 0x795548);
        lb.addPlatform(3241, 191, 166, 22, 0x8d6e63);
        lb.addPlatform(3550, 249, 166, 22, 0x795548);
        lb.addPlatform(3723, 315, 165, 22, 0x6d4c41);
        lb.addPlatform(4288, 224, 170, 22, 0x5d4037);
        lb.addPlatform(4284, 309, 150, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(612, 208);
        lb.addStar(1522, 193);
        lb.addStar(2378, 187);

        lb.addEnemy(412, 340, 'robot', 130);
        lb.addEnemy(1007, 340, 'ghost', 132);
        lb.addEnemy(1533, 340, 'robot', 140);
        lb.addEnemy(2139, 340, 'ghost', 160);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(356, 310, 'bush', 0.8);
        lb.addDecoration(632, 310, 'rock', 0.9);
        lb.addDecoration(908, 310, 'flower', 0.9);
        lb.addDecoration(1184, 310, 'mushroom', 1.0);
        lb.addDecoration(1460, 310, 'tree', 1.0);
        lb.addDecoration(1736, 310, 'bush', 1.0);
        lb.addDecoration(2012, 310, 'rock', 1.0);
        lb.addDecoration(2288, 310, 'flower', 0.8);
        lb.addDecoration(2564, 310, 'mushroom', 1.1);
        lb.addDecoration(2840, 310, 'tree', 0.8);
        lb.addDecoration(3116, 310, 'bush', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
