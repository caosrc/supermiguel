class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.saveData = data.save || SaveSystem.defaultData();
    }

    create() {
        const { width, height } = this.scale;
        this.WORLD_WIDTH = 3200;

        this.stats = {
            pontos: this.saveData.pontos,
            moedas: this.saveData.moedas,
            fase: this.saveData.fase,
            energia: 100,
            saude: 100,
            fome: 100,
            sono: 100,
            amizadeFamilia: this.saveData.amizadeFamilia || 0
        };

        this.playerState = {
            onBike: false,
            isRunning: false,
            hasFever: false,
            interacting: false,
            coins: 0
        };

        this._buildWorld(width, height);
        this._createPlayer(height);
        this._createNPCs(height);
        this._createCollectibles(height);
        this._createObstacles(height);
        this._createCars();
        this._setupCamera(width, height);
        this._setupControls();
        this._setupCollisions();
        this._setupTouchControls();

        this.dialog = new DialogSystem(this);
        this.hud = new HUDSystem(this);

        this._startStatDecay();
        this._setupAutoSave();
        this._checkFaseProgress();

        this.dialog.show(
            'Bem-vindo a Lagoa Dourada! Explore a cidade, ajude a família e aprenda coisas novas!',
            'Narrador',
            4000
        );

        const backBtn = this.add.text(this.WORLD_WIDTH - 20, 20, '⬅ Menu', {
            fontSize: '18px',
            fill: '#FFFFFF',
            backgroundColor: '#000000AA',
            padding: { x: 10, y: 6 }
        }).setOrigin(1, 0).setScrollFactor(1).setDepth(90).setInteractive();
        backBtn.on('pointerdown', () => {
            this._saveAndExit();
        });
    }

    _buildWorld(width, height) {
        const sky = this.add.graphics();
        sky.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x4FC3F7, 0x4FC3F7, 1);
        sky.fillRect(0, 0, this.WORLD_WIDTH, height - 100);
        sky.setScrollFactor(0.1);

        for (let i = 0; i < 14; i++) {
            const cloud = this.add.image(
                150 + i * 230 + Phaser.Math.Between(-40, 40),
                Phaser.Math.Between(30, 120),
                'cloud'
            ).setAlpha(0.85).setScrollFactor(Phaser.Math.FloatBetween(0.2, 0.5));
            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(20, 60),
                duration: Phaser.Math.Between(6000, 12000),
                yoyo: true,
                repeat: -1
            });
        }

        this.platforms = this.physics.add.staticGroup();

        const groundY = height - 20;
        const ground = this.platforms.create(this.WORLD_WIDTH / 2, groundY, 'ground');
        ground.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const sidewalkY = height - 60;
        const sidewalk = this.platforms.create(this.WORLD_WIDTH / 2, sidewalkY, 'sidewalk');
        sidewalk.setScale(this.WORLD_WIDTH / 800, 1).refreshBody();

        const platformDefs = [
            { x: 300,  y: height - 130, w: 140 },
            { x: 560,  y: height - 170, w: 110 },
            { x: 820,  y: height - 140, w: 140 },
            { x: 1080, y: height - 190, w: 100 },
            { x: 1340, y: height - 150, w: 140 },
            { x: 1600, y: height - 180, w: 110 },
            { x: 1860, y: height - 145, w: 140 },
            { x: 2100, y: height - 195, w: 100 },
            { x: 2360, y: height - 155, w: 140 },
            { x: 2620, y: height - 175, w: 110 },
            { x: 2880, y: height - 148, w: 140 },
        ];

        platformDefs.forEach(({ x, y, w }) => {
            const p = this.platforms.create(x, y, 'platform');
            p.setScale(w / 140, 1).refreshBody();
        });

        const houseDefs = [
            { x: 180,  key: 'house',  y: height - 148 },
            { x: 430,  key: 'house2', y: height - 148 },
            { x: 700,  key: 'house',  y: height - 148 },
            { x: 960,  key: 'house3', y: height - 148 },
            { x: 1220, key: 'house',  y: height - 148 },
            { x: 1500, key: 'house2', y: height - 148 },
            { x: 1760, key: 'house3', y: height - 148 },
            { x: 2020, key: 'house',  y: height - 148 },
            { x: 2280, key: 'house2', y: height - 148 },
            { x: 2550, key: 'house3', y: height - 148 },
            { x: 2820, key: 'house',  y: height - 148 },
            { x: 3060, key: 'house2', y: height - 148 },
        ];
        houseDefs.forEach(({ x, key, y }) => this.add.image(x, y, key).setScale(1.1));

        const treeDefs = [250, 500, 750, 1050, 1300, 1550, 1850, 2150, 2400, 2700, 2950];
        treeDefs.forEach(x => this.add.image(x, height - 120, 'tree').setScale(0.85));

        const bushDefs = [350, 650, 900, 1150, 1420, 1680, 1940, 2200, 2460, 2720, 2980];
        bushDefs.forEach(x => this.add.image(x, height - 72, 'bush').setScale(0.9));

        this.add.image(900, height - 100, 'semaforo').setScale(0.85);
        this.add.image(1800, height - 100, 'semaforo').setScale(0.85);
        this.add.image(2700, height - 100, 'semaforo').setScale(0.85);

        this.add.image(900, height - 44, 'faixa').setAlpha(0.8);
        this.add.image(1800, height - 44, 'faixa').setAlpha(0.8);

        const roadY = height - 44;
        const road = this.add.graphics();
        road.fillStyle(0x555555);
        road.fillRect(0, roadY - 14, this.WORLD_WIDTH, 28);
        road.fillStyle(0xFFFF00);
        for (let i = 0; i < this.WORLD_WIDTH; i += 80) {
            road.fillRect(i, roadY - 2, 40, 4);
        }
    }

    _createPlayer(height) {
        this.player = this.physics.add.sprite(120, height - 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.1);
        this.player.setDepth(10);

        this.anims.create({
            key: 'walk',
            frames: [{ key: 'player' }],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player' }],
            frameRate: 1,
            repeat: -1
        });

        this.playerShadow = this.add.ellipse(0, 0, 30, 8, 0x000000, 0.25);
        this.playerShadow.setDepth(9);
    }

    _createNPCs(height) {
        this.npcs = [];

        const npcDefs = [
            {
                key: 'pai', x: 320, y: height - 90,
                dialog: (stats) => {
                    if (stats.fase >= 2) return ['Pai: Parabéns por atravessar a rua direito!', 'Pai'];
                    return ['Pai: Filho, ande sempre na calçada e nunca na rua!', 'Pai'];
                },
                onInteract: (stats) => { stats.amizadeFamilia += 5; return 8; }
            },
            {
                key: 'mae', x: 600, y: height - 90,
                dialog: (stats) => {
                    if (stats.saude < 50) return ['Mãe: Você está doente? Vamos ao médico e tome o remédio!', 'Mãe'];
                    return ['Mãe: Não esqueça de beber água e comer frutas!', 'Mãe'];
                },
                onInteract: (stats) => { stats.amizadeFamilia += 5; stats.fome = Math.min(100, stats.fome + 10); return 10; }
            },
            {
                key: 'professora', x: 1200, y: height - 90,
                dialog: () => ['Professora: Lembre-se de lavar as mãos antes de comer!', 'Professora Rosa'],
                onInteract: (stats) => { return 12; }
            },
            {
                key: 'avo', x: 1800, y: height - 90,
                dialog: () => ['Avó Maria: Vim te visitar! Fiz pão de queijo fresquinho!', 'Avó Maria'],
                onInteract: (stats) => { stats.amizadeFamilia += 10; stats.fome = Math.min(100, stats.fome + 25); return 15; }
            },
            {
                key: 'primo', x: 2400, y: height - 90,
                dialog: () => ['Primo Lucas: Vamos jogar futebol?', 'Primo Lucas'],
                onInteract: (stats) => { stats.energia = Math.min(100, stats.energia + 5); return 10; }
            },
        ];

        npcDefs.forEach(def => {
            const npc = this.physics.add.staticImage(def.x, def.y, def.key);
            npc.setDepth(8);
            npc.npcData = def;

            this.tweens.add({
                targets: npc,
                y: def.y - 6,
                duration: 1200 + Phaser.Math.Between(-200, 200),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            const bubble = this.add.text(def.x, def.y - 50, '💬', {
                fontSize: '18px'
            }).setDepth(9);
            this.tweens.add({
                targets: bubble,
                alpha: 0.3,
                duration: 800,
                yoyo: true,
                repeat: -1
            });
            npc.bubble = bubble;

            this.npcs.push(npc);
        });
    }

    _createCollectibles(height) {
        this.collectibles = this.physics.add.staticGroup();
        this.coins = this.physics.add.staticGroup();

        const items = [
            { key: 'agua',     x: 400,  y: height - 90, type: 'agua'     },
            { key: 'comida',   x: 680,  y: height - 90, type: 'comida'   },
            { key: 'remedio',  x: 980,  y: height - 90, type: 'remedio'  },
            { key: 'bola',     x: 1350, y: height - 95, type: 'bola'     },
            { key: 'suco',     x: 1560, y: height - 90, type: 'suco'     },
            { key: 'bicicleta',x: 2100, y: height - 95, type: 'bicicleta'},
            { key: 'agua',     x: 2500, y: height - 90, type: 'agua'     },
            { key: 'comida',   x: 2850, y: height - 90, type: 'comida'   },
            { key: 'cama',     x: 3050, y: height - 95, type: 'cama'     },
        ];

        items.forEach(item => {
            const obj = this.collectibles.create(item.x, item.y, item.key);
            obj.itemType = item.type;
            obj.setDepth(8);
            this.tweens.add({
                targets: obj,
                y: item.y - 8,
                duration: 900 + Phaser.Math.Between(-100, 100),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        const coinPositions = [
            280, 480, 560, 760, 840, 1040, 1140, 1440,
            1640, 1740, 1940, 2240, 2340, 2640, 2740, 2940, 3040, 3140
        ];
        coinPositions.forEach((x, i) => {
            const py = i % 3 === 0 ? height - 160 : (i % 3 === 1 ? height - 195 : height - 90);
            const coin = this.coins.create(x, py, 'moeda');
            coin.setDepth(7);
            this.tweens.add({
                targets: coin,
                angle: 360,
                duration: 1200,
                repeat: -1
            });
        });

        this.dog = this.physics.add.image(500, height - 90, 'cachorro');
        this.dog.setCollideWorldBounds(true);
        this.dog.setDepth(9);
        this.dogFollowing = false;
    }

    _createObstacles(height) {
        this.obstacles = this.physics.add.staticGroup();

        const obstacleDefs = [
            { x: 760,  y: height - 78 },
            { x: 1460, y: height - 78 },
            { x: 2060, y: height - 78 },
            { x: 2660, y: height - 78 },
        ];

        obstacleDefs.forEach(def => {
            const g = this.add.graphics();
            g.fillStyle(0xFF8C00);
            g.fillRect(0, 0, 28, 36);
            g.fillStyle(0xFFFFFF);
            g.fillTriangle(0, 0, 28, 0, 14, -12);
            g.fillStyle(0x000000);
            g.fillRect(10, 6, 8, 16);
            g.fillRect(10, 26, 8, 6);
            g.generateTexture('obstacle_' + def.x, 28, 48);
            g.destroy();

            const obs = this.obstacles.create(def.x, def.y, 'obstacle_' + def.x);
            obs.setDepth(8);
        });
    }

    _createCars() {
        this.cars = this.physics.add.group();
        const { height } = this.scale;
        const carY = height - 37;

        const carDefs = [
            { x: 400,  speed: -220, key: 'car_red'    },
            { x: 900,  speed: -180, key: 'car_blue'   },
            { x: 1400, speed: -240, key: 'car_yellow'  },
            { x: 1900, speed: -200, key: 'car_red'    },
            { x: 2400, speed: -260, key: 'car_blue'   },
            { x: 2900, speed: -190, key: 'car_yellow'  },
        ];

        carDefs.forEach(def => {
            const car = this.cars.create(def.x, carY, def.key);
            car.setVelocityX(def.speed);
            car.setImmovable(true);
            car.carSpeed = def.speed;
            car.setDepth(6);
        });

        this._spawnCar = () => {
            const { height } = this.scale;
            const keys = ['car_red', 'car_blue', 'car_yellow'];
            const speeds = [-180, -220, -260, -200, -240];
            const car = this.cars.create(
                this.WORLD_WIDTH + 100,
                height - 37,
                Phaser.Utils.Array.GetRandom(keys)
            );
            car.setVelocityX(Phaser.Utils.Array.GetRandom(speeds));
            car.setImmovable(true);
            car.carSpeed = car.body.velocity.x;
            car.setDepth(6);
        };

        this.time.addEvent({
            delay: 3500,
            loop: true,
            callback: this._spawnCar,
            callbackScope: this
        });
    }

    _setupCamera(width, height) {
        this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, height);
    }

    _setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.touchState = {
            left: false, right: false, jump: false, action: false
        };
    }

    _setupTouchControls() {
        const addTouch = (id, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', (e) => { e.preventDefault(); this.touchState[key] = true; }, { passive: false });
            el.addEventListener('touchend',   (e) => { e.preventDefault(); this.touchState[key] = false; }, { passive: false });
            el.addEventListener('mousedown',  () => { this.touchState[key] = true; });
            el.addEventListener('mouseup',    () => { this.touchState[key] = false; });
        };
        addTouch('btn-esquerda', 'left');
        addTouch('btn-direita',  'right');
        addTouch('btn-pular',    'jump');
        addTouch('btn-acao',     'action');
    }

    _setupCollisions() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.dog, this.platforms);

        this.physics.add.overlap(this.player, this.collectibles, this._onCollectItem, null, this);
        this.physics.add.overlap(this.player, this.coins, this._onCoin, null, this);

        this.npcs.forEach(npc => {
            this.physics.add.overlap(this.player, npc, () => this._onNPCOverlap(npc), null, this);
        });

        this.physics.add.collider(this.player, this.cars, this._onCarHit, null, this);
        this.physics.add.collider(this.player, this.obstacles, this._onObstacleHit, null, this);
    }

    _onCollectItem(player, item) {
        const type = item.itemType;
        item.destroy();

        let msg = '', pts = 0;
        switch (type) {
            case 'agua':
                this.stats.energia = Math.min(100, this.stats.energia + 15);
                this.stats.saude   = Math.min(100, this.stats.saude + 5);
                msg = 'Muito bem! Beber água faz bem à saúde!';
                pts = 10;
                break;
            case 'comida':
                this.stats.fome    = Math.min(100, this.stats.fome + 30);
                this.stats.energia = Math.min(100, this.stats.energia + 10);
                msg = 'Hora do almoço! Coma bem e saudável!';
                pts = 15;
                break;
            case 'remedio':
                if (this.playerState.hasFever) {
                    this.playerState.hasFever = false;
                    this.stats.saude = Math.min(100, this.stats.saude + 30);
                    msg = 'Muito bem! Tome remédio com ajuda dos pais!';
                    pts = 20;
                } else {
                    msg = 'Remédio só quando preciso e com ajuda dos pais!';
                    pts = 5;
                }
                break;
            case 'bola':
                this.stats.energia = Math.min(100, this.stats.energia + 8);
                msg = 'Brincar é divertido e saudável!';
                pts = 10;
                break;
            case 'suco':
                this.stats.fome    = Math.min(100, this.stats.fome + 12);
                this.stats.energia = Math.min(100, this.stats.energia + 8);
                msg = 'Suco de fruta é muito saudável!';
                pts = 8;
                break;
            case 'bicicleta':
                this.playerState.onBike = !this.playerState.onBike;
                msg = this.playerState.onBike ? 'Andando de bicicleta!' : 'Desceu da bicicleta!';
                pts = 20;
                break;
            case 'cama':
                this.stats.energia = 100;
                this.stats.sono    = 100;
                msg = 'Boa noite! Dormir cedo faz bem para a saúde!';
                pts = 20;
                break;
        }

        this.stats.pontos += pts;
        this.dialog.show(msg, null, 2800);
        this._spawnCollectParticles(player.x, player.y);
        this._checkFaseProgress();
    }

    _onCoin(player, coin) {
        coin.destroy();
        this.stats.moedas += 1;
        this.stats.pontos += 2;
        this._spawnCollectParticles(player.x, player.y, 0xFFD700);
    }

    _onNPCOverlap(npc) {
        if (this.playerState.interacting) return;
        this.playerState.interacting = true;
        const def = npc.npcData;
        const [msg, speaker] = def.dialog(this.stats);
        const pts = def.onInteract(this.stats);
        this.stats.pontos += pts;
        this.dialog.show(msg, speaker, 3200);
        this.time.delayedCall(4000, () => { this.playerState.interacting = false; });
    }

    _onCarHit(player, car) {
        if (this.playerHurt) return;
        this.playerHurt = true;
        this.stats.energia = Math.max(0, this.stats.energia - 20);
        this.stats.saude   = Math.max(0, this.stats.saude   - 15);
        this.dialog.show('Cuidado! Olhe para os dois lados antes de atravessar a rua!', null, 3000);
        this.player.setTint(0xFF0000);
        this.cameras.main.shake(300, 0.015);
        this.time.delayedCall(1500, () => {
            this.player.clearTint();
            this.playerHurt = false;
        });
    }

    _onObstacleHit(player, obstacle) {
        if (this.playerHurt) return;
        this.playerHurt = true;
        this.stats.energia = Math.max(0, this.stats.energia - 8);
        this.dialog.show('Pule os obstáculos! Fique atento!', null, 2000);
        this.cameras.main.shake(150, 0.008);
        this.time.delayedCall(1200, () => { this.playerHurt = false; });
    }

    _startStatDecay() {
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.stats.fome    = Math.max(0, this.stats.fome    - 1.2);
                this.stats.sono    = Math.max(0, this.stats.sono    - 0.6);
                this.stats.energia = Math.max(0, this.stats.energia - 0.4);

                if (this.stats.fome < 20 && !this.dialog.isVisible) {
                    this.dialog.show('Você está com fome! Encontre comida!', null, 2500);
                }
                if (this.stats.sono < 20 && !this.dialog.isVisible) {
                    this.dialog.show('Está com sono! Procure uma cama para dormir!', null, 2500);
                }
                if (!this.playerState.hasFever && Phaser.Math.Between(1, 200) === 1) {
                    this.playerState.hasFever = true;
                    this.stats.saude -= 20;
                    this.dialog.show('Você ficou gripado! Encontre o remédio e descanse!', null, 3500);
                }
            }
        });
    }

    _setupAutoSave() {
        this.time.addEvent({
            delay: 15000,
            loop: true,
            callback: () => this._doSave()
        });
    }

    _doSave() {
        SaveSystem.save({
            pontos: this.stats.pontos,
            moedas: this.stats.moedas,
            fase: this.stats.fase,
            amizadeFamilia: this.stats.amizadeFamilia,
            cidadesVisitadas: this.saveData.cidadesVisitadas || ['Lagoa Dourada'],
            medalhas: this.saveData.medalhas || []
        });
    }

    _saveAndExit() {
        this._doSave();
        this.scene.start('MenuScene');
    }

    _checkFaseProgress() {
        const pts = this.stats.pontos;
        const fase = this.stats.fase;
        const thresholds = [
            { pts: 50,  fase: 2, msg: 'FASE 2: Hora de brincar no quintal e cuidar dos animais!' },
            { pts: 120, fase: 3, msg: 'FASE 3: Vamos ao parque e atravessar a rua com cuidado!' },
            { pts: 220, fase: 4, msg: 'FASE 4: Hora de jantar, escovar os dentes e dormir cedo!' },
            { pts: 350, fase: 5, msg: 'FASE 5: Viagem para a fazenda dos avós em Resende Costa!' },
        ];
        for (const t of thresholds) {
            if (pts >= t.pts && fase < t.fase) {
                this.stats.fase = t.fase;
                this.dialog.show(t.msg, 'Narrador', 4000);
                this._showFaseEffect();
                if (t.fase === 5) {
                    this.time.delayedCall(2000, () => {
                        this._doSave();
                        this.scene.start('FazendaScene', { save: {
                            pontos: this.stats.pontos,
                            moedas: this.stats.moedas,
                            fase: this.stats.fase,
                            amizadeFamilia: this.stats.amizadeFamilia,
                            cidadesVisitadas: ['Lagoa Dourada', 'Resende Costa'],
                            medalhas: this.saveData.medalhas || []
                        }});
                    });
                }
                break;
            }
        }
    }

    _showFaseEffect() {
        const { width, height } = this.scale;
        const flash = this.add.graphics();
        flash.fillStyle(0xFFFFFF, 1);
        flash.fillRect(0, 0, width, height);
        flash.setScrollFactor(0).setDepth(200);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 800,
            onComplete: () => flash.destroy()
        });

        for (let i = 0; i < 20; i++) {
            this.time.delayedCall(i * 60, () => {
                const star = this.add.image(
                    this.player.x + Phaser.Math.Between(-100, 100),
                    this.player.y + Phaser.Math.Between(-80, 80),
                    'estrela'
                ).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).setDepth(150).setScrollFactor(1);
                this.tweens.add({
                    targets: star,
                    alpha: 0,
                    y: star.y - 60,
                    duration: 900,
                    onComplete: () => star.destroy()
                });
            });
        }
    }

    _spawnCollectParticles(x, y, color) {
        const c = color || 0x00FF00;
        for (let i = 0; i < 8; i++) {
            const p = this.add.image(x, y, 'particle_yellow').setDepth(20);
            if (color === 0xFFD700) {
                p.setTexture('particle_yellow');
            } else {
                p.setTexture('particle_green');
            }
            this.tweens.add({
                targets: p,
                x: x + Phaser.Math.Between(-50, 50),
                y: y + Phaser.Math.Between(-60, -10),
                alpha: 0,
                duration: 600,
                onComplete: () => p.destroy()
            });
        }
    }

    update() {
        const left  = this.cursors.left.isDown  || this.touchState.left;
        const right = this.cursors.right.isDown || this.touchState.right;
        const up    = this.cursors.up.isDown    || this.touchState.jump;
        const shift = this.keyShift.isDown;
        const onGround = this.player.body.touching.down || this.player.body.blocked.down;

        let vx = 0;
        const walkSpeed  = this.playerState.onBike ? 340 : 200;
        const runSpeed   = this.playerState.onBike ? 500 : 360;

        if (left) {
            vx = -(shift ? runSpeed : walkSpeed);
            this.player.setFlipX(true);
        } else if (right) {
            vx = shift ? runSpeed : walkSpeed;
            this.player.setFlipX(false);
        }

        this.player.setVelocityX(vx);

        if (up && onGround) {
            this.player.setVelocityY(-520);
        }

        this.playerShadow.setPosition(this.player.x, this.player.body.bottom + 4);

        if (Math.abs(this.player.x - this.dog.x) > 300) {
            this.physics.moveToObject(this.dog, this.player, 100);
        } else {
            this.dog.setVelocityX(0);
        }

        this.cars.getChildren().forEach(car => {
            if (car.x < -100) {
                car.x = this.WORLD_WIDTH + 100;
            }
        });

        this.hud.update(this.stats);

        this.npcs.forEach(npc => {
            if (npc.bubble) {
                npc.bubble.setPosition(npc.x, npc.y - 60);
            }
        });

        if (this.stats.energia <= 0 && !this.dialog.isVisible) {
            this.dialog.show('Você ficou sem energia! Beba água e coma para recuperar!', null, 3000);
            this.stats.energia = 15;
        }
    }

    shutdown() {
        if (this.hud) this.hud.destroy();
        if (this.dialog) this.dialog.destroy();
    }
}
