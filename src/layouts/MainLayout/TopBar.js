import React,{useEffect,useState} from 'react';

import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from '../../components/Logo';
import Alert from '@material-ui/lab/Alert';
import { alertActions } from '../../_actions';
import { history } from '../../helpers';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));


const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
const alert = useSelector(state => state.alert);
const dispatch = useDispatch();
const [close,setClose] = useState(true)
useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    useEffect(() => {
      console.log(alert)
        setClose(true)
    },[alert]);
  return (

    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
               {alert.message && close &&
                <Alert severity={`${alert.type}`}  
                onClose={() => {
                  setClose(false)
                }}
                >{alert.message}</Alert>
                }
    </AppBar>
    

  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
