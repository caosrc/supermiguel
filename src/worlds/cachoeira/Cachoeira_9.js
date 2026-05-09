class Cachoeira_9 extends BaseGameScene {
    constructor() {
        super('Cachoeira_9', { worldId: 'cachoeira', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 290, 163, 22, 0x607060);
        lb.addPlatform(606, 294, 120, 22, 0x6d4c41);
        lb.addPlatform(910, 230, 148, 22, 0x5d4037);
        lb.addPlatform(1177, 266, 158, 22, 0x795548);
        lb.addPlatform(1552, 248, 139, 22, 0x8d6e63);
        lb.addPlatform(1885, 322, 137, 22, 0x607060);
        lb.addPlatform(2044, 266, 137, 22, 0x6d4c41);
        lb.addPlatform(2478, 223, 131, 22, 0x5d4037);
        lb.addPlatform(2904, 271, 138, 22, 0x795548);
        lb.addPlatform(3295, 190, 125, 22, 0x8d6e63);
        lb.addPlatform(3610, 256, 159, 22, 0x607060);
        lb.addPlatform(3437, 304, 164, 22, 0x6d4c41);
        lb.addPlatform(3640, 255, 169, 22, 0x5d4037);
        lb.addPlatform(3946, 292, 122, 22, 0x795548);
        lb.addPlatform(4242, 224, 133, 22, 0x8d6e63);
        lb.addPlatform(5380, 292, 144, 22, 0x607060);
        lb.addPlatform(5464, 249, 147, 22, 0x6d4c41);
        lb.addPlatform(5210, 239, 119, 22, 0x5d4037);
        lb.addPlatform(5824, 296, 137, 22, 0x795548);
        lb.addPlatform(5999, 230, 131, 22, 0x8d6e63);
        lb.addPlatform(7080, 243, 162, 22, 0x607060);
        lb.addPlatform(6685, 318, 129, 22, 0x6d4c41);
        lb.addPlatform(7320, 260, 153, 22, 0x5d4037);
        lb.addPlatform(7019, 269, 115, 22, 0x795548);
        lb.addPlatform(8368, 238, 169, 22, 0x8d6e63);
        lb.addPlatform(8230, 315, 149, 22, 0x607060);

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

        lb.addStar(641, 203);
        lb.addStar(1778, 188);
        lb.addStar(2959, 192);

        lb.addEnemy(436, 340, 'fish', 120);
        lb.addEnemy(1038, 340, 'crab', 127);
        lb.addEnemy(1564, 340, 'fish', 123);
        lb.addEnemy(2127, 340, 'crab', 148);
        lb.addEnemy(2702, 340, 'fish', 172);
        lb.addEnemy(3273, 340, 'crab', 108);
        lb.addEnemy(3800, 340, 'fish', 112);

        lb.addHazard(600, h-80, 64, 20, 'water');
        lb.addHazard(1174, h-80, 64, 20, 'spike');
        lb.addHazard(1700, h-80, 64, 20, 'water');
        lb.addHazard(2324, h-80, 64, 20, 'spike');
        lb.addHazard(2981, h-80, 64, 20, 'water');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(449, 310, 'bush', 1.0);
        lb.addDecoration(818, 310, 'rock', 0.9);
        lb.addDecoration(1187, 310, 'flower', 0.9);
        lb.addDecoration(1556, 310, 'mushroom', 0.9);
        lb.addDecoration(1925, 310, 'tree', 1.0);
        lb.addDecoration(2294, 310, 'bush', 1.0);
        lb.addDecoration(2663, 310, 'rock', 1.0);
        lb.addDecoration(3032, 310, 'flower', 0.9);
        lb.addDecoration(3401, 310, 'mushroom', 1.0);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 1.0);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
