import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from '../../components/Logo';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

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
      <br></br>
      <br></br>

    <Alert  severity={'error'}>{alert.message}</Alert>
    </AppBar>
    

  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
