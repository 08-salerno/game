import light from './light';
import dark from './dark';
import { Theme, Themes } from './types';

const themes: Record<Themes | string, Theme> = {
  light,
  dark,
};

export default themes;
