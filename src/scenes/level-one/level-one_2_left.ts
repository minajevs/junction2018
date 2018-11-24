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
  [mlt, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mtd, mlr, mrt],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtr, mlr, mrt, ' ', mlt, mlr, ' ', mlr, mlr, mtd, mtd, mrb, ' ', mtb],
  [mtb, ' ', mtb, ' ', mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', mtb],
  [mtb, ' ', mlb, mlr, mrb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', mtb],
  [mtb, ' ', ' ', met, ' ', ' ', ' ', ' ', mlt, mtt, mtt, mlr, ' ', mtl],
  [mtr, mer, ' ', mlb, mlr, mlr, mlr, mlr, mtl, ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb, ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', mel, mtd, mlr, mrt, ' ', ' ', mtr, mlr, mer, ' ', ' ', mtb],
  [mtb, ' ', ' ', mtb, ' ', mtb, ' ', ' ', mtb, ' ', ' ', ' ', ' ', mtb],
  [mtr, mer, ' ', mtb, ' ', mlb, mer, ' ', mlb, mlr, mrt, ' ', ' ', mtb],
  [mtb, ' ', ' ', mtb, ' ', ' ', ' ', ' ', ' ', ' ', mtb, ' ', ' ', mtb],
  [mlb, mlr, mlr, mtt, mlr, mlr, mlr, mlr, mlr, mlr, mtt, mlr, mlr, mrb]
]

const mapB = [
  [clt, clr, ctd, clr, ctd, clr, clr, clr, ctd, clr, clr, clr, clr, crt],
  [ctb, ' ', clb, clr, crb, ' ', ' ', ' ', ced, ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctr, cer, ' ', clt, clr, ctd, clr, clr, clr, crt, ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ctb, ' ', ' ', ' ', ' ', ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', clt, ctt, clr, ctt, clr, crt, ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', ctb, ' ', ' ', ' ', ' ', ctb, ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', clb, clr, clr, cer, ' ', clb, ' ', ctl, ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', cel, cer, ' ', ' ', ' ', ' ', ' ', ctb, ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', clt, clr, cer, ' ', clb, clr, crt, ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ' ', ' ', ' ', ' ', ' ', ctb, ' ', ctb],
  [clb, clr, clr, clr, clr, ctt, clr, clr, clr, clr, clr, ctt, clr, crb]
]

export class LevelTwo extends Level {
  dog1: Sobaka
  suchka: Sobaka
  public onInitialize(engine: ex.Engine) { }
  public onActivate() {
    const offsetx = this.engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48
    this.setPlayers(offsetx, 4, 10, 4, 4)

    this.dog1.setPos(offsetx, 4, 12, new Vector(9, 12))
    // this.suchka.setPos(offsetx, 1, 5, new Vector(1, 10))
  }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player, engine: ex.Engine, timer: ScoreTime) {
    const offsetx = engine.getWorldBounds().right / 2 + 24 - mapA[0].length / 2 * 48
    const mapATiles = createWalls(offsetx, mapA)
    const mapBTiles = createWalls(offsetx, mapB)
    const buttonsDoorsCoordsA = [
      {
        button: { x: 1, y: 12 },
        doors: [{ x: 5, y: 4 }]
      }
    ]

    const buttonsDoorsCoordsA2 = [
      {
        button: { x: 1, y: 1 },
        doors: [{ x: 8, y: 7 }]
      }
    ]

    const buttonsDoorsCoordsB = [
      {
        button: { x: 6, y: 4 },
        doors: [{ x: 6, y: 2 }]
      },
      {
        button: { x: 6, y: 12 },
        doors: [{ x: 12, y: 6 }]
      }
    ]

    const buttonsDoorsCoordsB2 = [
      {
        button: { x: 3, y: 6 },
        doors: [{ x: 11, y: 1 }]
      }
    ]

    const buttonsDoorsAVertical = buttonsDoorsCoordsA.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      false, true))
    const buttonsAVertical = buttonsDoorsAVertical.map(item => item.button)
    const doorsAVertical = buttonsDoorsAVertical.map(item => item.doors)

    const buttonsDoorsAHorizontal = buttonsDoorsCoordsA2.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      true, true))
    const buttonsAHorizontal = buttonsDoorsAHorizontal.map(item => item.button)
    const doorsAHorizontal = buttonsDoorsAHorizontal.map(item => item.doors)

    const buttonsDoorsBHorizontal = buttonsDoorsCoordsB.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      true, false))
    const buttonsBHorizontal = buttonsDoorsBHorizontal.map(item => item.button)
    const doorsBHorizontal = buttonsDoorsBHorizontal.map(item => item.doors)

    const buttonsDoorsBVertical = buttonsDoorsCoordsB2.map(buttonsDoorsCoord => createButtonDoors(
      offsetx,
      buttonsDoorsCoord.button,
      buttonsDoorsCoord.doors[0],
      false, false))
    const buttonsBVertical = buttonsDoorsBVertical.map(item => item.button)
    const doorsBVertical = buttonsDoorsBVertical.map(item => item.doors)


    const finish = new Finish(offsetx, 12, 12, playerA, playerB)

    const dog1 = new Sobaka(offsetx, 4, 12, true)
    // const suchka = new Sobaka(1, 5, false)

    // suchka.guljatj(new Vector(2, 10), 100)
    const objectsA = [...mapATiles, ...buttonsAVertical, ...buttonsAHorizontal, ...flatten(doorsBHorizontal), ...flatten(doorsBVertical), /*zhuchka*/, finish]
    const objectsB = [...mapBTiles, ...buttonsBHorizontal, ...buttonsBVertical, ...flatten(doorsAVertical), ...flatten(doorsAHorizontal), /*suchka*/, finish]

    super(playerA, playerB, objectsA, objectsB, engine, timer)

    this.add(background)

    this.dog1 = dog1
    this.dog1.guljatj(new Vector(9, 12), 100)
    // this.suchka = suchka
    //this.setPlayers(offsetx, 1, 1, 4, 4)
  }
}
