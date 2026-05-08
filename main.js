const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 500,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MenuScene,
        MapScene,
        GameScene,
        FazendaScene,
        FlorestaScene,
        CachoeirScene,
        DocesScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
