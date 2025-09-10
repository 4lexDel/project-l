import p5 from 'p5';

export class BaseObject {
    public p: p5;
    public x: number;
    public y: number;

    public blockSize = 20;

    public isHeld: boolean = false;

    public mouseX: number = -1;
    public mouseY: number = -1;

    constructor(p: p5, x: number, y: number) {
        this.p = p;
        this.x = x;
        this.y = y;
    }
}