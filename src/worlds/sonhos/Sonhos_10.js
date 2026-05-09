class Sonhos_10 extends BaseGameScene {
    constructor() {
        super('Sonhos_10', { worldId: 'sonhos', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 235, 139, 22, 0x1a0030);
        lb.addPlatform(604, 305, 137, 22, 0x6d4c41);
        lb.addPlatform(908, 263, 110, 22, 0x5d4037);
        lb.addPlatform(1291, 285, 125, 22, 0x795548);
        lb.addPlatform(1400, 205, 163, 22, 0x8d6e63);
        lb.addPlatform(1700, 328, 114, 22, 0x1a0030);
        lb.addPlatform(1990, 235, 160, 22, 0x6d4c41);
        lb.addPlatform(2268, 259, 144, 22, 0x5d4037);
        lb.addPlatform(2904, 258, 132, 22, 0x795548);
        lb.addPlatform(2854, 250, 170, 22, 0x8d6e63);
        lb.addPlatform(3330, 238, 111, 22, 0x1a0030);
        lb.addPlatform(3602, 270, 141, 22, 0x6d4c41);
        lb.addPlatform(3832, 268, 120, 22, 0x5d4037);
        lb.addPlatform(4544, 288, 155, 22, 0x795548);
        lb.addPlatform(4522, 238, 121, 22, 0x8d6e63);
        lb.addPlatform(5140, 279, 113, 22, 0x1a0030);
        lb.addPlatform(5560, 276, 115, 22, 0x6d4c41);
        lb.addPlatform(5482, 238, 146, 22, 0x5d4037);
        lb.addPlatform(5662, 308, 115, 22, 0x795548);
        lb.addPlatform(6607, 245, 169, 22, 0x8d6e63);
        lb.addPlatform(6960, 237, 155, 22, 0x1a0030);
        lb.addPlatform(7168, 306, 136, 22, 0x6d4c41);
        lb.addPlatform(7210, 212, 135, 22, 0x5d4037);
        lb.addPlatform(7226, 276, 129, 22, 0x795548);
        lb.addPlatform(8272, 214, 140, 22, 0x8d6e63);
        lb.addPlatform(8280, 328, 117, 22, 0x1a0030);
        lb.addPlatform(8782, 280, 123, 22, 0x6d4c41);
        lb.addPlatform(8839, 239, 127, 22, 0x5d4037);

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

        lb.addStar(593, 198);
        lb.addStar(1846, 201);
        lb.addStar(3100, 189);

        lb.addEnemy(460, 340, 'ghost', 165);
        lb.addEnemy(986, 340, 'bat', 149);
        lb.addEnemy(1548, 340, 'ghost', 170);
        lb.addEnemy(2132, 340, 'bat', 102);
        lb.addEnemy(2699, 340, 'ghost', 103);
        lb.addEnemy(3215, 340, 'bat', 171);
        lb.addEnemy(3793, 340, 'ghost', 123);
        lb.addEnemy(4331, 340, 'bat', 138);

        lb.addHazard(500, h-80, 64, 20, 'spike');
        lb.addHazard(1184, h-80, 64, 20, 'lava');
        lb.addHazard(1776, h-80, 64, 20, 'spike');
        lb.addHazard(2360, h-80, 64, 20, 'lava');
        lb.addHazard(2917, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'mushroom', 0.8);
        lb.addDecoration(464, 310, 'flower', 1.0);
        lb.addDecoration(848, 310, 'bush', 1.0);
        lb.addDecoration(1232, 310, 'mushroom', 1.0);
        lb.addDecoration(1616, 310, 'flower', 0.8);
        lb.addDecoration(2000, 310, 'bush', 1.1);
        lb.addDecoration(2384, 310, 'mushroom', 1.0);
        lb.addDecoration(2768, 310, 'flower', 0.9);
        lb.addDecoration(3152, 310, 'bush', 0.8);
        lb.addDecoration(3536, 310, 'mushroom', 1.0);
        lb.addDecoration(3920, 310, 'flower', 1.1);
        lb.addDecoration(4304, 310, 'bush', 0.8);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
