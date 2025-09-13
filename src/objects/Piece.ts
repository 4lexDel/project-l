import p5 from 'p5';
import { BaseObject } from './BaseObject';

export class Piece extends BaseObject {
  // Usefull for the piece proportion calculation
  private static maxPieceShapeDim: number = 4;

  private shape: number[][];
  private col: p5.Color;
  private tier: number;

  private pieceRatio: number = 1;

  constructor(p: p5, shape: number[][], col: p5.Color, tier: number) {
    super(p, p.random(100, p.windowWidth - 100), p.random(100, p.windowHeight - 100));
    this.shape = shape;
    this.col = col;
    this.tier = tier;

    const shapeDims = this.getPieceShapeDimensions();
    this.pieceRatio = Math.max(shapeDims.pieceShapeWidth, shapeDims.pieceShapeHeight) / Piece.maxPieceShapeDim;
  }

  public rotate() {
    this.shape = this.shape.map(([x, y]) => [y, -x]);
  }

  public getShape() {
    return this.shape;
  }

  public getPieceShapeDimensions() {
    const dxs = this.shape.map(([dx]) => dx);
    const dys = this.shape.map(([, dy]) => dy);
    const minDx = Math.min(...dxs), maxDx = Math.max(...dxs);
    const minDy = Math.min(...dys), maxDy = Math.max(...dys);
    return { pieceShapeWidth: (maxDx - minDx + 1), pieceShapeHeight: (maxDy - minDy + 1) };
  }

  // Override BaseObject
  public getObjectDimensions() {
    const { pieceShapeWidth, pieceShapeHeight } = this.getPieceShapeDimensions();
    const objectWidth = pieceShapeWidth * this.blockSize;
    const objectHeight = pieceShapeHeight * this.blockSize;
    return { objectWidth, objectHeight };
  }

  public draw(boundDisplay?: { maxX: number; maxY: number }) {
    let scaleX = 1, scaleY = 1;
    let offsetX = 0, offsetY = 0;

    let pieceRatio = 1;

    if (boundDisplay) {
      pieceRatio = this.pieceRatio;
      const { objectWidth, objectHeight } = this.getObjectDimensions();
      const scale = Math.min(boundDisplay.maxX / objectWidth, boundDisplay.maxY / objectHeight);
      scaleX = scale;
      scaleY = scale;
  
      // Centering offsets
      const scaledWidth = objectWidth * scaleX * this.pieceRatio;
      const scaledHeight = objectHeight * scaleY * this.pieceRatio;

      offsetX = (boundDisplay.maxX - scaledWidth) / 2;
      offsetY = (boundDisplay.maxY - scaledHeight) / 2;
    }

    const cx = this.isHeld && this.mouseX !== -1 ? this.mouseX : this.x;
    const cy = this.isHeld && this.mouseY !== -1 ? this.mouseY : this.y;
  
    this.p.fill(this.col);
    this.p.strokeWeight(this.blockSize * scaleX * pieceRatio/10);
    this.p.stroke(150);
    for (let [dx, dy] of this.shape) {
      const x = cx + dx * this.blockSize * scaleX * pieceRatio + offsetX;
      const y = cy + dy * this.blockSize * scaleY * pieceRatio + offsetY;
      this.p.rect(x, y, this.blockSize * scaleX * pieceRatio, this.blockSize * scaleY * pieceRatio);
    }
  }
}