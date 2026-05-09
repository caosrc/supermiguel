class Fazenda_3 extends BaseGameScene {
    constructor() {
        super('Fazenda_3', { worldId: 'fazenda', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 272, 131, 22, 0x8b4513);
        lb.addPlatform(618, 293, 120, 22, 0x6d4c41);
        lb.addPlatform(858, 251, 132, 22, 0x5d4037);
        lb.addPlatform(1204, 307, 133, 22, 0x795548);
        lb.addPlatform(1480, 211, 160, 22, 0x8d6e63);
        lb.addPlatform(1870, 330, 135, 22, 0x8b4513);
        lb.addPlatform(2080, 245, 131, 22, 0x6d4c41);
        lb.addPlatform(2604, 270, 150, 22, 0x5d4037);
        lb.addPlatform(2952, 278, 135, 22, 0x795548);
        lb.addPlatform(2881, 203, 138, 22, 0x8d6e63);
        lb.addPlatform(3220, 277, 119, 22, 0x8b4513);
        lb.addPlatform(3624, 319, 110, 22, 0x6d4c41);
        lb.addPlatform(3724, 218, 118, 22, 0x5d4037);
        lb.addPlatform(4518, 253, 126, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(614, 179);
        lb.addStar(1483, 194);
        lb.addStar(2429, 171);

        lb.addEnemy(409, 340, 'slime', 134);
        lb.addEnemy(1030, 340, 'crab', 152);
        lb.addEnemy(1560, 340, 'slime', 141);
        lb.addEnemy(2100, 340, 'crab', 122);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(356, 310, 'bush', 1.0);
        lb.addDecoration(632, 310, 'rock', 0.9);
        lb.addDecoration(908, 310, 'flower', 1.0);
        lb.addDecoration(1184, 310, 'mushroom', 0.9);
        lb.addDecoration(1460, 310, 'tree', 1.0);
        lb.addDecoration(1736, 310, 'bush', 1.0);
        lb.addDecoration(2012, 310, 'rock', 0.9);
        lb.addDecoration(2288, 310, 'flower', 1.0);
        lb.addDecoration(2564, 310, 'mushroom', 1.0);
        lb.addDecoration(2840, 310, 'tree', 0.9);
        lb.addDecoration(3116, 310, 'bush', 1.0);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'cachorro', { name: 'Cachorro', lines: ['Au au! (Obrigado por brincar comigo!)', 'Au au! (Você é meu herói!)'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
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
