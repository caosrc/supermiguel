class Doces_2 extends BaseGameScene {
    constructor() {
        super('Doces_2', { worldId: 'doces', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 271, 132, 22, 0x8d1b3d);
        lb.addPlatform(589, 306, 153, 22, 0x6d4c41);
        lb.addPlatform(900, 217, 126, 22, 0x5d4037);
        lb.addPlatform(1147, 306, 117, 22, 0x795548);
        lb.addPlatform(1608, 235, 118, 22, 0x8d6e63);
        lb.addPlatform(1980, 298, 150, 22, 0x8d1b3d);
        lb.addPlatform(2050, 236, 115, 22, 0x6d4c41);
        lb.addPlatform(2590, 247, 147, 22, 0x5d4037);
        lb.addPlatform(2784, 255, 150, 22, 0x795548);
        lb.addPlatform(2971, 204, 161, 22, 0x8d6e63);
        lb.addPlatform(3520, 264, 128, 22, 0x8d1b3d);
        lb.addPlatform(3723, 300, 144, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(610, 183);
        lb.addStar(1408, 181);
        lb.addStar(2302, 173);

        lb.addEnemy(441, 340, 'slime', 169);
        lb.addEnemy(1002, 340, 'bee', 109);
        lb.addEnemy(1527, 340, 'slime', 170);
        lb.addEnemy(2158, 340, 'bee', 158);



        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(341, 310, 'bush', 0.9);
        lb.addDecoration(602, 310, 'rock', 1.0);
        lb.addDecoration(863, 310, 'flower', 0.9);
        lb.addDecoration(1124, 310, 'mushroom', 0.9);
        lb.addDecoration(1385, 310, 'tree', 1.0);
        lb.addDecoration(1646, 310, 'bush', 0.9);
        lb.addDecoration(1907, 310, 'rock', 0.9);
        lb.addDecoration(2168, 310, 'flower', 0.8);
        lb.addDecoration(2429, 310, 'mushroom', 0.9);
        lb.addDecoration(2690, 310, 'tree', 0.9);
        lb.addDecoration(2951, 310, 'bush', 0.8);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
