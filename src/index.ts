import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';
import { Level1 } from './scenes/level1';
import { Menu } from './scenes/menu';

export const globalEvents = new ex.EventDispatcher({})

class Game extends ex.Engine {
  constructor() {
    super({ width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen });
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}

/* 
  Init classes
*/
const game = new Game();
let loader = new ex.Loader();

const playerA = new Player(1, 1);
const playerB = new Player(1, 1);

// scenes
const menu = new Menu(game)

const levels = [
  new LevelOne(playerA, playerB),
  new Level1(playerA, playerB)
]

// vars
let leveli = 0
let level = levels[leveli]
let aActive = true

/* 
  Register scenes 
*/
game.addScene('menu', menu)
levels.forEach((level, i) => game.addScene(`level${i}`, level))

/* 
  Register controls
*/
game.input.pointers.primary.on("down", () => {
  // Mouse click
  game.input.pointers.primary.off("down");

  game.goToScene('level0');
});

const onPressEvent = (event: ex.Input.KeyEvent) => {
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
}

game.input.keyboard.on('press', onPressEvent)

/* 
 Load resources
*/
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

/*
  Game Events
*/
globalEvents.on('finishLevel', _ => {
  leveli++
  level = levels[leveli]
  game.goToScene(`level${leveli}`)
  level.onActivate()
  aActive = true
  level.switchType(aActive)
  playerA.toggle(aActive)
  playerB.toggle(!aActive)
})

const checkAndSend = (key: ex.Input.Keys) => {
  if (game.input.keyboard.isHeld(key))
    setTimeout(_ => onPressEvent(new ex.Input.KeyEvent(key)), 10)
}

globalEvents.on('endMove', _ => {
  checkAndSend(ex.Input.Keys.W)
  checkAndSend(ex.Input.Keys.A)
  checkAndSend(ex.Input.Keys.S)
  checkAndSend(ex.Input.Keys.D)
})

/* 
  Start
*/
game.start(loader).then(() => {
  game.goToScene('menu');
});
