class Cidade_8 extends BaseGameScene {
    constructor() {
        super('Cidade_8', { worldId: 'cidade', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 268, 152, 22, 0x795548);
        lb.addPlatform(577, 270, 139, 22, 0x6d4c41);
        lb.addPlatform(842, 262, 127, 22, 0x5d4037);
        lb.addPlatform(1132, 259, 168, 22, 0x795548);
        lb.addPlatform(1496, 204, 132, 22, 0x8d6e63);
        lb.addPlatform(1855, 305, 128, 22, 0x795548);
        lb.addPlatform(1960, 232, 125, 22, 0x6d4c41);
        lb.addPlatform(2289, 254, 150, 22, 0x5d4037);
        lb.addPlatform(2528, 308, 158, 22, 0x795548);
        lb.addPlatform(2890, 191, 119, 22, 0x8d6e63);
        lb.addPlatform(3440, 277, 166, 22, 0x795548);
        lb.addPlatform(3778, 271, 162, 22, 0x6d4c41);
        lb.addPlatform(3736, 241, 165, 22, 0x5d4037);
        lb.addPlatform(4674, 257, 164, 22, 0x795548);
        lb.addPlatform(4284, 191, 123, 22, 0x8d6e63);
        lb.addPlatform(5365, 330, 125, 22, 0x795548);
        lb.addPlatform(5096, 251, 138, 22, 0x6d4c41);
        lb.addPlatform(5720, 265, 128, 22, 0x5d4037);
        lb.addPlatform(6058, 285, 154, 22, 0x795548);
        lb.addPlatform(5657, 238, 160, 22, 0x8d6e63);
        lb.addPlatform(7020, 244, 138, 22, 0x795548);
        lb.addPlatform(7315, 275, 124, 22, 0x6d4c41);
        lb.addPlatform(7386, 212, 153, 22, 0x5d4037);
        lb.addPlatform(7939, 287, 112, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(386, 330);
        lb.addCoin(692, 330);
        lb.addCoin(998, 330);
        lb.addCoin(1304, 330);
        lb.addCoin(1610, 330);
        lb.addCoin(1916, 330);
        lb.addCoin(2222, 330);
        lb.addCoin(2528, 330);
        lb.addCoin(2834, 330);
        lb.addCoin(3140, 330);
        lb.addCoin(3446, 330);
        lb.addCoin(3752, 330);
        lb.addCoin(4058, 330);

        lb.addStar(578, 171);
        lb.addStar(1777, 177);
        lb.addStar(2921, 188);

        lb.addEnemy(425, 340, 'robot', 113);
        lb.addEnemy(1004, 340, 'bee', 111);
        lb.addEnemy(1576, 340, 'robot', 101);
        lb.addEnemy(2120, 340, 'bee', 167);
        lb.addEnemy(2644, 340, 'robot', 161);
        lb.addEnemy(3230, 340, 'bee', 103);
        lb.addEnemy(3791, 340, 'robot', 172);

        lb.addHazard(576, h-80, 64, 20, 'spike');
        lb.addHazard(1179, h-80, 64, 20, 'lava');
        lb.addHazard(1794, h-80, 64, 20, 'spike');
        lb.addHazard(2336, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(433, 310, 'lamp', 0.8);
        lb.addDecoration(786, 310, 'bush', 1.0);
        lb.addDecoration(1139, 310, 'rock', 0.9);
        lb.addDecoration(1492, 310, 'tree', 1.0);
        lb.addDecoration(1845, 310, 'lamp', 0.9);
        lb.addDecoration(2198, 310, 'bush', 1.0);
        lb.addDecoration(2551, 310, 'rock', 0.9);
        lb.addDecoration(2904, 310, 'tree', 1.0);
        lb.addDecoration(3257, 310, 'lamp', 0.8);
        lb.addDecoration(3610, 310, 'bush', 0.9);
        lb.addDecoration(3963, 310, 'rock', 0.9);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
