import * as ex from 'excalibur';
const sword = require('./images/sword.png');
const player = require('./images/Player/player_05.png');
const empty = require('./images/empty.png');
const block = require('./images/Blocks/block_01.png');
const block2 = require('./images/Blocks/block_02.png');
const block3 = require('./images/Blocks/block_07.png');
const door = require('./images/Blocks/block_06.png');
const finish = require('./images/Environment/environment_03.png');

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
