class Floresta_1 extends BaseGameScene {
    constructor() {
        super('Floresta_1', { worldId: 'floresta', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 250, 147, 22, 0x2e1a0e);
        lb.addPlatform(577, 290, 145, 22, 0x6d4c41);
        lb.addPlatform(946, 250, 151, 22, 0x5d4037);
        lb.addPlatform(1186, 263, 157, 22, 0x795548);
        lb.addPlatform(1624, 226, 167, 22, 0x8d6e63);
        lb.addPlatform(1725, 298, 111, 22, 0x2e1a0e);
        lb.addPlatform(1972, 238, 149, 22, 0x6d4c41);
        lb.addPlatform(2513, 233, 162, 22, 0x5d4037);
        lb.addPlatform(2520, 281, 114, 22, 0x795548);
        lb.addPlatform(2935, 246, 135, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(621, 181);
        lb.addStar(1401, 170);
        lb.addStar(2165, 175);

        lb.addEnemy(463, 340, 'slime', 180);
        lb.addEnemy(992, 340, 'bee', 150);
        lb.addEnemy(1562, 340, 'slime', 135);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(326, 310, 'bush', 0.9);
        lb.addDecoration(572, 310, 'rock', 0.8);
        lb.addDecoration(818, 310, 'flower', 1.0);
        lb.addDecoration(1064, 310, 'mushroom', 0.9);
        lb.addDecoration(1310, 310, 'tree', 0.9);
        lb.addDecoration(1556, 310, 'bush', 0.8);
        lb.addDecoration(1802, 310, 'rock', 1.0);
        lb.addDecoration(2048, 310, 'flower', 1.0);
        lb.addDecoration(2294, 310, 'mushroom', 0.9);
        lb.addDecoration(2540, 310, 'tree', 0.8);
        lb.addDecoration(2786, 310, 'bush', 0.9);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
