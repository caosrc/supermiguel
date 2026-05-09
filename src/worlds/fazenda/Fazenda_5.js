class Fazenda_5 extends BaseGameScene {
    constructor() {
        super('Fazenda_5', { worldId: 'fazenda', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 240, 149, 22, 0x8b4513);
        lb.addPlatform(566, 311, 114, 22, 0x6d4c41);
        lb.addPlatform(898, 238, 140, 22, 0x5d4037);
        lb.addPlatform(1177, 256, 130, 22, 0x795548);
        lb.addPlatform(1548, 248, 136, 22, 0x8d6e63);
        lb.addPlatform(1830, 287, 110, 22, 0x8b4513);
        lb.addPlatform(2002, 287, 169, 22, 0x6d4c41);
        lb.addPlatform(2324, 219, 114, 22, 0x5d4037);
        lb.addPlatform(2704, 298, 115, 22, 0x795548);
        lb.addPlatform(3034, 229, 153, 22, 0x8d6e63);
        lb.addPlatform(3090, 251, 115, 22, 0x8b4513);
        lb.addPlatform(3602, 317, 127, 22, 0x6d4c41);
        lb.addPlatform(4348, 241, 148, 22, 0x5d4037);
        lb.addPlatform(4219, 257, 115, 22, 0x795548);
        lb.addPlatform(4984, 207, 139, 22, 0x8d6e63);
        lb.addPlatform(4510, 294, 151, 22, 0x8b4513);
        lb.addPlatform(5160, 274, 127, 22, 0x6d4c41);
        lb.addPlatform(5244, 257, 148, 22, 0x5d4037);

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

        lb.addStar(569, 178);
        lb.addStar(1620, 194);
        lb.addStar(2568, 183);

        lb.addEnemy(442, 340, 'slime', 138);
        lb.addEnemy(962, 340, 'crab', 147);
        lb.addEnemy(1549, 340, 'slime', 164);
        lb.addEnemy(2095, 340, 'crab', 108);
        lb.addEnemy(2681, 340, 'slime', 149);

        lb.addHazard(557, h-80, 64, 20, 'spike');
        lb.addHazard(1176, h-80, 64, 20, 'lava');
        lb.addHazard(1768, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.8);
        lb.addDecoration(387, 310, 'bush', 0.9);
        lb.addDecoration(694, 310, 'rock', 0.9);
        lb.addDecoration(1001, 310, 'flower', 0.9);
        lb.addDecoration(1308, 310, 'mushroom', 1.0);
        lb.addDecoration(1615, 310, 'tree', 1.1);
        lb.addDecoration(1922, 310, 'bush', 0.8);
        lb.addDecoration(2229, 310, 'rock', 1.1);
        lb.addDecoration(2536, 310, 'flower', 0.9);
        lb.addDecoration(2843, 310, 'mushroom', 0.8);
        lb.addDecoration(3150, 310, 'tree', 0.9);
        lb.addDecoration(3457, 310, 'bush', 0.9);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
