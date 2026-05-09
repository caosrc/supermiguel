class Floresta_3 extends BaseGameScene {
    constructor() {
        super('Floresta_3', { worldId: 'floresta', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 230, 168, 22, 0x2e1a0e);
        lb.addPlatform(601, 320, 156, 22, 0x6d4c41);
        lb.addPlatform(904, 232, 119, 22, 0x5d4037);
        lb.addPlatform(1198, 281, 114, 22, 0x795548);
        lb.addPlatform(1500, 190, 161, 22, 0x8d6e63);
        lb.addPlatform(1945, 327, 147, 22, 0x2e1a0e);
        lb.addPlatform(2308, 252, 147, 22, 0x6d4c41);
        lb.addPlatform(2548, 219, 151, 22, 0x5d4037);
        lb.addPlatform(2840, 282, 155, 22, 0x795548);
        lb.addPlatform(3133, 199, 139, 22, 0x8d6e63);
        lb.addPlatform(3650, 256, 140, 22, 0x2e1a0e);
        lb.addPlatform(3778, 274, 158, 22, 0x6d4c41);
        lb.addPlatform(3712, 240, 166, 22, 0x5d4037);
        lb.addPlatform(4141, 278, 141, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(567, 179);
        lb.addStar(1507, 195);
        lb.addStar(2381, 188);

        lb.addEnemy(468, 340, 'slime', 161);
        lb.addEnemy(993, 340, 'bee', 162);
        lb.addEnemy(1529, 340, 'slime', 108);
        lb.addEnemy(2151, 340, 'bee', 100);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(356, 310, 'bush', 0.9);
        lb.addDecoration(632, 310, 'rock', 0.8);
        lb.addDecoration(908, 310, 'flower', 0.9);
        lb.addDecoration(1184, 310, 'mushroom', 1.1);
        lb.addDecoration(1460, 310, 'tree', 1.1);
        lb.addDecoration(1736, 310, 'bush', 0.8);
        lb.addDecoration(2012, 310, 'rock', 1.0);
        lb.addDecoration(2288, 310, 'flower', 0.9);
        lb.addDecoration(2564, 310, 'mushroom', 1.0);
        lb.addDecoration(2840, 310, 'tree', 1.0);
        lb.addDecoration(3116, 310, 'bush', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
