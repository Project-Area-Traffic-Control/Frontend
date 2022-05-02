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
  withStyles,
  Grid,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,

} from '@material-ui/core';
import Page from '../../components/Page';
import { deviceService, userService } from "../../services"
import { useDispatch, useSelector, } from 'react-redux';
import { alertDialogActions } from '../../_actions';
import Alert from "../../components/Alert";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
import theme from '../../theme';
import { useLocation } from 'react-router';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

  },
  body: {
    fontSize: 14,
    color: "#000000",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(userName, name, surName, userId, roles, detail) {
  return { userName, name, surName, userId, roles, detail };
};

const rows = [
  createData('test01', 'แจ็ค', 'แปปโฮ', 14682, 'tester'),
  createData('Ice', 'cream', 'sandwich', 84692, 'tester'),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  table: {
    minWidth: "700px"
  },
  tableCon: {
    marginLeft: "2%",
    width: "96%",
  },
  section1: {
    margin: theme.spacing(3, 3),
  },
  container: {
    padding: theme.spacing(2, 5),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  profileImg: {
    width: '20%',
    height: '100%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(10),
    // display: 'flex',
    // justifyContent: 'center'
    // backgroundColor: '#000000'
  },
  contentGrid: {
    width: '60%',
    height: '100%',
    marginLeft: '20%',
    marginTop: theme.spacing(3)
    // backgroundColor: '#000000',

  },
  testGrid: {
    width: '80%',
    display: 'flex',
    // marginLeft: '10%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  topNav: {
    width: '100%',
    marginTop: theme.spacing(5),
    display: 'flex'
  },
  nav_1: {
    width: '33%',
    height: '50px',
    backgroundColor: '#E0584F',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#FFFFFF'
  },
  nav_2: {
    width: '33%',
    height: '50px',
    backgroundColor: '#17395C',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#FFFFFF'
  },
  textfieldGrid: {
    marginTop: theme.spacing(5),
    width: '90%',
    marginLeft: '5%',
    display: 'flex'
  },
  textfieldContent: {
    width: '40%',
    height: '41px'
  },
  textfieldContent: {
    width: '60%',
    height: '41px'
  },
  permissionField: {
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
    height: '63px',
    alignContent: 'center',
    justifyContent: 'space-between'
    // backgroundColor: '#0000ff'
  }
}));

const PermissionName = {
  CONFIG_JUNCTION: "CONFIG_JUNCTION",
  CONFIG_CHANNEL: "CONFIG_CHANNEL",
  CONFIG_PLAN: "CONFIG_PLAN",
  CONFIG_FIXTIME: "CONFIG_FIXTIME",
  CONTROL: "CONTROL",
  MONITOR: "MONITOR",
  STATISTIC: "STATISTIC"
}

const UserManageView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const alertDialog = useSelector(state => state.alertDialog);
  const [alert, setAlert] = useState(false)
  const [contentStatus, setContentStatus] = useState(null)
  const [navContent, setNavContent] = useState(null)
  const [content, setContent] = useState(null)
  const [data, setData] = useState(null)
  const [permissions, setPermisstions] = useState(null)
  useEffect(() => {
    if (alertDialog.type === 'success' && data != {}) {
      deviceService.addDevice(data).then((data) => {
        console.log(data)
        if (data.status === 200) {
          setAlert(true)
        }
      }).catch((e) => {
        alert(e)
      })

    }
  }, [alertDialog])

  useEffect(() => {
    userService.getUserByID(location.pathname.slice(5, location.pathname.length - 10)).then((data) => {
      setData(data)
      // console.log(data.permissions)
    })
    console.log(location.pathname.slice(5, location.pathname.length - 10))

  }, [location.pathname])

  useEffect(() => {
    if (data != null) {
      if (data.permissions.length != 0) {
        setPermisstions([{
          "name": PermissionName.CONFIG_JUNCTION,
          "view": data.permissions[0].view,
          "edit": data.permissions[0].edit,
          "delete": data.permissions[0].delete
        },
        {
          "name": PermissionName.CONFIG_CHANNEL,
          "view": data.permissions[1].view,
          "edit": data.permissions[1].edit,
          "delete": data.permissions[1].delete,
        },
        {
          "name": PermissionName.CONFIG_PLAN,
          "view": data.permissions[2].view,
          "edit": data.permissions[2].edit,
          "delete": data.permissions[2].delete,
        },
        {
          "name": PermissionName.CONFIG_FIXTIME,
          "view": data.permissions[3].view,
          "edit": data.permissions[3].edit,
          "delete": data.permissions[3].delete,
        },
        {
          "name": PermissionName.CONTROL,
          "view": data.permissions[4].view,
          "control": data.permissions[4].control
        },
        {
          "name": PermissionName.MONITOR,
          "view": data.permissions[5].view,
        },
        {
          "name": PermissionName.STATISTIC,
          "view": data.permissions[6].view,
        }])
      }
      else {
        setPermisstions([{
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
      }
    }

  }, [data])

  useEffect(() => {
    if (permissions != null) {
      console.log(permissions)
      setContentStatus(0)
    }
  }, [permissions])

  useEffect(() => {
    if (contentStatus == 0) {
      console.log(permissions[0].name)
      setContentStatus(1)
    }
  }, [contentStatus])
  // const navigate = useNavigate();na
  useEffect(() => {
    if (contentStatus == 1 && data != null) {
      setContent(
        <Grid>
          <Grid
            className={classes.textfieldGrid}
            style={{ marginTop: theme.spacing(10) }}
          >
            <Grid
              className={classes.textfieldContent}
            >
              <TextField
                // style={{ marginTop: theme.spacing(5) }}
                fullWidth
                variant="outlined"
                label="ชื่อ"
                defaultValue={data?.profile?.firstname}
              />
            </Grid>
            <Grid
              className={classes.textfieldContent}
              style={{ marginLeft: '10%' }}
            >
              <TextField
                defaultValue={data?.profile?.lastname}
                fullWidth
                variant="outlined"
                label="นามสกุล"
              />
            </Grid>
          </Grid>
          <Grid
            // className={classes.textfieldGrid}
            style={{ marginTop: theme.spacing(10), width: '75%', marginLeft: '5%' }}

          >
            <Grid
              // className={classes.textfieldContent}
              style={{ width: '100%' }}
            >
              <TextField
                defaultValue={data?.profile?.address}
                fullWidth
                variant="outlined"
                label="ที่อยู่"
              />
            </Grid>
          </Grid>
          <Grid
            style={{ marginTop: theme.spacing(10), width: '75%', marginLeft: '5%', display: 'flex' }}
          >
            <Grid
              className={classes.textfieldContent}
            >
              <TextField
                defaultValue={data?.profile?.email}
                fullWidth
                variant="outlined"
                label="อีเมล"
              />
            </Grid>
            <Grid
              className={classes.textfieldContent}
              style={{ marginLeft: '10%' }}
            >
              <TextField
                defaultValue={data?.profile?.tel}
                fullWidth
                variant="outlined"
                label="เบอร์โทรศัพท์"
              />
            </Grid>
          </Grid>
          <Grid
            style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              style={{ width: '42px', height: '30px', marginTop: theme.spacing(7), backgroundColor: '#287298', color: '#ffffff' }}
            >
              บันทึก
            </Button>

          </Grid>
        </Grid>)
      setNavContent(<Grid
        className={classes.topNav}
      >
        <Button
          className={classes.nav_1}
          onClick={() => { setContentStatus(1) }}
        >
          จัดการผู้ใช้
        </Button>
        <Button
          className={classes.nav_2}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(2) }}
        >
          จัดการสิทธิ์
        </Button>
        <Button
          className={classes.nav_2}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(3) }}
        >
          เปลี่ยนรหัสผ่าน
        </Button>
      </Grid>)
    }
    if (contentStatus == 2 && permissions != 0) {
      setContent(
        <Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(5) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การตั้งค่าข้อมูลแยกจราจร
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="CONFIG_JUNCTION view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[0].view}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Edit"
                  labelPlacement="top"
                  name="CONFIG_JUNCTION edit"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[0].edit}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Delete"
                  labelPlacement="top"
                  name="CONFIG_JUNCTION delete"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[0].delete}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การตั้งค่าข้อมูลช่องสัญญาณ
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="CONFIG_CHANNEL view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[1].view}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Edit"
                  labelPlacement="top"
                  name="CONFIG_CHANNEL edit"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[1].edit}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Delete"
                  labelPlacement="top"
                  name="CONFIG_CHANNEL delete"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[1].delete}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การตั้งค่ารูปแบบการจัดการสัญญาณไฟ
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="CONFIG_PLAN view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[2].view}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Edit"
                  labelPlacement="top"
                  name="CONFIG_PLAN edit"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[2].edit}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Delete"
                  labelPlacement="top"
                  name="CONFIG_PLAN delete"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[2].delete}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การตั้งค่าตารางการทำงาน
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="CONFIG_FIXTIME view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[3].view}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Edit"
                  labelPlacement="top"
                  name="CONFIG_FIXTIME edit"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[3].edit}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Delete"
                  labelPlacement="top"
                  name="CONFIG_FIXTIME delete"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[3].delete}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การเข้าถึงการควบคุม
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="CONTROL view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[4].view}
                />
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Control"
                  labelPlacement="top"
                  name="CONTROL control"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[4].control}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การดูภาพจากกล้อง
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="MONITOR view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[5].view}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            className={classes.permissionField}
            style={{ marginTop: theme.spacing(3) }}
          >
            <Typography
              variant='h4'
              style={{ marginTop: theme.spacing(4) }}
            >
              การเข้าถึงการดูข้อมูลปริมาณรถยนต์
            </Typography>
            <Grid
              // className={classes}
              style={{ height: '100%', display: 'flex', alignContent: 'center', marginLeft: '20%' }}
            >
              <FormGroup aria-label="position" row className={classes.permissCheck}>
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="View"
                  labelPlacement="top"
                  name="STATISTIC view"
                  // onChange={handleChangePermission}
                  defaultChecked={permissions[6].view}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid
            style={{ width: '95%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              style={{ width: '42px', height: '30px', marginTop: theme.spacing(3), backgroundColor: '#287298', color: '#ffffff' }}
            >
              บันทึก
            </Button>

          </Grid>
        </Grid>)
      setNavContent(<Grid
        className={classes.topNav}
      >
        <Button
          className={classes.nav_2}
          onClick={() => { setContentStatus(1) }}
        >
          จัดการผู้ใช้
        </Button>
        <Button
          className={classes.nav_1}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(2) }}
        >
          จัดการสิทธิ์
        </Button>
        <Button
          className={classes.nav_2}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(3) }}
        >
          เปลี่ยนรหัสผ่าน
        </Button>
      </Grid>)
    }
    if (contentStatus == 3) {
      setContent(<Grid
      >
        <Grid
          className={classes.textfieldGrid}
        >
          <Grid
            className={classes.textfieldContent}
            style={{ marginTop: theme.spacing(5) }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="รหัสผ่านใหม่"
            />
          </Grid>
        </Grid>
        <Grid
          className={classes.textfieldGrid}
        >
          <Grid
            className={classes.textfieldContent}
            style={{ marginTop: theme.spacing(5) }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="ยืนยันรหัสผ่าน"
            />
          </Grid>
        </Grid>
        <Grid
          style={{ width: '80%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            style={{ width: '42px', height: '30px', marginTop: theme.spacing(7), backgroundColor: '#287298', color: '#ffffff' }}
          >
            บันทึก
          </Button>

        </Grid>
      </Grid>)
      setNavContent(<Grid
        className={classes.topNav}
      >
        <Button
          className={classes.nav_2}
          onClick={() => { setContentStatus(1) }}
        >
          จัดการผู้ใช้
        </Button>
        <Button
          className={classes.nav_2}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(2) }}
        >
          จัดการสิทธิ์
        </Button>
        <Button
          className={classes.nav_1}
          style={{ marginLeft: '0.25%' }}
          onClick={() => { setContentStatus(3) }}
        >
          เปลี่ยนรหัสผ่าน
        </Button>
      </Grid>)
    }
  }, [contentStatus])

  return (
    <Page
      className={classes.root}
      title="User Manager"
    >
      {alert &&
        <Alert massage="Add Device is Success"></Alert>
      }
      <Grid
        className={classes.container}
      >
        <Grid
          className={classes.testGrid}
        >
          {/* <Grid
            className={classes.profileImg}
          >
            <img src='/static/avatar/avatar_test.png' width='216px' height='188px' />
          </Grid> */}
          <Grid
            className={classes.contentGrid}
          >
            {navContent != null && navContent}
            {content != null && content}
          </Grid>
          {/* <AccountInfo /> */}
        </Grid>
      </Grid>

    </Page>
  );
};

export default UserManageView;