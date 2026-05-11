const allScenes = [
    BootScene, LoadingScene, MenuScene, WorldMapScene, BicicletaScene,
    // Cidade
    Cidade_1, Cidade_2, Cidade_3, Cidade_4, Cidade_5,
    Cidade_6, Cidade_7, Cidade_8, Cidade_9, Cidade_10,
    // Floresta
    Floresta_1, Floresta_2, Floresta_3, Floresta_4, Floresta_5,
    Floresta_6, Floresta_7, Floresta_8, Floresta_9, Floresta_10,
    // Fazenda
    Fazenda_1, Fazenda_2, Fazenda_3, Fazenda_4, Fazenda_5,
    Fazenda_6, Fazenda_7, Fazenda_8, Fazenda_9, Fazenda_10,
    // Cachoeira
    Cachoeira_1, Cachoeira_2, Cachoeira_3, Cachoeira_4, Cachoeira_5,
    Cachoeira_6, Cachoeira_7, Cachoeira_8, Cachoeira_9, Cachoeira_10,
    // Escola
    Escola_1, Escola_2, Escola_3, Escola_4, Escola_5,
    Escola_6, Escola_7, Escola_8, Escola_9, Escola_10,
    // Praia
    Praia_1, Praia_2, Praia_3, Praia_4, Praia_5,
    Praia_6, Praia_7, Praia_8, Praia_9, Praia_10,
    // Espaco
    Espaco_1, Espaco_2, Espaco_3, Espaco_4, Espaco_5,
    Espaco_6, Espaco_7, Espaco_8, Espaco_9, Espaco_10,
    // Doces
    Doces_1, Doces_2, Doces_3, Doces_4, Doces_5,
    Doces_6, Doces_7, Doces_8, Doces_9, Doces_10,
    // Medieval
    Medieval_1, Medieval_2, Medieval_3, Medieval_4, Medieval_5,
    Medieval_6, Medieval_7, Medieval_8, Medieval_9, Medieval_10,
    // Sonhos
    Sonhos_1, Sonhos_2, Sonhos_3, Sonhos_4, Sonhos_5,
    Sonhos_6, Sonhos_7, Sonhos_8, Sonhos_9, Sonhos_10,
];

const config = {
    type: Phaser.AUTO,
    width: GAME_W,
    height: GAME_H,
    parent: 'game-container',
    backgroundColor: '#0a0a1a',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY },
            debug: false
        }
    },
    scene: allScenes,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        antialias: true,
        pixelArt: false,
    }
};

const game = new Phaser.Game(config);
