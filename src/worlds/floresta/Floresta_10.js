class Floresta_10 extends BaseGameScene {
    constructor() {
        super('Floresta_10', { worldId: 'floresta', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 275, 136, 22, 0x2e1a0e);
        lb.addPlatform(607, 310, 118, 22, 0x6d4c41);
        lb.addPlatform(884, 212, 138, 22, 0x5d4037);
        lb.addPlatform(1132, 260, 113, 22, 0x795548);
        lb.addPlatform(1560, 198, 156, 22, 0x8d6e63);
        lb.addPlatform(1690, 270, 149, 22, 0x2e1a0e);
        lb.addPlatform(2302, 266, 137, 22, 0x6d4c41);
        lb.addPlatform(2338, 254, 156, 22, 0x5d4037);
        lb.addPlatform(3000, 292, 154, 22, 0x795548);
        lb.addPlatform(2836, 230, 149, 22, 0x8d6e63);
        lb.addPlatform(3510, 270, 135, 22, 0x2e1a0e);
        lb.addPlatform(3503, 292, 147, 22, 0x6d4c41);
        lb.addPlatform(3736, 249, 128, 22, 0x5d4037);
        lb.addPlatform(4362, 277, 146, 22, 0x795548);
        lb.addPlatform(4872, 232, 128, 22, 0x8d6e63);
        lb.addPlatform(4570, 285, 127, 22, 0x2e1a0e);
        lb.addPlatform(5544, 273, 129, 22, 0x6d4c41);
        lb.addPlatform(5414, 264, 166, 22, 0x5d4037);
        lb.addPlatform(5860, 271, 157, 22, 0x795548);
        lb.addPlatform(6056, 229, 167, 22, 0x8d6e63);
        lb.addPlatform(6000, 270, 112, 22, 0x2e1a0e);
        lb.addPlatform(6454, 314, 123, 22, 0x6d4c41);
        lb.addPlatform(7606, 251, 163, 22, 0x5d4037);
        lb.addPlatform(7732, 294, 153, 22, 0x795548);
        lb.addPlatform(8032, 221, 124, 22, 0x8d6e63);
        lb.addPlatform(7705, 325, 119, 22, 0x2e1a0e);
        lb.addPlatform(7846, 268, 134, 22, 0x6d4c41);
        lb.addPlatform(8974, 259, 137, 22, 0x5d4037);

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

        lb.addStar(559, 170);
        lb.addStar(1866, 202);
        lb.addStar(3057, 179);

        lb.addEnemy(471, 340, 'slime', 175);
        lb.addEnemy(972, 340, 'bee', 104);
        lb.addEnemy(1552, 340, 'slime', 105);
        lb.addEnemy(2095, 340, 'bee', 146);
        lb.addEnemy(2692, 340, 'slime', 132);
        lb.addEnemy(3200, 340, 'bee', 113);
        lb.addEnemy(3826, 340, 'slime', 162);
        lb.addEnemy(4359, 340, 'bee', 131);

        lb.addHazard(580, h-80, 64, 20, 'spike');
        lb.addHazard(1107, h-80, 64, 20, 'lava');
        lb.addHazard(1732, h-80, 64, 20, 'spike');
        lb.addHazard(2361, h-80, 64, 20, 'lava');
        lb.addHazard(2945, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(464, 310, 'bush', 0.9);
        lb.addDecoration(848, 310, 'rock', 0.9);
        lb.addDecoration(1232, 310, 'flower', 1.0);
        lb.addDecoration(1616, 310, 'mushroom', 0.8);
        lb.addDecoration(2000, 310, 'tree', 0.9);
        lb.addDecoration(2384, 310, 'bush', 1.0);
        lb.addDecoration(2768, 310, 'rock', 0.8);
        lb.addDecoration(3152, 310, 'flower', 1.1);
        lb.addDecoration(3536, 310, 'mushroom', 0.8);
        lb.addDecoration(3920, 310, 'tree', 0.9);
        lb.addDecoration(4304, 310, 'bush', 1.0);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
