class Medieval_8 extends BaseGameScene {
    constructor() {
        super('Medieval_8', { worldId: 'medieval', levelNum: 8 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4600);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 287, 162, 22, 0x5d4037);
        lb.addPlatform(588, 283, 144, 22, 0x6d4c41);
        lb.addPlatform(944, 247, 145, 22, 0x5d4037);
        lb.addPlatform(1147, 304, 129, 22, 0x795548);
        lb.addPlatform(1632, 222, 121, 22, 0x8d6e63);
        lb.addPlatform(1910, 315, 147, 22, 0x5d4037);
        lb.addPlatform(2008, 281, 142, 22, 0x6d4c41);
        lb.addPlatform(2583, 232, 167, 22, 0x5d4037);
        lb.addPlatform(2968, 302, 110, 22, 0x795548);
        lb.addPlatform(2971, 229, 113, 22, 0x8d6e63);
        lb.addPlatform(3470, 255, 155, 22, 0x5d4037);
        lb.addPlatform(3877, 302, 116, 22, 0x6d4c41);
        lb.addPlatform(4276, 219, 162, 22, 0x5d4037);
        lb.addPlatform(4050, 266, 167, 22, 0x795548);
        lb.addPlatform(4704, 229, 145, 22, 0x8d6e63);
        lb.addPlatform(4645, 318, 162, 22, 0x5d4037);
        lb.addPlatform(5064, 270, 129, 22, 0x6d4c41);
        lb.addPlatform(5414, 223, 129, 22, 0x5d4037);
        lb.addPlatform(5860, 280, 158, 22, 0x795548);
        lb.addPlatform(5771, 237, 160, 22, 0x8d6e63);
        lb.addPlatform(6460, 266, 111, 22, 0x5d4037);
        lb.addPlatform(6538, 305, 166, 22, 0x6d4c41);
        lb.addPlatform(7342, 265, 158, 22, 0x5d4037);
        lb.addPlatform(8077, 304, 152, 22, 0x795548);

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

        lb.addStar(633, 196);
        lb.addStar(1761, 173);
        lb.addStar(2867, 206);

        lb.addEnemy(449, 340, 'ghost', 134);
        lb.addEnemy(1015, 340, 'bat', 168);
        lb.addEnemy(1559, 340, 'ghost', 178);
        lb.addEnemy(2134, 340, 'bat', 140);
        lb.addEnemy(2696, 340, 'ghost', 136);
        lb.addEnemy(3273, 340, 'bat', 108);
        lb.addEnemy(3837, 340, 'ghost', 110);

        lb.addHazard(574, h-80, 64, 20, 'spike');
        lb.addHazard(1109, h-80, 64, 20, 'lava');
        lb.addHazard(1786, h-80, 64, 20, 'spike');
        lb.addHazard(2373, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'rock', 0.8);
        lb.addDecoration(433, 310, 'tree', 1.0);
        lb.addDecoration(786, 310, 'mushroom', 1.1);
        lb.addDecoration(1139, 310, 'rock', 1.0);
        lb.addDecoration(1492, 310, 'tree', 0.8);
        lb.addDecoration(1845, 310, 'mushroom', 0.9);
        lb.addDecoration(2198, 310, 'rock', 0.9);
        lb.addDecoration(2551, 310, 'tree', 1.1);
        lb.addDecoration(2904, 310, 'mushroom', 0.8);
        lb.addDecoration(3257, 310, 'rock', 0.9);
        lb.addDecoration(3610, 310, 'tree', 1.0);
        lb.addDecoration(3963, 310, 'mushroom', 1.1);
        lb.addGoal(4480, h - 160);
        const ns = this.npcSystem;
        ns.create(1533, 300, 'avo', { name: 'Avo', lines: ['Na minha época, brincávamos na rua o dia todo!', 'A sabedoria vem com os anos, meu neto.'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4600;
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
