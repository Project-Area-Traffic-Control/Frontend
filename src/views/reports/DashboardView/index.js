import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from '../../../components/Page';
import TotalCarThisDay from "./TotalCarThisDay";
import TotalCar7Day from "./TotalCar7Day";
import TotalCarBlacklist from "./TotalCarBlacklist";
import TotalCarWhitelist from "./TotalCarWhitelist";
import MapView from "./Map/MapView";
import ChartView from "./Chart";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useLocation } from 'react-router';
import { junctionService } from '../../../services/junction.service';
import { vehicleService } from '../../../services/vehicle.service';
// import Typography from '../../../theme/typography';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F1F1F1",
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridBox: {
    height: '100%'
  },
  chartBox: {
    height: '100'
  },
  chartTitle: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const location = useLocation();
  const [juncID, setJuncID] = useState(null)
  const [raw_data, setRawData] = useState(null)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [channel, setChannel] = useState(null)
  const [channel_1, setChannel_1] = useState(null)
  const [channel_2, setChannel_2] = useState(null)
  const [channel_3, setChannel_3] = useState(null)
  const [channel_4, setChannel_4] = useState(null)
  const [channel_5, setChannel_5] = useState(null)
  const [vehicle_List, setVehicle_List] = useState(null)
  const [maxIndex, setMaxIndex] = useState(null)
  const [maxHour, setMaxHour] = useState(null)
  const [lastestVehicle_List, setLastestVehicle_List] = useState(null)
  const [max, setMax] = useState(null)
  const [data, setData] = useState(null)


  async function submitDate(startDate, endDate) {
    console.log(startDate)
    console.log(endDate)
    await vehicleService.getTotalBySearch({
      start: new Date(startDate),
      end: new Date(endDate),
      junction_id: juncID
    }).then((data) => {
      // console.log(data)
      setVehicle_List(data)
    })
    // console.log(res)
  }
  useEffect(() => {
    setJuncID(location.pathname.slice(15, location.pathname.length))
    const start = new Date()
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
    setStart(start)
    setEnd(end)
  }, [location.pathname])

  useEffect(() => {
    if (juncID != null) {
      // console.log(juncID)
      junctionService.getJunctionByID(juncID).then((data) => {
        setRawData(data)
        setChannel(data.channel)
      })
      vehicleService.getTotalByJunctionID(juncID).then((data) => {
        setVehicle_List(data)
      })
    }
  }, [juncID])

  useEffect(() => {
    if (vehicle_List != null) {
      console.log(start.getDate())
      var temp = []
      for (let index = vehicle_List.length - 1; index >= vehicle_List.length - 20; index--) {
        // if (vehicle_List[])
        temp.push(vehicle_List[index])
      }
      var countHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let index = 0; index < vehicle_List.length; index++) {
        var tempDate = new Date(vehicle_List[index].create_time)
        if (start.getDate() == tempDate.getDate())
          countHour[tempDate.getHours()] += 1
      }
      var max = -1
      var max_index = 0
      for (let index = 0; index < countHour.length; index++) {
        if (max <= countHour[index]) {
          max = countHour[index]
          max_index = index
        }
      }
      setMaxHour(max)
      setMaxIndex(max_index)
      // console.log(temp)
      setLastestVehicle_List(temp)
    }
  }, [vehicle_List])

  useEffect(() => {
    if (maxHour != null) {
      console.log(maxHour)
    }
  }, [maxHour])

  useEffect(() => {
    if (channel != null) {
      console.log(channel)
      const startDate = new Date()
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1)
      // const endDate = new Date(2022, 7, 32)
      // console.log(endDate.toLocaleDateString())
      var temp = []
      // submitDate(startDate, endDate)
      if (channel.length == 3) {
        vehicleService.getTotalByChannelID(channel[0]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          // console.log(count)
          setChannel_1(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[1]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_2(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[2]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_3(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
      }

      if (channel.length == 4) {
        vehicleService.getTotalByChannelID(channel[0]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_1(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[1]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_2(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[2].id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_3(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[3].id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_4(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
      }

      if (channel.length == 5) {
        vehicleService.getTotalByChannelID(channel[0]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_1(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[1]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_2(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[2]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_3(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[3]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_4(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
        vehicleService.getTotalByChannelID(channel[4]?.id).then(data => {
          // temp.push(data)
          // console.log(data.length)
          // temp_3.push(data)
          var count = 0
          for (let j = 0; j < data.length; j++) {
            var date = new Date(data[j].create_time)
            if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
              count += 1
            }
          }
          // if (index == 0) {
          setChannel_5(count)
          // }
          // if (index == 1) {
          //   setChannel_2(count.length)
          // }
          // if (index == 2) {
          //   setChannel_3(count.length)
          // }
          // if (index == 3) {
          //   setChannel_4(count.length)
          // }
          // if (index == 4) {
          //   setChannel_5(count.length)
          // }
          // temp.push(temp_2)
        })
      }
      var temp_3 = []
      // for (let index = 0; index < channel.length; index++) {
      //   var count = []
      //   vehicleService.getTotalByChannelID(channel[index]?.id).then(data => {
      //     // temp.push(data)
      //     // console.log(data.length)
      //     temp_3.push(data)
      //     for (let j = 0; j < data.length; j++) {
      //       var date = new Date(data[j].create_time)
      //       if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth()) {
      //         count.push(data[j])
      //       }
      //     }
      //     if (index == 0) {
      //       setChannel_1(count.length)
      //     }
      //     if (index == 1) {
      //       setChannel_2(count.length)
      //     }
      //     if (index == 2) {
      //       setChannel_3(count.length)
      //     }
      //     if (index == 3) {
      //       setChannel_4(count.length)
      //     }
      //     if (index == 4) {
      //       setChannel_5(count.length)
      //     }
      //     // temp.push(temp_2)
      //   })
      //   console.log(temp_3)
      // }
      // setDateUse(temp)
      // for (let index = 0; index < temp.length; index++) {
      //   var temp_4 = []
      //   var date = new Date(temp[index])
      //   console.log(date.getDate() + " = " + startDate.getDate())
      //   if (date.getDate() == startDate.getDate() && date.getMonth() == startDate.getMonth() && date.getFullYear() == startDate.getFullYear()) {

      //     temp_4.push(date)
      //   }
      //   temp_3.push(temp_4)
      // }

      // console.log(temp_3)
    }

  }, [channel])

  useEffect(() => {
    if (channel_1 != null || channel_2 != null || channel_3 != null || channel_4 != null || channel_5 != null) {
      if (channel.length == 3) {
        if (channel_1 >= channel_2 && channel_1 >= channel_3) {
          setMax([channel[0].name, channel_1])
        }
        if (channel_2 >= channel_1 && channel_2 >= channel_3) {
          setMax([channel[1].name, channel_2])
        }
        if (channel_3 >= channel_1 && channel_3 >= channel_2) {
          setMax([channel[2].name, channel_3])
        }
        var temp = [{
          name: channel[0].name,
          total: channel_1
        },
        {
          name: channel[1].name,
          total: channel_2
        },
        {
          name: channel[2].name,
          total: channel_3
        },
        ]
        setData(temp)
      }
      if (channel.length == 4) {
        if (channel_1 >= channel_2 && channel_1 >= channel_3 && channel_1 >= channel_4) {
          setMax([channel[0].name, channel_1])
        }
        if (channel_2 >= channel_1 && channel_2 >= channel_3 && channel_2 >= channel_4) {
          setMax([channel[1].name, channel_2])
        }
        if (channel_3 >= channel_1 && channel_3 >= channel_2 && channel_3 >= channel_4) {
          setMax([channel[2].name, channel_3])
        }
        if (channel_4 >= channel_1 && channel_4 >= channel_2 && channel_4 >= channel_3) {
          setMax([channel[3].name, channel_4])
        }
        var temp = [{
          name: channel[0].name,
          total: channel_1
        },
        {
          name: channel[1].name,
          total: channel_2
        },
        {
          name: channel[2].name,
          total: channel_3
        },
        {
          name: channel[3].name,
          total: channel_4
        },
        ]
        setData(temp)
      }
      if (channel.length == 5) {
        if (channel_1 >= channel_2 && channel_1 >= channel_3 && channel_1 >= channel_4 && channel_1 >= channel_5) {
          setMax([channel[0].name, channel_1])
        }
        if (channel_2 >= channel_1 && channel_2 >= channel_3 && channel_2 >= channel_4 && channel_2 >= channel_5) {
          setMax([channel[1].name, channel_2])
        }
        if (channel_3 >= channel_1 && channel_3 >= channel_2 && channel_3 >= channel_4 && channel_3 >= channel_5) {
          setMax([channel[2].name, channel_3])
        }
        if (channel_4 >= channel_1 && channel_4 >= channel_2 && channel_4 >= channel_3 && channel_4 >= channel_5) {
          setMax([channel[3].name, channel_4])
        }
        if (channel_5 >= channel_1 && channel_5 >= channel_2 && channel_5 >= channel_3 && channel_5 >= channel_4) {
          setMax([channel[4].name, channel_5])
        }
        var temp = [{
          name: channel[0].name,
          total: channel_1
        },
        {
          name: channel[1].name,
          total: channel_2
        },
        {
          name: channel[2].name,
          total: channel_3
        },
        {
          name: channel[3].name,
          total: channel_4
        },
        {
          name: channel[4].name,
          total: channel_5
        },
        ]
        setData(temp)
      }
    }
  }, [channel_1, channel_2, channel_3, channel_4, channel_5])
  useEffect(() => {
    if (data != null) {
      console.log(data)
    }
  }, [data])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  return (
    <Page className={classes.root} title="Dashboard">
      <Container >
        <Grid container spacing={3} className={classes.gridBox}>
          {max != null && < Grid item lg={3} sm={6} xl={6} xs={12}>
            <TotalCarThisDay max={max} />
          </Grid>}
          {maxHour != null && maxIndex != null && <Grid item lg={3} sm={6} xl={6} xs={12}>
            <TotalCar7Day maxHour={maxHour} max_index={maxIndex} />
          </Grid>}
          {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCarBlacklist />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCarWhitelist />
          </Grid> */}

          {data != null && <Grid item lg={8} md={8} xl={8} xs={12}>
            {/* <ChartView /> */}
            {/* <Grid>
              <Typography>
                วันนี้ที่รอคอย
              </Typography>
            </Grid> */}
            <Grid>
              <Grid
                className={classes.chartTitle}
              >
                <Typography
                  variant='h3'
                >
                  กราฟแสดงปริมาณรถวันที่ {new Date().toLocaleDateString()}
                </Typography>
              </Grid>
              <BarChart
                width={800}
                height={500}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar type="monotone" dataKey="total" fill="#8884d8" >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
                {/* <Bar type="monotone" dataKey="uv" fill="#82ca9d" /> */}
              </BarChart>
            </Grid>
            {/* <MainVideo /> */}
          </Grid>}

          {/* <Grid item lg={4} md={6} xl={4} xs={12}> */}

          {/* <MainVideo /> */}
          {/* </Grid> */}



          {lastestVehicle_List != null && <Grid item lg={4} md={4} xl={4} xs={12}>
            {/* <MainVideo /> */}
            <MapView data={lastestVehicle_List}></MapView>
            {/* <DashboardTable /> */}
          </Grid>}

        </Grid>
      </Container>
    </Page >
  );
};

export default Dashboard;
