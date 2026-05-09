class Espaco_5 extends BaseGameScene {
    constructor() {
        super('Espaco_5', { worldId: 'espaco', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 242, 118, 22, 0x303050);
        lb.addPlatform(581, 305, 164, 22, 0x6d4c41);
        lb.addPlatform(916, 223, 152, 22, 0x5d4037);
        lb.addPlatform(1279, 291, 122, 22, 0x795548);
        lb.addPlatform(1640, 224, 129, 22, 0x8d6e63);
        lb.addPlatform(1845, 301, 117, 22, 0x303050);
        lb.addPlatform(2164, 264, 147, 22, 0x6d4c41);
        lb.addPlatform(2366, 254, 136, 22, 0x5d4037);
        lb.addPlatform(2632, 267, 110, 22, 0x795548);
        lb.addPlatform(2953, 207, 155, 22, 0x8d6e63);
        lb.addPlatform(3380, 249, 116, 22, 0x303050);
        lb.addPlatform(3690, 295, 125, 22, 0x6d4c41);
        lb.addPlatform(3844, 263, 148, 22, 0x5d4037);
        lb.addPlatform(4362, 290, 144, 22, 0x795548);
        lb.addPlatform(4914, 244, 123, 22, 0x8d6e63);
        lb.addPlatform(5185, 271, 158, 22, 0x303050);
        lb.addPlatform(5640, 283, 152, 22, 0x6d4c41);
        lb.addPlatform(5176, 269, 165, 22, 0x5d4037);

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

        lb.addStar(587, 205);
        lb.addStar(1582, 194);
        lb.addStar(2580, 207);

        lb.addEnemy(451, 340, 'robot', 171);
        lb.addEnemy(1011, 340, 'ghost', 180);
        lb.addEnemy(1526, 340, 'robot', 166);
        lb.addEnemy(2100, 340, 'ghost', 151);
        lb.addEnemy(2705, 340, 'robot', 143);

        lb.addHazard(578, h-80, 64, 20, 'spike');
        lb.addHazard(1188, h-80, 64, 20, 'lava');
        lb.addHazard(1773, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(387, 310, 'bush', 1.1);
        lb.addDecoration(694, 310, 'rock', 1.0);
        lb.addDecoration(1001, 310, 'flower', 0.9);
        lb.addDecoration(1308, 310, 'mushroom', 0.8);
        lb.addDecoration(1615, 310, 'tree', 1.0);
        lb.addDecoration(1922, 310, 'bush', 1.1);
        lb.addDecoration(2229, 310, 'rock', 1.1);
        lb.addDecoration(2536, 310, 'flower', 1.0);
        lb.addDecoration(2843, 310, 'mushroom', 0.8);
        lb.addDecoration(3150, 310, 'tree', 0.8);
        lb.addDecoration(3457, 310, 'bush', 0.8);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'cientista', { name: 'Cientista', lines: ['Fascinante! Você descobriu um novo caminho!', 'A ciência explica tudo, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
