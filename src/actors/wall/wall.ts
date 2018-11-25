import * as ex from 'excalibur';
import { WallTile } from './wallTile'
import { MagentaResources } from '../../magentaResources';

export const createWall = (x: number, y: number, w: number, h: number, texture: ex.Texture, isA: boolean): WallTile[] => {
    let tiles = []
    for (let ix = 0; ix < w; ix++) {
        for (let iy = 0; iy < h; iy++) {
            const wallTile = new WallTile(0, 0, x + ix, y + iy, texture, isA)
            tiles.push(wallTile)
        }
    }
    return tiles
}

export const createWalls = (startpos: number, startposy: number, wallsConfig: (ex.Texture | string)[][], isA: boolean) => {
    const walls: WallTile[] = []
    wallsConfig.forEach((row, y) => {
        row.forEach((col, x) => {
            const tile = wallsConfig[y][x]
            if (typeof tile === 'string') { }
            else
                walls.push(new WallTile(startpos, startposy, x, y, tile, isA))
        })
    })

    return walls
}

export const createBorders = (startpos: number, startposy: number, sidex: number, sidey: number, texture: ex.Texture, isA: boolean): WallTile[] => {
    let tiles = []
    const leftTop = new WallTile(startpos, startposy, 0, 0, MagentaResources.leftTop, isA)
    const leftBottom = new WallTile(startpos, startposy, 0, sidey - 1, MagentaResources.leftBottom, isA)
    const rightTop = new WallTile(startpos, startposy, sidex - 1, 0, MagentaResources.rightTop, isA)
    const rightBottom = new WallTile(startpos, startposy, sidex - 1, sidey - 1, MagentaResources.rightBottom, isA)

    const leftWall = createWall(0, 1, 1, sidey - 2, MagentaResources.topDown, isA)
    const topWall = createWall(1, 0, sidex - 2, 1, MagentaResources.leftRight, isA)

    const rightWall = createWall(sidex - 1, 1, 1, sidey - 2, MagentaResources.topDown, isA)
    const bottomWall = createWall(1, sidey - 1, sidex - 2, 1, MagentaResources.leftRight, isA)

    return [
        leftTop,
        leftBottom,
        rightTop,
        rightBottom,
        ...leftWall,
        ...topWall,
        ...rightWall,
        ...bottomWall
    ]
}