import * as ex from 'excalibur';

const TILE = 48

export class WallTile extends ex.Actor {
    isA: boolean
    constructor(startpos: number, tx: number, ty: number, texture: ex.Texture, isA: boolean) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = startpos + tx * TILE;
        this.y = 48 + ty * TILE;
        this.isA = isA
        this.color = new ex.Color(255, 255, 255);
        this.addDrawing(texture)
        this.collisionType = ex.CollisionType.Passive;
    }
}
