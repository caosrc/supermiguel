class Cidade_5 extends BaseGameScene {
    constructor() {
        super('Cidade_5', { worldId: 'cidade', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 282, 120, 22, 0x795548);
        lb.addPlatform(589, 304, 129, 22, 0x6d4c41);
        lb.addPlatform(932, 264, 157, 22, 0x5d4037);
        lb.addPlatform(1192, 263, 112, 22, 0x795548);
        lb.addPlatform(1540, 247, 116, 22, 0x8d6e63);
        lb.addPlatform(1795, 289, 161, 22, 0x795548);
        lb.addPlatform(2110, 289, 159, 22, 0x6d4c41);
        lb.addPlatform(2352, 246, 155, 22, 0x5d4037);
        lb.addPlatform(2984, 258, 116, 22, 0x795548);
        lb.addPlatform(3088, 192, 119, 22, 0x8d6e63);
        lb.addPlatform(3670, 280, 117, 22, 0x795548);
        lb.addPlatform(3811, 277, 117, 22, 0x6d4c41);
        lb.addPlatform(4108, 259, 157, 22, 0x5d4037);
        lb.addPlatform(4609, 270, 169, 22, 0x795548);
        lb.addPlatform(4326, 206, 133, 22, 0x8d6e63);
        lb.addPlatform(5230, 296, 125, 22, 0x795548);
        lb.addPlatform(4888, 260, 118, 22, 0x6d4c41);
        lb.addPlatform(5907, 261, 142, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(637, 198);
        lb.addStar(1568, 187);
        lb.addStar(2644, 184);

        lb.addEnemy(449, 340, 'robot', 100);
        lb.addEnemy(1039, 340, 'bee', 131);
        lb.addEnemy(1552, 340, 'robot', 107);
        lb.addEnemy(2139, 340, 'bee', 146);
        lb.addEnemy(2681, 340, 'robot', 133);

        lb.addHazard(566, h-80, 64, 20, 'spike');
        lb.addHazard(1160, h-80, 64, 20, 'lava');
        lb.addHazard(1726, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.1);
        lb.addDecoration(387, 310, 'lamp', 0.8);
        lb.addDecoration(694, 310, 'bush', 1.1);
        lb.addDecoration(1001, 310, 'rock', 1.1);
        lb.addDecoration(1308, 310, 'tree', 0.9);
        lb.addDecoration(1615, 310, 'lamp', 1.0);
        lb.addDecoration(1922, 310, 'bush', 0.9);
        lb.addDecoration(2229, 310, 'rock', 1.0);
        lb.addDecoration(2536, 310, 'tree', 1.0);
        lb.addDecoration(2843, 310, 'lamp', 1.1);
        lb.addDecoration(3150, 310, 'bush', 1.0);
        lb.addDecoration(3457, 310, 'rock', 1.0);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
