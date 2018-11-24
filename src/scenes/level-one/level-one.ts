import * as ex from 'excalibur';
import { Player } from '../../actors/player/player';
import { Level } from '../level';
import { createWall, createBorders } from '../../actors/wall/wall';
import { Resources } from '../../resources';
import { Button } from "../../actors/button/button"
import { Door } from "../../actors/door/door"
import { Finish } from '../../actors/finish/finish';
import { createButtonDoors, coords } from "../../createButtonDoors"
import { flatten } from "lodash"

export class LevelOne extends Level {
  public onInitialize(engine: ex.Engine) { }
  public onActivate() { }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player) {
    const borders = createBorders(15, 9, Resources.Block2)
    const wall1 = createWall(3, 3, 4, 1, Resources.Block1)
    const wall2 = createWall(3, 3, 1, 4, Resources.Block1)
    const wall3 = createWall(3, 0, 2, 2, Resources.Block2)

    const buttonsDoorsCoords = [
      {
        button: { x: 2, y: 2 },
        doors: [{ x: 7, y: 4 }, { x: 6, y: 6 }]
      }
    ]

    const buttonsDoors = buttonsDoorsCoords.map(buttonsDoorsCoord => createButtonDoors(buttonsDoorsCoord.button, buttonsDoorsCoord.doors))
    const buttons = buttonsDoors.map(item => item.button)
    const doors = buttonsDoors.map(item => item.doors)

    const finish = new Finish(4, 4, playerA, playerB)

    const objectsA = [...wall1, ...wall2, ...borders, ...buttons, finish]
    const objectsB = [...wall3, ...borders, ...flatten(doors), finish]

    super(playerA, playerB, objectsA, objectsB)
  }
}
