import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  MenuItem,
  TextField
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    // paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(3)
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
    height: '55%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center'
  },
  contentGrid: {

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
  }
}));

const ManualControl = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [path, setPath] = useState("")
  const [junction, setJunction] = useState({})
  const [number, setNumber] = useState(0)
  const [imgList, setImgList] = useState([])
  const [degree, setDegree] = useState(null)
  const [menu, setMenu] = useState("")
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
    setPath(location.pathname.slice(20, location.pathname.length))
  }, [])
  useEffect(() => {
    setPath(location.pathname.slice(20, location.pathname.length))
    setCountup(<Grid />)
  }, [location.pathname])
  useEffect(() => {
    junctionService.getJunctionByID(path).then(data => {
      setJunction(data)
    })
    // console.log(junction)
  }, [path])
  useEffect(() => {
    // junctionService.getJunctionByID(path).then(data => {
    //   setJunction(data)
    // })
    if (junction.length > 1) {
      let temp = {}
      for (let index = 0; index < junction.length; index++) {
        if (junction[index].id == path) {
          temp = junction[index]
          setJunction(temp)
        }
      }
      setDegree(junction.rotate)
    }
    setNumber(junction.number_channel)
  }, [junction])
  useEffect(() => {
    if (menu != "") {
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
  }, [number, menu])
  const [countup, setCountup] = useState(<Timer />)
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
              < img src={`/static/Mock-up_3way1_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way2_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way3_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way1_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way2_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              <img src={`/static/Mock-up_3way3_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way1_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way2_${junction.rotate}degree.png`} width='277px' height='248px' />
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
              < img src={`/static/Mock-up_3way3_${junction.rotate}degree.png`} width='277px' height='248px' />
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
      setContent("")
      setCountup("")
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
      <Grid
        className={classes.container}
      >
        <Grid
          className={classes.topGrid}
        >
          <Grid
            className={classes.imgTimer}
          >
            {/* <img src='/static/Mock-up_timer.png' width='255px' height='235px' /> */}
            {/* <Countdown date={Date.now() + 120000} /> */}
            {toggle != null && countup}
            {/* <Timer /> */}
          </Grid>
          <Grid
            className={classes.titleText}
          >
            <TextField
              className={classes.selectField}
              id="outlined-select-menu"
              select
              name="number_channel"
              label="โหมดการทำงาน"
              value={menu}
              onChange={handleChangeManu}
              variant="outlined"
              margin="normal"
              fullWidth
            >
              <MenuItem value="1" className={classes.menuList}>
                Auto Mode
              </MenuItem>
              <MenuItem value="0" className={classes.menuList}>
                Manual Control Mode
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid
          className={classes.bottomGrid}
        >
          {/* {checkChannel(number)} */}
          {content}
        </Grid>
      </Grid>
    </Page>
  );
};

export default ManualControl;