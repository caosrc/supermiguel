class Fazenda_1 extends BaseGameScene {
    constructor() {
        super('Fazenda_1', { worldId: 'fazenda', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 279, 123, 22, 0x8b4513);
        lb.addPlatform(566, 286, 163, 22, 0x6d4c41);
        lb.addPlatform(886, 268, 110, 22, 0x5d4037);
        lb.addPlatform(1150, 260, 155, 22, 0x795548);
        lb.addPlatform(1420, 235, 134, 22, 0x8d6e63);
        lb.addPlatform(1840, 274, 144, 22, 0x8b4513);
        lb.addPlatform(2164, 269, 156, 22, 0x6d4c41);
        lb.addPlatform(2240, 238, 119, 22, 0x5d4037);
        lb.addPlatform(2992, 282, 134, 22, 0x795548);
        lb.addPlatform(3214, 224, 133, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(559, 208);
        lb.addStar(1399, 170);
        lb.addStar(2239, 195);

        lb.addEnemy(423, 340, 'slime', 159);
        lb.addEnemy(998, 340, 'crab', 122);
        lb.addEnemy(1580, 340, 'slime', 125);



        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(326, 310, 'bush', 1.1);
        lb.addDecoration(572, 310, 'rock', 0.9);
        lb.addDecoration(818, 310, 'flower', 1.1);
        lb.addDecoration(1064, 310, 'mushroom', 0.9);
        lb.addDecoration(1310, 310, 'tree', 1.1);
        lb.addDecoration(1556, 310, 'bush', 0.9);
        lb.addDecoration(1802, 310, 'rock', 0.8);
        lb.addDecoration(2048, 310, 'flower', 0.9);
        lb.addDecoration(2294, 310, 'mushroom', 1.0);
        lb.addDecoration(2540, 310, 'tree', 0.9);
        lb.addDecoration(2786, 310, 'bush', 0.9);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'jardineiro', { name: 'Jardineiro', lines: ['Cuide da natureza, Miguel!', 'As plantas agradecem seu cuidado!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
