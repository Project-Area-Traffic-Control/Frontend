import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from '../../components/Logo';
import Alert from '@material-ui/lab/Alert';
import { alertActions } from '../../_actions';
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

useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    useEffect(() => {
        console.log(alert)
    });
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
    <Alert  severity={'error'}>{alert.message}</Alert>
    </AppBar>
    

  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
