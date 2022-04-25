import React, { useState,useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import {deviceService} from "../../services"
import { useDispatch, useSelector, } from 'react-redux';
import {alertDialogActions} from '../../_actions';
import Alert from "../../components/Alert"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const alertDialog = useSelector(state => state.alertDialog);
    const [alert,setAlert] = useState(false)
    const [data,setData] = useState({})
      useEffect(()=>{
      if(alertDialog.type === 'success' && data != {}){
             deviceService.addDevice(data).then((data)=>{
                    console.log(data)
                    if(data.status===200) {
                            setAlert(true)
                    }
                }).catch((e)=>{
                    alert(e)
                })
        
            }
      } ,[alertDialog])

  // const navigate = useNavigate();na

  return (
    <Page
      className={classes.root}
      title="Create Device"
    >
            {alert &&
             <Alert massage="Add Device is Success"></Alert>
            }
            <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              phone_number: '',
              ownerName: '',
              brand: '',
              ipAddress: '',

            }}
            validationSchema={
              Yup.object().shape({
                phone_number: Yup.string().max(10).required('Phone number is required'),
                ownerName: Yup.string().max(255).required('Owner  is required'),
                brand: Yup.string().max(50).required('Brand in requried'),
                ipAddress: Yup.string().max(20).min(10)

            })
            }
            onSubmit={(data) => {
                dispatch(alertDialogActions.pending("Do you want to Confirm add Device ?"));
                setData(data)
              // navigate('/app/dashboard', { replace: true });
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
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new device
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography>
                </Box>
              
                
                <TextField
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  fullWidth
                  helperText={touched.phone_number && errors.phone_number}
                  label="Phone Number"
                  margin="normal"
                  name="phone_number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone_number}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.ownerName && errors.ownerName)}
                  fullWidth
                  helperText={touched.ownerName && errors.ownerName }
                  label="Owner Name"
                  margin="normal"
                  name="ownerName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ownerName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.brand && errors.brand)}
                  fullWidth
                  helperText={touched.brand && errors.brand}
                  label="Brand Device"
                  margin="normal"
                  name="brand"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.brand}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.ipAddress && errors.ipAddress)}
                  fullWidth
                  helperText={touched.ipAddress && errors.ipAddress}
                  label="Ip Address"
                  margin="normal"
                  name="ipAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ipAddress}
                  variant="outlined"
                />
               
           
                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Create Device
                  </Button>
                </Box>
           
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
