class Espaco_3 extends BaseGameScene {
    constructor() {
        super('Espaco_3', { worldId: 'espaco', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 289, 125, 22, 0x303050);
        lb.addPlatform(591, 304, 163, 22, 0x6d4c41);
        lb.addPlatform(936, 214, 152, 22, 0x5d4037);
        lb.addPlatform(1273, 273, 168, 22, 0x795548);
        lb.addPlatform(1448, 240, 141, 22, 0x8d6e63);
        lb.addPlatform(1775, 279, 121, 22, 0x303050);
        lb.addPlatform(2026, 231, 163, 22, 0x6d4c41);
        lb.addPlatform(2387, 250, 117, 22, 0x5d4037);
        lb.addPlatform(2672, 286, 127, 22, 0x795548);
        lb.addPlatform(3340, 213, 128, 22, 0x8d6e63);
        lb.addPlatform(3460, 262, 138, 22, 0x303050);
        lb.addPlatform(3613, 270, 165, 22, 0x6d4c41);
        lb.addPlatform(4108, 231, 110, 22, 0x5d4037);
        lb.addPlatform(4206, 288, 116, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(612, 203);
        lb.addStar(1465, 181);
        lb.addStar(2355, 171);

        lb.addEnemy(448, 340, 'robot', 114);
        lb.addEnemy(969, 340, 'ghost', 103);
        lb.addEnemy(1590, 340, 'robot', 180);
        lb.addEnemy(2090, 340, 'ghost', 126);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(356, 310, 'bush', 1.0);
        lb.addDecoration(632, 310, 'rock', 0.9);
        lb.addDecoration(908, 310, 'flower', 1.0);
        lb.addDecoration(1184, 310, 'mushroom', 0.8);
        lb.addDecoration(1460, 310, 'tree', 1.1);
        lb.addDecoration(1736, 310, 'bush', 0.8);
        lb.addDecoration(2012, 310, 'rock', 0.9);
        lb.addDecoration(2288, 310, 'flower', 1.0);
        lb.addDecoration(2564, 310, 'mushroom', 0.9);
        lb.addDecoration(2840, 310, 'tree', 0.9);
        lb.addDecoration(3116, 310, 'bush', 1.0);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
