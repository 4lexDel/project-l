import p5 from 'p5';
import { BaseObject } from './BaseObject';
import { EventHandler } from '../EventHandler';

export class Piece extends BaseObject {
  private shape: number[][];
  private blockSize = 30;
  private col: p5.Color;
  // private tier: number;
  public isHeld: boolean = false;

  // Collider for the piece (override the shape & blocksize)
  private collider!: { x: number; y: number; width: number; height: number };

  identifier: symbol;

  constructor(p: p5, shape: number[][], col: p5.Color) {
    super(p, p.random(100, p.windowWidth - 100), p.random(100, p.windowHeight - 100));
    this.shape = shape;
    this.col = col;
    // this.tier = tier;

    this.identifier = Symbol("piece");
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
      if (this.isMouseInside(this.p.mouseX, this.p.mouseY)) {
        this.isHeld = true;
      }
    });

    eventHandler.addEventMouseDragged(this.identifier, () => {
      if (this.isHeld) {
        const { pieceWidth, pieceHeight } = this.getPieceDimensions();

        this.x = this.p.mouseX - pieceWidth / 2;
        this.y = this.p.mouseY - pieceHeight / 2;
      }
    });

    eventHandler.addEventMouseReleased(this.identifier, () => {
      this.isHeld = false;
    });
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
