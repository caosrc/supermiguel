class Cachoeira_3 extends BaseGameScene {
    constructor() {
        super('Cachoeira_3', { worldId: 'cachoeira', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x607060, 60);

        lb.addPlatform(280, 269, 158, 22, 0x607060);
        lb.addPlatform(589, 315, 143, 22, 0x6d4c41);
        lb.addPlatform(880, 229, 169, 22, 0x5d4037);
        lb.addPlatform(1219, 260, 115, 22, 0x795548);
        lb.addPlatform(1532, 210, 136, 22, 0x8d6e63);
        lb.addPlatform(1775, 311, 127, 22, 0x607060);
        lb.addPlatform(2008, 235, 158, 22, 0x6d4c41);
        lb.addPlatform(2359, 222, 130, 22, 0x5d4037);
        lb.addPlatform(2768, 251, 149, 22, 0x795548);
        lb.addPlatform(2935, 242, 119, 22, 0x8d6e63);
        lb.addPlatform(3460, 246, 158, 22, 0x607060);
        lb.addPlatform(4009, 320, 122, 22, 0x6d4c41);
        lb.addPlatform(4000, 233, 118, 22, 0x5d4037);
        lb.addPlatform(4076, 269, 128, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(619, 170);
        lb.addStar(1546, 186);
        lb.addStar(2389, 200);

        lb.addEnemy(456, 340, 'fish', 115);
        lb.addEnemy(971, 340, 'crab', 180);
        lb.addEnemy(1582, 340, 'fish', 127);
        lb.addEnemy(2153, 340, 'crab', 159);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(356, 310, 'bush', 1.1);
        lb.addDecoration(632, 310, 'rock', 1.1);
        lb.addDecoration(908, 310, 'flower', 1.1);
        lb.addDecoration(1184, 310, 'mushroom', 1.0);
        lb.addDecoration(1460, 310, 'tree', 1.1);
        lb.addDecoration(1736, 310, 'bush', 1.0);
        lb.addDecoration(2012, 310, 'rock', 1.1);
        lb.addDecoration(2288, 310, 'flower', 1.1);
        lb.addDecoration(2564, 310, 'mushroom', 1.1);
        lb.addDecoration(2840, 310, 'tree', 0.9);
        lb.addDecoration(3116, 310, 'bush', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
