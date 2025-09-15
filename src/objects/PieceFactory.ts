import p5 from "p5";
import { Piece } from "./Piece";
import { COLORS } from "../colors";

export class PieceFactory {
    static createAllPieces(p: p5): Piece[] {
        return [
            this.create1block(p),
            this.create2block(p),
            this.create3block(p),
            this.createCorner(p),
            this.create4block(p),
            this.createSquare(p),
            this.createLblock(p),
            this.createZigzag(p),
            this.createSmallT(p)
        ];
    }

    static create1block(p: p5): Piece {
        return new Piece(p, [[0, 0]], COLORS.yellow, 1);
    }

    static create2block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0]], COLORS.green, 2);
    }

    static create3block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0]], COLORS.blue, 3);
    }
    
    static createCorner(p: p5): Piece {
        return new Piece(p, [[0, 0], [0, 1], [1, 0]], COLORS.orange, 3);
    }

    static create4block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0], [3, 0]], COLORS.purple, 4);
    }

    static createSquare(p: p5): Piece {
        return new Piece(p, [[0, 0], [0, 1], [1, 1], [1, 0]], COLORS.red, 4);
    }

    static createLblock(p: p5): Piece {
        return new Piece(p, [[0, 0],[1, 0], [2, 0], [2, 1]], COLORS.cyan, 4);
    }

    static createZigzag(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [1, 1], [2, 1]], COLORS.clay, 4);
    }

    static createSmallT(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0], [1, 1]], COLORS.pink, 4);
    }
}