class Floresta_8 extends BaseGameScene {
    constructor() {
        super('Floresta_8', { worldId: 'floresta', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 247, 140, 22, 0x2e1a0e);
        lb.addPlatform(583, 303, 142, 22, 0x6d4c41);
        lb.addPlatform(882, 254, 121, 22, 0x5d4037);
        lb.addPlatform(1216, 288, 158, 22, 0x795548);
        lb.addPlatform(1592, 225, 134, 22, 0x8d6e63);
        lb.addPlatform(1735, 320, 165, 22, 0x2e1a0e);
        lb.addPlatform(2020, 276, 156, 22, 0x6d4c41);
        lb.addPlatform(2415, 225, 126, 22, 0x5d4037);
        lb.addPlatform(2696, 267, 142, 22, 0x795548);
        lb.addPlatform(3223, 241, 170, 22, 0x8d6e63);
        lb.addPlatform(3090, 259, 120, 22, 0x2e1a0e);
        lb.addPlatform(3514, 286, 113, 22, 0x6d4c41);
        lb.addPlatform(4264, 218, 153, 22, 0x5d4037);
        lb.addPlatform(4661, 297, 164, 22, 0x795548);
        lb.addPlatform(4956, 195, 132, 22, 0x8d6e63);
        lb.addPlatform(5050, 293, 142, 22, 0x2e1a0e);
        lb.addPlatform(5720, 290, 164, 22, 0x6d4c41);
        lb.addPlatform(5856, 226, 113, 22, 0x5d4037);
        lb.addPlatform(5518, 284, 151, 22, 0x795548);
        lb.addPlatform(6056, 220, 149, 22, 0x8d6e63);
        lb.addPlatform(7080, 237, 131, 22, 0x2e1a0e);
        lb.addPlatform(6202, 320, 152, 22, 0x6d4c41);
        lb.addPlatform(7254, 233, 155, 22, 0x5d4037);
        lb.addPlatform(6789, 288, 134, 22, 0x795548);

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

        lb.addStar(637, 193);
        lb.addStar(1700, 195);
        lb.addStar(2928, 194);

        lb.addEnemy(432, 340, 'slime', 122);
        lb.addEnemy(1036, 340, 'bee', 153);
        lb.addEnemy(1573, 340, 'slime', 176);
        lb.addEnemy(2106, 340, 'bee', 104);
        lb.addEnemy(2655, 340, 'slime', 168);
        lb.addEnemy(3248, 340, 'bee', 177);
        lb.addEnemy(3829, 340, 'slime', 161);

        lb.addHazard(516, h-80, 64, 20, 'spike');
        lb.addHazard(1115, h-80, 64, 20, 'lava');
        lb.addHazard(1756, h-80, 64, 20, 'spike');
        lb.addHazard(2349, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(433, 310, 'bush', 1.0);
        lb.addDecoration(786, 310, 'rock', 0.8);
        lb.addDecoration(1139, 310, 'flower', 1.0);
        lb.addDecoration(1492, 310, 'mushroom', 0.9);
        lb.addDecoration(1845, 310, 'tree', 1.0);
        lb.addDecoration(2198, 310, 'bush', 1.0);
        lb.addDecoration(2551, 310, 'rock', 1.0);
        lb.addDecoration(2904, 310, 'flower', 1.0);
        lb.addDecoration(3257, 310, 'mushroom', 1.1);
        lb.addDecoration(3610, 310, 'tree', 0.9);
        lb.addDecoration(3963, 310, 'bush', 0.8);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
