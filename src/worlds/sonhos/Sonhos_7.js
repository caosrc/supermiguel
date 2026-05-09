class Sonhos_7 extends BaseGameScene {
    constructor() {
        super('Sonhos_7', { worldId: 'sonhos', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 243, 156, 22, 0x1a0030);
        lb.addPlatform(591, 285, 114, 22, 0x6d4c41);
        lb.addPlatform(942, 253, 153, 22, 0x5d4037);
        lb.addPlatform(1264, 294, 116, 22, 0x795548);
        lb.addPlatform(1544, 232, 142, 22, 0x8d6e63);
        lb.addPlatform(1745, 329, 123, 22, 0x1a0030);
        lb.addPlatform(2128, 245, 138, 22, 0x6d4c41);
        lb.addPlatform(2436, 215, 152, 22, 0x5d4037);
        lb.addPlatform(2952, 275, 148, 22, 0x795548);
        lb.addPlatform(3097, 213, 120, 22, 0x8d6e63);
        lb.addPlatform(3480, 270, 129, 22, 0x1a0030);
        lb.addPlatform(3855, 329, 122, 22, 0x6d4c41);
        lb.addPlatform(4192, 235, 127, 22, 0x5d4037);
        lb.addPlatform(4440, 301, 133, 22, 0x795548);
        lb.addPlatform(4228, 214, 144, 22, 0x8d6e63);
        lb.addPlatform(4975, 295, 155, 22, 0x1a0030);
        lb.addPlatform(5688, 281, 159, 22, 0x6d4c41);
        lb.addPlatform(6043, 244, 146, 22, 0x5d4037);
        lb.addPlatform(6382, 308, 144, 22, 0x795548);
        lb.addPlatform(5638, 226, 159, 22, 0x8d6e63);
        lb.addPlatform(6960, 253, 135, 22, 0x1a0030);
        lb.addPlatform(6412, 316, 161, 22, 0x6d4c41);

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

        lb.addStar(557, 193);
        lb.addStar(1720, 182);
        lb.addStar(2767, 194);

        lb.addEnemy(437, 340, 'ghost', 110);
        lb.addEnemy(1040, 340, 'bat', 120);
        lb.addEnemy(1532, 340, 'ghost', 123);
        lb.addEnemy(2140, 340, 'bat', 125);
        lb.addEnemy(2694, 340, 'ghost', 150);
        lb.addEnemy(3210, 340, 'bat', 153);

        lb.addHazard(513, h-80, 64, 20, 'spike');
        lb.addHazard(1121, h-80, 64, 20, 'lava');
        lb.addHazard(1799, h-80, 64, 20, 'spike');
        lb.addHazard(2358, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'mushroom', 0.8);
        lb.addDecoration(418, 310, 'flower', 1.0);
        lb.addDecoration(756, 310, 'bush', 0.9);
        lb.addDecoration(1094, 310, 'mushroom', 0.9);
        lb.addDecoration(1432, 310, 'flower', 0.9);
        lb.addDecoration(1770, 310, 'bush', 1.1);
        lb.addDecoration(2108, 310, 'mushroom', 1.0);
        lb.addDecoration(2446, 310, 'flower', 0.8);
        lb.addDecoration(2784, 310, 'bush', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 0.8);
        lb.addDecoration(3460, 310, 'flower', 0.8);
        lb.addDecoration(3798, 310, 'bush', 1.0);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'feiticeira', { name: 'Feiticeira', lines: ['As estrelas guiam seu caminho, Miguel!', 'A magia está dentro de você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x1a0040, 0x1a0040, 0x3a0080, 0x3a0080, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=350){
            var iy=80+(i%200);
            bg.fillStyle(0x4a0080,0.7); bg.fillEllipse(i+150,iy,150,40);
            bg.fillStyle(0xab47bc,0.5); bg.fillEllipse(i+150,iy-10,140,25);
            bg.fillStyle(0x7c4dff,1); bg.fillCircle(i+130,iy-22,12);
            bg.fillCircle(i+155,iy-26,16); bg.fillCircle(i+175,iy-20,10);
        }
        bg.fillStyle(0xffffff,1);
        for(var i=0;i<LW;i+=50){
            var sz=1+((i*7)%4);
            bg.fillStyle(0xffffff,0.4+((i*3)%40)/100);
            bg.fillCircle(i+25,((i*13)%300)+20,sz);
        }
        for(var i=0;i<5;i++){
            bg.fillStyle([0x7c4dff,0xe91e63,0x00bcd4,0x4caf50,0xff9800][i],0.05);
            bg.fillRect(0,i*60,LW,50);
        }
        for(var i=0;i<LW;i+=280){
            bg.fillStyle(0xce93d8,0.7);
            bg.fillTriangle(i+20,h-60,i+28,h-100,i+36,h-60);
            bg.fillTriangle(i+30,h-60,i+40,h-110,i+50,h-60);
            bg.fillTriangle(i+45,h-60,i+52,h-90,i+60,h-60);
        }

        bg.fillStyle(0x1a0030, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x7c4dff, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
