import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PuzzleFactory } from "../objects/PuzzleFactory";
import { Puzzle } from "../objects/Puzzle";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";

export class Board extends BaseContainer {
    private puzzles: Puzzle[];

    private numRows: number = 3;
    private numCols: number = 3;

    private padding: number = 10;
    private totalPaddingX: number = (this.numRows + 1) * this.padding
    private totalPaddingY: number = (this.numCols + 1) * this.padding

    private puzzleWidth!: number;
    private puzzleHeight!: number;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);
        this.heightRatio = heightRatio;

        // create an array that contain first 15 random createBasicWhitePuzzleStack puzzles then 10 random createBasicBlackPuzzleStack puzzles
        this.puzzles = [
            ...PuzzleFactory.createBasicWhitePuzzleStack(p, 15),
            ...PuzzleFactory.createBasicBlackPuzzleStack(p, 10)
        ];

        this.resize();
    }

    public resize(): void {
        super.resize();

        this.puzzleWidth = Math.min(
            ((this.dx / 2) - this.totalPaddingX) / this.numRows,
            ((this.dy - this.totalPaddingY) / this.numCols) / Puzzle.puzzleDimRatio
        );
        this.puzzleHeight = this.puzzleWidth * Puzzle.puzzleDimRatio;

        this.initPuzzles();
    }
    
    private initPuzzles(): void {
        const puzzleTotalWidth = this.puzzleWidth * this.numCols + this.totalPaddingX;
        const puzzleTotalHeight = this.puzzleHeight * this.numRows + this.totalPaddingY;

        // Center the grid in the container
        const startX = this.x + this.padding + (this.dx - puzzleTotalWidth) / 2;
        const startY = this.y + this.padding + (this.dy - puzzleTotalHeight) / 2;

        for (let i = 0; i < this.numRows * this.numCols; i++) {
            const row = Math.floor(i / this.numCols);
            const col = i % this.numCols;
            this.puzzles[i].x = startX + col * (this.puzzleWidth + this.padding);
            this.puzzles[i].y = startY + row * (this.puzzleHeight + this.padding);
        }
    }

    public draw(): void {
        super.draw();
        this.drawPuzzleStack();
        this.drawPuzzles();
    }

    private drawPuzzleStack(): void {
        // Stack rect
        this.p.fill(this.puzzles[9].isBlack ? 50 : 200);
        this.p.rect(this.x + this.dx - this.puzzleHeight - this.padding,
            this.y + this.dy / 2 - this.puzzleWidth / 2,
            this.puzzleHeight,
            this.puzzleWidth,
            5
        );

        // Stack text
        this.p.fill(this.puzzles[9].isBlack ? 200 : 50);
        this.p.strokeWeight(0.8);
        this.p.textSize(this.puzzleWidth/7);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text("Puzzle stack", this.x + this.dx - this.puzzleHeight - this.padding + this.puzzleHeight / 2,
            this.y + this.dy / 2 - this.puzzleWidth / 2 + this.puzzleWidth / 2
        );

        // Number of remaining puzzles
        this.p.fill(255, 0, 0);
        this.p.ellipse(this.x + this.dx - this.puzzleHeight - 10,
            this.y + this.dy / 2 - this.puzzleWidth / 2 + 10,
            this.puzzleWidth/5,
            this.puzzleWidth/5
        );
        this.p.fill(255);
        this.p.strokeWeight(0.8);
        this.p.textSize(this.puzzleWidth/8);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.puzzles.length - 9, this.x + this.dx - this.puzzleHeight - 10,
            this.y + this.dy / 2 - this.puzzleWidth / 2 + 10
        );
    }

    private drawPuzzles(): void {
        for (let i = 0; i < this.numRows * this.numCols; i++) {
            // The ratio maxY / maxX must be equal to 1.241
            this.puzzles[i].draw({ maxX: this.puzzleWidth, maxY: this.puzzleHeight });
        }
    }
}