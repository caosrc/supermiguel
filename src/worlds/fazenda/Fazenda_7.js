class Fazenda_7 extends BaseGameScene {
    constructor() {
        super('Fazenda_7', { worldId: 'fazenda', levelNum: 7 });
    }
    create() {
        this.preCreate();
        const { width: w, height: h } = this.scale;
        const lb = this.levelBuilder.init(4400);
        this._drawBackground(w, h);
        lb.addGroundRow(h - 60, 0x8b4513, 60);

        lb.addPlatform(280, 266, 133, 22, 0x8b4513);
        lb.addPlatform(613, 278, 135, 22, 0x6d4c41);
        lb.addPlatform(930, 220, 124, 22, 0x5d4037);
        lb.addPlatform(1216, 254, 157, 22, 0x795548);
        lb.addPlatform(1632, 236, 167, 22, 0x8d6e63);
        lb.addPlatform(1905, 279, 158, 22, 0x8b4513);
        lb.addPlatform(2020, 230, 144, 22, 0x6d4c41);
        lb.addPlatform(2422, 254, 151, 22, 0x5d4037);
        lb.addPlatform(2632, 303, 124, 22, 0x795548);
        lb.addPlatform(3277, 205, 127, 22, 0x8d6e63);
        lb.addPlatform(3340, 251, 119, 22, 0x8b4513);
        lb.addPlatform(3525, 289, 169, 22, 0x6d4c41);
        lb.addPlatform(3988, 248, 122, 22, 0x5d4037);
        lb.addPlatform(4349, 302, 137, 22, 0x795548);
        lb.addPlatform(4256, 237, 137, 22, 0x8d6e63);
        lb.addPlatform(4525, 307, 142, 22, 0x8b4513);
        lb.addPlatform(4968, 270, 164, 22, 0x6d4c41);
        lb.addPlatform(5941, 268, 120, 22, 0x5d4037);
        lb.addPlatform(5554, 297, 157, 22, 0x795548);
        lb.addPlatform(6037, 195, 134, 22, 0x8d6e63);
        lb.addPlatform(5900, 266, 117, 22, 0x8b4513);
        lb.addPlatform(6874, 330, 129, 22, 0x6d4c41);

        lb.addCoin(80, 330);
        lb.addCoin(394, 330);
        lb.addCoin(708, 330);
        lb.addCoin(1022, 330);
        lb.addCoin(1336, 330);
        lb.addCoin(1650, 330);
        lb.addCoin(1964, 330);
        lb.addCoin(2278, 330);
        lb.addCoin(2592, 330);
        lb.addCoin(2906, 330);
        lb.addCoin(3220, 330);
        lb.addCoin(3534, 330);
        lb.addCoin(3848, 330);

        lb.addStar(576, 204);
        lb.addStar(1734, 199);
        lb.addStar(2790, 209);

        lb.addEnemy(410, 340, 'slime', 164);
        lb.addEnemy(1040, 340, 'crab', 115);
        lb.addEnemy(1560, 340, 'slime', 157);
        lb.addEnemy(2106, 340, 'crab', 132);
        lb.addEnemy(2663, 340, 'slime', 126);
        lb.addEnemy(3278, 340, 'crab', 119);

        lb.addHazard(566, h-80, 64, 20, 'spike');
        lb.addHazard(1184, h-80, 64, 20, 'lava');
        lb.addHazard(1701, h-80, 64, 20, 'spike');
        lb.addHazard(2332, h-80, 64, 20, 'lava');

        lb.addDecoration(80, 310, 'tree', 0.9);
        lb.addDecoration(418, 310, 'bush', 0.8);
        lb.addDecoration(756, 310, 'rock', 0.8);
        lb.addDecoration(1094, 310, 'flower', 0.9);
        lb.addDecoration(1432, 310, 'mushroom', 0.8);
        lb.addDecoration(1770, 310, 'tree', 1.0);
        lb.addDecoration(2108, 310, 'bush', 0.9);
        lb.addDecoration(2446, 310, 'rock', 1.0);
        lb.addDecoration(2784, 310, 'flower', 1.0);
        lb.addDecoration(3122, 310, 'mushroom', 0.9);
        lb.addDecoration(3460, 310, 'tree', 0.9);
        lb.addDecoration(3798, 310, 'bush', 0.8);
        lb.addGoal(4280, h - 160);
        const ns = this.npcSystem;
        ns.create(1466, 300, 'pai', { name: 'Pai', lines: ['Filho, vai com tudo! Estou orgulhoso de você!', 'Cuidado com os inimigos, herói!'] });
        this.setupMiguel(100, h - 160);
        this.setupCollisions();
    }
    _drawBackground(w, h) {
        const LW = 4400;
        const bg = this.add.graphics().setDepth(1);

        bg.fillGradientStyle(0xffe0a0, 0xffe0a0, 0xfff3d0, 0xfff3d0, 1);
        bg.fillRect(0, 0, LW, h);
        for(var i=0;i<LW;i+=400){
            bg.fillStyle(0xcc3333,1); bg.fillRect(i+50,h-130,100,70);
            bg.fillStyle(0x992222,1); bg.fillTriangle(i+40,h-130,i+100,h-190,i+160,h-130);
            bg.fillStyle(0xdddddd,1); bg.fillRect(i+90,h-120,20,30);
            bg.fillStyle(0x8b4513,1); bg.fillRect(i+75,h-100,12,40); bg.fillRect(i+113,h-100,12,40);
            bg.fillStyle(0xc8a83a,1); bg.fillEllipse(i+250,h-75,60,40);
            for(var j=0;j<5;j++){ bg.fillStyle(0xffd700,0.5); bg.fillRect(i+230+j*8,h-78,2,36); }
            for(var f=i;f<i+400;f+=30){
                bg.fillStyle(0xc8a070,1); bg.fillRect(f,h-80,6,24);
            }
        }
        for(var i=0;i<LW;i+=140){
            bg.fillStyle(0x228b22,1); bg.fillRect(i+60,h-100,4,40);
            bg.fillStyle(0xffd700,1); bg.fillCircle(i+62,h-100,14);
            bg.fillStyle(0x8b4513,1); bg.fillCircle(i+62,h-100,6);
        }

        bg.fillStyle(0x8b4513, 1); bg.fillRect(0, h-60, LW, 60);
        bg.fillStyle(0xc8a83a, 1); bg.fillRect(0, h-62, LW, 8);
        for(var i=0;i<LW;i+=36){ bg.fillTriangle(i, h-62, i+18, h-74, i+36, h-62); }
    }
}
