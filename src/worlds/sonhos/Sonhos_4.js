class Sonhos_4 extends BaseGameScene {
    constructor() {
        super('Sonhos_4', { worldId: 'sonhos', levelNum: 4 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3800);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 268, 158, 22, 0x1a0030);
        lb.addPlatform(566, 294, 123, 22, 0x6d4c41);
        lb.addPlatform(920, 247, 169, 22, 0x5d4037);
        lb.addPlatform(1189, 297, 163, 22, 0x795548);
        lb.addPlatform(1464, 249, 139, 22, 0x8d6e63);
        lb.addPlatform(1840, 300, 138, 22, 0x1a0030);
        lb.addPlatform(1996, 284, 149, 22, 0x6d4c41);
        lb.addPlatform(2429, 254, 166, 22, 0x5d4037);
        lb.addPlatform(2632, 270, 168, 22, 0x795548);
        lb.addPlatform(3106, 228, 163, 22, 0x8d6e63);
        lb.addPlatform(3470, 255, 128, 22, 0x1a0030);
        lb.addPlatform(3877, 295, 143, 22, 0x6d4c41);
        lb.addPlatform(4144, 263, 135, 22, 0x5d4037);
        lb.addPlatform(4414, 310, 118, 22, 0x795548);
        lb.addPlatform(5012, 191, 152, 22, 0x8d6e63);
        lb.addPlatform(5290, 283, 152, 22, 0x1a0030);

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

        lb.addStar(610, 191);
        lb.addStar(1564, 170);
        lb.addStar(2495, 197);

        lb.addEnemy(403, 340, 'ghost', 128);
        lb.addEnemy(989, 340, 'bat', 178);
        lb.addEnemy(1593, 340, 'ghost', 142);
        lb.addEnemy(2109, 340, 'bat', 102);
        lb.addEnemy(2647, 340, 'ghost', 177);

        lb.addHazard(590, h-80, 64, 20, 'spike');
        lb.addHazard(1179, h-80, 64, 20, 'lava');
        lb.addHazard(1780, h-80, 64, 20, 'spike');

        lb.addDecoration(80, 310, 'mushroom', 0.9);
        lb.addDecoration(372, 310, 'flower', 1.0);
        lb.addDecoration(664, 310, 'bush', 0.9);
        lb.addDecoration(956, 310, 'mushroom', 1.0);
        lb.addDecoration(1248, 310, 'flower', 1.0);
        lb.addDecoration(1540, 310, 'bush', 0.9);
        lb.addDecoration(1832, 310, 'mushroom', 0.9);
        lb.addDecoration(2124, 310, 'flower', 1.0);
        lb.addDecoration(2416, 310, 'bush', 0.8);
        lb.addDecoration(2708, 310, 'mushroom', 1.0);
        lb.addDecoration(3000, 310, 'flower', 1.0);
        lb.addDecoration(3292, 310, 'bush', 1.0);
        lb.addGoal(3680, h - 160);
        const ns = this.npcSystem;
        ns.create(1266, 300, 'mae', { name: 'Mae', lines: ['Miguel, lembre-se de sempre beber água!', 'Você é incrível, meu filho!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3800;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0x1a0040, 0x1a0040, 0x3a0080, 0x3a0080, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=350){
            var iy=80+(i%200);
            bg.fillStyle(0x4a0080,0.7); bg.fillEllipse(i+150,iy,150,40);
            bg.fillStyle(0xab47bc,0.5); bg.fillEllipse(i+150,iy-10,140,25);
            bg.fillStyle(0x7c4dff,1); bg.fillCircle(i+130,iy-22,12);
            bg.fillCircle(i+155,iy-26,16); bg.fillCircle(i+175,iy-20,10);
        }
        bg.fillStyle(0xffffff,1);
        for(var i=0;i<LW;i+=50){
            var sz=1+((i*7)%4);
            bg.fillStyle(0xffffff,0.4+((i*3)%40)/100);
            bg.fillCircle(i+25,((i*13)%300)+20,sz);
        }
        for(var i=0;i<5;i++){
            bg.fillStyle([0x7c4dff,0xe91e63,0x00bcd4,0x4caf50,0xff9800][i],0.05);
            bg.fillRect(0,i*60,LW,50);
        }
        for(var i=0;i<LW;i+=280){
            bg.fillStyle(0xce93d8,0.7);
            bg.fillTriangle(i+20,h-60,i+28,h-100,i+36,h-60);
            bg.fillTriangle(i+30,h-60,i+40,h-110,i+50,h-60);
            bg.fillTriangle(i+45,h-60,i+52,h-90,i+60,h-60);
        }

        bg.fillStyle(0x1a0030, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0x7c4dff, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
