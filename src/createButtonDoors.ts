import { Button } from "./actors/button/button"
import { Door } from "./actors/door/door"
import { Resources } from './resources';
import { MagentaResources } from './magentaResources';
import { CyanResources } from "./cyanResources";

export type coords = {
  x: number
  y: number
}

export const createButtonDoors = (buttonCoords: coords, doorsCoords: coords[], isA: boolean) => {
  const doors = doorsCoords.map(coords => new Door(coords.x, coords.y, Resources.Door, Resources.Sword))
  const button = new Button(
    buttonCoords.x,
    buttonCoords.y,
    isA ? MagentaResources.btn : CyanResources.btn,
    isA ? MagentaResources.btnPressed : CyanResources.btnPressed,
    doors)

  return { doors, button }
}