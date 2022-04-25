import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    // type: 'dark'
    background: {
      dark: '#304fff',
      default: colors.common.black,
      paper: '#304fff'
    },
    primary: {
      main: colors.indigo[100]
    },
    secondary: {
      main: colors.indigo[100]
    },
    text: {
      primary: colors.grey[50],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
