import * as ex from 'excalibur';
import { Keys } from 'excalibur/dist/Input';
import { WallTile } from '../wall/wallTile';
import { Resources } from '../../resources';
import { MagentaResources } from '../../magentaResources';
import { CyanResources } from '../../cyanResources';
import { Door } from '../door/door';
import { globalEvents } from '../..';
import { player1particle, player2particle } from "../../particles"
import { Player } from '../player/player';
import { ChangeTypeEvent } from '../../scenes/level';
import { Button } from '../button/button';

const TILE = 48

export class Sobaka extends ex.Actor {
    private next: { x: number, y: number }
    private prev: { x: number, y: number }

    steps = 0
    direction = true
    interval: NodeJS.Timer
    isA: boolean
    hidden: boolean
    startpos: number

    constructor(startpos: number, tx: number, ty: number, isA: boolean) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = startpos + tx * TILE;
        this.y = 48 + ty * TILE;
        this.next = { x: this.x, y: this.y }
        this.prev = { x: this.x, y: this.y }
        this.color = new ex.Color(255, 255, 255);
        this.collisionType = ex.CollisionType.Passive;
        this.isA = isA
        this.startpos = startpos

        this.addDrawing("left", isA ? MagentaResources.dogLeft.asSprite() : CyanResources.dogLeft.asSprite())
        this.addDrawing("right", isA ? MagentaResources.dogRight.asSprite() : CyanResources.dogRight.asSprite())
        this.addDrawing("hidden", Resources.Empty.asSprite())
        this.toggle(true)
        this.add(!isA ? player1particle : player2particle)

        this.on('collisionstart', (ev) => {
            if (ev.other instanceof Door && (ev.other as Door).opened) return
            if (ev.other instanceof Button) return

            if (ev.other instanceof Player && ev.other.isA === isA)
                globalEvents.emit('playerDeath')
        });

        globalEvents.on('switchType', event => {
            if (event instanceof ChangeTypeEvent) {
                this.toggle(event.data === this.isA)
            }
        })
    }

    setPos = (startpos: number, x: number, y: number, to: ex.Vector) => {
        this.startpos = startpos
        this.x = this.startpos + (x * TILE)
        this.y = 48 + y * TILE;
        this.prev = new ex.Vector(this.x, this.y)
        if (this.hidden) return
        const deltax = this.x - (this.startpos + TILE * to.x)
        if (deltax < 0) this.setDrawing('right')
        if (deltax > 0) this.setDrawing('left')
    }

    guljatj = (to: ex.Vector, speed: number) => {
        const deltax = this.x - (this.startpos + TILE * to.x)

        this.actions
            .callMethod(() => {
                if (this.hidden) return
                if (deltax < 0) this.setDrawing('right')
                if (deltax > 0) this.setDrawing('left')
            })
            .moveTo(
                this.startpos + to.x * TILE,
                to.y * TILE,
                speed
            )
            .delay(10)
            .callMethod(() => {
                if (this.hidden) return
                if (deltax < 0) this.setDrawing('left')
                if (deltax > 0) this.setDrawing('right')
            })
            .moveTo(
                this.prev.x,
                this.prev.y,
                speed
            )
            .repeatForever()
    }

    toggle = (flag: boolean) => {
        this.hidden = !flag
        this.setDrawing(flag ? "left" : "hidden")
    }

    move = (delta: ex.Vector) => {
        if (delta.x < 0) this.setDrawing('left')
        if (delta.x > 0) this.setDrawing('right')


        this.prev = { ...this.next }
        this.next = { x: this.next.x + delta.x * TILE, y: this.next.y + delta.y * TILE }

        const contex = this.actions.moveTo(this.next.x, this.next.y, 500).asPromise()
    }
}
