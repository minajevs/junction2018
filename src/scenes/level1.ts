import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders, createWalls } from '../actors/wall/wall';
import { Resources } from '../resources';
import { MagentaResources } from '../magentaResources';
import { CyanResources } from '../cyanResources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { createButtonDoors, coords } from "../createButtonDoors"
import { flatten } from "lodash"
import { background } from "../particles"
import { Sobaka } from '../actors/sobaka/sobaka';
import { Vector } from 'excalibur';
import { ScoreTime } from '../actors/timer';
import { Game } from '..';

const {
    leftTop: mlt,
    leftBottom: mlb,
    rightTop: mrt,
    rightBottom: mrb,

    endLeft: mel,
    endDown: med,
    endRight: mer,
    endTop: met,

    leftRight: mlr,
    topDown: mtb,

    cross: mcc,
    tTop: mtt,
    tDown: mtd,
    tRight: mtr,
    tLeft: mtl
} = MagentaResources

const {
    leftTop: clt,
    leftBottom: clb,
    rightTop: crt,
    rightBottom: crb,

    endLeft: cel,
    endDown: ced,
    endRight: cer,
    endTop: cet,

    leftRight: clr,
    topDown: ctb,

    cross: ccc,
    tTop: ctt,
    tDown: ctd,
    tRight: ctr,
    tLeft: ctl
} = CyanResources

const mapA = [
    [mlt, mtd, mlr, mlr, mtd, mlr, mlr, mlr, mtd, mrt],
    [mtr, mrb, ' ', ' ', mtb, ' ', ' ', ' ', mtb, mtb],
    [mtb, ' ', ' ', ' ', mtr, mlr, mrt, ' ', mlb, mtl],
    [mtb, ' ', mel, mlr, mtt, mlr, mtl, ' ', ' ', mtb],
    [mtb, ' ', ' ', ' ', ' ', ' ', mtb, ' ', ' ', mtb],
    [mtb, ' ', met, ' ', met, ' ', mtr, mer, ' ', mtb],
    [mtr, mlr, mrb, ' ', mtb, ' ', med, ' ', ' ', mtb],
    [mtb, ' ', ' ', ' ', mtb, ' ', ' ', ' ', ' ', mtb],
    [mlb, mlr, mlr, mlr, mtt, mlr, mlr, mlr, mlr, mrb],
    []
]

const mapB = [
    [clt, ctd, clr, clr, clr, clr, ctd, clr, ctd, crt],
    [ctb, ctb, ' ', ' ', ' ', ' ', ctb, ' ', clb, ctl],
    [ctr, crb, ' ', cet, ' ', ' ', ctb, ' ', ' ', ctb],
    [ctb, ' ', ' ', ctr, ctd, clr, ctt, cer, ' ', ctb],
    [ctb, ' ', clt, ctt, crb, ' ', ' ', ' ', ' ', ctb],
    [ctb, ' ', ctb, ' ', ' ', ' ', clt, clr, clr, ctl],
    [ctb, ' ', ced, ' ', cet, ' ', ced, ' ', ' ', ctb],
    [ctb, ' ', ' ', ' ', ctb, ' ', ' ', ' ', ' ', ctb],
    [clb, clr, clr, clr, ctt, clr, clr, clr, clr, crb],
    []
]

export class LevelOne extends Level {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() {
        const offsetx = Math.round(this.engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48)
        const offsety = Math.round(this.engine.getWorldBounds().bottom / 2 + 24 - mapA.length / 2 * 48)
        this.setPlayers(offsetx, offsety, 1, 7, 8, 7)
        this.game.controlsActive = true
        this.showLevelNumber(1)
    }
    public onDeactivate() { }

    constructor(playerA: Player, playerB: Player, engine: Game, timer: ex.Label, deathNote: ex.Label) {
        const offsetx = Math.round(engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48)
        const offsety = Math.round(engine.getWorldBounds().bottom / 2 + 24 - mapA.length / 2 * 48)
        const mapATiles = createWalls(offsetx, offsety, mapA, true)
        const mapBTiles = createWalls(offsetx, offsety, mapB, false)

        const finish = new Finish(offsetx, offsety, 5, 1, playerA, playerB)

        const objectsA = [deathNote, timer, ...mapATiles, finish]
        const objectsB = [deathNote, timer, ...mapBTiles, finish]

        super(playerA, playerB, objectsA, objectsB, engine)

        this.add(background)
    }
}
