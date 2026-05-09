class Cidade_7 extends BaseGameScene {
    constructor() {
        super('Cidade_7', { worldId: 'cidade', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 263, 132, 22, 0x795548);
        lb.addPlatform(617, 296, 145, 22, 0x6d4c41);
        lb.addPlatform(936, 242, 145, 22, 0x5d4037);
        lb.addPlatform(1171, 279, 127, 22, 0x795548);
        lb.addPlatform(1568, 207, 148, 22, 0x8d6e63);
        lb.addPlatform(1960, 327, 116, 22, 0x795548);
        lb.addPlatform(2128, 264, 126, 22, 0x6d4c41);
        lb.addPlatform(2632, 266, 114, 22, 0x5d4037);
        lb.addPlatform(2528, 269, 170, 22, 0x795548);
        lb.addPlatform(3160, 206, 111, 22, 0x8d6e63);
        lb.addPlatform(3540, 272, 141, 22, 0x795548);
        lb.addPlatform(3800, 288, 120, 22, 0x6d4c41);
        lb.addPlatform(3892, 226, 124, 22, 0x5d4037);
        lb.addPlatform(4115, 259, 113, 22, 0x795548);
        lb.addPlatform(4690, 224, 129, 22, 0x8d6e63);
        lb.addPlatform(5035, 281, 139, 22, 0x795548);
        lb.addPlatform(5032, 232, 144, 22, 0x6d4c41);
        lb.addPlatform(5703, 220, 117, 22, 0x5d4037);
        lb.addPlatform(5428, 306, 123, 22, 0x795548);
        lb.addPlatform(5847, 191, 151, 22, 0x8d6e63);
        lb.addPlatform(6920, 285, 112, 22, 0x795548);
        lb.addPlatform(7105, 309, 139, 22, 0x6d4c41);

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

        lb.addStar(616, 185);
        lb.addStar(1743, 186);
        lb.addStar(2766, 200);

        lb.addEnemy(474, 340, 'robot', 106);
        lb.addEnemy(1032, 340, 'bee', 171);
        lb.addEnemy(1536, 340, 'robot', 178);
        lb.addEnemy(2112, 340, 'bee', 139);
        lb.addEnemy(2690, 340, 'robot', 130);
        lb.addEnemy(3276, 340, 'bee', 144);

        lb.addHazard(543, h-80, 64, 20, 'spike');
        lb.addHazard(1111, h-80, 64, 20, 'lava');
        lb.addHazard(1779, h-80, 64, 20, 'spike');
        lb.addHazard(2366, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(418, 310, 'lamp', 1.0);
        lb.addDecoration(756, 310, 'bush', 1.0);
        lb.addDecoration(1094, 310, 'rock', 1.0);
        lb.addDecoration(1432, 310, 'tree', 1.1);
        lb.addDecoration(1770, 310, 'lamp', 1.0);
        lb.addDecoration(2108, 310, 'bush', 0.9);
        lb.addDecoration(2446, 310, 'rock', 1.0);
        lb.addDecoration(2784, 310, 'tree', 0.9);
        lb.addDecoration(3122, 310, 'lamp', 0.9);
        lb.addDecoration(3460, 310, 'bush', 0.9);
        lb.addDecoration(3798, 310, 'rock', 1.1);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'amigo', { name: 'Amigo', lines: ['Vamos jogar juntos depois, Miguel?', 'Você é o melhor!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
