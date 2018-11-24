import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { Label, Vector } from 'excalibur';

export class Menu extends ex.Scene {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() { }
    public onDeactivate() { }

    constructor(engine: ex.Engine) {
        super();

        const label = new ex.Label(
            "Click to start!",
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().top + 70
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
        copyright.color = ex.Color.Magenta
        copyright.textAlign = ex.TextAlign.Center

        const controls = new ex.Actor(
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2)

        const csprite = Resources.Controls.asSprite()
        csprite.scale = new Vector(0.5, 0.5)
        controls.addDrawing(csprite)


        this.add(label)
        this.add(copyright)
        this.add(controls)
    }
}
