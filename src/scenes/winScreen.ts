import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { Level } from './level';
import { createWall, createBorders } from '../actors/wall/wall';
import { Resources } from '../resources';
import { Button } from "../actors/button/button"
import { Door } from "../actors/door/door"
import { Finish } from '../actors/finish/finish';
import { Label, Vector } from 'excalibur';
import { createBg } from './createbg';
import { ScoreTime } from '../actors/timer';
import { Game } from '..';

export class WinScreen extends ex.Scene {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() {
        this.timer.stopTime()
        this.score.text = this.timer.getTime()
        this.game.finishControls = true
    }
    public onDeactivate() { }

    game: Game
    label: ex.Label
    label2: ex.Label
    score: ex.Label
    scoreLabel: ex.Label
    continue: ex.Label
    timer: ScoreTime

    constructor(engine: Game, timer: ScoreTime) {
        super();
        this.game = engine
        this.timer = timer
        this.label = new ex.Label(
            `Congratulations`,
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2
        )

        this.label.fontFamily = "'Press Start 2P'"
        this.label.fontSize = 40
        this.label.color = ex.Color.fromHex('ED1B7B')
        this.label.textAlign = ex.TextAlign.Center
        this.label.opacity = 0

        this.label2 = new ex.Label(
            `You won!`,
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2 + 70
        )

        this.label2.fontFamily = "'Press Start 2P'"
        this.label2.fontSize = 40
        this.label2.color = ex.Color.fromHex('ED1B7B')
        this.label2.textAlign = ex.TextAlign.Center
        this.label2.opacity = 0

        this.scoreLabel = new ex.Label(
            `Your score:`,
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2
        )

        this.scoreLabel.fontFamily = "'Press Start 2P'"
        this.scoreLabel.fontSize = 25
        this.scoreLabel.color = ex.Color.fromHex('ED1B7B')
        this.scoreLabel.textAlign = ex.TextAlign.Center
        this.scoreLabel.opacity = 0

        this.score = new ex.Label(
            this.timer.text,
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom / 2 + 35
        )

        this.score.fontFamily = "'Press Start 2P'"
        this.score.fontSize = 25
        this.score.color = ex.Color.fromHex('ED1B7B')
        this.score.textAlign = ex.TextAlign.Center
        this.score.opacity = 0

        this.continue = new ex.Label(
            'Press any key to continue',
            engine.getWorldBounds().right / 2,
            engine.getWorldBounds().bottom - 30
        )

        this.continue.fontFamily = "'Press Start 2P'"
        this.continue.fontSize = 20
        this.continue.color = ex.Color.fromHex('ED1B7B')
        this.continue.textAlign = ex.TextAlign.Center
        this.continue.opacity = 0

        this.label.actions
            .callMethod(() => {
                this.label2.actions
                    .fade(1, 2000)
            })
            .fade(1, 2000)
            .callMethod(() => {
                this.label2.actions
                    .scaleTo(1.5, 1.5, 0.1, 0.1)
            })
            .scaleTo(1.5, 1.5, 0.1, 0.1)
            .callMethod(() => {
                this.label2.actions
                    .moveTo(this.label2.x, this.label2.y - 200, 700)
            })
            .moveTo(this.label.x, this.label.y - 200, 700)
            .callMethod(() => {
                this.scoreLabel.actions
                    .fade(1, 2000)
                    .callMethod(() => {
                        this.score.actions
                            .fade(1, 2000)
                            .delay(1000)
                            .callMethod(() => {
                                this.game.controlsActive = true
                                this.continue.actions
                                    .fade(1, 1000)
                            })
                    })
            })


        this.add(createBg(engine))
        this.add(this.label)
        this.add(this.label2)
        this.add(this.score)
        this.add(this.scoreLabel)
        this.add(this.continue)
    }

    switchType = (aActive: boolean) => {
        console.log('TEST')
        this.label.color = aActive ? ex.Color.fromHex('ED1B7B') : ex.Color.Cyan
        this.label2.color = aActive ? ex.Color.fromHex('ED1B7B') : ex.Color.Cyan
        this.score.color = aActive ? ex.Color.fromHex('ED1B7B') : ex.Color.Cyan
        this.scoreLabel.color = aActive ? ex.Color.fromHex('ED1B7B') : ex.Color.Cyan
        this.continue.color = aActive ? ex.Color.fromHex('ED1B7B') : ex.Color.Cyan
    }
}
