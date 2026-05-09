class Cidade_9 extends BaseGameScene {
    constructor() {
        super('Cidade_9', { worldId: 'cidade', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 255, 159, 22, 0x795548);
        lb.addPlatform(598, 314, 110, 22, 0x6d4c41);
        lb.addPlatform(926, 215, 157, 22, 0x5d4037);
        lb.addPlatform(1138, 261, 169, 22, 0x795548);
        lb.addPlatform(1608, 196, 160, 22, 0x8d6e63);
        lb.addPlatform(1815, 300, 153, 22, 0x795548);
        lb.addPlatform(2320, 263, 160, 22, 0x6d4c41);
        lb.addPlatform(2282, 213, 116, 22, 0x5d4037);
        lb.addPlatform(2840, 286, 128, 22, 0x795548);
        lb.addPlatform(2998, 197, 141, 22, 0x8d6e63);
        lb.addPlatform(3660, 242, 154, 22, 0x795548);
        lb.addPlatform(3877, 311, 151, 22, 0x6d4c41);
        lb.addPlatform(4240, 268, 141, 22, 0x5d4037);
        lb.addPlatform(4596, 269, 165, 22, 0x795548);
        lb.addPlatform(4648, 247, 155, 22, 0x8d6e63);
        lb.addPlatform(4675, 326, 140, 22, 0x795548);
        lb.addPlatform(4936, 237, 111, 22, 0x6d4c41);
        lb.addPlatform(5788, 243, 148, 22, 0x5d4037);
        lb.addPlatform(5518, 299, 141, 22, 0x795548);
        lb.addPlatform(6455, 227, 170, 22, 0x8d6e63);
        lb.addPlatform(6480, 276, 159, 22, 0x795548);
        lb.addPlatform(7231, 289, 167, 22, 0x6d4c41);
        lb.addPlatform(6814, 244, 165, 22, 0x5d4037);
        lb.addPlatform(7709, 258, 155, 22, 0x795548);
        lb.addPlatform(8224, 249, 114, 22, 0x8d6e63);
        lb.addPlatform(7855, 280, 162, 22, 0x795548);

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

        lb.addStar(603, 209);
        lb.addStar(1756, 184);
        lb.addStar(2967, 196);

        lb.addEnemy(421, 340, 'robot', 146);
        lb.addEnemy(984, 340, 'bee', 115);
        lb.addEnemy(1547, 340, 'robot', 127);
        lb.addEnemy(2087, 340, 'bee', 119);
        lb.addEnemy(2688, 340, 'robot', 132);
        lb.addEnemy(3250, 340, 'bee', 163);
        lb.addEnemy(3797, 340, 'robot', 162);

        lb.addHazard(550, h-80, 64, 20, 'spike');
        lb.addHazard(1157, h-80, 64, 20, 'lava');
        lb.addHazard(1781, h-80, 64, 20, 'spike');
        lb.addHazard(2331, h-80, 64, 20, 'lava');
        lb.addHazard(2946, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(449, 310, 'lamp', 0.9);
        lb.addDecoration(818, 310, 'bush', 1.0);
        lb.addDecoration(1187, 310, 'rock', 0.8);
        lb.addDecoration(1556, 310, 'tree', 1.0);
        lb.addDecoration(1925, 310, 'lamp', 0.8);
        lb.addDecoration(2294, 310, 'bush', 1.1);
        lb.addDecoration(2663, 310, 'rock', 0.9);
        lb.addDecoration(3032, 310, 'tree', 1.0);
        lb.addDecoration(3401, 310, 'lamp', 0.8);
        lb.addDecoration(3770, 310, 'bush', 1.1);
        lb.addDecoration(4139, 310, 'rock', 0.8);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'professora', { name: 'Professora', lines: ['Muito bem, Miguel! Continue aprendendo!', 'A educação é o maior tesouro!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
