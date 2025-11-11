import p5 from 'p5';
import { Piece } from './Piece';
import { BaseObject } from './BaseObject';
import { getColorValueById } from '../colors';

export class Puzzle extends BaseObject {
  public static puzzleDimRatio: number = 1.241;
  public static padding: number = 8;
  public static pieceRewardSize: number = 25;
  public static nbCol: number = 5;
  public static nbRow: number = 5;

  private grid: number[][];
  private pointsReward: number;
  public pieceReward: Piece;
  public isBlack: boolean;

  public piecesUsed: Piece[] = [];

  constructor(p: p5, x: number, y: number, grid: number[][], pointsReward: number, pieceReward: Piece, isBlack: boolean) {
    super(p, x, y);
    this.grid = grid;
    this.pointsReward = pointsReward;
    this.pieceReward = pieceReward;
    this.isBlack = isBlack;
  }

  public static setGridCellSize(newSize: number) {
    Puzzle.blockSize = newSize;
  }

  public getObjectDimensions() {
    return { objectWidth: Puzzle.nbCol * Puzzle.blockSize + Puzzle.padding, objectHeight: Puzzle.nbRow * Puzzle.blockSize + Puzzle.padding + Puzzle.pieceRewardSize };
  }

  public getPointsReward() {
    return this.pointsReward;
  }

  public draw(boundDisplay?: { maxX: number; maxY: number }) {    
    let scaleX = 1, scaleY = 1;
    
    const { objectWidth: puzzleWidth, objectHeight: puzzleHeight } = this.getObjectDimensions();

    if (boundDisplay) {
      scaleX = boundDisplay.maxX / puzzleWidth;
      scaleY = boundDisplay.maxY / puzzleHeight;
    }

    // Use two coords if there are more than 1 item
    const coords = [
      ...(!boundDisplay && this.isHeld
        ? [{ cx: this.mouseX - puzzleWidth/2, cy: this.mouseY - puzzleHeight/2 }]
        : []),
      ...(boundDisplay && (this.quantity > 1 || !this.isHeld)
        ? [{ cx: this.x, cy: this.y }]
        : []),
    ];

    coords.forEach(({cx, cy}) => {
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
      this.p.text(`${this.pointsReward != 0 ? this.pointsReward : ''}`, cx + Puzzle.padding * scaleX, cy + Puzzle.padding * scaleX);

      // Draw piece reward (top right)
      this.pieceReward.x = cx + puzzleWidth * scaleX - Puzzle.pieceRewardSize * scaleX - Puzzle.padding/2;
      this.pieceReward.y = cy;
      this.pieceReward.draw({ maxX: Puzzle.pieceRewardSize * scaleX, maxY: Puzzle.pieceRewardSize * scaleY });

      // Draw grid (centered)
      for (let row = 0; row < Puzzle.nbRow; row++) {
        for (let col = 0; col < Puzzle.nbCol; col++) {
          const cellX = cx + col * Puzzle.blockSize * scaleX + Puzzle.padding/2;
          const cellY = cy + row * Puzzle.blockSize * scaleY + Puzzle.pieceRewardSize * scaleY;
          // Cell background
          this.p.strokeWeight(Puzzle.blockSize * scaleX / 10);
          if (this.grid[row][col] !== 0) {
            this.p.stroke(100);
            this.p.fill(getColorValueById(this.grid[row][col]));
            this.p.rect(cellX, cellY, Puzzle.blockSize * scaleX, Puzzle.blockSize * scaleY, 2);
          } else {
            this.p.noStroke();
            
            // draw a small ellipse at the middle
            this.p.fill(150);
            this.p.ellipse(cellX + (Puzzle.blockSize * scaleX / 2), cellY + (Puzzle.blockSize * scaleY / 2), 2, 2);
          }
        }
      }
    });
  }

  public tryPlacePiece(piece: Piece, boundDisplay: { maxX: number; maxY: number }): boolean {
    const { objectWidth: puzzleWidth, objectHeight: puzzleHeight } = this.getObjectDimensions();
    const { objectWidth: pieceWidth, objectHeight: pieceHeight } = piece.getObjectDimensions();

    const scaleX = boundDisplay.maxX / puzzleWidth;
    const scaleY = boundDisplay.maxY / puzzleHeight;

    const offsetX = Puzzle.padding/2;
    const offsetY = Puzzle.pieceRewardSize * scaleY;

    const px = Math.round((piece.mouseX - pieceWidth/2 - offsetX - this.x) / (Puzzle.blockSize * scaleX));
    const py = Math.round((piece.mouseY - pieceHeight/2 - offsetY - this.y) / (Puzzle.blockSize * scaleY));

    for (const [dx, dy] of piece.getShape()) {
      const gx = px + dx;
      const gy = py + dy;
      if (
        gy < 0 || gy >= Puzzle.nbRow ||
        gx < 0 || gx >= Puzzle.nbCol ||
        this.grid[gy][gx] !== 1
      ) {
        return false;
      }
    }

    // Snap
    piece.x = this.x + px * Puzzle.blockSize;
    piece.y = this.y + py * Puzzle.blockSize;

    // Mark filled
    for (const [dx, dy] of piece.getShape()) {
      this.grid[py + dy][px + dx] = piece.colorOption.id; // mark as filled
    }

    return true;
  }

  public isCompleted() {
      for (let row = 0; row < Puzzle.nbRow; row++) {
        for (let col = 0; col < Puzzle.nbCol; col++) {
          // Some case empty
          if (this.grid[row][col] === 1) return false;
        }
      }

      return true;
  }

  public clean() {
    // Clear pieces used
    this.piecesUsed = [];

    // Clear grid
    for (let row = 0; row < Puzzle.nbRow; row++) {
        for (let col = 0; col < Puzzle.nbCol; col++) {
          // Some case empty
          if (this.grid[row][col] !== 0) this.grid[row][col] = 1;
        }
      }
  }
}
