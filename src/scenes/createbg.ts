import * as ex from "excalibur";
import { Resources } from "../resources";

export const createBg = (engine: ex.Engine) => {
    const bb = engine.getWorldBounds()
    const bgSprite = Resources.Bg.asSprite()
    const scalex = bb.right / 1920
    const scaley = bb.bottom / 1080
    bgSprite.x = bgSprite.drawWidth / 2
    bgSprite.y = bgSprite.drawHeight / 2
    const bg = new ex.Actor()
    bg.x = bb.right / 2
    bg.y = bb.bottom / 2
    bg.scale = new ex.Vector(scalex > scaley ? scalex : scaley, scalex > scaley ? scalex : scaley)
    bg.addDrawing(bgSprite)

    return bg
}