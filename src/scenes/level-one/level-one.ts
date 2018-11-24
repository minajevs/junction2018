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
  [mlt, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mrt],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mlt, mrt, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtr, mtl, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtb, mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', mtr, mtl, ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', mlt, mtl, mtr, mrt, ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', mlb, mrb, mlb, mrb, ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mtb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', mtb],
  [mlb, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mlr, mrb]
]

const mapB = [
  [clt, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, crt],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', clt, clr, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctr, ctl, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctb, ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ctr, ctl, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', clt, ctl, ctr, crt, ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', clb, crb, clb, crb, ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [ctb, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ctb],
  [clb, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, clr, crb]
]

export class LevelOne extends Level {
  public onInitialize(engine: ex.Engine) { }
  public onActivate() {
    this.setPlayers(1, 1, 4, 4)
  }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player) {
    const mapATiles = createWalls(mapA)
    const mapBTiles = createWalls(mapB)

    const buttonsDoorsCoords = [
      {
        button: { x: 2, y: 2 },
        doors: [{ x: 7, y: 4 }, { x: 6, y: 6 }]
      }
    ]

    const buttonsDoors = buttonsDoorsCoords.map(buttonsDoorsCoord => createButtonDoors(buttonsDoorsCoord.button, buttonsDoorsCoord.doors[0], true, true))
    const buttons = buttonsDoors.map(item => item.button)
    const doors = buttonsDoors.map(item => item.doors)

    const finish = new Finish(4, 4, playerA, playerB)

    const objectsA = [...mapATiles, ...buttons, finish]
    const objectsB = [...mapBTiles, ...flatten(doors), finish]

    super(playerA, playerB, objectsA, objectsB)
    this.add(background)
  }
}
