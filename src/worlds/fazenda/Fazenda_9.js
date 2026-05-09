class Fazenda_9 extends BaseGameScene {
    constructor() {
        super('Fazenda_9', { worldId: 'fazenda', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 286, 138, 22, 0x8b4513);
        lb.addPlatform(612, 273, 162, 22, 0x6d4c41);
        lb.addPlatform(890, 216, 156, 22, 0x5d4037);
        lb.addPlatform(1261, 251, 144, 22, 0x795548);
        lb.addPlatform(1572, 248, 157, 22, 0x8d6e63);
        lb.addPlatform(1765, 308, 130, 22, 0x8b4513);
        lb.addPlatform(2194, 278, 138, 22, 0x6d4c41);
        lb.addPlatform(2401, 258, 160, 22, 0x5d4037);
        lb.addPlatform(2544, 303, 112, 22, 0x795548);
        lb.addPlatform(3313, 229, 116, 22, 0x8d6e63);
        lb.addPlatform(3370, 285, 133, 22, 0x8b4513);
        lb.addPlatform(3657, 329, 116, 22, 0x6d4c41);
        lb.addPlatform(3916, 261, 159, 22, 0x5d4037);
        lb.addPlatform(4388, 309, 165, 22, 0x795548);
        lb.addPlatform(4270, 217, 118, 22, 0x8d6e63);
        lb.addPlatform(4945, 295, 121, 22, 0x8b4513);
        lb.addPlatform(5016, 266, 161, 22, 0x6d4c41);
        lb.addPlatform(5193, 249, 163, 22, 0x5d4037);
        lb.addPlatform(6130, 253, 135, 22, 0x795548);
        lb.addPlatform(6436, 202, 135, 22, 0x8d6e63);
        lb.addPlatform(6260, 284, 134, 22, 0x8b4513);
        lb.addPlatform(7231, 325, 134, 22, 0x6d4c41);
        lb.addPlatform(7012, 243, 139, 22, 0x5d4037);
        lb.addPlatform(7019, 269, 135, 22, 0x795548);
        lb.addPlatform(8008, 197, 148, 22, 0x8d6e63);
        lb.addPlatform(7805, 278, 117, 22, 0x8b4513);

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

        lb.addStar(623, 176);
        lb.addStar(1776, 186);
        lb.addStar(3010, 209);

        lb.addEnemy(440, 340, 'slime', 158);
        lb.addEnemy(964, 340, 'crab', 170);
        lb.addEnemy(1599, 340, 'slime', 125);
        lb.addEnemy(2141, 340, 'crab', 105);
        lb.addEnemy(2649, 340, 'slime', 130);
        lb.addEnemy(3207, 340, 'crab', 157);
        lb.addEnemy(3837, 340, 'slime', 153);

        lb.addHazard(501, h-80, 64, 20, 'spike');
        lb.addHazard(1174, h-80, 64, 20, 'lava');
        lb.addHazard(1725, h-80, 64, 20, 'spike');
        lb.addHazard(2314, h-80, 64, 20, 'lava');
        lb.addHazard(2940, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(449, 310, 'bush', 1.0);
        lb.addDecoration(818, 310, 'rock', 0.9);
        lb.addDecoration(1187, 310, 'flower', 0.9);
        lb.addDecoration(1556, 310, 'mushroom', 1.1);
        lb.addDecoration(1925, 310, 'tree', 1.0);
        lb.addDecoration(2294, 310, 'bush', 0.8);
        lb.addDecoration(2663, 310, 'rock', 1.1);
        lb.addDecoration(3032, 310, 'flower', 1.0);
        lb.addDecoration(3401, 310, 'mushroom', 1.0);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 1.0);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'pescador', { name: 'Pescador', lines: ['Hoje a pesca está boa, Miguel!', 'O mar é lindo, mas respeite-o!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
