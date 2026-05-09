class Medieval_5 extends BaseGameScene {
    constructor() {
        super('Medieval_5', { worldId: 'medieval', levelNum: 5 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4000);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 258, 115, 22, 0x5d4037);
        lb.addPlatform(598, 292, 159, 22, 0x6d4c41);
        lb.addPlatform(886, 236, 120, 22, 0x5d4037);
        lb.addPlatform(1201, 258, 122, 22, 0x795548);
        lb.addPlatform(1416, 225, 134, 22, 0x8d6e63);
        lb.addPlatform(1775, 324, 121, 22, 0x5d4037);
        lb.addPlatform(2140, 263, 155, 22, 0x6d4c41);
        lb.addPlatform(2436, 218, 130, 22, 0x5d4037);
        lb.addPlatform(2944, 291, 167, 22, 0x795548);
        lb.addPlatform(3322, 233, 136, 22, 0x8d6e63);
        lb.addPlatform(3180, 274, 129, 22, 0x5d4037);
        lb.addPlatform(3943, 317, 168, 22, 0x6d4c41);
        lb.addPlatform(4012, 252, 140, 22, 0x5d4037);
        lb.addPlatform(4193, 285, 149, 22, 0x795548);
        lb.addPlatform(4802, 250, 157, 22, 0x8d6e63);
        lb.addPlatform(5110, 315, 161, 22, 0x5d4037);
        lb.addPlatform(4856, 270, 118, 22, 0x6d4c41);
        lb.addPlatform(5822, 240, 155, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(413, 330);
        lb.addCoin(746, 330);
        lb.addCoin(1079, 330);
        lb.addCoin(1412, 330);
        lb.addCoin(1745, 330);
        lb.addCoin(2078, 330);
        lb.addCoin(2411, 330);
        lb.addCoin(2744, 330);
        lb.addCoin(3077, 330);
        lb.addCoin(3410, 330);

        lb.addStar(586, 189);
        lb.addStar(1577, 185);
        lb.addStar(2620, 173);

        lb.addEnemy(430, 340, 'ghost', 126);
        lb.addEnemy(979, 340, 'bat', 120);
        lb.addEnemy(1585, 340, 'ghost', 135);
        lb.addEnemy(2094, 340, 'bat', 179);
        lb.addEnemy(2700, 340, 'ghost', 169);

        lb.addHazard(515, h-80, 64, 20, 'spike');
        lb.addHazard(1118, h-80, 64, 20, 'lava');
        lb.addHazard(1767, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'rock', 0.8);
        lb.addDecoration(387, 310, 'tree', 0.9);
        lb.addDecoration(694, 310, 'mushroom', 0.9);
        lb.addDecoration(1001, 310, 'rock', 1.0);
        lb.addDecoration(1308, 310, 'tree', 1.0);
        lb.addDecoration(1615, 310, 'mushroom', 0.9);
        lb.addDecoration(1922, 310, 'rock', 1.0);
        lb.addDecoration(2229, 310, 'tree', 1.0);
        lb.addDecoration(2536, 310, 'mushroom', 0.9);
        lb.addDecoration(2843, 310, 'rock', 1.0);
        lb.addDecoration(3150, 310, 'tree', 1.0);
        lb.addDecoration(3457, 310, 'mushroom', 1.1);
        lb.addGoal(3880, h - 160);
        const ns = this.npcSystem;
        ns.create(1333, 300, 'knight', { name: 'Knight', lines: ['Honra e bravura, jovem guerreiro!', 'O reino precisa de heróis como você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4000;
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
