class LoadingScene extends Phaser.Scene {
    constructor() { super('LoadingScene'); }
    init(data) { this.nextScene = data.next || 'MenuScene'; this.nextData = data.data || {}; }
    create() {
        const { width: w, height: h } = this.scale;
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x0a0a1a, 0x0a0a1a, 0x0d1b2a, 0x0d1b2a, 1);
        bg.fillRect(0,0,w,h);
        this.add.text(w/2, h/2-30, 'Carregando...', { fontSize: '26px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5);
        const dots = this.add.text(w/2, h/2+10, '...', { fontSize: '22px', fill: '#aaa' }).setOrigin(0.5);
        let d = 0;
        this.time.addEvent({ delay: 300, repeat: -1, callback: () => { d=(d+1)%4; dots.setText('.'.repeat(d)+' '.repeat(3-d)); } });
        this.time.delayedCall(600, () => this.scene.start(this.nextScene, this.nextData));
    }
}
