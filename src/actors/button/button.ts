import * as ex from 'excalibur';
import { globalEvents } from "../../index"
import { throttle } from 'lodash'

const TILE = 64

export class ButtonEvent extends ex.GameEvent<Button> {
    button: Button

    constructor(button: Button) {
        super()
        this.button = button
    }
}

export class Button extends ex.Actor {
    constructor(tx: number, ty: number, texture: ex.Texture) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = 150 + tx * TILE;
        this.y = 150 + ty * TILE;
        this.color = new ex.Color(255, 255, 255);
        this.addDrawing(texture)
        this.collisionType = ex.CollisionType.Passive;

        this.on('collisionstart', (ev) => {
            this.onCollisionStart(ev)
        })
    }

    onCollisionStart(ev) {
        const col = this.collides(ev.other)
        if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return

        globalEvents.emit("buttonPressed", new ButtonEvent(this))
    }
}
