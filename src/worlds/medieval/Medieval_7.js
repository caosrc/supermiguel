class Medieval_7 extends BaseGameScene {
    constructor() {
        super('Medieval_7', { worldId: 'medieval', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 270, 152, 22, 0x5d4037);
        lb.addPlatform(561, 308, 168, 22, 0x6d4c41);
        lb.addPlatform(932, 250, 153, 22, 0x5d4037);
        lb.addPlatform(1165, 299, 144, 22, 0x795548);
        lb.addPlatform(1528, 246, 115, 22, 0x8d6e63);
        lb.addPlatform(1815, 271, 113, 22, 0x5d4037);
        lb.addPlatform(2230, 239, 160, 22, 0x6d4c41);
        lb.addPlatform(2324, 224, 130, 22, 0x5d4037);
        lb.addPlatform(2672, 297, 131, 22, 0x795548);
        lb.addPlatform(3223, 215, 143, 22, 0x8d6e63);
        lb.addPlatform(3620, 237, 160, 22, 0x5d4037);
        lb.addPlatform(3987, 307, 166, 22, 0x6d4c41);
        lb.addPlatform(4324, 244, 124, 22, 0x5d4037);
        lb.addPlatform(4115, 273, 129, 22, 0x795548);
        lb.addPlatform(4578, 193, 151, 22, 0x8d6e63);
        lb.addPlatform(4795, 280, 167, 22, 0x5d4037);
        lb.addPlatform(5352, 287, 156, 22, 0x6d4c41);
        lb.addPlatform(5057, 257, 140, 22, 0x5d4037);
        lb.addPlatform(5878, 270, 128, 22, 0x795548);
        lb.addPlatform(6189, 229, 137, 22, 0x8d6e63);
        lb.addPlatform(6160, 250, 135, 22, 0x5d4037);
        lb.addPlatform(6895, 325, 132, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(597, 206);
        lb.addStar(1747, 173);
        lb.addStar(2846, 208);

        lb.addEnemy(405, 340, 'ghost', 177);
        lb.addEnemy(1028, 340, 'bat', 179);
        lb.addEnemy(1580, 340, 'ghost', 140);
        lb.addEnemy(2130, 340, 'bat', 153);
        lb.addEnemy(2693, 340, 'ghost', 131);
        lb.addEnemy(3247, 340, 'bat', 123);

        lb.addHazard(581, h-80, 64, 20, 'spike');
        lb.addHazard(1129, h-80, 64, 20, 'lava');
        lb.addHazard(1784, h-80, 64, 20, 'spike');
        lb.addHazard(2331, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'rock', 1.1);
        lb.addDecoration(418, 310, 'tree', 1.1);
        lb.addDecoration(756, 310, 'mushroom', 1.0);
        lb.addDecoration(1094, 310, 'rock', 0.9);
        lb.addDecoration(1432, 310, 'tree', 1.1);
        lb.addDecoration(1770, 310, 'mushroom', 0.8);
        lb.addDecoration(2108, 310, 'rock', 0.8);
        lb.addDecoration(2446, 310, 'tree', 0.8);
        lb.addDecoration(2784, 310, 'mushroom', 1.1);
        lb.addDecoration(3122, 310, 'rock', 0.9);
        lb.addDecoration(3460, 310, 'tree', 1.0);
        lb.addDecoration(3798, 310, 'mushroom', 0.9);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'feiticeira', { name: 'Feiticeira', lines: ['As estrelas guiam seu caminho, Miguel!', 'A magia está dentro de você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
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
