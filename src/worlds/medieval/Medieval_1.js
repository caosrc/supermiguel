class Medieval_1 extends BaseGameScene {
    constructor() {
        super('Medieval_1', { worldId: 'medieval', levelNum: 1 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(3200);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x5d4037, 60);

        lb.addPlatform(280, 263, 116, 22, 0x5d4037);
        lb.addPlatform(565, 323, 149, 22, 0x6d4c41);
        lb.addPlatform(922, 223, 153, 22, 0x5d4037);
        lb.addPlatform(1135, 271, 146, 22, 0x795548);
        lb.addPlatform(1548, 200, 143, 22, 0x8d6e63);
        lb.addPlatform(1945, 315, 156, 22, 0x5d4037);
        lb.addPlatform(2050, 239, 118, 22, 0x6d4c41);
        lb.addPlatform(2289, 229, 144, 22, 0x5d4037);
        lb.addPlatform(2840, 303, 111, 22, 0x795548);
        lb.addPlatform(3295, 222, 160, 22, 0x8d6e63);

        lb.addCoin(80, 330);
        lb.addCoin(480, 330);
        lb.addCoin(880, 330);
        lb.addCoin(1280, 330);
        lb.addCoin(1680, 330);
        lb.addCoin(2080, 330);
        lb.addCoin(2480, 330);

        lb.addStar(584, 209);
        lb.addStar(1383, 202);
        lb.addStar(2187, 203);

        lb.addEnemy(433, 340, 'ghost', 169);
        lb.addEnemy(1010, 340, 'bat', 136);
        lb.addEnemy(1527, 340, 'ghost', 170);



        lb.addDecoration(80, 310, 'rock', 0.9);
        lb.addDecoration(326, 310, 'tree', 1.0);
        lb.addDecoration(572, 310, 'mushroom', 1.0);
        lb.addDecoration(818, 310, 'rock', 0.9);
        lb.addDecoration(1064, 310, 'tree', 0.8);
        lb.addDecoration(1310, 310, 'mushroom', 1.0);
        lb.addDecoration(1556, 310, 'rock', 1.0);
        lb.addDecoration(1802, 310, 'tree', 1.0);
        lb.addDecoration(2048, 310, 'mushroom', 0.8);
        lb.addDecoration(2294, 310, 'rock', 1.0);
        lb.addDecoration(2540, 310, 'tree', 1.0);
        lb.addDecoration(2786, 310, 'mushroom', 1.0);
        lb.addGoal(3080, h - 160);
        const ns = this.npcSystem;
        ns.create(1066, 300, 'pirata', { name: 'Pirata', lines: ['Yo ho ho! Vamos à aventura, Miguel!', 'Tesouros aguardam no horizonte!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 3200;
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
