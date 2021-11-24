import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Avatar,
  Typography
} from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {
  AlignJustify,
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
import PieChartIcon from '@material-ui/icons/PieChart';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import CommuteIcon from '@material-ui/icons/Commute';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import { BarChart, CallSplit, DonutLarge, Videocam } from '@material-ui/icons';

// import Collapse from '@material-ui/core/Collapse';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import StarBorder from '@material-ui/icons/StarBorder';
// import ListItemText from '@material-ui/core/ListItemText';
const items = [
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'หน้าหลัก'
  },
  {
    href: '/app/dashboard',
    icon: DonutLarge,
    title: 'Dashboard'
  },
  {
    href: '/app/junction',
    icon: DescriptionIcon,
    title: 'ข้อมูลแยกจราจร'
  },
  {
    href: '/app/control',
    icon: SettingsApplicationsIcon,
    title: 'ตั้งค่าการทำงาน'
  },
  {
    href: '/app/remote-control',
    icon: CallSplit,
    title: 'หน้าควบคุม'
  },
  {
    href: '/app/management',
    icon: Videocam,
    title: 'Monitor'
  },
  {
    href: '/app/video-record',
    icon: BarChart,
    title: 'ข้อมูลปริมาณการจราจร'
  },
  {
    href: '/404',
    icon: ExitToAppIcon,
    title: 'Logout'
  }
];

const user = {
  avatar: '/static/avatar/avatar_test.png',
  jobTitle: 'ผู้บังคับหมู่งานจราจร',
  name: 'สิบตรีอี้ป๋อ หวัง'
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff"
  },
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
    backgroundColor: "#ffffff"
  },
  avatar: {
    cursor: 'pointer',
    width: 68,
    height: 68
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatarBox: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  },
  avatarTextPrimary:{
    paddingTop: theme.spacing(1)
  },
  avatarTextSecond:{
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
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
    <Box height="100%" display="flex" flexDirection="column" className={clsx(classes.root)}>
      <Box
        className={classes.avatarBox}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
          className={classes.avatar}
        />
        <Typography
          color="textPrimary"
          variant="h5"
          className={classes.avatarTextPrimary}
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.avatarTextSecond}
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <div>
              <ListItem button>

                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                // onClick={handleClick}
                />
              </ListItem>

              {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onClick={handleClick}
             />
                </List>
              </Collapse> */}
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
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
