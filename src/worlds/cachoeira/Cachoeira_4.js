class Cachoeira_4 extends BaseGameScene {
    constructor() {
        super('Cachoeira_4', { worldId: 'cachoeira', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 252, 130, 22, 0x607060);
        lb.addPlatform(568, 323, 131, 22, 0x6d4c41);
        lb.addPlatform(890, 248, 112, 22, 0x5d4037);
        lb.addPlatform(1126, 288, 118, 22, 0x795548);
        lb.addPlatform(1640, 216, 135, 22, 0x8d6e63);
        lb.addPlatform(1965, 277, 147, 22, 0x607060);
        lb.addPlatform(2242, 266, 111, 22, 0x6d4c41);
        lb.addPlatform(2324, 263, 134, 22, 0x5d4037);
        lb.addPlatform(2536, 300, 148, 22, 0x795548);
        lb.addPlatform(2890, 250, 162, 22, 0x8d6e63);
        lb.addPlatform(3440, 240, 162, 22, 0x607060);
        lb.addPlatform(3888, 271, 154, 22, 0x6d4c41);
        lb.addPlatform(4144, 243, 164, 22, 0x5d4037);
        lb.addPlatform(4440, 298, 112, 22, 0x795548);
        lb.addPlatform(4942, 246, 142, 22, 0x8d6e63);
        lb.addPlatform(4660, 296, 163, 22, 0x607060);

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

        lb.addStar(624, 188);
        lb.addStar(1530, 184);
        lb.addStar(2482, 171);

        lb.addEnemy(463, 340, 'fish', 120);
        lb.addEnemy(1012, 340, 'crab', 115);
        lb.addEnemy(1598, 340, 'fish', 118);
        lb.addEnemy(2088, 340, 'crab', 169);
        lb.addEnemy(2654, 340, 'fish', 147);

        lb.addHazard(572, h-80, 64, 20, 'water');
        lb.addHazard(1133, h-80, 64, 20, 'spike');
        lb.addHazard(1750, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(372, 310, 'bush', 1.0);
        lb.addDecoration(664, 310, 'rock', 1.0);
        lb.addDecoration(956, 310, 'flower', 1.1);
        lb.addDecoration(1248, 310, 'mushroom', 1.0);
        lb.addDecoration(1540, 310, 'tree', 0.8);
        lb.addDecoration(1832, 310, 'bush', 0.9);
        lb.addDecoration(2124, 310, 'rock', 0.9);
        lb.addDecoration(2416, 310, 'flower', 1.1);
        lb.addDecoration(2708, 310, 'mushroom', 0.9);
        lb.addDecoration(3000, 310, 'tree', 1.0);
        lb.addDecoration(3292, 310, 'bush', 1.0);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
