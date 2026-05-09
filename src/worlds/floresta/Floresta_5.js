class Floresta_5 extends BaseGameScene {
    constructor() {
        super('Floresta_5', { worldId: 'floresta', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 238, 157, 22, 0x2e1a0e);
        lb.addPlatform(577, 290, 130, 22, 0x6d4c41);
        lb.addPlatform(900, 221, 110, 22, 0x5d4037);
        lb.addPlatform(1138, 279, 129, 22, 0x795548);
        lb.addPlatform(1488, 248, 123, 22, 0x8d6e63);
        lb.addPlatform(1825, 278, 167, 22, 0x2e1a0e);
        lb.addPlatform(2032, 270, 121, 22, 0x6d4c41);
        lb.addPlatform(2534, 246, 152, 22, 0x5d4037);
        lb.addPlatform(2896, 284, 114, 22, 0x795548);
        lb.addPlatform(2953, 225, 145, 22, 0x8d6e63);
        lb.addPlatform(3120, 247, 152, 22, 0x2e1a0e);
        lb.addPlatform(3448, 282, 168, 22, 0x6d4c41);
        lb.addPlatform(3904, 250, 148, 22, 0x5d4037);
        lb.addPlatform(4570, 302, 161, 22, 0x795548);
        lb.addPlatform(4634, 191, 141, 22, 0x8d6e63);
        lb.addPlatform(5020, 273, 114, 22, 0x2e1a0e);
        lb.addPlatform(5192, 242, 147, 22, 0x6d4c41);
        lb.addPlatform(5397, 210, 113, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(557, 197);
        lb.addStar(1594, 185);
        lb.addStar(2647, 184);

        lb.addEnemy(477, 340, 'slime', 142);
        lb.addEnemy(1008, 340, 'bee', 146);
        lb.addEnemy(1529, 340, 'slime', 100);
        lb.addEnemy(2148, 340, 'bee', 103);
        lb.addEnemy(2666, 340, 'slime', 116);

        lb.addHazard(542, h-80, 64, 20, 'spike');
        lb.addHazard(1138, h-80, 64, 20, 'lava');
        lb.addHazard(1783, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(387, 310, 'bush', 1.0);
        lb.addDecoration(694, 310, 'rock', 0.9);
        lb.addDecoration(1001, 310, 'flower', 0.9);
        lb.addDecoration(1308, 310, 'mushroom', 1.1);
        lb.addDecoration(1615, 310, 'tree', 0.8);
        lb.addDecoration(1922, 310, 'bush', 0.9);
        lb.addDecoration(2229, 310, 'rock', 0.9);
        lb.addDecoration(2536, 310, 'flower', 1.0);
        lb.addDecoration(2843, 310, 'mushroom', 1.0);
        lb.addDecoration(3150, 310, 'tree', 1.1);
        lb.addDecoration(3457, 310, 'bush', 0.8);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
