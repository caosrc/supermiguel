class Fazenda_2 extends BaseGameScene {
    constructor() {
        super('Fazenda_2', { worldId: 'fazenda', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 258, 141, 22, 0x8b4513);
        lb.addPlatform(603, 276, 124, 22, 0x6d4c41);
        lb.addPlatform(902, 252, 124, 22, 0x5d4037);
        lb.addPlatform(1270, 254, 147, 22, 0x795548);
        lb.addPlatform(1612, 207, 162, 22, 0x8d6e63);
        lb.addPlatform(1975, 310, 136, 22, 0x8b4513);
        lb.addPlatform(2014, 241, 148, 22, 0x6d4c41);
        lb.addPlatform(2324, 236, 141, 22, 0x5d4037);
        lb.addPlatform(2856, 267, 114, 22, 0x795548);
        lb.addPlatform(3034, 191, 120, 22, 0x8d6e63);
        lb.addPlatform(3120, 259, 157, 22, 0x8b4513);
        lb.addPlatform(3690, 293, 157, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(555, 175);
        lb.addStar(1439, 204);
        lb.addStar(2266, 190);

        lb.addEnemy(453, 340, 'slime', 160);
        lb.addEnemy(984, 340, 'crab', 136);
        lb.addEnemy(1550, 340, 'slime', 102);
        lb.addEnemy(2120, 340, 'crab', 100);



        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(341, 310, 'bush', 0.8);
        lb.addDecoration(602, 310, 'rock', 0.9);
        lb.addDecoration(863, 310, 'flower', 0.9);
        lb.addDecoration(1124, 310, 'mushroom', 0.9);
        lb.addDecoration(1385, 310, 'tree', 0.9);
        lb.addDecoration(1646, 310, 'bush', 0.9);
        lb.addDecoration(1907, 310, 'rock', 1.0);
        lb.addDecoration(2168, 310, 'flower', 1.0);
        lb.addDecoration(2429, 310, 'mushroom', 0.9);
        lb.addDecoration(2690, 310, 'tree', 1.1);
        lb.addDecoration(2951, 310, 'bush', 0.9);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
