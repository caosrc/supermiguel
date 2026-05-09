class Medieval_10 extends BaseGameScene {
    constructor() {
        super('Medieval_10', { worldId: 'medieval', levelNum: 10 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(5000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 237, 131, 22, 0x5d4037);
        lb.addPlatform(577, 320, 133, 22, 0x6d4c41);
        lb.addPlatform(916, 220, 122, 22, 0x5d4037);
        lb.addPlatform(1153, 285, 125, 22, 0x795548);
        lb.addPlatform(1548, 242, 131, 22, 0x8d6e63);
        lb.addPlatform(1965, 292, 140, 22, 0x5d4037);
        lb.addPlatform(2314, 262, 119, 22, 0x6d4c41);
        lb.addPlatform(2541, 237, 166, 22, 0x5d4037);
        lb.addPlatform(2600, 280, 149, 22, 0x795548);
        lb.addPlatform(2800, 230, 131, 22, 0x8d6e63);
        lb.addPlatform(3270, 290, 119, 22, 0x5d4037);
        lb.addPlatform(3591, 295, 140, 22, 0x6d4c41);
        lb.addPlatform(4060, 213, 125, 22, 0x5d4037);
        lb.addPlatform(4557, 260, 144, 22, 0x795548);
        lb.addPlatform(4536, 190, 114, 22, 0x8d6e63);
        lb.addPlatform(4570, 312, 148, 22, 0x5d4037);
        lb.addPlatform(4936, 242, 126, 22, 0x6d4c41);
        lb.addPlatform(6009, 251, 170, 22, 0x5d4037);
        lb.addPlatform(5842, 274, 159, 22, 0x795548);
        lb.addPlatform(5657, 227, 124, 22, 0x8d6e63);
        lb.addPlatform(5940, 251, 120, 22, 0x5d4037);
        lb.addPlatform(6769, 305, 114, 22, 0x6d4c41);
        lb.addPlatform(7034, 218, 166, 22, 0x5d4037);
        lb.addPlatform(7617, 276, 120, 22, 0x795548);
        lb.addPlatform(7072, 212, 150, 22, 0x8d6e63);
        lb.addPlatform(7405, 306, 126, 22, 0x5d4037);
        lb.addPlatform(7664, 270, 136, 22, 0x6d4c41);
        lb.addPlatform(7894, 227, 119, 22, 0x5d4037);

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

        lb.addStar(577, 201);
        lb.addStar(1816, 209);
        lb.addStar(3114, 202);

        lb.addEnemy(467, 340, 'ghost', 119);
        lb.addEnemy(968, 340, 'bat', 111);
        lb.addEnemy(1591, 340, 'ghost', 155);
        lb.addEnemy(2080, 340, 'bat', 105);
        lb.addEnemy(2652, 340, 'ghost', 132);
        lb.addEnemy(3215, 340, 'bat', 166);
        lb.addEnemy(3835, 340, 'ghost', 118);
        lb.addEnemy(4350, 340, 'bat', 133);

        lb.addHazard(573, h-80, 64, 20, 'spike');
        lb.addHazard(1112, h-80, 64, 20, 'lava');
        lb.addHazard(1728, h-80, 64, 20, 'spike');
        lb.addHazard(2301, h-80, 64, 20, 'lava');
        lb.addHazard(2944, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'rock', 1.0);
        lb.addDecoration(464, 310, 'tree', 0.8);
        lb.addDecoration(848, 310, 'mushroom', 1.1);
        lb.addDecoration(1232, 310, 'rock', 1.1);
        lb.addDecoration(1616, 310, 'tree', 0.9);
        lb.addDecoration(2000, 310, 'mushroom', 0.8);
        lb.addDecoration(2384, 310, 'rock', 1.0);
        lb.addDecoration(2768, 310, 'tree', 0.8);
        lb.addDecoration(3152, 310, 'mushroom', 1.1);
        lb.addDecoration(3536, 310, 'rock', 0.9);
        lb.addDecoration(3920, 310, 'tree', 1.1);
        lb.addDecoration(4304, 310, 'mushroom', 0.9);
        lb.addGoal(4880, h - 160);
        const ns = this.npcSystem;
        ns.create(1666, 300, 'knight', { name: 'Knight', lines: ['Honra e bravura, jovem guerreiro!', 'O reino precisa de heróis como você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 5000;
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
