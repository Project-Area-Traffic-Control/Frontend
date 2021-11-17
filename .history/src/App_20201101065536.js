import React from 'react';
import { useRoutes,Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from "./routes"
import { history } from './helpers';
function App() {
const routing = useRoutes(routes);


  return (
       <ThemeProvider theme={theme}>
        
          <GlobalStyles />
          <Router history={history}>
          {routing}
              </Router>
        </ThemeProvider>
      );
}

export default App;
