import * as ex from 'excalibur';
import { Player } from '../../actors/player/player';
import { Level } from '../level';
import { createWall, createBorders, createWalls } from '../../actors/wall/wall';
import { Resources } from '../../resources';
import { MagentaResources } from '../../magentaResources';
import { CyanResources } from '../../cyanResources';
import { Button } from "../../actors/button/button"
import { Door } from "../../actors/door/door"
import { Finish } from '../../actors/finish/finish';
import { createButtonDoors, coords } from "../../createButtonDoors"
import { flatten } from "lodash"
import { background } from "../../particles"
import { Sobaka } from '../../actors/sobaka/sobaka';
import { Vector } from 'excalibur';
import { ScoreTime } from '../../actors/timer';

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
  [mlt, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mtd, mrt],
  [mtb, mlt, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mrb, mtb],
  [mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, mtr, ' ', mlr, mlr, mlr, mlr, mtd, mlr, mer, ' ', mtb],
  [mtb, mtb, ' ', ' ', ' ', ' ', ' ', mtb, ' ', ' ', ' ', mtb],
  [mtb, mlb, mtd, mlr, mtd, mlr, mlr, mtl, ' ', mel, mer, mtb],
  [mtr, mlr, mcc, mlr, mtl, ' ', ' ', mtb, ' ', ' ', ' ', mtb],
  [mtb, ' ', mtb, ' ', mtr, mer, ' ', mlb, mlr, mer, ' ', mtb],
  [mtb, ' ', mtb, ' ', mtb, ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', med, ' ', med, ' ', mel, mlr, mlr, mlr, mer, mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mlb, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mrb]
]

const mapB = [
  [clt, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, crt],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctr, clr, clr, clr, crt, ' ', clt, clr, clr, clr, clr, ctl],
  [ctb, ' ', ' ', ' ', ctb, ' ', ctb, ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', cet, ' ', ctb, ' ', ced, ' ', clt, cer, ' ', ctb],
  [ctb, ' ', ctb, ' ', ctb, ' ', ' ', ' ', ctb, ' ', ' ', ctb],
  [ctr, ' ', ctl, ' ', ctr, clr, clr, clr, ctt, cer, ' ', ctb],
  [ctb, ' ', ctb, ' ', ctb, ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctr, clr, crb, ' ', ctr, cer, ' ', cel, clr, cer, ' ', ctb],
  [ctb, ' ', ' ', ' ', ced, ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', cet, ' ', ' ', ' ', cet, ' ', cet, ' ', clt, ctl],
  [clb, clr, ctt, clr, clr, clr, ctt, clr, ctt, clr, ctt, crb]
]

export class LevelOne extends Level {
  zhuchka: Sobaka
  suchka: Sobaka
  public onInitialize(engine: ex.Engine) { }
  public onActivate() {
    const offsetx = this.engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48
    this.setPlayers(offsetx, 6, 4, 1, 5)

    this.zhuchka.setPos(offsetx, 5, 1, new Vector(10, 2))
    this.suchka.setPos(offsetx, 1, 5, new Vector(1, 10))
  }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player, engine: ex.Engine, timer: ScoreTime) {
    const offsetx = engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48
    const mapATiles = createWalls(offsetx, mapA)
    const mapBTiles = createWalls(offsetx, mapB)
    const buttonsDoorsCoordsA = [
      {
        button: { x: 3, y: 7 },
        doors: [{ x: 1, y: 6 }]
      }
    ]

    const buttonsDoorsCoordsB = [
      {
        button: { x: 9, y: 1 },
        doors: [{ x: 2, y: 3 }]
      }
    ]

    const buttonsDoorsA = buttonsDoorsCoordsA.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      true, true))
    const buttonsA = buttonsDoorsA.map(item => item.button)
    const doorsA = buttonsDoorsA.map(item => item.doors)

    const buttonsDoorsB = buttonsDoorsCoordsB.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      true, false))
    const buttonsB = buttonsDoorsB.map(item => item.button)
    const doorsB = buttonsDoorsB.map(item => item.doors)


    const finish = new Finish(offsetx, 1, 7, playerA, playerB)

    // const zhuchka = new Sobaka(5, 1, true)
    // const suchka = new Sobaka(1, 5, false)

    // zhuchka.guljatj(new Vector(10, 2), 100)
    // suchka.guljatj(new Vector(2, 10), 100)

    const objectsA = [...mapATiles, ...buttonsA, ...flatten(doorsB), /*zhuchka*/, finish]
    const objectsB = [...mapBTiles, ...buttonsB, ...flatten(doorsA), /*suchka*/, finish]

    super(playerA, playerB, objectsA, objectsB, engine, timer)

    this.add(background)

    // this.zhuchka = zhuchka
    // this.suchka = suchka
    //this.setPlayers(offsetx, 1, 1, 4, 4)
  }
}
