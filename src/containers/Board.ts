import p5 from "p5";
import { BaseContainer } from "./BaseContainer";

export class Board extends BaseContainer {
    constructor(p: p5, x: number, y: number, dx: number, dy: number) {
        super(p, x, y, dx, dy);
    }
}