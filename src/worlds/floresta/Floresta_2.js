class Floresta_2 extends BaseGameScene {
    constructor() {
        super('Floresta_2', { worldId: 'floresta', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 242, 140, 22, 0x2e1a0e);
        lb.addPlatform(576, 330, 165, 22, 0x6d4c41);
        lb.addPlatform(930, 216, 118, 22, 0x5d4037);
        lb.addPlatform(1249, 256, 167, 22, 0x795548);
        lb.addPlatform(1592, 238, 147, 22, 0x8d6e63);
        lb.addPlatform(1875, 272, 145, 22, 0x2e1a0e);
        lb.addPlatform(2170, 243, 142, 22, 0x6d4c41);
        lb.addPlatform(2373, 238, 118, 22, 0x5d4037);
        lb.addPlatform(2592, 275, 120, 22, 0x795548);
        lb.addPlatform(2935, 199, 136, 22, 0x8d6e63);
        lb.addPlatform(3670, 247, 119, 22, 0x2e1a0e);
        lb.addPlatform(4009, 303, 112, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(606, 184);
        lb.addStar(1486, 205);
        lb.addStar(2340, 206);

        lb.addEnemy(470, 340, 'slime', 167);
        lb.addEnemy(1008, 340, 'bee', 129);
        lb.addEnemy(1595, 340, 'slime', 179);
        lb.addEnemy(2093, 340, 'bee', 103);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(341, 310, 'bush', 0.9);
        lb.addDecoration(602, 310, 'rock', 0.9);
        lb.addDecoration(863, 310, 'flower', 1.0);
        lb.addDecoration(1124, 310, 'mushroom', 0.9);
        lb.addDecoration(1385, 310, 'tree', 1.0);
        lb.addDecoration(1646, 310, 'bush', 0.9);
        lb.addDecoration(1907, 310, 'rock', 1.0);
        lb.addDecoration(2168, 310, 'flower', 1.0);
        lb.addDecoration(2429, 310, 'mushroom', 0.8);
        lb.addDecoration(2690, 310, 'tree', 1.0);
        lb.addDecoration(2951, 310, 'bush', 1.0);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x0d2a12, 0x0d2a12, 0x1a5a2e, 0x1a5a2e, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=300){
            var th=200+Math.sin(i)*50;
            bg.fillStyle(0x1a3a10,0.7); bg.fillCircle(i+100,h-70-th*0.6,th*0.4);
            bg.fillStyle(0x2d6a20,0.8); bg.fillCircle(i+80,h-70-th*0.7,th*0.35);
            bg.fillStyle(0x3a8a2a,0.9); bg.fillCircle(i+100,h-70-th*0.75,th*0.3);
            bg.fillStyle(0x3d2010,1); bg.fillRect(i+92,h-70-th*0.4,16,th*0.4);
        }
        bg.fillStyle(0xffffff,0.08);
        for(var i=0;i<LW;i+=60){ bg.fillEllipse(i+30,h-65,120,40); }
        bg.fillStyle(0xffff88,0.5);
        for(var i=0;i<LW;i+=180){ bg.fillCircle(i+90,h-120+(i%80),3); }

        bg.fillStyle(0x2e1a0e, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x2d8a3e, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
