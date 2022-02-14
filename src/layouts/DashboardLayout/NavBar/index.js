import React, { useEffect, useState } from 'react';
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
  Typography,
  Collapse,
  ListItemIcon,
  ListItemText,
  Button
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
import { BarChart, CallSplit, DonutLarge, ExpandLess, ExpandMore, StarBorder, Videocam } from '@material-ui/icons';
import { junctionService } from '../../../services/junction.service';
import { control } from 'leaflet';

// import Collapse from '@material-ui/core/Collapse';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import StarBorder from '@material-ui/icons/StarBorder';
// import ListItemText from '@material-ui/core/ListItemText';
const items = [
  {
    href: '/app/dashboard',
    icon: DonutLarge,
    title: 'Dashboard'
  },
  {
    href: '/app',
    icon: HomeIcon,
    title: 'จุดควบคุมจราจร'
  },
  {
    href: '/app/junction',
    icon: DescriptionIcon,
    title: 'รายการจุดควบคุมการจราจร'
  },
  {
    href: '/app/junction/5/create_plan',
    icon: SettingsApplicationsIcon,
    title: 'ตั้งค่าการทำงาน'
  },
  {
    href: '/app/manual_control/5',
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
  },
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
    width: 326,
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
  avatarTextPrimary: {
    paddingTop: theme.spacing(1)
  },
  avatarTextSecond: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  collapse: {
    marginLeft: theme.spacing(5)
  },
  collapse_1: {
    marginLeft: theme.spacing(10)
  },
  collapse_2: {
    marginLeft: theme.spacing(15)
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [openJunction, setOpenJunction] = useState([]);
  const [openControl, setOpenControl] = useState([]);
  const [junctionList, setJunctionList] = useState([]);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickJunction = (ind, type) => {
    var temp = openJunction
    if (type == 0) {
      var reset
      for (let index = 0; index < temp.length; index++) {
        if (ind == index) {
          temp[ind].junction = !temp[ind].junction
          reset = temp[ind].junction
        }
      }
      if (reset == false) {
        temp[ind].control = false
      }
    }
    else if (type == 1) {
      for (let index = 0; index < temp.length; index++) {
        if (ind == index) {
          temp[ind].control = !temp[ind].control
        }
      }
    }
    setOpenJunction(temp);
  };
  useEffect(() => {
    junctionService.getAllJunction().then(data => {
      setJunctionList(data)
    })
  }, [])
  useEffect(() => {
    if (junctionList.length > 0) {
      var temp = []
      for (let index = 0; index < junctionList.length; index++) {
        temp[index] = {
          junction: false,
          control: false
        }
      }
      setOpenJunction(temp)
      // console.log(openJunction)
      // setOpenControl(temp)
    }
  }, [junctionList])
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
          {/* {items.map(item => ( */}
          <div>
            <ListItem >

              <NavItem
                href={items[0].href}
                key={items[0].title}
                title={items[0].title}
                icon={items[0].icon}
              // onClick={handleClick}
              />

            </ListItem>
            <ListItem >
              <NavItem
                href={location.pathname}
                key={items[1].title}
                title={items[1].title}
                icon={items[1].icon}
                onClick={handleClick}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <NavItem
                    href={items[2].href}
                    key={items[2].title}
                    title={items[2].title}
                    className={classes.collapse}
                  // icon={items[2].icon}
                  // onClick={handleClick}
                  />
                </ListItem>

                {junctionList.map((junction, index) => (
                  <div>
                    <ListItem sx={{ pl: 4 }}>
                      <NavItem
                        href={location.pathname}
                        key={items[2].title}
                        title={junction.name}
                        className={classes.collapse}
                        // icon={items[2].icon}
                        onClick={() => { handleClickJunction(index, 0) }}
                      />
                      {openJunction.length > 0 && openJunction[index].junction ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    {openJunction.length > 0 && <Collapse in={openJunction[index].junction} timeout="auto" unmountOnExit>
                      <NavItem
                        href={`/app/dashboard`}
                        key={items[2].title}
                        title="Dashboard"
                        className={classes.collapse_1}
                      // icon={items[2].icon}
                      // onClick={handleClick}
                      />
                      <NavItem
                        href={`/app/junction/${junction.id}`}
                        key={items[2].title}
                        title="ข้อมูลแยกจราจร"
                        className={classes.collapse_1}
                      // icon={items[2].icon}
                      // onClick={handleClick}
                      />
                      <NavItem
                        href={location.pathname}
                        key={items[2].title}
                        title="ตั้งค่าการทำงาน"
                        className={classes.collapse_1}
                        // icon={items[2].icon}
                        onClick={() => { handleClickJunction(index, 1) }}
                      />
                      <Collapse in={openJunction[index].control} timeout="auto" unmountOnExit>
                        <NavItem
                          href={`junction/${junction.id}/plans`}
                          key={items[2].title}
                          title="ตั้งค่ารูปแบบการจัดการสัญญาณไฟจราจร"
                          className={classes.collapse_2}
                        // icon={items[2].icon}
                        // onClick={handleClick}
                        />
                        <NavItem
                          href={`junction/${junction.id}/config_mode`}
                          key={items[2].title}
                          title="ตั้งค่าโหมดการทำงาน"
                          className={classes.collapse_2}
                        // icon={items[2].icon}
                        // onClick={handleClick}
                        />
                      </Collapse>
                      <NavItem
                        href={`/app/manual_control/${junction.id}`}
                        key={items[2].title}
                        title="หน้าควบคุม"
                        className={classes.collapse_1}
                      // icon={items[2].icon}
                      // onClick={handleClick}
                      />
                      <NavItem
                        href={`/app`}
                        key={items[2].title}
                        title="Camera"
                        className={classes.collapse_1}
                      // icon={items[2].icon}
                      // onClick={handleClick}
                      />
                      <NavItem
                        href={`/app`}
                        key={items[2].title}
                        title="ข้อมูลปริมาณการจราจร"
                        className={classes.collapse_1}
                      // icon={items[2].icon}
                      // onClick={handleClick}
                      />
                    </Collapse>}
                  </div>
                ))}
              </List>
            </Collapse>
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
          {/* // ))} */}
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
