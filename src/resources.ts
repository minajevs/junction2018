import * as ex from 'excalibur';
const sword = require('./images32/sword.png');
const player = require('./images32/player_05.png');
const empty = require('./images32/empty.png');
const block = require('./images32/block_01.png');
const block2 = require('./images32/block_02.png');
const block3 = require('./images32/block_07.png');
const door = require('./images32/block_06.png');
const finish = require('./images32/environment_03.png');

let Resources = {
    Sword: new ex.Texture(sword),
    Player: new ex.Texture(player),
    Empty: new ex.Texture(empty),
    Block1: new ex.Texture(block),
    Block2: new ex.Texture(block2),
    Block3: new ex.Texture(block3),
    Door: new ex.Texture(door),
    Finish: new ex.Texture(finish)
}

export { Resources }
