class Cidade_10 extends BaseGameScene {
    constructor() {
        super('Cidade_10', { worldId: 'cidade', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 257, 157, 22, 0x795548);
        lb.addPlatform(574, 324, 129, 22, 0x6d4c41);
        lb.addPlatform(840, 214, 169, 22, 0x5d4037);
        lb.addPlatform(1234, 265, 143, 22, 0x795548);
        lb.addPlatform(1468, 231, 122, 22, 0x8d6e63);
        lb.addPlatform(1860, 327, 150, 22, 0x795548);
        lb.addPlatform(2260, 282, 163, 22, 0x6d4c41);
        lb.addPlatform(2422, 252, 164, 22, 0x5d4037);
        lb.addPlatform(2560, 280, 130, 22, 0x795548);
        lb.addPlatform(3259, 198, 163, 22, 0x8d6e63);
        lb.addPlatform(3570, 264, 130, 22, 0x795548);
        lb.addPlatform(3580, 319, 136, 22, 0x6d4c41);
        lb.addPlatform(4060, 214, 128, 22, 0x5d4037);
        lb.addPlatform(4128, 286, 119, 22, 0x795548);
        lb.addPlatform(4200, 219, 170, 22, 0x8d6e63);
        lb.addPlatform(4495, 290, 142, 22, 0x795548);
        lb.addPlatform(5320, 269, 135, 22, 0x6d4c41);
        lb.addPlatform(6043, 227, 151, 22, 0x5d4037);
        lb.addPlatform(5896, 309, 118, 22, 0x795548);
        lb.addPlatform(6550, 197, 119, 22, 0x8d6e63);
        lb.addPlatform(6220, 254, 142, 22, 0x795548);
        lb.addPlatform(7252, 299, 117, 22, 0x6d4c41);
        lb.addPlatform(7056, 241, 131, 22, 0x5d4037);
        lb.addPlatform(8077, 295, 146, 22, 0x795548);
        lb.addPlatform(7648, 192, 123, 22, 0x8d6e63);
        lb.addPlatform(7480, 278, 164, 22, 0x795548);
        lb.addPlatform(7924, 276, 159, 22, 0x6d4c41);
        lb.addPlatform(8353, 224, 157, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(374, 330);
        lb.addCoin(668, 330);
        lb.addCoin(962, 330);
        lb.addCoin(1256, 330);
        lb.addCoin(1550, 330);
        lb.addCoin(1844, 330);
        lb.addCoin(2138, 330);
        lb.addCoin(2432, 330);
        lb.addCoin(2726, 330);
        lb.addCoin(3020, 330);
        lb.addCoin(3314, 330);
        lb.addCoin(3608, 330);
        lb.addCoin(3902, 330);
        lb.addCoin(4196, 330);
        lb.addCoin(4490, 330);

        lb.addStar(623, 209);
        lb.addStar(1893, 183);
        lb.addStar(3106, 176);

        lb.addEnemy(417, 340, 'robot', 167);
        lb.addEnemy(980, 340, 'bee', 161);
        lb.addEnemy(1557, 340, 'robot', 135);
        lb.addEnemy(2133, 340, 'bee', 101);
        lb.addEnemy(2688, 340, 'robot', 164);
        lb.addEnemy(3222, 340, 'bee', 166);
        lb.addEnemy(3830, 340, 'robot', 166);
        lb.addEnemy(4332, 340, 'bee', 130);

        lb.addHazard(600, h-80, 64, 20, 'spike');
        lb.addHazard(1102, h-80, 64, 20, 'lava');
        lb.addHazard(1712, h-80, 64, 20, 'spike');
        lb.addHazard(2352, h-80, 64, 20, 'lava');
        lb.addHazard(2907, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(464, 310, 'lamp', 1.1);
        lb.addDecoration(848, 310, 'bush', 0.8);
        lb.addDecoration(1232, 310, 'rock', 1.0);
        lb.addDecoration(1616, 310, 'tree', 1.0);
        lb.addDecoration(2000, 310, 'lamp', 1.0);
        lb.addDecoration(2384, 310, 'bush', 1.1);
        lb.addDecoration(2768, 310, 'rock', 1.0);
        lb.addDecoration(3152, 310, 'tree', 0.8);
        lb.addDecoration(3536, 310, 'lamp', 0.9);
        lb.addDecoration(3920, 310, 'bush', 1.0);
        lb.addDecoration(4304, 310, 'rock', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
