import * as ex from 'excalibur';

const TILE = 64

export class WallTile extends ex.Actor {
    constructor(tx: number, ty: number, texture: ex.Texture) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.x = 150 + tx * TILE;
        this.y = 150 + ty * TILE;
        this.color = new ex.Color(255, 255, 255);
        this.addDrawing(texture)
        this.collisionType = ex.CollisionType.Passive;
    }
}
