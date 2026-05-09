class Cachoeira_7 extends BaseGameScene {
    constructor() {
        super('Cachoeira_7', { worldId: 'cachoeira', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 230, 121, 22, 0x607060);
        lb.addPlatform(564, 315, 139, 22, 0x6d4c41);
        lb.addPlatform(896, 263, 111, 22, 0x5d4037);
        lb.addPlatform(1192, 266, 148, 22, 0x795548);
        lb.addPlatform(1548, 191, 159, 22, 0x8d6e63);
        lb.addPlatform(1785, 300, 136, 22, 0x607060);
        lb.addPlatform(2026, 258, 155, 22, 0x6d4c41);
        lb.addPlatform(2422, 245, 135, 22, 0x5d4037);
        lb.addPlatform(2584, 308, 156, 22, 0x795548);
        lb.addPlatform(2818, 204, 145, 22, 0x8d6e63);
        lb.addPlatform(3660, 256, 135, 22, 0x607060);
        lb.addPlatform(3734, 284, 146, 22, 0x6d4c41);
        lb.addPlatform(4012, 214, 147, 22, 0x5d4037);
        lb.addPlatform(4050, 269, 115, 22, 0x795548);
        lb.addPlatform(4662, 195, 114, 22, 0x8d6e63);
        lb.addPlatform(4945, 308, 132, 22, 0x607060);
        lb.addPlatform(4840, 244, 155, 22, 0x6d4c41);
        lb.addPlatform(5652, 224, 169, 22, 0x5d4037);
        lb.addPlatform(6310, 266, 168, 22, 0x795548);
        lb.addPlatform(6645, 202, 161, 22, 0x8d6e63);
        lb.addPlatform(6160, 263, 149, 22, 0x607060);
        lb.addPlatform(6622, 271, 158, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(628, 178);
        lb.addStar(1737, 191);
        lb.addStar(2807, 176);

        lb.addEnemy(478, 340, 'fish', 169);
        lb.addEnemy(961, 340, 'crab', 156);
        lb.addEnemy(1532, 340, 'fish', 173);
        lb.addEnemy(2118, 340, 'crab', 127);
        lb.addEnemy(2679, 340, 'fish', 102);
        lb.addEnemy(3207, 340, 'crab', 169);

        lb.addHazard(501, h-80, 64, 20, 'water');
        lb.addHazard(1147, h-80, 64, 20, 'spike');
        lb.addHazard(1705, h-80, 64, 20, 'water');
        lb.addHazard(2366, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(418, 310, 'bush', 0.8);
        lb.addDecoration(756, 310, 'rock', 0.9);
        lb.addDecoration(1094, 310, 'flower', 1.0);
        lb.addDecoration(1432, 310, 'mushroom', 0.8);
        lb.addDecoration(1770, 310, 'tree', 0.8);
        lb.addDecoration(2108, 310, 'bush', 0.9);
        lb.addDecoration(2446, 310, 'rock', 0.9);
        lb.addDecoration(2784, 310, 'flower', 0.8);
        lb.addDecoration(3122, 310, 'mushroom', 0.9);
        lb.addDecoration(3460, 310, 'tree', 0.9);
        lb.addDecoration(3798, 310, 'bush', 0.9);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'cientista', { name: 'Cientista', lines: ['Fascinante! Você descobriu um novo caminho!', 'A ciência explica tudo, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
