class Sonhos_8 extends BaseGameScene {
    constructor() {
        super('Sonhos_8', { worldId: 'sonhos', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 263, 147, 22, 0x1a0030);
        lb.addPlatform(608, 307, 124, 22, 0x6d4c41);
        lb.addPlatform(926, 248, 112, 22, 0x5d4037);
        lb.addPlatform(1237, 287, 122, 22, 0x795548);
        lb.addPlatform(1628, 238, 157, 22, 0x8d6e63);
        lb.addPlatform(1840, 276, 122, 22, 0x1a0030);
        lb.addPlatform(2032, 263, 130, 22, 0x6d4c41);
        lb.addPlatform(2506, 213, 168, 22, 0x5d4037);
        lb.addPlatform(2696, 291, 117, 22, 0x795548);
        lb.addPlatform(3088, 206, 142, 22, 0x8d6e63);
        lb.addPlatform(3370, 290, 124, 22, 0x1a0030);
        lb.addPlatform(3492, 280, 165, 22, 0x6d4c41);
        lb.addPlatform(3844, 265, 167, 22, 0x5d4037);
        lb.addPlatform(4375, 269, 140, 22, 0x795548);
        lb.addPlatform(4424, 204, 160, 22, 0x8d6e63);
        lb.addPlatform(4840, 296, 140, 22, 0x1a0030);
        lb.addPlatform(5608, 235, 142, 22, 0x6d4c41);
        lb.addPlatform(5125, 245, 112, 22, 0x5d4037);
        lb.addPlatform(6004, 295, 111, 22, 0x795548);
        lb.addPlatform(6740, 199, 138, 22, 0x8d6e63);
        lb.addPlatform(6560, 266, 161, 22, 0x1a0030);
        lb.addPlatform(6370, 284, 125, 22, 0x6d4c41);
        lb.addPlatform(7672, 251, 118, 22, 0x5d4037);
        lb.addPlatform(7502, 287, 163, 22, 0x795548);

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

        lb.addStar(579, 198);
        lb.addStar(1754, 172);
        lb.addStar(2891, 196);

        lb.addEnemy(445, 340, 'ghost', 157);
        lb.addEnemy(1013, 340, 'bat', 138);
        lb.addEnemy(1530, 340, 'ghost', 116);
        lb.addEnemy(2098, 340, 'bat', 108);
        lb.addEnemy(2650, 340, 'ghost', 170);
        lb.addEnemy(3261, 340, 'bat', 159);
        lb.addEnemy(3813, 340, 'ghost', 115);

        lb.addHazard(501, h-80, 64, 20, 'spike');
        lb.addHazard(1156, h-80, 64, 20, 'lava');
        lb.addHazard(1720, h-80, 64, 20, 'spike');
        lb.addHazard(2310, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'mushroom', 1.0);
        lb.addDecoration(433, 310, 'flower', 0.9);
        lb.addDecoration(786, 310, 'bush', 1.0);
        lb.addDecoration(1139, 310, 'mushroom', 0.9);
        lb.addDecoration(1492, 310, 'flower', 0.9);
        lb.addDecoration(1845, 310, 'bush', 1.0);
        lb.addDecoration(2198, 310, 'mushroom', 0.8);
        lb.addDecoration(2551, 310, 'flower', 1.0);
        lb.addDecoration(2904, 310, 'bush', 1.0);
        lb.addDecoration(3257, 310, 'mushroom', 0.9);
        lb.addDecoration(3610, 310, 'flower', 1.1);
        lb.addDecoration(3963, 310, 'bush', 1.1);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
