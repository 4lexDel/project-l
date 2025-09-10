import p5 from 'p5';
import { BaseObject } from './BaseObject';
import { EventHandler } from '../EventHandler';

export class Piece extends BaseObject {
  // Usefull for the piece proportion calculation
  private static maxPieceShapeDim: number = 4;

  private shape: number[][];
  private col: p5.Color;
  private tier: number;

  private pieceRatio: number = 1;

  // Collider for the piece (override the shape & blocksize)
  private collider!: { x: number; y: number; width: number; height: number };

  private identifier: symbol;

  public onPieceRelease?: (x: number, y: number) => void;

  constructor(p: p5, shape: number[][], col: p5.Color, tier: number) {
    super(p, p.random(100, p.windowWidth - 100), p.random(100, p.windowHeight - 100));
    this.shape = shape;
    this.col = col;
    this.tier = tier;

    this.identifier = Symbol("piece");

    const shapeDims = this.getPieceShapeDimensions();
    this.pieceRatio = Math.max(shapeDims.pieceShapeWidth, shapeDims.pieceShapeHeight) / Piece.maxPieceShapeDim;
  }

  setCollider(x: number, y: number, width: number, height: number) {
    this.collider = { x, y, width, height };
  }

  initEvent() {
    let eventHandler = EventHandler.getInstance(this.p);

    eventHandler.removeEventMousePressed(this.identifier);
    eventHandler.removeEventMouseDragged(this.identifier);
    eventHandler.removeEventMouseReleased(this.identifier);

    eventHandler.addEventMousePressed(this.identifier, () => {
      if (!this.isMouseInside(this.p.mouseX, this.p.mouseY)) return;
      this.isHeld = true;
      this.attachPieceToMouseCoords();
    });

    eventHandler.addEventMouseDragged(this.identifier, () => { 
      if (!this.isHeld) return;
      this.attachPieceToMouseCoords();
    });

    eventHandler.addEventMouseReleased(this.identifier, () => {
      if (!this.isHeld) return;

        this.onPieceRelease?.(this.mouseX, this.mouseY);
        this.isHeld = false;
        this.mouseX = -1;
        this.mouseY = -1;
    });
  }

  attachPieceToMouseCoords() {
    const { pieceWidth, pieceHeight } = this.getPieceDimensions();

    this.mouseX = this.p.mouseX - pieceWidth / 2;
    this.mouseY = this.p.mouseY - pieceHeight / 2;
  }
  
  isMouseInside(mx: number, my: number): boolean {
    if (this.collider) {
      const { x, y, width, height } = this.collider;
      return mx > x && mx < x + width && my > y && my < y + height;
    }
    return this.shape.some(([dx, dy]) => {
      const bx = this.x + dx * this.blockSize;
      const by = this.y + dy * this.blockSize;
      return mx > bx && mx < bx + this.blockSize && my > by && my < by + this.blockSize;
    });
  }

  rotate() {
    this.shape = this.shape.map(([x, y]) => [y, -x]);
  }

  getShape() {
    return this.shape;
  }

  getPieceShapeDimensions() {
    const dxs = this.shape.map(([dx]) => dx);
    const dys = this.shape.map(([, dy]) => dy);
    const minDx = Math.min(...dxs), maxDx = Math.max(...dxs);
    const minDy = Math.min(...dys), maxDy = Math.max(...dys);
    return { pieceShapeWidth: (maxDx - minDx + 1), pieceShapeHeight: (maxDy - minDy + 1) };
  }

  getPieceDimensions() {
    const { pieceShapeWidth, pieceShapeHeight } = this.getPieceShapeDimensions();
    const pieceWidth = pieceShapeWidth * this.blockSize;
    const pieceHeight = pieceShapeHeight * this.blockSize;
    return { pieceWidth, pieceHeight };
  }

  draw(boundDisplay?: { maxX: number; maxY: number }) {
    let scaleX = 1, scaleY = 1;
    let offsetX = 0, offsetY = 0;

    let pieceRatio = 1;

    if (boundDisplay) {
      pieceRatio = this.pieceRatio;
      const { pieceWidth, pieceHeight } = this.getPieceDimensions();
      const scale = Math.min(boundDisplay.maxX / pieceWidth, boundDisplay.maxY / pieceHeight);
      scaleX = scale;
      scaleY = scale;
  
      // Centering offsets
      const scaledWidth = pieceWidth * scaleX * this.pieceRatio;
      const scaledHeight = pieceHeight * scaleY * this.pieceRatio;

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
