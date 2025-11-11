import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { COLORS } from "../colors";
import { TextNotification } from "../tools/TextNotification";

export class ActionHelper extends BaseContainer {
    private padding: number = 10;

    private title: string = "Actions helper";
    private titleSize!: number;

    private subtitle: string = "Remaining moves: ";
    private subtitleSize!: number;

    private actionTexts: { text: string, limited: boolean }[] = [
        { text: "* Take a tier 1 piece", limited: false },
        { text: "* Upgrade a piece", limited: false },
        { text: "* Take a puzzle", limited: false },
        { text: "* Place a piece", limited: false },
        { text: "* Realise a master action", limited: true }
    ];

    private nbMoveAvailableMax: number = 3;
    private nbMoveAvailable: number = this.nbMoveAvailableMax;

    private masterActionUsed: boolean = true;

    private textNotification: TextNotification;

    public onPlayerSwitch?: (whoTurn: "player" | "opponent") => void;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        this.textNotification = new TextNotification(p);

        this.resize();
    }

    public decreaseMoveAvailable() {
        this.nbMoveAvailable--;
        if (this.nbMoveAvailable <= 0) {
            this.nbMoveAvailable = 0;
            // Switch turn to opponent
            this.onPlayerSwitch?.("opponent");
            setTimeout(() => {
                this.textNotification.show("Opponent turn", this.p.color(50, 50, 255), 1000);
            }, 1000);
        }
    }

    public switchToPlayerTurn() {
        this.nbMoveAvailable = this.nbMoveAvailableMax;
        this.masterActionUsed = false;
        this.onPlayerSwitch?.("player");
        setTimeout(() => {
            this.textNotification.show("Player turn", this.p.color(255, 0, 50), 1000);
        }, 1000);
    }

    public resize() {
        super.resize();

        this.textNotification.resize();

        this.titleSize = this.dx / 10;
        this.subtitleSize = this.dx / 15;
    }

    public draw(): void {
        super.draw();
        // Draw action helper
        this.drawActionHelper();

        this.textNotification.draw();
    }

    public drawActionHelper(): void {
        // Container
        this.p.fill(50);
        this.p.rect(this.x + this.padding, this.y + this.padding, this.dx - this.padding * 2, this.dy - this.padding * 2, 5);
        this.p.noStroke();

        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        
        // Title
        this.p.fill(200);
        this.p.textSize(this.titleSize);
        this.p.text(this.title, this.x + this.dx/2, this.y + 4 * this.padding);

        // Add a horizontal line
        this.p.stroke(200);
        this.p.strokeWeight(2);
        this.p.line(this.x + 2 * this.padding, this.y + 6 * this.padding, this.x + this.dx - 2 * this.padding, this.y + 6 * this.padding);
        this.p.noStroke();

        // Subtitle
        this.p.fill(COLORS.green.value);
        this.p.textSize(this.subtitleSize);
        this.p.text(`${this.subtitle} ${this.nbMoveAvailable}/${this.nbMoveAvailableMax}`, this.x + this.dx/2, this.y + 8 * this.padding);

        // Actions list
        this.p.fill(200);
        this.p.textAlign(this.p.LEFT, this.p.CENTER);
        const actionTextSize = this.subtitleSize * 0.8;
        this.p.textSize(actionTextSize);
        for (let i = 0; i < this.actionTexts.length; i++) {
            const action = this.actionTexts[i];
            this.p.text(
                `${action.text}${action.limited ? ` ${this.masterActionUsed ? "1" : "0"}/1` : " ∞"}`,
                this.x + 2 * this.padding, this.y + (12 + i * 3) * this.padding
            );
        }
    }
}