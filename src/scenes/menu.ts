import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { Label } from 'excalibur';

export class Menu extends ex.Scene {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() { }
    public onDeactivate() { }

    constructor(engine: ex.Engine) {
        super();

        const label = new ex.Label(
            "Click to start!",
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2
        )

        label.fontSize = 50
        label.color = ex.Color.Black
        label.textAlign = ex.TextAlign.Center

        label.actions
            .scaleTo(1.5, 1.5, 1.5, 1.5)
            .scaleTo(1, 1, 1.5, 1.5)
            .repeatForever()

        this.add(label)
    }
}
