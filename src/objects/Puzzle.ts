import p5 from 'p5';
import { Piece } from './Piece';
import { BaseObject } from './BaseObject';

export class Puzzle extends BaseObject {
  private grid: number[][];
  private pointsReward: number;
  private pieceReward: Piece;

  private padding: number = 6;
  private pieceRewardSize: number = 20;
  private textSize: number = 15;

  constructor(p: p5, x: number, y: number, grid: number[][], pointsReward: number, pieceReward: Piece) {
    super(p, x, y);
    this.grid = grid;
    this.pointsReward = pointsReward;
    this.pieceReward = pieceReward;

    this.blockSize = 15;
  }

  getDimensions() {
    const rows = this.grid.length;
    const cols = this.grid[0].length;
    return { width: cols * this.blockSize + this.padding, height: rows * this.blockSize + this.padding + this.pieceRewardSize };
  }

  draw() {
    const { width: puzzleWidth, height: puzzleHeight } = this.getDimensions();

    // Draw border
    this.p.strokeWeight(1);
    this.p.stroke(150);
    this.p.fill(20);
    this.p.rect(this.x, this.y, puzzleWidth, puzzleHeight, 5);

    // Draw reward points (top left)
    this.p.noStroke();
    this.p.fill(200);
    this.p.textSize(this.textSize);
    this.p.textAlign(this.p.LEFT, this.p.TOP);
    this.p.text(`${this.pointsReward != 0 ? this.pointsReward : ''}`, this.x + this.padding, this.y + this.padding);

    // Draw piece reward (top right)
    this.pieceReward.x = this.x + puzzleWidth - this.pieceRewardSize - this.padding/2;
    this.pieceReward.y = this.y;
    this.pieceReward.draw({ maxX: this.pieceRewardSize, maxY: this.pieceRewardSize }, 0);

    // Draw grid (centered)
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const cellX = this.x + col * this.blockSize + this.padding/2;
        const cellY = this.y + row * this.blockSize + this.pieceRewardSize;
        // Cell background
        this.p.strokeWeight(1);
        if (this.grid[row][col] === 1) {
          this.p.stroke(100);
          this.p.fill(230);
          this.p.rect(cellX, cellY, this.blockSize, this.blockSize, 4);
        } else {
          this.p.noStroke();
          
          // draw a small ellipse at the middle
          this.p.fill(150);
          this.p.ellipse(cellX + this.blockSize / 2, cellY + this.blockSize / 2, 2, 2);
        }
      }
    }
  }

  tryPlacePiece(piece: Piece): boolean {
    const px = Math.round((piece.x - this.x) / this.blockSize);
    const py = Math.round((piece.y - this.y) / this.blockSize);

    for (const [dx, dy] of piece.getShape()) {
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
    for (const [dx, dy] of piece.getShape()) {
      this.grid[py + dy][px + dx] = 2; // mark as filled
    }

    return true;
  }
}
