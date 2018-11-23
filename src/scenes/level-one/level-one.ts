import * as ex from 'excalibur';
import { Player } from '../../actors/player/player';
import { Level } from '../level';
import { createWall, createBorders } from '../../actors/wall/wall';
import { Resources } from '../../resources';
import { Finish } from '../../actors/finish/finish';

export class LevelOne extends Level {
  public onInitialize(engine: ex.Engine) { }
  public onActivate() { }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player) {
    const borders = createBorders(10, 8, Resources.Block2)
    const wall1 = createWall(3, 3, 4, 1, Resources.Block1)
    const wall2 = createWall(3, 3, 1, 4, Resources.Block1)
    const wall3 = createWall(3, 0, 2, 2, Resources.Block2)

    const finish = new Finish(4, 4, playerA, playerB)

    const objectsA = [...wall1, ...wall2, ...borders, finish]
    const objectsB = [...wall3, ...borders, finish]

    super(playerA, playerB, objectsA, objectsB)
  }
}
