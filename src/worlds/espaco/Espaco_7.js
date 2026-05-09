class Espaco_7 extends BaseGameScene {
    constructor() {
        super('Espaco_7', { worldId: 'espaco', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 259, 145, 22, 0x303050);
        lb.addPlatform(599, 301, 151, 22, 0x6d4c41);
        lb.addPlatform(960, 214, 130, 22, 0x5d4037);
        lb.addPlatform(1288, 280, 158, 22, 0x795548);
        lb.addPlatform(1568, 196, 132, 22, 0x8d6e63);
        lb.addPlatform(1810, 274, 157, 22, 0x303050);
        lb.addPlatform(2284, 231, 110, 22, 0x6d4c41);
        lb.addPlatform(2331, 238, 169, 22, 0x5d4037);
        lb.addPlatform(2776, 257, 146, 22, 0x795548);
        lb.addPlatform(2989, 239, 141, 22, 0x8d6e63);
        lb.addPlatform(3300, 234, 127, 22, 0x303050);
        lb.addPlatform(3668, 282, 129, 22, 0x6d4c41);
        lb.addPlatform(4168, 220, 135, 22, 0x5d4037);
        lb.addPlatform(4206, 267, 117, 22, 0x795548);
        lb.addPlatform(4914, 225, 170, 22, 0x8d6e63);
        lb.addPlatform(4645, 306, 138, 22, 0x303050);
        lb.addPlatform(5608, 257, 168, 22, 0x6d4c41);
        lb.addPlatform(5159, 247, 162, 22, 0x5d4037);
        lb.addPlatform(6238, 291, 146, 22, 0x795548);
        lb.addPlatform(6322, 195, 128, 22, 0x8d6e63);
        lb.addPlatform(6180, 269, 169, 22, 0x303050);
        lb.addPlatform(6202, 271, 130, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(641, 172);
        lb.addStar(1727, 176);
        lb.addStar(2789, 193);

        lb.addEnemy(457, 340, 'robot', 144);
        lb.addEnemy(1009, 340, 'ghost', 124);
        lb.addEnemy(1573, 340, 'robot', 134);
        lb.addEnemy(2145, 340, 'ghost', 171);
        lb.addEnemy(2661, 340, 'robot', 142);
        lb.addEnemy(3215, 340, 'ghost', 170);

        lb.addHazard(550, h-80, 64, 20, 'spike');
        lb.addHazard(1200, h-80, 64, 20, 'lava');
        lb.addHazard(1728, h-80, 64, 20, 'spike');
        lb.addHazard(2309, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(418, 310, 'bush', 0.9);
        lb.addDecoration(756, 310, 'rock', 0.9);
        lb.addDecoration(1094, 310, 'flower', 0.8);
        lb.addDecoration(1432, 310, 'mushroom', 0.9);
        lb.addDecoration(1770, 310, 'tree', 0.9);
        lb.addDecoration(2108, 310, 'bush', 0.8);
        lb.addDecoration(2446, 310, 'rock', 0.9);
        lb.addDecoration(2784, 310, 'flower', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 1.0);
        lb.addDecoration(3460, 310, 'tree', 1.0);
        lb.addDecoration(3798, 310, 'bush', 0.9);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'robot', { name: 'Robot', lines: ['BEEP BOOP — Amigo detectado!', 'Processando... Você é incrível!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
