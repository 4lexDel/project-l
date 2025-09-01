import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { Piece } from "../objects/Piece";
export class Game {
    public p: p5;

    public deck: Deck;
    public board: Board;

    constructor(p: p5) {
        this.p = p;

        const deckHeight = p.height / 3;
        const boardHeight = p.height - deckHeight;

        this.deck = new Deck(p, 0, boardHeight, p.width, deckHeight);
        this.board = new Board(p, 0, 0, p.width, boardHeight);

        // 1-block
        // 2-block
        // 3-block
        // 4-block
        // Square
        // L-block (3*2)
        // Zigzag
        // Corner (2*2)
        // Small T (2*3)

        this.deck.pieces = [
            Piece.create1block(p),
            Piece.create2block(p),
            Piece.create3block(p),
            Piece.create4block(p),
            Piece.createSquare(p),
            Piece.createLblock(p),
            Piece.createZigzag(p),
            Piece.createCorner(p),
            Piece.createSmallT(p),
        ];
    }

    public resize(): void {
        this.deck.dx = this.p.width;
        this.deck.dy = this.p.height / 3;
        this.board.dx = this.p.width;
        this.board.dy = this.p.height - this.deck.dy;
    }

    public draw(): void {
        this.deck.draw();
        this.board.draw();
    }
}