class Cidade_6 extends BaseGameScene {
    constructor() {
        super('Cidade_6', { worldId: 'cidade', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 267, 116, 22, 0x795548);
        lb.addPlatform(591, 327, 112, 22, 0x6d4c41);
        lb.addPlatform(854, 246, 148, 22, 0x5d4037);
        lb.addPlatform(1231, 282, 138, 22, 0x795548);
        lb.addPlatform(1580, 210, 143, 22, 0x8d6e63);
        lb.addPlatform(1685, 294, 136, 22, 0x795548);
        lb.addPlatform(2038, 247, 117, 22, 0x6d4c41);
        lb.addPlatform(2303, 212, 154, 22, 0x5d4037);
        lb.addPlatform(2672, 297, 167, 22, 0x795548);
        lb.addPlatform(2800, 229, 140, 22, 0x8d6e63);
        lb.addPlatform(3640, 244, 138, 22, 0x795548);
        lb.addPlatform(3481, 312, 152, 22, 0x6d4c41);
        lb.addPlatform(3844, 254, 129, 22, 0x5d4037);
        lb.addPlatform(4544, 269, 135, 22, 0x795548);
        lb.addPlatform(4844, 245, 123, 22, 0x8d6e63);
        lb.addPlatform(4675, 301, 151, 22, 0x795548);
        lb.addPlatform(4792, 249, 131, 22, 0x6d4c41);
        lb.addPlatform(5703, 214, 127, 22, 0x5d4037);
        lb.addPlatform(5914, 288, 148, 22, 0x795548);
        lb.addPlatform(6588, 220, 120, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(403, 330);
        lb.addCoin(726, 330);
        lb.addCoin(1049, 330);
        lb.addCoin(1372, 330);
        lb.addCoin(1695, 330);
        lb.addCoin(2018, 330);
        lb.addCoin(2341, 330);
        lb.addCoin(2664, 330);
        lb.addCoin(2987, 330);
        lb.addCoin(3310, 330);
        lb.addCoin(3633, 330);

        lb.addStar(632, 207);
        lb.addStar(1648, 203);
        lb.addStar(2655, 210);

        lb.addEnemy(447, 340, 'robot', 138);
        lb.addEnemy(1012, 340, 'bee', 114);
        lb.addEnemy(1549, 340, 'robot', 166);
        lb.addEnemy(2082, 340, 'bee', 104);
        lb.addEnemy(2655, 340, 'robot', 163);
        lb.addEnemy(3232, 340, 'bee', 106);

        lb.addHazard(541, h-80, 64, 20, 'spike');
        lb.addHazard(1170, h-80, 64, 20, 'lava');
        lb.addHazard(1740, h-80, 64, 20, 'spike');
        lb.addHazard(2301, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(403, 310, 'lamp', 1.0);
        lb.addDecoration(726, 310, 'bush', 0.8);
        lb.addDecoration(1049, 310, 'rock', 1.1);
        lb.addDecoration(1372, 310, 'tree', 0.9);
        lb.addDecoration(1695, 310, 'lamp', 0.8);
        lb.addDecoration(2018, 310, 'bush', 0.8);
        lb.addDecoration(2341, 310, 'rock', 0.8);
        lb.addDecoration(2664, 310, 'tree', 1.0);
        lb.addDecoration(2987, 310, 'lamp', 0.9);
        lb.addDecoration(3310, 310, 'bush', 0.9);
        lb.addDecoration(3633, 310, 'rock', 0.9);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
