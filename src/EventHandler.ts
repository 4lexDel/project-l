import p5 from "p5";

export class EventHandler {
    private static eventHandler: EventHandler;
    private p!: p5;

    private mousePressedCallbacks: Map<symbol, () => void> = new Map();
    private mouseDraggedCallbacks: Map<symbol, () => void> = new Map();
    private mouseReleasedCallbacks: Map<symbol, () => void> = new Map();

    constructor(p: p5) {
        // First init
        if (!EventHandler.eventHandler) {
            this.p = p; 
            EventHandler.eventHandler = this;
            this.initEvents();
        }
        return EventHandler.eventHandler;
    }

    public static getInstance(p: p5): EventHandler {
        if (!EventHandler.eventHandler) {
            EventHandler.eventHandler = new EventHandler(p);
        }
        return EventHandler.eventHandler;
    }

    public addEventMousePressed(symbol: symbol, callback: () => void) {
        this.mousePressedCallbacks.set(symbol, callback);
    }

    public addEventMouseDragged(symbol: symbol, callback: () => void) {
        this.mouseDraggedCallbacks.set(symbol, callback);
    }

    public addEventMouseReleased(symbol: symbol, callback: () => void) {
        this.mouseReleasedCallbacks.set(symbol, callback);
    }

    public removeEventMousePressed(symbol: symbol) {
        this.mousePressedCallbacks.delete(symbol);
    }

    public removeEventMouseReleased(symbol: symbol) {
        this.mouseReleasedCallbacks.delete(symbol);
    }

    public removeEventMouseDragged(symbol: symbol) {
        this.mouseDraggedCallbacks.delete(symbol);
    }

    private initEvents() {
        this.p.mousePressed = () => {
            this.mousePressedCallbacks.forEach(callback => callback());
        };
        this.p.mouseDragged = () => {
            this.mouseDraggedCallbacks.forEach(callback => callback());
        };
        this.p.mouseReleased = () => {
            this.mouseReleasedCallbacks.forEach(callback => callback());
        };
    }
}