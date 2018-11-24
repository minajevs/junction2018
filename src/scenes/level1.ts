import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { createBg } from './createbg';
import { ScoreTime } from '../actors/timer';

export class Level1 extends Level {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() {
        this.setPlayers(0, 1, 1, 7, 7)
    }
    public onDeactivate() { }

    constructor(playerA: Player, playerB: Player, engine: ex.Engine, time: ScoreTime) {
        const borders = createBorders(0, 9, 9, Resources.Sword)
        const wallA1 = createWall(2, 1, 2, 6, Resources.Sword)
        const wallA2 = createWall(5, 1, 3, 7, Resources.Sword)

        const wallB1 = createWall(1, 1, 3, 7, Resources.Sword)
        const wallB2 = createWall(5, 2, 2, 6, Resources.Sword)

        const door = new Door(0, 2, 4, Resources.Door, Resources.Sword)
        // const button = new Button(2, 2, Resources.Sword, [door])

        const finish = new Finish(0, 4, 4, playerA, playerB)

        const objectsA = [...wallA1, ...wallA2, ...borders, finish]
        const objectsB = [...wallB1, ...wallB2, ...borders, finish]

        super(playerA, playerB, objectsA, objectsB, engine, time)
    }
}
