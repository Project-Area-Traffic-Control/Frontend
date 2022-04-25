import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    // type: 'dark'
    background: {
      dark: '#F7F8FC',
      default: colors.common.black,
      paper: '#FFFFFF'
    },
    primary: {
      main: colors.indigo[600]
    },
    secondary: {
      main: colors.red[500]
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
