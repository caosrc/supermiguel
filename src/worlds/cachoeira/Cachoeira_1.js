class Cachoeira_1 extends BaseGameScene {
    constructor() {
        super('Cachoeira_1', { worldId: 'cachoeira', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 270, 126, 22, 0x607060);
        lb.addPlatform(575, 302, 115, 22, 0x6d4c41);
        lb.addPlatform(862, 238, 141, 22, 0x5d4037);
        lb.addPlatform(1150, 251, 118, 22, 0x795548);
        lb.addPlatform(1452, 198, 162, 22, 0x8d6e63);
        lb.addPlatform(1835, 277, 110, 22, 0x607060);
        lb.addPlatform(1972, 258, 144, 22, 0x6d4c41);
        lb.addPlatform(2359, 253, 131, 22, 0x5d4037);
        lb.addPlatform(2992, 272, 147, 22, 0x795548);
        lb.addPlatform(3277, 247, 150, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(614, 190);
        lb.addStar(1355, 186);
        lb.addStar(2236, 194);

        lb.addEnemy(400, 340, 'fish', 105);
        lb.addEnemy(975, 340, 'crab', 165);
        lb.addEnemy(1534, 340, 'fish', 171);



        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(326, 310, 'bush', 0.9);
        lb.addDecoration(572, 310, 'rock', 0.8);
        lb.addDecoration(818, 310, 'flower', 0.9);
        lb.addDecoration(1064, 310, 'mushroom', 1.1);
        lb.addDecoration(1310, 310, 'tree', 1.0);
        lb.addDecoration(1556, 310, 'bush', 0.8);
        lb.addDecoration(1802, 310, 'rock', 0.8);
        lb.addDecoration(2048, 310, 'flower', 0.9);
        lb.addDecoration(2294, 310, 'mushroom', 1.1);
        lb.addDecoration(2540, 310, 'tree', 0.8);
        lb.addDecoration(2786, 310, 'bush', 0.8);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x0d2a4e, 0x0d2a4e, 0x1565c0, 0x1565c0, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=200;i<LW;i+=600){
            bg.fillStyle(0x4fc3f7,0.6); bg.fillRect(i,h-200,30,150);
            bg.fillStyle(0xffffff,0.3);
            for(var d=0;d<150;d+=12){ bg.fillEllipse(i+15,h-200+d,20,8); }
            bg.fillStyle(0xffffff,0.15); bg.fillEllipse(i+15,h-60,80,30);
        }
        for(var i=0;i<LW;i+=200){
            bg.fillStyle(0x607060,1); bg.fillEllipse(i+80,h-65,50+(i%40),30);
            bg.fillStyle(0x708080,1); bg.fillEllipse(i+70,h-70,30,20);
        }
        bg.fillStyle(0x2d8a3e,0.8);
        for(var i=100;i<LW;i+=250){ bg.fillEllipse(i,h-60,40,14); }

        bg.fillStyle(0x607060, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x4a7060, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
