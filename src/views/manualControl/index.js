import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  withStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import RemoteControlView from './RemoteControlView';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { junctionService } from '../../services/junction.service';
import Countdown from 'react-countdown';
import CountUp from 'react-countup';
import Timer from './Timer';
import useLongPress from './useLongPress';
import { setLocale } from 'yup';
import { manualControlService } from '../../services/manualControl.service';
import { controlService } from '../../services/control.service';
import AutoTimer from './AutoTimer';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { planService } from '../../services/plan.service';
import theme from '../../theme';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    // paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    display: 'flex'
  },
  container: {
    width: '100%',
    height: '100%',
    // display: 'flex',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    // backgroundColor: '#ffffff'
  },
  topGrid: {
    width: '100%',
    height: '45%',
    backgroundColor: '#ffffff',
  },
  imgTimer: {
    paddingTop: theme.spacing(15),
    display: 'flex',
    justifyContent: 'center'
  },
  titleText: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    width: '40%',
    marginLeft: '30%',
  },
  bottomGrid: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center'
  },
  contentGrid: {

    display: 'flex',
  },
  contentGrid_table: {
    width: '80%',
    display: 'flex',
  },
  imgPattern: {
    // display: 'flex',
    // justifyContent: 'center'
    marginLeft: theme.spacing(8),
    // borderColor: '#FF0000',
    // borderWidth: '2px'
  },
  buttonPattern: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px'
  },
  selectBorder: {
    // border: '5px',
    borderColor: '#F00000',
    borderStyle: 'solid'
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
    paddingLeft: theme.spacing(2),
    width: '100%'
  },
  divider: {
    backgroundColor: '#287298',
    height: '2px'
  },
  textFieldLeft: {
    paddingTop: theme.spacing(3),
    width: '100%',
    // display: 'flex'
  },
  bottomLeft: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    // marginLeft: '10%'
    // display: 'flex'
  },
  newContent_1: {
    width: '30%',
    height: '95%',
    marginLeft: '10%',
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },
  newContent_2: {
    width: '50%',
    height: '95%',
    marginLeft: '5%',
    // backgroundColor: '#FFFFFF'
  },
  newContent_3: {
    width: '100%',
    height: '10%',
    display: 'flex',
    backgroundColor: '#FFFFFF',
    marginBottom: '3%'
  },
  newContent_4: {
    width: '100%',
    // maginTop: '15%',
    height: '87%',
    display: 'flex',
    backgroundColor: '#FFFFFF'
  },
  content_3_text: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(5),
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '29px',
    color: '#2F80ED'
  },
  content_3_border: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(5),
    // fontWeight: '700',
    // fontSize: '24px',
    // lineHeight: '29px',
    // color: '#2F80ED'
  },
  contentInBorder: {
    width: '100px',
    height: '40px',
    backgroundColor: '#528CFF',
    borderRadius: '5px',
    border: '2px solid #2F80ED',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '29px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF'
  },
  content4_imgOverView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttom: {
    display: 'flex',
    width: '100%'
  },
  leftBut: {
    display: 'flex',
    width: '50%',
    justifyContent: 'flex-start',
    // float: 'left'
  },
  rightBut: {
    display: 'flex',
    width: '50%',
    justifyContent: 'flex-end',
    // float: 'right'
  },
  title_mode: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '39px',
    marginTop: theme.spacing(5),
    color: '#2F80ED'
  },
  buttonMode_grid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  buttonMode_content: {
    width: '170px',
    height: '55px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    fontWeight: '700',
    lineHeight: '31px',
    backgroundColor: '#528CFF',
    color: '#FFFFFF',
    border: '2px solid #2F80ED',
    borderRadius: '10px'
  },
  buttonManual_control: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    left: '350px',
    top: '209px'
  },
  comeBackButtonManual_control: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    left: '50px',
    top: '30px'
  },
  unSelectButtonMode_content: {
    width: '170px',
    height: '55px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    fontWeight: '700',
    lineHeight: '31px',
    backgroundColor: '#FFFFFF',
    color: '#2F80ED',
    border: '2px solid #2F80ED',
    borderRadius: '10px'
  },
  planNewContent: {
    marginTop: theme.spacing(4),
    width: '100%',
    height: '24px',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: '#4F4F4F'
  },
  imgManual_content: {
    width: '70%',
    marginLeft: '15%',
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: '#000000'
  }
}));

const ManualControl = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [path, setPath] = useState(null)
  const [junction, setJunction] = useState({})
  const [number, setNumber] = useState(0)
  const [imgList, setImgList] = useState([])
  const [fixtime, setFixtime] = useState(null)
  const [fixtimeShow, setFixtimeShow] = useState(null)
  const [time, setTime] = useState(null)
  const [plan_id, setPlan_id] = useState(null)
  const [degree, setDegree] = useState(null)
  const [menu, setMenu] = useState("")
  const [planID, setPlanID] = useState(null)
  const [planDetail, setPlanDetail] = useState(null)
  const [data, setData] = useState(null)
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [newContent_1, setNewContent_1] = useState(null)
  const [statusNewContent, setStatusNewContent] = useState(null)
  const [statusManual, setStatusManual] = useState(null)
  const [statusMode, setStatusMode] = useState(null)
  const [channel, setChannel] = useState(null)
  const location = useLocation();
  var initHei = '440px'
  var initWid = '600px'
  const [overview, setOverView] = useState([]);
  const [index, setActiveStep] = React.useState(0);
  const [junctionContent, setJunctionContent] = useState(null)
  const goToNextPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const goToPrevPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // useEffect(() => {
  //   // console.log(location.pathname)
  //   setPath(location.pathname.slice(20, location.pathname.length))
  // }, [])
  useEffect(() => {
    setPath(location.pathname.slice(20, location.pathname.length))
    junctionService.getJunctionByID(location.pathname.slice(20, location.pathname.length)).then(data => {
      console.log(data)
      setJunction(data)
      setDegree(data.rotate)
      setNumber(data.number_channel)
    })
    controlService.getAllFixtime().then((data) => {
      setFixtime(data)
    })
    setCountup(<Grid />)

  }, [location.pathname])
  // useEffect(() => {
  //   if (path != null) {

  //   }
  //   // console.log(junction)
  // }, [path])
  useEffect(() => {
    if (fixtime != null) {
      // const time = new Date()
      // for (let index = 0; index < fixtime.length; index++) {
      //   var start_time = new Date(fixtime[index].start)
      //   var end_time = new Date(fixtime[index].end)
      //   start_time.setSeconds(0)
      //   end_time.setSeconds(0)
      //   if (time.getTime() >= start_time.getTime() && time.getTime() <= end_time.getTime()) {
      //     // console.log(start_time.toLocaleTimeString() + "," + end_time.toLocaleTimeString())
      //     setPlan_id(fixtime[index].id)
      //   }
      // }
      var res = []
      for (let index = 0; index < fixtime.length; index++) {
        if (fixtime[index]?.junction?.id == path) {
          const start = new Date(`${fixtime[index].start}`)
          const end = new Date(`${fixtime[index].end}`)
          var startH = ""
          var endH = ""
          var startM = ""
          var endM = ""
          if (start.getHours() < 10) {
            startH = `0${start.getHours()}`
          }
          else if (start.getHours() >= 10) {
            startH = start.getHours()
          }
          if (end.getHours() < 10) {
            endH = `0${end.getHours()}`
          }
          else if (end.getHours() >= 10) {
            endH = end.getHours()
          }
          if (start.getMinutes() < 10) {
            startM = `0${start.getMinutes()}`
          }
          else if (start.getMinutes() >= 10) {
            startM = start.getMinutes()
          }
          if (end.getMinutes() < 10) {
            endM = `0${end.getMinutes()}`
          }
          else if (end.getMinutes() >= 10) {
            endM = end.getMinutes()
          }
          res.push({
            start: startH + ":" + startM,
            end: endH + ":" + endM,
            plan: fixtime[index].plan
          })
        }
      }
      // console.log("res : ", res)
      setFixtimeShow(res)
      setTime(new Date())
      setHours(new Date().getHours())
      setMinutes(new Date().getMinutes())
      setSeconds(new Date().getSeconds())
    }
  }, [fixtime])

  useEffect(() => {
    if (seconds !== null && minutes != null && seconds != null) {
      let myInterval = setInterval(() => {
        if (seconds >= 0) {
          setSeconds(seconds + 1);
        }
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0)
          // if (minutes === 0) {
          //     clearInterval(myInterval)
          // } else {
          //     setMinutes(minutes - 1);
          //     setSeconds(59);
          // }
        }
        if (minutes === 59) {
          setHours(hours + 1);
          setSeconds(0)
          setMinutes(0)
          // if (minutes === 0) {
          //     clearInterval(myInterval)
          // } else {
          //     setMinutes(minutes - 1);
          //     setSeconds(59);
          // }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }

  }, [seconds, minutes, hours])
  useEffect(() => {
    if (junction != null) {
      setJunctionContent()
    }
  }, [junction])

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#287298',
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

  useEffect(() => {
    if (menu != "") {
      if (menu == 0) {
        if (number == 3) {
          setContent(<Grid
            className={classes.contentGrid}
          >
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                < img src={`/static/Mock-up_3way1_${junction.rotate}degree.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(0)
                  handleSetPhase(1)
                }}
              >
                Phase ที่ 1
              </Button>
            </Grid>
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                < img src={`/static/Mock-up_3way2_${junction.rotate}degree.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(1)
                  handleSetPhase(2)
                }}
              >
                Phase ที่ 2
              </Button>
            </Grid>
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                < img src={`/static/Mock-up_3way3_${junction.rotate}degree.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(2)
                  handleSetPhase(3)
                }}
              >
                Phase ที่ 3
              </Button>
            </Grid>
          </Grid>)
        }
        else if (number == 4) {
          setContent(<Grid
            className={classes.contentGrid}
          >
            <Grid
              className={classes.imgPattern}
            >
              <Grid

              >
                <img src={`/static/Mock-up_4way${junction.rotate}.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                {...longPressEvent}
                onClick={() => {
                  setToggle(3)
                  handleSetPhase(5)
                }}
              >
                Phase ที่ 5
              </Button>
            </Grid>
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                <img src={`/static/Mock-up_4way${(junction.rotate + 90) % 360}.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(4)
                  handleSetPhase(6)
                }}
              >
                Phase ที่ 6
              </Button>
            </Grid>
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                <img src={`/static/Mock-up_4way${(junction.rotate + 180) % 360}.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(5)
                  handleSetPhase(7)
                }}
              >
                Phase ที่ 7
              </Button>
            </Grid>
            <Grid
              className={classes.imgPattern}
            >
              <Grid>
                <img src={`/static/Mock-up_4way${(junction.rotate + 270) % 360}.png`} width='277px' height='248px' />
              </Grid>
              <Button
                className={classes.buttonPattern}
                onClick={() => {
                  setToggle(6)
                  handleSetPhase(8)
                }}
              >
                Phase ที่ 8
              </Button>
            </Grid>
          </Grid>)
        }
      }
      if (menu == 1) {
        setContent(
          <Grid
            style={{ width: '100%', marginLeft: '15%' }}
          >
            <Grid
              className={classes.bottomLeft}
            >
              <Grid
                className={classes.titleGrid}
              >
                <Typography
                  variant='h4'
                  className={classes.titleLeft}
                >
                  ตารางการทำงาน
                </Typography>
              </Grid>
              <Divider className={classes.divider} />
              <Grid
                className={classes.textFieldLeft}
              >
                <TableContainer className={classes.tableCon}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" width="20%">เวลาเริ่มต้น</StyledTableCell>
                        <StyledTableCell align="center" width="20%">เวลาสิ้นสุด</StyledTableCell>
                        <StyledTableCell align="center" width="60%">รูปแบบการจัดการสัญญาณไฟ</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fixtimeShow.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell align="center">
                            {row.start}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.end}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.plan?.name}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {/* {data != null && <Grid
              className={classes.bottom}
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
                    ลักษณะการทำงาน
                  </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid
                  className={classes.pattern}
                >
                  <Grid
                    className={classes.overview}
                  >
                    {overview.length != 0 && <div
                      style={{
                        marginTop: theme.spacing(5),
                        maxWidth: 600,
                        flexGrow: 1,
                        position: 'relative'
                      }}
                    >
                      {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && (degree == 180 || degree == 0) && junction.number_channel == 3 && <img
                        src={overview[index].url}
                        style={{
                          height: 440,
                          width: "100%",
                          width: 600,
                          display: "block",
                          overflow: "hidden",
                        }}
                      />}
                      {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && (degree == 90 || degree == 270) && junction.number_channel == 3 && <img
                        src={overview[index].url}
                        style={{
                          height: 600,
                          width: "100%",
                          width: 440,
                          display: "block",
                          overflow: "hidden",

                        }}
                      />}
                      {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && junction.number_channel == 4 && <img
                        src={overview[index].url}
                        style={{
                          height: 600,
                          width: "100%",
                          width: 600,
                          display: "block",
                          overflow: "hidden",
                        }}
                      />}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '17%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '75%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '47%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '35%', marginLeft: '45%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '80%', marginLeft: '18%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '10%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '70%', marginLeft: '40%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '30%', marginLeft: '4%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '8%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '53%', marginLeft: '3%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '10%', marginLeft: '35%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '80%', marginLeft: '53%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '53%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '7%', marginLeft: '33%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '35%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '83%', marginLeft: '53%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[3].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '7%', marginLeft: '33%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '35%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '83%', marginLeft: '53%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '53%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[3].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '35%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '83%', marginLeft: '53%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '53%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '7%', marginLeft: '33%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[3].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '83%', marginLeft: '53%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} > {junction.channel[0].name}</div >}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '53%', marginLeft: '1%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[1].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '7%', marginLeft: '33%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[2].name}</div>}
                      {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '35%', marginLeft: '80%', fontSize: '24px', backgroundColor: 'white', border: '3px solid black', borderSpacing: '1px' }} >{junction.channel[3].name}</div>}
                      <Grid
                        className={classes.buttom}
                      >
                        <Grid
                          className={classes.leftBut}
                        >
                          <Button
                            size="small"
                            onClick={goToPrevPicture}
                            disabled={index === 0}
                          >
                            <KeyboardArrowLeft />Previous
                          </Button>
                        </Grid>
                        <Grid
                          className={classes.rightBut}
                        >
                          <Button
                            size="small"
                            onClick={goToNextPicture}
                            disabled={index === overview.length - 1}
                          >
                            Next<KeyboardArrowRight />
                          </Button>
                        </Grid>
                      </Grid>
                    </div>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>} */}
          </Grid>
        )
      }

    }
  }, [number, menu])

  useEffect(() => {
    if (time != null) {
      console.log(fixtimeShow)
      for (let index = 0; index < fixtimeShow.length; index++) {
        const startH = parseInt(fixtimeShow[index].start.slice(0, 2))
        const startM = parseInt(fixtimeShow[index].start.slice(3, 5))
        const endH = parseInt(fixtimeShow[index].end.slice(0, 2))
        const endM = parseInt(fixtimeShow[index].end.slice(3, 5))
        const startDate = new Date()
        const endDate = new Date()
        if (endH <= startH) {
          if (endM < startM) {
            console.log("test1")
            endDate.setDate(startDate.getDate() + 1)
          }
          else if (endH < startH) {
            console.log("test2")
            endDate.setDate(startDate.getDate() + 1)
          }
        }
        const startTime = new Date(startDate.setHours(startH, startM))
        const endTime = new Date(endDate.setHours(endH, endM))
        // console.log(startH + ':' + startM)
        // console.log(endH + ':' + endM)
        // console.log(time.getHours() + ":" + time.getMinutes())
        if (time.getTime() >= startTime.getTime() && time.getTime() <= endTime.getTime()) {
          // console.log(fixtimeShow[index])
          setPlanID(fixtimeShow[index].plan?.id)
        }
        else {
          console.log("ไม่มี")
        }
      }
      // setAutoTime(null)
      // console.log(time.getHours())
    }
  }, [time])

  useEffect(() => {
    if (planID != null) {
      planService.getPlanByID(planID).then((data) => {
        setPlanDetail(data.data)
      })
    }
  }, [planID])

  useEffect(() => {
    if (planDetail != null) {
      var temp = []
      for (let index = 0; index < planDetail.pattern.length; index++) {
        console.log(planDetail.pattern[index])
        temp.push({
          phase: `รูปแบบที่ ${planDetail.pattern[index].pattern.charAt(8)} `,
          time: planDetail.pattern[index].duration,
          toggle: false
        })
        // console.log()
      }
      setData(temp)
      setStatusNewContent(0)

    }
  }, [planDetail])



  useEffect(() => {
    if (statusNewContent != null) {
      if (statusNewContent == 0) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.buttonManual_control}
            onClick={() => { setStatusNewContent(1) }}
          >
            <img src='/static/configManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดการทำงาน
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.buttonMode_content}
              onClick={() => { setStatusMode(1) }}
            >
              อัตโนมัติ
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(2) }}
            >
              ควบคุม
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(3) }}
            >
              ไฟเเดง
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(4) }}
            >
              ไฟกระพริบ
            </Button>
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เเผนการทำงานปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {planDetail != null && planDetail.name}
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เวลาปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Grid>
        </Grid>)
      }
      if (statusNewContent == 1) {
        // setStatusMode
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.comeBackButtonManual_control}
            onClick={() => { setStatusNewContent(0) }}
          >
            <img src='/static/BackconfigManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดควบคุม
          </Grid>
          <Divider style={{ marginTop: theme.spacing(2), height: '2px', backgroundColor: '#4F4F4F', width: '80%', marginLeft: '10%' }} />
          {junction.number_channel == 3 && <Grid>
            <Grid
              className={classes.imgManual_content}
            >
              <Button
                onClick={() => { setStatusManual(1) }}
              >
                <img src={`/static/3way1_${degree}degree.jpg`} width='120px' height='120px' />
              </Button>
              <Button
                onClick={() => { setStatusManual(2) }}
              >
                <img src={`/static/3way2_${degree}degree.jpg`} width='120px' height='120px' />
              </Button>
            </Grid>
            <Grid
              className={classes.imgManual_content}
            >
              <Button
                onClick={() => { setStatusManual(3) }}
              >
                <img src={`/static/3way3_${degree}degree.jpg`} width='120px' height='120px' />
              </Button>
              <Button
                onClick={() => { setStatusManual(4) }}
              >
                <img src={`/static/3way4_${degree}degree.jpg`} width='120px' height='120px' />
              </Button>
            </Grid>
          </Grid>}
        </Grid>)
      }
    }
  }, [statusNewContent])

  useEffect(() => {
    if (statusManual != null) {
      if (statusManual == 1) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.comeBackButtonManual_control}
            onClick={() => { setStatusNewContent(0) }}
          >
            <img src='/static/BackconfigManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดควบคุม
          </Grid>
          <Divider style={{ marginTop: theme.spacing(2), height: '2px', backgroundColor: '#4F4F4F', width: '80%', marginLeft: '10%' }} />
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(1) }}
              style={{ border: '2px solid #000000' }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((1 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(2) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((2 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(3) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((3 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(4) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((4 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
        </Grid>)
      }
      if (statusManual == 2) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.comeBackButtonManual_control}
            onClick={() => { setStatusNewContent(0) }}
          >
            <img src='/static/BackconfigManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดควบคุม
          </Grid>
          <Divider style={{ marginTop: theme.spacing(2), height: '2px', backgroundColor: '#4F4F4F', width: '80%', marginLeft: '10%' }} />
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(1) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((1 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(2) }}
              style={{ border: '2px solid #000000' }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((2 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(3) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((3 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(4) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((4 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
        </Grid>)
      }
      if (statusManual == 3) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.comeBackButtonManual_control}
            onClick={() => { setStatusNewContent(0) }}
          >
            <img src='/static/BackconfigManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดควบคุม
          </Grid>
          <Divider style={{ marginTop: theme.spacing(2), height: '2px', backgroundColor: '#4F4F4F', width: '80%', marginLeft: '10%' }} />
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(1) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((1 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(2) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((2 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(3) }}
              style={{ border: '2px solid #000000' }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((3 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(4) }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((4 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
        </Grid>)
      }
      if (statusManual == 4) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.comeBackButtonManual_control}
            onClick={() => { setStatusNewContent(0) }}
          >
            <img src='/static/BackconfigManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดควบคุม
          </Grid>
          <Divider style={{ marginTop: theme.spacing(2), height: '2px', backgroundColor: '#4F4F4F', width: '80%', marginLeft: '10%' }} />
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(1) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((1 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(2) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((2 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
          <Grid
            className={classes.imgManual_content}
          >
            <Button
              onClick={() => { setStatusManual(3) }}

            >
              <img src={`/static/Mock-up_4way${(degree + ((3 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
            <Button
              onClick={() => { setStatusManual(4) }}
              style={{ border: '2px solid #000000' }}
            >
              <img src={`/static/Mock-up_4way${(degree + ((4 - 1) * 90)) % 360}.png`} width='150px' height='150px' />
            </Button>
          </Grid>
        </Grid>)
      }
    }
  }, [statusManual])

  useEffect(() => {
    if (statusMode != null) {
      if (statusMode == 1) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.buttonManual_control}
            onClick={() => { setStatusNewContent(1) }}
          >
            <img src='/static/configManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดการทำงาน
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.buttonMode_content}
              onClick={() => { setStatusMode(1) }}
            >
              อัตโนมัติ
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(2) }}
            >
              ควบคุม
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(3) }}
            >
              ไฟเเดง
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(4) }}
            >
              ไฟกระพริบ
            </Button>
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เเผนการทำงานปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {planDetail != null && planDetail.name}
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เวลาปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Grid>
        </Grid>)
      }
      if (statusMode == 2) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.buttonManual_control}
            onClick={() => { setStatusNewContent(1) }}
          >
            <img src='/static/configManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดการทำงาน
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(1) }}
            >
              อัตโนมัติ
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.buttonMode_content}
              onClick={() => { setStatusMode(2) }}
            >
              ควบคุม
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(3) }}
            >
              ไฟเเดง
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(4) }}
            >
              ไฟกระพริบ
            </Button>
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เเผนการทำงานปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {planDetail != null && planDetail.name}
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เวลาปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Grid>
        </Grid>)
      }
      if (statusMode == 3) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.buttonManual_control}
            onClick={() => { setStatusNewContent(1) }}
          >
            <img src='/static/configManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดการทำงาน
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(1) }}
            >
              อัตโนมัติ
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(2) }}
            >
              ควบคุม
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.buttonMode_content}
              onClick={() => { setStatusMode(3) }}
            >
              ไฟเเดง
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(4) }}
            >
              ไฟกระพริบ
            </Button>
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เเผนการทำงานปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {planDetail != null && planDetail.name}
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เวลาปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Grid>
        </Grid>)
      }
      if (statusMode == 4) {
        setNewContent_1(<Grid
          className={classes.newContent_1}
        >
          <Button
            className={classes.buttonManual_control}
            onClick={() => { setStatusNewContent(1) }}
          >
            <img src='/static/configManual.png' />
          </Button>
          <Grid
            className={classes.title_mode}
          >
            โหมดการทำงาน
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(1) }}
            >
              อัตโนมัติ
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(2) }}
            >
              ควบคุม
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.unSelectButtonMode_content}
              onClick={() => { setStatusMode(3) }}
            >
              ไฟเเดง
            </Button>
          </Grid>
          <Grid
            className={classes.buttonMode_grid}
          >
            <Button
              className={classes.buttonMode_content}
              onClick={() => { setStatusMode(4) }}
            >
              ไฟกระพริบ
            </Button>
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เเผนการทำงานปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {planDetail != null && planDetail.name}
          </Grid>
          <Grid
            className={classes.title_mode}
          >
            เวลาปัจจุบัน
          </Grid>
          <Grid
            className={classes.planNewContent}
          >
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Grid>
        </Grid>)
      }
    }
  }, [statusMode])
  useEffect(() => {
    var img_path = []
    if (data != null) {
      console.log("data : ", data)
      for (let index = 0; index < data.length; index++) {

        img_path.push(data[index].phase[10])
      }

      let swap = initHei
      initHei = initWid
      initWid = swap
      console.log(img_path)
      for (let index = 0; index < img_path.length; index++) {
        var temp = img_path[index]
        if (junction.number_channel == 3) {
          // img_path[index] = { url: `/static/Mock-up_3way${temp}_${degree}degree.png` }
          img_path[index] = { url: `/static/3way${temp}_${degree}degree.jpg` }
        }
        else if (junction.number_channel == 4) {
          if (temp >= 1 && temp <= 4) {
            img_path[index] = { url: `/static/4way${temp}.jpg` }
          }
          else {
            if (temp == 5) {
              if (degree == 90 || degree == 270) {
                img_path[index] = { url: `/static/4way${temp + 1}.jpg` }
              }
              else {
                img_path[index] = { url: `/static/4way${temp}.jpg` }
              }
            }
            else if (temp == 6) {
              if (degree == 90 || degree == 270) {
                img_path[index] = { url: `/static/4way${temp - 1}.jpg` }
              }
              else {
                img_path[index] = { url: `/static/4way${temp}.jpg` }
              }
            }
            else if (temp == 7) {
              if (degree == 90 || degree == 270) {
                img_path[index] = { url: `/static/4way${temp + 1}.jpg` }
              }
              else {
                img_path[index] = { url: `/static/4way${temp}.jpg` }
              }
            }
            else if (temp == 8) {
              if (degree == 90 || degree == 270) {
                img_path[index] = { url: `/static/4way${temp - 1}.jpg` }
              }
              else {
                img_path[index] = { url: `/static/4way${temp}.jpg` }
              }
            }
          }

        }
      }
      console.log(img_path)
      setOverView(img_path)

    }

  }, [data])

  useEffect(() => {
    if (autoTime == null) {
      console.log("set auto time")
      setAutoTime(<AutoTimer hours={time.getHours()} minutes={time.getMinutes()} seconds={time.getSeconds()} status='toggle' />)
    }
  }, [autoTime])
  const [countup, setCountup] = useState(<Timer />)
  const [autoTime, setAutoTime] = useState(<AutoTimer />)
  const [button, setButton] = useState([]);
  const [toggle, setToggle] = useState()
  const [longpress, setlongPress] = useState(false)
  const [dataPhase, setDataPhase] = useState({ "phase": 0 })
  const [dataMode, setDataMode] = useState({ "mode": 0 })
  const [content, setContent] = useState()


  const onLongPress = () => {
    console.log('longpress is triggered');
    setlongPress(true)
    // setlongPressCount(longPressCount + 1)
  };

  const onClick = () => {
    console.log('click is triggered')
    // setClickCount(clickCount + 1)
  }

  const handleSetPhase = (data) => {
    setDataPhase({
      "phase": data
    })

  }
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  useEffect(() => {
    let temp = []
    for (let index = 0; index < 7; index++) {
      if (index == toggle) {
        temp[index] = true
      }
      else {
        temp[index] = false
      }
    }
    setButton(temp)
    setContent(null)
  }, [toggle])
  useEffect(() => {
    setCountup(null)
  }, [button])
  useEffect(() => {
    if (countup == null) {
      setCountup(<Timer status='toggle' />)
    }
  }, [countup])
  useEffect(() => {
    if (content == null) {
      if (toggle == 0) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              < img src={`/static/Mock-up_3way1_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(0)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 1
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              < img src={`/static/Mock-up_3way2_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(1)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 2
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              < img src={`/static/Mock-up_3way3_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(2)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 3
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 1) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              < img src={`/static/Mock-up_3way1_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(0)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 1
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              < img src={`/static/Mock-up_3way2_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(1)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 2
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_3way3_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(2)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 3
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 2) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              < img src={`/static/Mock-up_3way1_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(0)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 1
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              < img src={`/static/Mock-up_3way2_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(1)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 2
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              < img src={`/static/Mock-up_3way3_${junction.rotate} degree.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(2)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 3
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 3) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              <img src={`/static/Mock-up_4way${junction.rotate}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(3)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 5
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_4way${(junction.rotate + 90) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(4)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 6
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_4way${(junction.rotate + 180) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(5)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 7
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_4way${(junction.rotate + 270) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(6)
                handleSetPhase(8)
              }}
            >
              Phase ที่ 8
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 4) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid
            >
              <img src={`/static/Mock-up_4way${junction.rotate}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(3)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 5
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 90) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(4)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 6
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_4way${(junction.rotate + 180) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(5)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 7
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src={`/static/Mock-up_4way${(junction.rotate + 270) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(6)
                handleSetPhase(8)
              }}
            >
              Phase ที่ 8
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 5) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid
            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 0) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(3)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 5
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid

            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 90) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(4)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 6
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 180) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(5)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 7
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid

            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 270) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(6)
                handleSetPhase(8)
              }}
            >
              Phase ที่ 8
            </Button>
          </Grid>
        </Grid>)
      }
      if (toggle == 6) {
        setContent(<Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid
            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 0) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              // {...longPressEvent}
              onClick={() => {
                setToggle(3)
                handleSetPhase(5)
              }}
            >
              Phase ที่ 5
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid

            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 90) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(4)
                handleSetPhase(6)
              }}
            >
              Phase ที่ 6
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid

            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 180) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(5)
                handleSetPhase(7)
              }}
            >
              Phase ที่ 7
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid
              className={classes.selectBorder}
            >
              <img src={`/static/Mock-up_4way${(junction.rotate + 270) % 360}.png`} width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(6)
                handleSetPhase(8)
              }}
            >
              Phase ที่ 8
            </Button>
          </Grid>
        </Grid>)
      }

    }
  }, [content])
  useEffect(() => {
    if (menu != "") {
      setDataMode({
        "mode": menu
      })
      manualControlService.setMode(dataMode, path).then()
    }
    if (menu == 1) {
      // setContent("")
      setCountup("")
      setAutoTime(null)
    }
  }, [menu])
  const handleChangeManu = (event) => {
    setMenu(event.target.value);
  };
  useEffect(() => {
    manualControlService.setPhase(dataPhase, path).then()
    // console.log(junction)
  }, [dataPhase])
  // console.log(number)
  return (
    <Page
      className={classes.root}
      title="Manual-Control"
    >
      {newContent_1 != null && newContent_1}
      <Grid
        className={classes.newContent_2}
      >
        <Grid
          className={classes.newContent_3}
        >
          <Grid
            className={classes.content_3_text}
          >
            ระยะเวลา
          </Grid>
          <Grid
            className={classes.content_3_border}
          >
            <Grid
              className={classes.contentInBorder}
            >
              {data != null && data[index] != undefined && data[index].time}
            </Grid>
          </Grid>
          <Grid
            className={classes.content_3_text}
          >
            วินาที
          </Grid>
        </Grid>
        <Grid
          className={classes.newContent_4}
        >
          <Grid
            className={classes.content4_imgOverView}
          >
            {overview.length != 0 && <div
              style={{
                marginTop: theme.spacing(5),
                maxWidth: 500,
                maxHeight: 500,
                // display:'flex',
                // justifyContent: 'center',
                // alignContent: 'center',
                flexGrow: 1,
                position: 'relative'
              }}
            >
              {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && (degree == 180 || degree == 0) && junction.number_channel == 3 && <img
                src={overview[index].url}
                style={{
                  height: 500,
                  width: "100%",
                  width: 500,
                  display: "block",
                  overflow: "hidden",
                }}
              />}
              {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && (degree == 90 || degree == 270) && junction.number_channel == 3 && <img
                src={overview[index].url}
                style={{
                  height: 500,
                  width: "100%",
                  width: 500,
                  display: "block",
                  overflow: "hidden",

                }}
              />}
              {data[index].phase != 'เลือกรูปแบบ' && overview[index] != null && junction.number_channel == 4 && <img
                src={overview[index].url}
                style={{
                  height: 500,
                  width: "100%",
                  width: 500,
                  display: "block",
                  overflow: "hidden",
                }}
              />}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
              {data[index].phase != 'เลือกรูปแบบ' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
              <Grid
                className={classes.buttom}
              >
                <Grid
                  className={classes.leftBut}
                >
                  <Button
                    size="small"
                    onClick={goToPrevPicture}
                    disabled={index === 0}
                  >
                    <KeyboardArrowLeft />Previous
                  </Button>
                </Grid>
                <Grid
                  className={classes.rightBut}
                >
                  <Button
                    size="small"
                    onClick={goToNextPicture}
                    disabled={index === overview.length - 1}
                  >
                    Next<KeyboardArrowRight />
                  </Button>
                </Grid>
              </Grid>
            </div>}
          </Grid>
        </Grid>
        {/* test */}
      </Grid>
    </Page>
  );
};

export default ManualControl;