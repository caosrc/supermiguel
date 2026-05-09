class Sonhos_5 extends BaseGameScene {
    constructor() {
        super('Sonhos_5', { worldId: 'sonhos', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 243, 120, 22, 0x1a0030);
        lb.addPlatform(609, 306, 147, 22, 0x6d4c41);
        lb.addPlatform(854, 224, 167, 22, 0x5d4037);
        lb.addPlatform(1156, 299, 142, 22, 0x795548);
        lb.addPlatform(1452, 195, 149, 22, 0x8d6e63);
        lb.addPlatform(1805, 272, 163, 22, 0x1a0030);
        lb.addPlatform(2140, 255, 122, 22, 0x6d4c41);
        lb.addPlatform(2345, 214, 166, 22, 0x5d4037);
        lb.addPlatform(2752, 266, 130, 22, 0x795548);
        lb.addPlatform(2827, 208, 123, 22, 0x8d6e63);
        lb.addPlatform(3300, 256, 124, 22, 0x1a0030);
        lb.addPlatform(3437, 322, 127, 22, 0x6d4c41);
        lb.addPlatform(4240, 224, 121, 22, 0x5d4037);
        lb.addPlatform(4245, 294, 124, 22, 0x795548);
        lb.addPlatform(4718, 230, 127, 22, 0x8d6e63);
        lb.addPlatform(4705, 270, 125, 22, 0x1a0030);
        lb.addPlatform(5112, 244, 153, 22, 0x6d4c41);
        lb.addPlatform(5924, 252, 123, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(613, 187);
        lb.addStar(1611, 179);
        lb.addStar(2588, 204);

        lb.addEnemy(436, 340, 'ghost', 127);
        lb.addEnemy(995, 340, 'bat', 111);
        lb.addEnemy(1566, 340, 'ghost', 165);
        lb.addEnemy(2139, 340, 'bat', 104);
        lb.addEnemy(2717, 340, 'ghost', 144);

        lb.addHazard(561, h-80, 64, 20, 'spike');
        lb.addHazard(1102, h-80, 64, 20, 'lava');
        lb.addHazard(1779, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'mushroom', 1.0);
        lb.addDecoration(387, 310, 'flower', 1.0);
        lb.addDecoration(694, 310, 'bush', 1.0);
        lb.addDecoration(1001, 310, 'mushroom', 1.0);
        lb.addDecoration(1308, 310, 'flower', 0.9);
        lb.addDecoration(1615, 310, 'bush', 0.9);
        lb.addDecoration(1922, 310, 'mushroom', 1.0);
        lb.addDecoration(2229, 310, 'flower', 1.1);
        lb.addDecoration(2536, 310, 'bush', 0.9);
        lb.addDecoration(2843, 310, 'mushroom', 1.1);
        lb.addDecoration(3150, 310, 'flower', 1.0);
        lb.addDecoration(3457, 310, 'bush', 0.9);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
