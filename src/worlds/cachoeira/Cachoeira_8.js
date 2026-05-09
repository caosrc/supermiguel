class Cachoeira_8 extends BaseGameScene {
    constructor() {
        super('Cachoeira_8', { worldId: 'cachoeira', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 247, 135, 22, 0x607060);
        lb.addPlatform(617, 308, 128, 22, 0x6d4c41);
        lb.addPlatform(880, 228, 119, 22, 0x5d4037);
        lb.addPlatform(1204, 287, 147, 22, 0x795548);
        lb.addPlatform(1404, 194, 158, 22, 0x8d6e63);
        lb.addPlatform(1855, 295, 110, 22, 0x607060);
        lb.addPlatform(2296, 258, 166, 22, 0x6d4c41);
        lb.addPlatform(2373, 251, 161, 22, 0x5d4037);
        lb.addPlatform(2936, 297, 155, 22, 0x795548);
        lb.addPlatform(2845, 239, 120, 22, 0x8d6e63);
        lb.addPlatform(3330, 239, 121, 22, 0x607060);
        lb.addPlatform(3635, 321, 160, 22, 0x6d4c41);
        lb.addPlatform(4216, 231, 142, 22, 0x5d4037);
        lb.addPlatform(4037, 292, 166, 22, 0x795548);
        lb.addPlatform(4620, 233, 150, 22, 0x8d6e63);
        lb.addPlatform(5290, 319, 118, 22, 0x607060);
        lb.addPlatform(5416, 264, 156, 22, 0x6d4c41);
        lb.addPlatform(5482, 230, 129, 22, 0x5d4037);
        lb.addPlatform(5698, 293, 147, 22, 0x795548);
        lb.addPlatform(6360, 208, 156, 22, 0x8d6e63);
        lb.addPlatform(6800, 283, 110, 22, 0x607060);
        lb.addPlatform(6811, 285, 147, 22, 0x6d4c41);
        lb.addPlatform(6616, 222, 158, 22, 0x5d4037);
        lb.addPlatform(7019, 252, 119, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(386, 330);
        lb.addCoin(692, 330);
        lb.addCoin(998, 330);
        lb.addCoin(1304, 330);
        lb.addCoin(1610, 330);
        lb.addCoin(1916, 330);
        lb.addCoin(2222, 330);
        lb.addCoin(2528, 330);
        lb.addCoin(2834, 330);
        lb.addCoin(3140, 330);
        lb.addCoin(3446, 330);
        lb.addCoin(3752, 330);
        lb.addCoin(4058, 330);

        lb.addStar(556, 171);
        lb.addStar(1784, 170);
        lb.addStar(2857, 181);

        lb.addEnemy(458, 340, 'fish', 144);
        lb.addEnemy(1037, 340, 'crab', 113);
        lb.addEnemy(1555, 340, 'fish', 102);
        lb.addEnemy(2133, 340, 'crab', 133);
        lb.addEnemy(2707, 340, 'fish', 101);
        lb.addEnemy(3235, 340, 'crab', 174);
        lb.addEnemy(3838, 340, 'fish', 139);

        lb.addHazard(581, h-80, 64, 20, 'water');
        lb.addHazard(1143, h-80, 64, 20, 'spike');
        lb.addHazard(1787, h-80, 64, 20, 'water');
        lb.addHazard(2367, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(433, 310, 'bush', 0.9);
        lb.addDecoration(786, 310, 'rock', 0.9);
        lb.addDecoration(1139, 310, 'flower', 0.9);
        lb.addDecoration(1492, 310, 'mushroom', 0.9);
        lb.addDecoration(1845, 310, 'tree', 0.8);
        lb.addDecoration(2198, 310, 'bush', 0.9);
        lb.addDecoration(2551, 310, 'rock', 1.0);
        lb.addDecoration(2904, 310, 'flower', 0.9);
        lb.addDecoration(3257, 310, 'mushroom', 0.8);
        lb.addDecoration(3610, 310, 'tree', 0.9);
        lb.addDecoration(3963, 310, 'bush', 0.9);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
