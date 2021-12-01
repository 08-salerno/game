import { colors } from '../colors';

const light = {
  backgroundColor: colors.white.white,
  font: colors.black.black,
  buttons: {
    font: colors.black.black,
    main: {
      main: colors.blue.blue_200,
      hover: colors.blue.blue_400,
      disabled: colors.blue.blue_50,
    },
    alt: {
      main: colors.green.green_200,
      hover: colors.green.green_400,
      disabled: colors.green.green_50,
    },
    exit: {
      main: colors.purple.purple_200,
      hover: colors.purple.purple_400,
      exit: colors.purple.purple_50,
    },
  },
  navbar: {
    backgroundColor: colors.grey.grey_800,
    font: colors.white.white,
    fontHover: colors.grey.grey_400,
    buttonBackground: colors.white.white,
    buttonHover: colors.grey.grey_200,
    buttonText: colors.black.black,
  },
  form: {
    font: colors.black.black,
    label: colors.grey.grey_800,
    background: colors.white.white,
    underline: colors.grey.grey_800,
  },
};

export default light;
