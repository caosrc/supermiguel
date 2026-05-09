class Floresta_9 extends BaseGameScene {
    constructor() {
        super('Floresta_9', { worldId: 'floresta', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 247, 121, 22, 0x2e1a0e);
        lb.addPlatform(589, 281, 128, 22, 0x6d4c41);
        lb.addPlatform(922, 248, 150, 22, 0x5d4037);
        lb.addPlatform(1207, 306, 157, 22, 0x795548);
        lb.addPlatform(1608, 202, 132, 22, 0x8d6e63);
        lb.addPlatform(1780, 277, 138, 22, 0x2e1a0e);
        lb.addPlatform(2020, 272, 140, 22, 0x6d4c41);
        lb.addPlatform(2632, 232, 170, 22, 0x5d4037);
        lb.addPlatform(2632, 275, 130, 22, 0x795548);
        lb.addPlatform(3115, 215, 150, 22, 0x8d6e63);
        lb.addPlatform(3650, 241, 137, 22, 0x2e1a0e);
        lb.addPlatform(4009, 270, 141, 22, 0x6d4c41);
        lb.addPlatform(4192, 255, 143, 22, 0x5d4037);
        lb.addPlatform(4323, 261, 158, 22, 0x795548);
        lb.addPlatform(4830, 204, 116, 22, 0x8d6e63);
        lb.addPlatform(4855, 316, 140, 22, 0x2e1a0e);
        lb.addPlatform(4968, 230, 140, 22, 0x6d4c41);
        lb.addPlatform(5176, 250, 122, 22, 0x5d4037);
        lb.addPlatform(5986, 259, 113, 22, 0x795548);
        lb.addPlatform(6417, 209, 127, 22, 0x8d6e63);
        lb.addPlatform(6780, 245, 162, 22, 0x2e1a0e);
        lb.addPlatform(6475, 317, 111, 22, 0x6d4c41);
        lb.addPlatform(7540, 211, 124, 22, 0x5d4037);
        lb.addPlatform(7157, 250, 169, 22, 0x795548);
        lb.addPlatform(8152, 241, 127, 22, 0x8d6e63);
        lb.addPlatform(8555, 271, 132, 22, 0x2e1a0e);

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

        lb.addStar(554, 179);
        lb.addStar(1810, 180);
        lb.addStar(3014, 172);

        lb.addEnemy(402, 340, 'slime', 155);
        lb.addEnemy(1008, 340, 'bee', 126);
        lb.addEnemy(1532, 340, 'slime', 121);
        lb.addEnemy(2143, 340, 'bee', 154);
        lb.addEnemy(2665, 340, 'slime', 133);
        lb.addEnemy(3244, 340, 'bee', 114);
        lb.addEnemy(3821, 340, 'slime', 156);

        lb.addHazard(563, h-80, 64, 20, 'spike');
        lb.addHazard(1127, h-80, 64, 20, 'lava');
        lb.addHazard(1713, h-80, 64, 20, 'spike');
        lb.addHazard(2344, h-80, 64, 20, 'lava');
        lb.addHazard(2921, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(449, 310, 'bush', 1.0);
        lb.addDecoration(818, 310, 'rock', 1.0);
        lb.addDecoration(1187, 310, 'flower', 0.9);
        lb.addDecoration(1556, 310, 'mushroom', 1.0);
        lb.addDecoration(1925, 310, 'tree', 0.8);
        lb.addDecoration(2294, 310, 'bush', 0.9);
        lb.addDecoration(2663, 310, 'rock', 1.0);
        lb.addDecoration(3032, 310, 'flower', 0.9);
        lb.addDecoration(3401, 310, 'mushroom', 1.1);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 0.9);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
