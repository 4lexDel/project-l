import p5 from "p5";
import { BaseModal } from "./BaseModal";
import type { HorizontalAlign, VerticalAlign } from "../../containers/BaseContainer";
import { RegisterDraw } from "../DrawDecorator";

export class PieceModal extends BaseModal {
    public onMirrorClicked?: (() => void);
    public onRotateClicked?: (() => void);

    hoverOnMirrorButton: boolean = false;
    hoverOnRotateButton: boolean = false;

    constructor(p: p5, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP") {
        super(p, horizontalAlign, verticalAlign);
    }

    protected initEvents() {
        super.initEvents();

        this.eventHandler.addEventMouseReleased(this.identifier, () => {
            let coords = this.getCoordsOrigin();

            if (
                this.p.mouseX >= coords.x + BaseModal.padding && this.p.mouseX <= coords.x + this.width / 2 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            ) {
                this.onMirrorClicked?.();
            } else if ( 
                this.p.mouseX >= coords.x + this.width / 2 && this.p.mouseX <= coords.x + this.width - BaseModal.padding &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            ) {
                this.onRotateClicked?.();
            } 
            
            this.close();
        }, 1);

        this.eventHandler.addEventMouseMoved(this.identifier, () => {
            let coords = this.getCoordsOrigin();

            this.hoverOnMirrorButton = (
                this.p.mouseX >= coords.x && this.p.mouseX <= coords.x + this.width / 2 &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            );
            this.hoverOnRotateButton = (
                this.p.mouseX >= coords.x + this.width / 2 && this.p.mouseX <= coords.x + this.width &&
                this.p.mouseY >= coords.y && this.p.mouseY <= coords.y + this.height
            );            
        }, 1);
    }

    @RegisterDraw(0)
    public draw() {
        super.draw();
        if (this.isVisible) {
            this.drawMirror();
            this.drawRotate();
        }
    }

    private drawMirror() {
        const { x: cx, y: cy } = this.getCoordsOrigin();

        // Highlight
        this.p.noStroke();
        if (this.hoverOnMirrorButton) {
            this.p.fill(200);
            this.p.rect(cx + BaseModal.padding/2, cy + BaseModal.padding/2, this.width/2 - BaseModal.padding, this.height - BaseModal.padding, 5);
        }

        this.p.strokeWeight(this.p.width / 800);

        this.p.stroke(0);
        this.p.fill(150);
        this.p.triangle(
            cx + BaseModal.padding, cy + BaseModal.padding,
            cx + this.width / 4 - BaseModal.padding/2, cy + this.height / 2,
            cx + BaseModal.padding, cy + this.height - BaseModal.padding
        );
        this.p.triangle(
            cx + this.width / 2 - BaseModal.padding, cy + BaseModal.padding,
            cx + this.width / 4 + BaseModal.padding/2, cy + this.height / 2,
            cx + this.width / 2 - BaseModal.padding, cy + this.height - BaseModal.padding
        );

        this.p.line(
            cx + this.width / 4, cy + BaseModal.padding,
            cx + this.width / 4, cy + this.height - BaseModal.padding
        );
    }

    private drawRotate() {
        const { x: cx, y: cy } = this.getCoordsOrigin();

        // Highlight
        this.p.noStroke();
        if (this.hoverOnRotateButton) {
            this.p.fill(200);
            this.p.rect(cx + this.width/2 + BaseModal.padding/2, cy + BaseModal.padding/2, this.width/2 - BaseModal.padding, this.height - BaseModal.padding, 5);
        }

        this.p.strokeWeight(this.p.width / 800);

        // Arc
        this.p.stroke(0);
        this.p.noFill();
        this.p.arc(
            cx + 3 * this.width / 4, cy + this.height / 2,
            this.width / 2 - BaseModal.padding * 2,
            this.height - BaseModal.padding * 2,
            this.p.HALF_PI, this.p.HALF_PI + this.p.PI * 1.5
        );

        // Arrowhead
        let a = this.p.HALF_PI + this.p.PI * 1.5,
            rx = (this.width / 2 - BaseModal.padding * 2) / 2,
            ry = (this.height - BaseModal.padding * 2) / 2,
            cx0 = cx + 3 * this.width / 4,
            cy0 = cy + this.height / 2,
            ex = cx0 + rx * Math.cos(a),
            ey = cy0 + ry * Math.sin(a);

        let tx = -rx * Math.sin(a), ty = ry * Math.cos(a),
            m = Math.hypot(tx, ty); tx /= m; ty /= m;     // tangent unit
        let px = -ty, py = tx, s = 10;               // perpendicular + size

        this.p.fill(150);
        this.p.triangle(
            ex + tx * s, ey + ty * s,
            ex - tx * s * 0.5 + px * s * 0.5, ey - ty * s * 0.5 + py * s * 0.5,
            ex - tx * s * 0.5 - px * s * 0.5, ey - ty * s * 0.5 - py * s * 0.5
        );
    }
}