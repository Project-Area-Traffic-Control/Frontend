import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import DevicesView from './AccountView';
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

const AccountList = () => {
  const classes = useStyles();
 const navigate = useNavigate();
  return (
    <Page
      className={classes.root}
      title="AccountList"
    > <div className={classes.section1}>
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography color="textPrimary" gutterBottom variant="h4">
            Account Manager
        </Typography>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="primary" size="large" className={classes.margin}
       onClick= {()=>{
             navigate('/app/add_device', { replace: true });
       }}
       >
          Add Account
        </Button>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="primary" size="large" className={classes.margin}>
          Edit Account
        </Button>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="secondary" size="large" className={classes.margin}>
          Remove Account
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
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <DevicesView />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AccountList;