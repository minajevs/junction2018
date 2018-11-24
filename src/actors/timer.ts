import * as ex from 'excalibur';

const TILE = 48

export const createTimer = () => {
    let time = 0
    const label = new ex.Label(time.toString(), 100, 100)
    label.fontFamily = "'Press Start 2P'"
    label.color = ex.Color.White
    label.textAlign = ex.TextAlign.Right

    setInterval(_ => {
        time++
        label.text = time.toString()
    }, 1000)

    return label
}

export class ScoreTime extends ex.Actor {
    time: number
    label: ex.Label
    constructor(engine: ex.Engine) {
        super()
        const label = new ex.Label('0', 100, 100)

        label.fontFamily = "'Press Start 2P'"
        label.fontSize = 30
        label.color = ex.Color.White

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
