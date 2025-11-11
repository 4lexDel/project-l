import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { PieceInventory } from "./inventory/PieceInventory";
import { Board } from "./Board";
import { PuzzleInventory } from "./inventory/PuzzleInventory";
import { Puzzle } from "../objects/Puzzle";
import Utils from "../tools/Utils";

export class Opponent extends BaseContainer {
    private pieceInventory: PieceInventory;
    private puzzleInventory: PuzzleInventory;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        this.puzzleInventory = new PuzzleInventory(p, [], 1, 1, 0.2, 1, "LEFT", "CENTER", this);

        const pieces = [
            PieceFactory.create1block(p),
            PieceFactory.create1block(p),
            PieceFactory.create1block(p)
        ];
        this.pieceInventory = new PieceInventory(
            p, 
            pieces, 
            20,
            1,
            0.8,
            1,
            "RIGHT",
            "CENTER",
            this
        );

        this.resize();
    }

    public async playMove(board: Board) {
        await Utils.pause(3000);

        const locks = board.getLocks();
        const indexsUnlocked = locks.map((lock, index) => lock.quantity <= 0 ? index : -1).filter(index => index !== -1);

        if (!indexsUnlocked.length) {
            board.removeOneLockFromEachColumn();
            await Utils.pause(500);
            return;
        }

        const puzzleGrid = board.getPuzzleGrid();
        const puzzlesAvailable = puzzleGrid.items.map((puzzle, index) => {
            return indexsUnlocked.some(i => i === index%3) ? { puzzle, index } : null
        }).filter(item => item !== null) as { puzzle: Puzzle, index: number }[];
        
        // 1 Find the puzzle to take (highest score)
        const puzzleToTake = puzzlesAvailable
            .sort((a, b) => {
            const scoreDiff = b.puzzle.getPointsReward() - a.puzzle.getPointsReward();
            return scoreDiff !== 0 ? scoreDiff : a.index - b.index; // if scores equal, lower index first
        })[0];

        if (!puzzleToTake) return;

        this.puzzleInventory.addItems(puzzleToTake.puzzle);
        puzzleGrid.removeItem(puzzleToTake.puzzle);
        board.refreshPuzzleDistribution("replace");

        // 2 Update the locks (column used)
        board.updateLocksColumnUsed(puzzleToTake.index%3, this.pieceInventory.items.length);
        // Clear inventory
        this.pieceInventory.clearInventory();

        await Utils.pause(1000);
        return;
    }

    public resize() {
        super.resize();

        this.pieceInventory.resize();
        this.puzzleInventory.resize();
    }

    public draw(): void {
        super.draw();
        // Pieces
        this.pieceInventory.draw();
        // Puzzles
        this.puzzleInventory.draw();
    }
}