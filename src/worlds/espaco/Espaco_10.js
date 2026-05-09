class Espaco_10 extends BaseGameScene {
    constructor() {
        super('Espaco_10', { worldId: 'espaco', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 230, 136, 22, 0x303050);
        lb.addPlatform(579, 314, 137, 22, 0x6d4c41);
        lb.addPlatform(878, 267, 143, 22, 0x5d4037);
        lb.addPlatform(1246, 299, 154, 22, 0x795548);
        lb.addPlatform(1612, 216, 158, 22, 0x8d6e63);
        lb.addPlatform(1715, 310, 163, 22, 0x303050);
        lb.addPlatform(2242, 270, 158, 22, 0x6d4c41);
        lb.addPlatform(2352, 227, 129, 22, 0x5d4037);
        lb.addPlatform(2824, 307, 145, 22, 0x795548);
        lb.addPlatform(3088, 218, 155, 22, 0x8d6e63);
        lb.addPlatform(3340, 273, 143, 22, 0x303050);
        lb.addPlatform(3371, 273, 111, 22, 0x6d4c41);
        lb.addPlatform(4060, 253, 138, 22, 0x5d4037);
        lb.addPlatform(4661, 292, 118, 22, 0x795548);
        lb.addPlatform(4802, 195, 141, 22, 0x8d6e63);
        lb.addPlatform(4600, 278, 158, 22, 0x303050);
        lb.addPlatform(5240, 243, 165, 22, 0x6d4c41);
        lb.addPlatform(5873, 226, 155, 22, 0x5d4037);
        lb.addPlatform(6400, 272, 169, 22, 0x795548);
        lb.addPlatform(5828, 205, 110, 22, 0x8d6e63);
        lb.addPlatform(6780, 259, 130, 22, 0x303050);
        lb.addPlatform(6475, 278, 163, 22, 0x6d4c41);
        lb.addPlatform(7716, 220, 140, 22, 0x5d4037);
        lb.addPlatform(8077, 308, 157, 22, 0x795548);
        lb.addPlatform(7744, 211, 170, 22, 0x8d6e63);
        lb.addPlatform(8405, 285, 126, 22, 0x303050);
        lb.addPlatform(8548, 277, 118, 22, 0x6d4c41);
        lb.addPlatform(9298, 211, 128, 22, 0x5d4037);

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

        lb.addStar(625, 202);
        lb.addStar(1835, 187);
        lb.addStar(3143, 210);

        lb.addEnemy(449, 340, 'robot', 160);
        lb.addEnemy(1012, 340, 'ghost', 116);
        lb.addEnemy(1539, 340, 'robot', 157);
        lb.addEnemy(2146, 340, 'ghost', 121);
        lb.addEnemy(2654, 340, 'robot', 122);
        lb.addEnemy(3240, 340, 'ghost', 139);
        lb.addEnemy(3832, 340, 'robot', 151);
        lb.addEnemy(4372, 340, 'ghost', 141);

        lb.addHazard(515, h-80, 64, 20, 'spike');
        lb.addHazard(1141, h-80, 64, 20, 'lava');
        lb.addHazard(1733, h-80, 64, 20, 'spike');
        lb.addHazard(2343, h-80, 64, 20, 'lava');
        lb.addHazard(2939, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(464, 310, 'bush', 1.0);
        lb.addDecoration(848, 310, 'rock', 0.9);
        lb.addDecoration(1232, 310, 'flower', 1.0);
        lb.addDecoration(1616, 310, 'mushroom', 0.9);
        lb.addDecoration(2000, 310, 'tree', 0.9);
        lb.addDecoration(2384, 310, 'bush', 1.1);
        lb.addDecoration(2768, 310, 'rock', 1.0);
        lb.addDecoration(3152, 310, 'flower', 0.9);
        lb.addDecoration(3536, 310, 'mushroom', 0.8);
        lb.addDecoration(3920, 310, 'tree', 1.0);
        lb.addDecoration(4304, 310, 'bush', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'cientista', { name: 'Cientista', lines: ['Fascinante! Você descobriu um novo caminho!', 'A ciência explica tudo, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
