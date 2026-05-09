class Medieval_3 extends BaseGameScene {
    constructor() {
        super('Medieval_3', { worldId: 'medieval', levelNum: 3 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 261, 144, 22, 0x5d4037);
        lb.addPlatform(588, 285, 134, 22, 0x6d4c41);
        lb.addPlatform(840, 212, 159, 22, 0x5d4037);
        lb.addPlatform(1150, 276, 118, 22, 0x795548);
        lb.addPlatform(1628, 224, 131, 22, 0x8d6e63);
        lb.addPlatform(1825, 272, 162, 22, 0x5d4037);
        lb.addPlatform(2032, 247, 125, 22, 0x6d4c41);
        lb.addPlatform(2247, 240, 128, 22, 0x5d4037);
        lb.addPlatform(2536, 295, 135, 22, 0x795548);
        lb.addPlatform(3079, 207, 163, 22, 0x8d6e63);
        lb.addPlatform(3170, 268, 111, 22, 0x5d4037);
        lb.addPlatform(3745, 330, 133, 22, 0x6d4c41);
        lb.addPlatform(4204, 212, 115, 22, 0x5d4037);
        lb.addPlatform(4635, 294, 142, 22, 0x795548);

        lb.addCoin(80, 330);
        lb.addCoin(440, 330);
        lb.addCoin(800, 330);
        lb.addCoin(1160, 330);
        lb.addCoin(1520, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2240, 330);
        lb.addCoin(2600, 330);
        lb.addCoin(2960, 330);

        lb.addStar(623, 176);
        lb.addStar(1510, 202);
        lb.addStar(2379, 196);

        lb.addEnemy(425, 340, 'ghost', 112);
        lb.addEnemy(1025, 340, 'bat', 173);
        lb.addEnemy(1597, 340, 'ghost', 154);
        lb.addEnemy(2090, 340, 'bat', 172);



        lb.addDecoration(80, 310, 'rock', 0.9);
        lb.addDecoration(356, 310, 'tree', 0.9);
        lb.addDecoration(632, 310, 'mushroom', 0.9);
        lb.addDecoration(908, 310, 'rock', 0.8);
        lb.addDecoration(1184, 310, 'tree', 0.8);
        lb.addDecoration(1460, 310, 'mushroom', 1.0);
        lb.addDecoration(1736, 310, 'rock', 1.0);
        lb.addDecoration(2012, 310, 'tree', 1.0);
        lb.addDecoration(2288, 310, 'mushroom', 1.0);
        lb.addDecoration(2564, 310, 'rock', 1.0);
        lb.addDecoration(2840, 310, 'tree', 0.9);
        lb.addDecoration(3116, 310, 'mushroom', 0.9);
        lb.addGoal(3480, h - 160);
        const ns = this.npcSystem;
        ns.create(1200, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3600;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x2c3e50, 0x2c3e50, 0x4a5568, 0x4a5568, 1);
        bg.fillRect(0, 0, LW, h);
        bg.fillStyle(0x78909c,1);
        bg.fillRect(LW-600,h-280,200,230);
        bg.fillRect(LW-620,h-260,240,20);
        bg.fillRect(LW-620,h-320,50,80); bg.fillRect(LW-410,h-320,50,80);
        bg.fillRect(LW-600,h-340,50,30); bg.fillRect(LW-390,h-340,50,30);
        for(var b=0;b<5;b++){
            bg.fillRect(LW-620+b*12,h-350,8,18);
            bg.fillRect(LW-600+b*12,h-340,8,14);
        }
        bg.fillStyle(0x000000,0.7); bg.fillRoundedRect(LW-520,h-200,40,60,{tl:20,tr:20,bl:0,br:0});
        for(var i=0;i<LW;i+=300){
            bg.fillStyle(0x37474f,0.8);
            bg.fillTriangle(i,h-60,i+150,h-200,i+300,h-60);
            bg.fillStyle(0xeceff1,0.6);
            bg.fillTriangle(i+110,h-190,i+150,h-220,i+190,h-190);
        }
        for(var i=0;i<LW;i+=400){
            bg.fillStyle(0x8d6e63,1); bg.fillRect(i+200,h-130,6,30);
            bg.fillStyle(0xff9800,0.9); bg.fillCircle(i+203,h-130,8);
            bg.fillStyle(0xffff00,0.6); bg.fillCircle(i+203,h-133,5);
        }
        bg.fillStyle(0x607d8b,0.08);
        for(var i=0;i<LW;i+=60){ bg.fillEllipse(i+30,h-65,140,45); }

        bg.fillStyle(0x5d4037, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x4a6741, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
