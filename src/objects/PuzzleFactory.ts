import p5 from "p5";
import { PieceFactory } from "./PieceFactory";
import { Puzzle } from "./Puzzle";

export class PuzzleFactory {
    static createBasicWhitePuzzleStack(p: p5, nbRandomPuzzles: number): Puzzle[] {
        const source = [
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                2,
                PieceFactory.create2block(p),
                false
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
                PieceFactory.createCorner(p),
                false
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
                PieceFactory.create3block(p),
                false
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
                PieceFactory.createZigzag(p),
                false
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
                PieceFactory.create4block(p),
                false
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
                PieceFactory.createLblock(p),
                false
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
                PieceFactory.createSquare(p),
                false
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
                PieceFactory.createSmallT(p),
                false
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
                PieceFactory.create1block(p),
                false
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
                PieceFactory.create2block(p),
                false
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
                PieceFactory.create2block(p),
                false
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
                PieceFactory.create2block(p),
                false
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
                PieceFactory.createCorner(p),
                false
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
                PieceFactory.createCorner(p),
                false
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
                PieceFactory.create3block(p),
                false
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
                PieceFactory.create3block(p),
                false
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
                PieceFactory.createZigzag(p),
                false
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
                PieceFactory.create4block(p),
                false
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
                PieceFactory.createLblock(p),
                false
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
                PieceFactory.createSquare(p),
                false
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
                PieceFactory.createSmallT(p),
                false
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
                PieceFactory.create2block(p),
                false
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
                PieceFactory.create2block(p),
                false
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
                PieceFactory.createCorner(p),
                false
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
                PieceFactory.createCorner(p),
                false
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
                PieceFactory.create3block(p),
                false
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
                PieceFactory.create3block(p),
                false
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
                PieceFactory.createZigzag(p),
                false
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
                PieceFactory.create4block(p),
                false
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
                PieceFactory.createLblock(p),
                false
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
                PieceFactory.createSquare(p),
                false
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
                PieceFactory.createSmallT(p),
                false
            )
        ];

        // Shuffle it
        source.sort(() => Math.random() - 0.5);

        return source.slice(0, nbRandomPuzzles);
    }

    static createBasicBlackPuzzleStack(p: p5, nbRandomPuzzles: number): Puzzle[] {
        const source = [
            new Puzzle(p, -1, -1,
                [
                    [0, 0, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1],
                    [0, 1, 1, 0, 0],
                ],
                5,
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create1block(p),
                true
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
                PieceFactory.create2block(p),
                true
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
                PieceFactory.create2block(p),
                true
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
                PieceFactory.createCorner(p),
                true
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
                PieceFactory.createCorner(p),
                true
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
                PieceFactory.create3block(p),
                true
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
                PieceFactory.create3block(p),
                true
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
                PieceFactory.create2block(p),
                true
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
                PieceFactory.createCorner(p),
                true
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
                PieceFactory.create3block(p),
                true
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
                PieceFactory.createZigzag(p),
                true
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
                PieceFactory.create4block(p),
                true
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
                PieceFactory.createLblock(p),
                true
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
                PieceFactory.createSquare(p),
                true
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
                PieceFactory.createSmallT(p),
                true
            )
        ];

        // Shuffle it
        source.sort(() => Math.random() - 0.5);

        return source.slice(0, nbRandomPuzzles);
    }
}