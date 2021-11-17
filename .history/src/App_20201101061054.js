import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import { Router, Route, Switch, Redirect } from 'react-router-dom';


function App() {


  return (
       <ThemeProvider theme={theme}>
        
          <GlobalStyles />
           <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
        </ThemeProvider>
      );
}

export default App;
