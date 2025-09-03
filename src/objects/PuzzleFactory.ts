import p5 from "p5";
import { PieceFactory } from "./PieceFactory";
import { Puzzle } from "./Puzzle";

export class PuzzleFactory {
    static createBasicWhitePuzzleStack(p: p5): Puzzle[] {
        return [
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 0, 0, 0],
                ],
                2,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 1, 0],
                ],
                2,
                PieceFactory.createZigzag(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 1, 0],
                ],
                2,
                PieceFactory.create4block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                ],
                2,
                PieceFactory.createLblock(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.createSquare(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.createSmallT(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.createZigzag(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create4block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.createLblock(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                ],
                1,
                PieceFactory.createSquare(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.createSmallT(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                1,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createZigzag(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                ],
                0,
                PieceFactory.create4block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createLblock(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createSquare(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                ],
                0,
                PieceFactory.createSmallT(p)
            )
        ];
    }

    static createBasicBlackPuzzleStack(p: p5): Puzzle[] {
        return [
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 0, 0],
                ],
                5,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1],
                    [1, 1, 1, 1, 0],
                ],
                5,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                ],
                5,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1],
                    [1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                ],
                5,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 0],
                ],
                5,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                ],
                4,
                PieceFactory.create1block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1],
                ],
                4,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1],
                ],
                4,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                ],
                4,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1],
                ],
                4,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 1],
                ],
                4,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1],
                    [0, 0, 1, 1, 1],
                    [0, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                ],
                4,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [1, 1, 1, 1, 1],
                ],
                3,
                PieceFactory.create2block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [1, 1, 1, 0, 0],
                    [1, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.createCorner(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.create3block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [1, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.createZigzag(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0],
                ],
                3,
                PieceFactory.create4block(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.createLblock(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.createSquare(p)
            ),
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                ],
                3,
                PieceFactory.createSmallT(p)
            )
        ];
    }
}