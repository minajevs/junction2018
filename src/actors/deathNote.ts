import * as ex from 'excalibur';
import { globalEvents } from '..';

const TILE = 48

export class DeathNote extends ex.Label {
    showing: boolean
    constructor(engine: ex.Engine) {
        super('You failed!', engine.getWorldBounds().right - 100, 130)

        this.fontFamily = "'Press Start 2P'"
        this.color = ex.Color.White
        this.fontSize = 20
        this.textAlign = ex.TextAlign.Right
        this.opacity = 0

        this.showing = false

        globalEvents.on('playerDeath', () => {
            if (this.showing) return

            this.showing = true
            this.actions
                .fade(1, 1000)
                .delay(1000)
                .fade(0, 1000)
                .asPromise()
                .then(_ => this.showing = false)
        })
    }

    showDeath = () => {

    }
}
