class Cachoeira_5 extends BaseGameScene {
    constructor() {
        super('Cachoeira_5', { worldId: 'cachoeira', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 285, 147, 22, 0x607060);
        lb.addPlatform(564, 295, 129, 22, 0x6d4c41);
        lb.addPlatform(936, 228, 112, 22, 0x5d4037);
        lb.addPlatform(1231, 271, 132, 22, 0x795548);
        lb.addPlatform(1628, 229, 136, 22, 0x8d6e63);
        lb.addPlatform(1905, 289, 144, 22, 0x607060);
        lb.addPlatform(2164, 263, 122, 22, 0x6d4c41);
        lb.addPlatform(2317, 215, 124, 22, 0x5d4037);
        lb.addPlatform(2648, 298, 167, 22, 0x795548);
        lb.addPlatform(2827, 245, 148, 22, 0x8d6e63);
        lb.addPlatform(3250, 270, 150, 22, 0x607060);
        lb.addPlatform(3514, 304, 134, 22, 0x6d4c41);
        lb.addPlatform(3664, 217, 139, 22, 0x5d4037);
        lb.addPlatform(3972, 257, 119, 22, 0x795548);
        lb.addPlatform(4494, 238, 121, 22, 0x8d6e63);
        lb.addPlatform(4615, 273, 135, 22, 0x607060);
        lb.addPlatform(5656, 246, 133, 22, 0x6d4c41);
        lb.addPlatform(5057, 212, 156, 22, 0x5d4037);

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

        lb.addStar(619, 193);
        lb.addStar(1608, 198);
        lb.addStar(2615, 207);

        lb.addEnemy(443, 340, 'fish', 119);
        lb.addEnemy(974, 340, 'crab', 103);
        lb.addEnemy(1535, 340, 'fish', 135);
        lb.addEnemy(2093, 340, 'crab', 120);
        lb.addEnemy(2687, 340, 'fish', 101);

        lb.addHazard(558, h-80, 64, 20, 'water');
        lb.addHazard(1179, h-80, 64, 20, 'spike');
        lb.addHazard(1745, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(387, 310, 'bush', 0.9);
        lb.addDecoration(694, 310, 'rock', 1.0);
        lb.addDecoration(1001, 310, 'flower', 0.8);
        lb.addDecoration(1308, 310, 'mushroom', 1.1);
        lb.addDecoration(1615, 310, 'tree', 1.0);
        lb.addDecoration(1922, 310, 'bush', 1.0);
        lb.addDecoration(2229, 310, 'rock', 1.0);
        lb.addDecoration(2536, 310, 'flower', 1.0);
        lb.addDecoration(2843, 310, 'mushroom', 0.9);
        lb.addDecoration(3150, 310, 'tree', 0.9);
        lb.addDecoration(3457, 310, 'bush', 1.0);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
