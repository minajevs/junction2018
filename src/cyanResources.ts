import * as ex from 'excalibur';

const copLeft = require('./images-retrowave/cyan/cop_1_left.png');
const copRight = require('./images-retrowave/cyan/cop_1_right.png');

const leftTop = require('./images-retrowave/cyan/wall1.png');
const leftBottom = require('./images-retrowave/cyan/wall2.png');
const rightTop = require('./images-retrowave/cyan/wall3.png');
const rightBottom = require('./images-retrowave/cyan/wall4.png');

const endLeft = require('./images-retrowave/cyan/wall5.png');
const endDown = require('./images-retrowave/cyan/wall6.png');
const endRight = require('./images-retrowave/cyan/wall7.png');
const endTop = require('./images-retrowave/cyan/wall8.png');

const topDown = require('./images-retrowave/cyan/wall10.png');
const leftRight = require('./images-retrowave/cyan/wall11.png');

const cross = require('./images-retrowave/cyan/wall12.png');
const tTop = require('./images-retrowave/cyan/wall13.png');
const tDown = require('./images-retrowave/cyan/wall14.png');
const tRight = require('./images-retrowave/cyan/wall15.png');
const tLeft = require('./images-retrowave/cyan/wall16.png');

const btn = require('./images-retrowave/cyan/button.png');
const btnPressed = require('./images-retrowave/cyan/button_pressed.png');

const dhc = require('./images-retrowave/cyan/door_3.png');
const dho = require('./images-retrowave/cyan/door_3_4_opened.png');

const dvc = require('./images-retrowave/cyan/door2.png');
const dvo = require('./images-retrowave/cyan/door1_2_opened.png');

const dogLeft = require('./images-retrowave/cyan/dog_left.png');
const dogRight = require('./images-retrowave/cyan/dog_right.png');


let CyanResources = {
    copLeft: new ex.Texture(copLeft),
    copRight: new ex.Texture(copRight),

    dogLeft: new ex.Texture(dogLeft),
    dogRight: new ex.Texture(dogRight),

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

export { CyanResources }
