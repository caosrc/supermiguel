class Fazenda_4 extends BaseGameScene {
    constructor() {
        super('Fazenda_4', { worldId: 'fazenda', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 239, 168, 22, 0x8b4513);
        lb.addPlatform(612, 279, 149, 22, 0x6d4c41);
        lb.addPlatform(870, 249, 124, 22, 0x5d4037);
        lb.addPlatform(1135, 258, 124, 22, 0x795548);
        lb.addPlatform(1508, 194, 136, 22, 0x8d6e63);
        lb.addPlatform(1730, 293, 170, 22, 0x8b4513);
        lb.addPlatform(2002, 236, 162, 22, 0x6d4c41);
        lb.addPlatform(2548, 256, 123, 22, 0x5d4037);
        lb.addPlatform(2584, 304, 164, 22, 0x795548);
        lb.addPlatform(2899, 195, 152, 22, 0x8d6e63);
        lb.addPlatform(3610, 246, 167, 22, 0x8b4513);
        lb.addPlatform(3855, 296, 116, 22, 0x6d4c41);
        lb.addPlatform(4336, 246, 141, 22, 0x5d4037);
        lb.addPlatform(4466, 259, 131, 22, 0x795548);
        lb.addPlatform(5040, 201, 140, 22, 0x8d6e63);
        lb.addPlatform(4990, 270, 144, 22, 0x8b4513);

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

        lb.addStar(624, 189);
        lb.addStar(1554, 194);
        lb.addStar(2514, 199);

        lb.addEnemy(466, 340, 'slime', 132);
        lb.addEnemy(968, 340, 'crab', 162);
        lb.addEnemy(1577, 340, 'slime', 118);
        lb.addEnemy(2111, 340, 'crab', 170);
        lb.addEnemy(2656, 340, 'slime', 148);

        lb.addHazard(542, h-80, 64, 20, 'spike');
        lb.addHazard(1175, h-80, 64, 20, 'lava');
        lb.addHazard(1758, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(372, 310, 'bush', 1.0);
        lb.addDecoration(664, 310, 'rock', 0.8);
        lb.addDecoration(956, 310, 'flower', 0.9);
        lb.addDecoration(1248, 310, 'mushroom', 0.8);
        lb.addDecoration(1540, 310, 'tree', 0.9);
        lb.addDecoration(1832, 310, 'bush', 0.9);
        lb.addDecoration(2124, 310, 'rock', 0.9);
        lb.addDecoration(2416, 310, 'flower', 0.8);
        lb.addDecoration(2708, 310, 'mushroom', 1.0);
        lb.addDecoration(3000, 310, 'tree', 0.9);
        lb.addDecoration(3292, 310, 'bush', 1.0);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0xffe0a0, 0xffe0a0, 0xfff3d0, 0xfff3d0, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=400){
            bg.fillStyle(0xcc3333,1); bg.fillRect(i+50,h-130,100,70);
            bg.fillStyle(0x992222,1); bg.fillTriangle(i+40,h-130,i+100,h-190,i+160,h-130);
            bg.fillStyle(0xdddddd,1); bg.fillRect(i+90,h-120,20,30);
            bg.fillStyle(0x8b4513,1); bg.fillRect(i+75,h-100,12,40); bg.fillRect(i+113,h-100,12,40);
            bg.fillStyle(0xc8a83a,1); bg.fillEllipse(i+250,h-75,60,40);
            for(var j=0;j<5;j++){ bg.fillStyle(0xffd700,0.5); bg.fillRect(i+230+j*8,h-78,2,36); }
            for(var f=i;f<i+400;f+=30){
                bg.fillStyle(0xc8a070,1); bg.fillRect(f,h-80,6,24);
            }
        }
        for(var i=0;i<LW;i+=140){
            bg.fillStyle(0x228b22,1); bg.fillRect(i+60,h-100,4,40);
            bg.fillStyle(0xffd700,1); bg.fillCircle(i+62,h-100,14);
            bg.fillStyle(0x8b4513,1); bg.fillCircle(i+62,h-100,6);
        }

        bg.fillStyle(0x8b4513, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0xc8a83a, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
