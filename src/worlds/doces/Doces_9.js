class Doces_9 extends BaseGameScene {
    constructor() {
        super('Doces_9', { worldId: 'doces', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 247, 146, 22, 0x8d1b3d);
        lb.addPlatform(595, 286, 138, 22, 0x6d4c41);
        lb.addPlatform(922, 254, 128, 22, 0x5d4037);
        lb.addPlatform(1192, 306, 115, 22, 0x795548);
        lb.addPlatform(1584, 200, 119, 22, 0x8d6e63);
        lb.addPlatform(1980, 325, 153, 22, 0x8d1b3d);
        lb.addPlatform(2056, 251, 137, 22, 0x6d4c41);
        lb.addPlatform(2569, 230, 160, 22, 0x5d4037);
        lb.addPlatform(2880, 257, 166, 22, 0x795548);
        lb.addPlatform(2971, 204, 150, 22, 0x8d6e63);
        lb.addPlatform(3520, 265, 140, 22, 0x8d1b3d);
        lb.addPlatform(3679, 307, 111, 22, 0x6d4c41);
        lb.addPlatform(4276, 235, 127, 22, 0x5d4037);
        lb.addPlatform(4375, 254, 152, 22, 0x795548);
        lb.addPlatform(4312, 221, 145, 22, 0x8d6e63);
        lb.addPlatform(5140, 298, 158, 22, 0x8d1b3d);
        lb.addPlatform(5304, 264, 141, 22, 0x6d4c41);
        lb.addPlatform(6026, 268, 137, 22, 0x5d4037);
        lb.addPlatform(6202, 296, 112, 22, 0x795548);
        lb.addPlatform(5790, 221, 146, 22, 0x8d6e63);
        lb.addPlatform(6320, 259, 119, 22, 0x8d1b3d);
        lb.addPlatform(6979, 330, 140, 22, 0x6d4c41);
        lb.addPlatform(6968, 265, 113, 22, 0x5d4037);
        lb.addPlatform(6743, 266, 110, 22, 0x795548);
        lb.addPlatform(7288, 216, 133, 22, 0x8d6e63);
        lb.addPlatform(8630, 315, 152, 22, 0x8d1b3d);

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

        lb.addStar(550, 193);
        lb.addStar(1762, 202);
        lb.addStar(2962, 193);

        lb.addEnemy(471, 340, 'slime', 129);
        lb.addEnemy(961, 340, 'bee', 177);
        lb.addEnemy(1574, 340, 'slime', 123);
        lb.addEnemy(2094, 340, 'bee', 150);
        lb.addEnemy(2685, 340, 'slime', 163);
        lb.addEnemy(3237, 340, 'bee', 126);
        lb.addEnemy(3774, 340, 'slime', 123);

        lb.addHazard(513, h-80, 64, 20, 'spike');
        lb.addHazard(1171, h-80, 64, 20, 'lava');
        lb.addHazard(1783, h-80, 64, 20, 'spike');
        lb.addHazard(2335, h-80, 64, 20, 'lava');
        lb.addHazard(2931, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(449, 310, 'bush', 1.1);
        lb.addDecoration(818, 310, 'rock', 1.0);
        lb.addDecoration(1187, 310, 'flower', 1.0);
        lb.addDecoration(1556, 310, 'mushroom', 0.9);
        lb.addDecoration(1925, 310, 'tree', 1.0);
        lb.addDecoration(2294, 310, 'bush', 0.9);
        lb.addDecoration(2663, 310, 'rock', 0.9);
        lb.addDecoration(3032, 310, 'flower', 0.8);
        lb.addDecoration(3401, 310, 'mushroom', 0.9);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 1.1);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'pirata', { name: 'Pirata', lines: ['Yo ho ho! Vamos à aventura, Miguel!', 'Tesouros aguardam no horizonte!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
