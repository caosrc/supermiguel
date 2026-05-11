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
        this._initGifTexture();
        this._initRoadOverlay();
        this._initPlayer();
        this._initHUD();
        this._initControls();
        this._spawnInitialCoins();
        this._initAudio();
        this._startCountdown();
    }

    /* ── STATE ─────────────────────────────────────────────── */
    _initState() {
        this.speed        = 0;
        this.maxSpeed     = 13;
        this.score        = 0;
        this.lives        = 3;
        this.gameOver     = false;
        this.win          = false;
        this.started      = false;
        this.distance     = 0;
        this.goalDist     = 2000;
        this.shakeTimer   = 0;
        this.steerX       = 0;
        this.targetSteerX = 0;
        this.playerX      = this.W / 2;
        this.targetPX     = this.W / 2;
        this.steerDir     = 0;
        this.obstacles    = [];
        this.coins        = [];
        this.hearts       = [];
        this.obstacleTick = 0;
        this.coinTick     = 0;
        this.heartTick    = 0;
        this.stopTick     = 0;
        this.jitterX      = 0;
        this.jitterY      = 0;
        this._curSeg      = -1;
        this._boostOsc    = null;
        this._ac          = null;
        this._bgTex       = null;
        this._bgCtx       = null;
        this._gifElems    = [];
        this._gifLoaded   = [false, false, false];
    }

    _seg() {
        if (this.distance < 667)  return 0;
        if (this.distance < 1334) return 1;
        return 2;
    }

    /* ── GIF CANVAS TEXTURE ────────────────────────────────── */
    _initGifTexture() {
        const { W, H } = this;
        const KEY = '__bike_bg__';
        if (this.textures.exists(KEY)) this.textures.remove(KEY);

        this._bgTex    = this.textures.createCanvas(KEY, W, H);
        this._bgCanvas = this._bgTex.canvas;
        this._bgCtx    = this._bgTex.context;

        this._bgCtx.fillStyle = '#9c7a4a';
        this._bgCtx.fillRect(0, 0, W, H);
        this._bgTex.refresh();

        this._bgSprite = this.add.image(W / 2, H / 2, KEY).setDepth(0);

        this._gifElems = [1, 2, 3].map((n, i) => {
            const img = new Image();
            img.onload = () => { this._gifLoaded[i] = true; };
            img.onerror = () => { this._gifLoaded[i] = false; };
            img.src = `assets/pista_${n}.gif`;
            return img;
        });
    }

    _updateGifFrame() {
        const seg = this._seg();
        const img = this._gifElems[seg];
        if (!this._gifLoaded[seg] || !img || img.naturalWidth === 0) return;

        const { W, H } = this;
        const ctx = this._bgCtx;
        const nw  = img.naturalWidth;
        const nh  = img.naturalHeight;

        let sx = 0, sy = 0, sw = nw, sh = nh;
        const canvasAspect = W / H;
        const imgAspect    = nw / nh;

        if (imgAspect < canvasAspect) {
            sh = nw / canvasAspect;
            sy = nh * 0.12;
            if (sy + sh > nh) sy = nh - sh;
        } else {
            sw = nh * canvasAspect;
            sx = (nw - sw) / 2;
        }

        const panRatio = this.steerX / (W * 0.30);
        const panOff   = panRatio * sw * 0.038;
        sx = Math.max(0, Math.min(sx + panOff, nw - sw));

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

        const stopBoost  = this.speed / this.maxSpeed;
        if (stopBoost > 0.7) {
            ctx.fillStyle = `rgba(255,255,255,${(stopBoost - 0.7) * 0.10})`;
            ctx.fillRect(0, 0, W, H);
        }

        this._bgTex.refresh();
    }

    /* ── ROAD OVERLAY ──────────────────────────────────────── */
    _initRoadOverlay() {
        this.roadGfx = this.add.graphics().setDepth(2);
    }

    _drawRoadOverlay() {
        const { W, H } = this;
        const g   = this.roadGfx;
        g.clear();

        const hy  = H * 0.42;
        const hx  = W / 2 + this.steerX * 0.28;

        g.lineStyle(2, 0x000000, 0.14);
        g.beginPath(); g.moveTo(hx - 36, hy); g.lineTo(W * 0.10, H); g.strokePath();
        g.beginPath(); g.moveTo(hx + 36, hy); g.lineTo(W * 0.90, H); g.strokePath();

        const distFrac = (this.distance * 0.014) % 1;
        for (let i = 0; i < 10; i++) {
            const t = ((i / 10) + distFrac) % 1;
            if (t < 0.3) continue;
            const lt = (t - 0.3) / 0.70;
            const cy = hy + (H - hy) * lt;
            const cx = W / 2 + (hx - W / 2) * (1 - lt);
            const mh = 5 + 24 * lt;
            const mw = 2 + 9  * lt;
            g.fillStyle(0xffffff, 0.50 * lt);
            g.fillRect(cx - mw / 2, cy - mh / 2, mw, mh);
        }

        g.fillStyle(0x000000, 0.18);
        g.fillRect(0, H - 16, W, 16);
    }

    /* ── PLAYER ────────────────────────────────────────────── */
    _initPlayer() {
        const { W, H } = this;
        this.playerX     = W / 2;
        this.targetPX    = W / 2;
        this.shadowGfx   = this.add.graphics().setDepth(8);
        this.bikeSprite  = this.add.image(W / 2, H - 70, 'bike_costas')
            .setScale(0.44).setDepth(10).setOrigin(0.5, 1);
    }

    _drawShadow(x) {
        const { H } = this;
        this.shadowGfx.clear();
        this.shadowGfx.fillStyle(0x000000, 0.24);
        this.shadowGfx.fillEllipse(x, H - 12, 95, 20);
    }

    /* ── HUD ───────────────────────────────────────────────── */
    _initHUD() {
        const { W, H } = this;

        const tx = (x, y, txt, size, color, origin, depth) =>
            this.add.text(x, y, txt, {
                fontSize: size, fill: color,
                stroke: '#000', strokeThickness: 5,
                fontStyle: 'bold', fontFamily: 'Arial'
            }).setOrigin(...(origin || [0, 0])).setDepth(depth || 25);

        this.scoreText = tx(16, 10, 'Pontos: 0', '19px', '#ffffff');
        this.distText  = tx(W / 2, 10, '', '15px', '#ffe082', [0.5, 0]);
        this.segText   = tx(W / 2, 32, '', '12px', '#ffffffcc', [0.5, 0]);
        this.livesGfx  = this.add.graphics().setDepth(25);
        this.speedGfx  = this.add.graphics().setDepth(25);
        this.barGfx    = this.add.graphics().setDepth(25);

        this._drawLives();
        this._drawSpeedBar();
        this._drawProgressBar();

        tx(W / 2, H - 12, '← → Virar  |  ESPAÇO Acelerar  |  ESC Menu', '11px', '#ffffffaa', [0.5, 1], 25);
    }

    _drawLives() {
        const { W } = this;
        const g = this.livesGfx;
        g.clear();
        for (let i = 0; i < 3; i++) {
            const hx = W - 26 - i * 30, hy = 22;
            g.fillStyle(i < this.lives ? 0xff3333 : 0x555555, 1);
            g.fillTriangle(hx - 9, hy, hx + 9, hy, hx, hy + 11);
            g.fillCircle(hx - 5, hy - 5, 6);
            g.fillCircle(hx + 5, hy - 5, 6);
        }
    }

    _drawSpeedBar() {
        const { H } = this;
        const g  = this.speedGfx;
        g.clear();
        const bx = 13, by = H - 118, bh = 90, bw = 12;
        g.fillStyle(0x000000, 0.55); g.fillRoundedRect(bx - 2, by - 2, bw + 4, bh + 4, 5);
        g.fillStyle(0x222222, 1);    g.fillRoundedRect(bx, by, bw, bh, 4);
        const ratio  = Math.min(this.speed / this.maxSpeed, 1);
        const filled = bh * ratio;
        if (filled > 0) {
            const c = ratio < 0.4 ? 0x4caf50 : ratio < 0.75 ? 0xffc107 : 0xff5722;
            g.fillStyle(c, 1); g.fillRoundedRect(bx, by + bh - filled, bw, filled, 3);
            g.fillStyle(0xffffff, 0.28); g.fillRect(bx + 1, by + bh - filled, 4, filled * 0.4);
        }
    }

    _drawProgressBar() {
        const { W, H } = this;
        const g = this.barGfx;
        g.clear();
        const bx = 55, by = H - 24, bw = W - 110, bh = 10;
        g.fillStyle(0x000000, 0.55); g.fillRoundedRect(bx - 1, by - 1, bw + 2, bh + 2, 5);
        g.fillStyle(0x333333, 1);    g.fillRoundedRect(bx, by, bw, bh, 4);
        [0x1565c0, 0x2e7d32, 0x0277bd].forEach((c, i) => {
            g.fillStyle(c, 0.45); g.fillRect(bx + i * bw / 3, by, bw / 3 - 1, bh);
        });
        const ratio = Math.min(this.distance / this.goalDist, 1);
        if (ratio > 0) {
            g.fillStyle(0xffd700, 1); g.fillRoundedRect(bx, by, bw * ratio, bh, 4);
            g.fillStyle(0xffffff, 0.40); g.fillRect(bx, by + 1, bw * ratio, 3);
        }
        g.fillStyle(0xff4444, 1);
        g.fillTriangle(bx + bw * ratio - 5, by - 6, bx + bw * ratio + 5, by - 6, bx + bw * ratio, by + 1);
    }

    /* ── CONTROLS ──────────────────────────────────────────── */
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
        this._tL = false; this._tR = false; this._tB = false;
        const lz = this.add.zone(W * 0.22, H - 42, W * 0.44, 72).setInteractive().setDepth(30);
        const rz = this.add.zone(W * 0.66, H - 42, W * 0.30, 72).setInteractive().setDepth(30);
        const bz = this.add.zone(W * 0.93, H - 42, W * 0.14, 72).setInteractive().setDepth(30);
        lz.on('pointerdown', () => this._tL = true).on('pointerup',  () => this._tL = false).on('pointerout', () => this._tL = false);
        rz.on('pointerdown', () => this._tR = true).on('pointerup',  () => this._tR = false).on('pointerout', () => this._tR = false);
        bz.on('pointerdown', () => this._tB = true).on('pointerup',  () => this._tB = false).on('pointerout', () => this._tB = false);
    }

    _spawnInitialCoins() {
        for (let i = 0; i < 4; i++) this._spawnCoin(0.18 + i * 0.18);
    }

    /* ── COUNTDOWN ─────────────────────────────────────────── */
    _startCountdown() {
        const { W, H } = this;
        this.started = false;

        const panel = this.add.graphics().setDepth(50);
        panel.fillStyle(0x000000, 0.60);
        panel.fillRoundedRect(W / 2 - 280, H / 2 - 160, 560, 320, 20);
        panel.lineStyle(2, 0xffd700, 0.7);
        panel.strokeRoundedRect(W / 2 - 280, H / 2 - 160, 560, 320, 20);

        const mk = (x, y, txt, size, color) =>
            this.add.text(x, y, txt, { fontSize: size, fill: color, stroke: '#000', strokeThickness: 5, fontStyle: 'bold' }).setOrigin(0.5).setDepth(51);

        mk(W / 2, H / 2 - 120, '🚲 Fase da Bicicleta', '26px', '#ffd700');
        mk(W / 2, H / 2 - 76,  '🏙️ Cidade  →  🌲 Floresta  →  💧 Cachoeira', '14px', '#fff');

        const rec = BicicletaRecords.load();
        if (rec.bestScore > 0) {
            mk(W / 2, H / 2 - 42, `🏆 Recorde: ${rec.bestScore} pts — ${rec.bestDistance}m  ${'⭐'.repeat(rec.bestStars || 1)}`, '14px', '#ffe082');
        }
        mk(W / 2, H / 2 - 6, `Jogos: ${rec.gamesPlayed}   Vitórias: ${rec.wins}`, '13px', '#aaaaaa');

        const cTxt = this.add.text(W / 2, H / 2 + 68, '3', {
            fontSize: '112px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 10
        }).setOrigin(0.5).setDepth(52);

        let n = 3;
        const tick = () => {
            this._soundBeep(n === 0);
            if (n <= 0) {
                cTxt.setText('VAI! 🚀'); cTxt.setStyle({ fontSize: '52px', fill: '#00ff88' });
                this.tweens.add({ targets: [panel, cTxt], alpha: 0, delay: 500, duration: 500,
                    onComplete: () => { panel.destroy(); cTxt.destroy(); } });
                this.started = true; this.speed = 3;
                return;
            }
            cTxt.setText(String(n)); cTxt.setScale(1.3);
            this.tweens.add({ targets: cTxt, scaleX: 0.85, scaleY: 0.85, duration: 850, ease: 'Power2' });
            n--;
            this.time.delayedCall(1000, tick);
        };
        this.time.delayedCall(500, tick);
    }

    /* ── UPDATE LOOP ───────────────────────────────────────── */
    update(time, delta) {
        if (this.gameOver || this.win) return;
        const dt = delta / 1000;

        if (this.keys.esc.isDown) {
            this._stopBgAudio();
            this.scene.start('MenuScene');
            return;
        }
        if (!this.started) {
            this._updateGifFrame();
            return;
        }

        this._handleInput(dt);
        this._updateGifFrame();
        this._drawRoadOverlay();
        this._updateObstacles(dt);
        this._updateCoins(dt);
        this._updateHearts(dt);
        this._updatePlayer(dt);
        this._updateHUD();
        this._updateAudio();
        this._checkSegment();
        this._checkWin();
    }

    /* ── INPUT ─────────────────────────────────────────────── */
    _handleInput(dt) {
        const { W } = this;
        const goL   = this.keys.left.isDown  || this.keys.a.isDown || this._tL;
        const goR   = this.keys.right.isDown || this.keys.d.isDown || this._tR;
        const boost = this.keys.space.isDown || this._tB;
        const maxSt = W * 0.28;

        if (goL) {
            this.steerDir     = -1;
            this.targetSteerX = Math.max(this.targetSteerX - 5, -maxSt);
            this.targetPX     = Phaser.Math.Clamp(this.targetPX - 5.5, W * 0.18, W * 0.82);
        } else if (goR) {
            this.steerDir     = 1;
            this.targetSteerX = Math.min(this.targetSteerX + 5, maxSt);
            this.targetPX     = Phaser.Math.Clamp(this.targetPX + 5.5, W * 0.18, W * 0.82);
        } else {
            this.steerDir     = 0;
            this.targetSteerX = Phaser.Math.Linear(this.targetSteerX, 0, 0.065);
            this.targetPX     = Phaser.Math.Linear(this.targetPX, W / 2, 0.042);
        }

        this.steerX  = Phaser.Math.Linear(this.steerX,  this.targetSteerX, 0.09);
        this.playerX = Phaser.Math.Linear(this.playerX, this.targetPX, 0.13);

        if (boost) {
            this.speed = Math.min(this.speed + 9 * dt, this.maxSpeed);
            this._soundBoostStart();
        } else {
            this._soundBoostStop();
            const base = 3 + Math.min(this.distance / 350, 6);
            this.speed = Phaser.Math.Linear(this.speed, base, 0.028);
        }

        this.distance += this.speed * dt * 8;

        this.obstacleTick += dt;
        const interval = Math.max(1.4 - this.distance / 1600, 0.35);
        if (this.obstacleTick >= interval) { this.obstacleTick = 0; this._spawnObstacle(); }

        this.coinTick += dt;
        if (this.coinTick >= 1.6) { this.coinTick = 0; this._spawnCoin(); }

        this.heartTick += dt;
        if (this.heartTick >= 16 && this.lives < 3) { this.heartTick = 0; this._spawnHeart(); }
    }

    /* ── SEGMENT ───────────────────────────────────────────── */
    _checkSegment() {
        const s = this._seg();
        if (s !== this._curSeg) {
            this._curSeg = s;
            if (s > 0) this._showSegBanner(s);
        }
    }

    _showSegBanner(s) {
        const { W, H } = this;
        const names  = ['', '🌲 Floresta Mágica', '💧 Cachoeira Cristal'];
        const colors = [0, 0x1b5e20, 0x01579b];
        const bg = this.add.graphics().setDepth(38);
        bg.fillStyle(colors[s], 0.88); bg.fillRoundedRect(W / 2 - 200, H / 2 - 30, 400, 60, 18);
        bg.lineStyle(2, 0xffffff, 0.5); bg.strokeRoundedRect(W / 2 - 200, H / 2 - 30, 400, 60, 18);
        const t = this.add.text(W / 2, H / 2, names[s], {
            fontSize: '24px', fill: '#fff', fontStyle: 'bold', stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setDepth(39);
        this.tweens.add({ targets: [bg, t], alpha: 0, delay: 1400, duration: 700, onComplete: () => { bg.destroy(); t.destroy(); } });
    }

    /* ── OBSTACLES ─────────────────────────────────────────── */
    _spawnObstacle() {
        const { W, H } = this;
        const hy    = H * 0.44;
        const seg   = this._seg();
        const pool  = [['cone','barrel','rock','puddle'],['log','rock','puddle','bush'],['rock','barrel','puddle','log']];
        const type  = pool[seg][Math.floor(Math.random() * 4)];
        const lanes = [-95, -32, 32, 95];
        const laneX = W / 2 + lanes[Math.floor(Math.random() * 4)];
        const g = this.add.graphics().setDepth(5);
        this._drawObstacle(g, laneX, hy, 0.07, type);
        this.obstacles.push({ gfx: g, x: laneX, y: hy, depth: 0.02, type, active: true });
    }

    _drawObstacle(g, x, y, s, type) {
        g.clear();
        const shadow = () => { g.fillStyle(0x000000, 0.28); g.fillEllipse(x, y + 2*s, 42*s, 12*s); };
        if (type === 'barrel') {
            shadow();
            g.fillStyle(0xb71c1c, 1); g.fillRect(x-14*s, y-24*s, 28*s, 24*s);
            g.fillStyle(0xd32f2f, 1); g.fillRect(x-12*s, y-24*s, 8*s, 24*s);
            g.fillStyle(0xffcc02, 1);
            g.fillRect(x-14*s, y-26*s, 28*s, 5*s);
            g.fillRect(x-14*s, y-14*s, 28*s, 4*s);
            g.fillRect(x-14*s, y-2*s, 28*s, 3*s);
        } else if (type === 'cone') {
            shadow();
            g.fillStyle(0xff6f00, 1); g.fillTriangle(x, y-34*s, x-15*s, y, x+15*s, y);
            g.fillStyle(0xffa000, 1); g.fillTriangle(x, y-34*s, x-4*s, y-18*s, x+4*s, y-18*s);
            g.fillStyle(0xffffff, 1); g.fillRect(x-15*s, y-15*s, 30*s, 5*s);
            g.fillRect(x-8*s, y-3*s, 16*s, 4*s);
        } else if (type === 'rock') {
            shadow();
            g.fillStyle(0x546e7a, 1); g.fillEllipse(x, y-14*s, 42*s, 30*s);
            g.fillStyle(0x78909c, 1); g.fillEllipse(x-6*s, y-20*s, 22*s, 16*s);
            g.fillStyle(0x90a4ae, 0.7); g.fillCircle(x-10*s, y-21*s, 5*s);
        } else if (type === 'puddle') {
            g.fillStyle(0x1976d2, 0.52); g.fillEllipse(x, y-4*s, 66*s, 22*s);
            g.fillStyle(0x64b5f6, 0.38); g.fillEllipse(x-14*s, y-7*s, 28*s, 12*s);
            g.fillStyle(0xbbdefb, 0.22); g.fillEllipse(x+9*s, y-8*s, 16*s, 7*s);
        } else if (type === 'log') {
            shadow();
            g.fillStyle(0x5d4037, 1); g.fillEllipse(x, y-10*s, 58*s, 22*s);
            g.fillStyle(0x8d6e63, 1); g.fillEllipse(x-28*s, y-10*s, 18*s, 22*s);
            g.fillEllipse(x+28*s, y-10*s, 18*s, 22*s);
            g.fillStyle(0x4e342e, 0.45); g.fillRect(x-28*s, y-16*s, 56*s, 5*s);
        } else if (type === 'bush') {
            shadow();
            g.fillStyle(0x33691e, 1); g.fillCircle(x, y-18*s, 20*s);
            g.fillStyle(0x558b2f, 1); g.fillCircle(x-16*s, y-13*s, 16*s);
            g.fillCircle(x+16*s, y-13*s, 15*s);
            g.fillStyle(0x7cb342, 1); g.fillCircle(x, y-29*s, 13*s);
        }
    }

    _updateObstacles(dt) {
        const { W, H } = this;
        const hy  = H * 0.44;
        const spd = this.speed * dt * 0.52;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const ob = this.obstacles[i];
            if (!ob.active) { this.obstacles.splice(i, 1); continue; }
            ob.depth = Math.min(ob.depth + spd, 1.0);
            ob.y     = hy + (H - hy) * ob.depth;
            ob.x    += this.steerX * 0.009;
            const s  = 0.07 + ob.depth * 1.15;
            ob.gfx.setDepth(5 + ob.depth * 5);
            this._drawObstacle(ob.gfx, ob.x, ob.y, s, ob.type);
            if (ob.depth >= 0.98) { ob.gfx.destroy(); ob.active = false; continue; }
            if (ob.depth > 0.79) {
                const hw = 40 * s, hh = 26 * s;
                if (Math.abs(this.playerX - ob.x) < hw && Math.abs((H - 70) - ob.y) < hh + 32) {
                    ob.gfx.destroy(); ob.active = false; this._hitObstacle();
                }
            }
        }
    }

    /* ── COINS ─────────────────────────────────────────────── */
    _spawnCoin(initDepth) {
        const { W, H } = this;
        const hy    = H * 0.44;
        const depth = initDepth !== undefined ? initDepth : 0.02;
        const lanes = [-75, -25, 25, 75];
        const x     = W / 2 + lanes[Math.floor(Math.random() * 4)];
        const y     = hy + (H - hy) * depth;
        const g     = this.add.graphics().setDepth(4 + depth * 3);
        this._drawCoin(g, x, y, (0.26 + depth * 1.1) * 13);
        this.coins.push({ gfx: g, x, y, depth, active: true, bob: Math.random() * Math.PI * 2 });
    }

    _drawCoin(g, x, y, r) {
        g.clear();
        g.fillStyle(0x000000, 0.20); g.fillEllipse(x + r*0.2, y + r*0.3, r*1.5, r*0.5);
        g.fillStyle(0xffd700, 1);    g.fillCircle(x, y, r);
        g.fillStyle(0xffee58, 1);    g.fillCircle(x - r*0.28, y - r*0.28, r*0.42);
        g.lineStyle(2, 0xf9a825, 1); g.strokeCircle(x, y, r);
        g.fillStyle(0xffa000, 1);    g.fillCircle(x, y, r*0.42);
        g.fillStyle(0xffd700, 1);    g.fillCircle(x, y, r*0.28);
        g.fillStyle(0xfff9c4, 0.7);  g.fillCircle(x - r*0.2, y - r*0.2, r*0.18);
    }

    _updateCoins(dt) {
        const { W, H } = this;
        const hy  = H * 0.44;
        const spd = this.speed * dt * 0.52;

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const c = this.coins[i];
            if (!c.active) { this.coins.splice(i, 1); continue; }
            c.depth = Math.min(c.depth + spd, 1.0);
            c.bob   = (c.bob || 0) + dt * 3.2;
            c.y     = hy + (H - hy) * c.depth;
            c.x    += this.steerX * 0.009;
            const r    = (0.26 + c.depth * 1.1) * 13;
            const bobY = c.y + Math.sin(c.bob) * 3 * c.depth;
            c.gfx.setDepth(4 + c.depth * 3);
            this._drawCoin(c.gfx, c.x, bobY, r);
            if (c.depth >= 0.98) { c.gfx.destroy(); c.active = false; continue; }
            if (c.depth > 0.74) {
                const dx = Math.abs(this.playerX - c.x);
                const dy = Math.abs((H - 70) - c.y);
                if (dx < r * 1.6 && dy < r + 24) {
                    c.gfx.destroy(); c.active = false;
                    this.score += 10; this._soundCoin(); this._coinBurst(c.x, c.y);
                }
            }
        }
    }

    /* ── HEARTS ────────────────────────────────────────────── */
    _spawnHeart() {
        const { W, H } = this;
        const hy = H * 0.44;
        const x  = W / 2 + (Math.random() - 0.5) * 140;
        const g  = this.add.graphics().setDepth(6);
        this._drawHeart(g, x, hy + 3, 0.07);
        this.hearts.push({ gfx: g, x, y: hy + 3, depth: 0.02, active: true });
    }

    _drawHeart(g, x, y, s) {
        g.clear();
        g.fillStyle(0x000000, 0.2); g.fillEllipse(x, y + 2*s, 40*s, 12*s);
        g.fillStyle(0xff3b3b, 1);
        g.fillTriangle(x, y + 2*s, x - 20*s, y - 16*s, x + 20*s, y - 16*s);
        g.fillCircle(x - 11*s, y - 16*s, 11*s);
        g.fillCircle(x + 11*s, y - 16*s, 11*s);
        g.fillStyle(0xff6e6e, 0.65); g.fillCircle(x - 9*s, y - 18*s, 5*s);
    }

    _updateHearts(dt) {
        const { W, H } = this;
        const hy  = H * 0.44;
        const spd = this.speed * dt * 0.52;

        for (let i = this.hearts.length - 1; i >= 0; i--) {
            const h = this.hearts[i];
            if (!h.active) { this.hearts.splice(i, 1); continue; }
            h.depth = Math.min(h.depth + spd, 1.0);
            h.y     = hy + (H - hy) * h.depth;
            h.x    += this.steerX * 0.009;
            const s = 0.07 + h.depth * 1.15;
            h.gfx.setDepth(6 + h.depth * 4);
            this._drawHeart(h.gfx, h.x, h.y, s);
            if (h.depth >= 0.98) { h.gfx.destroy(); h.active = false; continue; }
            if (h.depth > 0.76) {
                const hitR = 26 * s;
                if (Math.abs(this.playerX - h.x) < hitR && Math.abs((H - 70) - h.y) < hitR + 22) {
                    h.gfx.destroy(); h.active = false;
                    if (this.lives < 3) { this.lives++; this._soundHeart(); this._heartBurst(h.x, h.y); this._drawLives(); }
                }
            }
        }
    }

    /* ── PLAYER UPDATE ─────────────────────────────────────── */
    _updatePlayer(dt) {
        const { H } = this;
        this.stopTick += dt;
        if (this.stopTick >= 0.083) {
            this.stopTick  = 0;
            this.jitterX   = (Math.random() - 0.5) * 2.5;
            this.jitterY   = (Math.random() - 0.5) * 1.8;
        }
        this.bikeSprite.x = this.playerX + this.jitterX;
        this.bikeSprite.y = H - 70 + this.jitterY;
        if      (this.steerDir === -1) { this.bikeSprite.setTexture('bike_lado').setFlipX(true).setScale(0.44); }
        else if (this.steerDir ===  1) { this.bikeSprite.setTexture('bike_lado').setFlipX(false).setScale(0.44); }
        else                           { this.bikeSprite.setTexture('bike_costas').setFlipX(false).setScale(0.44); }
        this.bikeSprite.setAngle(this.steerDir * 5 + this.jitterX * 0.24);
        this._drawShadow(this.playerX);
    }

    /* ── HUD UPDATE ────────────────────────────────────────── */
    _updateHUD() {
        this.scoreText.setText('Pontos: ' + this.score);
        this.distText.setText(`Meta: ${Math.floor(this.distance)} / ${this.goalDist}m`);
        this.segText.setText(['🏙️ Cidade', '🌲 Floresta', '💧 Cachoeira'][this._seg()]);
        this._drawSpeedBar();
        this._drawProgressBar();

        if (this.shakeTimer > 0) {
            this.cameras.main.x = (Math.random() - 0.5) * 8;
            this.cameras.main.y = (Math.random() - 0.5) * 8;
            this.shakeTimer    -= this.game.loop.delta / 1000;
        } else {
            this.cameras.main.x = 0; this.cameras.main.y = 0;
        }
    }

    /* ── EFFECTS ───────────────────────────────────────────── */
    _coinBurst(x, y) {
        for (let i = 0; i < 7; i++) {
            const p = this.add.graphics().setDepth(15);
            p.fillStyle(0xffd700, 1); p.fillCircle(x, y, 5);
            const angle = (i / 7) * Math.PI * 2;
            this.tweens.add({ targets: p,
                x: p.x + Math.cos(angle) * (30 + Math.random() * 28),
                y: p.y + Math.sin(angle) * (30 + Math.random() * 28),
                alpha: 0, scaleX: 0.2, scaleY: 0.2, duration: 380, ease: 'Power2',
                onComplete: () => p.destroy()
            });
        }
        const t = this.add.text(x, y - 18, '+10', {
            fontSize: '22px', fill: '#ffd700', stroke: '#000', strokeThickness: 3, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(20);
        this.tweens.add({ targets: t, y: y - 65, alpha: 0, duration: 700, onComplete: () => t.destroy() });
    }

    _heartBurst(x, y) {
        const t = this.add.text(x, y - 18, '❤️ +1 vida!', {
            fontSize: '20px', fill: '#ff3b3b', stroke: '#000', strokeThickness: 3, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(20);
        this.tweens.add({ targets: t, y: y - 75, alpha: 0, duration: 950, onComplete: () => t.destroy() });
    }

    _hitObstacle() {
        if (this.lives <= 0) return;
        this.lives--;
        this.speed      = Math.max(this.speed * 0.36, 1.5);
        this.shakeTimer = 0.38;
        this._drawLives();
        this._soundHit();

        const { W, H } = this;
        const flash = this.add.graphics().setDepth(32);
        flash.fillStyle(0xff0000, 0.30); flash.fillRect(0, 0, W, H);
        this.tweens.add({ targets: flash, alpha: 0, duration: 380, onComplete: () => flash.destroy() });

        const boom = this.add.text(W / 2, H / 2 - 38, '💥 Bateu!', {
            fontSize: '36px', fill: '#ff4444', stroke: '#000', strokeThickness: 5, fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(33);
        this.tweens.add({ targets: boom, y: H / 2 - 95, alpha: 0, duration: 950, onComplete: () => boom.destroy() });

        if (this.lives <= 0) this.time.delayedCall(500, () => this._showGameOver());
    }

    _checkWin() {
        if (this.distance >= this.goalDist) { this.win = true; this._showWin(); }
    }

    /* ── END SCREENS ───────────────────────────────────────── */
    _showGameOver() {
        this.gameOver = true;
        this._soundGameOver();
        this._stopBgAudio();
        BicicletaRecords.update(this.score, Math.floor(this.distance), 0);
        const { W, H } = this;
        const rec = BicicletaRecords.load();
        const ov  = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.70); ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x150000, 0.97); ov.fillRoundedRect(W/2-255, H/2-160, 510, 320, 22);
        ov.lineStyle(3, 0xff4444, 1); ov.strokeRoundedRect(W/2-255, H/2-160, 510, 320, 22);

        this.add.text(W/2, H/2-118, '💥 GAME OVER', { fontSize: '42px', fill: '#ff4444', fontStyle: 'bold', stroke: '#000', strokeThickness: 6 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2-52, `Pontos: ${this.score}`, { fontSize: '28px', fill: '#ffd700', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2, `Distância: ${Math.floor(this.distance)}m`, { fontSize: '18px', fill: '#bbb', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2+40, rec.lastWasNew ? '🆕 Novo recorde!' : `🏆 Recorde: ${rec.bestScore} pts`, { fontSize: '16px', fill: '#ffe082', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this._addBtn(W/2-120, H/2+105, 'Tentar Novamente', 0x1565c0, () => this.scene.restart());
        this._addBtn(W/2+120, H/2+105, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _showWin() {
        this._soundWin();
        this._stopBgAudio();
        const stars = this.score >= 260 ? 3 : this.score >= 130 ? 2 : 1;
        BicicletaRecords.update(this.score, Math.floor(this.distance), stars);
        const { W, H } = this;
        const rec = BicicletaRecords.load();
        const ov  = this.add.graphics().setDepth(40);
        ov.fillStyle(0x000000, 0.65); ov.fillRect(0, 0, W, H);
        ov.fillStyle(0x001500, 0.97); ov.fillRoundedRect(W/2-270, H/2-175, 540, 350, 22);
        ov.lineStyle(3, 0xffd700, 1); ov.strokeRoundedRect(W/2-270, H/2-175, 540, 350, 22);

        const title = this.add.text(W/2, H/2-135, '🏁 FIM DA PISTA!', { fontSize: '40px', fill: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 7 }).setOrigin(0.5).setDepth(41);
        this.tweens.add({ targets: title, scaleX: 1.05, scaleY: 1.05, yoyo: true, repeat: -1, duration: 600 });
        this.add.text(W/2, H/2-72, `🪙 Pontos: ${this.score}`, { fontSize: '30px', fill: '#ffd700', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2-18, '⭐'.repeat(stars) + '☆'.repeat(3 - stars), { fontSize: '38px' }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2+30, rec.lastWasNew ? '🆕 Novo recorde!' : `🏆 Recorde: ${rec.bestScore} pts`, { fontSize: '17px', fill: '#ffe082', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this.add.text(W/2, H/2+60, `🎮 Jogos: ${rec.gamesPlayed}  |  🏆 Vitórias: ${rec.wins}`, { fontSize: '14px', fill: '#ffffffaa', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(41);
        this._addBtn(W/2-128, H/2+120, 'Jogar de Novo', 0x2e7d32, () => this.scene.restart());
        this._addBtn(W/2+128, H/2+120, 'Menu', 0x6a1b9a, () => this.scene.start('MenuScene'));
    }

    _addBtn(x, y, label, color, cb) {
        const bg = this.add.graphics().setDepth(42);
        bg.fillStyle(color, 1); bg.fillRoundedRect(x-114, y-23, 228, 46, 13);
        bg.lineStyle(2, 0xffffff, 0.3); bg.strokeRoundedRect(x-114, y-23, 228, 46, 13);
        const txt = this.add.text(x, y, label, { fontSize: '17px', fill: '#fff', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 })
            .setOrigin(0.5).setDepth(43).setInteractive({ useHandCursor: true });
        txt.on('pointerover', () => txt.setScale(1.07)).on('pointerout', () => txt.setScale(1)).on('pointerdown', cb);
    }

    /* ── SHUTDOWN ──────────────────────────────────────────── */
    shutdown() {
        this._stopBgAudio();
        const KEY = '__bike_bg__';
        if (this.textures.exists(KEY)) {
            try { this.textures.remove(KEY); } catch(e) {}
        }
        this._gifElems.forEach(img => { img.onload = null; img.onerror = null; img.src = ''; });
        this._gifElems = [];
        try {
            if (this._windSrc)  { this._windSrc.stop();  this._windSrc  = null; }
            if (this._wheelSrc) { this._wheelSrc.stop(); this._wheelSrc = null; }
            setTimeout(() => { if (this._ac) { this._ac.close(); this._ac = null; } }, 400);
        } catch(e) {}
    }

    /* ── AUDIO ─────────────────────────────────────────────── */
    _initAudio() {
        try {
            this._ac = new (window.AudioContext || window.webkitAudioContext)();
            if (this._ac.state === 'suspended') {
                const resume = () => { if (this._ac) this._ac.resume(); };
                this.input.once('pointerdown', resume);
                this.input.keyboard.once('keydown', resume);
            }
        } catch(e) { this._ac = null; return; }

        const ac  = this._ac;
        this._masterGain = ac.createGain(); this._masterGain.gain.value = 0.65; this._masterGain.connect(ac.destination);
        this._bgGain     = ac.createGain(); this._bgGain.gain.value     = 1;    this._bgGain.connect(this._masterGain);
        this._fxGain     = ac.createGain(); this._fxGain.gain.value     = 1;    this._fxGain.connect(this._masterGain);

        const mkNoise = (len) => {
            const b = ac.createBuffer(1, len, ac.sampleRate);
            const d = b.getChannelData(0);
            for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
            return b;
        };
        const sr = ac.sampleRate;

        this._windGain = ac.createGain(); this._windGain.gain.value = 0; this._windGain.connect(this._bgGain);
        this._windSrc  = ac.createBufferSource(); this._windSrc.buffer = mkNoise(sr * 2); this._windSrc.loop = true;
        const wf1 = ac.createBiquadFilter(); wf1.type = 'bandpass'; wf1.frequency.value = 640; wf1.Q.value = 0.8;
        const wf2 = ac.createBiquadFilter(); wf2.type = 'lowpass';  wf2.frequency.value = 1200;
        this._windSrc.connect(wf1); wf1.connect(wf2); wf2.connect(this._windGain);
        this._windSrc.start();

        this._wheelGain = ac.createGain(); this._wheelGain.gain.value = 0; this._wheelGain.connect(this._bgGain);
        this._wheelSrc  = ac.createBufferSource(); this._wheelSrc.buffer = mkNoise(sr * 2); this._wheelSrc.loop = true;
        const rf = ac.createBiquadFilter(); rf.type = 'highpass'; rf.frequency.value = 3200;
        this._wheelSrc.connect(rf); rf.connect(this._wheelGain);
        this._wheelSrc.start();

        this._startBgMusic();
    }

    _startBgMusic() {
        if (!this._ac) return;
        const ac = this._ac;
        this._musicGain = ac.createGain(); this._musicGain.gain.value = 0.06; this._musicGain.connect(this._bgGain);
        const mel  = [[523.25,.20],[587.33,.20],[659.25,.20],[783.99,.44],[659.25,.20],[587.33,.20],[523.25,.44],[440.00,.20],[493.88,.20],[523.25,.20],[659.25,.44],[587.33,.20],[523.25,.20],[493.88,.78]];
        const bass = [[261.63,.44],[261.63,.44],[196.00,.44],[196.00,.44],[220.00,.44],[220.00,.44],[246.94,.78]];
        const totalDur = mel.reduce((s, n) => s + n[1], 0);
        const schedule = (startT) => {
            if (!this._ac || !this._musicGain) return;
            let t = startT;
            mel.forEach(([f, d]) => {
                const osc = ac.createOscillator(), g = ac.createGain();
                osc.type = 'triangle'; osc.frequency.value = f;
                g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.55, t+.02); g.gain.linearRampToValueAtTime(0.22, t+d*.55); g.gain.linearRampToValueAtTime(0, t+d-.02);
                osc.connect(g); g.connect(this._musicGain); osc.start(t); osc.stop(t+d); t += d;
            });
            let tb = startT;
            bass.forEach(([f, d]) => {
                const osc = ac.createOscillator(), g = ac.createGain();
                osc.type = 'sine'; osc.frequency.value = f;
                g.gain.setValueAtTime(0, tb); g.gain.linearRampToValueAtTime(0.32, tb+.04); g.gain.linearRampToValueAtTime(0, tb+d-.02);
                osc.connect(g); g.connect(this._musicGain); osc.start(tb); osc.stop(tb+d); tb += d*2;
            });
            this._melodyTimer = this.time.delayedCall((totalDur + .25) * 1000, () => schedule(ac.currentTime));
        };
        schedule(ac.currentTime + 0.6);
    }

    _updateAudio() {
        if (!this._ac) return;
        const ratio = Math.min(this.speed / this.maxSpeed, 1);
        const t = this._ac.currentTime;
        this._windGain.gain.setTargetAtTime(0.02 + ratio * 0.26, t, 0.3);
        this._wheelGain.gain.setTargetAtTime(ratio * 0.09, t, 0.2);
        if (this._musicGain) this._musicGain.gain.setTargetAtTime(0.05 + ratio * 0.06, t, 0.6);
    }

    _soundBeep(isGo) {
        if (!this._ac) return;
        const ac = this._ac, osc = ac.createOscillator(), g = ac.createGain();
        osc.type = 'sine'; osc.frequency.value = isGo ? 880 : 440;
        g.gain.setValueAtTime(0.38, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + (isGo ? 0.48 : 0.15));
        osc.connect(g); g.connect(this._fxGain); osc.start(); osc.stop(ac.currentTime + (isGo ? 0.52 : 0.18));
    }

    _soundCoin() {
        if (!this._ac) return;
        const ac = this._ac; let t = ac.currentTime;
        [1046.5, 1318.5, 1568].forEach(f => {
            const osc = ac.createOscillator(), g = ac.createGain();
            osc.type = 'sine'; osc.frequency.value = f;
            g.gain.setValueAtTime(0.30, t); g.gain.exponentialRampToValueAtTime(0.001, t+.16);
            osc.connect(g); g.connect(this._fxGain); osc.start(t); osc.stop(t+.18); t += .055;
        });
    }

    _soundHeart() {
        if (!this._ac) return;
        const ac = this._ac; let t = ac.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach(f => {
            const osc = ac.createOscillator(), g = ac.createGain();
            osc.type = 'sine'; osc.frequency.value = f;
            g.gain.setValueAtTime(0.26, t); g.gain.exponentialRampToValueAtTime(0.001, t+.18);
            osc.connect(g); g.connect(this._fxGain); osc.start(t); osc.stop(t+.2); t += .07;
        });
    }

    _soundHit() {
        if (!this._ac) return;
        const ac = this._ac, sr = ac.sampleRate;
        const len = Math.floor(sr * .44);
        const buf = ac.createBuffer(1, len, sr);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/len, 1.5);
        const src = ac.createBufferSource(), flt = ac.createBiquadFilter(), g = ac.createGain();
        flt.type = 'lowpass'; flt.frequency.value = 400;
        g.gain.setValueAtTime(0.72, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+.42);
        src.buffer = buf; src.connect(flt); flt.connect(g); g.connect(this._fxGain); src.start(); src.stop(ac.currentTime+.45);
        const osc = ac.createOscillator(), og = ac.createGain();
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, ac.currentTime); osc.frequency.exponentialRampToValueAtTime(38, ac.currentTime+.28);
        og.gain.setValueAtTime(0.36, ac.currentTime); og.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+.28);
        osc.connect(og); og.connect(this._fxGain); osc.start(); osc.stop(ac.currentTime+.30);
    }

    _soundBoostStart() {
        if (!this._ac || this._boostOsc) return;
        const ac = this._ac, osc = ac.createOscillator(), g = ac.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(72, ac.currentTime); osc.frequency.linearRampToValueAtTime(148, ac.currentTime+.4);
        g.gain.setValueAtTime(0, ac.currentTime); g.gain.linearRampToValueAtTime(0.10, ac.currentTime+.1);
        osc.connect(g); g.connect(this._fxGain); osc.start();
        this._boostOsc = osc; this._boostGain = g;
    }

    _soundBoostStop() {
        if (!this._ac || !this._boostOsc) return;
        const t = this._ac.currentTime;
        this._boostGain.gain.setTargetAtTime(0, t, 0.1);
        try { this._boostOsc.stop(t + .25); } catch(e) {}
        this._boostOsc = null; this._boostGain = null;
    }

    _soundWin() {
        if (!this._ac) return;
        const ac = this._ac;
        [[523.25,0,.13],[659.25,.13,.13],[783.99,.26,.13],[1046.5,.39,.52],[880,.58,.18],[1046.5,.78,.72],[1318.5,.85,.80]].forEach(([f,delay,dur]) => {
            const osc = ac.createOscillator(), g = ac.createGain();
            osc.type = 'square'; osc.frequency.value = f;
            g.gain.setValueAtTime(0, ac.currentTime+delay); g.gain.linearRampToValueAtTime(0.26, ac.currentTime+delay+.02); g.gain.linearRampToValueAtTime(0, ac.currentTime+delay+dur);
            osc.connect(g); g.connect(this._fxGain); osc.start(ac.currentTime+delay); osc.stop(ac.currentTime+delay+dur+.04);
        });
    }

    _soundGameOver() {
        if (!this._ac) return;
        const ac = this._ac;
        [[440,0,.25],[370,.25,.25],[311,.50,.25],[233,.75,.65]].forEach(([f,delay,dur]) => {
            const osc = ac.createOscillator(), g = ac.createGain();
            osc.type = 'sawtooth'; osc.frequency.value = f;
            g.gain.setValueAtTime(0.26, ac.currentTime+delay); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+delay+dur);
            osc.connect(g); g.connect(this._fxGain); osc.start(ac.currentTime+delay); osc.stop(ac.currentTime+delay+dur+.04);
        });
    }

    _stopBgAudio() {
        if (!this._ac) return;
        try {
            if (this._melodyTimer) { this._melodyTimer.remove(false); this._melodyTimer = null; }
            if (this._musicGain)   this._musicGain.gain.setTargetAtTime(0, this._ac.currentTime, 0.12);
            if (this._windGain)    this._windGain.gain.setTargetAtTime(0,  this._ac.currentTime, 0.18);
            if (this._wheelGain)   this._wheelGain.gain.setTargetAtTime(0, this._ac.currentTime, 0.18);
            if (this._boostOsc)    this._soundBoostStop();
        } catch(e) {}
    }
}

/* ── RECORDS ──────────────────────────────────────────────── */
const BicicletaRecords = {
    KEY: 'supermiguel_bike_records',
    load() {
        try {
            const d = JSON.parse(localStorage.getItem(this.KEY) || '{}');
            return { bestScore: d.bestScore||0, bestDistance: d.bestDistance||0, bestStars: d.bestStars||0, gamesPlayed: d.gamesPlayed||0, wins: d.wins||0, lastWasNew: false };
        } catch(e) { return { bestScore:0, bestDistance:0, bestStars:0, gamesPlayed:0, wins:0, lastWasNew:false }; }
    },
    update(score, distance, stars) {
        const d    = this.load();
        d.gamesPlayed++;
        if (stars > 0) d.wins++;
        const isNew = score > d.bestScore || (score === d.bestScore && distance > d.bestDistance);
        if (score    > d.bestScore)    d.bestScore    = score;
        if (distance > d.bestDistance) d.bestDistance = distance;
        if (stars    > d.bestStars)    d.bestStars    = stars;
        d.lastWasNew = isNew;
        try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch(e) {}
        return d;
    }
};
