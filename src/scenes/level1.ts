import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';

export class Level1 extends Level {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() {
        this.setPlayers(1, 1, 7, 7)
    }
    public onDeactivate() { }

    constructor(playerA: Player, playerB: Player) {
        const borders = createBorders(9, 9, Resources.Block2)
        const wallA1 = createWall(2, 1, 2, 6, Resources.Block1)
        const wallA2 = createWall(5, 1, 3, 7, Resources.Block1)

        const wallB1 = createWall(1, 1, 3, 7, Resources.Block1)
        const wallB2 = createWall(5, 2, 2, 6, Resources.Block1)

        const door = new Door(2, 4, Resources.Door, Resources.Block3)
        const button = new Button(2, 2, Resources.Block3, [door])

        const finish = new Finish(4, 4, playerA, playerB)

        const objectsA = [...wallA1, ...wallA2, ...borders, finish]
        const objectsB = [...wallB1, ...wallB2, ...borders, finish]

        super(playerA, playerB, objectsA, objectsB)
    }
}
