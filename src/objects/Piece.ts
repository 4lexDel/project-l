import p5 from 'p5';
import { BaseObject } from './BaseObject';

export class Piece extends BaseObject {
  shape: number[][];
  blockSize = 30;
  col: p5.Color;
  tier: number;

  constructor(p: p5, shape: number[][], col: p5.Color, tier: number = 1) {
    super(p, p.random(100, p.windowWidth - 100), p.random(100, p.windowHeight - 100));
    this.shape = shape;
    this.col = col;
    this.tier = tier;
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

  // upgrade(): Piece | null {
  //   const upgrades: { [tier: number]: { shape: number[][], color: p5.Color } } = {
  //     1: { shape: [[0, 0], [1, 0], [2, 0]], color: this.p.color(0, 255, 0) }, // 3-block
  //     2: { shape: [[0, 0], [0, 1], [1, 1]], color: this.p.color(0, 100, 255) }, // corner
  //     3: { shape: [[0, 0], [1, 0], [1, 1], [2, 1]], color: this.p.color(150, 0, 255) }, // fancy
  //   };

  //   const nextTier = this.tier + 1;
  //   if (upgrades[nextTier]) {
  //     return new Piece(this.p, upgrades[nextTier].shape, upgrades[nextTier].color, nextTier);
  //   }
  //   return null;
  // }

  // displayPreview() {
  //   this.p.fill(this.col);
  //   this.p.noStroke();
  //   for (let [dx, dy] of this.shape) {
  //     this.p.rect(dx * this.blockSize, dy * this.blockSize, this.blockSize, this.blockSize);
  //   }
  // }

  getPieceDimensions() {
    const dxs = this.shape.map(([dx]) => dx);
    const dys = this.shape.map(([, dy]) => dy);
    const minDx = Math.min(...dxs), maxDx = Math.max(...dxs);
    const minDy = Math.min(...dys), maxDy = Math.max(...dys);
    const pieceWidth = (maxDx - minDx + 1) * this.blockSize;
    const pieceHeight = (maxDy - minDy + 1) * this.blockSize;
    return { pieceWidth, pieceHeight };
  }

  draw(boundDisplay?: { maxX: number; maxY: number }) {
    let scaleX = 1, scaleY = 1;
    if (boundDisplay) {
      // Find min/max dx/dy in shape
      const { pieceWidth, pieceHeight } = this.getPieceDimensions();
      const scale = Math.min(boundDisplay.maxX / pieceWidth, boundDisplay.maxY / pieceHeight);
      scaleX = scale;
      scaleY = scale;
    }

    this.p.fill(this.col);
    this.p.strokeWeight(2);
    this.p.stroke(50);
    for (let [dx, dy] of this.shape) {
      const x = this.x + dx * this.blockSize * scaleX;
      const y = this.y + dy * this.blockSize * scaleY;
      this.p.rect(x, y, this.blockSize * scaleX, this.blockSize * scaleY);
    }
  }

  static create1block(p: p5): Piece {
    return new Piece(p, [[0, 0]], p.color(255, 210, 100));
  }

  static create2block(p: p5): Piece {
    return new Piece(p, [[0, 0], [1, 0]], p.color(128, 0, 128));
  }

  static create3block(p: p5): Piece {
    return new Piece(p, [[0, 0], [1, 0], [2, 0]], p.color(0, 0, 255));
  }

  static create4block(p: p5): Piece {
    return new Piece(p, [[0, 0], [1, 0], [2, 0], [3, 0]], p.color(255, 0, 0));
  }

  static createSquare(p: p5): Piece {
    return new Piece(p, [[0, 0], [0, 1], [1, 1], [1, 0]], p.color(255, 165, 0));
  }

  static createLblock(p: p5): Piece {
    return new Piece(p, [[0, 0], [0, 1], [0, 2], [1, 2]], p.color(0, 255, 0));
  }

  static createZigzag(p: p5): Piece {
    return new Piece(p, [[0, 0], [1, 0], [1, 1], [2, 1]], p.color(0, 255, 255));
  }

  static createCorner(p: p5): Piece {
    return new Piece(p, [[0, 0], [0, 1], [1, 0]], p.color(255, 255, 0));
  }

  static createSmallT(p: p5): Piece {
    return new Piece(p, [[0, 0], [1, 0], [2, 0], [1, 1]], p.color(247, 139, 240));
  }
}
