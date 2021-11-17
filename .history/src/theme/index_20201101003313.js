import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    // type: 'dark'
    background: {
      dark: '#000a12',
      default: colors.common.black,
      paper: '#304fff'
    },
    primary: {
      main: colors.indigo[600]
    },
    secondary: {
      main: colors.indigo[100]
    },
    text: {
      primary: colors.grey[50],
      secondary: colors.blue[600]
    }
  },
  shadows,
  typography
});

export default theme;
