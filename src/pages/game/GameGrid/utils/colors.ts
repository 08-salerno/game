import acornImg from '../images/acorn/acorn';
import cactusImg from '../images/cactus/cactus';
import fishImg from '../images/fish/fish';
import snowImg from '../images/snow/snow';
import beeImg from '../images/bee/bee';
import mushroomImg from '../images/mushroom/mushroom';
import ladybugImg from '../images/ladybug/ladybug';

export type Color = 'Sienna' | 'MediumAquamarine' | 'LightSalmon' | 'Gold' | 'white' | 'pink' | 'MediumPurple';

const colors: Color[] = ['Sienna', 'MediumAquamarine', 'LightSalmon', 'Gold', 'white', 'pink', 'MediumPurple'];

const colorImageMap = new Map<Color, HTMLImageElement>([
  ['Sienna', acornImg],
  ['MediumAquamarine', cactusImg],
  ['LightSalmon', fishImg],
  ['Gold', beeImg],
  ['white', snowImg],
  ['pink', mushroomImg],
  ['MediumPurple', ladybugImg],
]);

export function getRandomColor(options: {
    except?: Color[]
} = {}): Color {
  const { except } = options;

  if (except) {
    const colorsWithoutExcepted = colors.filter((color) => !except.includes(color));
    const randomColorIndex = Math.floor(Math.random() * colorsWithoutExcepted.length);
    return colorsWithoutExcepted[randomColorIndex];
  }

  const randomColorIndex = Math.floor(Math.random() * colors.length);
  return colors[randomColorIndex];
}

export function getImageByColor(color: Color): HTMLImageElement {
  if (!isColor(color)) {
    throw new Error('color not from palette');
  }
  return colorImageMap.get(color)!;
}

export function isColor(color: string): color is Color {
  return colors.includes(color as Color);
}
