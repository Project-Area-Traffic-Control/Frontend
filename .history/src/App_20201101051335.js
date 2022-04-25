import React,{useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from "./routes"
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from './_actions';
import { history } from './helpers';
import Alert from '@material-ui/lab/Alert';

function App() {
const alert = useSelector(state => state.alert);
const routing = useRoutes(routes);
const dispatch = useDispatch();
useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);


  return (
       <ThemeProvider theme={theme}>
                {alert.message &&
                <Alert severity={'error'}>{alert.message}</Alert>
                }
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      );
}

export default App;
