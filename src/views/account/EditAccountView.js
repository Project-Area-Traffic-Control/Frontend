import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import Page from '../../components/Page';
import { deviceService } from "../../services"
import { useDispatch, useSelector, } from 'react-redux';
import { alertDialogActions } from '../../_actions';
import Alert from "../../components/Alert";
import AccountInfo from './AccountView';
import EditAccountInfo from './EditAccountInfo';
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

const RegisterView = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  return (
    <Page
      className={classes.root}
      title="Edit_Account"
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
          <EditAccountInfo />
        </Grid>
      </Grid>
    </Page>
  );
};

export default RegisterView;
