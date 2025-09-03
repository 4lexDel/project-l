import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";
import { Piece } from "../objects/Piece";
import { PieceInventory } from "./PieceInventory";
import { PuzzleFactory } from "../objects/PuzzleFactory";
import { Puzzle } from "../objects/Puzzle";

export class Deck extends BaseContainer {
    private pieceInventory: PieceInventory;

    public pieces: Piece[];
    public puzzles: Puzzle[];

    constructor(p: p5, heightRatio: number) {
        super(p, 1, heightRatio, "LEFT", "BOTTOM");

        this.pieces = [
            PieceFactory.create1block(p),
            PieceFactory.create2block(p),
            PieceFactory.create3block(p),
            PieceFactory.create4block(p),
            PieceFactory.createSquare(p),
            PieceFactory.createLblock(p),
            PieceFactory.createZigzag(p),
            PieceFactory.createCorner(p),
            PieceFactory.createSmallT(p),
        ];
 
        this.pieceInventory = new PieceInventory(
            p, 
            this.pieces, 
            0.5,
            heightRatio,
            "LEFT",
            "BOTTOM"
        );

        this.puzzles = PuzzleFactory.createBasicWhitePuzzleStack(p, 4);

        this.resize();
    }

    public resize() {
        super.resize();

        this.pieceInventory.resize();
    }

    public draw(): void {
        super.draw();

        // Puzzles
        // ...

        // Pieces
        this.pieceInventory.draw();
    }
}

// private drawPuzzleInventory() {
//         // COMING SOON
//     }

//     private drawPuzzles() {
//         // COMING SOON
//     }