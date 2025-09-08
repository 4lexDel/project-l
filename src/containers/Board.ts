import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PuzzleFactory } from "../objects/PuzzleFactory";
import { Puzzle } from "../objects/Puzzle";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { Piece } from "../objects/Piece";
import { PieceFactory } from "../objects/PieceFactory";

export class Board extends BaseContainer {
    private padding: number = 10;

    private puzzles: Puzzle[];
    private pieceStacks: { piece: Piece, quantity: number }[] = [];

    // Puzzle configuration
    private numRows: number = 3;
    private numCols: number = 3;

    private totalPaddingX: number = (this.numRows + 2) * this.padding;
    private totalPaddingY: number = (this.numCols + 2) * this.padding;

    private puzzleWidth!: number;
    private puzzleHeight!: number;

    private puzzleTotalWidth!: number;
    private puzzleTotalHeight!: number;

    // Locks
    private locks: number[] = [1, 2, 1]; 
    private lockAreaHeight: number = 20;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);
        this.heightRatio = heightRatio;

        // create an array that contain first 15 random createBasicWhitePuzzleStack puzzles then 10 random createBasicBlackPuzzleStack puzzles
        this.puzzles = [
            ...PuzzleFactory.createBasicWhitePuzzleStack(p, 15),
            ...PuzzleFactory.createBasicBlackPuzzleStack(p, 10)
        ];

        this.pieceStacks = PieceFactory.createAllPieces(p).map(piece => ({ piece, quantity: 10 }));

        this.resize();
    }

    public resize(): void {
        super.resize();

        this.puzzleWidth = Math.min(
            ((this.dx / 2) - this.totalPaddingX) / this.numRows,
            ((this.dy - this.totalPaddingY - this.lockAreaHeight) / this.numCols) / Puzzle.puzzleDimRatio
        );
        this.puzzleHeight = this.puzzleWidth * Puzzle.puzzleDimRatio;

        this.puzzleTotalWidth = this.puzzleWidth * this.numCols + this.totalPaddingX;
        this.puzzleTotalHeight = this.puzzleHeight * this.numRows + this.totalPaddingY + this.lockAreaHeight;

        this.initPuzzles();
    }
    
    private initPuzzles(): void {
        // Center the grid in the container
        const startX = this.x + 2 * this.padding + (this.dx - this.puzzleTotalWidth) / 4;
        const startY = this.y + 2 * this.padding + this.lockAreaHeight + (this.dy - this.puzzleTotalHeight) / 2;

        for (let i = 0; i < this.numRows * this.numCols; i++) {
            const row = Math.floor(i / this.numCols);
            const col = i % this.numCols;
            this.puzzles[i].x = startX + col * (this.puzzleWidth + this.padding);
            this.puzzles[i].y = startY + row * (this.puzzleHeight + this.padding);
        }
    }

    public draw(): void {
        super.draw();
        this.drawPuzzles();
        this.drawLocks();
        this.drawStacks();
    }

    private drawCounter(x: number, y: number, count: number, ratio: number = 1): void {
        this.p.fill(255, 0, 0);
        this.p.ellipse(x, y, ratio * this.puzzleWidth / 4, ratio * this.puzzleWidth / 4);
        this.p.fill(255);
        this.p.strokeWeight(0.8);
        this.p.textSize(ratio * this.puzzleWidth / 6);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(count, x, y);
    }

    private drawPuzzleStack(startY: number): void {
        // Stack rect
        this.p.fill(this.puzzles[9].isBlack ? 50 : 200);
        this.p.rect(this.x + this.dx - this.puzzleHeight - this.padding,
            startY,
            this.puzzleHeight,
            this.puzzleWidth,
            5
        );

        // Stack text
        this.p.fill(this.puzzles[9].isBlack ? 200 : 50);
        this.p.strokeWeight(0.8);
        this.p.textSize(this.puzzleWidth/6);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text("Puzzles stack", this.x + this.dx - this.puzzleHeight - this.padding + this.puzzleHeight / 2,
            startY + this.puzzleWidth / 2
        );

        // Number of remaining puzzles
        this.drawCounter(
            this.x + this.dx - this.puzzleHeight - 10,
            startY + 5,
            this.puzzles.length - 9
        );
    }

    private drawPuzzles(): void {
        for (let i = 0; i < this.numRows * this.numCols; i++) {
            // The ratio maxY / maxX must be equal to 1.241
            this.puzzles[i].draw({ maxX: this.puzzleWidth, maxY: this.puzzleHeight });
        }
    }

    private drawLocks(): void {
        // Center the grid in the container
        const startX = this.x + 2 * this.padding + (this.dx - this.puzzleTotalWidth + 2 * this.puzzleWidth) / 4;
        const startY = this.y + this.padding + this.lockAreaHeight/2 + (this.dy - this.puzzleTotalHeight) / 2;

        const lockSize = this.puzzleWidth/8;
        const lockDistFromCenter = this.puzzleWidth/8;
        const lockBorder = this.puzzleWidth/200;

        this.p.strokeWeight(lockBorder);
        this.p.stroke(100);
        this.p.fill(255, 210, 100);

        for (let i = 0; i < this.locks.length; i++) {
            const cx = startX + i * (this.puzzleWidth + this.padding);
            const quantity = this.locks[i];

            for (let j = 0; j < quantity; j++) {
                let angle = 2*Math.PI * j / quantity;
                let ex = cx + (quantity < 2 ? 0 : 1) * Math.cos(angle) * lockDistFromCenter;
                let ey = startY + (quantity < 2 ? 0 : 1) * Math.sin(angle) * lockDistFromCenter;
                this.p.rect(ex - lockSize/2, ey - lockSize/2, lockSize, lockSize);
            }
        }
    }

    private drawStacks(): void {
        // Draw 3x3 grid of piece stacks, centered vertically
        const gridRows = 3;
        const gridCols = 3;
        const pieceW = this.puzzleWidth / 2;
        const pieceH = this.puzzleHeight / 2;

        const totalGridWidth = gridCols * pieceW + (gridCols - 1) * this.padding;
        const totalGridHeight = gridRows * pieceH + (gridRows - 1) * this.padding;
        const startX = this.x + this.dx - totalGridWidth - 2 * this.padding;
        const startY = this.y + (this.dy - totalGridHeight + this.puzzleWidth) / 2 + 2 * this.padding;

        this.drawPuzzleStack(startY - this.puzzleWidth - 2 * this.padding);

        let pieceIndex = 0;
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
            if (pieceIndex >= this.pieceStacks.length) break;
            const { piece, quantity } = this.pieceStacks[pieceIndex++];
            piece.x = startX + col * (pieceW + this.padding);
            piece.y = startY + row * (pieceH + this.padding);
            piece.draw({ maxX: pieceW, maxY: pieceH });
            // Draw the counter at the top-right corner of the piece
            this.drawCounter(
                piece.x + pieceW - pieceW / 6,
                piece.y + pieceH / 6,
                quantity,
                0.8
            );
            }
        }
    }
}