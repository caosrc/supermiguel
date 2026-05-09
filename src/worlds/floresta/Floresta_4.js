class Floresta_4 extends BaseGameScene {
    constructor() {
        super('Floresta_4', { worldId: 'floresta', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 236, 112, 22, 0x2e1a0e);
        lb.addPlatform(564, 276, 152, 22, 0x6d4c41);
        lb.addPlatform(892, 237, 119, 22, 0x5d4037);
        lb.addPlatform(1246, 283, 116, 22, 0x795548);
        lb.addPlatform(1628, 243, 139, 22, 0x8d6e63);
        lb.addPlatform(1820, 297, 117, 22, 0x2e1a0e);
        lb.addPlatform(2260, 286, 117, 22, 0x6d4c41);
        lb.addPlatform(2296, 237, 114, 22, 0x5d4037);
        lb.addPlatform(2904, 296, 130, 22, 0x795548);
        lb.addPlatform(3277, 217, 133, 22, 0x8d6e63);
        lb.addPlatform(3380, 290, 140, 22, 0x2e1a0e);
        lb.addPlatform(3921, 327, 156, 22, 0x6d4c41);
        lb.addPlatform(4036, 213, 136, 22, 0x5d4037);
        lb.addPlatform(4336, 270, 167, 22, 0x795548);
        lb.addPlatform(4620, 249, 137, 22, 0x8d6e63);
        lb.addPlatform(4945, 313, 141, 22, 0x2e1a0e);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(646, 208);
        lb.addStar(1542, 209);
        lb.addStar(2506, 173);

        lb.addEnemy(404, 340, 'slime', 126);
        lb.addEnemy(1020, 340, 'bee', 119);
        lb.addEnemy(1541, 340, 'slime', 170);
        lb.addEnemy(2134, 340, 'bee', 106);
        lb.addEnemy(2710, 340, 'slime', 168);

        lb.addHazard(564, h-80, 64, 20, 'spike');
        lb.addHazard(1171, h-80, 64, 20, 'lava');
        lb.addHazard(1797, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(372, 310, 'bush', 1.0);
        lb.addDecoration(664, 310, 'rock', 0.9);
        lb.addDecoration(956, 310, 'flower', 0.9);
        lb.addDecoration(1248, 310, 'mushroom', 0.8);
        lb.addDecoration(1540, 310, 'tree', 0.8);
        lb.addDecoration(1832, 310, 'bush', 0.9);
        lb.addDecoration(2124, 310, 'rock', 0.9);
        lb.addDecoration(2416, 310, 'flower', 1.0);
        lb.addDecoration(2708, 310, 'mushroom', 0.9);
        lb.addDecoration(3000, 310, 'tree', 0.8);
        lb.addDecoration(3292, 310, 'bush', 1.1);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
