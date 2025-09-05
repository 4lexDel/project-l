import p5 from "p5";
import { Piece } from "./Piece";

export class PieceFactory {
    static createAllPieces(p: p5): Piece[] {
        return [
            this.create1block(p),
            this.create2block(p),
            this.create3block(p),
            this.create4block(p),
            this.createSquare(p),
            this.createLblock(p),
            this.createZigzag(p),
            this.createCorner(p),
            this.createSmallT(p)
        ];
    }

    static create1block(p: p5): Piece {
        return new Piece(p, [[0, 0]], p.color(255, 210, 100), 1);
    }

    static create2block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0]], p.color(0, 255, 0), 2);
    }

    static create3block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0]], p.color(0, 120, 255), 3);
    }

    static create4block(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0], [3, 0]], p.color(150, 0, 200), 4);
    }

    static createSquare(p: p5): Piece {
        return new Piece(p, [[0, 0], [0, 1], [1, 1], [1, 0]], p.color(200, 0, 0), 4);
    }

    static createLblock(p: p5): Piece {
        return new Piece(p, [[0, 0],[1, 0], [2, 0], [2, 1]], p.color(0, 255, 255), 4);
    }

    static createZigzag(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [1, 1], [2, 1]], p.color(255, 90, 0), 4);
    }

    static createCorner(p: p5): Piece {
        return new Piece(p, [[0, 0], [0, 1], [1, 0]], p.color(255, 170, 0), 3);
    }

    static createSmallT(p: p5): Piece {
        return new Piece(p, [[0, 0], [1, 0], [2, 0], [1, 1]], p.color(220, 80, 150), 4);
    }
}