import * as ex from 'excalibur';

const TILE = 48

export const createTimer = () => {
    let time = 0
    const label = new ex.Label(time.toString(), 200, 100)
    label.fontFamily = "'Press Start 2P'"
    label.color = ex.Color.White
    label.textAlign = ex.TextAlign.Right

    setInterval(_ => {
        time++
        label.text = msToTime(time)
    }, 100)

    const resetTime = () => time = 0

    return { label, resetTime }
}

function msToTime(duration: number) {
    const dur = duration * 100;
    const milliseconds = dur % 1000 / 100
    const seconds = dur / 1000 % 60
    const minutes = dur / (1000 * 60) % 60

    const m = (minutes < 10) ? "0" + minutes.toFixed(0) : minutes.toFixed(0);
    const s = (seconds < 10) ? "0" + seconds.toFixed(0) : seconds.toFixed(0);

    return m + ":" + s + "." + milliseconds;
}

export class ScoreTime extends ex.Label {
    time: number
    interval: number
    constructor(engine: ex.Engine) {
        super('0:00', engine.getWorldBounds().right - 100, 100)
        this.time = 0

        this.fontFamily = "'Press Start 2P'"
        this.color = ex.Color.White
        this.textAlign = ex.TextAlign.Right

        this.interval = window.setInterval(_ => {
            this.time++
            this.text = msToTime(this.time)
        }, 100)

    }

    setTime = (time: number) => {
        this.time = time
        this.text = msToTime(this.time)
    }

    getTime = () => {
        return msToTime(this.time)
    }

    stopTime = () => {
        window.clearInterval(this.interval)
    }
}
