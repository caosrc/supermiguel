// Shared drawing helpers for Phaser Graphics objects

function drawStar(g, cx, cy, points, outerR, innerR, rotation) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i / (points * 2)) * Math.PI * 2 + (rotation || 0) - Math.PI / 2;
        pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    }
    g.fillPoints(pts, true);
}

function drawHeart(g, cx, cy, size) {
    g.fillCircle(cx - size * 0.3, cy - size * 0.1, size * 0.35);
    g.fillCircle(cx + size * 0.3, cy - size * 0.1, size * 0.35);
    const pts = [
        { x: cx - size * 0.6, y: cy - size * 0.05 },
        { x: cx, y: cy + size * 0.6 },
        { x: cx + size * 0.6, y: cy - size * 0.05 },
    ];
    g.fillTriangle(pts[0].x, pts[0].y, pts[1].x, pts[1].y, pts[2].x, pts[2].y);
}

function drawRoundRect(g, x, y, w, h, r, fillColor, alpha, strokeColor, strokeWidth) {
    g.fillStyle(fillColor, alpha !== undefined ? alpha : 1);
    g.fillRoundedRect(x, y, w, h, r);
    if (strokeColor !== undefined) {
        g.lineStyle(strokeWidth || 2, strokeColor, 1);
        g.strokeRoundedRect(x, y, w, h, r);
    }
}

function lerpColor(a, b, t) {
    const ar = (a >> 16) & 0xff, ag = (a >> 8) & 0xff, ab = a & 0xff;
    const br = (b >> 16) & 0xff, bg = (b >> 8) & 0xff, bb = b & 0xff;
    return ((Math.round(ar + (br - ar) * t) << 16) | (Math.round(ag + (bg - ag) * t) << 8) | Math.round(ab + (bb - ab) * t));
}
