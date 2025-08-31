import p5 from 'p5';

export class Piece {
  p: p5;
  shape: number[][];
  x: number;
  y: number;
  blockSize = 30;
  col: p5.Color;
  tier: number;

  constructor(p: p5, shape: number[][], col: p5.Color, tier: number = 1) {
    this.p = p;
    this.shape = shape;
    this.x = p.random(100, p.windowWidth-100);
    this.y = p.random(100, p.windowHeight-100);
    this.col = col;
    this.tier = tier;
  }

  display() {
    this.p.fill(this.col);
    this.p.strokeWeight(1);
    for (let [dx, dy] of this.shape) {
      this.p.rect(this.x + dx * this.blockSize, this.y + dy * this.blockSize, this.blockSize, this.blockSize);
    }
  }

  isMouseInside(mx: number, my: number): boolean {
    return this.shape.some(([dx, dy]) => {
      const bx = this.x + dx * this.blockSize;
      const by = this.y + dy * this.blockSize;
      return mx > bx && mx < bx + this.blockSize && my > by && my < by + this.blockSize;
    });
  }

  rotate() {
    this.shape = this.shape.map(([x, y]) => [y, -x]);
  }

  upgrade(): Piece | null {
    const upgrades: { [tier: number]: { shape: number[][], color: p5.Color } } = {
      1: { shape: [[0, 0], [1, 0], [2, 0]], color: this.p.color(0, 255, 0) }, // 3-block
      2: { shape: [[0, 0], [0, 1], [1, 1]], color: this.p.color(0, 100, 255) }, // corner
      3: { shape: [[0, 0], [1, 0], [1, 1], [2, 1]], color: this.p.color(150, 0, 255) }, // fancy
    };

    const nextTier = this.tier + 1;
    if (upgrades[nextTier]) {
      return new Piece(this.p, upgrades[nextTier].shape, upgrades[nextTier].color, nextTier);
    }
    return null;
  }

  displayPreview() {
    this.p.fill(this.col);
    this.p.noStroke();
    for (let [dx, dy] of this.shape) {
      this.p.rect(dx * this.blockSize, dy * this.blockSize, this.blockSize, this.blockSize);
    }
  }
}
