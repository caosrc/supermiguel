class Medieval_9 extends BaseGameScene {
    constructor() {
        super('Medieval_9', { worldId: 'medieval', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 289, 114, 22, 0x5d4037);
        lb.addPlatform(578, 289, 161, 22, 0x6d4c41);
        lb.addPlatform(922, 269, 149, 22, 0x5d4037);
        lb.addPlatform(1243, 258, 143, 22, 0x795548);
        lb.addPlatform(1428, 248, 122, 22, 0x8d6e63);
        lb.addPlatform(1680, 329, 143, 22, 0x5d4037);
        lb.addPlatform(2248, 271, 158, 22, 0x6d4c41);
        lb.addPlatform(2569, 223, 129, 22, 0x5d4037);
        lb.addPlatform(2808, 265, 119, 22, 0x795548);
        lb.addPlatform(3223, 203, 144, 22, 0x8d6e63);
        lb.addPlatform(3340, 284, 157, 22, 0x5d4037);
        lb.addPlatform(3437, 286, 166, 22, 0x6d4c41);
        lb.addPlatform(4120, 213, 124, 22, 0x5d4037);
        lb.addPlatform(4557, 274, 151, 22, 0x795548);
        lb.addPlatform(4662, 218, 145, 22, 0x8d6e63);
        lb.addPlatform(5125, 283, 158, 22, 0x5d4037);
        lb.addPlatform(5400, 281, 123, 22, 0x6d4c41);
        lb.addPlatform(5958, 241, 161, 22, 0x5d4037);
        lb.addPlatform(6040, 270, 139, 22, 0x795548);
        lb.addPlatform(6075, 235, 135, 22, 0x8d6e63);
        lb.addPlatform(6020, 282, 166, 22, 0x5d4037);
        lb.addPlatform(6916, 270, 170, 22, 0x6d4c41);
        lb.addPlatform(7166, 213, 145, 22, 0x5d4037);
        lb.addPlatform(7686, 258, 159, 22, 0x795548);
        lb.addPlatform(7048, 230, 116, 22, 0x8d6e63);
        lb.addPlatform(7830, 326, 144, 22, 0x5d4037);

        lb.addCoin(80, 330);
        lb.addCoin(380, 330);
        lb.addCoin(680, 330);
        lb.addCoin(980, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1580, 330);
        lb.addCoin(1880, 330);
        lb.addCoin(2180, 330);
        lb.addCoin(2480, 330);
        lb.addCoin(2780, 330);
        lb.addCoin(3080, 330);
        lb.addCoin(3380, 330);
        lb.addCoin(3680, 330);
        lb.addCoin(3980, 330);
        lb.addCoin(4280, 330);

        lb.addStar(627, 172);
        lb.addStar(1772, 186);
        lb.addStar(3047, 210);

        lb.addEnemy(467, 340, 'ghost', 114);
        lb.addEnemy(994, 340, 'bat', 131);
        lb.addEnemy(1588, 340, 'ghost', 175);
        lb.addEnemy(2136, 340, 'bat', 124);
        lb.addEnemy(2695, 340, 'ghost', 126);
        lb.addEnemy(3280, 340, 'bat', 142);
        lb.addEnemy(3810, 340, 'ghost', 158);

        lb.addHazard(578, h-80, 64, 20, 'spike');
        lb.addHazard(1109, h-80, 64, 20, 'lava');
        lb.addHazard(1751, h-80, 64, 20, 'spike');
        lb.addHazard(2361, h-80, 64, 20, 'lava');
        lb.addHazard(2942, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'rock', 0.9);
        lb.addDecoration(449, 310, 'tree', 1.0);
        lb.addDecoration(818, 310, 'mushroom', 0.8);
        lb.addDecoration(1187, 310, 'rock', 1.0);
        lb.addDecoration(1556, 310, 'tree', 1.0);
        lb.addDecoration(1925, 310, 'mushroom', 1.0);
        lb.addDecoration(2294, 310, 'rock', 1.0);
        lb.addDecoration(2663, 310, 'tree', 0.8);
        lb.addDecoration(3032, 310, 'mushroom', 1.0);
        lb.addDecoration(3401, 310, 'rock', 1.0);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'mushroom', 1.0);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
