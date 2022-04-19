import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import TotalCarThisDay from "./TotalCarThisDay";
import TotalCar7Day from "./TotalCar7Day";
import TotalCarBlacklist from "./TotalCarBlacklist";
import TotalCarWhitelist from "./TotalCarWhitelist";
import MapView from "./Map/MapView";
import ChartView from "./Chart";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F1F1F1",
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridBox: {
    height: '100%'
  },
  chartBox: {
    height: '100'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container >
        <Grid container spacing={3} className={classes.gridBox}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCarThisDay />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCar7Day />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCarBlacklist />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCarWhitelist />
          </Grid>

          <Grid item lg={8} md={8} xl={8} xs={12}>
            <ChartView />
            {/* <MainVideo /> */}
          </Grid>

          {/* <Grid item lg={4} md={6} xl={4} xs={12}> */}

          {/* <MainVideo /> */}
          {/* </Grid> */}



          <Grid item lg={4} md={4} xl={4} xs={12}>
            {/* <MainVideo /> */}
            <MapView></MapView>
            {/* <DashboardTable /> */}
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
