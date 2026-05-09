class Espaco_6 extends BaseGameScene {
    constructor() {
        super('Espaco_6', { worldId: 'espaco', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 278, 156, 22, 0x303050);
        lb.addPlatform(594, 282, 115, 22, 0x6d4c41);
        lb.addPlatform(960, 264, 140, 22, 0x5d4037);
        lb.addPlatform(1246, 282, 141, 22, 0x795548);
        lb.addPlatform(1592, 213, 139, 22, 0x8d6e63);
        lb.addPlatform(1720, 294, 148, 22, 0x303050);
        lb.addPlatform(2122, 245, 124, 22, 0x6d4c41);
        lb.addPlatform(2408, 217, 160, 22, 0x5d4037);
        lb.addPlatform(2784, 307, 124, 22, 0x795548);
        lb.addPlatform(3178, 246, 131, 22, 0x8d6e63);
        lb.addPlatform(3230, 250, 163, 22, 0x303050);
        lb.addPlatform(3569, 311, 159, 22, 0x6d4c41);
        lb.addPlatform(4144, 267, 143, 22, 0x5d4037);
        lb.addPlatform(4414, 302, 116, 22, 0x795548);
        lb.addPlatform(4228, 244, 129, 22, 0x8d6e63);
        lb.addPlatform(4495, 299, 117, 22, 0x303050);
        lb.addPlatform(4904, 234, 128, 22, 0x6d4c41);
        lb.addPlatform(5091, 234, 166, 22, 0x5d4037);
        lb.addPlatform(6184, 281, 142, 22, 0x795548);
        lb.addPlatform(6721, 239, 119, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(403, 330);
        lb.addCoin(726, 330);
        lb.addCoin(1049, 330);
        lb.addCoin(1372, 330);
        lb.addCoin(1695, 330);
        lb.addCoin(2018, 330);
        lb.addCoin(2341, 330);
        lb.addCoin(2664, 330);
        lb.addCoin(2987, 330);
        lb.addCoin(3310, 330);
        lb.addCoin(3633, 330);

        lb.addStar(598, 207);
        lb.addStar(1663, 193);
        lb.addStar(2745, 189);

        lb.addEnemy(418, 340, 'robot', 131);
        lb.addEnemy(1039, 340, 'ghost', 132);
        lb.addEnemy(1559, 340, 'robot', 106);
        lb.addEnemy(2112, 340, 'ghost', 110);
        lb.addEnemy(2685, 340, 'robot', 174);
        lb.addEnemy(3228, 340, 'ghost', 160);

        lb.addHazard(527, h-80, 64, 20, 'spike');
        lb.addHazard(1155, h-80, 64, 20, 'lava');
        lb.addHazard(1754, h-80, 64, 20, 'spike');
        lb.addHazard(2373, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(403, 310, 'bush', 1.0);
        lb.addDecoration(726, 310, 'rock', 1.0);
        lb.addDecoration(1049, 310, 'flower', 0.9);
        lb.addDecoration(1372, 310, 'mushroom', 0.8);
        lb.addDecoration(1695, 310, 'tree', 0.9);
        lb.addDecoration(2018, 310, 'bush', 0.9);
        lb.addDecoration(2341, 310, 'rock', 1.0);
        lb.addDecoration(2664, 310, 'flower', 1.0);
        lb.addDecoration(2987, 310, 'mushroom', 0.8);
        lb.addDecoration(3310, 310, 'tree', 0.9);
        lb.addDecoration(3633, 310, 'bush', 1.1);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'alien', { name: 'Alien', lines: ['*sons extraterrestres* (Olá, terrestre!)', 'Seu planeta é fascinante!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
