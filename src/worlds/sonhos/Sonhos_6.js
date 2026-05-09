class Sonhos_6 extends BaseGameScene {
    constructor() {
        super('Sonhos_6', { worldId: 'sonhos', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 243, 167, 22, 0x1a0030);
        lb.addPlatform(583, 281, 146, 22, 0x6d4c41);
        lb.addPlatform(864, 237, 123, 22, 0x5d4037);
        lb.addPlatform(1189, 260, 151, 22, 0x795548);
        lb.addPlatform(1468, 232, 161, 22, 0x8d6e63);
        lb.addPlatform(1840, 305, 149, 22, 0x1a0030);
        lb.addPlatform(2230, 232, 112, 22, 0x6d4c41);
        lb.addPlatform(2338, 228, 144, 22, 0x5d4037);
        lb.addPlatform(2816, 286, 141, 22, 0x795548);
        lb.addPlatform(3169, 232, 153, 22, 0x8d6e63);
        lb.addPlatform(3590, 278, 115, 22, 0x1a0030);
        lb.addPlatform(3866, 326, 153, 22, 0x6d4c41);
        lb.addPlatform(4096, 268, 151, 22, 0x5d4037);
        lb.addPlatform(4492, 256, 141, 22, 0x795548);
        lb.addPlatform(4200, 222, 168, 22, 0x8d6e63);
        lb.addPlatform(5200, 298, 126, 22, 0x1a0030);
        lb.addPlatform(5640, 238, 130, 22, 0x6d4c41);
        lb.addPlatform(5346, 227, 155, 22, 0x5d4037);
        lb.addPlatform(5752, 287, 160, 22, 0x795548);
        lb.addPlatform(6094, 230, 144, 22, 0x8d6e63);

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

        lb.addStar(584, 203);
        lb.addStar(1645, 176);
        lb.addStar(2736, 174);

        lb.addEnemy(428, 340, 'ghost', 132);
        lb.addEnemy(996, 340, 'bat', 120);
        lb.addEnemy(1550, 340, 'ghost', 163);
        lb.addEnemy(2123, 340, 'bat', 139);
        lb.addEnemy(2650, 340, 'ghost', 113);
        lb.addEnemy(3202, 340, 'bat', 131);

        lb.addHazard(510, h-80, 64, 20, 'spike');
        lb.addHazard(1180, h-80, 64, 20, 'lava');
        lb.addHazard(1772, h-80, 64, 20, 'spike');
        lb.addHazard(2395, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'mushroom', 0.8);
        lb.addDecoration(403, 310, 'flower', 0.8);
        lb.addDecoration(726, 310, 'bush', 1.0);
        lb.addDecoration(1049, 310, 'mushroom', 1.0);
        lb.addDecoration(1372, 310, 'flower', 0.9);
        lb.addDecoration(1695, 310, 'bush', 0.8);
        lb.addDecoration(2018, 310, 'mushroom', 1.0);
        lb.addDecoration(2341, 310, 'flower', 0.9);
        lb.addDecoration(2664, 310, 'bush', 0.8);
        lb.addDecoration(2987, 310, 'mushroom', 1.0);
        lb.addDecoration(3310, 310, 'flower', 0.9);
        lb.addDecoration(3633, 310, 'bush', 0.8);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'alien', { name: 'Alien', lines: ['*sons extraterrestres* (Olá, terrestre!)', 'Seu planeta é fascinante!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
