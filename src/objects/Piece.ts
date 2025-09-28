import p5 from 'p5';
import { BaseObject } from './BaseObject';
import { getColorValueById, type ColorOption } from '../colors';
import { RegisterDraw } from '../tools/DrawDecorator';

export class Piece extends BaseObject {
  // Usefull for the piece proportion calculation
  private static maxPieceShapeDim: number = 4;

  private shape: number[][];
  public colorOption: ColorOption;
  
  private pieceRatio: number = 1;
  
  public tier: number;

  constructor(p: p5, shape: number[][], colorOption: ColorOption, tier: number, quantity = 1) {
    super(p, -1, -1, quantity);
    this.shape = shape;
    this.colorOption = colorOption;
    this.tier = tier;

    const shapeDims = this.getPieceShapeDimensions();
    this.pieceRatio = Math.max(shapeDims.pieceShapeWidth, shapeDims.pieceShapeHeight) / Piece.maxPieceShapeDim;
  }

  public rotate(clockwise: boolean = true) {
    // Step 1: rotate
    const rotated = this.shape.map(([x, y]) => {
      return clockwise ? [-y, x] : [y, -x];
    });
  
    // Step 2: find minimum x and y
    const minX = Math.min(...rotated.map(([x]) => x));
    const minY = Math.min(...rotated.map(([_, y]) => y));
  
    // Step 3: shift so at least one [0,0] exists
    this.shape = rotated.map(([x, y]) => [x - minX, y - minY]);
  }

  public mirror() {
    // Step 1: mirror
    const mirrored = this.shape.map(([x, y]) => [-x, y]);

    // Step 2: find minimum x and y
    const minX = Math.min(...mirrored.map(([x]) => x));
    const minY = Math.min(...mirrored.map(([_, y]) => y));

    // Step 3: shift so at least one [0,0] exists
    this.shape = mirrored.map(([x, y]) => [x - minX, y - minY]);
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
    const objectWidth = pieceShapeWidth * Piece.blockSize;
    const objectHeight = pieceShapeHeight * Piece.blockSize;
    return { objectWidth, objectHeight };
  }

  @RegisterDraw(2)
  public draw(boundDisplay?: { maxX: number; maxY: number }) {
    let scaleX = 1, scaleY = 1;
    let offsetX = 0, offsetY = 0;

    let currentPieceRatio = 1;    

    if (boundDisplay) {
      currentPieceRatio = this.pieceRatio;
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

    // Use two coords if there are more than 1 item
    const coords = [
      ...(!boundDisplay && this.isHeld && this.mouseX !== -1 && this.mouseY !== -1
        ? [{ cx: this.mouseX, cy: this.mouseY }]
        : []),
      ...(boundDisplay && (this.quantity > 1 || !this.isHeld)
        ? [{ cx: this.x, cy: this.y }]
        : []),
    ];

    coords.forEach(({cx, cy}) => {
      this.p.fill(this.locked ? getColorValueById(11) : this.colorOption.value);
      this.p.strokeWeight(Piece.blockSize * scaleX * currentPieceRatio/10);
      this.p.stroke(150);
      for (let [dx, dy] of this.shape) {
        const x = cx + dx * Piece.blockSize * scaleX * currentPieceRatio + offsetX;
        const y = cy + dy * Piece.blockSize * scaleY * currentPieceRatio + offsetY;
        this.p.rect(x, y, Piece.blockSize * scaleX * currentPieceRatio, Piece.blockSize * scaleY * currentPieceRatio);
      }
    });
  }
}