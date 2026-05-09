class Doces_7 extends BaseGameScene {
    constructor() {
        super('Doces_7', { worldId: 'doces', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 246, 127, 22, 0x8d1b3d);
        lb.addPlatform(603, 298, 143, 22, 0x6d4c41);
        lb.addPlatform(928, 232, 138, 22, 0x5d4037);
        lb.addPlatform(1192, 303, 165, 22, 0x795548);
        lb.addPlatform(1580, 229, 157, 22, 0x8d6e63);
        lb.addPlatform(1970, 279, 127, 22, 0x8d1b3d);
        lb.addPlatform(2044, 255, 127, 22, 0x6d4c41);
        lb.addPlatform(2261, 267, 135, 22, 0x5d4037);
        lb.addPlatform(2888, 305, 147, 22, 0x795548);
        lb.addPlatform(3106, 196, 142, 22, 0x8d6e63);
        lb.addPlatform(3580, 278, 119, 22, 0x8d1b3d);
        lb.addPlatform(3569, 304, 155, 22, 0x6d4c41);
        lb.addPlatform(4000, 270, 126, 22, 0x5d4037);
        lb.addPlatform(4479, 292, 157, 22, 0x795548);
        lb.addPlatform(4564, 233, 164, 22, 0x8d6e63);
        lb.addPlatform(4660, 295, 118, 22, 0x8d1b3d);
        lb.addPlatform(4824, 243, 117, 22, 0x6d4c41);
        lb.addPlatform(5108, 231, 162, 22, 0x5d4037);
        lb.addPlatform(5770, 308, 165, 22, 0x795548);
        lb.addPlatform(5790, 205, 127, 22, 0x8d6e63);
        lb.addPlatform(6880, 242, 169, 22, 0x8d1b3d);
        lb.addPlatform(7357, 277, 158, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(601, 173);
        lb.addStar(1745, 208);
        lb.addStar(2842, 194);

        lb.addEnemy(421, 340, 'slime', 162);
        lb.addEnemy(961, 340, 'bee', 131);
        lb.addEnemy(1574, 340, 'slime', 110);
        lb.addEnemy(2159, 340, 'bee', 160);
        lb.addEnemy(2697, 340, 'slime', 112);
        lb.addEnemy(3201, 340, 'bee', 116);

        lb.addHazard(550, h-80, 64, 20, 'spike');
        lb.addHazard(1120, h-80, 64, 20, 'lava');
        lb.addHazard(1791, h-80, 64, 20, 'spike');
        lb.addHazard(2355, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(418, 310, 'bush', 0.9);
        lb.addDecoration(756, 310, 'rock', 1.1);
        lb.addDecoration(1094, 310, 'flower', 1.0);
        lb.addDecoration(1432, 310, 'mushroom', 0.8);
        lb.addDecoration(1770, 310, 'tree', 0.8);
        lb.addDecoration(2108, 310, 'bush', 1.0);
        lb.addDecoration(2446, 310, 'rock', 1.1);
        lb.addDecoration(2784, 310, 'flower', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 0.9);
        lb.addDecoration(3460, 310, 'tree', 1.0);
        lb.addDecoration(3798, 310, 'bush', 1.0);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
