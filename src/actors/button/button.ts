import * as ex from 'excalibur';
import { Sobaka } from '../sobaka/sobaka';
import { Player } from '../player/player';
import { CollisionStartEvent } from 'excalibur';

const TILE = 48

export class Button extends ex.Actor {
    actors: ex.Actor[]
    isA: boolean
    constructor(startpos: number, startposy: number, tx: number, ty: number, texture: ex.Texture, texturePressed: ex.Texture, actors: ex.Actor[], isA: boolean) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = startpos + tx * TILE;
        this.y = startposy + ty * TILE;
        this.isA = isA
        this.color = new ex.Color(255, 255, 255);
        this.addDrawing('default', texture.asSprite())
        this.addDrawing('pressed', texturePressed.asSprite())
        this.collisionType = ex.CollisionType.Passive;
        this.actors = actors
        this.setDrawing('default')

        this.on('collisionstart', this.onCollisionStart)
        this.on('collisionend', this.onCollisionEnd)
    }

    onCollisionStart(ev: ex.CollisionStartEvent) {
        if (ev.other instanceof Sobaka) return
        if (ev.other instanceof Player && ev.other.isA !== this.isA) return

        const col = this.collides(ev.other)
        if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return

        setTimeout(_ => {

            if (!this.collides(ev.other)) return
            this.actors.forEach(actor => {
                const toggle = (actor as any).toggle
                console.log('press')
                if (typeof toggle === 'function') {
                    toggle(true)
                    this.setDrawing('pressed')
                }
            })
        }, 10)
    }

    onCollisionEnd(ev) {
        setTimeout(_ => {
            if (ev.other instanceof Sobaka) return

            if (this.collides(ev.other)) return
            this.actors.forEach(actor => {
                const toggle = (actor as any).toggle
                console.log('depress')

                if (typeof toggle === 'function') {
                    toggle(false)
                    this.setDrawing('default')
                }
            })
        }, 10)
    }
}
