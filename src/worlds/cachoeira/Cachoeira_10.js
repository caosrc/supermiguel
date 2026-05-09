class Cachoeira_10 extends BaseGameScene {
    constructor() {
        super('Cachoeira_10', { worldId: 'cachoeira', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 278, 123, 22, 0x607060);
        lb.addPlatform(580, 288, 168, 22, 0x6d4c41);
        lb.addPlatform(862, 250, 115, 22, 0x5d4037);
        lb.addPlatform(1171, 295, 162, 22, 0x795548);
        lb.addPlatform(1536, 205, 110, 22, 0x8d6e63);
        lb.addPlatform(1785, 296, 165, 22, 0x607060);
        lb.addPlatform(2170, 289, 140, 22, 0x6d4c41);
        lb.addPlatform(2303, 264, 142, 22, 0x5d4037);
        lb.addPlatform(2840, 310, 163, 22, 0x795548);
        lb.addPlatform(3061, 223, 145, 22, 0x8d6e63);
        lb.addPlatform(3640, 273, 153, 22, 0x607060);
        lb.addPlatform(3514, 289, 139, 22, 0x6d4c41);
        lb.addPlatform(3640, 254, 170, 22, 0x5d4037);
        lb.addPlatform(3946, 296, 127, 22, 0x795548);
        lb.addPlatform(4312, 242, 139, 22, 0x8d6e63);
        lb.addPlatform(5275, 317, 136, 22, 0x607060);
        lb.addPlatform(5656, 279, 119, 22, 0x6d4c41);
        lb.addPlatform(5584, 215, 166, 22, 0x5d4037);
        lb.addPlatform(6328, 258, 121, 22, 0x795548);
        lb.addPlatform(6227, 223, 121, 22, 0x8d6e63);
        lb.addPlatform(6020, 257, 151, 22, 0x607060);
        lb.addPlatform(6958, 295, 143, 22, 0x6d4c41);
        lb.addPlatform(7078, 238, 144, 22, 0x5d4037);
        lb.addPlatform(7571, 272, 132, 22, 0x795548);
        lb.addPlatform(8320, 194, 144, 22, 0x8d6e63);
        lb.addPlatform(8630, 325, 136, 22, 0x607060);
        lb.addPlatform(8106, 288, 151, 22, 0x6d4c41);
        lb.addPlatform(9460, 219, 113, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(374, 330);
        lb.addCoin(668, 330);
        lb.addCoin(962, 330);
        lb.addCoin(1256, 330);
        lb.addCoin(1550, 330);
        lb.addCoin(1844, 330);
        lb.addCoin(2138, 330);
        lb.addCoin(2432, 330);
        lb.addCoin(2726, 330);
        lb.addCoin(3020, 330);
        lb.addCoin(3314, 330);
        lb.addCoin(3608, 330);
        lb.addCoin(3902, 330);
        lb.addCoin(4196, 330);
        lb.addCoin(4490, 330);

        lb.addStar(626, 191);
        lb.addStar(1881, 178);
        lb.addStar(3064, 180);

        lb.addEnemy(466, 340, 'fish', 176);
        lb.addEnemy(1022, 340, 'crab', 119);
        lb.addEnemy(1545, 340, 'fish', 118);
        lb.addEnemy(2107, 340, 'crab', 155);
        lb.addEnemy(2713, 340, 'fish', 125);
        lb.addEnemy(3235, 340, 'crab', 164);
        lb.addEnemy(3828, 340, 'fish', 128);
        lb.addEnemy(4354, 340, 'crab', 141);

        lb.addHazard(598, h-80, 64, 20, 'water');
        lb.addHazard(1130, h-80, 64, 20, 'spike');
        lb.addHazard(1715, h-80, 64, 20, 'water');
        lb.addHazard(2313, h-80, 64, 20, 'spike');
        lb.addHazard(2995, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(464, 310, 'bush', 0.9);
        lb.addDecoration(848, 310, 'rock', 0.9);
        lb.addDecoration(1232, 310, 'flower', 1.0);
        lb.addDecoration(1616, 310, 'mushroom', 1.0);
        lb.addDecoration(2000, 310, 'tree', 1.1);
        lb.addDecoration(2384, 310, 'bush', 1.1);
        lb.addDecoration(2768, 310, 'rock', 0.9);
        lb.addDecoration(3152, 310, 'flower', 0.9);
        lb.addDecoration(3536, 310, 'mushroom', 0.8);
        lb.addDecoration(3920, 310, 'tree', 0.9);
        lb.addDecoration(4304, 310, 'bush', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
