class Medieval_4 extends BaseGameScene {
    constructor() {
        super('Medieval_4', { worldId: 'medieval', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 244, 160, 22, 0x5d4037);
        lb.addPlatform(617, 328, 114, 22, 0x6d4c41);
        lb.addPlatform(864, 251, 132, 22, 0x5d4037);
        lb.addPlatform(1279, 307, 124, 22, 0x795548);
        lb.addPlatform(1620, 215, 148, 22, 0x8d6e63);
        lb.addPlatform(1830, 320, 153, 22, 0x5d4037);
        lb.addPlatform(2110, 238, 132, 22, 0x6d4c41);
        lb.addPlatform(2646, 217, 131, 22, 0x5d4037);
        lb.addPlatform(2936, 272, 130, 22, 0x795548);
        lb.addPlatform(3151, 229, 112, 22, 0x8d6e63);
        lb.addPlatform(3370, 260, 161, 22, 0x5d4037);
        lb.addPlatform(3459, 330, 130, 22, 0x6d4c41);
        lb.addPlatform(4072, 230, 138, 22, 0x5d4037);
        lb.addPlatform(4024, 293, 150, 22, 0x795548);
        lb.addPlatform(4270, 219, 124, 22, 0x8d6e63);
        lb.addPlatform(5185, 307, 119, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(425, 330);
        lb.addCoin(770, 330);
        lb.addCoin(1115, 330);
        lb.addCoin(1460, 330);
        lb.addCoin(1805, 330);
        lb.addCoin(2150, 330);
        lb.addCoin(2495, 330);
        lb.addCoin(2840, 330);
        lb.addCoin(3185, 330);

        lb.addStar(631, 208);
        lb.addStar(1520, 178);
        lb.addStar(2505, 192);

        lb.addEnemy(449, 340, 'ghost', 175);
        lb.addEnemy(997, 340, 'bat', 162);
        lb.addEnemy(1522, 340, 'ghost', 162);
        lb.addEnemy(2102, 340, 'bat', 109);
        lb.addEnemy(2647, 340, 'ghost', 128);

        lb.addHazard(503, h-80, 64, 20, 'spike');
        lb.addHazard(1191, h-80, 64, 20, 'lava');
        lb.addHazard(1723, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'rock', 1.0);
        lb.addDecoration(372, 310, 'tree', 1.0);
        lb.addDecoration(664, 310, 'mushroom', 1.1);
        lb.addDecoration(956, 310, 'rock', 0.8);
        lb.addDecoration(1248, 310, 'tree', 0.9);
        lb.addDecoration(1540, 310, 'mushroom', 0.9);
        lb.addDecoration(1832, 310, 'rock', 1.1);
        lb.addDecoration(2124, 310, 'tree', 0.9);
        lb.addDecoration(2416, 310, 'mushroom', 0.9);
        lb.addDecoration(2708, 310, 'rock', 0.9);
        lb.addDecoration(3000, 310, 'tree', 1.0);
        lb.addDecoration(3292, 310, 'mushroom', 1.0);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
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
