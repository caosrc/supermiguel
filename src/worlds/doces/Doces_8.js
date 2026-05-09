class Doces_8 extends BaseGameScene {
    constructor() {
        super('Doces_8', { worldId: 'doces', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 269, 161, 22, 0x8d1b3d);
        lb.addPlatform(570, 289, 110, 22, 0x6d4c41);
        lb.addPlatform(840, 238, 145, 22, 0x5d4037);
        lb.addPlatform(1240, 283, 159, 22, 0x795548);
        lb.addPlatform(1444, 225, 149, 22, 0x8d6e63);
        lb.addPlatform(1880, 310, 163, 22, 0x8d1b3d);
        lb.addPlatform(2122, 284, 147, 22, 0x6d4c41);
        lb.addPlatform(2639, 266, 142, 22, 0x5d4037);
        lb.addPlatform(2896, 269, 132, 22, 0x795548);
        lb.addPlatform(3115, 192, 143, 22, 0x8d6e63);
        lb.addPlatform(3360, 233, 114, 22, 0x8d1b3d);
        lb.addPlatform(3580, 280, 137, 22, 0x6d4c41);
        lb.addPlatform(3664, 254, 110, 22, 0x5d4037);
        lb.addPlatform(4687, 296, 158, 22, 0x795548);
        lb.addPlatform(4368, 200, 150, 22, 0x8d6e63);
        lb.addPlatform(5380, 322, 123, 22, 0x8d1b3d);
        lb.addPlatform(5240, 246, 137, 22, 0x6d4c41);
        lb.addPlatform(6009, 251, 146, 22, 0x5d4037);
        lb.addPlatform(5536, 310, 157, 22, 0x795548);
        lb.addPlatform(5847, 190, 163, 22, 0x8d6e63);
        lb.addPlatform(6840, 282, 142, 22, 0x8d1b3d);
        lb.addPlatform(7273, 292, 169, 22, 0x6d4c41);
        lb.addPlatform(6550, 214, 129, 22, 0x5d4037);
        lb.addPlatform(7157, 285, 157, 22, 0x795548);

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

        lb.addStar(635, 209);
        lb.addStar(1721, 204);
        lb.addStar(2868, 209);

        lb.addEnemy(401, 340, 'slime', 174);
        lb.addEnemy(984, 340, 'bee', 176);
        lb.addEnemy(1588, 340, 'slime', 129);
        lb.addEnemy(2138, 340, 'bee', 104);
        lb.addEnemy(2661, 340, 'slime', 161);
        lb.addEnemy(3219, 340, 'bee', 119);
        lb.addEnemy(3804, 340, 'slime', 157);

        lb.addHazard(559, h-80, 64, 20, 'spike');
        lb.addHazard(1118, h-80, 64, 20, 'lava');
        lb.addHazard(1729, h-80, 64, 20, 'spike');
        lb.addHazard(2378, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(433, 310, 'bush', 0.9);
        lb.addDecoration(786, 310, 'rock', 0.8);
        lb.addDecoration(1139, 310, 'flower', 0.9);
        lb.addDecoration(1492, 310, 'mushroom', 1.1);
        lb.addDecoration(1845, 310, 'tree', 1.0);
        lb.addDecoration(2198, 310, 'bush', 0.8);
        lb.addDecoration(2551, 310, 'rock', 1.0);
        lb.addDecoration(2904, 310, 'flower', 0.9);
        lb.addDecoration(3257, 310, 'mushroom', 0.9);
        lb.addDecoration(3610, 310, 'tree', 0.9);
        lb.addDecoration(3963, 310, 'bush', 0.9);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
