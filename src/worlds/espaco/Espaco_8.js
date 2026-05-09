class Espaco_8 extends BaseGameScene {
    constructor() {
        super('Espaco_8', { worldId: 'espaco', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 263, 113, 22, 0x303050);
        lb.addPlatform(562, 291, 133, 22, 0x6d4c41);
        lb.addPlatform(926, 252, 114, 22, 0x5d4037);
        lb.addPlatform(1207, 270, 125, 22, 0x795548);
        lb.addPlatform(1456, 226, 155, 22, 0x8d6e63);
        lb.addPlatform(1945, 276, 114, 22, 0x303050);
        lb.addPlatform(2158, 259, 155, 22, 0x6d4c41);
        lb.addPlatform(2296, 252, 119, 22, 0x5d4037);
        lb.addPlatform(2656, 295, 124, 22, 0x795548);
        lb.addPlatform(3268, 201, 127, 22, 0x8d6e63);
        lb.addPlatform(3630, 271, 160, 22, 0x303050);
        lb.addPlatform(3734, 317, 134, 22, 0x6d4c41);
        lb.addPlatform(3700, 250, 136, 22, 0x5d4037);
        lb.addPlatform(4102, 272, 128, 22, 0x795548);
        lb.addPlatform(4872, 236, 133, 22, 0x8d6e63);
        lb.addPlatform(4780, 317, 126, 22, 0x303050);
        lb.addPlatform(4952, 281, 136, 22, 0x6d4c41);
        lb.addPlatform(5125, 215, 129, 22, 0x5d4037);
        lb.addPlatform(5536, 261, 134, 22, 0x795548);
        lb.addPlatform(6721, 212, 115, 22, 0x8d6e63);
        lb.addPlatform(6120, 239, 161, 22, 0x303050);
        lb.addPlatform(6496, 294, 110, 22, 0x6d4c41);
        lb.addPlatform(7232, 238, 163, 22, 0x5d4037);
        lb.addPlatform(7226, 284, 156, 22, 0x795548);

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

        lb.addStar(613, 183);
        lb.addStar(1707, 170);
        lb.addStar(2872, 207);

        lb.addEnemy(405, 340, 'robot', 165);
        lb.addEnemy(995, 340, 'ghost', 113);
        lb.addEnemy(1535, 340, 'robot', 123);
        lb.addEnemy(2151, 340, 'ghost', 125);
        lb.addEnemy(2702, 340, 'robot', 114);
        lb.addEnemy(3223, 340, 'ghost', 177);
        lb.addEnemy(3822, 340, 'robot', 104);

        lb.addHazard(585, h-80, 64, 20, 'spike');
        lb.addHazard(1190, h-80, 64, 20, 'lava');
        lb.addHazard(1757, h-80, 64, 20, 'spike');
        lb.addHazard(2373, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(433, 310, 'bush', 1.0);
        lb.addDecoration(786, 310, 'rock', 1.0);
        lb.addDecoration(1139, 310, 'flower', 1.0);
        lb.addDecoration(1492, 310, 'mushroom', 1.0);
        lb.addDecoration(1845, 310, 'tree', 0.9);
        lb.addDecoration(2198, 310, 'bush', 1.0);
        lb.addDecoration(2551, 310, 'rock', 0.8);
        lb.addDecoration(2904, 310, 'flower', 1.1);
        lb.addDecoration(3257, 310, 'mushroom', 0.8);
        lb.addDecoration(3610, 310, 'tree', 0.9);
        lb.addDecoration(3963, 310, 'bush', 0.8);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x000014, 0x000014, 0x0a0a3a, 0x0a0a3a, 1);
        bg.fillRect(0, 0, LW, h);
        bg.fillStyle(0xffffff,1);
        for(var i=0;i<200;i++){
            var sx=(i*137+23)%LW, sy=(i*91+11)%Math.max(1,h-80), ss=(i%3)+1;
            bg.fillCircle(sx,sy,ss);
        }
        bg.fillStyle(0x7c4dff,0.06); bg.fillCircle(200,h*0.3,150);
        bg.fillStyle(0xe91e63,0.05); bg.fillCircle(700,h*0.25,120);
        bg.fillStyle(0x00bcd4,0.06); bg.fillCircle(1400,h*0.35,100);
        bg.fillStyle(0xff6b35,0.9); bg.fillCircle(300,100,50);
        bg.fillStyle(0xff9800,0.4); bg.fillEllipse(300,100,150,20);
        bg.fillStyle(0x4fc3f7,0.8); bg.fillCircle(900,80,35);
        bg.fillStyle(0x7c4dff,0.7); bg.fillCircle(1800,120,45);
        bg.fillStyle(0xffd700,0.9); bg.fillCircle(2600,70,25);
        bg.fillStyle(0x555570,0.8);
        for(var i=0;i<LW;i+=180){ bg.fillCircle(i+90,h-60,20+(i%60)); }

        bg.fillStyle(0x303050, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x404060, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
