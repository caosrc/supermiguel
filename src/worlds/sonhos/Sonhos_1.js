class Sonhos_1 extends BaseGameScene {
    constructor() {
        super('Sonhos_1', { worldId: 'sonhos', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 271, 141, 22, 0x1a0030);
        lb.addPlatform(605, 283, 116, 22, 0x6d4c41);
        lb.addPlatform(858, 215, 145, 22, 0x5d4037);
        lb.addPlatform(1132, 287, 135, 22, 0x795548);
        lb.addPlatform(1612, 208, 110, 22, 0x8d6e63);
        lb.addPlatform(1770, 292, 168, 22, 0x1a0030);
        lb.addPlatform(2188, 241, 156, 22, 0x6d4c41);
        lb.addPlatform(2513, 213, 116, 22, 0x5d4037);
        lb.addPlatform(2696, 274, 166, 22, 0x795548);
        lb.addPlatform(3322, 211, 136, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(646, 174);
        lb.addStar(1358, 181);
        lb.addStar(2202, 175);

        lb.addEnemy(417, 340, 'ghost', 176);
        lb.addEnemy(973, 340, 'bat', 158);
        lb.addEnemy(1557, 340, 'ghost', 135);



        lb.addDecoration(80, 310, 'mushroom', 1.0);
        lb.addDecoration(326, 310, 'flower', 0.8);
        lb.addDecoration(572, 310, 'bush', 0.9);
        lb.addDecoration(818, 310, 'mushroom', 0.8);
        lb.addDecoration(1064, 310, 'flower', 1.0);
        lb.addDecoration(1310, 310, 'bush', 0.9);
        lb.addDecoration(1556, 310, 'mushroom', 0.9);
        lb.addDecoration(1802, 310, 'flower', 0.9);
        lb.addDecoration(2048, 310, 'bush', 1.1);
        lb.addDecoration(2294, 310, 'mushroom', 0.9);
        lb.addDecoration(2540, 310, 'flower', 1.0);
        lb.addDecoration(2786, 310, 'bush', 0.8);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'alien', { name: 'Alien', lines: ['*sons extraterrestres* (Olá, terrestre!)', 'Seu planeta é fascinante!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
