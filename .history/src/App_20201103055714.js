import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from "./routes"
import {  useSelector,useDispatch } from 'react-redux';
import {alertDialogActions} from './_actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function App() {
const routing = useRoutes(routes);
const [open, setOpen] = React.useState(false);
  const alertDialog = useSelector(state => state.alertDialog);
  const dispatch = useDispatch();
  useEffect(()=>{
      if(alertDialog.type === 'pendding'){
        handleOpen()
      }

  },[alertDialog])
   
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
     dispatch(alertDialogActions.success("sure confirm"));
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
              <DialogTitle id="alert-dialog-title">{"Confirm ?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {alertDialog.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
                {routing}
        </ThemeProvider>

      );
}

export default App;
