class Doces_10 extends BaseGameScene {
    constructor() {
        super('Doces_10', { worldId: 'doces', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 274, 113, 22, 0x8d1b3d);
        lb.addPlatform(595, 282, 128, 22, 0x6d4c41);
        lb.addPlatform(878, 230, 162, 22, 0x5d4037);
        lb.addPlatform(1243, 299, 170, 22, 0x795548);
        lb.addPlatform(1440, 243, 125, 22, 0x8d6e63);
        lb.addPlatform(1925, 272, 140, 22, 0x8d1b3d);
        lb.addPlatform(2212, 288, 114, 22, 0x6d4c41);
        lb.addPlatform(2338, 217, 160, 22, 0x5d4037);
        lb.addPlatform(2840, 293, 160, 22, 0x795548);
        lb.addPlatform(2854, 216, 161, 22, 0x8d6e63);
        lb.addPlatform(3300, 267, 128, 22, 0x8d1b3d);
        lb.addPlatform(3525, 313, 138, 22, 0x6d4c41);
        lb.addPlatform(3784, 232, 114, 22, 0x5d4037);
        lb.addPlatform(4583, 291, 138, 22, 0x795548);
        lb.addPlatform(4228, 240, 148, 22, 0x8d6e63);
        lb.addPlatform(5200, 325, 161, 22, 0x8d1b3d);
        lb.addPlatform(4984, 285, 129, 22, 0x6d4c41);
        lb.addPlatform(5397, 236, 166, 22, 0x5d4037);
        lb.addPlatform(5320, 295, 146, 22, 0x795548);
        lb.addPlatform(5847, 236, 113, 22, 0x8d6e63);
        lb.addPlatform(6140, 280, 131, 22, 0x8d1b3d);
        lb.addPlatform(6664, 294, 168, 22, 0x6d4c41);
        lb.addPlatform(6858, 211, 115, 22, 0x5d4037);
        lb.addPlatform(6858, 300, 127, 22, 0x795548);
        lb.addPlatform(7984, 250, 139, 22, 0x8d6e63);
        lb.addPlatform(8255, 277, 113, 22, 0x8d1b3d);
        lb.addPlatform(8912, 250, 142, 22, 0x6d4c41);
        lb.addPlatform(9082, 214, 140, 22, 0x5d4037);

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

        lb.addStar(551, 207);
        lb.addStar(1842, 189);
        lb.addStar(3129, 182);

        lb.addEnemy(419, 340, 'slime', 120);
        lb.addEnemy(967, 340, 'bee', 152);
        lb.addEnemy(1566, 340, 'slime', 171);
        lb.addEnemy(2090, 340, 'bee', 154);
        lb.addEnemy(2671, 340, 'slime', 103);
        lb.addEnemy(3214, 340, 'bee', 155);
        lb.addEnemy(3806, 340, 'slime', 125);
        lb.addEnemy(4364, 340, 'bee', 132);

        lb.addHazard(552, h-80, 64, 20, 'spike');
        lb.addHazard(1100, h-80, 64, 20, 'lava');
        lb.addHazard(1720, h-80, 64, 20, 'spike');
        lb.addHazard(2356, h-80, 64, 20, 'lava');
        lb.addHazard(2970, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(464, 310, 'bush', 0.9);
        lb.addDecoration(848, 310, 'rock', 1.0);
        lb.addDecoration(1232, 310, 'flower', 0.9);
        lb.addDecoration(1616, 310, 'mushroom', 0.9);
        lb.addDecoration(2000, 310, 'tree', 1.0);
        lb.addDecoration(2384, 310, 'bush', 1.1);
        lb.addDecoration(2768, 310, 'rock', 1.0);
        lb.addDecoration(3152, 310, 'flower', 1.0);
        lb.addDecoration(3536, 310, 'mushroom', 1.0);
        lb.addDecoration(3920, 310, 'tree', 0.9);
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

        bg.fillGradientStyle(0xff80ab, 0xff80ab, 0xfce4ec, 0xfce4ec, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=250){
            for(var s=0;s<80;s+=14){
                bg.fillStyle(s%28===0?0xff4444:0xffffff,1);
                bg.fillRect(i+80,h-80-s,16,14);
            }
            bg.fillStyle(0xff4444,1);
        }
        for(var i=80;i<LW;i+=180){
            var lc=[0xff69b4,0xff9800,0xffd700,0x00bcd4][Math.floor(i/180)%4];
            bg.fillStyle(0x888888,1); bg.fillRect(i,h-160,4,100);
            bg.fillStyle(lc,1); bg.fillCircle(i+2,h-160,24);
            bg.fillStyle(0xffffff,0.4); bg.fillCircle(i+2,h-160,10);
        }
        for(var i=0;i<LW;i+=300){
            bg.fillStyle(0xff80ab,0.7); bg.fillCircle(i+150,h-280,35);
            bg.fillStyle(0xffa0c0,0.6); bg.fillCircle(i+175,h-275,28);
            bg.fillStyle(0xff60a0,0.8); bg.fillCircle(i+130,h-275,25);
        }
        var spc=[0xff4081,0x7c4dff,0xffd700,0x00e676];
        for(var i=0;i<LW;i+=20){ bg.fillStyle(spc[Math.floor(i/20)%4],1); bg.fillRect(i+5,h-63,8,3); }

        bg.fillStyle(0x8d1b3d, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0xff4081, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
