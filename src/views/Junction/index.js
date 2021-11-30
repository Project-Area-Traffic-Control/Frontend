import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  IconButton,
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
import { Assignment } from '@material-ui/icons';
// import ManagementTable from '../../components/table/manageTable';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(5),
    width: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    // display: 'flex',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },
  topGrid: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#000000',
    // display: 'flex'
  },
  bottomGrid: {
    marginTop: theme.spacing(5),
    width: '100%',
    height: '50%',
    display: 'flex',
    backgroundColor: '#000000'
  },
  buttonGrid: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'end'
  },
  buttonCreate: {
    display: 'flex',
    height: '52px',
    borderRadius: '13px',
    justifyContent: 'center',
    backgroundColor: '#287298',
    color: '#ffffff'
  }
}));
const ReportData = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [number_lane, setNumber_lane] = useState(3)
  const [pathID, setPathID] = useState()
  const [junctionList, setJunctionList] = useState([])
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
  return (
    <Page
      className={classes.root}
      title="Junction_Detail"
    >
      <Grid
        className={classes.container}
      >
        {/* <Grid
          className={classes.topGrid}
        >
          <SearchTable formik={formik} status="create" />
        </Grid> */}
        <Grid
          className={classes.bottomGrid}
        >
          <TableContainer component={Paper}>
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
          </TableContainer>
        </Grid>
        <Grid
          className={classes.buttonGrid}
        >
          <Button
            className={classes.buttonCreate}
            onClick={() => { navigate('/app/create_junction', { replace: true }); }}
          >
            สร้างแยกสัญญาณใหม่
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};

export default ReportData;