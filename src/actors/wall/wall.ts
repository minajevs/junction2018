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

export const createBorders = (sidex: number, sidey: number, texture: ex.Texture): WallTile[] => {
    let tiles = []
    const leftWall = createWall(0, 0, 1, sidey - 1, texture)
    const topWall = createWall(1, 0, sidex - 1, 1, texture)

    const rightWall = createWall(sidex - 1, 1, 1, sidey - 1, texture)
    const bottomWall = createWall(0, sidey - 1, sidex - 1, 1, texture)

    return [...leftWall, ...topWall, ...rightWall, ...bottomWall]
}