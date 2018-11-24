import * as ex from 'excalibur';
import { Keys } from 'excalibur/dist/Input';
import { WallTile } from '../wall/wallTile';
import { Resources } from '../../resources';
import { Door } from '../door/door';
import { globalEvents } from '../..';

const TILE = 48

export class Player extends ex.Actor {
    private next: { x: number, y: number }
    private prev: { x: number, y: number }
    private collidable = [WallTile, Door]
    private moving = false

    constructor(tx: number, ty: number) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = TILE + tx * TILE;
        this.y = TILE + ty * TILE;
        this.next = { x: this.x, y: this.y }
        this.prev = { x: this.x, y: this.y }
        this.color = new ex.Color(255, 255, 255);
        this.collisionType = ex.CollisionType.Passive;
        this.addDrawing("default", Resources.Player.asSprite())
        this.addDrawing("hidden", Resources.Empty.asSprite())
        this.toggle(true)

        this.on('collisionstart', (ev) => {
            if (!this.collidable.some(collidableObject => ev.other instanceof collidableObject)) return
            if (ev.other instanceof Door && (ev.other as Door).opened) return

            const col = this.collides(ev.other)
            if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return
            this.cancelMove()
        });
    }

    endMove = () => {
        this.moving = false
        globalEvents.emit('endMove')
    }

    toggle = (flag: boolean) => {
        this.setDrawing(flag ? "default" : "hidden")
    }

    cancelMove = () => {
        this.actions.clearActions()
        this.x = this.prev.x
        this.y = this.prev.y
        this.next = { ...this.prev }
        this.endMove()
    }

    setPos = (x: number, y: number) => {
        this.x = TILE + x * TILE;
        this.y = TILE + y * TILE;
        this.next = { x: this.x, y: this.y }
        this.prev = { x: this.x, y: this.y }
    }

    move = (event: ex.Input.KeyEvent) => {
        if (this.moving) return
        this.moving = true
        this.setZIndex(1000)
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

        const contex = this.actions.moveTo(this.next.x, this.next.y, 500).asPromise()

        contex.then(_ => {
            this.prev = { ...this.next }
            this.endMove()
        })
    }
}
