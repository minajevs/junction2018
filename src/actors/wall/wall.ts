import * as ex from 'excalibur';
import { WallTile } from './wallTile'

const TILE = 64

export class Wall extends ex.Actor {
    private wallTiles: WallTile[] = []
    constructor(x: number, y: number, w: number, h: number, texture: ex.Texture, engine: ex.Engine) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        for (let ix = 0; ix < w; ix++) {
            for (let iy = 0; iy < h; iy++) {
                const wallTile = new WallTile(x + ix, y + iy, texture)
                this.wallTiles.push(wallTile)

                engine.add(wallTile)
            }
        }
        this.color = new ex.Color(255, 255, 255);
    }
}
