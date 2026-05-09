class Espaco_4 extends BaseGameScene {
    constructor() {
        super('Espaco_4', { worldId: 'espaco', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 285, 118, 22, 0x303050);
        lb.addPlatform(612, 319, 139, 22, 0x6d4c41);
        lb.addPlatform(944, 211, 149, 22, 0x5d4037);
        lb.addPlatform(1291, 288, 162, 22, 0x795548);
        lb.addPlatform(1444, 208, 138, 22, 0x8d6e63);
        lb.addPlatform(1790, 286, 145, 22, 0x303050);
        lb.addPlatform(2182, 241, 140, 22, 0x6d4c41);
        lb.addPlatform(2632, 256, 153, 22, 0x5d4037);
        lb.addPlatform(2792, 270, 128, 22, 0x795548);
        lb.addPlatform(2845, 196, 169, 22, 0x8d6e63);
        lb.addPlatform(3300, 235, 126, 22, 0x303050);
        lb.addPlatform(3899, 316, 141, 22, 0x6d4c41);
        lb.addPlatform(4312, 222, 129, 22, 0x5d4037);
        lb.addPlatform(4544, 268, 149, 22, 0x795548);
        lb.addPlatform(4214, 238, 156, 22, 0x8d6e63);
        lb.addPlatform(4960, 303, 168, 22, 0x303050);

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

        lb.addStar(646, 198);
        lb.addStar(1582, 183);
        lb.addStar(2520, 181);

        lb.addEnemy(461, 340, 'robot', 108);
        lb.addEnemy(961, 340, 'ghost', 106);
        lb.addEnemy(1579, 340, 'robot', 125);
        lb.addEnemy(2145, 340, 'ghost', 180);
        lb.addEnemy(2656, 340, 'robot', 121);

        lb.addHazard(596, h-80, 64, 20, 'spike');
        lb.addHazard(1172, h-80, 64, 20, 'lava');
        lb.addHazard(1737, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 1.0);
        lb.addDecoration(372, 310, 'bush', 1.0);
        lb.addDecoration(664, 310, 'rock', 0.9);
        lb.addDecoration(956, 310, 'flower', 1.0);
        lb.addDecoration(1248, 310, 'mushroom', 1.0);
        lb.addDecoration(1540, 310, 'tree', 0.8);
        lb.addDecoration(1832, 310, 'bush', 0.8);
        lb.addDecoration(2124, 310, 'rock', 1.0);
        lb.addDecoration(2416, 310, 'flower', 0.8);
        lb.addDecoration(2708, 310, 'mushroom', 1.0);
        lb.addDecoration(3000, 310, 'tree', 1.0);
        lb.addDecoration(3292, 310, 'bush', 0.8);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x000014, 0x000014, 0x0a0a3a, 0x0a0a3a, 1);
        bg.fillRect(0, 0, LW, h);
        bg.fillStyle(0xffffff,1);
        for(var i=0;i<200;i++){
            var sx=(i*137+23)%LW, sy=(i*91+11)%Math.max(1,h-80), ss=(i%3)+1;
            bg.fillCircle(sx,sy,ss);
        }
        bg.fillStyle(0x7c4dff,0.06); bg.fillCircle(200,h*0.3,150);
        bg.fillStyle(0xe91e63,0.05); bg.fillCircle(700,h*0.25,120);
        bg.fillStyle(0x00bcd4,0.06); bg.fillCircle(1400,h*0.35,100);
        bg.fillStyle(0xff6b35,0.9); bg.fillCircle(300,100,50);
        bg.fillStyle(0xff9800,0.4); bg.fillEllipse(300,100,150,20);
        bg.fillStyle(0x4fc3f7,0.8); bg.fillCircle(900,80,35);
        bg.fillStyle(0x7c4dff,0.7); bg.fillCircle(1800,120,45);
        bg.fillStyle(0xffd700,0.9); bg.fillCircle(2600,70,25);
        bg.fillStyle(0x555570,0.8);
        for(var i=0;i<LW;i+=180){ bg.fillCircle(i+90,h-60,20+(i%60)); }

        bg.fillStyle(0x303050, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x404060, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
