import React from 'react';
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



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
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

  return (
    <Page
      className={classes.root}
      title="DeviceList"
    > <div className={classes.section1}>
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography color="textPrimary" gutterBottom variant="h4">
          Device Manager
        </Typography>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="primary" size="large" className={classes.margin}
       onClick= {()=>{

       }}
       >
          Add Device
        </Button>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="primary" size="large" className={classes.margin}>
          Edit Device
        </Button>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="secondary" size="large" className={classes.margin}>
          Remove Device
        </Button>
      </Grid>
    </Grid>
    <Typography color="textSecondary" variant="body2">
      Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the
      hall.
    </Typography>
  </div>
  <Divider variant="middle" />
    <Divider light={true}></Divider>
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
    </Page>
  );
};

export default DeviceList;