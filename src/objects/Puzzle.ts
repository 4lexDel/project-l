import p5 from 'p5';
import { Piece } from './Piece';

export class Puzzle {
  p: p5;
  grid: number[][];
  x: number;
  y: number;
  blockSize = 30;
  score: number;

  constructor(p: p5, x: number, y: number, grid: number[][], score: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.score = score;
  }

  draw() {
    this.p.noFill();
    this.p.stroke(100);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 1) {
          this.p.rect(this.x + j * this.blockSize, this.y + i * this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }
  }

  tryPlacePiece(piece: Piece): boolean {
    const px = Math.round((piece.x - this.x) / this.blockSize);
    const py = Math.round((piece.y - this.y) / this.blockSize);

    for (const [dx, dy] of piece.shape) {
      const gx = px + dx;
      const gy = py + dy;
      if (
        gy < 0 || gy >= this.grid.length ||
        gx < 0 || gx >= this.grid[0].length ||
        this.grid[gy][gx] !== 1
      ) {
        return false;
      }
    }

    // Snap
    piece.x = this.x + px * this.blockSize;
    piece.y = this.y + py * this.blockSize;

    // Mark filled
    for (const [dx, dy] of piece.shape) {
      this.grid[py + dy][px + dx] = 2; // mark as filled
    }

    return true;
  }
}
