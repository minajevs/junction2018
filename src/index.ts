import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';
import { Level1 } from './scenes/level1';

export const globalEvents = new ex.EventDispatcher({})

class Game extends ex.Engine {
  constructor() {
    super({ width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}

const game = new Game();

const playerA = new Player(1, 1);
const playerB = new Player(1, 1);
let aActive = true

const levels = [
  new LevelOne(playerA, playerB),
  new Level1(playerA, playerB)
]

let leveli = 0
let level = levels[leveli]

globalEvents.on('finishLevel', _ => {
  leveli++
  level = levels[leveli]
  game.goToScene(`level${leveli}`)
  aActive = true
  level.switchType(aActive)
  playerA.toggle(aActive)
  playerB.toggle(!aActive)
})

game.input.keyboard.on('press',
  event => {
    if (event.key === Keys.Space) {
      aActive = !aActive
      level.switchType(aActive)
      playerA.toggle(aActive)
      playerB.toggle(!aActive)
    }

    if (aActive)
      playerA.move(event)
    else
      playerB.move(event)
  })

levels.forEach((level, i) => game.add(`level${i}`, level))

let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('level0');
});
