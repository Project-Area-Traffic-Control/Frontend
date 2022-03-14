import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ReportView from './ReportTable';
import SearchTable from './SearchTable';
import ReportTable from './ReportTable';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { junctionService } from '../../services/junction.service';
import { Assignment, BarChart, CallSplit, Description, DonutLarge, Edit, ExitToApp, ExpandLess, ExpandMore, Home, LocationCity, Settings, VideoCall, EditOutlined } from '@material-ui/icons';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Map from './map';
import NavItem from '../../layouts/DashboardLayout/NavBar/NavItem';
// import ManagementTable from '../../components/table/manageTable';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(5),
    width: '100%',
    display: 'flex'
  },
  container_1: {
    width: '80%',
    height: '100%',
    // display: 'flex',
    paddingLeft: theme.spacing(15),
  },
  container_2: {
    width: '18%',
    height: '1000px',
    // display: 'flex',
    backgroundColor: '#FFFFFF',
    paddingRight: theme.spacing(5),
  },
  titleGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
    // backgroundColor: '#000000',
    // display: 'flex'
  },
  content: {
    width: '100%',
    // display: 'flex',
    // marginLeft: '10%',
    // marginTop: theme.spacing(5)
  },
  button: {
    width: '100%',
    display: 'flex',
    // marginLeft: '10%',
    // marginTop: theme.spacing(5)
  },
  detail: {
    width: '100%',
    paddingLeft: theme.spacing(6),
    marginTop: theme.spacing(2)
  },
  editButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(5),
    display: 'flex',
    borderRadius: '13px',
    justifyContent: 'center',
    backgroundColor: '#287298',
    color: '#FFFFFF',
  },
  buttonGrid: {
    marginTop: theme.spacing(5),
    display: 'flex',
    width: '50%',
    height: '52px',
    borderRadius: '13px',
    justifyContent: 'center',
    backgroundColor: '#287298',
    marginLeft: '40%',
    color: '#FFFFFF',
    fontSize: '12px'
  },
  top_icon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    // backgroundColor: '#000000'
    // marginRight: '10%'
  },
}));
const items = [
  {
    href: '/app/dashboard',
    icon: DonutLarge,
    title: 'Dashboard'
  },
  {
    href: '/app',
    icon: Home,
    title: 'จุดควบคุมจราจร'
  },
  {
    href: '/app/junction',
    icon: Description,
    title: 'รายการจุดควบคุมการจราจร'
  },
  {
    href: '/app/junction/5/create_plan',
    icon: Settings,
    title: 'ตั้งค่าการทำงาน'
  },
  {
    href: '/app/manual_control/5',
    icon: CallSplit,
    title: 'หน้าควบคุม'
  },
  {
    href: '/app/management',
    icon: VideoCall,
    title: 'Monitor'
  },
  {
    href: '/app/video-record',
    icon: BarChart,
    title: 'ข้อมูลปริมาณการจราจร'
  },
  {
    href: '/404',
    icon: ExitToApp,
    title: 'Logout'
  },
];
const ReportData = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [number_lane, setNumber_lane] = useState(3)
  const [pathID, setPathID] = useState()
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState([])
  const [junctionList, setJunctionList] = useState([])
  const [position, setPosition] = useState({
    lat: 13.722524,
    lng: 100.739945,
    toggle: false
  })
  const toggleDetail = (ind) => {
    var temp = open
    for (let index = 0; index < temp.length; index++) {
      if (ind == index) {
        temp[ind] = !temp[ind]
      }
      setOpen(temp)
    }
  }
  const formik = useFormik({
    initialValues: {
      junctionName: '',
      lat: '',
      lng: '',
      number_channel: 3,
      areaID: 5,
      // ipAddress: '',
    },
    validationSchema: Yup.object({
      junctionName: Yup.string().max(100).required('กรุณากรอกชื่อของแยกสัญญาณ'),
      lat: Yup.string().max(100).required(),
      lng: Yup.string().max(100).required(),
      number_channel: Yup.string(),
      // areaID: Yup.string()
    }),
    onSubmit: async (values) => {

      console.log(values)
      await junctionService.createJunction({
        "name": values.junctionName,
        "latitude": parseFloat(values.lat),
        "longitude": parseFloat(values.lng),
        "number_channel": values.number_channel,
        "area_id": values.areaID
      })

      await junctionService.getAllJunction().then(data => {
        setJunctionList(data)
      })




      // if (addDrawerState) {
      //     var res = await addLocation(values)
      //     if (res.status === 200) {
      //         let tempData = locations.copyWithin();
      //         tempData.push(res.data)
      //         setLocations([])
      //         setLocations(tempData)
      //         setAddDrawerState(false)
      //     }
      //     else if (res.status == 400) {
      //         if (res.data.errno == 1062) {
      //             alert("Duplicate entry")
      //         }
      //     }
      // }

      // if (editDrawerState) {
      //     // alert("Edit")
      //     console.info(values)
      //     editLocation(values)

      // }
    },
  });
  useEffect(() => {
    junctionService.getAllJunction().then(data => {
      setJunctionList(data)
    })
  }, [])
  useEffect(() => {
    if (pathID != null) {
      navigate(`/app/junction/${pathID}`, { replace: true });
    }
  }, [pathID])
  useEffect(() => {
    if (junctionList != []) {
      var temp = []
      for (let index = 0; index < junctionList.length; index++) {
        temp.push(false)
      }
      setOpen(temp)
    }
  }, [junctionList])
  useEffect(async () => {
    // console.log(position)
    if (map != null && position.toggle == true) map.flyTo([parseFloat(position.lat), parseFloat(position.lng)], 15)
  }, [position])
  return (
    <Page
      className={classes.root}
      title="Junction_Detail"
    >
      <Grid
        className={classes.container_1}
      >
        {/* <Grid
          className={classes.topGrid}
        >
          <SearchTable formik={formik} status="create" />
        </Grid> */}
        {/* <Grid
          className={classes.bottomGrid}
        > */}
        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ชื่อของแยกสัญญาณ</TableCell>
                  <TableCell align="center">ชื่อของพื้นที่รับผิดชอบ</TableCell>
                  <TableCell align="center">ละติจูด</TableCell>
                  <TableCell align="center">ลองจิจูด</TableCell>
                  <TableCell align="center">จำนวนของแยกสัญญาณ</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {junctionList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center'>
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row?.area?.name}</TableCell>
                    <TableCell align="center">{row.latitude}</TableCell>
                    <TableCell align="center">{row.longitude}</TableCell>
                    <TableCell align="center">{row.number_channel}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setPathID(row.id)
                        }}
                      >
                        <Assignment />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

        {/* </Grid> */}
        {junctionList.length > 0 && <Map setMap={setMap} junctionList={junctionList} />}
      </Grid>
      <Grid
        className={classes.container_2}
      >
        <Grid
          className={classes.titleGrid}
        >
          <Typography>
            รายชื่อแยกสัญญาณ
          </Typography>
        </Grid>
        <List>
          {junctionList.map((row, index) => (
            <Grid
              className={classes.content}
            >
              <ListItem >
                {open[index] ? <ExpandLess /> : <ExpandMore />}
                <NavItem
                  href=""
                  key={items[1].title}
                  title={row.name}
                  icon=""
                  onClick={() => {
                    toggleDetail(index)
                    setPosition({
                      lat: row.latitude,
                      lng: row.longitude,
                      toggle: open[index]
                    })
                  }}
                />
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <Grid
                  className={classes.detail}
                >
                  รายละเอียดแยกสัญญาณ
                </Grid>
                <Grid
                  className={classes.detail}
                >
                  พื้นที่: {row?.area?.name}
                </Grid>
                <Grid
                  className={classes.detail}
                >
                  จำนวนแยก: {row.number_channel}
                </Grid>
                <Grid
                  className={classes.editButton}
                >
                  <Button
                    className={classes.button}
                    onClick={() => {
                      navigate(`/app/junction/${row.id}`, { replace: true });
                    }}
                  >
                    <EditOutlined />
                    แก้ไข
                  </Button>
                </Grid>
              </Collapse>
            </Grid>
          ))}
        </List>
        <Grid
          className={classes.top_icon}
        >
          <Button
            className={classes.buttonGrid}
            onClick={() => { navigate('/app/create_junction', { replace: true }); }}
          >
            Create Junction
          </Button>
        </Grid>
        {/* <Divider /> */}
      </Grid>

    </Page>
  );
};

export default ReportData;