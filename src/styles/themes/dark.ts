import { colors } from '../colors';
import { Theme } from './types';

const dark: Theme = {
  name: 'dark',
  backgroundColor: colors.black.black,
  font: colors.white.white,
  buttons: {
    font: colors.black.black,
    main: {
      main: colors.grey.grey_400,
      hover: colors.grey.grey_100,
      disabled: colors.grey.grey_600,
    },
    alt: {
      main: colors.grey.grey_400,
      hover: colors.grey.grey_100,
      disabled: colors.grey.grey_600,
    },
    exit: {
      main: colors.grey.grey_400,
      hover: colors.grey.grey_100,
      exit: colors.grey.grey_600,
    },
  },
  navbar: {
    backgroundColor: colors.grey.grey_800,
    font: colors.white.white,
    fontHover: colors.grey.grey_400,
    buttonBackground: colors.grey.grey_700,
    buttonHover: colors.grey.grey_800,
    buttonText: colors.white.white,
  },
  form: {
    font: colors.grey.grey_100,
    label: colors.grey.grey_500,
    background: colors.black.black,
    underline: colors.grey.grey_100,
  },
};

export default dark;
