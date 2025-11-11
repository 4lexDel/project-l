import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";
import { Piece } from "../objects/Piece";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { PieceInventory } from "./inventory/PieceInventory";

export class Opponent extends BaseContainer {
    private pieceInventory: PieceInventory;

    public pieces: Piece[];

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        this.pieces = [
            PieceFactory.create1block(p),
            PieceFactory.create1block(p),
            PieceFactory.create1block(p)
        ];
        this.pieceInventory = new PieceInventory(
            p, 
            this.pieces, 
            20,
            1,
            0.5,
            1,
            "CENTER",
            "CENTER",
            this
        );

        this.resize();
    }

    public resize() {
        super.resize();

        this.pieceInventory.resize();
    }

    public draw(): void {
        super.draw();
        // Pieces
        this.pieceInventory.draw();
    }
}