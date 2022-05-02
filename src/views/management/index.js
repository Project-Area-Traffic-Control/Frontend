import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import DevicesView from './DevicesView';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import UserManageView from './UserManageView';
import { userService } from '../../services';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    // width: '100%',
    // paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const DeviceList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  return (
    <Page
      className={classes.root}
      title="DeviceList"
    >
      <Grid
        style={{
          // display: 'flex',
          width: '80%',
          height: '100%',
          // justifyContent: 'center',
          // alignContent: 'center',
          marginLeft: '10%'
        }}
      >
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography color="#000000" gutterBottom variant="h4">
                User Management
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="large" className={classes.margin}
                onClick={() => {
                  navigate('/app/add_user', { replace: true });
                }}
              >
                เพิ่มผู้ใช้
              </Button>
            </Grid>
            {/* <Grid item>
              <Button variant="contained" color="primary" size="large" className={classes.margin}>
                Edit Device
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" size="large" className={classes.margin}>
                Remove Device
              </Button>
            </Grid> */}
          </Grid>
        </div>
        {/* <Divider variant="middle" />
        <Divider light={true}></Divider> */}
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <DevicesView />
            </Grid>
          </Grid>
        </Container>
      </Grid >
    </Page >
  );
};

export default DeviceList;