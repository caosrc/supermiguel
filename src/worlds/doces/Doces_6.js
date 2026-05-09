class Doces_6 extends BaseGameScene {
    constructor() {
        super('Doces_6', { worldId: 'doces', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 264, 170, 22, 0x8d1b3d);
        lb.addPlatform(570, 318, 122, 22, 0x6d4c41);
        lb.addPlatform(902, 263, 148, 22, 0x5d4037);
        lb.addPlatform(1207, 296, 155, 22, 0x795548);
        lb.addPlatform(1500, 202, 145, 22, 0x8d6e63);
        lb.addPlatform(1740, 315, 121, 22, 0x8d1b3d);
        lb.addPlatform(2092, 247, 147, 22, 0x6d4c41);
        lb.addPlatform(2632, 237, 157, 22, 0x5d4037);
        lb.addPlatform(2728, 256, 126, 22, 0x795548);
        lb.addPlatform(3178, 224, 170, 22, 0x8d6e63);
        lb.addPlatform(3460, 247, 147, 22, 0x8d1b3d);
        lb.addPlatform(3503, 287, 153, 22, 0x6d4c41);
        lb.addPlatform(3892, 240, 123, 22, 0x5d4037);
        lb.addPlatform(4596, 302, 124, 22, 0x795548);
        lb.addPlatform(4592, 212, 120, 22, 0x8d6e63);
        lb.addPlatform(5335, 278, 156, 22, 0x8d1b3d);
        lb.addPlatform(5624, 269, 126, 22, 0x6d4c41);
        lb.addPlatform(5754, 251, 125, 22, 0x5d4037);
        lb.addPlatform(5644, 307, 131, 22, 0x795548);
        lb.addPlatform(6056, 210, 161, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(403, 330);
        lb.addCoin(726, 330);
        lb.addCoin(1049, 330);
        lb.addCoin(1372, 330);
        lb.addCoin(1695, 330);
        lb.addCoin(2018, 330);
        lb.addCoin(2341, 330);
        lb.addCoin(2664, 330);
        lb.addCoin(2987, 330);
        lb.addCoin(3310, 330);
        lb.addCoin(3633, 330);

        lb.addStar(619, 194);
        lb.addStar(1623, 196);
        lb.addStar(2691, 179);

        lb.addEnemy(467, 340, 'slime', 112);
        lb.addEnemy(961, 340, 'bee', 106);
        lb.addEnemy(1586, 340, 'slime', 114);
        lb.addEnemy(2103, 340, 'bee', 146);
        lb.addEnemy(2676, 340, 'slime', 143);
        lb.addEnemy(3210, 340, 'bee', 169);

        lb.addHazard(553, h-80, 64, 20, 'spike');
        lb.addHazard(1149, h-80, 64, 20, 'lava');
        lb.addHazard(1754, h-80, 64, 20, 'spike');
        lb.addHazard(2400, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 1.0);
        lb.addDecoration(726, 310, 'rock', 0.8);
        lb.addDecoration(1049, 310, 'flower', 0.8);
        lb.addDecoration(1372, 310, 'mushroom', 0.9);
        lb.addDecoration(1695, 310, 'tree', 1.0);
        lb.addDecoration(2018, 310, 'bush', 0.9);
        lb.addDecoration(2341, 310, 'rock', 0.8);
        lb.addDecoration(2664, 310, 'flower', 0.9);
        lb.addDecoration(2987, 310, 'mushroom', 1.0);
        lb.addDecoration(3310, 310, 'tree', 1.0);
        lb.addDecoration(3633, 310, 'bush', 0.8);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
