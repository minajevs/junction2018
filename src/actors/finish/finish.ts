import * as ex from 'excalibur';
import { Keys } from 'excalibur/dist/Input';
import { WallTile } from '../wall/wallTile';
import { globalEvents } from "../../index"
import { Player } from '../player/player';
import { Resources } from '../../resources';
import { portal } from "../../particles"

const TILE = 48

export class Finish extends ex.Actor {
    private playerA: Player
    private playerB: Player

    constructor(startpos: number, startposy: number, tx: number, ty: number, playerA: Player, playerB: Player) {
        super();
        this.setWidth(TILE);
        this.setHeight(TILE);
        this.playerA = playerA
        this.playerB = playerB
        this.x = startpos + tx * TILE;
        this.y = startposy + ty * TILE;
        this.color = new ex.Color(255, 255, 255);
        this.collisionType = ex.CollisionType.Passive;

        this.addDrawing(Resources.Finish)

        this.add(portal)

        this.on('collisionstart', (ev) => {
            if (!(ev.other instanceof Player)) return

            const col = this.collides(ev.other)
            if (col === null || Math.abs(col.x) < 5 && Math.abs(col.y) < 5) return

            console.log(this.collides(this.playerA), "A")
            console.log(this.collides(this.playerB), "B")

            if (this.collides(this.playerA) && this.collides(this.playerB)) {
                globalEvents.emit('finishLevel')
            }
        });
    }
}
