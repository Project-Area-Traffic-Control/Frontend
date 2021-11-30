import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
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
    height: '55%',
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
    justifyContent: 'center'
  },
  bottomGrid: {
    width: '100%',
    height: '45%',
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
    borderColor: '#FF0000',
    borderWidth: '2px'
  },
  buttonPattern: {
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px'
  }
}));

const ManualControl = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [path, setPath] = useState("")
  const [junction, setJunction] = useState({})
  const [number, setNumber] = useState(0)
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
    }
    setNumber(junction.number_channel)
  }, [junction])
  const [countup, setCountup] = useState(<Timer />)
  const [button, setButton] = useState([]);
  const [toggle, setToggle] = useState()
  const [longpress, setlongPress] = useState(false)
  const onLongPress = () => {
    console.log('longpress is triggered');
    setlongPress(true)
    // setlongPressCount(longPressCount + 1)
  };

  const onClick = () => {
    console.log('click is triggered')
    // setClickCount(clickCount + 1)
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
  }, [toggle])
  useEffect(() => {
    setCountup(null)
  }, [button])
  useEffect(() => {
    if (countup == null) {
      setCountup(<Timer status='toggle' />)
    }
  }, [countup])
  const checkChannel = (checkNumber) => {
    if (checkNumber == 3) {
      return (
        <Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_3way1.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(0)
              }}
            >
              เลือก
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_3way2.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(1)
              }}
            >
              เลือก
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_3way3.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(2)
              }}
            >
              เลือก
            </Button>
          </Grid>
        </Grid>
      );
    }
    else if (checkNumber == 4) {
      return (
        <Grid
          className={classes.contentGrid}
        >
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_4way1.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              {...longPressEvent}
              onClick={() => {
                setToggle(3)
              }}
            >
              เลือก
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_4way2.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(4)
              }}
            >
              เลือก
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_4way3.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(5)
              }}
            >
              เลือก
            </Button>
          </Grid>
          <Grid
            className={classes.imgPattern}
          >
            <Grid>
              <img src='/static/Mock-up_4way4.png' width='277px' height='248px' />
            </Grid>
            <Button
              className={classes.buttonPattern}
              onClick={() => {
                setToggle(6)
              }}
            >
              เลือก
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
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
            <Typography
              variant='h3'
            >
              โหมดการทำงาน : Manual Control Mode
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className={classes.bottomGrid}
        >
          {checkChannel(number)}
        </Grid>
      </Grid>
    </Page>
  );
};

export default ManualControl;