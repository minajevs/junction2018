import * as ex from 'excalibur';

const TILE = 48

export class Button extends ex.Actor {
    actors: ex.Actor[]

    constructor(tx: number, ty: number, texture: ex.Texture, actors: ex.Actor[]) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = TILE + tx * TILE;
        this.y = TILE + ty * TILE;
        this.color = new ex.Color(255, 255, 255);
        this.addDrawing(texture)
        this.collisionType = ex.CollisionType.Passive;
        this.actors = actors

        this.on('collisionstart', this.onCollisionStart)
        this.on('collisionend', this.onCollisionEnd)
    }

    onCollisionStart(ev) {
        const col = this.collides(ev.other)
        if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return

        setTimeout(_ => {

            if (!this.collides(ev.other)) return
            this.actors.forEach(actor => {
                const toggle = (actor as any).toggle

                if (typeof toggle === 'function') toggle(true)
            })
        }, 10)
    }

    onCollisionEnd(ev) {
        setTimeout(_ => {
            if (this.collides(ev.other)) return
            this.actors.forEach(actor => {
                const toggle = (actor as any).toggle

                if (typeof toggle === 'function') toggle(false)
            })
        }, 10)
    }
}
