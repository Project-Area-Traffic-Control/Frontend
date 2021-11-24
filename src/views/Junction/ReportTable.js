import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
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
  Divider,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import Page from '../../components/Page';
import { deviceService } from "../../services"
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
import { RotateRight } from '@material-ui/icons';
import ImageRotate from './ImageRotate';
import { CloseRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { channelService } from '../../services/channel.service';
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
const useStyles = makeStyles((theme, degree) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100%'
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
  },
  topLeft: {
    width: '97%',
    backgroundColor: '#FFFFFF',
    // display: 'flex'
  },
  titleGrid: {
    height: '80px',
    width: '100%',
    display: 'flex-direction',
    justifyContent: 'center'
  },
  titleLeft: {
    color: '#17395C',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2)
  },
  divider: {
    backgroundColor: '#287298',
    height: '2px'
  },
  top_icon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
  },
  junction_img: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
    paddingBottom: theme.spacing(9)
  },
  textField_name: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    width: '75%',
  },
  textField_lane: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    width: '25%',
  },
  textField_order: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
    width: '30%',
  },
  buttonGrid: {
    // marginTop: theme.spacing(5),
    display: 'flex',
    width: '30%',
    height: '52px',
    borderRadius: '13px',
    justifyContent: 'center',
    backgroundColor: '#287298',
    marginLeft: '40%',
    color: '#FFFFFF',
    fontSize: '18px'
  },
  channelImg: {
    marginTop: theme.spacing(7),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  titleText: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  bottomTextfield: {
    display: 'flex',
    width: '100%'
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
      ) : null} */}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ReportTable = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const alertDialog = useSelector(state => state.alertDialog);
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState({})
  const [status, setStatus] = useState(0)
  const [degree, setDegree] = useState(0)
  const formik = props.channel
  const [imgRotate, setImgRotate] = useState(<img src={`/static/junction/${props.number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
  useEffect(() => {
    if (degree >= 360) {
      setDegree(0)
    }

    setImgRotate(<img src={`/static/junction/${props.number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
    // setDegree(360 / temp)
    console.log(degree)
  }, [degree])
  useEffect(() => {
    setDegree(0)
    setImgRotate(<img src={`/static/junction/${props.number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
  }, [props.number_channel])

  const channel_Formik = useFormik({
    initialValues: {
      name_1: '',
      number_lane_1: '',
      order_1: '',
      name_2: '',
      number_lane_2: '',
      order_2: '',
      name_3: '',
      number_lane_3: '',
      order_3: '',
      junction_id: props.pathID,
      // ipAddress: '',

    },
    validationSchema: Yup.object({
      name_1: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
      number_lane_1: Yup.string().max(100).required('โปรดกรอกเลน'),
      order_1: Yup.string().max(100),
      name_2: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
      number_lane_2: Yup.string().max(100).required('โปรดกรอกเลน'),
      order_2: Yup.string().max(100),
      name_3: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
      number_lane_3: Yup.string().max(100).required('โปรดกรอกเลน'),
      order_3: Yup.string().max(100),
      junction_id: Yup.string(),
      // areaID: Yup.string()
    }),
    onSubmit: async (values) => {
      // console.log(values)
      if (status == 0) {
        await channelService.createChannel({
          "name": values.name_1,
          "number_lane": parseInt(values.number_lane_1),
          "order": 1,
          "junction_id": props.pathID
        })
        await channelService.createChannel({
          "name": values.name_2,
          "number_lane": parseInt(values.number_lane_2),
          "order": 2,
          "junction_id": props.pathID
        })
        await channelService.createChannel({
          "name": values.name_3,
          "number_lane": parseInt(values.number_lane_3),
          "order": 3,
          "junction_id": props.pathID
        })
        handleClose();
      }
      else if (status == 1) {
        await channelService.updateChannel({
          "name": values.name_1,
          "number_lane": parseInt(values.number_lane_1),
          "order": 1,
          "junction_id": props.pathID
        }, props.channel[0].id)

        await channelService.createChannel({
          "name": values.name_2,
          "number_lane": parseInt(values.number_lane_2),
          "order": 2,
          "junction_id": props.pathID
        })

        await channelService.createChannel({
          "name": values.name_3,
          "number_lane": parseInt(values.number_lane_3),
          "order": 3,
          "junction_id": props.pathID
        })
        handleClose();
      }
      else if (status == 2) {
        await channelService.updateChannel({
          "name": values.name_1,
          "number_lane": parseInt(values.number_lane_1),
          "order": 1,
          "junction_id": props.pathID
        }, props.channel[0].id)

        await channelService.updateChannel({
          "name": values.name_2,
          "number_lane": parseInt(values.number_lane_2),
          "order": 2,
          "junction_id": props.pathID
        }, props.channel[1].id)

        await channelService.createChannel({
          "name": values.name_3,
          "number_lane": parseInt(values.number_lane_3),
          "order": 3,
          "junction_id": props.pathID
        })
        handleClose();
      }
      else if (status == 3) {
        await channelService.updateChannel({
          "name": values.name_1,
          "number_lane": parseInt(values.number_lane_1),
          "order": 1,
          "junction_id": props.pathID
        }, props.channel[0].id)

        await channelService.updateChannel({
          "name": values.name_2,
          "number_lane": parseInt(values.number_lane_2),
          "order": 2,
          "junction_id": props.pathID
        }, props.channel[1].id)

        await channelService.updateChannel({
          "name": values.name_3,
          "number_lane": parseInt(values.number_lane_3),
          "order": 3,
          "junction_id": props.pathID
        }, props.channel[2].id)
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (props.status == 'create') {
      setStatus(0)
    }
    else {
      console.log(props.channel.length)
      setStatus(props.channel.length)
      channel_Formik.setValues({
        name_1: props.channel[0]?.name,
        number_lane_1: props.channel[0]?.name,
        order_1: props.channel[0]?.name,
        name_2: props.channel[1]?.name,
        number_lane_2: props.channel[1]?.name,
        order_2: props.channel[1]?.name,
        name_3: props.channel[2]?.name,
        number_lane_3: props.channel[2]?.name,
        order_3: props.channel[2]?.name,
        junction_id: props.pathID
      })
    }
    // console.log(formik)
  }, [open])
  return (
    <Grid
      className={classes.root}
    >
      <Grid
        className={classes.topLeft}
      >
        <Grid
          className={classes.titleGrid}
        >
          <Typography
            variant='h4'
            className={classes.titleLeft}
          >
            ตั้งค่าช่องสัญญาณ
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid
          className={classes.top_icon}
        >
          <IconButton
            onClick={() => {
              setDegree(degree + 90)
            }}
          >
            <RotateRight />
          </IconButton>
        </Grid>
        <Grid
          className={classes.junction_img}
        >
          {/* <form onSubmit={props.formik.handleSubmit}> */}
          <Button
            onClick={() => {
              handleClickOpen()
            }}
            type='submit'
          >
            {/* <ImageRotate /> */}
            {imgRotate}
          </Button>
          {/* </form> */}
        </Grid>
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          ตั้งค่าช่องสัญญาณ
        </BootstrapDialogTitle>
        <form onSubmit={channel_Formik.handleSubmit}>
          <DialogContent dividers>
            <Grid>
              <Typography variant='h5' className={classes.titleText}>
                ช่องทางเดินรถที่ 1
              </Typography>
              <TextField
                error={Boolean(channel_Formik.touched.name_1 && channel_Formik.errors.name_1)}
                helperText={channel_Formik.touched.name_1 && channel_Formik.errors.name_1}
                className={classes.textField_name}
                label="ชื่อช่องทางเดินรถ"
                variant="outlined"
                name="name_1"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.name_1}
              />
              <TextField
                error={Boolean(channel_Formik.touched.number_lane_1 && channel_Formik.errors.number_lane_1)}
                helperText={channel_Formik.touched.number_lane_1 && channel_Formik.errors.number_lane_1}
                name="number_lane_1"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.number_lane_1}
                className={classes.textField_lane}
                label="จำนวนเลน"
                variant="outlined"
              />
              <Grid
                className={classes.channelImg}
              >
                <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' />
              </Grid>
            </Grid>
            <Grid>
              <Typography variant='h5' className={classes.titleText}>
                ช่องทางเดินรถที่ 2
              </Typography>
              <TextField
                error={Boolean(channel_Formik.touched.name_2 && channel_Formik.errors.name_2)}
                helperText={channel_Formik.touched.name_2 && channel_Formik.errors.name_2}
                className={classes.textField_name}
                label="ชื่อช่องทางเดินรถ"
                variant="outlined"
                name="name_2"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.name_2}
              />
              <TextField
                error={Boolean(channel_Formik.touched.number_lane_2 && channel_Formik.errors.number_lane_2)}
                helperText={channel_Formik.touched.number_lane_2 && channel_Formik.errors.number_lane_2}
                name="number_lane_2"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.number_lane_2}
                className={classes.textField_lane}
                label="จำนวนเลน"
                variant="outlined"
              />
              <Grid
                className={classes.channelImg}
              >
                <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' />
              </Grid>
            </Grid>
            <Grid>
              <Typography variant='h5' className={classes.titleText}>
                ช่องทางเดินรถที่ 3
              </Typography>
              <TextField
                error={Boolean(channel_Formik.touched.name_3 && channel_Formik.errors.name_3)}
                helperText={channel_Formik.touched.name_3 && channel_Formik.errors.name_3}
                className={classes.textField_name}
                label="ชื่อช่องทางเดินรถ"
                variant="outlined"
                name="name_3"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.name_3}
              />
              <TextField
                error={Boolean(channel_Formik.touched.number_lane_3 && channel_Formik.errors.number_lane_3)}
                helperText={channel_Formik.touched.number_lane_3 && channel_Formik.errors.number_lane_3}
                name="number_lane_3"
                onBlur={channel_Formik.handleBlur}
                onChange={channel_Formik.handleChange}
                value={channel_Formik.values.number_lane_3}
                className={classes.textField_lane}
                label="จำนวนเลน"
                variant="outlined"
              />
              <Grid
                className={classes.channelImg}
              >
                <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus className={classes.buttonGrid} type='submit'>
              บันทึก
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Grid >
  );
};

export default ReportTable;