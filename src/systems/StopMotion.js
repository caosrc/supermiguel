const StopMotion = {
    FPS:      10,
    interval: 100,
    elapsed:  0,
    frame:    0,
    tick:     false,
    regX:     0,
    regY:     0,
    angle:    0,

    update(delta) {
        this.elapsed += delta;
        this.tick = false;
        while (this.elapsed >= this.interval) {
            this.elapsed -= this.interval;
            this.frame++;
            this.tick   = true;
            this.regX   = (Math.random() - 0.5) * 2.8;
            this.regY   = (Math.random() - 0.5) * 2.0;
            this.angle  = (Math.random() - 0.5) * 2.2;
        }
    },

    jitter(base, amount = 1.5) {
        return base + (Math.random() - 0.5) * amount * 2;
    },

    wobble(obj, intensity = 1) {
        if (this.tick) {
            obj.setAngle((Math.random() - 0.5) * 2.5 * intensity);
        }
    },

    scaleWobble(obj, base, intensity = 0.012) {
        if (this.tick) {
            const s = base + (Math.random() - 0.5) * intensity;
            obj.setScale(s);
        }
    },
};
