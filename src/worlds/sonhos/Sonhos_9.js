class Sonhos_9 extends BaseGameScene {
    constructor() {
        super('Sonhos_9', { worldId: 'sonhos', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 281, 116, 22, 0x1a0030);
        lb.addPlatform(611, 284, 161, 22, 0x6d4c41);
        lb.addPlatform(894, 247, 154, 22, 0x5d4037);
        lb.addPlatform(1228, 272, 127, 22, 0x795548);
        lb.addPlatform(1492, 229, 153, 22, 0x8d6e63);
        lb.addPlatform(1955, 307, 140, 22, 0x1a0030);
        lb.addPlatform(2302, 278, 153, 22, 0x6d4c41);
        lb.addPlatform(2625, 211, 169, 22, 0x5d4037);
        lb.addPlatform(2696, 251, 120, 22, 0x795548);
        lb.addPlatform(3124, 236, 113, 22, 0x8d6e63);
        lb.addPlatform(3630, 248, 135, 22, 0x1a0030);
        lb.addPlatform(3415, 314, 150, 22, 0x6d4c41);
        lb.addPlatform(3904, 219, 118, 22, 0x5d4037);
        lb.addPlatform(4622, 256, 111, 22, 0x795548);
        lb.addPlatform(4270, 213, 159, 22, 0x8d6e63);
        lb.addPlatform(4750, 299, 111, 22, 0x1a0030);
        lb.addPlatform(5144, 264, 138, 22, 0x6d4c41);
        lb.addPlatform(5601, 245, 127, 22, 0x5d4037);
        lb.addPlatform(5392, 252, 117, 22, 0x795548);
        lb.addPlatform(6702, 225, 140, 22, 0x8d6e63);
        lb.addPlatform(6480, 286, 113, 22, 0x1a0030);
        lb.addPlatform(6412, 309, 138, 22, 0x6d4c41);
        lb.addPlatform(7738, 252, 164, 22, 0x5d4037);
        lb.addPlatform(6904, 299, 137, 22, 0x795548);
        lb.addPlatform(7072, 202, 162, 22, 0x8d6e63);
        lb.addPlatform(7530, 275, 125, 22, 0x1a0030);

        lb.addCoin(80, 330);
        lb.addCoin(380, 330);
        lb.addCoin(680, 330);
        lb.addCoin(980, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1580, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2180, 330);
        lb.addCoin(2480, 330);
        lb.addCoin(2780, 330);
        lb.addCoin(3080, 330);
        lb.addCoin(3380, 330);
        lb.addCoin(3680, 330);
        lb.addCoin(3980, 330);
        lb.addCoin(4280, 330);

        lb.addStar(582, 202);
        lb.addStar(1781, 177);
        lb.addStar(3000, 194);

        lb.addEnemy(426, 340, 'ghost', 173);
        lb.addEnemy(961, 340, 'bat', 133);
        lb.addEnemy(1600, 340, 'ghost', 167);
        lb.addEnemy(2092, 340, 'bat', 130);
        lb.addEnemy(2684, 340, 'ghost', 122);
        lb.addEnemy(3266, 340, 'bat', 107);
        lb.addEnemy(3808, 340, 'ghost', 142);

        lb.addHazard(559, h-80, 64, 20, 'spike');
        lb.addHazard(1122, h-80, 64, 20, 'lava');
        lb.addHazard(1741, h-80, 64, 20, 'spike');
        lb.addHazard(2387, h-80, 64, 20, 'lava');
        lb.addHazard(2931, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'mushroom', 0.9);
        lb.addDecoration(449, 310, 'flower', 0.8);
        lb.addDecoration(818, 310, 'bush', 1.0);
        lb.addDecoration(1187, 310, 'mushroom', 1.0);
        lb.addDecoration(1556, 310, 'flower', 0.9);
        lb.addDecoration(1925, 310, 'bush', 0.8);
        lb.addDecoration(2294, 310, 'mushroom', 0.8);
        lb.addDecoration(2663, 310, 'flower', 0.9);
        lb.addDecoration(3032, 310, 'bush', 1.0);
        lb.addDecoration(3401, 310, 'mushroom', 1.0);
        lb.addDecoration(3770, 310, 'flower', 1.0);
        lb.addDecoration(4139, 310, 'bush', 1.0);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
