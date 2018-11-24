import * as ex from 'excalibur';
import { Player } from '../actors/player/player';
import { createWall } from '../actors/wall/wall';
import { Resources } from '../resources';

export class Level extends ex.Scene {
    public onInitialize(engine: ex.Engine) { }
    public onActivate() { }
    public onDeactivate() { }

    private aActive = true

    playerA: Player
    playerB: Player

    private objectA: ex.Actor[]
    private objectB: ex.Actor[]

    constructor(playerA: Player, playerB: Player, objectsA: ex.Actor[], objectsB: ex.Actor[]) {
        super()
        this.playerA = playerA
        this.playerB = playerB
        this.objectA = objectsA
        this.objectB = objectsB

        this.on("changePlayer", _ => {
            this.aActive = !this.aActive
            this.switchType(this.aActive)
        })

        this.switchType(this.aActive)
    }

    setPlayers = (xa: number, ya: number, xb: number, yb: number) => {
        this.playerA.setPos(xa, ya)
        this.playerB.setPos(xb, yb)
    }

    private clear = () => {
        // this.remove(this.playerA)
        // this.remove(this.playerB)
        this.objectA.forEach(x => this.remove(x))
        this.objectB.forEach(x => this.remove(x))
    }

    switchType = (aActive: boolean) => {
        this.clear()
        if (aActive) {
            this.add(this.playerA)
            this.objectA.forEach(x => this.add(x))
        } else {
            this.add(this.playerB)
            this.objectB.forEach(x => this.add(x))
        }
    }
}
