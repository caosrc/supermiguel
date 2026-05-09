class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        const { width, height } = this.scale;

        const bg = this.add.graphics();
        bg.fillStyle(0x0a0a1a, 1);
        bg.fillRect(0, 0, width, height);

        const title = this.add.text(width / 2, height / 2 - 80, 'Super Miguel', {
            fontSize: '52px', fill: '#FFD700', fontStyle: 'bold', stroke: '#8B4513', strokeThickness: 6,
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 24, 'As Aventuras de Miguel', {
            fontSize: '22px', fill: '#FFFFFF', stroke: '#333', strokeThickness: 3,
        }).setOrigin(0.5);

        this.tweens.add({ targets: title, scaleX: 1.04, scaleY: 1.04, duration: 900, yoyo: true, repeat: -1 });

        const barBg = this.add.graphics();
        barBg.fillStyle(0x222244, 1);
        barBg.fillRoundedRect(width / 2 - 200, height / 2 + 20, 400, 22, 11);

        this.barFill = this.add.graphics();
        this.loadText = this.add.text(width / 2, height / 2 + 58, 'Carregando...', {
            fontSize: '16px', fill: '#aaaaff',
        }).setOrigin(0.5);

        this.load.on('progress', v => {
            this.barFill.clear();
            this.barFill.fillStyle(0x7c4dff, 1);
            this.barFill.fillRoundedRect(width / 2 - 198, height / 2 + 22, 396 * v, 18, 9);
            this.barFill.fillStyle(0xce93d8, 0.5);
            this.barFill.fillRoundedRect(width / 2 - 198, height / 2 + 22, 100 * v, 18, 9);
        });

        this.load.on('fileprogress', (file) => {
            this.loadText.setText('Carregando: ' + file.key);
        });

        this.load.image('miguel_stand',       'assets/miguel/stand_side.png');
        this.load.image('miguel_stand_front', 'assets/miguel/stand_front.png');
        this.load.image('miguel_walk',        'assets/miguel/walk.png');
        this.load.image('miguel_run',         'assets/miguel/run.png');
        this.load.image('miguel_jump',        'assets/miguel/jump.png');
        this.load.image('miguel_jump_punch',  'assets/miguel/jump_punch.png');
        this.load.image('miguel_crouch',      'assets/miguel/crouch.png');
        this.load.image('miguel_drink',       'assets/miguel/drink.png');
        this.load.image('miguel_eat',         'assets/miguel/eat.png');
        this.load.image('miguel_bike',        'assets/miguel/bike.png');
        this.load.image('scene_village',      'assets/scenes/village_map.png');
        this.load.image('scene_worldmap',     'assets/scenes/world_map.png');
    }

    create() {
        this.time.delayedCall(400, () => this.scene.start('MenuScene'));
    }
}
