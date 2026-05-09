class Espaco_2 extends BaseGameScene {
    constructor() {
        super('Espaco_2', { worldId: 'espaco', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 262, 126, 22, 0x303050);
        lb.addPlatform(620, 311, 160, 22, 0x6d4c41);
        lb.addPlatform(862, 253, 150, 22, 0x5d4037);
        lb.addPlatform(1276, 272, 135, 22, 0x795548);
        lb.addPlatform(1524, 222, 133, 22, 0x8d6e63);
        lb.addPlatform(1760, 329, 145, 22, 0x303050);
        lb.addPlatform(2248, 284, 158, 22, 0x6d4c41);
        lb.addPlatform(2499, 228, 168, 22, 0x5d4037);
        lb.addPlatform(2832, 293, 139, 22, 0x795548);
        lb.addPlatform(3160, 220, 118, 22, 0x8d6e63);
        lb.addPlatform(3120, 282, 164, 22, 0x303050);
        lb.addPlatform(3580, 306, 111, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(563, 191);
        lb.addStar(1405, 178);
        lb.addStar(2310, 200);

        lb.addEnemy(406, 340, 'robot', 147);
        lb.addEnemy(1010, 340, 'ghost', 140);
        lb.addEnemy(1549, 340, 'robot', 166);
        lb.addEnemy(2087, 340, 'ghost', 161);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(341, 310, 'bush', 1.1);
        lb.addDecoration(602, 310, 'rock', 1.1);
        lb.addDecoration(863, 310, 'flower', 1.0);
        lb.addDecoration(1124, 310, 'mushroom', 0.9);
        lb.addDecoration(1385, 310, 'tree', 0.9);
        lb.addDecoration(1646, 310, 'bush', 0.9);
        lb.addDecoration(1907, 310, 'rock', 0.9);
        lb.addDecoration(2168, 310, 'flower', 0.9);
        lb.addDecoration(2429, 310, 'mushroom', 0.8);
        lb.addDecoration(2690, 310, 'tree', 0.8);
        lb.addDecoration(2951, 310, 'bush', 0.9);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'robot', { name: 'Robot', lines: ['BEEP BOOP — Amigo detectado!', 'Processando... Você é incrível!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
