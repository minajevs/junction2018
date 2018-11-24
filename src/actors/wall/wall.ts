import * as ex from 'excalibur';
import { WallTile } from './wallTile'
import { MagentaResources } from '../../magentaResources';

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

export const createWalls = (wallsConfig: (ex.Texture | string)[][]) => {
    const walls: WallTile[] = []
    wallsConfig.forEach((row, y) => {
        row.forEach((col, x) => {
            const tile = wallsConfig[y][x]
            if (typeof tile === 'string') { }
            else
                walls.push(new WallTile(x, y, tile))
        })
    })

    return walls
}

export const createBorders = (sidex: number, sidey: number, texture: ex.Texture): WallTile[] => {
    let tiles = []
    const leftTop = new WallTile(0, 0, MagentaResources.leftTop)
    const leftBottom = new WallTile(0, sidey - 1, MagentaResources.leftBottom)
    const rightTop = new WallTile(sidex - 1, 0, MagentaResources.rightTop)
    const rightBottom = new WallTile(sidex - 1, sidey - 1, MagentaResources.rightBottom)

    const leftWall = createWall(0, 1, 1, sidey - 2, MagentaResources.topDown)
    const topWall = createWall(1, 0, sidex - 2, 1, MagentaResources.leftRight)

    const rightWall = createWall(sidex - 1, 1, 1, sidey - 2, MagentaResources.topDown)
    const bottomWall = createWall(1, sidey - 1, sidex - 2, 1, MagentaResources.leftRight)

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