class Fazenda_6 extends BaseGameScene {
    constructor() {
        super('Fazenda_6', { worldId: 'fazenda', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 286, 147, 22, 0x8b4513);
        lb.addPlatform(578, 313, 148, 22, 0x6d4c41);
        lb.addPlatform(844, 253, 129, 22, 0x5d4037);
        lb.addPlatform(1123, 298, 152, 22, 0x795548);
        lb.addPlatform(1412, 206, 113, 22, 0x8d6e63);
        lb.addPlatform(1715, 310, 130, 22, 0x8b4513);
        lb.addPlatform(2194, 278, 143, 22, 0x6d4c41);
        lb.addPlatform(2478, 222, 139, 22, 0x5d4037);
        lb.addPlatform(2936, 266, 146, 22, 0x795548);
        lb.addPlatform(3106, 202, 168, 22, 0x8d6e63);
        lb.addPlatform(3620, 277, 112, 22, 0x8b4513);
        lb.addPlatform(3877, 303, 166, 22, 0x6d4c41);
        lb.addPlatform(3724, 265, 121, 22, 0x5d4037);
        lb.addPlatform(4427, 282, 131, 22, 0x795548);
        lb.addPlatform(4872, 207, 153, 22, 0x8d6e63);
        lb.addPlatform(5125, 324, 162, 22, 0x8b4513);
        lb.addPlatform(4984, 256, 117, 22, 0x6d4c41);
        lb.addPlatform(5907, 216, 155, 22, 0x5d4037);
        lb.addPlatform(5968, 267, 121, 22, 0x795548);
        lb.addPlatform(6645, 217, 110, 22, 0x8d6e63);

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

        lb.addStar(641, 195);
        lb.addStar(1661, 209);
        lb.addStar(2739, 175);

        lb.addEnemy(440, 340, 'slime', 101);
        lb.addEnemy(1005, 340, 'crab', 103);
        lb.addEnemy(1549, 340, 'slime', 101);
        lb.addEnemy(2121, 340, 'crab', 131);
        lb.addEnemy(2710, 340, 'slime', 157);
        lb.addEnemy(3214, 340, 'crab', 116);

        lb.addHazard(583, h-80, 64, 20, 'spike');
        lb.addHazard(1178, h-80, 64, 20, 'lava');
        lb.addHazard(1728, h-80, 64, 20, 'spike');
        lb.addHazard(2370, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(403, 310, 'bush', 0.9);
        lb.addDecoration(726, 310, 'rock', 0.9);
        lb.addDecoration(1049, 310, 'flower', 0.9);
        lb.addDecoration(1372, 310, 'mushroom', 1.0);
        lb.addDecoration(1695, 310, 'tree', 0.9);
        lb.addDecoration(2018, 310, 'bush', 0.8);
        lb.addDecoration(2341, 310, 'rock', 0.8);
        lb.addDecoration(2664, 310, 'flower', 0.9);
        lb.addDecoration(2987, 310, 'mushroom', 1.0);
        lb.addDecoration(3310, 310, 'tree', 0.9);
        lb.addDecoration(3633, 310, 'bush', 0.9);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
