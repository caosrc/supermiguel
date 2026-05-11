class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        const { width: W, height: H } = this.scale;

        const bg = this.add.graphics();
        bg.fillStyle(0x0e0a05, 1);
        bg.fillRect(0, 0, W, H);

        const paperG = this.add.graphics();
        paperG.fillStyle(0xd4a050, 1);
        paperG.fillRoundedRect(W / 2 - 320, H / 2 - 170, 640, 340, 18);
        for (let i = 0; i < 640; i += 20) {
            paperG.fillStyle(0xc08030, 0.28);
            paperG.fillRect(W / 2 - 320 + i, H / 2 - 170, 10, 340);
        }
        paperG.lineStyle(4, 0x7a4800, 0.95);
        paperG.strokeRoundedRect(W / 2 - 320, H / 2 - 170, 640, 340, 18);
        paperG.lineStyle(1.5, 0xffd090, 0.35);
        paperG.strokeRoundedRect(W / 2 - 314, H / 2 - 164, 628, 328, 14);

        const title = this.add.text(W / 2, H / 2 - 95, 'Super Miguel', {
            fontSize: '56px', fill: '#FFD700', fontStyle: 'bold',
            stroke: '#4a2800', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 32, 'As Aventuras de Miguel', {
            fontSize: '20px', fill: '#fff5d8', stroke: '#3a1800', strokeThickness: 4
        }).setOrigin(0.5);

        const smLabel = this.add.text(W / 2, H / 2 - 2, '✦ stop-motion edition ✦', {
            fontSize: '12px', fill: '#c88030aa', fontStyle: 'italic'
        }).setOrigin(0.5);

        let smT = 0, smI = 90;
        const wobble = () => {
            [title, smLabel].forEach(o => {
                if (o.active) {
                    o.setAngle((Math.random() - 0.5) * 1.6);
                    o.setScale(1 + (Math.random() - 0.5) * 0.04);
                }
            });
        };
        this.load.on('progress', (v) => { wobble(); });

        const barBgG = this.add.graphics();
        barBgG.fillStyle(0x3a1a00, 1);
        barBgG.fillRoundedRect(W / 2 - 220, H / 2 + 40, 440, 26, 13);
        barBgG.lineStyle(2.5, 0x7a4800, 1);
        barBgG.strokeRoundedRect(W / 2 - 220, H / 2 + 40, 440, 26, 13);

        this.barFill = this.add.graphics();
        this.loadText = this.add.text(W / 2, H / 2 + 80, 'Carregando...', {
            fontSize: '15px', fill: '#ffe0b0', stroke: '#2a1000', strokeThickness: 3
        }).setOrigin(0.5);

        const pips = [];
        for (let p = 0; p < 5; p++) {
            const pip = this.add.graphics();
            pip.fillStyle(0xd4a050, 0.35);
            pip.fillCircle(W / 2 - 60 + p * 30, H / 2 + 100, 5);
            pips.push(pip);
        }
        let pipIdx = 0;
        this.time.addEvent({
            delay: 90,
            repeat: -1,
            callback: () => {
                pips.forEach((p, i) => {
                    p.clear();
                    p.fillStyle(0xffd700, i === pipIdx ? 1 : 0.28);
                    p.fillCircle(W / 2 - 60 + i * 30, H / 2 + 100, 5);
                });
                pipIdx = (pipIdx + 1) % 5;
            }
        });

        this.load.on('progress', v => {
            this.barFill.clear();
            this.barFill.fillStyle(0xd4a050, 1);
            this.barFill.fillRoundedRect(W / 2 - 218, H / 2 + 42, 436 * v, 22, 11);
            this.barFill.fillStyle(0xffd090, 0.5);
            this.barFill.fillRoundedRect(W / 2 - 218, H / 2 + 42, 130 * v, 10, 8);
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
        this.time.delayedCall(350, () => this.scene.start('MenuScene'));
    }
}
