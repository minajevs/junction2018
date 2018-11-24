import { Button } from "./actors/button/button"
import { Door } from "./actors/door/door"
import { Resources } from './resources';

export type coords = {
  x: number
  y: number
}

export const createButtonDoors = (buttonCoords: coords, doorsCoords: coords[]) => {
  const doors = doorsCoords.map(coords => new Door(coords.x, coords.y, Resources.Door, Resources.Block3))
  const button = new Button(buttonCoords.x, buttonCoords.y, Resources.Block3, doors)

  return { doors, button }
}