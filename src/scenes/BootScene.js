class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.spritesheet('miguel', 'assets/miguel.png', {
            frameWidth: 256,
            frameHeight: 384
        });
    }

    create() {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a0a2e, 0x1a0a2e, 0x0d3b5e, 0x0d3b5e, 1);
        bg.fillRect(0, 0, width, height);

        const title = this.add.text(width / 2, height / 2 - 80, 'Super Miguel', {
            fontSize: '52px',
            fill: '#FFD700',
            fontStyle: 'bold',
            stroke: '#8B4513',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 20, 'As Aventuras de Miguel', {
            fontSize: '22px',
            fill: '#FFFFFF',
            stroke: '#333333',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 40, 'Carregando...', {
            fontSize: '18px',
            fill: '#AAAAAA'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: title,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this._createAnimations();

        const preview = this.add.sprite(width / 2, height / 2 + 155, 'miguel', 5);
        preview.setScale(0.22);
        preview.setCrop(0, 100, 256, 284);
        preview.play('miguel_andar');

        // ── Mundo 1: Cidade ──────────────────────────────────────────────
        GraphicsHelper.createGround(this, 'ground',    0x8B6914, 3200, 40);
        GraphicsHelper.createGround(this, 'sidewalk',  0xC0C0C0, 3200, 24);
        GraphicsHelper.createPlatform(this, 'platform',  0x8B6914, 140, 22);
        GraphicsHelper.createPlatform(this, 'platform2', 0x6B8E4E, 100, 22);

        GraphicsHelper.createCar(this, 'car_red',    0xFF4444);
        GraphicsHelper.createCar(this, 'car_blue',   0x4169E1);
        GraphicsHelper.createCar(this, 'car_yellow', 0xFFD700);

        GraphicsHelper.createTree(this, 'tree');
        GraphicsHelper.createHouse(this, 'house',  0xF5DEB3, 0xB22222);
        GraphicsHelper.createHouse(this, 'house2', 0xADD8E6, 0x8B4513);
        GraphicsHelper.createHouse(this, 'house3', 0xFFFFE0, 0x4169E1);

        GraphicsHelper.createTrafficLight(this, 'semaforo');
        GraphicsHelper.createCrossing(this, 'faixa');
        GraphicsHelper.createBush(this, 'bush');
        GraphicsHelper.createCloud(this, 'cloud');

        GraphicsHelper.createRobotEnemy(this, 'robot');
        GraphicsHelper.createFrogEnemy(this,  'sapo');
        GraphicsHelper.createPowerUpShoe(this,   'powerup_tenis');
        GraphicsHelper.createPowerUpHelmet(this, 'powerup_capacete');

        // ── Mundo 2: Fazenda ─────────────────────────────────────────────
        GraphicsHelper.createGround(this, 'ground_farm', 0x8B4513, 3200, 40);
        GraphicsHelper.createHouse(this, 'fazenda', 0xDEB887, 0x8B6914);
        GraphicsHelper.createNPC(this, 'galinha', 0xFFD700, 0xFF4444, 0xFF4444);

        // ── Mundo 3: Floresta ─────────────────────────────────────────────
        GraphicsHelper.createGround(this, 'ground_floresta', 0x2E1A0E, 3200, 40);
        GraphicsHelper.createPlatform(this, 'platform_galho',  0x5C3010, 140, 18);
        GraphicsHelper.createPlatform(this, 'platform_fungo',  0xFF6600, 120, 16);
        GraphicsHelper.createGiantTree(this, 'giant_tree');
        GraphicsHelper.createMushroom(this, 'cogumelo',      0xFF4444);
        GraphicsHelper.createMushroom(this, 'cogumelo_azul', 0x4169E1);
        GraphicsHelper.createBounceMushroom(this, 'bounce_mushroom');
        GraphicsHelper.createVine(this, 'vine');
        GraphicsHelper.createBeeEnemy(this,  'bee');
        GraphicsHelper.createCollectible(this, 'flor',    0xFF69B4);
        GraphicsHelper.createCollectible(this, 'fruta',   0xFF6347);
        GraphicsHelper.createCollectible(this, 'energia', 0xFFD700);

        // ── Mundo 4: Cachoeira ────────────────────────────────────────────
        GraphicsHelper.createGround(this, 'ground_cachoeira', 0x607060, 3200, 40);
        GraphicsHelper.createRock(this, 'rock',      0x808080);
        GraphicsHelper.createRock(this, 'rock_wet',  0x506070);
        GraphicsHelper.createLog(this,  'log');
        GraphicsHelper.createWaterfall(this, 'waterfall');
        GraphicsHelper.createCrystal(this, 'crystal',      0x00BFFF);
        GraphicsHelper.createCrystal(this, 'crystal_green', 0x00FF88);
        GraphicsHelper.createFishEnemy(this, 'fish_enemy');
        GraphicsHelper.createCollectible(this, 'peixe',       0xFF8C00);
        GraphicsHelper.createCollectible(this, 'agua_pura',   0x4FC3F7);
        GraphicsHelper.createPlatform(this, 'platform_rock', 0x708090, 110, 20);
        GraphicsHelper.createPlatform(this, 'platform_log',  0x8B4513, 100, 16);

        // ── Mundo 5: Doces ────────────────────────────────────────────────
        GraphicsHelper.createChocolateGround(this, 'ground_doces', 3200);
        GraphicsHelper.createDonut(this,       'donut');
        GraphicsHelper.createLollipop(this,    'pirulito');
        GraphicsHelper.createMarshmallow(this, 'marshmallow');
        GraphicsHelper.createCollectible(this, 'doce',  0xFF69B4);
        GraphicsHelper.createCollectible(this, 'bala',  0xFF4444);

        // ── Itens compartilhados ──────────────────────────────────────────
        GraphicsHelper.createWaterBottle(this, 'agua');
        GraphicsHelper.createFood(this,      'comida');
        GraphicsHelper.createMedicine(this,  'remedio');
        GraphicsHelper.createDog(this,       'cachorro');
        GraphicsHelper.createBike(this,      'bicicleta');
        GraphicsHelper.createBed(this,       'cama');
        GraphicsHelper.createCoin(this,      'moeda');
        GraphicsHelper.createStar(this,      'estrela');
        GraphicsHelper.createCollectible(this, 'bola', 0xFF6347);
        GraphicsHelper.createCollectible(this, 'suco', 0xFF8C00);
        GraphicsHelper.createCheckpoint(this, 'checkpoint');

        GraphicsHelper.createParticle(this, 'particle_yellow', 0xFFD700);
        GraphicsHelper.createParticle(this, 'particle_green',  0x00FF00);
        GraphicsHelper.createParticle(this, 'particle_blue',   0x00BFFF);
        GraphicsHelper.createParticle(this, 'particle_pink',   0xFF69B4);

        // ── NPCs ──────────────────────────────────────────────────────────
        GraphicsHelper.createNPC(this, 'pai',        0xFFD700, 0x2E8B57, 0x1a1a1a);
        GraphicsHelper.createNPC(this, 'mae',        0xFFD700, 0xFF69B4, 0x8B4513);
        GraphicsHelper.createNPC(this, 'avo',        0xFFD7A0, 0x9370DB, 0xC0C0C0);
        GraphicsHelper.createNPC(this, 'professora', 0xFFD700, 0x4169E1, 0x333333);
        GraphicsHelper.createNPC(this, 'primo',      0xFFD700, 0xFF4500, 0x8B4513);
        GraphicsHelper.createNPC(this, 'jardineiro', 0xFFD700, 0x228B22, 0x8B4513);
        GraphicsHelper.createNPC(this, 'pescador',   0xFFD700, 0x1E90FF, 0x8B4513);
        GraphicsHelper.createNPC(this, 'cientista',  0xFFD700, 0xFFFFFF, 0x333333);
        GraphicsHelper.createNPC(this, 'nutricionista', 0xFFD700, 0xFF69B4, 0x8B4513);
        GraphicsHelper.createNPC(this, 'dentista',   0xFFD700, 0xFFFFFF, 0x222222);
        GraphicsHelper.createNPC(this, 'confeiteiro', 0xFFD700, 0xFFCCDD, 0x8B4513);
        GraphicsHelper.createNPC(this, 'fada',       0xFFCCFF, 0x9370DB, 0xFFD700);

        this.time.delayedCall(800, () => {
            this.scene.start('MapScene');
        });
    }

    _createAnimations() {
        const defs = [
            { key: 'miguel_parado',  frames: [1],          rate: 1,  repeat: -1 },
            { key: 'miguel_andar',   frames: [4,5,6,7],    rate: 8,  repeat: -1 },
            { key: 'miguel_correr',  frames: [8,9,10,11],  rate: 12, repeat: -1 },
            { key: 'miguel_pular',   frames: [12],         rate: 1,  repeat: 0  },
            { key: 'miguel_comemorar', frames: [13,14,15], rate: 6,  repeat: 2  },
        ];
        defs.forEach(({ key, frames, rate, repeat }) => {
            if (!this.anims.exists(key)) {
                this.anims.create({
                    key,
                    frames: this.anims.generateFrameNumbers('miguel', { frames }),
                    frameRate: rate,
                    repeat
                });
            }
        });
    }
}
