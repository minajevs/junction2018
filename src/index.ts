import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';
import { Wall } from './actors/wall/wall';
import { WallTile } from './actors/wall/wallTile';

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
const wall1 = new Wall(3, 3, 4, 1, Resources.Block, game)
const wallTile1 = new WallTile(5, 5, Resources.Block)

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
levelOne.add(wall1);
levelOne.add(wallTile1);

game.add('levelOne', levelOne);


let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('levelOne');
});
