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
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Page from '../../components/Page';
import { deviceService, userService } from "../../services"
import { useDispatch, useSelector, } from 'react-redux';
import { alertDialogActions } from '../../_actions';
import Alert from "../../components/Alert"
import theme from '../../theme';

const PermissionName = {
  CONFIG_JUNCTION: "CONFIG_JUNCTION",
  CONFIG_CHANNEL: "CONFIG_CHANNEL",
  CONFIG_PLAN: "CONFIG_PLAN",
  CONFIG_FIXTIME: "CONFIG_FIXTIME",
  CONTROL: "CONTROL",
  MONITOR: "MONITOR",
  STATISTIC: "STATISTIC"
}
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
  const [alert, setAlert] = useState(false)
  const [permissionList, setPermissionList] = useState(null)
  const [data, setData] = useState({})
  useEffect(() => {
    if (alertDialog.type === 'success' && data != {}) {
      userService.createUser({
        "role": "USER",
        "username": data.username,
        "password": data.password,
        "firstname": data.firstname ? data.firstname : null,
        "lastname": data.lastname ? data.lastname : null,
        "email": data.email ? data.email : null,
        "address": data.address ? data.address : null,
        "tel": data.tel ? data.tel : null,
        "pic": data.pic ? data.pic : null,
        "permissions": permissionList,
        "area_id": 5
      }).then((data) => {
        console.log(data)
        if (data.status === 200) {
          setAlert(true)
        }
      }).catch((e) => {
        alert(e)
      })
      // for (let index = 0; index < permissionList.length; index++) {
      //   const element = array[index];

      // }
    }
  }, [alertDialog])

  useEffect(() => {
    setPermissionList([{
      "name": PermissionName.CONFIG_JUNCTION,
      "view": false,
      "edit": false,
      "delete": false
    },
    {
      "name": PermissionName.CONFIG_CHANNEL,
      "view": false,
      "edit": false,
      "delete": false,
    },
    {
      "name": PermissionName.CONFIG_PLAN,
      "view": false,
      "edit": false,
      "delete": false,
    },
    {
      "name": PermissionName.CONFIG_FIXTIME,
      "view": false,
      "edit": false,
      "delete": false,
    },
    {
      "name": PermissionName.CONTROL,
      "view": false,
      "control": false
    },
    {
      "name": PermissionName.MONITOR,
      "view": false,
    },
    {
      "name": PermissionName.STATISTIC,
      "view": false,
    }])
  }, [])
  const handleChangePermission = (event) => {
    if (permissionList != null) {
      var tempList = permissionList
      var str = event.target.name
      str = str.split(' ')
      if (str[1] == 'view') {
        var index = tempList.findIndex(item => item.name == str[0])
        var prevViewState = tempList[index].view
        tempList[index].view = !prevViewState
        console.log(tempList)
        // setPermiss(tempList)
      }
      else if (str[1] == 'edit') {
        var index = tempList.findIndex(item => item.name == str[0])
        var prevEditState = tempList[index].edit
        tempList[index].edit = !prevEditState
        console.log(tempList)
      }
      else if (str[1] == 'delete') {
        var index = tempList.findIndex(item => item.name == str[0])
        var prevDeleteState = tempList[index].delete
        tempList[index].delete = !prevDeleteState
        console.log(tempList)
      }
      else if (str[1] == 'control') {
        var index = tempList.findIndex(item => item.name == str[0])
        var prevExportState = tempList[index].export
        tempList[index].export = !prevExportState
        console.log(tempList)
      }
      setPermissionList(tempList)
    }
  }
  // const navigate = useNavigate();na

  return (
    <Page
      className={classes.root}
      title="Create User"
    >
      {alert &&
        <Alert massage="เพิ่มผู้ใช้งานสำเร็จ"></Alert>
      }
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        width="60%"
        marginLeft="20%"
        justifyContent="center"
        bgcolor="#ffffff"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: '',
              firstname: '',
              lastname: '',
              email: '',
              tel: '',
              address: ''
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().max(10).required('กรุณากรอก Username'),
                password: Yup.string().max(255).required('กรุณากรอก Password'),
                firstname: Yup.string(),
                lastname: Yup.string(),
                email: Yup.string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "กรุณากรอกอีเมล์ให้ถูกต้อง"),
                tel: Yup.string(),
                address: Yup.string()
              })
            }
            onSubmit={(data) => {
              dispatch(alertDialogActions.pending("ยืนยันที่จะบันทึกข้อมูล ?"));
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
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    สร้างผู้ใช้ใหม่
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>


                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                  type='password'
                />

                <Grid
                  style={{ width: '100%' }}
                >
                  <TextField
                    error={Boolean(touched.firstname && errors.firstname)}
                    style={{ width: '45%' }}
                    helperText={touched.firstname && errors.firstname}
                    label="Firstname"
                    margin="normal"
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.lastname && errors.lastname)}
                    style={{ width: '45%', marginLeft: '10%' }}
                    helperText={touched.lastname && errors.lastname}
                    label="Lastname"
                    margin="normal"
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  style={{ width: '100%' }}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    style={{ width: '45%' }}
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.tel && errors.tel)}
                    style={{ width: '45%', marginLeft: '10%' }}
                    helperText={touched.tel && errors.tel}
                    label="Telephone"
                    margin="normal"
                    name="tel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tel}
                    variant="outlined"
                  />
                </Grid>
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  // style={{ width: '45%', marginLeft: '10%' }}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Address"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                />

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    กำหนดสิทธิ์การใช้งาน
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การตั้งค่าข้อมูลแยกจราจร
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="CONFIG_JUNCTION view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Edit"
                        labelPlacement="top"
                        name="CONFIG_JUNCTION edit"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].edit}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Delete"
                        labelPlacement="top"
                        name="CONFIG_JUNCTION delete"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].delete}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การตั้งค่าข้อมูลช่องสัญญาณ
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="CONFIG_CHANNEL view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Edit"
                        labelPlacement="top"
                        name="CONFIG_CHANNEL edit"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].edit}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Delete"
                        labelPlacement="top"
                        name="CONFIG_CHANNEL delete"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].delete}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การตั้งค่ารูปแบบการจัดการสัญญาณไฟ
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="CONFIG_PLAN view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Edit"
                        labelPlacement="top"
                        name="CONFIG_PLAN edit"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].edit}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Delete"
                        labelPlacement="top"
                        name="CONFIG_PLAN delete"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].delete}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การตั้งค่าตารางการทำงาน
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="CONFIG_FIXTIME view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Edit"
                        labelPlacement="top"
                        name="CONFIG_FIXTIME edit"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].edit}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Delete"
                        labelPlacement="top"
                        name="CONFIG_FIXTIME delete"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].delete}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การเข้าถึงการควบคุม
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="CONTROL view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Control"
                        labelPlacement="top"
                        name="CONTROL control"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].edit}
                      />
                      {/* <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Edit Mode"
                        labelPlacement="top"
                        name="DATABASE_MANAGEMENT delete"
                        onChange={handleChange}
                      // defaultChecked={formik.values.permiss[8].delete}
                      /> */}
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การดูภาพจากกล้อง
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="MONITOR view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    style={{ marginTop: theme.spacing(3) }}
                  >
                    การเข้าถึงการดูข้อมูลปริมาณรถยนต์
                  </Typography>
                  <Grid
                    style={{
                      width: '100%',
                      marginTop: theme.spacing(3)
                      // display: 'flex',
                      // justifyContent: 'space-between'
                    }}
                  >
                    <FormGroup aria-label="position" row className={classes.permissCheck}>
                      <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="View"
                        labelPlacement="top"
                        name="STATISTIC view"
                        onChange={handleChangePermission}
                      // defaultChecked={formik.values.permiss[8].view}
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for connect Android Phone.
                  </Typography> */}
                </Box>
                <Box my={2}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    // fullWidth
                    style={{ width: '30%' }}
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
    </Page >
  );
};

export default RegisterView;