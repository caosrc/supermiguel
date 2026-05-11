class BicicletaScene extends Phaser.Scene {
    constructor() { super('BicicletaScene'); }

    preload() {
        this.load.image('bike_costas', 'assets/bicicleta_costas.png');
        this.load.image('bike_lado',   'assets/bicicleta_lado.png');
    }

    create() {
        const { width: W, height: H } = this.scale;
        this.W = W; this.H = H;

        this._initState();
        this._initBg();
        this._initRoad();
        this._initScenery();
        this._initPlayer();
        this._initHUD();
        this._initControls();
        this._spawnInitialObjects();
        this._initAudio();
        this._startCountdown();
    }

    _initState() {
        this.speed       = 0;
        this.maxSpeed    = 13;
        this.score       = 0;
        this.lives       = 3;
        this.gameOver    = false;
        this.win         = false;
        this.started     = false;
        this.distance    = 0;
        this.goalDist    = 2000;
        this.shakeTimer  = 0;
        this.horizonX    = this.W / 2;
        this.targetHX    = this.W / 2;
        this.playerX     = this.W / 2;
        this.targetPX    = this.W / 2;
        this.steerDir    = 0;
        this.obstacles   = [];
        this.coins       = [];
        this.hearts      = [];
        this.trees       = [];
        this.clouds      = [];
        this.buildings   = [];
        this.rocks       = [];
        this.obstacleTick = 0;
        this.coinTick     = 0;
        this.heartTick    = 0;
        this.treeTick     = 0;
        this.cloudTick    = 0;
        this.buildTick    = 0;
        this.stopTick     = 0;
        this.stopFrame    = 0;
        this.jitterX      = 0;
        this.jitterY      = 0;
        this.segment      = 0;
        this._boostOsc    = null;
        this._ac          = null;
    }

    _segment() {
        if (this.distance < 667)  return 0;
        if (this.distance < 1334) return 1;
        return 2;
    }

    _segColors() {
        const segs = [
            { sky1: 0x4db8e8, sky2: 0xa8dff5, grass: 0x4caf50, road: 0x888888, shoulder: 0x777777, curb: 0xb0bec5, stripe: 0xffffff },
            { sky1: 0x1e6e2b, sky2: 0x6abf6a, grass: 0x2d7d3a, road: 0x6d5a3e, shoulder: 0x5c4a2e, curb: 0x8d6e63, stripe: 0xffe082 },
            { sky1: 0x0277bd, sky2: 0x81d4fa, grass: 0x1565c0, road: 0x546e7a, shoulder: 0x455a64, curb: 0x90a4ae, stripe: 0xffffff },
        ];
        return segs[this._segment()];
    }

    _initBg() {
        this.bgGfx   = this.add.graphics().setDepth(0);
        this.hillGfx = this.add.graphics().setDepth(1);
        this.sunGfx  = this.add.graphics().setDepth(1);
        this._drawSky(0);
        this._drawSun();
    }

    _drawSky(shift) {
        const { W, H } = this;
        const seg = this._segColors();
        const hy  = H * 0.38;
        const g   = this.bgGfx;
        g.clear();
        g.fillGradientStyle(seg.sky1, seg.sky1, seg.sky2, seg.sky2, 1);
        g.fillRect(0, 0, W, hy + 8);
        g.fillStyle(seg.grass, 1);
        g.fillRect(0, hy + 2, W, H - hy);
        this._drawHills(shift);
    }

    _drawSun() {
        const { W, H } = this;
        const g = this.sunGfx;
        g.clear();
        g.fillStyle(0xfff9c4, 1); g.fillCircle(W * 0.78, H * 0.10, 30);
        g.fillStyle(0xffee58, 0.28); g.fillCircle(W * 0.78, H * 0.10, 46);
    }

    _drawHills(shift) {
        const { W, H } = this;
        const hy  = H * 0.38;
        const hx  = W / 2 + shift;
        const seg = this._segment();
        const g   = this.hillGfx;
        g.clear();

        if (seg === 0) {
            const hills = [
                { ox: -0.42, ow: 0.54, oh: 0.13, c: 0x5a9e52 },
                { ox: 0.02,  ow: 0.48, oh: 0.10, c: 0x6ab860 },
                { ox: 0.38,  ow: 0.54, oh: 0.12, c: 0x5a9e52 },
            ];
            hills.forEach(h => {
                g.fillStyle(h.c, 1);
                g.fillEllipse(hx + W * h.ox, hy + 4, W * h.ow, H * h.oh * 2);
            });
        } else if (seg === 1) {
            g.fillStyle(0x1b5e20, 1);
            for (let i = -1; i <= 3; i++) {
                g.fillEllipse(hx + W * (i * 0.38 - 0.2), hy + 2, W * 0.42, H * 0.18);
            }
            g.fillStyle(0x2e7d32, 1);
            for (let i = 0; i <= 3; i++) {
                g.fillEllipse(hx + W * (i * 0.34 - 0.1), hy - 8, W * 0.3, H * 0.13);
            }
        } else {
            g.fillStyle(0x1565c0, 1);
            g.fillRect(0, hy - 10, W, 22);
            g.fillStyle(0x29b6f6, 0.5);
            for (let i = 0; i < 12; i++) {
                g.fillEllipse(i * 88 + hx % 88, hy - 2, 60, 14);
            }
            g.fillStyle(0x546e7a, 1);
            const rocks = [
                { ox: -0.4, s: 0.09 }, { ox: -0.2, s: 0.07 }, { ox: 0.1, s: 0.10 },
                { ox: 0.32, s: 0.08 }, { ox: 0.55, s: 0.06 },
            ];
            rocks.forEach(r => {
                g.fillEllipse(hx + W * r.ox, hy - 4, W * r.s * 2, H * r.s);
            });
        }

        const seg2 = this._segColors();
        g.fillStyle(seg2.grass, 1);
        g.fillRect(0, hy + 1, W, 10);
    }

    _initRoad() {
        this.roadGfx = this.add.graphics().setDepth(2);
        this.markGfx = this.add.graphics().setDepth(3);
        this._drawRoad(0, 0);
    }

    _drawRoad(horizonShift, distFrac) {
        const { W, H } = this;
        const rg  = this.roadGfx;
        const mg  = this.markGfx;
        rg.clear(); mg.clear();

        const hy      = H * 0.38;
        const hx      = W / 2 + horizonShift;
        const rtop    = 76;
        const rbot    = W * 0.88;
        const c       = this._segColors();

        rg.fillStyle(c.road, 1);
        rg.fillPoints([
            { x: hx - rtop / 2, y: hy },
            { x: hx + rtop / 2, y: hy },
            { x: W / 2 + rbot / 2, y: H },
            { x: W / 2 - rbot / 2, y: H }
        ], true);

        rg.fillStyle(c.shoulder, 1);
        rg.fillPoints([{ x: hx - rtop/2 - 16, y: hy }, { x: hx - rtop/2, y: hy }, { x: W/2 - rbot/2, y: H }, { x: W/2 - rbot/2 - 26, y: H }], true);
        rg.fillPoints([{ x: hx + rtop/2, y: hy }, { x: hx + rtop/2 + 16, y: hy }, { x: W/2 + rbot/2 + 26, y: H }, { x: W/2 + rbot/2, y: H }], true);

        rg.fillStyle(c.curb, 1);
        rg.fillPoints([{ x: hx - rtop/2 - 16, y: hy }, { x: hx - rtop/2 - 34, y: hy }, { x: W/2 - rbot/2 - 52, y: H }, { x: W/2 - rbot/2 - 26, y: H }], true);
        rg.fillPoints([{ x: hx + rtop/2 + 16, y: hy }, { x: hx + rtop/2 + 34, y: hy }, { x: W/2 + rbot/2 + 52, y: H }, { x: W/2 + rbot/2 + 26, y: H }], true);

        rg.fillStyle(c.grass, 1);
        rg.fillRect(0, hy, hx - rtop/2 - 34, H - hy);
        rg.fillRect(hx + rtop/2 + 34, hy, W - (hx + rtop/2 + 34), H - hy);

        this._drawStripes(mg, hx, hy, rtop, rbot, distFrac, c.stripe);
    }

    _drawStripes(mg, hx, hy, rtop, rbot, distFrac, color) {
        const { W, H } = this;
        const offset = distFrac % 1;
        for (let i = 0; i < 12; i++) {
            const t = (i / 12 + offset) % 1;
            if (t < 0.45) continue;
            const lerpT = (t - 0.45) / 0.55;
            const y   = hy + (H - hy) * lerpT;
            const cx  = W / 2 + (hx - W / 2) * (1 - lerpT);
            const hw  = (rtop + (rbot - rtop) * lerpT) / 2;
            const mw  = 3 + 12 * lerpT;
            const mh  = 6 + 26 * lerpT;
            mg.fillStyle(color, 0.82);
            mg.fillRect(cx - mw / 2, y - mh / 2, mw, mh);
            mg.fillStyle(color, 0.35);
            mg.fillRect(cx - hw + 2, y - 2, mw * 0.6, mh * 0.28);
            mg.fillRect(cx + hw - 2 - mw * 0.6, y - 2, mw * 0.6, mh * 0.28);
        }
    }

    _initScenery() {
        this.sceneryGfx = this.add.graphics().setDepth(2);
        for (let i = 0; i < 7; i++) this._spawnTree(true);
        for (let i = 0; i < 4; i++) this._spawnCloud(true);
        for (let i = 0; i < 3; i++) this._spawnBuilding(true);
    }

    _spawnTree(init) {
        const { W, H } = this;
        const side  = Math.random() < 0.5 ? -1 : 1;
        const depth = init ? Math.random() * 0.9 : 0.02;
        const hy    = H * 0.38;
        const y     = hy + (H - hy) * depth;
        const scale = 0.28 + depth * 1.5;
        const xOff  = side * (W * 0.5 + W * 0.10 * depth + 28 + Math.random() * 90);
        const x     = W / 2 + xOff;
        const g     = this.add.graphics().setDepth(2 + depth * 3);
        const seg   = this._segment();
        this._drawTreeType(g, x, y, scale, depth, seg);
        this.trees.push({ gfx: g, x, y, scale, depth, side, speed: 0.35 + depth * 0.9, seg });
    }

    _drawTreeType(g, x, y, scale, depth, seg) {
        g.clear();
        const s = scale;
        if (seg === 1) {
            const trunkH = 32 * s, trunkW = 6 * s, cr = 28 * s;
            g.fillStyle(0x3e2723, 1); g.fillRect(x - trunkW/2, y - trunkH, trunkW, trunkH);
            g.fillStyle(0x1b5e20, 1); g.fillCircle(x, y - trunkH - cr * 0.7, cr);
            g.fillStyle(0x2e7d32, 1); g.fillCircle(x - cr*0.4, y - trunkH - cr*0.35, cr*0.82);
            g.fillCircle(x + cr*0.4, y - trunkH - cr*0.35, cr*0.78);
            g.fillStyle(0x388e3c, 1); g.fillCircle(x, y - trunkH - cr*1.28, cr*0.6);
        } else if (seg === 2) {
            const h = 36 * s, w = 8 * s;
            g.fillStyle(0x37474f, 1); g.fillRect(x - w/2, y - h, w, h);
            g.fillStyle(0x00838f, 1); g.fillCircle(x, y - h - 18*s, 16*s);
            g.fillStyle(0x006064, 0.6); g.fillEllipse(x, y - h - 4*s, 22*s, 10*s);
            g.fillStyle(0x29b6f6, 0.45);
            g.fillEllipse(x - 28*s, y + 2*s, 22*s, 8*s);
            g.fillEllipse(x + 22*s, y, 18*s, 7*s);
        } else {
            const trunkH = 28*s, trunkW = 7*s, cr = 22*s;
            g.fillStyle(0x6d4c41, 1); g.fillRect(x - trunkW/2, y - trunkH, trunkW, trunkH);
            g.fillStyle(0x3a6e2f, 0.5); g.fillEllipse(x + 4*s, y - trunkH/3, cr*2.2, cr*0.58, 0.3+depth*0.5);
            g.fillStyle(0x2e7d32, 1); g.fillCircle(x, y - trunkH - cr*0.7, cr);
            g.fillStyle(0x43a047, 1); g.fillCircle(x - cr*0.38, y - trunkH - cr*0.38, cr*0.8);
            g.fillCircle(x + cr*0.38, y - trunkH - cr*0.38, cr*0.76);
            g.fillStyle(0x66bb6a, 1); g.fillCircle(x, y - trunkH - cr*1.22, cr*0.62);
        }
    }

    _spawnCloud(init) {
        const { W, H } = this;
        const x  = init ? Math.random() * W : -220;
        const y  = H * 0.04 + Math.random() * H * 0.27;
        const sc = 0.45 + Math.random() * 0.85;
        const g  = this.add.graphics().setDepth(1);
        const alpha = this._segment() === 1 ? 0.55 : 0.82;
        g.fillStyle(0xffffff, alpha);
        g.fillEllipse(0, 0, 130, 44); g.fillEllipse(-36, -14, 70, 42); g.fillEllipse(36, -14, 58, 34);
        g.x = x; g.y = y; g.setScale(sc);
        this.clouds.push({ gfx: g, speed: 0.28 + Math.random() * 0.55 });
    }

    _spawnBuilding(init) {
        if (this._segment() !== 0) return;
        const { W, H } = this;
        const side  = Math.random() < 0.5 ? -1 : 1;
        const depth = init ? Math.random() * 0.7 : 0.04;
        const hy    = H * 0.38;
        const y     = hy + (H - hy) * depth;
        const scale = 0.25 + depth * 1.2;
        const bh    = (60 + Math.random() * 80) * scale;
        const bw    = (40 + Math.random() * 40) * scale;
        const xOff  = side * (W * 0.5 + W * 0.08 * depth + 50 + Math.random() * 60);
        const x     = W / 2 + xOff;
        const colors = [0xe8c07a, 0xadd8e6, 0xffffe0, 0xf5deb3, 0xdcedc8, 0xffe0b2];
        const color  = colors[Math.floor(Math.random() * colors.length)];
        const g = this.add.graphics().setDepth(1.5 + depth * 2);
        this._drawBuilding(g, x, y, bw, bh, color);
        this.buildings.push({ gfx: g, x, y, depth, side, bw, bh, color, speed: 0.25 + depth * 0.7 });
    }

    _drawBuilding(g, x, y, bw, bh, color) {
        g.clear();
        g.fillStyle(color, 1); g.fillRect(x - bw/2, y - bh, bw, bh);
        g.fillStyle(0x8b4513, 1); g.fillTriangle(x - bw/2 - 5, y - bh, x, y - bh - bh*0.25, x + bw/2 + 5, y - bh);
        g.fillStyle(0xfff9c4, 0.85);
        const rows = Math.max(1, Math.floor(bh / 20));
        const cols = Math.max(1, Math.floor(bw / 18));
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            g.fillRect(x - bw/2 + 5 + c * 16, y - bh + 8 + r * 18, 9, 12);
        }
    }

    _spawnObstacle() {
        const { W, H } = this;
        const hy    = H * 0.38;
        const seg   = this._segment();
        const types = seg === 0 ? ['barrel', 'cone', 'rock', 'puddle']
                    : seg === 1 ? ['rock', 'log', 'puddle', 'bush']
                    : ['rock', 'barrel', 'puddle', 'log'];
        const type  = types[Math.floor(Math.random() * types.length)];
        const lanes = [-90, -30, 30, 90];
        const laneX = W / 2 + lanes[Math.floor(Math.random() * lanes.length)];
        const g = this.add.graphics().setDepth(5);
        this._drawObstacle(g, laneX, hy + 5, 0.08, type);
        this.obstacles.push({ gfx: g, x: laneX, y: hy + 5, depth: 0.02, type, active: true });
    }

    _drawObstacle(g, x, y, scale, type) {
        g.clear();
        const s = scale;
        if (type === 'barrel') {
            g.fillStyle(0xb71c1c, 1); g.fillRect(x - 14*s, y - 22*s, 28*s, 22*s);
            g.fillStyle(0xffcc02, 1); g.fillRect(x - 14*s, y - 24*s, 28*s, 5*s);
            g.fillRect(x - 14*s, y - 13*s, 28*s, 4*s);
            g.fillStyle(0xef5350, 1); g.fillRect(x - 8*s, y - 20*s, 4*s, 14*s);
        } else if (type === 'rock') {
            g.fillStyle(0x546e7a, 1); g.fillEllipse(x, y - 14*s, 36*s, 28*s);
            g.fillStyle(0x78909c, 1); g.fillEllipse(x - 5*s, y - 18*s, 18*s, 14*s);
            g.fillStyle(0x37474f, 0.4); g.fillEllipse(x + 6*s, y - 5*s, 24*s, 10*s);
        } else if (type === 'puddle') {
            g.fillStyle(0x1e88e5, 0.52); g.fillEllipse(x, y - 4*s, 56*s, 18*s);
            g.fillStyle(0x64b5f6, 0.38); g.fillEllipse(x - 10*s, y - 7*s, 24*s, 10*s);
        } else if (type === 'cone') {
            g.fillStyle(0xff6f00, 1); g.fillTriangle(x, y - 30*s, x - 13*s, y, x + 13*s, y);
            g.fillStyle(0xffffff, 1); g.fillRect(x - 13*s, y - 12*s, 26*s, 5*s);
            g.fillStyle(0xff6f00, 1); g.fillRect(x - 10*s, y - 2*s, 20*s, 5*s);
        } else if (type === 'log') {
            g.fillStyle(0x5d4037, 1); g.fillEllipse(x, y - 10*s, 50*s, 20*s);
            g.fillStyle(0x8d6e63, 1); g.fillEllipse(x - 24*s, y - 10*s, 16*s, 20*s);
            g.fillEllipse(x + 24*s, y - 10*s, 16*s, 20*s);
            g.fillStyle(0x4e342e, 0.4); g.fillRect(x - 24*s, y - 14*s, 48*s, 4*s);
        } else if (type === 'bush') {
            g.fillStyle(0x33691e, 1); g.fillCircle(x, y - 16*s, 18*s);
            g.fillStyle(0x558b2f, 1); g.fillCircle(x - 14*s, y - 12*s, 15*s);
            g.fillCircle(x + 14*s, y - 12*s, 14*s);
            g.fillStyle(0x7cb342, 1); g.fillCircle(x, y - 26*s, 12*s);
        }
    }

    _spawnCoin(initDepth) {
        const { W, H } = this;
        const hy    = H * 0.38;
        const depth = initDepth !== undefined ? initDepth : 0.02;
        const lanes = [-70, -24, 24, 70];
        const x     = W / 2 + lanes[Math.floor(Math.random() * lanes.length)];
        const y     = hy + (H - hy) * depth;
        const g     = this.add.graphics().setDepth(4 + depth * 3);
        this._drawCoin(g, x, y, (0.28 + depth * 1.2) * 13);
        this.coins.push({ gfx: g, x, y, depth, active: true, bob: Math.random() * Math.PI * 2 });
    }

    _drawCoin(g, x, y, r) {
        g.clear();
        g.fillStyle(0xffd700, 1); g.fillCircle(x, y, r);
        g.fillStyle(0xffee58, 1); g.fillCircle(x - r*0.25, y - r*0.25, r*0.44);
        g.lineStyle(2, 0xf9a825, 1); g.strokeCircle(x, y, r);
        g.fillStyle(0xffa000, 1); g.fillCircle(x, y, r*0.44);
        g.fillStyle(0xffd700, 1); g.fillCircle(x, y, r*0.30);
    }

    _spawnHeart() {
        const { W, H } = this;
        const hy  = H * 0.38;
        const x   = W / 2 + (Math.random() - 0.5) * 120;
        const g   = this.add.graphics().setDepth(6);
        this._drawHeart(g, x, hy + 5, 0.08);
        this.hearts.push({ gfx: g, x, y: hy + 5, depth: 0.02, active: true });
    }

    _drawHeart(g, x, y, scale) {
        const s = scale;
        g.clear();
        g.fillStyle(0xff3b3b, 1);
        g.fillTriangle(x, y, x - 18*s, y - 20*s, x + 18*s, y - 20*s);
        g.fillCircle(x - 10*s, y - 20*s, 10*s);
        g.fillCircle(x + 10*s, y - 20*s, 10*s);
        g.fillStyle(0xff6e6e, 0.6);
        g.fillCircle(x - 8*s, y - 22*s, 5*s);
    }

    _spawnInitialObjects() {
        for (let i = 0; i < 4; i++) this._spawnCoin(0.2 + i * 0.18);
    }

    _initPlayer() {
        const { W, H } = this;
        this.playerX  = W / 2;
        this.targetPX = W / 2;
        this.shadowGfx   = this.add.graphics().setDepth(9);
        this.bikeSprite  = this.add.image(W / 2, H - 85, 'bike_costas').setScale(0.38).setDepth(10).setOrigin(0.5, 1);
        this._drawShadow(W / 2);
    }

    _drawShadow(x) {
        const { H } = this;
        this.shadowGfx.clear();
        this.shadowGfx.fillStyle(0x000000, 0.16);
        this.shadowGfx.fillEllipse(x, H - 4, 82, 18);
    }

    _initHUD() {
        const { W, H } = this;
        this.scoreText = this.add.text(16, 12, 'Pontos: 0', { fontSize: '18px', fill: '#fff', stroke: '#000', strokeThickness: 3, fontStyle: 'bold' }).setDepth(20);
        this.distText  = this.add.text(W / 2, 12, '', { fontSize: '15px', fill: '#ffe082', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5, 0).setDepth(20);
        this.segText   = this.add.text(W / 2, 32, '', { fontSize: '12px', fill: '#ffffffaa', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5, 0).setDepth(20);
        this.livesGfx  = this.add.graphics().setDepth(20);
        this.speedGfx  = this.add.graphics().setDepth(20);
        this.barGfx    = this.add.graphics().setDepth(20);
        this._drawLives();
        this._drawSpeedBar();
        this._drawProgressBar();
        this.add.text(W / 2, H - 15, '← → Virar  |  ESPAÇO Acelerar  |  ESC Voltar', { fontSize: '11px', fill: '#ffffff66', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5, 1).setDepth(20);
    }

    _drawLives() {
        const { W } = this;
        const g = this.livesGfx;
        g.clear();
        for (let i = 0; i < 3; i++) {
            const hx = W - 26 - i * 30, hy = 20;
            if (i < this.lives) {
                g.fillStyle(0xff3333, 1);
                g.fillTriangle(hx - 9, hy - 1, hx + 9, hy - 1, hx, hy + 10);
                g.fillCircle(hx - 5, hy - 5, 6);
                g.fillCircle(hx + 5, hy - 5, 6);
            } else {
                g.fillStyle(0x555555, 1);
                g.fillTriangle(hx - 9, hy - 1, hx + 9, hy - 1, hx, hy + 10);
                g.fillCircle(hx - 5, hy - 5, 6);
                g.fillCircle(hx + 5, hy - 5, 6);
            }
        }
    }

    _drawSpeedBar() {
        const { H } = this;
        const g = this.speedGfx;
        g.clear();
        const bx = 14, by = H - 116, bh = 88, bw = 13;
        g.fillStyle(0x000000, 0.5); g.fillRoundedRect(bx - 2, by - 2, bw + 4, bh + 4, 5);
        g.fillStyle(0x333333, 1); g.fillRoundedRect(bx, by, bw, bh, 4);
        const ratio  = Math.min((this.speed - 0) / this.maxSpeed, 1);
        const filled = bh * ratio;
        const color  = ratio < 0.4 ? 0x4caf50 : ratio < 0.75 ? 0xffc107 : 0xff5722;
        if (filled > 0) {
            g.fillStyle(color, 1);
            g.fillRoundedRect(bx, by + bh - filled, bw, filled, 3);
        }
        g.fillStyle(0xffffff, 0.25); g.fillRect(bx + 1, by + bh - filled, 4, filled * 0.4);
    }

    _drawProgressBar() {
        const { W, H } = this;
        const g   = this.barGfx;
        g.clear();
        const bx  = 60, by = H - 22, bw = W - 120, bh = 10;
        const seg = this._segColors();
        g.fillStyle(0x000000, 0.5); g.fillRoundedRect(bx - 1, by - 1, bw + 2, bh + 2, 5);
        g.fillStyle(0x444444, 1); g.fillRoundedRect(bx, by, bw, bh, 4);

        const segs = [{ c: 0x1565c0, end: 0.333 }, { c: 0x2e7d32, end: 0.666 }, { c: 0x0277bd, end: 1.0 }];
        segs.forEach((s, i) => {
            const sw = bw * 0.333;
            g.fillStyle(s.c, 0.5);
            g.fillRect(bx + i * sw, by, sw - 2, bh);
        });

        const ratio = Math.min(this.distance / this.goalDist, 1);
        g.fillStyle(0xffd700, 1); g.fillRoundedRect(bx, by, bw * ratio, bh, 4);
        g.fillStyle(0xffffff, 0.4); g.fillRect(bx, by + 1, bw * ratio, 3);

        g.fillStyle(0xff4444, 1); g.fillTriangle(bx + bw * ratio - 5, by - 6, bx + bw * ratio + 5, by - 6, bx + bw * ratio, by + 1);
    }

    _initControls() {
        const { W, H } = this;
        this.keys = {
            left:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            a:     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            d:     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            esc:   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
        };
        this._touchLeft = false; this._touchRight = false; this._touchBoost = false;
        const lz = this.add.zone(W * 0.22, H - 42, W * 0.44, 72).setInteractive().setDepth(25);
        const rz = this.add.zone(W * 0.66, H - 42, W * 0.3,  72).setInteractive().setDepth(25);
        const bz = this.add.zone(W * 0.93, H - 42, W * 0.14, 72).setInteractive().setDepth(25);
        lz.on('pointerdown', () => this._touchLeft  = true).on('pointerup', () => this._touchLeft  = false).on('pointerout', () => this._touchLeft  = false);
        rz.on('pointerdown', () => this._touchRight = true).on('pointerup', () => this._touchRight = false).on('pointerout', () => this._touchRight = false);
        bz.on('pointerdown', () => this._touchBoost = true).on('pointerup', () => this._touchBoost = false).on('pointerout', () => this._touchBoost = false);
    }

    _startCountdown() {
        const { W, H } = this;
        this.started = false;
        const overlay = this.add.graphics().setDepth(50);
        overlay.fillStyle(0x000000, 0.5); overlay.fillRect(0, 0, W, H);

        const countText = this.add.text(W / 2, H / 2, '3', {
            fontSize: '120px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 10
        }).setOrigin(0.5).setDepth(51);

        const segNames = ['🏙️ Cidade', '🌲 Floresta', '💧 Cachoeira'];
        this.add.text(W / 2, H / 2 - 130, 'Fase da Bicicleta', {
            fontSize: '28px', fill: '#fff', stroke: '#000', strokeThickness: 5, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(51);
        this.add.text(W / 2, H / 2 + 80, segNames[0] + ' → ' + segNames[1] + ' → ' + segNames[2], {
            fontSize: '15px', fill: '#ffffffcc', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(51);

        const rec = BicicletaRecords.load();
        if (rec.bestScore > 0) {
            this.add.text(W / 2, H / 2 + 115, `🏆 Recorde: ${rec.bestScore} pts — ${rec.bestDistance}m`, {
                fontSize: '14px', fill: '#ffd700', stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(51);
        }

        let count = 3;
        const tick = () => {
            this._soundBeep(count === 0);
            if (count <= 0) {
                countText.setText('VAI!');
                countText.setStyle({ fill: '#00ff88' });
                this.tweens.add({ targets: countText, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 600, onComplete: () => { countText.destroy(); overlay.destroy(); } });
                this.started = true;
                this.speed   = 3;
                return;
            }
            countText.setText(String(count));
            countText.setScale(1);
            this.tweens.add({ targets: countText, scaleX: 0.7, scaleY: 0.7, duration: 800, ease: 'Power2' });
            count--;
            this.time.delayedCall(900, tick);
        };
        this.time.delayedCall(600, tick);
    }

    update(time, delta) {
        if (this.gameOver || this.win) return;
        const dt = delta / 1000;
        if (this.keys.esc.isDown) { this._stopBgAudio(); this.scene.start('MenuScene'); return; }
        if (!this.started) return;
        this._handleInput(dt);
        this._updateWorld(dt);
        this._updateObstacles(dt);
        this._updateCoins(dt);
        this._updateHearts(dt);
        this._updateScenery(dt);
        this._updatePlayer(dt);
        this._updateHUD(dt);
        this._updateAudio();
        this._checkSegmentChange();
        this._checkWin();
    }

    _handleInput(dt) {
        const { W } = this;
        const goLeft  = this.keys.left.isDown  || this.keys.a.isDown || this._touchLeft;
        const goRight = this.keys.right.isDown || this.keys.d.isDown || this._touchRight;
        const boost   = this.keys.space.isDown || this._touchBoost;

        if (goLeft) {
            this.steerDir = -1;
            this.targetHX = Phaser.Math.Clamp(this.targetHX - 4.5, W * 0.24, W * 0.76);
            this.targetPX = Phaser.Math.Clamp(this.targetPX - 5.5, W * 0.18, W * 0.82);
        } else if (goRight) {
            this.steerDir = 1;
            this.targetHX = Phaser.Math.Clamp(this.targetHX + 4.5, W * 0.24, W * 0.76);
            this.targetPX = Phaser.Math.Clamp(this.targetPX + 5.5, W * 0.18, W * 0.82);
        } else {
            this.steerDir = 0;
            this.targetHX = Phaser.Math.Linear(this.targetHX, W / 2, 0.05);
            this.targetPX = Phaser.Math.Linear(this.targetPX, W / 2, 0.04);
        }

        if (boost) {
            this.speed = Math.min(this.speed + 9 * dt, this.maxSpeed);
            this._soundBoostStart();
        } else {
            this._soundBoostStop();
            const base = 3 + Math.min(this.distance / 400, 6);
            this.speed = Phaser.Math.Linear(this.speed, base, 0.025);
        }

        this.horizonX = Phaser.Math.Linear(this.horizonX, this.targetHX, 0.08);
        this.playerX  = Phaser.Math.Linear(this.playerX,  this.targetPX, 0.12);
    }

    _updateWorld(dt) {
        const shift    = this.horizonX - this.W / 2;
        const distFrac = (this.distance * (this.speed / this.maxSpeed) * 14) % 1;
        this._drawSky(shift * 0.38);
        this._drawRoad(shift * 0.52, distFrac);
        this.distance += this.speed * dt * 8;

        this.obstacleTick += dt;
        const interval = Math.max(1.4 - this.distance / 1800, 0.38);
        if (this.obstacleTick >= interval) { this.obstacleTick = 0; this._spawnObstacle(); }

        this.coinTick += dt;
        if (this.coinTick >= 1.6) { this.coinTick = 0; this._spawnCoin(); }

        this.heartTick += dt;
        if (this.heartTick >= 14 && this.lives < 3) { this.heartTick = 0; this._spawnHeart(); }

        this.treeTick += dt;
        if (this.treeTick >= 0.65) { this.treeTick = 0; this._spawnTree(false); }

        this.cloudTick += dt;
        if (this.cloudTick >= 3.5) { this.cloudTick = 0; this._spawnCloud(false); }

        this.buildTick += dt;
        if (this.buildTick >= 2.2) { this.buildTick = 0; this._spawnBuilding(false); }
    }

    _updateObstacles(dt) {
        const { W, H } = this;
        const hy   = H * 0.38;
        const spd  = this.speed * dt * 0.55;
        const shift = this.horizonX - W / 2;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const ob = this.obstacles[i];
            if (!ob.active) { this.obstacles.splice(i, 1); continue; }
            ob.depth = Math.min(ob.depth + spd, 1.0);
            ob.y     = hy + (H - hy) * ob.depth;
            ob.x    += shift * 0.008;
            const s  = 0.08 + ob.depth * 1.15;
            ob.gfx.setDepth(5 + ob.depth * 5);
            this._drawObstacle(ob.gfx, ob.x, ob.y, s, ob.type);

            if (ob.depth >= 0.98) { ob.gfx.destroy(); ob.active = false; continue; }
            if (ob.depth > 0.8 && ob.depth < 0.98) {
                const hw = 42 * s, hh = 28 * s;
                if (Math.abs(this.playerX - ob.x) < hw && Math.abs(H - 88 - ob.y) < hh + 28) {
                    ob.gfx.destroy(); ob.active = false; this._hitObstacle();
                }
            }
        }
    }

    _updateCoins(dt) {
        const { W, H } = this;
        const hy    = H * 0.38;
        const spd   = this.speed * dt * 0.55;
        const shift = this.horizonX - W / 2;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const c = this.coins[i];
            if (!c.active) { this.coins.splice(i, 1); continue; }
            c.depth = Math.min(c.depth + spd, 1.0);
            c.bob   = (c.bob || 0) + dt * 3;
            c.y     = hy + (H - hy) * c.depth;
            c.x    += shift * 0.008;
            const r = (0.28 + c.depth * 1.2) * 13;
            const bobY = c.y + Math.sin(c.bob) * 3 * c.depth;
            c.gfx.setDepth(4 + c.depth * 3);
            this._drawCoin(c.gfx, c.x, bobY, r);

            if (c.depth >= 0.98) { c.gfx.destroy(); c.active = false; continue; }
            if (c.depth > 0.76) {
                if (Math.abs(this.playerX - c.x) < r * 1.5 && Math.abs(H - 88 - c.y) < r + 22) {
                    c.gfx.destroy(); c.active = false;
                    this.score += 10;
                    this._soundCoin();
                    this._coinBurst(c.x, c.y);
                }
            }
        }
    }

    _updateHearts(dt) {
        const { W, H } = this;
        const hy    = H * 0.38;
        const spd   = this.speed * dt * 0.55;
        const shift = this.horizonX - W / 2;

        for (let i = this.hearts.length - 1; i >= 0; i--) {
            const h = this.hearts[i];
            if (!h.active) { this.hearts.splice(i, 1); continue; }
            h.depth = Math.min(h.depth + spd, 1.0);
            h.y     = hy + (H - hy) * h.depth;
            h.x    += shift * 0.008;
            const s = 0.08 + h.depth * 1.15;
            h.gfx.setDepth(6 + h.depth * 4);
            this._drawHeart(h.gfx, h.x, h.y, s);

            if (h.depth >= 0.98) { h.gfx.destroy(); h.active = false; continue; }
            if (h.depth > 0.78) {
                const hitR = 28 * s;
                if (Math.abs(this.playerX - h.x) < hitR && Math.abs(H - 88 - h.y) < hitR + 20) {
                    h.gfx.destroy(); h.active = false;
                    if (this.lives < 3) {
                        this.lives++;
                        this._soundHeart();
                        this._heartBurst(h.x, h.y);
                    }
                }
            }
        }
    }

    _updateScenery(dt) {
        const { W, H } = this;
        const hy    = H * 0.38;
        const spd   = this.speed * dt;
        const shift = this.horizonX - W / 2;

        for (let i = this.trees.length - 1; i >= 0; i--) {
            const tr = this.trees[i];
            tr.depth = Math.min(tr.depth + spd * 0.48 * tr.speed, 1.0);
            tr.y     = hy + (H - hy) * tr.depth;
            tr.x    += shift * 0.011 * tr.side;
            const sc = 0.28 + tr.depth * 1.5;
            tr.gfx.setDepth(2 + tr.depth * 3);
            this._drawTreeType(tr.gfx, tr.x, tr.y, sc, tr.depth, tr.seg);
            if (tr.depth >= 0.99) { tr.gfx.destroy(); this.trees.splice(i, 1); }
        }
        while (this.trees.length < 9) this._spawnTree(false);

        for (let i = this.clouds.length - 1; i >= 0; i--) {
            const c = this.clouds[i];
            c.gfx.x += c.speed;
            if (c.gfx.x > W + 240) { c.gfx.destroy(); this.clouds.splice(i, 1); }
        }
        while (this.clouds.length < 5) this._spawnCloud(false);

        for (let i = this.buildings.length - 1; i >= 0; i--) {
            const b = this.buildings[i];
            b.depth = Math.min(b.depth + spd * 0.38 * b.speed, 1.0);
            b.y     = hy + (H - hy) * b.depth;
            b.x    += shift * 0.009 * b.side;
            const sc = 0.25 + b.depth * 1.2;
            b.gfx.setDepth(1.5 + b.depth * 2);
            this._drawBuilding(b.gfx, b.x, b.y, b.bw * sc / 0.25, b.bh * sc / 0.25, b.color);
            if (b.depth >= 0.99) { b.gfx.destroy(); this.buildings.splice(i, 1); }
        }
    }

    _updatePlayer(dt) {
        const { H } = this;
        this.bikeSprite.x = this.playerX + this.jitterX;

        this.stopTick += dt;
        if (this.stopTick >= 0.083) {
            this.stopTick = 0;
            this.stopFrame++;
            this.jitterX = (Math.random() - 0.5) * 2.5;
            this.jitterY = (Math.random() - 0.5) * 2.0;
        }

        const bob = this.jitterY * 0.8;
        const baseY = H - 85;

        if (this.steerDir === -1) {
            this.bikeSprite.setTexture('bike_lado').setFlipX(true).setScale(0.38);
        } else if (this.steerDir === 1) {
            this.bikeSprite.setTexture('bike_lado').setFlipX(false).setScale(0.38);
        } else {
            this.bikeSprite.setTexture('bike_costas').setFlipX(false).setScale(0.38);
        }

        this.bikeSprite.y = baseY + bob;
        this.bikeSprite.setAngle(this.steerDir * 4.8 + this.jitterX * 0.3);
        this._drawShadow(this.playerX);
    }

    _updateHUD(dt) {
        this.scoreText.setText('Pontos: ' + this.score);
        const dist = Math.floor(this.distance);
        this.distText.setText(`Meta: ${dist} / ${this.goalDist}m`);
        const segNames = ['🏙️ Cidade', '🌲 Floresta', '💧 Cachoeira'];
        this.segText.setText(segNames[this._segment()]);
        this._drawLives();
        this._drawSpeedBar();
        this._drawProgressBar();

        if (this.shakeTimer > 0) {
            this.cameras.main.x = (Math.random() - 0.5) * 9;
            this.cameras.main.y = (Math.random() - 0.5) * 9;
            this.shakeTimer -= dt;
        } else {
            this.cameras.main.x = 0;
            this.cameras.main.y = 0;
        }
    }

    _checkSegmentChange() {
        const newSeg = this._segment();
        if (newSeg !== this._lastSeg) {
            this._lastSeg = newSeg;
            this._showSegmentBanner(newSeg);
            this._drawSun();
        }
    }

    _showSegmentBanner(seg) {
        const { W, H } = this;
        const names = ['🏙️ Cidade Viva', '🌲 Floresta Mágica', '💧 Cachoeira Cristal'];
        const colors = [0x1565c0, 0x2e7d32, 0x0277bd];
        const bg = this.add.graphics().setDepth(35);
        bg.fillStyle(colors[seg], 0.85); bg.fillRoundedRect(W/2 - 200, H/2 - 32, 400, 64, 18);
        bg.lineStyle(2, 0xffffff, 0.5); bg.strokeRoundedRect(W/2 - 200, H/2 - 32, 400, 64, 18);
        const t = this.add.text(W/2, H/2, names[seg], { fontSize: '26px', fill: '#fff', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setDepth(36);
        this.tweens.add({ targets: [bg, t], alpha: 0, delay: 1200, duration: 600, onComplete: () => { bg.destroy(); t.destroy(); } });
    }

    _coinBurst(x, y) {
        for (let i = 0; i < 7; i++) {
            const p = this.add.graphics().setDepth(15);
            p.fillStyle(0xffd700, 1); p.fillCircle(x, y, 5);
            const angle = (i / 7) * Math.PI * 2;
            this.tweens.add({ targets: p, x: p.x + Math.cos(angle) * (32 + Math.random() * 24), y: p.y + Math.sin(angle) * (32 + Math.random() * 24), alpha: 0, scaleX: 0.2, scaleY: 0.2, duration: 380, ease: 'Power2', onComplete: () => p.destroy() });
        }
        const t = this.add.text(x, y - 20, '+10', { fontSize: '22px', fill: '#ffd700', stroke: '#000', strokeThickness: 3, fontStyle: 'bold' }).setOrigin(0.5).setDepth(20);
        this.tweens.add({ targets: t, y: y - 65, alpha: 0, duration: 700, onComplete: () => t.destroy() });
    }

    _heartBurst(x, y) {
        const t = this.add.text(x, y - 20, '❤️ +1 vida!', { fontSize: '20px', fill: '#ff3b3b', stroke: '#000', strokeThickness: 3, fontStyle: 'bold' }).setOrigin(0.5).setDepth(20);
        this.tweens.add({ targets: t, y: y - 70, alpha: 0, duration: 900, onComplete: () => t.destroy() });
    }

    _hitObstacle() {
        if (this.lives <= 0) return;
        this.lives--;
        this.speed = Math.max(this.speed * 0.38, 1.5);
        this.shakeTimer = 0.4;
        this._drawLives();
        this._soundHit();
        const { W, H } = this;
        const flash = this.add.graphics().setDepth(30);
        flash.fillStyle(0xff0000, 0.32); flash.fillRect(0, 0, W, H);
        this.tweens.add({ targets: flash, alpha: 0, duration: 380, onComplete: () => flash.destroy() });
        const boom = this.add.text(W/2, H/2 - 40, '💥 Bateu!', { fontSize: '34px', fill: '#ff4444', stroke: '#000', strokeThickness: 5, fontStyle: 'bold' }).setOrigin(0.5).setDepth(31);
        this.tweens.add({ targets: boom, y: H/2 - 95, alpha: 0, duration: 900, onComplete: () => boom.destroy() });
        if (this.lives <= 0) this.time.delayedCall(500, () => this._showGameOver());
    }

    _checkWin() {
        if (this.distance >= this.goalDist) { this.win = true; this._showWin(); }
    }

    _showGameOver() {
        this.gameOver = true;
        this._soundGameOver();
        this._stopBgAudio();
        BicicletaRecords.update(this.score, Math.floor(this.distance), 0);
        const { W, H } = this;
        const rec = BicicletaRecords.load();
        const ov = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.7); ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x1a0000, 0.98); ov.fillRoundedRect(W/2 - 250, H/2 - 165, 500, 330, 22);
        ov.lineStyle(3, 0xff4444, 1); ov.strokeRoundedRect(W/2 - 250, H/2 - 165, 500, 330, 22);
        this.add.text(W/2, H/2 - 120, '💥 GAME OVER', { fontSize: '40px', fill: '#ff4444', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2 - 55, `Pontos: ${this.score}`, { fontSize: '26px', fill: '#ffd700', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2, `Distância: ${Math.floor(this.distance)}m`, { fontSize: '18px', fill: '#aaa', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        const isNewBest = rec.lastWasNew ? '🆕 Novo recorde!' : `🏆 Recorde: ${rec.bestScore} pts`;
        this.add.text(W/2, H/2 + 38, isNewBest, { fontSize: '15px', fill: '#ffe082', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this._addBtn(W/2 - 118, H/2 + 100, 'Tentar Novamente', 0x1565c0, () => this.scene.restart());
        this._addBtn(W/2 + 118, H/2 + 100, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _showWin() {
        this._soundWin();
        this._stopBgAudio();
        const stars = this.score >= 250 ? 3 : this.score >= 130 ? 2 : 1;
        BicicletaRecords.update(this.score, Math.floor(this.distance), stars);
        const { W, H } = this;
        const rec = BicicletaRecords.load();
        const ov = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.62); ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x001a00, 0.98); ov.fillRoundedRect(W/2 - 270, H/2 - 180, 540, 360, 22);
        ov.lineStyle(3, 0xffd700, 1); ov.strokeRoundedRect(W/2 - 270, H/2 - 180, 540, 360, 22);
        const title = this.add.text(W/2, H/2 - 136, '🏁 FIM DA PISTA!', { fontSize: '38px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(41);
        this.tweens.add({ targets: title, scaleX: 1.05, scaleY: 1.05, yoyo: true, repeat: -1, duration: 650 });
        this.add.text(W/2, H/2 - 70, `🪙 Pontos: ${this.score}`, { fontSize: '28px', fill: '#ffd700', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(41);
        const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
        this.add.text(W/2, H/2 - 20, starStr, { fontSize: '36px' }).setOrigin(0.5).setDepth(41);
        const isNew = rec.lastWasNew ? '🆕 Novo recorde!' : `🏆 Recorde: ${rec.bestScore} pts`;
        this.add.text(W/2, H/2 + 30, isNew, { fontSize: '16px', fill: '#ffe082', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2 + 60, `Jogos: ${rec.gamesPlayed}  |  Vitórias: ${rec.wins}`, { fontSize: '14px', fill: '#ffffffaa', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this._addBtn(W/2 - 126, H/2 + 126, 'Jogar de Novo', 0x2e7d32, () => this.scene.restart());
        this._addBtn(W/2 + 126, H/2 + 126, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _addBtn(x, y, label, color, cb) {
        const bg = this.add.graphics().setDepth(42);
        bg.fillStyle(color, 1); bg.fillRoundedRect(x - 112, y - 22, 224, 44, 12);
        bg.lineStyle(2, 0xffffff, 0.3); bg.strokeRoundedRect(x - 112, y - 22, 224, 44, 12);
        const txt = this.add.text(x, y, label, { fontSize: '17px', fill: '#fff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 })
            .setOrigin(0.5).setDepth(43).setInteractive({ useHandCursor: true });
        txt.on('pointerover', () => txt.setScale(1.07));
        txt.on('pointerout',  () => txt.setScale(1));
        txt.on('pointerdown', cb);
    }

    _initAudio() {
        try {
            this._ac = new (window.AudioContext || window.webkitAudioContext)();
            if (this._ac.state === 'suspended') {
                const resume = () => { this._ac.resume(); this.input.off('pointerdown', resume); };
                this.input.on('pointerdown', resume);
            }
        } catch(e) { this._ac = null; return; }

        const ac = this._ac;
        this._masterGain = ac.createGain();
        this._masterGain.gain.value = 0.65;
        this._masterGain.connect(ac.destination);

        this._bgGain = ac.createGain();
        this._bgGain.gain.value = 1;
        this._bgGain.connect(this._masterGain);

        this._fxGain = ac.createGain();
        this._fxGain.gain.value = 1;
        this._fxGain.connect(this._masterGain);

        const sr = ac.sampleRate;
        const mkNoise = (len) => {
            const b = ac.createBuffer(1, len, sr);
            const d = b.getChannelData(0);
            for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
            return b;
        };

        this._windGain = ac.createGain(); this._windGain.gain.value = 0; this._windGain.connect(this._bgGain);
        const windBuf = mkNoise(sr * 2);
        this._windSrc = ac.createBufferSource(); this._windSrc.buffer = windBuf; this._windSrc.loop = true;
        const wf1 = ac.createBiquadFilter(); wf1.type = 'bandpass'; wf1.frequency.value = 620; wf1.Q.value = 0.75;
        const wf2 = ac.createBiquadFilter(); wf2.type = 'lowpass'; wf2.frequency.value = 1100;
        this._windSrc.connect(wf1); wf1.connect(wf2); wf2.connect(this._windGain);
        this._windSrc.start();

        this._wheelGain = ac.createGain(); this._wheelGain.gain.value = 0; this._wheelGain.connect(this._bgGain);
        const wheelBuf = mkNoise(sr * 2);
        this._wheelSrc = ac.createBufferSource(); this._wheelSrc.buffer = wheelBuf; this._wheelSrc.loop = true;
        const rf = ac.createBiquadFilter(); rf.type = 'highpass'; rf.frequency.value = 3200;
        this._wheelSrc.connect(rf); rf.connect(this._wheelGain);
        this._wheelSrc.start();

        this._startBgMusic();
    }

    _startBgMusic() {
        if (!this._ac) return;
        const ac = this._ac;
        this._musicGain = ac.createGain();
        this._musicGain.gain.value = 0.07;
        this._musicGain.connect(this._bgGain);

        const melody = [
            [523.25, 0.20], [587.33, 0.20], [659.25, 0.20], [783.99, 0.45],
            [659.25, 0.20], [587.33, 0.20], [523.25, 0.45],
            [440.00, 0.20], [493.88, 0.20], [523.25, 0.20], [659.25, 0.45],
            [587.33, 0.20], [523.25, 0.20], [493.88, 0.80],
        ];
        const bass = [
            [261.63, 0.45], [261.63, 0.45], [196.00, 0.45], [196.00, 0.45],
            [220.00, 0.45], [220.00, 0.45], [246.94, 0.80],
        ];

        const totalDur = melody.reduce((s, n) => s + n[1], 0);
        const scheduleMelody = (startT) => {
            if (!this._ac || !this._musicGain) return;
            let t = startT;
            melody.forEach(([freq, dur]) => {
                const osc = ac.createOscillator(); const g = ac.createGain();
                osc.type = 'triangle'; osc.frequency.value = freq;
                g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.6, t + 0.02);
                g.gain.linearRampToValueAtTime(0.25, t + dur * 0.55); g.gain.linearRampToValueAtTime(0, t + dur - 0.02);
                osc.connect(g); g.connect(this._musicGain); osc.start(t); osc.stop(t + dur);
                t += dur;
            });
            let tb = startT;
            bass.forEach(([freq, dur]) => {
                const osc = ac.createOscillator(); const g = ac.createGain();
                osc.type = 'sine'; osc.frequency.value = freq;
                g.gain.setValueAtTime(0, tb); g.gain.linearRampToValueAtTime(0.35, tb + 0.04);
                g.gain.linearRampToValueAtTime(0, tb + dur - 0.02);
                osc.connect(g); g.connect(this._musicGain); osc.start(tb); osc.stop(tb + dur);
                tb += dur * 2;
            });
            this._melodyTimer = this.time.delayedCall((totalDur + 0.2) * 1000, () => scheduleMelody(ac.currentTime));
        };
        scheduleMelody(ac.currentTime + 0.5);
    }

    _updateAudio() {
        if (!this._ac) return;
        const ratio = Math.min(this.speed / this.maxSpeed, 1);
        const t = this._ac.currentTime;
        this._windGain.gain.setTargetAtTime(0.03 + ratio * 0.24, t, 0.35);
        this._wheelGain.gain.setTargetAtTime(ratio * 0.09, t, 0.22);
        if (this._musicGain) {
            const vol = 0.055 + ratio * 0.055;
            this._musicGain.gain.setTargetAtTime(vol, t, 0.6);
        }
    }

    _soundBeep(isGo) {
        if (!this._ac) return;
        const ac = this._ac;
        const osc = ac.createOscillator(); const g = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = isGo ? 880 : 440;
        g.gain.setValueAtTime(0.4, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + (isGo ? 0.5 : 0.15));
        osc.connect(g); g.connect(this._fxGain); osc.start(); osc.stop(ac.currentTime + (isGo ? 0.55 : 0.18));
    }

    _soundCoin() {
        if (!this._ac) return;
        const ac = this._ac;
        let t = ac.currentTime;
        [1046.5, 1318.5, 1568].forEach(freq => {
            const osc = ac.createOscillator(); const g = ac.createGain();
            osc.type = 'sine'; osc.frequency.value = freq;
            g.gain.setValueAtTime(0.32, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
            osc.connect(g); g.connect(this._fxGain); osc.start(t); osc.stop(t + 0.18);
            t += 0.055;
        });
    }

    _soundHeart() {
        if (!this._ac) return;
        const ac = this._ac;
        let t = ac.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach(freq => {
            const osc = ac.createOscillator(); const g = ac.createGain();
            osc.type = 'sine'; osc.frequency.value = freq;
            g.gain.setValueAtTime(0.28, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
            osc.connect(g); g.connect(this._fxGain); osc.start(t); osc.stop(t + 0.2);
            t += 0.07;
        });
    }

    _soundHit() {
        if (!this._ac) return;
        const ac = this._ac;
        const sr = ac.sampleRate;
        const len = Math.floor(sr * 0.45);
        const buf = ac.createBuffer(1, len, sr);
        const d   = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.6);
        const src = ac.createBufferSource(); const filt = ac.createBiquadFilter(); const g = ac.createGain();
        filt.type = 'lowpass'; filt.frequency.value = 380;
        g.gain.setValueAtTime(0.75, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.42);
        src.buffer = buf; src.connect(filt); filt.connect(g); g.connect(this._fxGain); src.start(); src.stop(ac.currentTime + 0.45);

        const osc = ac.createOscillator(); const og = ac.createGain();
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, ac.currentTime); osc.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.3);
        og.gain.setValueAtTime(0.38, ac.currentTime); og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
        osc.connect(og); og.connect(this._fxGain); osc.start(); osc.stop(ac.currentTime + 0.32);
    }

    _soundBoostStart() {
        if (!this._ac || this._boostOsc) return;
        const ac = this._ac;
        const osc = ac.createOscillator(); const g = ac.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(75, ac.currentTime); osc.frequency.linearRampToValueAtTime(155, ac.currentTime + 0.4);
        g.gain.setValueAtTime(0, ac.currentTime); g.gain.linearRampToValueAtTime(0.11, ac.currentTime + 0.1);
        osc.connect(g); g.connect(this._fxGain); osc.start();
        this._boostOsc = osc; this._boostGain = g;
    }

    _soundBoostStop() {
        if (!this._ac || !this._boostOsc) return;
        const t = this._ac.currentTime;
        this._boostGain.gain.setTargetAtTime(0, t, 0.1);
        try { this._boostOsc.stop(t + 0.25); } catch(e) {}
        this._boostOsc = null; this._boostGain = null;
    }

    _soundWin() {
        if (!this._ac) return;
        const ac = this._ac;
        const fanfare = [
            [523.25, 0.00, 0.13], [659.25, 0.13, 0.13], [783.99, 0.26, 0.13],
            [1046.5, 0.39, 0.52], [880.00, 0.58, 0.18], [1046.5, 0.78, 0.72],
            [1318.5, 0.85, 0.80],
        ];
        fanfare.forEach(([f, delay, dur]) => {
            const osc = ac.createOscillator(); const g = ac.createGain();
            osc.type = 'square'; osc.frequency.value = f;
            g.gain.setValueAtTime(0, ac.currentTime + delay);
            g.gain.linearRampToValueAtTime(0.28, ac.currentTime + delay + 0.02);
            g.gain.linearRampToValueAtTime(0, ac.currentTime + delay + dur);
            osc.connect(g); g.connect(this._fxGain); osc.start(ac.currentTime + delay); osc.stop(ac.currentTime + delay + dur + 0.04);
        });
    }

    _soundGameOver() {
        if (!this._ac) return;
        const ac = this._ac;
        [[440,0.00,0.25],[370,0.25,0.25],[311,0.50,0.25],[233,0.75,0.65]].forEach(([f,delay,dur]) => {
            const osc = ac.createOscillator(); const g = ac.createGain();
            osc.type = 'sawtooth'; osc.frequency.value = f;
            g.gain.setValueAtTime(0.28, ac.currentTime + delay); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + dur);
            osc.connect(g); g.connect(this._fxGain); osc.start(ac.currentTime + delay); osc.stop(ac.currentTime + delay + dur + 0.04);
        });
    }

    _stopBgAudio() {
        if (!this._ac) return;
        try {
            if (this._melodyTimer) { this._melodyTimer.remove(false); this._melodyTimer = null; }
            if (this._musicGain) { this._musicGain.gain.setTargetAtTime(0, this._ac.currentTime, 0.15); }
            if (this._windGain)  { this._windGain.gain.setTargetAtTime(0, this._ac.currentTime, 0.2); }
            if (this._wheelGain) { this._wheelGain.gain.setTargetAtTime(0, this._ac.currentTime, 0.2); }
            if (this._boostOsc)  { this._soundBoostStop(); }
        } catch(e) {}
    }

    shutdown() {
        this._stopBgAudio();
        try {
            if (this._windSrc)  { this._windSrc.stop();  this._windSrc  = null; }
            if (this._wheelSrc) { this._wheelSrc.stop(); this._wheelSrc = null; }
            setTimeout(() => { if (this._ac) { this._ac.close(); this._ac = null; } }, 400);
        } catch(e) {}
    }
}

const BicicletaRecords = {
    KEY: 'supermiguel_bike_records',
    load() {
        try {
            const d = JSON.parse(localStorage.getItem(this.KEY) || '{}');
            return { bestScore: d.bestScore || 0, bestDistance: d.bestDistance || 0, bestStars: d.bestStars || 0, gamesPlayed: d.gamesPlayed || 0, wins: d.wins || 0, lastWasNew: false };
        } catch(e) { return { bestScore: 0, bestDistance: 0, bestStars: 0, gamesPlayed: 0, wins: 0, lastWasNew: false }; }
    },
    update(score, distance, stars) {
        const d = this.load();
        d.gamesPlayed++;
        if (stars > 0) d.wins++;
        const isNew = score > d.bestScore || (score === d.bestScore && distance > d.bestDistance);
        if (score    > d.bestScore)    d.bestScore    = score;
        if (distance > d.bestDistance) d.bestDistance = distance;
        if (stars    > d.bestStars)    d.bestStars    = stars;
        d.lastWasNew = isNew;
        try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch(e) {}
        return d;
    },
    reset() { try { localStorage.removeItem(this.KEY); } catch(e) {} }
};
