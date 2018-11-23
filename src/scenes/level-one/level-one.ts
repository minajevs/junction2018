import * as ex from 'excalibur';
import { Player } from '../../actors/player/player';
import { Level } from '../level';
import { createWall } from '../../actors/wall/wall';
import { Resources } from '../../resources';

export class LevelOne extends Level {
  public onInitialize(engine: ex.Engine) { }
  public onActivate() { }
  public onDeactivate() { }

  constructor(playerA: Player, playerB: Player) {
    const wall1 = createWall(3, 3, 4, 1, Resources.Block1)
    const wall2 = createWall(3, 3, 1, 4, Resources.Block1)
    const wall3 = createWall(3, 0, 2, 2, Resources.Block2)

    const objectsA = [...wall1, ...wall2]
    const objectsB = [...wall3]

    super(playerA, playerB, objectsA, objectsB)
  }
}
