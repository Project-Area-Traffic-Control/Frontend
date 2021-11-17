import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from "./routes"
import { useDispatch, useSelector, } from 'react-redux';
import {alertDialogActions} from './_actions';

function App() {
const routing = useRoutes(routes);

  const alertDialog = useSelector(state => state.alertDialog);
  useEffect(()=>{
    console.log(alertDialog)
  })
   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    
       <ThemeProvider theme={theme}>
        
       <GlobalStyles />
           <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending anonymous location data to
                  Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
                {routing}
        </ThemeProvider>

      );
}

export default App;
