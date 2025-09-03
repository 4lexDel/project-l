import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PuzzleFactory } from "../objects/PuzzleFactory";

export class Board extends BaseContainer {
    private heightRatio: number;

    numRows: number = 3;
    numCols: number = 3;

    padding: number = 10;

    totalPaddingX: number = this.padding * (this.numCols - 1);
    totalPaddingY: number = this.padding * (this.numRows - 1);

    constructor(p: p5, heightRatio: number) {
        super(p, -1, -1, -1, -1);
        this.heightRatio = heightRatio;

        // create an array that contain first 15 random createBasicWhitePuzzleStack puzzles then 10 random createBasicBlackPuzzleStack puzzles
        this.puzzles = [
            ...PuzzleFactory.createBasicWhitePuzzleStack(p, 15),
            ...PuzzleFactory.createBasicBlackPuzzleStack(p, 10)
        ];

        this.resize();
    }
    
    private initPuzzles(): void {
        // Layout parameters
        const puzzleDimension = this.puzzles[0].getDimensions();

        const puzzleTotalWidth = puzzleDimension.width * this.numCols + this.totalPaddingX;
        const puzzleTotalHeight = puzzleDimension.height * this.numRows + this.totalPaddingY;

        // Center the grid in the container
        const startX = this.x + (this.dx - puzzleTotalWidth) / 2;
        const startY = this.y + (this.dy - puzzleTotalHeight) / 2;

        for (let i = 0; i < this.numRows * this.numCols; i++) {
            const row = Math.floor(i / this.numCols);
            const col = i % this.numCols;
            this.puzzles[i].x = startX + col * (puzzleDimension.width + this.padding);
            this.puzzles[i].y = startY + row * (puzzleDimension.height + this.padding);
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
        this.drawPuzzleStack();
        this.drawPuzzles();
    }

    private drawPuzzleStack(): void {
        const puzzleDimension = this.puzzles[0].getDimensions();

        // Stack rect
        this.p.fill(this.puzzles[9].isBlack ? 50 : 200);
        this.p.rect(this.x + this.dx - puzzleDimension.height * 2,
            this.y + this.dy / 2 - puzzleDimension.width / 2,
            puzzleDimension.height,
            puzzleDimension.width,
            5
        );

        // Stack text
        this.p.fill(this.puzzles[9].isBlack ? 200 : 50);
        this.p.strokeWeight(0.8);
        this.p.textSize(15);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text("Puzzle stack", this.x + this.dx - puzzleDimension.height * 2 + puzzleDimension.height / 2,
            this.y + this.dy / 2 - puzzleDimension.width / 2 + puzzleDimension.width / 2
        );

        // Number of remaining puzzles
        this.p.fill(255, 0, 0);
        this.p.ellipse(this.x + this.dx - puzzleDimension.height * 2 + puzzleDimension.height - 10,
            this.y + this.dy / 2 - puzzleDimension.width / 2 + 10,
            35,
            35
        );
        this.p.fill(255);
        this.p.strokeWeight(0.8);
        this.p.textSize(20);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.puzzles.length - 9, this.x + this.dx - puzzleDimension.height * 2 + puzzleDimension.height - 10,
            this.y + this.dy / 2 - puzzleDimension.width / 2 + 10
        );
    }

    private drawPuzzles(): void {
        for (let i = 0; i < this.numRows * this.numCols; i++) {
            this.puzzles[i].draw();
        }
    }
}