import * as ex from 'excalibur';

const TILE = 48

export class Door extends ex.Actor {
  opened: boolean = false

  constructor(startpos: number, tx: number, ty: number, texture: ex.Texture, altTexture: ex.Texture) {
    super();
    this.setWidth(TILE);
    this.setHeight(TILE);
    this.x = startpos + tx * TILE;
    this.y = 48 + ty * TILE;
    this.color = new ex.Color(255, 255, 255);
    this.addDrawing("closed", texture.asSprite())
    this.addDrawing("opened", altTexture.asSprite())
    this.setDrawing(this.opened ? "opened" : "closed")
    this.collisionType = ex.CollisionType.Passive;

    this.toggle = this.toggle.bind(this)
  }

  toggle(flag: boolean) {
    this.opened = flag
    this.setDrawing(this.opened ? "opened" : "closed")
  }
}