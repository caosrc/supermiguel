class Sonhos_3 extends BaseGameScene {
    constructor() {
        super('Sonhos_3', { worldId: 'sonhos', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 286, 134, 22, 0x1a0030);
        lb.addPlatform(608, 301, 167, 22, 0x6d4c41);
        lb.addPlatform(920, 235, 146, 22, 0x5d4037);
        lb.addPlatform(1171, 255, 149, 22, 0x795548);
        lb.addPlatform(1564, 226, 123, 22, 0x8d6e63);
        lb.addPlatform(1960, 275, 159, 22, 0x1a0030);
        lb.addPlatform(2068, 280, 146, 22, 0x6d4c41);
        lb.addPlatform(2569, 235, 134, 22, 0x5d4037);
        lb.addPlatform(2880, 260, 115, 22, 0x795548);
        lb.addPlatform(3313, 249, 134, 22, 0x8d6e63);
        lb.addPlatform(3510, 256, 152, 22, 0x1a0030);
        lb.addPlatform(3800, 329, 167, 22, 0x6d4c41);
        lb.addPlatform(4084, 218, 118, 22, 0x5d4037);
        lb.addPlatform(3933, 265, 128, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(575, 190);
        lb.addStar(1534, 176);
        lb.addStar(2353, 183);

        lb.addEnemy(403, 340, 'ghost', 136);
        lb.addEnemy(993, 340, 'bat', 160);
        lb.addEnemy(1581, 340, 'ghost', 132);
        lb.addEnemy(2117, 340, 'bat', 106);



        lb.addDecoration(80, 310, 'mushroom', 1.1);
        lb.addDecoration(356, 310, 'flower', 1.1);
        lb.addDecoration(632, 310, 'bush', 1.0);
        lb.addDecoration(908, 310, 'mushroom', 0.9);
        lb.addDecoration(1184, 310, 'flower', 0.9);
        lb.addDecoration(1460, 310, 'bush', 1.1);
        lb.addDecoration(1736, 310, 'mushroom', 0.8);
        lb.addDecoration(2012, 310, 'flower', 0.8);
        lb.addDecoration(2288, 310, 'bush', 1.0);
        lb.addDecoration(2564, 310, 'mushroom', 1.0);
        lb.addDecoration(2840, 310, 'flower', 1.1);
        lb.addDecoration(3116, 310, 'bush', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
