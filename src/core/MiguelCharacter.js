class MiguelCharacter {
    constructor(scene, x, y) {
        this.scene = scene;
        this._x = x; this._y = y;
        this.health = 3;
        this.maxHealth = 3;
        this.coins = 0;
        this.stars = 0;
        this.currentState  = MIGUEL_STATES.IDLE;
        this.facingRight   = true;
        this.isGrounded    = false;
        this.canJump       = true;
        this.jumpCount     = 0;
        this.maxJumps      = 2;
        this.invincible    = false;
        this.invincibleTimer = 0;
        this.actionCooldown  = 0;
        this.footstepTimer   = 0;
        this.isDead          = false;
        this.onGround        = false;
        this._jumpJustPressed = false;

        this._smElapsed   = 0;
        this._smInterval  = 95;
        this._smAngle     = 0;
        this._smScaleOff  = 0;
        this._smLastState = null;

        this._createSprite(x, y);
        this._setupKeys();
    }

    _createSprite(x, y) {
        const s = this.scene;
        this.sprite = s.physics.add.sprite(x, y, 'miguel_stand');
        this.sprite.setScale(0.18);
        this.sprite.setDepth(100);
        this.sprite.setCollideWorldBounds(true);
        this.body = this.sprite.body;
        this.body.setGravityY(300);
        this.body.setSize(50, 120);
        this.body.setOffset(104, 220);
        this.body.setMaxVelocityY(800);

        this.shadowGfx = s.add.graphics().setDepth(99);

        this.trailTimer = 0;
    }

    _setupKeys() {
        const s = this.scene;
        this.cursors = s.input.keyboard.createCursorKeys();
        this.keyA     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyZ     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyR     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyShift = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySpace = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDown  = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyS     = s.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.touchLeft   = false; this.touchRight  = false;
        this.touchJump   = false; this.touchAction = false;
        this.touchCrouch = false;
        this._jumpKeyWasDown = false;

        const setupTouch = (id, prop) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('touchstart', e => { e.preventDefault(); this[prop] = true; },  { passive: false });
            el.addEventListener('touchend',   e => { e.preventDefault(); this[prop] = false; }, { passive: false });
            el.addEventListener('mousedown',  () => this[prop] = true);
            el.addEventListener('mouseup',    () => this[prop] = false);
        };
        setupTouch('btn-esquerda', 'touchLeft');
        setupTouch('btn-direita',  'touchRight');
        setupTouch('btn-pular',    'touchJump');
        setupTouch('btn-acao',     'touchAction');
        setupTouch('btn-agachar',  'touchCrouch');
    }

    isLeft()    { return this.cursors.left.isDown   || this.keyA.isDown    || this.touchLeft; }
    isRight()   { return this.cursors.right.isDown  || this.keyD.isDown    || this.touchRight; }
    isCrouch()  { return this.cursors.down.isDown   || this.keyS.isDown    || this.keyDown.isDown; }
    isAction()  { return Phaser.Input.Keyboard.JustDown(this.keyZ) || this.touchAction; }
    isRunHeld() { return this.keyShift.isDown; }
    isRewind()  { return this.keyR.isDown; }

    _jumpPressed() {
        const down    = this.cursors.up.isDown || this.keyW.isDown || this.keySpace.isDown || this.touchJump;
        const wasDown = this._jumpKeyWasDown;
        this._jumpKeyWasDown = down;
        return down && !wasDown;
    }

    update(delta, dialogActive) {
        if (this.isDead) return;
        if (dialogActive) { this._idle(); return; }

        const dt = delta / 1000;
        this.actionCooldown = Math.max(0, this.actionCooldown - dt);
        this.footstepTimer  = Math.max(0, this.footstepTimer - dt);
        this.trailTimer     = Math.max(0, this.trailTimer - dt);

        if (this.invincible) {
            this.invincibleTimer -= dt;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
                this.sprite.setAlpha(1);
            } else {
                this.sprite.setAlpha(Math.sin(this.invincibleTimer * 18) > 0 ? 1 : 0.35);
            }
        }

        this.onGround = this.body.blocked.down;
        if (this.onGround) { this.jumpCount = 0; }

        const movingRight = this.isRight();
        const movingLeft  = this.isLeft();
        const crouching   = this.isCrouch() && this.onGround;
        this.isRunning    = this.isRunHeld() && !crouching;
        const speed       = this.isRunning ? RUN_SPEED : WALK_SPEED;

        if (crouching) {
            this.body.setVelocityX(this.body.velocity.x * 0.7);
            this.setState(MIGUEL_STATES.CROUCH);
        } else if (movingRight) {
            this.body.setVelocityX(speed);
            this.facingRight = true;
            this.sprite.setFlipX(false);
        } else if (movingLeft) {
            this.body.setVelocityX(-speed);
            this.facingRight = false;
            this.sprite.setFlipX(true);
        } else {
            const vx = this.body.velocity.x;
            this.body.setVelocityX(vx * 0.72);
            if (Math.abs(vx) < 12) this.body.setVelocityX(0);
        }

        if (this._jumpPressed() && (this.onGround || this.jumpCount < this.maxJumps)) {
            this.body.setVelocityY(JUMP_FORCE);
            this.jumpCount++;
            if (this.scene.particles) {
                this.scene.particles.burst(this.sprite.x, this.sprite.y + 35, 0xffffff, 8);
            }
        }

        if (this.isRunning && this.onGround && this.trailTimer <= 0 && (movingLeft || movingRight)) {
            if (this.scene.particles) {
                this.scene.particles.footstep(
                    this.sprite.x + (this.facingRight ? -20 : 20),
                    this.sprite.y + 40
                );
            }
            this.trailTimer = 0.1;
        }

        if (!crouching) this._updateState();
        this._applyStopMotion(delta);
        this._updateShadow();

        if ((movingRight || movingLeft) && this.onGround && this.footstepTimer <= 0) {
            if (this.scene.particles) {
                this.scene.particles.footstep(this.sprite.x, this.sprite.y + 42);
            }
            this.footstepTimer = this.isRunning ? 0.15 : 0.25;
        }
    }

    _applyStopMotion(delta) {
        this._smElapsed += delta;
        const tick = this._smElapsed >= this._smInterval;
        if (tick) {
            this._smElapsed -= this._smInterval;

            this._smAngle    = (Math.random() - 0.5) * 2.8;
            this._smScaleOff = (Math.random() - 0.5) * 0.008;

            const newState = this.currentState;
            if (newState !== this._smLastState) {
                this._smLastState = newState;
            }
            const texMap = {
                [MIGUEL_STATES.IDLE]:   'miguel_stand',
                [MIGUEL_STATES.WALK]:   'miguel_walk',
                [MIGUEL_STATES.RUN]:    'miguel_run',
                [MIGUEL_STATES.JUMP]:   'miguel_jump',
                [MIGUEL_STATES.FALL]:   'miguel_jump',
                [MIGUEL_STATES.CROUCH]: 'miguel_crouch',
                [MIGUEL_STATES.HURT]:   'miguel_stand',
                [MIGUEL_STATES.WIN]:    'miguel_jump_punch',
                [MIGUEL_STATES.ACTION]: 'miguel_drink',
            };
            const key = texMap[this.currentState] || 'miguel_stand';
            if (this.sprite.texture && this.sprite.texture.key !== key) {
                this.sprite.setTexture(key);
            }
        }

        const baseScale = 0.18;
        this.sprite.setScale(baseScale + this._smScaleOff);
        if (!this.invincible) {
            this.sprite.setAngle(this._smAngle);
        }
    }

    _updateState() {
        const vy = this.body.velocity.y;
        const vx = this.body.velocity.x;
        if (!this.onGround) {
            this.setState(vy < -50 ? MIGUEL_STATES.JUMP : MIGUEL_STATES.FALL);
        } else if (Math.abs(vx) > 20) {
            this.setState(this.isRunning ? MIGUEL_STATES.RUN : MIGUEL_STATES.WALK);
        } else {
            this.setState(MIGUEL_STATES.IDLE);
        }
    }

    _updateShadow() {
        if (!this.shadowGfx) return;
        this.shadowGfx.clear();
        const alpha = this.onGround ? 0.28 : 0.12;
        const scale = this.onGround ? 1 : 0.65;
        this.shadowGfx.fillStyle(0x000000, alpha);
        this.shadowGfx.fillEllipse(this.sprite.x, this.sprite.y + 44, 50 * scale, 14 * scale);
    }

    _idle() {
        this.body.setVelocityX(0);
        this.setState(MIGUEL_STATES.IDLE);
    }

    setState(state) { this.currentState = state; }

    hurt() {
        if (this.invincible || this.isDead) return;
        this.health--;
        this.invincible      = true;
        this.invincibleTimer = 2.2;
        this.body.setVelocityY(-260);
        this.body.setVelocityX(this.facingRight ? -180 : 180);
        this.setState(MIGUEL_STATES.HURT);
        if (this.scene.particles) this.scene.particles.burst(this.sprite.x, this.sprite.y, 0xff4444, 12);
        if (this.scene.cameras)   this.scene.cameras.main.shake(220, 0.016);
        if (this.health <= 0) this.die();
    }

    die() {
        this.isDead = true;
        this.body.setVelocityY(-400);
        this.scene.cameras.main.shake(300, 0.022);
        this.scene.time.delayedCall(1400, () => { this.scene.scene.restart(); });
    }

    collectCoin(value = 1) {
        this.coins += value;
        if (this.scene.particles) this.scene.particles.coins(this.sprite.x, this.sprite.y - 30, 4);
        if (this.scene.hud)       this.scene.hud.showCombo('+' + value + ' 🪙');
    }

    collectStar() {
        this.stars = Math.min(3, this.stars + 1);
        if (this.scene.particles) this.scene.particles.stars(this.sprite.x, this.sprite.y - 40);
        if (this.scene.hud)       this.scene.hud.showCombo('⭐ Estrela!');
        if (this.scene.cameras)   this.scene.cameras.main.flash(400, 255, 235, 59, false);
    }

    heal() {
        this.health = Math.min(this.maxHealth, this.health + 1);
        if (this.scene.particles) this.scene.particles.burst(this.sprite.x, this.sprite.y - 20, 0x4caf50, 12);
        if (this.scene.hud)       this.scene.hud.showCombo('❤️ +Vida!');
    }

    get x() { return this.sprite ? this.sprite.x : this._x; }
    set x(v) { this._x = v; if (this.sprite) this.sprite.x = v; }
    get y() { return this.sprite ? this.sprite.y : this._y; }
    set y(v) { this._y = v; if (this.sprite) this.sprite.y = v; }

    destroy() {
        if (this.sprite)    this.sprite.destroy();
        if (this.shadowGfx) this.shadowGfx.destroy();
    }
}
