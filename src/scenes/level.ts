import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { createWall } from '../actors/wall/wall';
import { Resources } from '../resources';
import { createBg } from './createbg';
import { globalEvents, Game } from '..';
import { Sobaka } from '../actors/sobaka/sobaka';
import { ScoreTime } from '../actors/timer';

export class ChangeTypeEvent extends ex.GameEvent<boolean>{
    data: boolean
    constructor(data: boolean) {
        super()
        this.data = data
    }
}

export class Level extends ex.Scene {
    public onInitialize(engine: ex.Engine) {
    }
    public onActivate() { }
    public onDeactivate() { }

    private aActive = true

    playerA: Player
    playerB: Player
    game: Game

    private objectA: ex.Actor[]
    private objectB: ex.Actor[]

    constructor(playerA: Player, playerB: Player, objectsA: ex.Actor[], objectsB: ex.Actor[], engine: Game) {
        super()
        this.engine = engine
        this.game = engine
        this.playerA = playerA
        this.playerB = playerB
        this.objectA = objectsA
        this.objectB = objectsB
        this.add(createBg(engine))
    }

    setPlayers = (startpos: number, xa: number, ya: number, xb: number, yb: number) => {
        this.add(this.playerA)
        this.add(this.playerB)
        this.playerA.cancelMove()
        this.playerB.cancelMove()
        this.playerA.setPos(startpos, xa, ya)
        this.playerB.setPos(startpos, xb, yb)

        this.on("changePlayer", _ => {
            this.aActive = !this.aActive
            this.switchType(this.aActive)
        })

        this.switchType(true)
        this.switchType(false)
        this.switchType(this.aActive)
    }

    private clear = () => {
        // this.remove(this.playerA)
        // this.remove(this.playerB)
        this.objectA.forEach(x => {
            if (x instanceof Sobaka) return
            this.remove(x)
        })
        this.objectB.forEach(x => {
            if (x instanceof Sobaka) return
            this.remove(x)
        })
    }

    switchType = (aActive: boolean) => {
        globalEvents.emit('switchType', new ChangeTypeEvent(aActive))
        this.playerA.toggle(aActive)
        this.playerB.toggle(!aActive)
        this.clear()
        if (aActive) {
            //this.add(this.playerA)
            this.objectA.forEach(x => this.add(x))
        } else {
            //this.add(this.playerB)
            this.objectB.forEach(x => this.add(x))
        }
    }
}
