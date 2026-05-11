class BicicletaScene extends Phaser.Scene {
    constructor() {
        super('BicicletaScene');
    }

    preload() {
        this.load.image('bike_costas', 'assets/bicicleta_costas.png');
        this.load.image('bike_lado',   'assets/bicicleta_lado.png');
    }

    create() {
        const { width: W, height: H } = this.scale;

        this.W = W;
        this.H = H;

        this.speed      = 3;
        this.maxSpeed   = 12;
        this.score      = 0;
        this.lives      = 3;
        this.gameOver   = false;
        this.win        = false;
        this.distance   = 0;
        this.goalDist   = 2000;
        this.shakeTimer = 0;

        this.horizonX   = W / 2;
        this.targetHX   = W / 2;
        this.playerX    = W / 2;
        this.targetPX   = W / 2;

        this.steerDir   = 0;
        this.obstacles  = [];
        this.coins      = [];
        this.trees      = [];
        this.clouds     = [];
        this.obstacleTick = 0;
        this.coinTick     = 0;
        this.treeTick     = 0;
        this.cloudTick    = 0;

        this.spriteFrame  = 0;
        this.frameTick    = 0;

        this._initBg();
        this._initRoad();
        this._initTrees();
        this._initClouds();
        this._initPlayer();
        this._initHUD();
        this._initControls();
        this._spawnInitialCoins();
    }

    _initBg() {
        const { W, H } = this;
        this.bgGfx = this.add.graphics().setDepth(0);
        this._drawSky();

        this.hillGfx = this.add.graphics().setDepth(1);
        this._drawHills(0);
    }

    _drawSky() {
        const { W, H } = this;
        const g = this.bgGfx;
        g.clear();
        const horizon = H * 0.38;
        g.fillGradientStyle(0x4db8e8, 0x4db8e8, 0xa8dff5, 0xa8dff5, 1);
        g.fillRect(0, 0, W, horizon);
        g.fillGradientStyle(0xa8dff5, 0xa8dff5, 0xd4f0ff, 0xd4f0ff, 1);
        g.fillRect(0, horizon * 0.6, W, horizon * 0.4);

        const sun = this.add.graphics().setDepth(1);
        sun.fillStyle(0xfff9c4, 1);
        sun.fillCircle(W * 0.78, H * 0.12, 34);
        sun.fillStyle(0xffee58, 0.3);
        sun.fillCircle(W * 0.78, H * 0.12, 50);
        this.sun = sun;
    }

    _drawHills(horizonShift) {
        const { W, H } = this;
        const g = this.hillGfx;
        g.clear();
        const hy = H * 0.38;
        const hx = W / 2 + horizonShift;

        const hills = [
            { ox: -0.4, ow: 0.55, oh: 0.13, c: 0x5a9e52 },
            { ox: 0.0,  ow: 0.50, oh: 0.10, c: 0x6ab860 },
            { ox: 0.35, ow: 0.55, oh: 0.12, c: 0x5a9e52 },
            { ox: -0.15,ow: 0.35, oh: 0.09, c: 0x7dcc70 },
            { ox: 0.6,  ow: 0.45, oh: 0.11, c: 0x6ab860 },
        ];
        hills.forEach(h => {
            g.fillStyle(h.c, 1);
            const cx = hx + W * h.ox;
            const hw = W * h.ow;
            const hh = H * h.oh;
            g.fillEllipse(cx, hy + 6, hw, hh * 2);
        });

        g.fillStyle(0x4caf50, 1);
        g.fillRect(0, hy - 4, W, 14);
        g.fillStyle(0x81c784, 1);
        g.fillRect(0, hy - 2, W, 5);
    }

    _initRoad() {
        const { W, H } = this;
        this.roadGfx = this.add.graphics().setDepth(2);
        this.markGfx = this.add.graphics().setDepth(3);
        this._drawRoad(0, 1);
    }

    _drawRoad(horizonShift, speedFactor) {
        const { W, H } = this;
        const rg = this.roadGfx;
        const mg = this.markGfx;
        rg.clear();
        mg.clear();

        const hy  = H * 0.38;
        const hx  = W / 2 + horizonShift;
        const roadW_top = 80;
        const roadW_bot = W * 0.88;

        rg.fillStyle(0x888888, 1);
        rg.fillTriangle(
            hx - roadW_top / 2, hy,
            hx + roadW_top / 2, hy,
            W / 2 + roadW_bot / 2, H,
            W / 2 - roadW_bot / 2, H
        );
        rg.fillPoints([
            { x: hx - roadW_top / 2, y: hy },
            { x: hx + roadW_top / 2, y: hy },
            { x: W / 2 + roadW_bot / 2, y: H },
            { x: W / 2 - roadW_bot / 2, y: H }
        ], true);

        rg.fillStyle(0x777777, 1);
        rg.fillPoints([
            { x: hx - roadW_top / 2 - 18, y: hy },
            { x: hx - roadW_top / 2, y: hy },
            { x: W / 2 - roadW_bot / 2, y: H },
            { x: W / 2 - roadW_bot / 2 - 28, y: H }
        ], true);
        rg.fillPoints([
            { x: hx + roadW_top / 2, y: hy },
            { x: hx + roadW_top / 2 + 18, y: hy },
            { x: W / 2 + roadW_bot / 2 + 28, y: H },
            { x: W / 2 + roadW_bot / 2, y: H }
        ], true);

        rg.fillStyle(0xb0bec5, 1);
        rg.fillPoints([
            { x: hx - roadW_top / 2 - 18, y: hy },
            { x: hx - roadW_top / 2 - 40, y: hy },
            { x: W / 2 - roadW_bot / 2 - 56, y: H },
            { x: W / 2 - roadW_bot / 2 - 28, y: H }
        ], true);
        rg.fillPoints([
            { x: hx + roadW_top / 2 + 18, y: hy },
            { x: hx + roadW_top / 2 + 40, y: hy },
            { x: W / 2 + roadW_bot / 2 + 56, y: H },
            { x: W / 2 + roadW_bot / 2 + 28, y: H }
        ], true);

        rg.fillStyle(0x6b9a5a, 1);
        rg.fillRect(0, hy - 4, hx - roadW_top / 2 - 40, H - hy + 4);
        rg.fillRect(hx + roadW_top / 2 + 40, hy - 4, W - (hx + roadW_top / 2 + 40), H - hy + 4);

        this._drawRoadMarkings(mg, hx, hy, roadW_top, roadW_bot, speedFactor);
    }

    _drawRoadMarkings(mg, hx, hy, roadW_top, roadW_bot, speedFactor) {
        const { W, H } = this;
        const offset = (this.distance * speedFactor * 12) % 1;
        const steps  = 10;

        for (let i = 0; i < steps; i++) {
            const t = (i / steps + offset) % 1;
            if (t < 0.5) continue;

            const lerpT = (t - 0.5) / 0.5;
            const y   = hy + (H - hy) * lerpT;
            const cx  = W / 2 + (hx - W / 2) * (1 - lerpT);
            const hw  = (roadW_top + (roadW_bot - roadW_top) * lerpT) / 2;
            const mw  = 4 + 12 * lerpT;
            const mh  = 8 + 28 * lerpT;

            mg.fillStyle(0xffffff, 0.85);
            mg.fillRect(cx - mw / 2, y - mh / 2, mw, mh);

            mg.fillStyle(0xffffff, 0.5);
            mg.fillRect(cx - hw + 2, y - 2, mw * 0.5, mh * 0.3);
            mg.fillRect(cx + hw - 2 - mw * 0.5, y - 2, mw * 0.5, mh * 0.3);
        }
    }

    _initTrees() {
        for (let i = 0; i < 6; i++) {
            this._spawnTree(true);
        }
    }

    _spawnTree(init) {
        const { W, H } = this;
        const side   = Math.random() < 0.5 ? -1 : 1;
        const depth  = init ? Math.random() : 0.02;
        const hy     = H * 0.38;
        const y      = hy + (H - hy) * depth;
        const scale  = 0.3 + depth * 1.4;
        const xOff   = side * (W * 0.5 + W * 0.08 * depth + 30 + Math.random() * 80);
        const x      = W / 2 + xOff;

        const g = this.add.graphics().setDepth(2 + depth * 3);
        this._drawTree(g, x, y, scale, depth);

        this.trees.push({ gfx: g, x, y, scale, depth, side, speed: 0.4 + depth * 0.8 });
    }

    _drawTree(g, x, y, scale, depth) {
        g.clear();
        const trunkH = 28 * scale;
        const trunkW = 7 * scale;
        const canopyR = 22 * scale;

        const shadow = 0.3 + depth * 0.5;
        g.fillStyle(0x3a6e2f, 1);
        g.fillEllipse(x + 4 * scale, y - trunkH / 3, canopyR * 2.2, canopyR * 0.6, shadow);

        g.fillStyle(0x5c3a1e, 1);
        g.fillRect(x - trunkW / 2, y - trunkH, trunkW, trunkH);

        g.fillStyle(0x2e7d32, 1);
        g.fillCircle(x, y - trunkH - canopyR * 0.7, canopyR);
        g.fillStyle(0x388e3c, 1);
        g.fillCircle(x - canopyR * 0.4, y - trunkH - canopyR * 0.4, canopyR * 0.8);
        g.fillCircle(x + canopyR * 0.4, y - trunkH - canopyR * 0.4, canopyR * 0.75);
        g.fillStyle(0x43a047, 1);
        g.fillCircle(x, y - trunkH - canopyR * 1.2, canopyR * 0.65);
    }

    _initClouds() {
        for (let i = 0; i < 5; i++) {
            this._spawnCloud(true);
        }
    }

    _spawnCloud(init) {
        const { W, H } = this;
        const x = init ? Math.random() * W : -200;
        const y = H * 0.05 + Math.random() * H * 0.28;
        const sc = 0.5 + Math.random() * 0.8;
        const g = this.add.graphics().setDepth(1);
        g.fillStyle(0xffffff, 0.82);
        g.fillEllipse(0, 0, 130, 44);
        g.fillEllipse(-36, -14, 70, 42);
        g.fillEllipse(36, -14, 58, 34);
        g.x = x; g.y = y; g.setScale(sc);
        this.clouds.push({ gfx: g, speed: 0.3 + Math.random() * 0.5 });
    }

    _initPlayer() {
        const { W, H } = this;
        this.playerX  = W / 2;
        this.targetPX = W / 2;

        this.bikeShadow = this.add.graphics().setDepth(9);
        this._drawShadow(W / 2);

        this.bikeSprite = this.add.image(W / 2, H - 90, 'bike_costas')
            .setScale(0.38)
            .setDepth(10);

        this.bikeSprite.setOrigin(0.5, 1);
    }

    _drawShadow(x) {
        const { H } = this;
        this.bikeShadow.clear();
        this.bikeShadow.fillStyle(0x000000, 0.18);
        this.bikeShadow.fillEllipse(x, H - 6, 80, 18);
    }

    _initHUD() {
        const { W, H } = this;
        this.scoreText = this.add.text(16, 12, 'Pontos: 0', {
            fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3, fontStyle: 'bold'
        }).setDepth(20);

        this.distText = this.add.text(W / 2, 12, 'Meta: 0 / 2000m', {
            fontSize: '16px', fill: '#ffe082', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 0).setDepth(20);

        this.livesGfx = this.add.graphics().setDepth(20);
        this._drawLives();

        this.speedBar = this.add.graphics().setDepth(20);
        this._drawSpeedBar();

        const hint = this.add.text(W / 2, H - 16, '← → Virar  |  ESPAÇO Acelerar  |  ESC Voltar', {
            fontSize: '12px', fill: '#ffffff88', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5, 1).setDepth(20);
    }

    _drawLives() {
        const g = this.livesGfx;
        g.clear();
        const { W } = this;
        for (let i = 0; i < this.lives; i++) {
            g.fillStyle(0xff3333, 1);
            const hx = W - 28 - i * 30, hy = 20;
            g.fillTriangle(hx - 9, hy - 2, hx + 9, hy - 2, hx, hy + 10);
            g.fillCircle(hx - 5, hy - 5, 6);
            g.fillCircle(hx + 5, hy - 5, 6);
        }
    }

    _drawSpeedBar() {
        const g = this.speedBar;
        g.clear();
        const { H } = this;
        const bx = 14, by = H - 110, bh = 80, bw = 12;
        g.fillStyle(0x000000, 0.5);
        g.fillRoundedRect(bx - 2, by - 2, bw + 4, bh + 4, 5);
        g.fillStyle(0x333333, 1);
        g.fillRoundedRect(bx, by, bw, bh, 4);
        const ratio = (this.speed - 1) / (this.maxSpeed - 1);
        const filled = bh * ratio;
        const color = ratio < 0.4 ? 0x4caf50 : ratio < 0.75 ? 0xffc107 : 0xff5722;
        g.fillStyle(color, 1);
        g.fillRoundedRect(bx, by + bh - filled, bw, filled, 3);
        this.add.text(bx + bw / 2, by - 14, 'VEL', { fontSize: '9px', fill: '#fff', stroke: '#000', strokeThickness: 2 })
            .setOrigin(0.5, 1).setDepth(21);
    }

    _initControls() {
        this.keys = {
            left:   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            a:      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            d:      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            esc:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
            r:      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        };

        this._touchLeft  = false;
        this._touchRight = false;
        this._touchBoost = false;

        this._setupTouchControls();
    }

    _setupTouchControls() {
        const { W, H } = this;
        const leftZone  = this.add.zone(W * 0.22, H - 44, W * 0.44, 80).setInteractive().setDepth(25);
        const rightZone = this.add.zone(W * 0.66, H - 44, W * 0.3, 80).setInteractive().setDepth(25);
        const boostZone = this.add.zone(W * 0.93, H - 44, W * 0.14, 80).setInteractive().setDepth(25);

        leftZone.on('pointerdown',  () => this._touchLeft = true);
        leftZone.on('pointerup',    () => this._touchLeft = false);
        leftZone.on('pointerout',   () => this._touchLeft = false);
        rightZone.on('pointerdown', () => this._touchRight = true);
        rightZone.on('pointerup',   () => this._touchRight = false);
        rightZone.on('pointerout',  () => this._touchRight = false);
        boostZone.on('pointerdown', () => this._touchBoost = true);
        boostZone.on('pointerup',   () => this._touchBoost = false);
        boostZone.on('pointerout',  () => this._touchBoost = false);
    }

    _spawnInitialCoins() {
        for (let i = 0; i < 4; i++) {
            this._spawnCoin(0.3 + i * 0.18);
        }
    }

    _spawnObstacle() {
        const { W, H } = this;
        const hy   = H * 0.38;
        const types = ['barrel', 'rock', 'puddle', 'cone'];
        const type  = types[Math.floor(Math.random() * types.length)];
        const laneX = W / 2 + (Math.random() - 0.5) * 120;

        const g = this.add.graphics().setDepth(5);
        this._drawObstacle(g, laneX, hy + 5, 0.08, type);

        this.obstacles.push({ gfx: g, x: laneX, y: hy + 5, depth: 0.02, type, active: true });
    }

    _drawObstacle(g, x, y, scale, type) {
        g.clear();
        const s = scale;
        if (type === 'barrel') {
            g.fillStyle(0xb71c1c, 1);
            g.fillRect(x - 14 * s, y - 22 * s, 28 * s, 22 * s);
            g.fillStyle(0xffcc02, 1);
            g.fillRect(x - 14 * s, y - 24 * s, 28 * s, 5 * s);
            g.fillRect(x - 14 * s, y - 14 * s, 28 * s, 4 * s);
        } else if (type === 'rock') {
            g.fillStyle(0x78909c, 1);
            g.fillEllipse(x, y - 12 * s, 34 * s, 26 * s);
            g.fillStyle(0x90a4ae, 1);
            g.fillEllipse(x - 5 * s, y - 16 * s, 18 * s, 14 * s);
        } else if (type === 'puddle') {
            g.fillStyle(0x1e88e5, 0.55);
            g.fillEllipse(x, y - 4 * s, 52 * s, 16 * s);
            g.fillStyle(0x64b5f6, 0.4);
            g.fillEllipse(x - 8 * s, y - 6 * s, 22 * s, 9 * s);
        } else if (type === 'cone') {
            g.fillStyle(0xff6f00, 1);
            g.fillTriangle(x, y - 28 * s, x - 12 * s, y, x + 12 * s, y);
            g.fillStyle(0xffffff, 1);
            g.fillRect(x - 12 * s, y - 12 * s, 24 * s, 5 * s);
        }
    }

    _spawnCoin(initDepth) {
        const { W, H } = this;
        const hy   = H * 0.38;
        const depth = initDepth !== undefined ? initDepth : 0.02;
        const x     = W / 2 + (Math.random() - 0.5) * 140;
        const y     = hy + (H - hy) * depth;
        const scale = 0.3 + depth * 1.2;

        const g = this.add.graphics().setDepth(4 + depth * 3);
        this._drawCoin(g, x, y, scale * 14);

        this.coins.push({ gfx: g, x, y, depth, active: true });
    }

    _drawCoin(g, x, y, r) {
        g.clear();
        g.fillStyle(0xffd700, 1);
        g.fillCircle(x, y, r);
        g.fillStyle(0xffee58, 1);
        g.fillCircle(x - r * 0.25, y - r * 0.25, r * 0.45);
        g.lineStyle(2, 0xf9a825, 1);
        g.strokeCircle(x, y, r);
        g.fillStyle(0xffa000, 1);
        g.fillCircle(x, y, r * 0.45);
        g.fillStyle(0xffd700, 1);
        g.fillCircle(x, y, r * 0.32);
    }

    update(time, delta) {
        if (this.gameOver || this.win) return;

        const dt = delta / 1000;

        if (this.keys.esc.isDown) {
            this.scene.start('MenuScene');
            return;
        }

        this._handleInput(dt);
        this._updateWorld(dt);
        this._updateObstacles(dt);
        this._updateCoins(dt);
        this._updateTrees(dt);
        this._updateClouds(dt);
        this._updatePlayer(dt);
        this._updateHUD(dt);
        this._checkWin();
    }

    _handleInput(dt) {
        const { W } = this;
        const goLeft  = this.keys.left.isDown  || this.keys.a.isDown || this._touchLeft;
        const goRight = this.keys.right.isDown || this.keys.d.isDown || this._touchRight;
        const boost   = this.keys.space.isDown || this._touchBoost;

        if (goLeft) {
            this.steerDir = -1;
            this.targetHX = Phaser.Math.Clamp(this.targetHX - 4, W * 0.25, W * 0.75);
            this.targetPX = Phaser.Math.Clamp(this.targetPX - 5, W * 0.2, W * 0.8);
        } else if (goRight) {
            this.steerDir = 1;
            this.targetHX = Phaser.Math.Clamp(this.targetHX + 4, W * 0.25, W * 0.75);
            this.targetPX = Phaser.Math.Clamp(this.targetPX + 5, W * 0.2, W * 0.8);
        } else {
            this.steerDir = 0;
            this.targetHX = Phaser.Math.Linear(this.targetHX, W / 2, 0.04);
            this.targetPX = Phaser.Math.Linear(this.targetPX, W / 2, 0.03);
        }

        if (boost) {
            this.speed = Math.min(this.speed + 8 * dt, this.maxSpeed);
        } else {
            const base = 3 + Math.min(this.distance / 500, 5);
            this.speed = Phaser.Math.Linear(this.speed, base, 0.02);
        }

        this.horizonX = Phaser.Math.Linear(this.horizonX, this.targetHX, 0.07);
        this.playerX  = Phaser.Math.Linear(this.playerX,  this.targetPX, 0.1);
    }

    _updateWorld(dt) {
        const shift = this.horizonX - this.W / 2;
        this._drawHills(shift * 0.4);
        this._drawRoad(shift * 0.55, this.speed / this.maxSpeed);

        this.distance += this.speed * dt * 8;

        this.obstacleTick += dt;
        const interval = Math.max(1.2 - this.distance / 2000, 0.4);
        if (this.obstacleTick >= interval) {
            this.obstacleTick = 0;
            this._spawnObstacle();
        }

        this.coinTick += dt;
        if (this.coinTick >= 1.8) {
            this.coinTick = 0;
            this._spawnCoin();
        }

        this.treeTick += dt;
        if (this.treeTick >= 0.7) {
            this.treeTick = 0;
            this._spawnTree(false);
        }

        this.cloudTick += dt;
        if (this.cloudTick >= 4) {
            this.cloudTick = 0;
            this._spawnCloud(false);
        }
    }

    _updateObstacles(dt) {
        const { W, H } = this;
        const hy   = H * 0.38;
        const speed = this.speed * dt * 0.55;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const ob = this.obstacles[i];
            if (!ob.active) { this.obstacles.splice(i, 1); continue; }

            ob.depth = Math.min(ob.depth + speed, 1.0);
            ob.y     = hy + (H - hy) * ob.depth;

            const shift = this.horizonX - W / 2;
            ob.x += shift * 0.008;

            const scale = 0.08 + ob.depth * 1.1;
            ob.gfx.setDepth(5 + ob.depth * 5);
            this._drawObstacle(ob.gfx, ob.x, ob.y, scale, ob.type);

            if (ob.depth >= 0.98) {
                ob.gfx.destroy();
                ob.active = false;
                continue;
            }

            if (ob.depth > 0.82 && ob.depth < 0.98) {
                const hitW = 44 * (0.08 + ob.depth * 1.1);
                const hitH = 30 * (0.08 + ob.depth * 1.1);
                const dx   = Math.abs(this.playerX - ob.x);
                const dy   = Math.abs(H - 90 - ob.y);
                if (dx < hitW && dy < hitH + 30) {
                    ob.gfx.destroy();
                    ob.active = false;
                    this._hitObstacle();
                }
            }
        }
    }

    _updateCoins(dt) {
        const { W, H } = this;
        const hy  = H * 0.38;
        const spd = this.speed * dt * 0.55;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const c = this.coins[i];
            if (!c.active) { this.coins.splice(i, 1); continue; }

            c.depth = Math.min(c.depth + spd, 1.0);
            c.y     = hy + (H - hy) * c.depth;

            const shift = this.horizonX - W / 2;
            c.x += shift * 0.008;

            const r = (0.3 + c.depth * 1.2) * 14;
            c.gfx.setDepth(4 + c.depth * 3);
            this._drawCoin(c.gfx, c.x, c.y, r);

            if (c.depth >= 0.98) {
                c.gfx.destroy();
                c.active = false;
                continue;
            }

            if (c.depth > 0.78) {
                const hitR = r * 1.4;
                const dx   = Math.abs(this.playerX - c.x);
                const dy   = Math.abs(H - 90 - c.y);
                if (dx < hitR && dy < hitR + 20) {
                    c.gfx.destroy();
                    c.active = false;
                    this.score += 10;
                    this._coinBurst(c.x, c.y);
                }
            }
        }
    }

    _coinBurst(x, y) {
        for (let i = 0; i < 6; i++) {
            const p = this.add.graphics().setDepth(15);
            p.fillStyle(0xffd700, 1);
            p.fillCircle(x, y, 5);
            const angle = (i / 6) * Math.PI * 2;
            const dist  = 30 + Math.random() * 30;
            this.tweens.add({
                targets: p,
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                alpha: 0,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 400,
                ease: 'Power2',
                onComplete: () => p.destroy()
            });
        }
        const t = this.add.text(x, y - 20, '+10', {
            fontSize: '20px', fill: '#ffd700', stroke: '#000', strokeThickness: 3, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(20);
        this.tweens.add({ targets: t, y: y - 60, alpha: 0, duration: 700, onComplete: () => t.destroy() });
    }

    _updateTrees(dt) {
        const { W, H } = this;
        const hy  = H * 0.38;
        const spd = this.speed * dt * 0.5;
        const shift = this.horizonX - W / 2;

        for (let i = this.trees.length - 1; i >= 0; i--) {
            const tr = this.trees[i];
            tr.depth = Math.min(tr.depth + spd * tr.speed, 1.0);
            tr.y     = hy + (H - hy) * tr.depth;
            tr.x    += shift * 0.01 * tr.side;

            const sc = 0.3 + tr.depth * 1.4;
            tr.gfx.setDepth(2 + tr.depth * 3);
            this._drawTree(tr.gfx, tr.x, tr.y, sc, tr.depth);

            if (tr.depth >= 0.99) {
                tr.gfx.destroy();
                this.trees.splice(i, 1);
            }
        }

        while (this.trees.length < 8) this._spawnTree(false);
    }

    _updateClouds(dt) {
        const { W } = this;
        for (let i = this.clouds.length - 1; i >= 0; i--) {
            const c = this.clouds[i];
            c.gfx.x += c.speed;
            if (c.gfx.x > W + 200) {
                c.gfx.destroy();
                this.clouds.splice(i, 1);
            }
        }
        while (this.clouds.length < 5) this._spawnCloud(false);
    }

    _updatePlayer(dt) {
        const { W, H } = this;

        this.bikeSprite.x = this.playerX;
        this._drawShadow(this.playerX);

        this.frameTick += dt;
        if (this.frameTick > 0.1) {
            this.frameTick = 0;
            this.spriteFrame = 1 - this.spriteFrame;
        }

        const absSin = Math.sin(Date.now() / 80) * 2;

        if (this.steerDir === -1) {
            this.bikeSprite.setTexture('bike_lado');
            this.bikeSprite.setFlipX(true);
            this.bikeSprite.setScale(0.38);
            this.bikeSprite.y = H - 90 + absSin;
        } else if (this.steerDir === 1) {
            this.bikeSprite.setTexture('bike_lado');
            this.bikeSprite.setFlipX(false);
            this.bikeSprite.setScale(0.38);
            this.bikeSprite.y = H - 90 + absSin;
        } else {
            this.bikeSprite.setTexture('bike_costas');
            this.bikeSprite.setFlipX(false);
            this.bikeSprite.setScale(0.38 + Math.abs(absSin) * 0.002);
            this.bikeSprite.y = H - 90 + absSin;
        }

        const leanAngle = this.steerDir * 0.08;
        this.bikeSprite.setAngle(Phaser.Math.RadToDeg(leanAngle));
    }

    _updateHUD(dt) {
        this.scoreText.setText('Pontos: ' + this.score);
        const dist = Math.floor(this.distance);
        this.distText.setText(`Meta: ${dist} / ${this.goalDist}m`);
        this._drawLives();
        this._drawSpeedBar();

        if (this.shakeTimer > 0) {
            this.cameras.main.x = (Math.random() - 0.5) * 10;
            this.cameras.main.y = (Math.random() - 0.5) * 10;
            this.shakeTimer -= dt;
        } else {
            this.cameras.main.x = 0;
            this.cameras.main.y = 0;
        }
    }

    _hitObstacle() {
        if (this.lives <= 0) return;
        this.lives--;
        this.speed = Math.max(this.speed * 0.4, 1.5);
        this.shakeTimer = 0.35;
        this._drawLives();

        const { W, H } = this;
        const flash = this.add.graphics().setDepth(30);
        flash.fillStyle(0xff0000, 0.35);
        flash.fillRect(0, 0, W, H);
        this.tweens.add({ targets: flash, alpha: 0, duration: 350, onComplete: () => flash.destroy() });

        const boom = this.add.text(W / 2, H / 2 - 40, '💥 Bateu!', {
            fontSize: '32px', fill: '#ff4444', stroke: '#000', strokeThickness: 4, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(31);
        this.tweens.add({ targets: boom, y: H / 2 - 90, alpha: 0, duration: 900, onComplete: () => boom.destroy() });

        if (this.lives <= 0) {
            this.time.delayedCall(500, () => this._showGameOver());
        }
    }

    _checkWin() {
        if (this.distance >= this.goalDist) {
            this.win = true;
            this._showWin();
        }
    }

    _showGameOver() {
        this.gameOver = true;
        const { W, H } = this;

        const ov = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.72);
        ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x1a1a2e, 0.98);
        ov.fillRoundedRect(W / 2 - 240, H / 2 - 150, 480, 300, 22);
        ov.lineStyle(3, 0xff4444, 1);
        ov.strokeRoundedRect(W / 2 - 240, H / 2 - 150, 480, 300, 22);

        this.add.text(W / 2, H / 2 - 100, '💥 GAME OVER', {
            fontSize: '38px', fill: '#ff4444', fontStyle: 'bold', stroke: '#000', strokeThickness: 6
        }).setOrigin(0.5).setDepth(41);

        this.add.text(W / 2, H / 2 - 30, `Pontos: ${this.score}`, {
            fontSize: '24px', fill: '#ffd700', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(41);

        this.add.text(W / 2, H / 2 + 20, `Distância: ${Math.floor(this.distance)}m`, {
            fontSize: '18px', fill: '#aaa', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(41);

        this._addBtn(W / 2 - 110, H / 2 + 90, 'Tentar Novamente', 0x1565c0, () => this.scene.restart());
        this._addBtn(W / 2 + 110, H / 2 + 90, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _showWin() {
        const { W, H } = this;

        const ov = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.65);
        ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x0d1a0d, 0.98);
        ov.fillRoundedRect(W / 2 - 260, H / 2 - 170, 520, 340, 22);
        ov.lineStyle(3, 0xffd700, 1);
        ov.strokeRoundedRect(W / 2 - 260, H / 2 - 170, 520, 340, 22);

        const title = this.add.text(W / 2, H / 2 - 120, '🏁 FIM DA PISTA!', {
            fontSize: '36px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 6
        }).setOrigin(0.5).setDepth(41);
        this.tweens.add({ targets: title, scaleX: 1.05, scaleY: 1.05, yoyo: true, repeat: -1, duration: 700 });

        this.add.text(W / 2, H / 2 - 50, `🪙 Pontos: ${this.score}`, {
            fontSize: '26px', fill: '#ffd700', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(41);

        this.add.text(W / 2, H / 2 + 10, `🏁 Distância: ${Math.floor(this.distance)}m`, {
            fontSize: '20px', fill: '#aeffa5', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(41);

        const stars = this.score >= 200 ? 3 : this.score >= 100 ? 2 : 1;
        const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
        this.add.text(W / 2, H / 2 + 50, starStr, { fontSize: '34px' }).setOrigin(0.5).setDepth(41);

        this._addBtn(W / 2 - 120, H / 2 + 120, 'Jogar de Novo', 0x2e7d32, () => this.scene.restart());
        this._addBtn(W / 2 + 120, H / 2 + 120, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _addBtn(x, y, label, color, cb) {
        const bg = this.add.graphics().setDepth(41);
        bg.fillStyle(color, 1);
        bg.fillRoundedRect(x - 110, y - 22, 220, 44, 12);
        bg.lineStyle(2, 0xffffff, 0.35);
        bg.strokeRoundedRect(x - 110, y - 22, 220, 44, 12);
        const txt = this.add.text(x, y, label, {
            fontSize: '17px', fill: '#fff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(42).setInteractive({ useHandCursor: true });
        txt.on('pointerover',  () => txt.setScale(1.07));
        txt.on('pointerout',   () => txt.setScale(1));
        txt.on('pointerdown',  cb);
    }
}
