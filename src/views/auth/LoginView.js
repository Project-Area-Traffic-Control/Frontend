import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  InputAdornment
} from '@material-ui/core';

import Page from '../../components/Page';
import { userActions } from '../../_actions';
import { useDispatch, useSelector, } from 'react-redux';
import { useCookies } from 'react-cookie';
import { AccountCircle, Lock, Person } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    height: '100%',
  },
  content: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  Logo: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '50%',
    height: '100%'
  },
  LogIn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: '50%',
    height: '100%',
    backgroundColor: "#287298"
  },
  signIn: {
    color: "#FFFFFF"
  },
  TextField: {
    backgroundColor: "#FFFFFF",
    borderRadius: '10px'
  }

}));

const LoginView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggingIn = useSelector(state => state.authentication);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(userActions.logout());
    removeCookie('access_token')
    //  userService.verify()

  }, []);
  const location = useLocation();

  // useEffect(() => {
  //   if (loggingIn.loggedIn) {
  //     navigate('/app/dashboard', { replace: true });
  //   }


  // }, [loggingIn])

  useEffect(() => {
    if (submit == true) {
      navigate('/app/dashboard', { replace: true });
    }


  }, [submit])

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box className={classes.content}>
        <Box className={classes.Logo}>
          <Box display='flex' flexDirection='column' justifyContent="center">
            <img src='./static/logIn_logo.png' width='379px' height='199px' />
          </Box>
        </Box>
        <Box
          className={classes.LogIn}
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: 'admin@security.io',
                password: 'Password123'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={(e) => {
                // if (e.email && e.password) {
                // get return url from location state or default to home page
                // const { from } = location.state || { from: { pathname: "/app/dashboard" } };
                // dispatch(userActions.login(e.email, e.password, from));
                setSubmit(true)
                // }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      className={classes.signIn}
                      variant="h2"
                    >
                      Sign in
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    // helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="filled"
                    className={classes.TextField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    // helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="filled"
                    className={classes.TextField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>

                  {/* <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                    </Link>
                  </Typography> */}
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Box>
    </Page>
  );
};

export default LoginView;
