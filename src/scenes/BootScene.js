class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x1a0a2e, 0x1a0a2e, 0x0d3b5e, 0x0d3b5e, 1);
        bg.fillRect(0, 0, width, height);

        const title = this.add.text(width / 2, height / 2 - 60, 'Super Miguel', {
            fontSize: '52px',
            fill: '#FFD700',
            fontStyle: 'bold',
            stroke: '#8B4513',
            strokeThickness: 6
        }).setOrigin(0.5);

        const sub = this.add.text(width / 2, height / 2 + 10, 'Jogo Educativo', {
            fontSize: '26px',
            fill: '#FFFFFF',
            stroke: '#333333',
            strokeThickness: 3
        }).setOrigin(0.5);

        const loading = this.add.text(width / 2, height / 2 + 70, 'Carregando...', {
            fontSize: '20px',
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

        GraphicsHelper.createPlayerSprite(this, 'player');
        GraphicsHelper.createNPC(this, 'pai', 0xFFD700, 0x2E8B57, 0x1a1a1a);
        GraphicsHelper.createNPC(this, 'mae', 0xFFD700, 0xFF69B4, 0x8B4513);
        GraphicsHelper.createNPC(this, 'avo', 0xFFD7A0, 0x9370DB, 0xC0C0C0);
        GraphicsHelper.createNPC(this, 'professora', 0xFFD700, 0x4169E1, 0x333333);
        GraphicsHelper.createNPC(this, 'primo', 0xFFD700, 0xFF4500, 0x8B4513);

        GraphicsHelper.createGround(this, 'ground', 0x8B6914, 3200, 40);
        GraphicsHelper.createGround(this, 'sidewalk', 0xC0C0C0, 3200, 24);
        GraphicsHelper.createPlatform(this, 'platform', 0x8B6914, 140, 22);
        GraphicsHelper.createPlatform(this, 'platform2', 0x6B8E4E, 100, 22);

        GraphicsHelper.createCar(this, 'car_red', 0xFF4444);
        GraphicsHelper.createCar(this, 'car_blue', 0x4169E1);
        GraphicsHelper.createCar(this, 'car_yellow', 0xFFD700);

        GraphicsHelper.createTree(this, 'tree');
        GraphicsHelper.createHouse(this, 'house', 0xF5DEB3, 0xB22222);
        GraphicsHelper.createHouse(this, 'house2', 0xADD8E6, 0x8B4513);
        GraphicsHelper.createHouse(this, 'house3', 0xFFFFE0, 0x4169E1);

        GraphicsHelper.createWaterBottle(this, 'agua');
        GraphicsHelper.createFood(this, 'comida');
        GraphicsHelper.createMedicine(this, 'remedio');
        GraphicsHelper.createDog(this, 'cachorro');
        GraphicsHelper.createBike(this, 'bicicleta');
        GraphicsHelper.createBed(this, 'cama');
        GraphicsHelper.createCloud(this, 'cloud');
        GraphicsHelper.createBush(this, 'bush');
        GraphicsHelper.createCoin(this, 'moeda');
        GraphicsHelper.createStar(this, 'estrela');
        GraphicsHelper.createTrafficLight(this, 'semaforo');
        GraphicsHelper.createCrossing(this, 'faixa');
        GraphicsHelper.createCollectible(this, 'bola', 0xFF6347);
        GraphicsHelper.createCollectible(this, 'suco', 0xFF8C00);
        GraphicsHelper.createParticle(this, 'particle_yellow', 0xFFD700);
        GraphicsHelper.createParticle(this, 'particle_green', 0x00FF00);
        GraphicsHelper.createParticle(this, 'particle_blue', 0x00BFFF);

        GraphicsHelper.createNPC(this, 'galinha', 0xFFD700, 0xFF4444, 0xFF4444);
        GraphicsHelper.createGround(this, 'ground_farm', 0x8B4513, 3200, 40);
        GraphicsHelper.createHouse(this, 'fazenda', 0xDEB887, 0x8B6914);

        this.time.delayedCall(1500, () => {
            this.scene.start('MenuScene');
        });
    }
}
