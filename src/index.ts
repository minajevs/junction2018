import * as ex from 'excalibur';
import { LevelOne } from './scenes/level1';
import { LevelTwo } from './scenes/level2';
import { LevelThree } from './scenes/level3';
import { Player } from './actors/player/player';
import { Resources } from './resources';
import { Keys } from 'excalibur/dist/Input';
import { Menu } from './scenes/menu';
import { MagentaResources } from './magentaResources';
import { CyanResources } from './cyanResources';
import { ScoreTime, createTimer } from './actors/timer';

export const globalEvents = new ex.EventDispatcher({})

export class Game extends ex.Engine {
  controlsActive: boolean = false

  constructor() {
    super({
      width: 800,
      height: 600,
      displayMode: ex.DisplayMode.FullScreen,
      backgroundColor: ex.Color.fromRGB(0, 0, 0, 0),
      canvasElementId: "game"
    });
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
const timer = new ScoreTime(game)

const playerA = new Player(1, 1, true);
const playerB = new Player(1, 1, false);

// scenes
const menu = new Menu(game)

const levels = [
  new LevelOne(playerA, playerB, game, timer),
  new LevelTwo(playerA, playerB, game, timer),
  new LevelThree(playerA, playerB, game, timer)
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
  //timer.setTime(0)
  timer.setTime(0)
  game.goToScene('level0');
});

const onHoldEvent = (event: ex.Input.KeyEvent) => {
  if (!game.controlsActive) return

  if (aActive)
    playerA.move(event)
  else
    playerB.move(event)
}

const onPressEvent = (event: ex.Input.KeyEvent) => {
  if (!game.controlsActive) return

  if (event.key === Keys.Space) {
    aActive = !aActive
    level.switchType(aActive)
  }
}

game.input.keyboard.on('hold', onHoldEvent)
game.input.keyboard.on('press', onPressEvent)

/* 
 Load resources
*/
for (let key in Resources) {
  loader.addResource(Resources[key]);
}
for (let key in MagentaResources) {
  loader.addResource(MagentaResources[key]);
}
for (let key in CyanResources) {
  loader.addResource(CyanResources[key]);
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

globalEvents.on('playerDeath', _ => {
  // leveli++
  // level = levels[leveli]
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
