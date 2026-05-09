class Cidade_4 extends BaseGameScene {
    constructor() {
        super('Cidade_4', { worldId: 'cidade', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x795548, 60);

        lb.addPlatform(280, 268, 124, 22, 0x795548);
        lb.addPlatform(613, 304, 129, 22, 0x6d4c41);
        lb.addPlatform(888, 244, 154, 22, 0x5d4037);
        lb.addPlatform(1141, 275, 150, 22, 0x795548);
        lb.addPlatform(1572, 214, 169, 22, 0x8d6e63);
        lb.addPlatform(1915, 325, 152, 22, 0x795548);
        lb.addPlatform(2080, 238, 127, 22, 0x6d4c41);
        lb.addPlatform(2457, 219, 146, 22, 0x5d4037);
        lb.addPlatform(2720, 267, 124, 22, 0x795548);
        lb.addPlatform(3295, 195, 161, 22, 0x8d6e63);
        lb.addPlatform(3330, 265, 138, 22, 0x795548);
        lb.addPlatform(3943, 308, 114, 22, 0x6d4c41);
        lb.addPlatform(3832, 240, 134, 22, 0x5d4037);
        lb.addPlatform(4505, 270, 140, 22, 0x795548);
        lb.addPlatform(4256, 198, 113, 22, 0x8d6e63);
        lb.addPlatform(5125, 297, 127, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(635, 199);
        lb.addStar(1564, 182);
        lb.addStar(2486, 205);

        lb.addEnemy(415, 340, 'robot', 159);
        lb.addEnemy(986, 340, 'bee', 171);
        lb.addEnemy(1536, 340, 'robot', 128);
        lb.addEnemy(2080, 340, 'bee', 168);
        lb.addEnemy(2681, 340, 'robot', 100);

        lb.addHazard(511, h-80, 64, 20, 'spike');
        lb.addHazard(1121, h-80, 64, 20, 'lava');
        lb.addHazard(1716, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(372, 310, 'lamp', 1.1);
        lb.addDecoration(664, 310, 'bush', 0.8);
        lb.addDecoration(956, 310, 'rock', 1.0);
        lb.addDecoration(1248, 310, 'tree', 0.8);
        lb.addDecoration(1540, 310, 'lamp', 0.8);
        lb.addDecoration(1832, 310, 'bush', 0.9);
        lb.addDecoration(2124, 310, 'rock', 1.0);
        lb.addDecoration(2416, 310, 'tree', 1.1);
        lb.addDecoration(2708, 310, 'lamp', 0.8);
        lb.addDecoration(3000, 310, 'bush', 0.9);
        lb.addDecoration(3292, 310, 'rock', 0.9);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'professora', { name: 'Professora', lines: ['Muito bem, Miguel! Continue aprendendo!', 'A educação é o maior tesouro!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
