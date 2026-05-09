class Cidade_1 extends BaseGameScene {
    constructor() {
        super('Cidade_1', { worldId: 'cidade', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 283, 166, 22, 0x795548);
        lb.addPlatform(616, 310, 133, 22, 0x6d4c41);
        lb.addPlatform(886, 253, 139, 22, 0x5d4037);
        lb.addPlatform(1183, 276, 169, 22, 0x795548);
        lb.addPlatform(1512, 208, 145, 22, 0x8d6e63);
        lb.addPlatform(1895, 312, 160, 22, 0x795548);
        lb.addPlatform(2194, 282, 133, 22, 0x6d4c41);
        lb.addPlatform(2457, 239, 150, 22, 0x5d4037);
        lb.addPlatform(2816, 283, 146, 22, 0x795548);
        lb.addPlatform(3097, 205, 143, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(564, 199);
        lb.addStar(1425, 172);
        lb.addStar(2214, 192);

        lb.addEnemy(434, 340, 'robot', 120);
        lb.addEnemy(1033, 340, 'bee', 135);
        lb.addEnemy(1542, 340, 'robot', 105);



        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(326, 310, 'lamp', 0.9);
        lb.addDecoration(572, 310, 'bush', 1.0);
        lb.addDecoration(818, 310, 'rock', 1.1);
        lb.addDecoration(1064, 310, 'tree', 0.9);
        lb.addDecoration(1310, 310, 'lamp', 1.0);
        lb.addDecoration(1556, 310, 'bush', 0.9);
        lb.addDecoration(1802, 310, 'rock', 1.1);
        lb.addDecoration(2048, 310, 'tree', 0.9);
        lb.addDecoration(2294, 310, 'lamp', 0.9);
        lb.addDecoration(2540, 310, 'bush', 1.1);
        lb.addDecoration(2786, 310, 'rock', 0.9);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xc5e8ff, 0xc5e8ff, 1);
        bg.fillRect(0, 0, LW, h);
        const bldgs = [{x:200,bh:120,c:0xe8c07a},{x:600,bh:160,c:0xadd8e6},{x:1200,bh:140,c:0xffffe0},{x:1800,bh:180,c:0xf5deb3},{x:2400,bh:130,c:0xe8c07a},{x:2900,bh:150,c:0xadd8e6}];
        bldgs.forEach(function(b) {
            bg.fillStyle(b.c, 1); bg.fillRect(b.x, h-60-b.bh, 80, b.bh);
            bg.fillStyle(0x8b4513,1); bg.fillTriangle(b.x-10,h-60-b.bh,b.x+40,h-60-b.bh-30,b.x+90,h-60-b.bh);
            bg.fillStyle(0xfff9c4,1);
            for(var wy=0;wy<b.bh-20;wy+=28){ for(var wx=0;wx<60;wx+=22){ bg.fillRect(b.x+10+wx,h-60-b.bh+10+wy,12,16); } }
        });
        bg.fillStyle(0x555555,1); bg.fillRect(0,h-65,LW,10);
        bg.fillStyle(0xffffff,1);
        for(var i=0;i<LW;i+=80){ bg.fillRect(i+10,h-61,40,4); }

        bg.fillStyle(0x795548, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x4caf50, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
