import * as ex from 'excalibur';
import { WallTile } from './wallTile'

export const createWall = (x: number, y: number, w: number, h: number, texture: ex.Texture): WallTile[] => {
    let tiles = []
    for (let ix = 0; ix < w; ix++) {
        for (let iy = 0; iy < h; iy++) {
            const wallTile = new WallTile(x + ix, y + iy, texture)
            tiles.push(wallTile)
        }
    }
    return tiles
}