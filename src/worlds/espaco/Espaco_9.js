class Espaco_9 extends BaseGameScene {
    constructor() {
        super('Espaco_9', { worldId: 'espaco', levelNum: 9 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x303050, 60);

        lb.addPlatform(280, 256, 112, 22, 0x303050);
        lb.addPlatform(568, 284, 151, 22, 0x6d4c41);
        lb.addPlatform(896, 242, 158, 22, 0x5d4037);
        lb.addPlatform(1162, 257, 121, 22, 0x795548);
        lb.addPlatform(1564, 192, 137, 22, 0x8d6e63);
        lb.addPlatform(1680, 305, 121, 22, 0x303050);
        lb.addPlatform(2284, 248, 163, 22, 0x6d4c41);
        lb.addPlatform(2387, 257, 121, 22, 0x5d4037);
        lb.addPlatform(2712, 273, 156, 22, 0x795548);
        lb.addPlatform(2872, 211, 161, 22, 0x8d6e63);
        lb.addPlatform(3330, 234, 121, 22, 0x303050);
        lb.addPlatform(3404, 279, 132, 22, 0x6d4c41);
        lb.addPlatform(4144, 227, 130, 22, 0x5d4037);
        lb.addPlatform(4141, 261, 157, 22, 0x795548);
        lb.addPlatform(4270, 191, 153, 22, 0x8d6e63);
        lb.addPlatform(5035, 298, 130, 22, 0x303050);
        lb.addPlatform(5384, 262, 138, 22, 0x6d4c41);
        lb.addPlatform(5737, 218, 146, 22, 0x5d4037);
        lb.addPlatform(5680, 300, 165, 22, 0x795548);
        lb.addPlatform(6379, 191, 128, 22, 0x8d6e63);
        lb.addPlatform(6160, 262, 113, 22, 0x303050);
        lb.addPlatform(6643, 282, 117, 22, 0x6d4c41);
        lb.addPlatform(7342, 254, 117, 22, 0x5d4037);
        lb.addPlatform(7019, 299, 152, 22, 0x795548);
        lb.addPlatform(8320, 215, 120, 22, 0x8d6e63);
        lb.addPlatform(7555, 320, 167, 22, 0x303050);

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

        lb.addStar(609, 205);
        lb.addStar(1794, 190);
        lb.addStar(3010, 193);

        lb.addEnemy(418, 340, 'robot', 103);
        lb.addEnemy(1030, 340, 'ghost', 172);
        lb.addEnemy(1560, 340, 'robot', 119);
        lb.addEnemy(2102, 340, 'ghost', 156);
        lb.addEnemy(2651, 340, 'robot', 147);
        lb.addEnemy(3211, 340, 'ghost', 178);
        lb.addEnemy(3760, 340, 'robot', 161);

        lb.addHazard(572, h-80, 64, 20, 'spike');
        lb.addHazard(1122, h-80, 64, 20, 'lava');
        lb.addHazard(1700, h-80, 64, 20, 'spike');
        lb.addHazard(2397, h-80, 64, 20, 'lava');
        lb.addHazard(2985, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(449, 310, 'bush', 0.9);
        lb.addDecoration(818, 310, 'rock', 1.1);
        lb.addDecoration(1187, 310, 'flower', 0.8);
        lb.addDecoration(1556, 310, 'mushroom', 0.9);
        lb.addDecoration(1925, 310, 'tree', 0.9);
        lb.addDecoration(2294, 310, 'bush', 0.9);
        lb.addDecoration(2663, 310, 'rock', 1.0);
        lb.addDecoration(3032, 310, 'flower', 1.0);
        lb.addDecoration(3401, 310, 'mushroom', 0.8);
        lb.addDecoration(3770, 310, 'tree', 1.0);
        lb.addDecoration(4139, 310, 'bush', 0.8);
        lb.addGoal(4680, h - 160);
        const ns = this.npcSystem;
        ns.create(1600, 300, 'fada', { name: 'Fada', lines: ['Eu te concedo um feitiço de coragem!', 'Acredite em você, Miguel!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4800;
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
