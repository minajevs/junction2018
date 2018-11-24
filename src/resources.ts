import * as ex from 'excalibur';
const sword = require('./images32/sword.png');
const player = require('./images32/player_05.png');
const empty = require('./images32/empty.png');
const door = require('./images32/block_06.png');
const finish = require('./images32/environment_03.png');

const controls = require('./images32/Controls.png');
const bg = require('./images-retrowave/bg.jpg');

let Resources = {
    Sword: new ex.Texture(sword),
    Empty: new ex.Texture(empty),
    Door: new ex.Texture(door),
    Finish: new ex.Texture(finish),

    Bg: new ex.Texture(bg),
    Controls: new ex.Texture(controls),
}

export { Resources }
