import p5 from 'p5';
import { Piece } from './Piece';
import { BaseObject } from './BaseObject';

export class Puzzle extends BaseObject {
  public static puzzleDimRatio: number = 1.241;

  private grid: number[][];
  private pointsReward: number;
  private pieceReward: Piece;
  public isBlack: boolean;

  private padding: number = 8;
  private pieceRewardSize: number = 20;

  constructor(p: p5, x: number, y: number, grid: number[][], pointsReward: number, pieceReward: Piece, isBlack: boolean) {
    super(p, x, y);
    this.grid = grid;
    this.pointsReward = pointsReward;
    this.pieceReward = pieceReward;
    this.isBlack = isBlack;

    this.blockSize = 15;
  }

  public getObjectDimensions() {
    const rows = this.grid.length;
    const cols = this.grid[0].length;
    return { objectWidth: cols * this.blockSize + this.padding, objectHeight: rows * this.blockSize + this.padding + this.pieceRewardSize };
  }

  public draw(boundDisplay?: { maxX: number; maxY: number }) {
    let scaleX = 1, scaleY = 1;

    const { objectWidth: puzzleWidth, objectHeight: puzzleHeight } = this.getObjectDimensions();

    if (boundDisplay) {
      // const scale = Math.min(boundDisplay.maxX / puzzleWidth, boundDisplay.maxY / puzzleHeight);
      scaleX = boundDisplay.maxX / puzzleWidth;
      scaleY = boundDisplay.maxY / puzzleHeight;
    }

    const cx = this.isHeld && this.mouseX !== -1 ? this.mouseX : this.x;
    const cy = this.isHeld && this.mouseY !== -1 ? this.mouseY : this.y;

    // Draw border
    this.p.strokeWeight(1);
    this.p.stroke(150);
    this.p.fill(20);
    this.p.rect(cx, cy, puzzleWidth * scaleX, puzzleHeight * scaleY, 5);

    // Draw reward points (top left)
    this.p.noStroke();
    this.p.fill(200);
    this.p.textSize(puzzleWidth * scaleX / 8);
    this.p.textAlign(this.p.LEFT, this.p.TOP);
    this.p.text(`${this.pointsReward != 0 ? this.pointsReward : ''}`, cx + this.padding * scaleX, cy + this.padding * scaleX);

    // Draw piece reward (top right)
    this.pieceReward.x = cx + puzzleWidth * scaleX - this.pieceRewardSize * scaleX - this.padding/2;
    this.pieceReward.y = cy;
    this.pieceReward.draw({ maxX: this.pieceRewardSize * scaleX, maxY: this.pieceRewardSize * scaleY });

    // Draw grid (centered)
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const cellX = cx + col * this.blockSize * scaleX + this.padding/2;
        const cellY = cy + row * this.blockSize * scaleY + this.pieceRewardSize * scaleY;
        // Cell background
        this.p.strokeWeight(this.blockSize * scaleX / 10);
        if (this.grid[row][col] === 1) {
          this.p.stroke(100);
          this.p.fill(230);
          this.p.rect(cellX, cellY, this.blockSize * scaleX, this.blockSize * scaleY, 2);
        } else {
          this.p.noStroke();
          
          // draw a small ellipse at the middle
          this.p.fill(150);
          this.p.ellipse(cellX + (this.blockSize * scaleX / 2), cellY + (this.blockSize * scaleY / 2), 2, 2);
        }
      }
    }
  }

  public tryPlacePiece(piece: Piece): boolean {
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
