import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';

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
let levelOne = new LevelOne(playerA, playerB)
let level = levelOne

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

game.add('levelOne', levelOne);

let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('levelOne');
});
