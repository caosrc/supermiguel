class Cachoeira_6 extends BaseGameScene {
    constructor() {
        super('Cachoeira_6', { worldId: 'cachoeira', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 241, 117, 22, 0x607060);
        lb.addPlatform(582, 282, 119, 22, 0x6d4c41);
        lb.addPlatform(876, 244, 130, 22, 0x5d4037);
        lb.addPlatform(1216, 276, 114, 22, 0x795548);
        lb.addPlatform(1504, 206, 147, 22, 0x8d6e63);
        lb.addPlatform(1905, 286, 159, 22, 0x607060);
        lb.addPlatform(2188, 239, 137, 22, 0x6d4c41);
        lb.addPlatform(2261, 248, 153, 22, 0x5d4037);
        lb.addPlatform(2984, 293, 157, 22, 0x795548);
        lb.addPlatform(2935, 232, 157, 22, 0x8d6e63);
        lb.addPlatform(3190, 236, 112, 22, 0x607060);
        lb.addPlatform(3833, 330, 144, 22, 0x6d4c41);
        lb.addPlatform(3784, 246, 112, 22, 0x5d4037);
        lb.addPlatform(4544, 295, 119, 22, 0x795548);
        lb.addPlatform(4424, 240, 127, 22, 0x8d6e63);
        lb.addPlatform(4600, 313, 144, 22, 0x607060);
        lb.addPlatform(5368, 290, 138, 22, 0x6d4c41);
        lb.addPlatform(6009, 266, 127, 22, 0x5d4037);
        lb.addPlatform(5680, 273, 152, 22, 0x795548);
        lb.addPlatform(5828, 206, 116, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(403, 330);
        lb.addCoin(726, 330);
        lb.addCoin(1049, 330);
        lb.addCoin(1372, 330);
        lb.addCoin(1695, 330);
        lb.addCoin(2018, 330);
        lb.addCoin(2341, 330);
        lb.addCoin(2664, 330);
        lb.addCoin(2987, 330);
        lb.addCoin(3310, 330);
        lb.addCoin(3633, 330);

        lb.addStar(591, 196);
        lb.addStar(1681, 178);
        lb.addStar(2701, 208);

        lb.addEnemy(400, 340, 'fish', 124);
        lb.addEnemy(996, 340, 'crab', 148);
        lb.addEnemy(1529, 340, 'fish', 127);
        lb.addEnemy(2087, 340, 'crab', 117);
        lb.addEnemy(2645, 340, 'fish', 152);
        lb.addEnemy(3200, 340, 'crab', 151);

        lb.addHazard(571, h-80, 64, 20, 'water');
        lb.addHazard(1171, h-80, 64, 20, 'spike');
        lb.addHazard(1792, h-80, 64, 20, 'water');
        lb.addHazard(2315, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 1.0);
        lb.addDecoration(726, 310, 'rock', 1.1);
        lb.addDecoration(1049, 310, 'flower', 0.8);
        lb.addDecoration(1372, 310, 'mushroom', 1.1);
        lb.addDecoration(1695, 310, 'tree', 0.8);
        lb.addDecoration(2018, 310, 'bush', 1.1);
        lb.addDecoration(2341, 310, 'rock', 1.0);
        lb.addDecoration(2664, 310, 'flower', 1.1);
        lb.addDecoration(2987, 310, 'mushroom', 0.9);
        lb.addDecoration(3310, 310, 'tree', 1.1);
        lb.addDecoration(3633, 310, 'bush', 0.8);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
