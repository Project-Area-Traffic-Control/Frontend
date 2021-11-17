import React from 'react';
import { useRoutes,Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from "./routes"
import { CookiesProvider } from 'react-cookie';
function App() {
const routing = useRoutes(routes);


  return (
    <CookiesProvider>
       <ThemeProvider theme={theme}>
        
          <GlobalStyles />
                {routing}
        </ThemeProvider>
    </CookiesProvider>

      );
}

export default App;
