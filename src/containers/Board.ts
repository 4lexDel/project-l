import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PuzzleFactory } from "../objects/PuzzleFactory";

export class Board extends BaseContainer {
    private heightRatio: number;

    constructor(p: p5, heightRatio: number) {
        super(p, -1, -1, -1, -1);
        this.heightRatio = heightRatio;

        // this.puzzles = PuzzleFactory.createBasicWhitePuzzleStack(p);
        this.puzzles = PuzzleFactory.createBasicBlackPuzzleStack(p);

        this.resize();
    }
    
    private initPuzzles(): void {
        // Layout parameters
        const puzzleDimension = this.puzzles[0].getDimensions();
        const padding = 10; // gap between puzzles
        const numRows = 3;
        const numCols = Math.ceil(this.puzzles.length / numRows);

        const totalPaddingX = padding * (numCols - 1);
        const totalPaddingY = padding * (numRows - 1);

        const puzzleTotalWidth = puzzleDimension.width * numCols + totalPaddingX;
        const puzzleTotalHeight = puzzleDimension.height * numRows + totalPaddingY;

        // Center the grid in the container
        const startX = this.x + (this.dx - puzzleTotalWidth) / 2;
        const startY = this.y + (this.dy - puzzleTotalHeight) / 2;

        for (let i = 0; i < this.puzzles.length; i++) {
            const row = Math.floor(i / numCols);
            const col = i % numCols;
            this.puzzles[i].x = startX + col * (puzzleDimension.width + padding);
            this.puzzles[i].y = startY + row * (puzzleDimension.height + padding);
        }
    }

    public resize(): void {
        this.x = 0;
        this.y = 0;

        this.dx = this.p.width;
        this.dy = this.p.height * this.heightRatio;

        this.initPuzzles();
    }

    public draw(): void {
        super.draw();
        this.drawPuzzles();
    }

    private drawPuzzles(): void {
        for (const puzzle of this.puzzles) {
            puzzle.draw();
        }
    }
}