import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';

class Game extends ex.Engine {
  constructor() {
    super({ width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}

const game = new Game();
const levelOne = new LevelOne();

let aActive = true

const playerA = new Player(0, 0);
const playerB = new Player(1, 0);

game.input.keyboard.on('press',
  event => {
    if (event.key === Keys.Space)
      aActive = !aActive

    if (aActive)
      playerA.move(event)
    else
      playerB.move(event)
  })


playerA.addDrawing(Resources.Player);
playerB.addDrawing(Resources.Player);

levelOne.add(playerA);
levelOne.add(playerB);

game.add('levelOne', levelOne);


let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('levelOne');
});
