class Medieval_6 extends BaseGameScene {
    constructor() {
        super('Medieval_6', { worldId: 'medieval', levelNum: 6 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 234, 168, 22, 0x5d4037);
        lb.addPlatform(583, 293, 141, 22, 0x6d4c41);
        lb.addPlatform(878, 225, 117, 22, 0x5d4037);
        lb.addPlatform(1264, 308, 166, 22, 0x795548);
        lb.addPlatform(1548, 222, 169, 22, 0x8d6e63);
        lb.addPlatform(1980, 281, 126, 22, 0x5d4037);
        lb.addPlatform(2218, 257, 162, 22, 0x6d4c41);
        lb.addPlatform(2268, 262, 116, 22, 0x5d4037);
        lb.addPlatform(2600, 260, 121, 22, 0x795548);
        lb.addPlatform(3007, 231, 135, 22, 0x8d6e63);
        lb.addPlatform(3450, 288, 118, 22, 0x5d4037);
        lb.addPlatform(3448, 291, 114, 22, 0x6d4c41);
        lb.addPlatform(3928, 252, 131, 22, 0x5d4037);
        lb.addPlatform(4479, 275, 166, 22, 0x795548);
        lb.addPlatform(4326, 247, 153, 22, 0x8d6e63);
        lb.addPlatform(5020, 315, 169, 22, 0x5d4037);
        lb.addPlatform(5144, 286, 123, 22, 0x6d4c41);
        lb.addPlatform(5907, 221, 129, 22, 0x5d4037);
        lb.addPlatform(6058, 290, 110, 22, 0x795548);
        lb.addPlatform(6626, 203, 169, 22, 0x8d6e63);

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

        lb.addStar(594, 210);
        lb.addStar(1624, 192);
        lb.addStar(2698, 182);

        lb.addEnemy(418, 340, 'ghost', 135);
        lb.addEnemy(985, 340, 'bat', 126);
        lb.addEnemy(1583, 340, 'ghost', 157);
        lb.addEnemy(2124, 340, 'bat', 111);
        lb.addEnemy(2652, 340, 'ghost', 177);
        lb.addEnemy(3269, 340, 'bat', 142);

        lb.addHazard(547, h-80, 64, 20, 'spike');
        lb.addHazard(1189, h-80, 64, 20, 'lava');
        lb.addHazard(1774, h-80, 64, 20, 'spike');
        lb.addHazard(2369, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'rock', 0.9);
        lb.addDecoration(403, 310, 'tree', 1.0);
        lb.addDecoration(726, 310, 'mushroom', 0.9);
        lb.addDecoration(1049, 310, 'rock', 1.0);
        lb.addDecoration(1372, 310, 'tree', 0.9);
        lb.addDecoration(1695, 310, 'mushroom', 0.9);
        lb.addDecoration(2018, 310, 'rock', 1.1);
        lb.addDecoration(2341, 310, 'tree', 0.8);
        lb.addDecoration(2664, 310, 'mushroom', 1.0);
        lb.addDecoration(2987, 310, 'rock', 1.0);
        lb.addDecoration(3310, 310, 'tree', 1.1);
        lb.addDecoration(3633, 310, 'mushroom', 1.1);
        lb.addGoal(4080, h - 160);
        const ns = this.npcSystem;
        ns.create(1400, 300, 'pirata', { name: 'Pirata', lines: ['Yo ho ho! Vamos à aventura, Miguel!', 'Tesouros aguardam no horizonte!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4200;
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
