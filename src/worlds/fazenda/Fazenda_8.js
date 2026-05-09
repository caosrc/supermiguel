class Fazenda_8 extends BaseGameScene {
    constructor() {
        super('Fazenda_8', { worldId: 'fazenda', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 258, 127, 22, 0x8b4513);
        lb.addPlatform(570, 323, 123, 22, 0x6d4c41);
        lb.addPlatform(846, 254, 137, 22, 0x5d4037);
        lb.addPlatform(1267, 260, 117, 22, 0x795548);
        lb.addPlatform(1488, 221, 136, 22, 0x8d6e63);
        lb.addPlatform(1860, 299, 135, 22, 0x8b4513);
        lb.addPlatform(2044, 252, 141, 22, 0x6d4c41);
        lb.addPlatform(2429, 266, 133, 22, 0x5d4037);
        lb.addPlatform(2960, 301, 163, 22, 0x795548);
        lb.addPlatform(2881, 214, 147, 22, 0x8d6e63);
        lb.addPlatform(3680, 238, 123, 22, 0x8b4513);
        lb.addPlatform(3558, 284, 139, 22, 0x6d4c41);
        lb.addPlatform(3640, 270, 113, 22, 0x5d4037);
        lb.addPlatform(4050, 264, 135, 22, 0x795548);
        lb.addPlatform(4536, 223, 111, 22, 0x8d6e63);
        lb.addPlatform(4945, 281, 132, 22, 0x8b4513);
        lb.addPlatform(5624, 288, 146, 22, 0x6d4c41);
        lb.addPlatform(6009, 267, 169, 22, 0x5d4037);
        lb.addPlatform(6346, 294, 143, 22, 0x795548);
        lb.addPlatform(6626, 236, 145, 22, 0x8d6e63);
        lb.addPlatform(6480, 288, 119, 22, 0x8b4513);
        lb.addPlatform(6475, 286, 163, 22, 0x6d4c41);
        lb.addPlatform(7430, 230, 121, 22, 0x5d4037);
        lb.addPlatform(7801, 259, 126, 22, 0x795548);

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

        lb.addStar(560, 204);
        lb.addStar(1735, 195);
        lb.addStar(2885, 206);

        lb.addEnemy(446, 340, 'slime', 163);
        lb.addEnemy(1039, 340, 'crab', 125);
        lb.addEnemy(1521, 340, 'slime', 177);
        lb.addEnemy(2094, 340, 'crab', 163);
        lb.addEnemy(2720, 340, 'slime', 165);
        lb.addEnemy(3210, 340, 'crab', 131);
        lb.addEnemy(3826, 340, 'slime', 127);

        lb.addHazard(571, h-80, 64, 20, 'spike');
        lb.addHazard(1156, h-80, 64, 20, 'lava');
        lb.addHazard(1747, h-80, 64, 20, 'spike');
        lb.addHazard(2373, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(433, 310, 'bush', 0.9);
        lb.addDecoration(786, 310, 'rock', 0.8);
        lb.addDecoration(1139, 310, 'flower', 0.8);
        lb.addDecoration(1492, 310, 'mushroom', 0.9);
        lb.addDecoration(1845, 310, 'tree', 0.9);
        lb.addDecoration(2198, 310, 'bush', 0.9);
        lb.addDecoration(2551, 310, 'rock', 0.9);
        lb.addDecoration(2904, 310, 'flower', 1.0);
        lb.addDecoration(3257, 310, 'mushroom', 0.9);
        lb.addDecoration(3610, 310, 'tree', 1.0);
        lb.addDecoration(3963, 310, 'bush', 0.8);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
