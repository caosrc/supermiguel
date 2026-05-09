class Doces_5 extends BaseGameScene {
    constructor() {
        super('Doces_5', { worldId: 'doces', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 231, 116, 22, 0x8d1b3d);
        lb.addPlatform(570, 327, 118, 22, 0x6d4c41);
        lb.addPlatform(926, 215, 133, 22, 0x5d4037);
        lb.addPlatform(1246, 262, 125, 22, 0x795548);
        lb.addPlatform(1508, 241, 114, 22, 0x8d6e63);
        lb.addPlatform(1820, 282, 167, 22, 0x8d1b3d);
        lb.addPlatform(2206, 238, 134, 22, 0x6d4c41);
        lb.addPlatform(2394, 246, 147, 22, 0x5d4037);
        lb.addPlatform(2616, 310, 129, 22, 0x795548);
        lb.addPlatform(2971, 196, 122, 22, 0x8d6e63);
        lb.addPlatform(3590, 259, 117, 22, 0x8d1b3d);
        lb.addPlatform(3866, 322, 122, 22, 0x6d4c41);
        lb.addPlatform(4324, 263, 118, 22, 0x5d4037);
        lb.addPlatform(3920, 308, 122, 22, 0x795548);
        lb.addPlatform(4396, 247, 125, 22, 0x8d6e63);
        lb.addPlatform(4615, 320, 143, 22, 0x8d1b3d);
        lb.addPlatform(4984, 268, 139, 22, 0x6d4c41);
        lb.addPlatform(5584, 223, 163, 22, 0x5d4037);

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

        lb.addStar(572, 185);
        lb.addStar(1642, 208);
        lb.addStar(2581, 186);

        lb.addEnemy(407, 340, 'slime', 116);
        lb.addEnemy(972, 340, 'bee', 138);
        lb.addEnemy(1549, 340, 'slime', 162);
        lb.addEnemy(2115, 340, 'bee', 129);
        lb.addEnemy(2687, 340, 'slime', 178);

        lb.addHazard(546, h-80, 64, 20, 'spike');
        lb.addHazard(1111, h-80, 64, 20, 'lava');
        lb.addHazard(1764, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(387, 310, 'bush', 1.0);
        lb.addDecoration(694, 310, 'rock', 1.1);
        lb.addDecoration(1001, 310, 'flower', 0.9);
        lb.addDecoration(1308, 310, 'mushroom', 0.9);
        lb.addDecoration(1615, 310, 'tree', 0.9);
        lb.addDecoration(1922, 310, 'bush', 1.0);
        lb.addDecoration(2229, 310, 'rock', 0.8);
        lb.addDecoration(2536, 310, 'flower', 0.9);
        lb.addDecoration(2843, 310, 'mushroom', 0.9);
        lb.addDecoration(3150, 310, 'tree', 1.0);
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
