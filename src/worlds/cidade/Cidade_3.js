class Cidade_3 extends BaseGameScene {
    constructor() {
        super('Cidade_3', { worldId: 'cidade', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 255, 142, 22, 0x795548);
        lb.addPlatform(579, 301, 162, 22, 0x6d4c41);
        lb.addPlatform(870, 240, 119, 22, 0x5d4037);
        lb.addPlatform(1141, 250, 142, 22, 0x795548);
        lb.addPlatform(1488, 199, 121, 22, 0x8d6e63);
        lb.addPlatform(1930, 299, 163, 22, 0x795548);
        lb.addPlatform(2116, 231, 127, 22, 0x6d4c41);
        lb.addPlatform(2611, 213, 111, 22, 0x5d4037);
        lb.addPlatform(2992, 270, 149, 22, 0x795548);
        lb.addPlatform(3241, 208, 167, 22, 0x8d6e63);
        lb.addPlatform(3570, 286, 154, 22, 0x795548);
        lb.addPlatform(3613, 325, 168, 22, 0x6d4c41);
        lb.addPlatform(3964, 254, 154, 22, 0x5d4037);
        lb.addPlatform(4050, 283, 120, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(604, 202);
        lb.addStar(1450, 187);
        lb.addStar(2352, 191);

        lb.addEnemy(447, 340, 'robot', 142);
        lb.addEnemy(1019, 340, 'bee', 176);
        lb.addEnemy(1548, 340, 'robot', 130);
        lb.addEnemy(2130, 340, 'bee', 174);



        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(356, 310, 'lamp', 0.9);
        lb.addDecoration(632, 310, 'bush', 0.8);
        lb.addDecoration(908, 310, 'rock', 0.8);
        lb.addDecoration(1184, 310, 'tree', 0.9);
        lb.addDecoration(1460, 310, 'lamp', 1.0);
        lb.addDecoration(1736, 310, 'bush', 1.1);
        lb.addDecoration(2012, 310, 'rock', 0.8);
        lb.addDecoration(2288, 310, 'tree', 0.9);
        lb.addDecoration(2564, 310, 'lamp', 0.9);
        lb.addDecoration(2840, 310, 'bush', 0.9);
        lb.addDecoration(3116, 310, 'rock', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
