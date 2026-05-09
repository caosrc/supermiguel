class Fazenda_10 extends BaseGameScene {
    constructor() {
        super('Fazenda_10', { worldId: 'fazenda', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 256, 156, 22, 0x8b4513);
        lb.addPlatform(584, 282, 113, 22, 0x6d4c41);
        lb.addPlatform(928, 251, 119, 22, 0x5d4037);
        lb.addPlatform(1210, 308, 119, 22, 0x795548);
        lb.addPlatform(1456, 198, 139, 22, 0x8d6e63);
        lb.addPlatform(1840, 287, 114, 22, 0x8b4513);
        lb.addPlatform(2224, 241, 157, 22, 0x6d4c41);
        lb.addPlatform(2660, 250, 112, 22, 0x5d4037);
        lb.addPlatform(2640, 281, 130, 22, 0x795548);
        lb.addPlatform(3232, 221, 158, 22, 0x8d6e63);
        lb.addPlatform(3550, 240, 156, 22, 0x8b4513);
        lb.addPlatform(3602, 317, 162, 22, 0x6d4c41);
        lb.addPlatform(4252, 266, 155, 22, 0x5d4037);
        lb.addPlatform(4544, 291, 114, 22, 0x795548);
        lb.addPlatform(5012, 207, 142, 22, 0x8d6e63);
        lb.addPlatform(5080, 276, 119, 22, 0x8b4513);
        lb.addPlatform(5464, 236, 112, 22, 0x6d4c41);
        lb.addPlatform(5669, 265, 163, 22, 0x5d4037);
        lb.addPlatform(6256, 276, 137, 22, 0x795548);
        lb.addPlatform(6227, 218, 159, 22, 0x8d6e63);
        lb.addPlatform(6160, 234, 129, 22, 0x8b4513);
        lb.addPlatform(6769, 282, 156, 22, 0x6d4c41);
        lb.addPlatform(6748, 249, 111, 22, 0x5d4037);
        lb.addPlatform(7686, 270, 147, 22, 0x795548);
        lb.addPlatform(7792, 193, 136, 22, 0x8d6e63);
        lb.addPlatform(7755, 303, 110, 22, 0x8b4513);
        lb.addPlatform(8678, 288, 146, 22, 0x6d4c41);
        lb.addPlatform(9244, 232, 160, 22, 0x5d4037);

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

        lb.addStar(599, 172);
        lb.addStar(1888, 210);
        lb.addStar(3121, 178);

        lb.addEnemy(426, 340, 'slime', 149);
        lb.addEnemy(972, 340, 'crab', 110);
        lb.addEnemy(1584, 340, 'slime', 179);
        lb.addEnemy(2095, 340, 'crab', 164);
        lb.addEnemy(2687, 340, 'slime', 143);
        lb.addEnemy(3263, 340, 'crab', 159);
        lb.addEnemy(3789, 340, 'slime', 106);
        lb.addEnemy(4329, 340, 'crab', 149);

        lb.addHazard(536, h-80, 64, 20, 'spike');
        lb.addHazard(1118, h-80, 64, 20, 'lava');
        lb.addHazard(1719, h-80, 64, 20, 'spike');
        lb.addHazard(2398, h-80, 64, 20, 'lava');
        lb.addHazard(2938, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(464, 310, 'bush', 0.9);
        lb.addDecoration(848, 310, 'rock', 1.0);
        lb.addDecoration(1232, 310, 'flower', 1.0);
        lb.addDecoration(1616, 310, 'mushroom', 1.0);
        lb.addDecoration(2000, 310, 'tree', 1.0);
        lb.addDecoration(2384, 310, 'bush', 1.0);
        lb.addDecoration(2768, 310, 'rock', 0.9);
        lb.addDecoration(3152, 310, 'flower', 1.0);
        lb.addDecoration(3536, 310, 'mushroom', 0.9);
        lb.addDecoration(3920, 310, 'tree', 0.9);
        lb.addDecoration(4304, 310, 'bush', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
