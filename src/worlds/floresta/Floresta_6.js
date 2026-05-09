class Floresta_6 extends BaseGameScene {
    constructor() {
        super('Floresta_6', { worldId: 'floresta', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x2e1a0e, 60);

        lb.addPlatform(280, 278, 160, 22, 0x2e1a0e);
        lb.addPlatform(598, 307, 117, 22, 0x6d4c41);
        lb.addPlatform(874, 256, 112, 22, 0x5d4037);
        lb.addPlatform(1246, 251, 111, 22, 0x795548);
        lb.addPlatform(1412, 242, 129, 22, 0x8d6e63);
        lb.addPlatform(1935, 325, 158, 22, 0x2e1a0e);
        lb.addPlatform(1960, 290, 122, 22, 0x6d4c41);
        lb.addPlatform(2513, 220, 169, 22, 0x5d4037);
        lb.addPlatform(2680, 276, 132, 22, 0x795548);
        lb.addPlatform(2926, 236, 165, 22, 0x8d6e63);
        lb.addPlatform(3640, 287, 115, 22, 0x2e1a0e);
        lb.addPlatform(3976, 302, 136, 22, 0x6d4c41);
        lb.addPlatform(4240, 223, 158, 22, 0x5d4037);
        lb.addPlatform(3985, 252, 125, 22, 0x795548);
        lb.addPlatform(4970, 191, 137, 22, 0x8d6e63);
        lb.addPlatform(4540, 315, 148, 22, 0x2e1a0e);
        lb.addPlatform(5256, 278, 166, 22, 0x6d4c41);
        lb.addPlatform(5907, 230, 114, 22, 0x5d4037);
        lb.addPlatform(5464, 299, 166, 22, 0x795548);
        lb.addPlatform(5828, 194, 119, 22, 0x8d6e63);

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

        lb.addStar(621, 205);
        lb.addStar(1603, 201);
        lb.addStar(2692, 196);

        lb.addEnemy(450, 340, 'slime', 122);
        lb.addEnemy(1024, 340, 'bee', 177);
        lb.addEnemy(1570, 340, 'slime', 156);
        lb.addEnemy(2158, 340, 'bee', 167);
        lb.addEnemy(2660, 340, 'slime', 167);
        lb.addEnemy(3216, 340, 'bee', 123);

        lb.addHazard(500, h-80, 64, 20, 'spike');
        lb.addHazard(1190, h-80, 64, 20, 'lava');
        lb.addHazard(1721, h-80, 64, 20, 'spike');
        lb.addHazard(2373, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 1.0);
        lb.addDecoration(726, 310, 'rock', 1.1);
        lb.addDecoration(1049, 310, 'flower', 1.0);
        lb.addDecoration(1372, 310, 'mushroom', 0.8);
        lb.addDecoration(1695, 310, 'tree', 0.9);
        lb.addDecoration(2018, 310, 'bush', 1.1);
        lb.addDecoration(2341, 310, 'rock', 0.8);
        lb.addDecoration(2664, 310, 'flower', 0.8);
        lb.addDecoration(2987, 310, 'mushroom', 1.0);
        lb.addDecoration(3310, 310, 'tree', 0.8);
        lb.addDecoration(3633, 310, 'bush', 0.9);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
