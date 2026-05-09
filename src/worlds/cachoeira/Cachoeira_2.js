class Cachoeira_2 extends BaseGameScene {
    constructor() {
        super('Cachoeira_2', { worldId: 'cachoeira', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 251, 121, 22, 0x607060);
        lb.addPlatform(610, 292, 157, 22, 0x6d4c41);
        lb.addPlatform(924, 218, 158, 22, 0x5d4037);
        lb.addPlatform(1258, 310, 169, 22, 0x795548);
        lb.addPlatform(1452, 191, 155, 22, 0x8d6e63);
        lb.addPlatform(1870, 316, 165, 22, 0x607060);
        lb.addPlatform(2146, 263, 111, 22, 0x6d4c41);
        lb.addPlatform(2247, 245, 156, 22, 0x5d4037);
        lb.addPlatform(2976, 304, 125, 22, 0x795548);
        lb.addPlatform(3151, 220, 112, 22, 0x8d6e63);
        lb.addPlatform(3450, 263, 147, 22, 0x607060);
        lb.addPlatform(3448, 277, 130, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(579, 203);
        lb.addStar(1469, 188);
        lb.addStar(2312, 202);

        lb.addEnemy(460, 340, 'fish', 126);
        lb.addEnemy(996, 340, 'crab', 137);
        lb.addEnemy(1580, 340, 'fish', 179);
        lb.addEnemy(2096, 340, 'crab', 159);



        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(341, 310, 'bush', 0.9);
        lb.addDecoration(602, 310, 'rock', 0.8);
        lb.addDecoration(863, 310, 'flower', 1.1);
        lb.addDecoration(1124, 310, 'mushroom', 1.0);
        lb.addDecoration(1385, 310, 'tree', 1.1);
        lb.addDecoration(1646, 310, 'bush', 0.8);
        lb.addDecoration(1907, 310, 'rock', 0.9);
        lb.addDecoration(2168, 310, 'flower', 0.8);
        lb.addDecoration(2429, 310, 'mushroom', 1.1);
        lb.addDecoration(2690, 310, 'tree', 1.0);
        lb.addDecoration(2951, 310, 'bush', 1.1);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'cientista', { name: 'Cientista', lines: ['Fascinante! Você descobriu um novo caminho!', 'A ciência explica tudo, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
