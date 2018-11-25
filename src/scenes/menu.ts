import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { Label, Vector } from 'excalibur';
import { createBg } from './createbg';

export class Menu extends ex.Scene {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() { }
    public onDeactivate() { }

    constructor(engine: ex.Engine) {
        super();

        const label = new ex.Label(
            "Click to start!",
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().top + 200
        )

        label.fontFamily = "'Press Start 2P'"
        label.fontSize = 30
        label.color = ex.Color.Cyan
        label.textAlign = ex.TextAlign.Center

        label.actions
            .scaleTo(1.5, 1.5, 1.5, 1.5)
            .scaleTo(1, 1, 1.5, 1.5)
            .repeatForever()

        const copyright = new ex.Label(
            "<c> Cringefest, Junction 2018",
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom - 20
        )

        copyright.fontFamily = "'Press Start 2P'"
        copyright.fontSize = 10
        copyright.color = ex.Color.fromHex('ED1B7B')
        copyright.textAlign = ex.TextAlign.Center

        const bb = engine.getWorldBounds()
        const scalex = bb.right / 1920
        const scaley = bb.bottom / 1080
        const controls = new ex.Actor(
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2)

        const csprite = Resources.Controls.asSprite()
        csprite.x = csprite.drawWidth / 2
        csprite.y = csprite.drawHeight / 2

        // csprite.scale = new ex.Vector(scalex > scaley ? scalex : scaley, scalex > scaley ? scalex : scaley)

        controls.x = bb.right / 2
        controls.y = bb.bottom / 2
        controls.scale = new ex.Vector(scalex < scaley ? scalex : scaley, scalex < scaley ? scalex : scaley)
        controls.addDrawing(csprite)

        /* 
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
        */

        this.add(createBg(engine))
        this.add(label)
        this.add(copyright)
        this.add(controls)
    }
}
