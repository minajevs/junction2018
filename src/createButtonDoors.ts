import { Button } from "./actors/button/button"
import { Door } from "./actors/door/door"
import { Resources } from './resources';
import { MagentaResources } from './magentaResources';
import { CyanResources } from "./cyanResources";

export type coords = {
  x: number
  y: number
}

export const createButtonDoors = (startpos: number, buttonCoords: coords, doorsCoords: coords, horizontal: boolean, isA: boolean) => {
  const doors = [doorsCoords].map(coords => new Door(
    startpos,
    coords.x,
    coords.y,
    horizontal
      ? !isA
        ? MagentaResources.doorHorizontalClosed
        : CyanResources.doorHorizontalClosed
      : !isA
        ? MagentaResources.doorVerticalClosed
        : CyanResources.doorVerticalClosed,
    horizontal
      ? !isA
        ? MagentaResources.doorHorizontalOpen
        : CyanResources.doorHorizontalOpen
      : !isA
        ? MagentaResources.doorHorizontalOpen
        : CyanResources.doorHorizontalOpen,
  ))
  const button = new Button(
    startpos,
    buttonCoords.x,
    buttonCoords.y,
    isA ? MagentaResources.btn : CyanResources.btn,
    isA ? MagentaResources.btnPressed : CyanResources.btnPressed,
    doors)

  return { doors, button }
}