class Doces_3 extends BaseGameScene {
    constructor() {
        super('Doces_3', { worldId: 'doces', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 246, 168, 22, 0x8d1b3d);
        lb.addPlatform(607, 279, 113, 22, 0x6d4c41);
        lb.addPlatform(954, 235, 122, 22, 0x5d4037);
        lb.addPlatform(1225, 309, 162, 22, 0x795548);
        lb.addPlatform(1616, 244, 111, 22, 0x8d6e63);
        lb.addPlatform(1805, 315, 124, 22, 0x8d1b3d);
        lb.addPlatform(2260, 277, 154, 22, 0x6d4c41);
        lb.addPlatform(2310, 218, 143, 22, 0x5d4037);
        lb.addPlatform(2736, 299, 111, 22, 0x795548);
        lb.addPlatform(3151, 245, 113, 22, 0x8d6e63);
        lb.addPlatform(3460, 255, 143, 22, 0x8d1b3d);
        lb.addPlatform(3800, 278, 155, 22, 0x6d4c41);
        lb.addPlatform(3712, 247, 138, 22, 0x5d4037);
        lb.addPlatform(4453, 254, 157, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(631, 186);
        lb.addStar(1518, 181);
        lb.addStar(2423, 194);

        lb.addEnemy(471, 340, 'slime', 122);
        lb.addEnemy(1011, 340, 'bee', 148);
        lb.addEnemy(1536, 340, 'slime', 157);
        lb.addEnemy(2084, 340, 'bee', 178);



        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(356, 310, 'bush', 0.8);
        lb.addDecoration(632, 310, 'rock', 0.9);
        lb.addDecoration(908, 310, 'flower', 1.0);
        lb.addDecoration(1184, 310, 'mushroom', 1.0);
        lb.addDecoration(1460, 310, 'tree', 0.9);
        lb.addDecoration(1736, 310, 'bush', 1.0);
        lb.addDecoration(2012, 310, 'rock', 1.1);
        lb.addDecoration(2288, 310, 'flower', 0.9);
        lb.addDecoration(2564, 310, 'mushroom', 1.0);
        lb.addDecoration(2840, 310, 'tree', 1.0);
        lb.addDecoration(3116, 310, 'bush', 1.0);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
