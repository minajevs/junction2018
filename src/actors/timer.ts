import * as ex from 'excalibur';

const TILE = 48

export class ScoreTime extends ex.Label {
    time: number
    constructor(engine: ex.Engine) {
        super('0',
            engine.getWorldBounds().right - 80,
            engine.getWorldBounds().top + 20)

        this.fontFamily = "'Press Start 2P'"
        this.fontSize = 20
        this.color = ex.Color.White
        this.textAlign = ex.TextAlign.Right

        setInterval(_ => {
            this.time += 1
        }, 100)
    }

    setTime = (time: number) => {
        this.time = time
        this.text = this.time.toString()
    }
}
