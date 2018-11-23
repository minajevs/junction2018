import * as ex from 'excalibur';
import { Keys } from 'excalibur/dist/Input';

const TILE = 64

export class Player extends ex.Actor {
    private next: { x: number, y: number }
    private prev: { x: number, y: number }

    constructor(tx: number, ty: number) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = 150 + tx * TILE;
        this.y = 150 + ty * TILE;
        this.next = { x: this.x, y: this.y }
        this.prev = { x: this.x, y: this.y }
        this.color = new ex.Color(255, 255, 255);
        this.collisionType = ex.CollisionType.Passive;

        this.on('collisionstart', (ev) => {
            const col = this.collides(ev.other)
            if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return
            this.cancelMove()
        });
    }

    cancelMove = () => {
        this.actions.clearActions()
        this.x = this.prev.x
        this.y = this.prev.y
        this.next = { ...this.prev }
    }

    move = (event: ex.Input.KeyEvent) => {
        const x = event.key === Keys.A
            ? -1
            : event.key === Keys.D
                ? 1
                : 0

        const y = event.key === Keys.W
            ? -1
            : event.key === Keys.S
                ? 1
                : 0

        this.prev = { ...this.next }
        this.next = { x: this.next.x + x * TILE, y: this.next.y + y * TILE }

        this.actions.clearActions()
        this.actions.moveTo(this.next.x, this.next.y, 500)
    }
}
