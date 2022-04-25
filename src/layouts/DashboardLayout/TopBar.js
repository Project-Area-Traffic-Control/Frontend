import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../../components/Logo';
import AccountCircle from '@material-ui/icons/AccountCircle';
import theme from '../../theme';
import Typography from '@material-ui/core/Typography';
import { useLocation } from "react-router-dom";
import NavBar from '../DashboardLayout/NavBar/index'
import { Dashboard, SettingsCellOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#17395C"
  },
  avatar: {
    width: 60,
    height: 60
  },
  NotificationsIcon: {
    // position: "absolute",
    // height: "44px",
    // // left: "30px",
    // right: "100px",
    // top: "15px",
    right: "200px"
  },
  AccountCircle: {
    right: "100px"
    
  },
  title: {
    padding: "0px",
    marginRight: "1150px"
  }
}));
const usePathname = () => {
  const location = useLocation();
  return location.pathname;
}
const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  // console.log(usePathname());
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
