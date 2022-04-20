import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { GroupAdd, SportsRugbySharp } from '@material-ui/icons';
import AccountInfo from './AccountView'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    // display: 'flex',
  },
  container: {
    padding: theme.spacing(2, 5),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  profileImg: {
    height: '100%',
  },
  testGrid: {
    width: '100%',
    display: 'flex',
    marginLeft: '13%'
  }
}));

const AccountList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Grid
        className={classes.container}
      >
        <Grid
          className={classes.testGrid}
        >
          <Grid
            className={classes.profileImg}
          >
            <img src='/static/avatar/avatar_test.png' width='216px' height='188px' />
          </Grid>
          <AccountInfo />
        </Grid>
      </Grid>
    </Page>
  );
};

export default AccountList;