import {colors, createTheme} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import alertColors from "./alertColors";

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#54428E'
    },
    secondary: {
      main: '#545454',
      contrastText: '#ffffff'
    },
    black: {
      main: '#000000',
      contrastText: '#ffffff'
    },
    green: {
      main: '#71ff78',
      contrastText: '#ffffff'
    },
    white: {
      main: '#ffffff',
      contrastText: '#545454'
    },
    ligthgrey: {
      main: '#a1a1a1',
      contrastText: '#ffffff'
    }
  },
  shadows,
  typography,
  alertColors
});

export default theme;

