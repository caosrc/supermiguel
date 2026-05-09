class Cidade_2 extends BaseGameScene {
    constructor() {
        super('Cidade_2', { worldId: 'cidade', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 260, 114, 22, 0x795548);
        lb.addPlatform(599, 283, 122, 22, 0x6d4c41);
        lb.addPlatform(868, 224, 144, 22, 0x5d4037);
        lb.addPlatform(1183, 293, 141, 22, 0x795548);
        lb.addPlatform(1544, 194, 154, 22, 0x8d6e63);
        lb.addPlatform(1740, 282, 164, 22, 0x795548);
        lb.addPlatform(2164, 257, 110, 22, 0x6d4c41);
        lb.addPlatform(2604, 221, 145, 22, 0x5d4037);
        lb.addPlatform(2896, 291, 129, 22, 0x795548);
        lb.addPlatform(3151, 195, 128, 22, 0x8d6e63);
        lb.addPlatform(3370, 253, 162, 22, 0x795548);
        lb.addPlatform(3899, 314, 149, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(566, 173);
        lb.addStar(1425, 178);
        lb.addStar(2293, 176);

        lb.addEnemy(405, 340, 'robot', 161);
        lb.addEnemy(965, 340, 'bee', 157);
        lb.addEnemy(1586, 340, 'robot', 156);
        lb.addEnemy(2109, 340, 'bee', 116);



        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(341, 310, 'lamp', 0.9);
        lb.addDecoration(602, 310, 'bush', 1.0);
        lb.addDecoration(863, 310, 'rock', 0.9);
        lb.addDecoration(1124, 310, 'tree', 1.0);
        lb.addDecoration(1385, 310, 'lamp', 1.0);
        lb.addDecoration(1646, 310, 'bush', 0.9);
        lb.addDecoration(1907, 310, 'rock', 0.9);
        lb.addDecoration(2168, 310, 'tree', 0.9);
        lb.addDecoration(2429, 310, 'lamp', 1.0);
        lb.addDecoration(2690, 310, 'bush', 1.1);
        lb.addDecoration(2951, 310, 'rock', 1.0);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
