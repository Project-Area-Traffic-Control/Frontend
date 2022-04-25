import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from 'react-feather';
import NavItem from './NavItem';
import RoomIcon from '@material-ui/icons/Room';
import AirplayIcon from '@material-ui/icons/Airplay';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import TelegramIcon from '@material-ui/icons/Telegram';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DevicesIcon from '@material-ui/icons/Devices';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemText from '@material-ui/core/ListItemText';
const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/video-moniter',
    icon: VideoLibraryIcon,
    title: 'Video Moniter'
  },
  {
    href: '/app/map',
    icon: RoomIcon,
    title: ' Moniter'
  },
  {
    href: '/app/map',
    icon: AirplayIcon,
    title: 'Remote Control'
  },
  {
    href: '/app/map',
    icon: DevicesIcon,
    title: 'Decives Manager'
  },
  {
    href: '/app/video-record',
    icon: VideoCallIcon,
    title: 'Video Record'
  },
  {
    href: '/app/massager',
    icon: TelegramIcon,
    title: 'Massager'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account Manager'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/404',
    icon: ExitToAppIcon,
    title: 'Logout'
  }
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
      setOpen(!open);
    };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <div>
            <NavItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick={handleClick}
            />
             <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onClick={handleClick}
               />
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
