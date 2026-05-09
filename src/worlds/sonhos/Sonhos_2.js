class Sonhos_2 extends BaseGameScene {
    constructor() {
        super('Sonhos_2', { worldId: 'sonhos', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x1a0030, 60);

        lb.addPlatform(280, 266, 120, 22, 0x1a0030);
        lb.addPlatform(579, 278, 160, 22, 0x6d4c41);
        lb.addPlatform(924, 239, 119, 22, 0x5d4037);
        lb.addPlatform(1258, 294, 135, 22, 0x795548);
        lb.addPlatform(1636, 227, 155, 22, 0x8d6e63);
        lb.addPlatform(1875, 297, 110, 22, 0x1a0030);
        lb.addPlatform(2296, 268, 124, 22, 0x6d4c41);
        lb.addPlatform(2632, 215, 156, 22, 0x5d4037);
        lb.addPlatform(2576, 260, 131, 22, 0x795548);
        lb.addPlatform(2953, 206, 136, 22, 0x8d6e63);
        lb.addPlatform(3230, 265, 166, 22, 0x1a0030);
        lb.addPlatform(3448, 298, 129, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(577, 200);
        lb.addStar(1477, 174);
        lb.addStar(2272, 191);

        lb.addEnemy(410, 340, 'ghost', 139);
        lb.addEnemy(979, 340, 'bat', 148);
        lb.addEnemy(1596, 340, 'ghost', 117);
        lb.addEnemy(2085, 340, 'bat', 129);



        lb.addDecoration(80, 310, 'mushroom', 1.1);
        lb.addDecoration(341, 310, 'flower', 0.8);
        lb.addDecoration(602, 310, 'bush', 0.9);
        lb.addDecoration(863, 310, 'mushroom', 1.0);
        lb.addDecoration(1124, 310, 'flower', 0.9);
        lb.addDecoration(1385, 310, 'bush', 0.9);
        lb.addDecoration(1646, 310, 'mushroom', 0.9);
        lb.addDecoration(1907, 310, 'flower', 0.9);
        lb.addDecoration(2168, 310, 'bush', 0.8);
        lb.addDecoration(2429, 310, 'mushroom', 1.0);
        lb.addDecoration(2690, 310, 'flower', 1.1);
        lb.addDecoration(2951, 310, 'bush', 1.0);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'feiticeira', { name: 'Feiticeira', lines: ['As estrelas guiam seu caminho, Miguel!', 'A magia está dentro de você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
