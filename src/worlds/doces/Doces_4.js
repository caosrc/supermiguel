class Doces_4 extends BaseGameScene {
    constructor() {
        super('Doces_4', { worldId: 'doces', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 233, 159, 22, 0x8d1b3d);
        lb.addPlatform(576, 321, 134, 22, 0x6d4c41);
        lb.addPlatform(874, 248, 150, 22, 0x5d4037);
        lb.addPlatform(1186, 287, 119, 22, 0x795548);
        lb.addPlatform(1412, 201, 141, 22, 0x8d6e63);
        lb.addPlatform(1810, 300, 157, 22, 0x8d1b3d);
        lb.addPlatform(2212, 231, 125, 22, 0x6d4c41);
        lb.addPlatform(2352, 224, 137, 22, 0x5d4037);
        lb.addPlatform(2808, 257, 136, 22, 0x795548);
        lb.addPlatform(3097, 209, 114, 22, 0x8d6e63);
        lb.addPlatform(3090, 254, 144, 22, 0x8d1b3d);
        lb.addPlatform(3899, 279, 165, 22, 0x6d4c41);
        lb.addPlatform(4012, 261, 124, 22, 0x5d4037);
        lb.addPlatform(4596, 255, 114, 22, 0x795548);
        lb.addPlatform(4550, 205, 150, 22, 0x8d6e63);
        lb.addPlatform(5305, 329, 155, 22, 0x8d1b3d);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(561, 192);
        lb.addStar(1510, 201);
        lb.addStar(2509, 202);

        lb.addEnemy(403, 340, 'slime', 178);
        lb.addEnemy(987, 340, 'bee', 105);
        lb.addEnemy(1527, 340, 'slime', 153);
        lb.addEnemy(2120, 340, 'bee', 142);
        lb.addEnemy(2711, 340, 'slime', 159);

        lb.addHazard(549, h-80, 64, 20, 'spike');
        lb.addHazard(1131, h-80, 64, 20, 'lava');
        lb.addHazard(1739, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(372, 310, 'bush', 1.1);
        lb.addDecoration(664, 310, 'rock', 0.9);
        lb.addDecoration(956, 310, 'flower', 1.0);
        lb.addDecoration(1248, 310, 'mushroom', 0.9);
        lb.addDecoration(1540, 310, 'tree', 0.8);
        lb.addDecoration(1832, 310, 'bush', 1.1);
        lb.addDecoration(2124, 310, 'rock', 1.1);
        lb.addDecoration(2416, 310, 'flower', 1.0);
        lb.addDecoration(2708, 310, 'mushroom', 1.0);
        lb.addDecoration(3000, 310, 'tree', 0.9);
        lb.addDecoration(3292, 310, 'bush', 1.1);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'pirata', { name: 'Pirata', lines: ['Yo ho ho! Vamos à aventura, Miguel!', 'Tesouros aguardam no horizonte!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
