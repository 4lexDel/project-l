import p5 from "p5";
import { BaseObject } from "../objects/BaseObject";
import type { Piece } from "../objects/Piece";
import type { Puzzle } from "../objects/Puzzle";

export class BaseContainer extends BaseObject {
    public pieces: Piece[];
    public puzzles: Puzzle[];

    public dx: number;
    public dy: number;

    constructor(p: p5, x: number, y: number, dx: number, dy: number) {
        super(p, x, y);
        this.pieces = [];
        this.puzzles = [];
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        // draw a simple rect without background (border only small one 2 weight black)
        this.p.strokeWeight(2);
        this.p.stroke(50);
        this.p.noFill();
        this.p.rect(this.x, this.y, this.dx, this.dy);
    }
}