import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import { Router, Route, Switch, Redirect, } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView';
import { PrivateRoute } from  "./components/PrivateRoute"
import { history } from './helpers';


function App() {


  return (
       <ThemeProvider theme={theme}>
        
          <GlobalStyles />
                  <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/app/dashboard" component={NotFoundView} />
                            {/* <Route path="/*" element ={MainLayout} /> */}
                            <Route path="/login" component={LoginView} />
                            <Route path="/register" component={RegisterView} />
                            <Route path="/404" component={NotFoundView} />
                            
                            <Redirect from="*" to="/404" />
                        </Switch>
                    </Router>
        </ThemeProvider>
      );
}

export default App;
