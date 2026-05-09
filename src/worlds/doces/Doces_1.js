class Doces_1 extends BaseGameScene {
    constructor() {
        super('Doces_1', { worldId: 'doces', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8d1b3d, 60);

        lb.addPlatform(280, 237, 160, 22, 0x8d1b3d);
        lb.addPlatform(563, 310, 124, 22, 0x6d4c41);
        lb.addPlatform(924, 244, 156, 22, 0x5d4037);
        lb.addPlatform(1219, 309, 142, 22, 0x795548);
        lb.addPlatform(1612, 203, 164, 22, 0x8d6e63);
        lb.addPlatform(1805, 311, 112, 22, 0x8d1b3d);
        lb.addPlatform(2224, 231, 140, 22, 0x6d4c41);
        lb.addPlatform(2380, 214, 148, 22, 0x5d4037);
        lb.addPlatform(2544, 309, 156, 22, 0x795548);
        lb.addPlatform(3052, 221, 122, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(575, 185);
        lb.addStar(1389, 193);
        lb.addStar(2175, 170);

        lb.addEnemy(445, 340, 'slime', 134);
        lb.addEnemy(1034, 340, 'bee', 115);
        lb.addEnemy(1564, 340, 'slime', 161);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(326, 310, 'bush', 1.0);
        lb.addDecoration(572, 310, 'rock', 0.8);
        lb.addDecoration(818, 310, 'flower', 1.0);
        lb.addDecoration(1064, 310, 'mushroom', 0.9);
        lb.addDecoration(1310, 310, 'tree', 0.9);
        lb.addDecoration(1556, 310, 'bush', 0.8);
        lb.addDecoration(1802, 310, 'rock', 1.1);
        lb.addDecoration(2048, 310, 'flower', 1.0);
        lb.addDecoration(2294, 310, 'mushroom', 0.8);
        lb.addDecoration(2540, 310, 'tree', 1.0);
        lb.addDecoration(2786, 310, 'bush', 0.8);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
