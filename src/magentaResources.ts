import * as ex from 'excalibur';

const copLeft = require('./images-retrowave/magenta/cop_1_left.png');
const copRight = require('./images-retrowave/magenta/cop_1_right.png');

const leftTop = require('./images-retrowave/magenta/wall1.png');
const leftBottom = require('./images-retrowave/magenta/wall2.png');
const rightTop = require('./images-retrowave/magenta/wall3.png');
const rightBottom = require('./images-retrowave/magenta/wall4.png');

const endLeft = require('./images-retrowave/magenta/wall5.png');
const endDown = require('./images-retrowave/magenta/wall6.png');
const endRight = require('./images-retrowave/magenta/wall7.png');
const endTop = require('./images-retrowave/magenta/wall8.png');

const topDown = require('./images-retrowave/magenta/wall10.png');
const leftRight = require('./images-retrowave/magenta/wall11.png');

const cross = require('./images-retrowave/magenta/wall12.png');
const tTop = require('./images-retrowave/magenta/wall13.png');
const tDown = require('./images-retrowave/magenta/wall14.png');
const tRight = require('./images-retrowave/magenta/wall15.png');
const tLeft = require('./images-retrowave/magenta/wall16.png');

const btn = require('./images-retrowave/magenta/button.png');
const btnPressed = require('./images-retrowave/magenta/button_pressed.png');

const dhc = require('./images-retrowave/magenta/door_3.png');
const dho = require('./images-retrowave/magenta/door_3_4_opened.png');

const dvc = require('./images-retrowave/magenta/door2.png');
const dvo = require('./images-retrowave/magenta/door1_2_opened.png');


let MagentaResources = {
    copLeft: new ex.Texture(copLeft),
    copRight: new ex.Texture(copRight),

    btn: new ex.Texture(btn),
    btnPressed: new ex.Texture(btnPressed),

    doorHorizontalClosed: new ex.Texture(dhc),
    doorHorizontalOpen: new ex.Texture(dho),
    doorVerticalClosed: new ex.Texture(dvc),
    doorVerticalOpen: new ex.Texture(dvo),

    leftTop: new ex.Texture(leftTop),
    leftBottom: new ex.Texture(leftBottom),
    rightTop: new ex.Texture(rightTop),
    rightBottom: new ex.Texture(rightBottom),

    endLeft: new ex.Texture(endLeft),
    endDown: new ex.Texture(endDown),
    endRight: new ex.Texture(endRight),
    endTop: new ex.Texture(endTop),

    topDown: new ex.Texture(topDown),
    leftRight: new ex.Texture(leftRight),

    cross: new ex.Texture(cross),
    tTop: new ex.Texture(tTop),
    tDown: new ex.Texture(tDown),
    tRight: new ex.Texture(tRight),
    tLeft: new ex.Texture(tLeft),
}

export { MagentaResources }
