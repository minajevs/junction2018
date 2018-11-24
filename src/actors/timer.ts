import * as ex from 'excalibur';

const TILE = 48

export class ScoreTime extends ex.Actor {
    time: number
    label: ex.Label
    constructor(engine: ex.Engine) {
        super()
        this.setWidth(80)
        this.setHeight(80)
        this.x = engine.getWorldBounds().right / 2
        this.y = engine.getWorldBounds().top / 2

        const label = new ex.Label('0')

        label.fontFamily = "'Press Start 2P'"
        label.fontSize = 20
        label.color = ex.Color.White
        label.textAlign = ex.TextAlign.Right

        this.label = label

        setInterval(_ => {
            this.setTime(this.time + 1)
        }, 1000)
    }

    setTime = (time: number) => {
        this.time = time
        this.label.text = this.time.toString()
    }
}
