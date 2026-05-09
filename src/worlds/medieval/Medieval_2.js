class Medieval_2 extends BaseGameScene {
    constructor() {
        super('Medieval_2', { worldId: 'medieval', levelNum: 2 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 280, 162, 22, 0x5d4037);
        lb.addPlatform(604, 286, 166, 22, 0x6d4c41);
        lb.addPlatform(860, 218, 165, 22, 0x5d4037);
        lb.addPlatform(1237, 281, 116, 22, 0x795548);
        lb.addPlatform(1584, 237, 123, 22, 0x8d6e63);
        lb.addPlatform(1790, 326, 163, 22, 0x5d4037);
        lb.addPlatform(2098, 281, 147, 22, 0x6d4c41);
        lb.addPlatform(2373, 215, 135, 22, 0x5d4037);
        lb.addPlatform(2840, 291, 170, 22, 0x795548);
        lb.addPlatform(3133, 218, 170, 22, 0x8d6e63);
        lb.addPlatform(3210, 238, 113, 22, 0x5d4037);
        lb.addPlatform(3558, 322, 137, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(457, 330);
        lb.addCoin(834, 330);
        lb.addCoin(1211, 330);
        lb.addCoin(1588, 330);
        lb.addCoin(1965, 330);
        lb.addCoin(2342, 330);
        lb.addCoin(2719, 330);

        lb.addStar(596, 206);
        lb.addStar(1478, 195);
        lb.addStar(2300, 191);

        lb.addEnemy(454, 340, 'ghost', 115);
        lb.addEnemy(970, 340, 'bat', 172);
        lb.addEnemy(1532, 340, 'ghost', 142);
        lb.addEnemy(2124, 340, 'bat', 145);



        lb.addDecoration(80, 310, 'rock', 0.9);
        lb.addDecoration(341, 310, 'tree', 0.9);
        lb.addDecoration(602, 310, 'mushroom', 0.9);
        lb.addDecoration(863, 310, 'rock', 1.0);
        lb.addDecoration(1124, 310, 'tree', 0.9);
        lb.addDecoration(1385, 310, 'mushroom', 1.0);
        lb.addDecoration(1646, 310, 'rock', 1.0);
        lb.addDecoration(1907, 310, 'tree', 1.0);
        lb.addDecoration(2168, 310, 'mushroom', 0.9);
        lb.addDecoration(2429, 310, 'rock', 0.9);
        lb.addDecoration(2690, 310, 'tree', 0.9);
        lb.addDecoration(2951, 310, 'mushroom', 0.8);
        lb.addGoal(3280, h - 160);
        const ns = this.npcSystem;
        ns.create(1133, 300, 'feiticeira', { name: 'Feiticeira', lines: ['As estrelas guiam seu caminho, Miguel!', 'A magia está dentro de você!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3400;
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
