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
import { DeathNote } from './actors/deathNote';
import { WinScreen } from './scenes/winScreen';
import { DeathEvent } from './actors/sobaka/sobaka';

export const globalEvents = new ex.EventDispatcher({})

export class Game extends ex.Engine {
  controlsActive: boolean = false
  finishControls: boolean = false
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
loader.logo = 'data:image/png;base64,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'
loader.backgroundColor = '#26173D'
const timer = new ScoreTime(game)
const deathNote = new DeathNote(game)

const playerA = new Player(1, 1, true);
const playerB = new Player(1, 1, false);

// scenes
const menu = new Menu(game, timer)

const levels = [
  new LevelOne(playerA, playerB, game, timer, deathNote),
  new LevelTwo(playerA, playerB, game, timer, deathNote),
  new LevelThree(playerA, playerB, game, timer, deathNote),
  new WinScreen(game, timer)
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
const onHoldEvent = (event: ex.Input.KeyEvent) => {
  if (!game.controlsActive) return

  if (aActive)
    playerA.move(event)
  else
    playerB.move(event)
}

const onPressEvent = (event: ex.Input.KeyEvent) => {
  if (game.finishControls) {
    if (event.key === Keys.Space) {
      aActive = !aActive
      level.switchType(aActive)
    }
  }

  if (!game.controlsActive) return

  if (game.finishControls && game.controlsActive) {
    game.finishControls = false
    leveli = 0
    level = levels[leveli]
    game.input.pointers.primary.on("down", () => {
      // Mouse click
      game.input.pointers.primary.off("down");
      //timer.setTime(0)
      timer.setTime(0)
      game.goToScene('level0');
    });
    game.goToScene('menu')
  }

  if (event.key === Keys.Space) {
    aActive = !aActive
    level.switchType(aActive)
  }
  const { x, y } = aActive ? playerA : playerB
  if (event.key === Keys.G)
    globalEvents.emit('playerDeath', new DeathEvent(x, y, aActive ? true : false))

  if (event.key === Keys.T)
    globalEvents.emit('finishLevel')
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

globalEvents.on('playerDeath', (event: DeathEvent) => {
  // leveli++
  // level = levels[leveli]
  game.goToScene(`level${leveli}`)
  level.onActivate()
  level.showDeathParticle(event.x, event.y, event.isA)
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
