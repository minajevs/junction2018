import * as ex from 'excalibur';
import { Keys } from 'excalibur/dist/Input';
import { WallTile } from '../wall/wallTile';
import { Resources } from '../../resources';
import { MagentaResources } from '../../magentaResources';
import { CyanResources } from '../../cyanResources';
import { Door } from '../door/door';
import { globalEvents } from '../..';
import { player1particle, player2particle } from "../../particles"

const TILE = 48

export class Player extends ex.Actor {
    private prev: { x: number, y: number }
    private collidable = [WallTile, Door]
    moving: boolean
    startpos: number
    startposy: number
    isA: boolean

    constructor(tx: number, ty: number, isA: boolean) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = TILE + tx * TILE;
        this.y = TILE + ty * TILE;
        this.prev = { x: this.x, y: this.y }
        this.color = new ex.Color(255, 255, 255);
        this.collisionType = ex.CollisionType.Passive;
        this.isA = isA
        this.moving = false
        const sprite = MagentaResources.copLeft.asSprite()

        this.addDrawing("left", isA ? MagentaResources.copLeft.asSprite() : CyanResources.copLeft.asSprite())
        this.addDrawing("right", isA ? MagentaResources.copRight.asSprite() : CyanResources.copRight.asSprite())
        this.addDrawing("hidden", Resources.Empty.asSprite())
        this.setDrawing("left")
        this.toggle(true)
        this.add(!isA ? player1particle : player2particle)

        this.on('precollision', (ev) => {
            if (!this.collidable.some(collidableObject => ev.other instanceof collidableObject)) return
            if (ev.other instanceof Door && (ev.other as Door).opened) return

            if (ev.other instanceof WallTile && ev.other.isA !== this.isA) return

            console.log('cancel', this.x, this.y, ev.other.x, ev.other.y)
            this.cancelMove()
        });
    }

    toggle = (flag: boolean) => {
        this.setDrawing(flag ? "left" : "hidden")
    }

    cancelMove = () => {
        this.x = this.prev.x
        this.y = this.prev.y
    }

    setPos = (startpos: number, startposy: number, x: number, y: number) => {
        this.startpos = startpos
        this.startposy = startposy
        this.x = this.startpos + x * TILE;
        this.y = this.startposy + y * TILE;
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

        if (x < 0) this.setDrawing('left')
        if (x > 0) this.setDrawing('right')

        this.prev = { x: this.x, y: this.y }

        setTimeout(_ => {
            this.x = this.x + x * TILE
            this.y = this.y + y * TILE
        }, 0)

        setTimeout(_ => this.moving = false, 100)
    }
}