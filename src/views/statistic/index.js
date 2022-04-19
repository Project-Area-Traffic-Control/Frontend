import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import Page from '../../components/Page';
import TotalCarThisDay from "./TotalCarThisDay";
import TotalCar7Day from "./TotalCar7Day";
import TotalCarBlacklist from "./TotalCarBlacklist";
import TotalCarWhitelist from "./TotalCarWhitelist";
// import MapView from "./Map/MapView";
import ChartView from "./Chart";
import { SearchRounded } from '@material-ui/icons';
import { vehicleService } from '../../services/vehicle.service';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryBoxPlot, VictoryTooltip } from 'victory';
import { useLocation } from 'react-router';
import { junctionService } from '../../services/junction.service';
// import Typography from '../../theme/typography';
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
    content: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    bottomContent: {
        marginTop: theme.spacing(5),
        width: '100%',
        backgroundColor: '#ffffff',
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
        paddingLeft: theme.spacing(2),
        width: '100%'
    },
    divider: {
        backgroundColor: '#287298',
        height: '2px'
    },
    filterDate: {
        width: '80%',
        display: 'flex',
        marginLeft: '10%'
    },
    chart_1Content: {
        width: '100%',
        display: 'flex'
    },
    chartData: {
        marginTop: theme.spacing(5),
        width: '80%',
        // height: '480px',
        // display: 'flex',
        // marginLeft: '10%'
    },
    pieChartContent: {
        // marginTop: theme.spacing(),
        width: '20%',
        // height: '480px',
        display: 'flex',
        // backgroundColor: "#000000"
        marginRight: '10%',
        height: '30%'
    },
    startDate: {
        marginTop: theme.spacing(5),
        width: '40%',
        display: 'flex',
        textAlign: 'center'
    },
    endDate: {
        width: '40%',
        marginTop: theme.spacing(5),
        display: 'flex',
        textAlign: 'center',
        marginLeft: theme.spacing(5)
    },
    textField_name: {
        marginLeft: theme.spacing(3),
        paddingBottom: theme.spacing(5),
        width: '100%',
    },
    typolo: {
        width: '50%',
        marginTop: theme.spacing(2)
    },
    // buttonContent: {
    //     width: '100%',
    //     display: 'flex',
    //     // justifyContent: 'flex-end',
    //     marginLeft: '85%',
    //     marginRight: theme.spacing(5)
    // },
    buttonGrid: {
        marginTop: theme.spacing(5),
        display: 'flex',
        width: '10%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        marginRight: '3%',
        marginBottom: '3%',
        color: '#FFFFFF',
        fontSize: '18px',
        marginLeft: '5%'
    },
    detailChannel_1: {
        display: 'flex',
        textAlign: 'center',
        marginTop: theme.spacing(20),
        marginLeft: theme.spacing(10),
        height: '52px'
    },
    detailChannel_2: {
        display: 'flex',
        textAlign: 'center',
        // marginTop: theme.spacing(20),
        marginLeft: theme.spacing(10),
        height: '52px'
    },
    detailColor_1: {
        backgroundColor: '#0088FE',
        width: '15px',
        height: '15px'
    },
    detailColor_2: {
        backgroundColor: '#00C49F',
        width: '15px',
        height: '15px'
    },
    detailColor_3: {
        backgroundColor: '#FFBB28',
        width: '15px',
        height: '15px'
    },
    typoloColor: {
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(10),
        width: '25%'
    },
    menuList: {
        backgroundColor: '#FFFFFF'
    },
}));

const Statistic = () => {
    const classes = useStyles();
    const location = useLocation();
    const [vehicle_List, setVehicle_List] = useState([])
    const [channel, setChannel] = useState(null)
    const [menu, setMenu] = useState(null)
    const [dateNumber, setDateNumber] = useState(null)
    const [dataDate_2, setDataDate_2] = useState(null)
    const [dataDate_3, setDataDate_3] = useState(null)
    async function submitDate() {
        await vehicleService.getTotalBySearch({
            start: new Date(startDate),
            end: new Date(endDate),
            junction_id: 4
        }).then((data) => {
            // console.log(data)
            setVehicle_List(data)
        })
        // console.log(res)
    }
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    // con
    const [totalDate, setTotalDate] = useState(null)
    const [channelSelect, setChannelSelect] = useState(null)
    const [selectMenu, setSelectMenu] = useState(null)
    const handleChangeMenu = (event) => {
        setMenu(event.target.value)
    }
    // {
    //     name: '22:00 - 05:59',
    //     total_car: 0,
    //     // pv: 2400,
    //     // amt: 2400,
    // },
    // {
    //     name: '06:00 - 07:59',
    //     total_car: 0,
    //     // pv: 1398,
    //     // amt: 2210,
    // },
    // {
    //     name: '08:00 - 10:59',
    //     total_car: 0,
    //     // pv: 9800,
    //     // amt: 2290,
    // },
    // {
    //     name: '11:00 - 12:59',
    //     total_car: 0,
    //     // pv: 3908,
    //     // amt: 2000,
    // },
    // {
    //     name: '13:00 - 15:59',
    //     total_car: 0,
    //     // pv: 4800,
    //     // amt: 2181,
    // },
    // {
    //     name: '16:00 - 18:59',
    //     total_car: 0,
    //     // pv: 3800,
    //     // amt: 2500,
    // },
    // {
    //     name: '19:00 - 22:59',
    //     total_car: 0,
    //     // pv: 4300,
    //     // amt: 2100,
    // },]
    const handleChangeDate = (event, type) => {
        // console.log(event.target.value)
        if (type == 1) {
            setStartDate(event.target.value)
        }
        else if (type == 2) {
            setEndDate(event.target.value)
        }
    }

    const handleChangeSelect = (event) => {
        setSelectMenu(event.target.value)
        // console.log("select menu : ", event.target.value)
    }
    const [data, setData] = useState(null)
    const [data_2, setData_2] = useState(null)
    const [data_3, setData_3] = useState(null)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS_DAY = ['#F96D6D', '#F4F96D', '#F668D5', '#45D762', '#E88F36', '#30E3E9', '#9F30E9']

    const dayList = [
        {
            name: "วันอาทิตย์",
            value: 0
        },
        {
            name: "วันจันทร์",
            value: 1
        },
        {
            name: "วันอังคาร",
            value: 2
        },
        {
            name: "วันพุธ",
            value: 3
        },
        {
            name: "วันพฤหัสบดี",
            value: 4
        },
        {
            name: "วันศุกร์",
            value: 5
        },
        {
            name: "วันเสาร์",
            value: 6
        },
    ]
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        const date = new Date()
        setStartDate(date.getDate() - 1)
        setEndDate(date.getDate())
        junctionService.getJunctionByID(location.pathname.slice(5, location.pathname.length - 10)).then((data) => {
            setChannel(data.channel)
        })

    }, [])

    useEffect(() => {
        if (channel != null) {
            var temp = []
            for (let index = 0; index < channel.length; index++) {
                temp.push({
                    name: channel[index].name,
                    value: index
                })
            }
            setChannelSelect(temp)
        }
    }, [channel])
    useEffect(() => {
        if (selectMenu != null) {
            var temp = []
            var str_temp = ""
            console.log(selectMenu)
            if (selectMenu == 0) {
                str_temp = channel[0].name
            }
            if (selectMenu == 1) {
                str_temp = channel[1].name
            }
            if (selectMenu == 2) {
                str_temp = channel[2].name
            }
            if (selectMenu == 3) {
                str_temp = channel[3].name
            }
            if (selectMenu == 4) {
                str_temp = channel[4].name
            }
            // console.log(str_temp)
            for (let index = 0; index < vehicle_List.length; index++) {
                // console.log(vehicle_List[index])
                if (vehicle_List[index].channel.name === str_temp) {
                    temp.push(vehicle_List[index])
                }
            }
            // console.log(temp)
            var temp_2 = []
            const start = new Date(startDate)
            for (let j = 0; j < dateNumber; j++) {
                var temp_3 = []
                for (let index = 0; index < temp.length; index++) {
                    var getDate = new Date(vehicle_List[index].create_time)
                    if (getDate.getDate() == start.getDate() + j) {
                        temp_3.push(temp[index])
                    }
                }
                temp_2.push(temp_3)
                // console.log(temp)
            }
            console.log(temp_2)
            var count_1 = []
            var count_2 = []
            var count_3 = []
            var count_4 = []
            var count_5 = []
            var count_6 = []
            var count_7 = []
            // console.log(dateNumber)
            for (let index = 0; index < dateNumber; index++) {
                count_1.push(0)
                count_2.push(0)
                count_3.push(0)
                count_4.push(0)
                count_5.push(0)
                count_6.push(0)
                count_7.push(0)
            }
            // console.log([count_1, count_2, count_3, count_4, count_5, count_6, count_7])
            for (let index = 0; index < temp_2.length; index++) {
                for (let j = 0; j < temp_2[index].length; j++) {
                    var hours = new Date(temp_2[index][j].create_time)
                    // console.log(hours)
                    if ((hours.getHours() >= 23 && hours.getHours() < 24) || (hours.getHours() >= 0 && hours.getHours() < 6)) {
                        count_1[index] += 1
                    }
                    else if (hours.getHours() >= 6 && hours.getHours() < 8) {
                        count_2[index] += 1
                    }
                    else if (hours.getHours() >= 8 && hours.getHours() < 11) {
                        count_3[index] += 1
                    }
                    else if (hours.getHours() >= 11 && hours.getHours() < 13) {
                        count_4[index] += 1
                    }
                    else if (hours.getHours() >= 13 && hours.getHours() < 16) {
                        count_5[index] += 1
                    }
                    else if (hours.getHours() >= 16 && hours.getHours() < 19) {
                        count_6[index] += 1
                    }
                    else if (hours.getHours() >= 19 && hours.getHours() < 23) {
                        count_7[index] += 1
                    }
                }
            }
            setDataDate_3([count_1, count_2, count_3, count_4, count_5, count_6, count_7])

            var initial_count_Day = [0, 0, 0, 0, 0, 0, 0]
            // for (let index = 0; index < channel.length; index++) {
            //     initial_count_channel.push(0)
            // }
            for (let index = 0; index < temp.length; index++) {
                var dateDay = new Date(temp[index].create_time)

                // if (dateDay.getDate() == dateRepeat[j].getDate()) {
                if (dateDay.getDay() == 0) {
                    initial_count_Day[0] += 1
                }
                if (dateDay.getDay() == 1) {
                    initial_count_Day[1] += 1
                }
                if (dateDay.getDay() == 2) {
                    initial_count_Day[2] += 1
                }
                if (dateDay.getDay() == 3) {
                    initial_count_Day[3] += 1
                }
                if (dateDay.getDay() == 4) {
                    initial_count_Day[4] += 1
                }
                if (dateDay.getDay() == 5) {
                    initial_count_Day[5] += 1
                }
                if (dateDay.getDay() == 6) {
                    initial_count_Day[6] += 1
                }
                // }
            }
            var temp_data = []
            for (let index = 0; index < initial_count_Day.length; index++) {
                temp_data.push({
                    value: initial_count_Day[index],
                    // name: channel[index].name
                })
            }
            setData_3(temp_data)
        }
    }, [selectMenu])
    useEffect(() => {
        if (menu != null) {
            var temp = []
            const initDate = new Date(startDate)
            var startToEnd = []
            for (let index = 0; index < dateNumber; index++) {
                startToEnd.push(new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() + index))
                // if (temp_2.) {
                //     temp.push()
                // }
                // console.log(temp_2.toLocaleDateString())
            }
            var dateRepeat = []
            for (let index = 0; index < startToEnd.length; index++) {
                if (startToEnd[index].getDay() == menu) {
                    dateRepeat.push(startToEnd[index])
                }
            }
            console.log(dateRepeat)
            var dataDate = []
            for (let j = 0; j < dateRepeat.length; j++) {
                // console.log(dateRepeat[j].getDate())
                var temp_3 = []
                for (let index = 0; index < vehicle_List.length; index++) {
                    // const element = array[index];
                    var date = new Date(vehicle_List[index].create_time)
                    // console.log(date.getDate())

                    if (date.getDate() == dateRepeat[j].getDate()) {
                        temp_3.push(date)
                        // console.log(date)
                    }
                }
                dataDate.push(temp_3)
            }
            var count_1 = []
            var count_2 = []
            var count_3 = []
            var count_4 = []
            var count_5 = []
            var count_6 = []
            var count_7 = []
            for (let index = 0; index < dataDate.length; index++) {
                count_1.push(0)
                count_2.push(0)
                count_3.push(0)
                count_4.push(0)
                count_5.push(0)
                count_6.push(0)
                count_7.push(0)
            }
            console.log(dataDate)
            for (let index = 0; index < dataDate.length; index++) {
                for (let j = 0; j < dataDate[index].length; j++) {
                    // const element = array[index];
                    var hours = new Date(dataDate[index][j])
                    console.log(hours.getHours())
                    if ((hours.getHours() >= 23 && hours.getHours() < 24) || (hours.getHours() >= 0 && hours.getHours() < 6)) {
                        count_1[index] += 1
                    }
                    else if (hours.getHours() >= 6 && hours.getHours() < 8) {
                        count_2[index] += 1
                    }
                    else if (hours.getHours() >= 8 && hours.getHours() < 11) {
                        count_3[index] += 1
                    }
                    else if (hours.getHours() >= 11 && hours.getHours() < 13) {
                        count_4[index] += 1
                    }
                    else if (hours.getHours() >= 13 && hours.getHours() < 16) {
                        count_5[index] += 1
                    }
                    else if (hours.getHours() >= 16 && hours.getHours() < 19) {
                        count_6[index] += 1
                    }
                    else if (hours.getHours() >= 19 && hours.getHours() < 23) {
                        count_7[index] += 1
                    }
                }
            }
            console.log([count_1, count_2, count_3, count_4, count_5, count_6, count_7])
            setDataDate_2([count_1, count_2, count_3, count_4, count_5, count_6, count_7])

            var initial_count_channel = []
            for (let index = 0; index < channel.length; index++) {
                initial_count_channel.push(0)
            }
            for (let index = 0; index < vehicle_List.length; index++) {
                var dateDay = new Date(vehicle_List[index].create_time)
                for (let j = 0; j < dateRepeat.length; j++) {
                    if (dateDay.getDate() == dateRepeat[j].getDate()) {
                        if (vehicle_List[index].channel.name == channel[0]?.name) {
                            initial_count_channel[0] += 1
                        }
                        if (vehicle_List[index].channel.name == channel[1]?.name) {
                            initial_count_channel[1] += 1
                        }
                        if (vehicle_List[index].channel.name == channel[2]?.name) {
                            initial_count_channel[2] += 1
                        }
                        if (vehicle_List[index].channel.name == channel[3]?.name) {
                            initial_count_channel[3] += 1
                        }
                        if (vehicle_List[index].channel.name == channel[4]?.name) {
                            initial_count_channel[4] += 1
                        }
                    }
                }
            }
            var temp_data = []
            for (let index = 0; index < initial_count_channel.length; index++) {
                temp_data.push({
                    value: initial_count_channel[index],
                    name: channel[index].name
                })
            }
            setData_2(temp_data)
            // console.log(dataDate)
        }
    }, [menu])

    useEffect(() => {
        if (vehicle_List.length != 0) {
            if (startDate != null && endDate != null) {
                const start = new Date(startDate)
                const end = new Date(endDate)
                var number_date_start
                var number_date_end
                var dateDiff
                var initial_count_channel = []
                for (let index = 0; index < channel.length; index++) {
                    initial_count_channel.push(0)
                }
                for (let index = 0; index < vehicle_List.length; index++) {
                    if (vehicle_List[index].channel.name == channel[0]?.name) {
                        initial_count_channel[0] += 1
                    }
                    if (vehicle_List[index].channel.name == channel[1]?.name) {
                        initial_count_channel[1] += 1
                    }
                    if (vehicle_List[index].channel.name == channel[2]?.name) {
                        initial_count_channel[2] += 1
                    }
                    if (vehicle_List[index].channel.name == channel[3]?.name) {
                        initial_count_channel[3] += 1
                    }
                    if (vehicle_List[index].channel.name == channel[4]?.name) {
                        initial_count_channel[4] += 1
                    }
                }
                var temp_data = []
                for (let index = 0; index < initial_count_channel.length; index++) {
                    temp_data.push({
                        value: initial_count_channel[index],
                        name: channel[index].name
                    })
                }
                setData(temp_data)
                // const dateDiff = end.getDate() - start.
                if (start.getMonth() == 1) {
                    number_date_start = start.getDate()
                }
                else if (start.getMonth() == 2) {
                    number_date_start = start.getDate() + 31
                }
                else if (start.getMonth() == 3) {
                    number_date_start = start.getDate() + 59
                }
                else if (start.getMonth() == 4) {
                    number_date_start = start.getDate() + 90
                }
                else if (start.getMonth() == 5) {
                    number_date_start = start.getDate() + 120
                }
                else if (start.getMonth() == 6) {
                    number_date_start = start.getDate() + 151
                }
                else if (start.getMonth() == 7) {
                    number_date_start = start.getDate() + 181
                }
                else if (start.getMonth() == 8) {
                    number_date_start = start.getDate() + 212
                }
                else if (start.getMonth() == 9) {
                    number_date_start = start.getDate() + 243
                }
                else if (start.getMonth() == 10) {
                    number_date_start = start.getDate() + 273
                }
                else if (start.getMonth() == 11) {
                    number_date_start = start.getDate() + 304
                }
                else if (start.getMonth() == 12) {
                    number_date_start = start.getDate() + 334
                }

                if (end.getMonth() == 1) {
                    number_date_end = end.getDate()
                }
                else if (end.getMonth() == 2) {
                    number_date_end = end.getDate() + 31
                }
                else if (end.getMonth() == 3) {
                    number_date_end = end.getDate() + 59
                }
                else if (end.getMonth() == 4) {
                    number_date_end = end.getDate() + 90
                }
                else if (end.getMonth() == 5) {
                    number_date_end = end.getDate() + 120
                }
                else if (end.getMonth() == 6) {
                    number_date_end = end.getDate() + 151
                }
                else if (end.getMonth() == 7) {
                    number_date_end = end.getDate() + 181
                }
                else if (end.getMonth() == 8) {
                    number_date_end = end.getDate() + 212
                }
                else if (end.getMonth() == 9) {
                    number_date_end = end.getDate() + 243
                }
                else if (end.getMonth() == 10) {
                    number_date_end = end.getDate() + 273
                }
                else if (end.getMonth() == 11) {
                    number_date_end = end.getDate() + 304
                }
                else if (end.getMonth() == 12) {
                    number_date_end = end.getDate() + 334
                }

                dateDiff = number_date_end - number_date_start
                console.log(dateDiff)
                var temp = []
                setDateNumber(dateDiff)
                for (let j = 0; j < dateDiff; j++) {
                    var temp_2 = []
                    for (let index = 0; index < vehicle_List.length; index++) {
                        var getDate = new Date(vehicle_List[index].create_time)
                        if (getDate.getDate() == start.getDate() + j) {
                            temp_2.push(vehicle_List[index])
                        }
                    }
                    temp.push(temp_2)
                    // console.log(temp)
                }
            }
            console.log(temp)
            var count_1 = []
            var count_2 = []
            var count_3 = []
            var count_4 = []
            var count_5 = []
            var count_6 = []
            var count_7 = []
            for (let index = 0; index < temp.length; index++) {
                count_1.push(0)
                count_2.push(0)
                count_3.push(0)
                count_4.push(0)
                count_5.push(0)
                count_6.push(0)
                count_7.push(0)
            }

            for (let index = 0; index < temp.length; index++) {
                for (let j = 0; j < temp[index].length; j++) {
                    var hours = new Date(temp[index][j].create_time)
                    if ((hours.getHours() >= 23 && hours.getHours() < 24) || (hours.getHours() >= 0 && hours.getHours() < 6)) {
                        count_1[index] += 1
                    }
                    else if (hours.getHours() >= 6 && hours.getHours() < 8) {
                        count_2[index] += 1
                    }
                    else if (hours.getHours() >= 8 && hours.getHours() < 11) {
                        count_3[index] += 1
                    }
                    else if (hours.getHours() >= 11 && hours.getHours() < 13) {
                        count_4[index] += 1
                    }
                    else if (hours.getHours() >= 13 && hours.getHours() < 16) {
                        count_5[index] += 1
                    }
                    else if (hours.getHours() >= 16 && hours.getHours() < 19) {
                        count_6[index] += 1
                    }
                    else if (hours.getHours() >= 19 && hours.getHours() < 23) {
                        count_7[index] += 1
                    }
                }

            }
            console.log(count_1, count_2, count_3, count_4, count_5, count_6, count_7)
            setTotalDate([count_1, count_2, count_3, count_4, count_5, count_6, count_7])

            // for (let ind = 0; ind < dateDiff; ind++) {
            //     if ((hours.getHours() >= 23 && hours.getHours() < 24) || (hours.getHours() >= 6 && hours.getHours() < 6)) {
            //         temp[0][ind] += 1
            //     }
            //     else if (hours.getHours() >= 6 && hours.getHours() < 8) {
            //         temp[1] += 1
            //     }
            //     else if (hours.getHours() >= 8 && hours.getHours() < 11) {
            //         temp[2] += 1
            //     }
            //     else if (hours.getHours() >= 11 && hours.getHours() < 13) {
            //         temp[3] += 1
            //     }
            //     else if (hours.getHours() >= 13 && hours.getHours() < 16) {
            //         temp[4] += 1
            //     }
            //     else if (hours.getHours() >= 16 && hours.getHours() < 19) {
            //         temp[5] += 1
            //     }
            //     else if (hours.getHours() >= 19 && hours.getHours() < 23) {
            //         temp[6] += 1
            //     }
            // }
            // setTotalDate([
            //     {
            //         name: '23:00 - 05:59',
            //         total_car: temp[0],
            //         // pv: 2400,
            //         // amt: 2400,
            //     },
            //     {
            //         name: '06:00 - 07:59',
            //         total_car: temp[1],
            //         // pv: 1398,
            //         // amt: 2210,
            //     },
            //     {
            //         name: '08:00 - 10:59',
            //         total_car: temp[2],
            //         // pv: 9800,
            //         // amt: 2290,
            //     },
            //     {
            //         name: '11:00 - 12:59',
            //         total_car: temp[3],
            //         // pv: 3908,
            //         // amt: 2000,
            //     },
            //     {
            //         name: '13:00 - 15:59',
            //         total_car: temp[4],
            //         // pv: 4800,
            //         // amt: 2181,
            //     },
            //     {
            //         name: '16:00 - 18:59',
            //         total_car: temp[5],
            //         // pv: 3800,
            //         // amt: 2500,
            //     },
            //     {
            //         name: '19:00 - 22:59',
            //         total_car: temp[6],
            //         // pv: 4300,
            //         // amt: 2100,
            //     }
            // ])
        }
    }, [vehicle_List])
    return (
        <Page className={classes.root} title="Statistic">
            <Container >
                <Grid container spacing={3} className={classes.gridBox}>
                    {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalCarThisDay />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalCar7Day />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalCarBlacklist />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <TotalCarWhitelist />
                    </Grid> */}

                    {/* <Grid item lg={8} md={8} xl={8} xs={12}>
                        <ChartView />
                        
                    </Grid> */}

                    <Grid className={classes.content}>
                        <Grid
                            className={classes.titleGrid}
                        >
                            <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ตั้งค่าโหมดการทำงาน
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.filterDate}
                        >
                            <Grid
                                // variant='h4'
                                className={classes.startDate}
                            >
                                <Typography
                                    className={classes.typolo}
                                >
                                    วันที่เริ่มค้นหา
                                </Typography>
                                {startDate != null && <TextField
                                    className={classes.textField_name}
                                    // label="วันที่เริ่มค้นหา"
                                    variant="outlined"
                                    name="startDate"
                                    type='Date'
                                    // defaultValue={new Date('13-04-2022')}
                                    onChange={(event) => {
                                        handleChangeDate(event, 1)
                                    }}
                                    value={startDate}
                                />}
                            </Grid>
                            <Grid
                                // variant='h4'
                                className={classes.endDate}
                            >
                                <Typography
                                    className={classes.typolo}
                                >
                                    วันที่สิ้นสุด
                                </Typography>
                                {endDate != null && <TextField
                                    className={classes.textField_name}
                                    // label="วันที่เริ่มค้นหา"
                                    variant="outlined"
                                    name="endDate"
                                    type='Date'
                                    onChange={(event) => {
                                        handleChangeDate(event, 2)
                                    }}
                                    // defaultValue={new Date('13-04-2022')}
                                    value={endDate}
                                />}
                            </Grid>
                            <Button
                                className={classes.buttonGrid}
                                onClick={() => {
                                    submitDate()
                                }}
                            >
                                <SearchRounded />
                                ค้นหา
                            </Button>
                        </Grid>
                        {/* <Grid
                            className={classes.buttonContent}
                        >
                            <Button
                                className={classes.buttonGrid}
                            >
                                เทสๆ
                            </Button>
                        </Grid> */}
                        {/* <ChartView /> */}
                    </Grid>

                    {totalDate != null && <Grid className={classes.bottomContent}>
                        <Grid
                            className={classes.titleGrid}
                        >
                            <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ปริมาณรถยนต์ในแต่ละช่องทางเดินรถ
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.chart_1Content}
                        >
                            <Grid
                                className={classes.chartData}
                            >
                                {/* <BarChart
                                    width={900}
                                    height={480}
                                    data={totalDate}
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
                                    <Legend /> */}
                                {/* <Bar type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                                {/* <Bar type="monotone" dataKey="total_car" fill="#82ca9d" />
                                </BarChart> */}
                                <VictoryChart domainPadding={{ x: 20 }} width={1000} height={500}>
                                    <VictoryBoxPlot
                                        boxWidth={15}
                                        data={[
                                            { x: "22:00 - 05:59", y: totalDate[0] },
                                            { x: "06:00 - 07:59", y: totalDate[1] },
                                            { x: "08:00 - 10:59", y: totalDate[2] },
                                            { x: "11:00 - 12:59", y: totalDate[3] },
                                            { x: "13:00 - 15:59", y: totalDate[4] },
                                            { x: "16:00 - 18:59", y: totalDate[5] },
                                            { x: "19:00 - 22:59", y: totalDate[6] }
                                            // { x: "22:00 - 05:59", y: [0, 0, 0, 0] },
                                            // { x: "06:00 - 07:59", y: [47, 68, 129, 115] },
                                            // { x: "08:00 - 10:59", y: [47, 68, 129, 115] },
                                            // { x: "11:00 - 12:59", y: [47, 68, 129, 115] },
                                            // { x: "13:00 - 15:59", y: [28, 0, 129, 0] },
                                            // { x: "16:00 - 18:59", y: [0, 68, 129, 0] },
                                            // { x: "19:00 - 22:59", y: [0, 61, 0, 0] }
                                        ]}
                                        // samples={100}
                                        style={{
                                            min: { stroke: "tomato" },
                                            max: { stroke: "orange" },
                                            q1: { fill: "tomato" },
                                            q3: { fill: "orange" },
                                            median: { stroke: "white", strokeWidth: 2 },
                                            minLabels: { fill: "tomato" },
                                            maxLabels: { fill: "orange" },

                                        }}
                                    />
                                    {/* <VictoryTooltip /> */}
                                </VictoryChart>
                            </Grid>
                            <Grid>
                                <Grid
                                    className={classes.pieChartContent}
                                >
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={true}
                                            outerRadius={80}
                                            // fill="#8884d8"
                                            dataKey="value"

                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_1}
                                >
                                    <Grid
                                        className={classes.detailColor_1}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[0].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_2}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[1].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_3}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[2].name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid
                            className={classes.buttonContent}
                        >
                            <Button
                                className={classes.buttonGrid}
                            >
                                เทสๆ
                            </Button>
                        </Grid> */}
                        {/* <ChartView /> */}
                    </Grid>}

                    {totalDate != null && <Grid className={classes.bottomContent}>
                        <Grid
                            className={classes.titleGrid}
                        >
                            <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ข้อมูลปริมาณการจราจรเฉลี่ยในแต่ละวัน
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.chart_1Content}
                        >
                            {/* <Grid>
                                
                            </Grid> */}
                            <Grid
                                className={classes.chartData}
                            >
                                {/* <BarChart
                                    width={900}
                                    height={480}
                                    data={totalDate}
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
                                    <Legend /> */}
                                {/* <Bar type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                                {/* <Bar type="monotone" dataKey="total_car" fill="#82ca9d" />
                                </BarChart> */}
                                <TextField
                                    select
                                    className={classes.textField}
                                    label="วันที่เลือก"
                                    variant="outlined"
                                    value={menu}
                                    onChange={(event) => handleChangeMenu(event)}
                                >
                                    {dayList.map((option) => (
                                        <MenuItem key={option.value} value={option.value} className={classes.menuList}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {dataDate_2 != null && <VictoryChart domainPadding={{ x: 20 }} width={1000} height={500}>
                                    <VictoryBoxPlot
                                        boxWidth={15}
                                        data={[
                                            { x: "22:00 - 05:59", y: dataDate_2[0] },
                                            { x: "06:00 - 07:59", y: dataDate_2[1] },
                                            { x: "08:00 - 10:59", y: dataDate_2[2] },
                                            { x: "11:00 - 12:59", y: dataDate_2[3] },
                                            { x: "13:00 - 15:59", y: dataDate_2[4] },
                                            { x: "16:00 - 18:59", y: dataDate_2[5] },
                                            { x: "19:00 - 22:59", y: dataDate_2[6] }
                                            // { x: "22:00 - 05:59", y: [0, 0, 0, 0] },
                                            // { x: "06:00 - 07:59", y: [47, 68, 129, 115] },
                                            // { x: "08:00 - 10:59", y: [47, 68, 129, 115] },
                                            // { x: "11:00 - 12:59", y: [47, 68, 129, 115] },
                                            // { x: "13:00 - 15:59", y: [28, 0, 129, 0] },
                                            // { x: "16:00 - 18:59", y: [0, 68, 129, 0] },
                                            // { x: "19:00 - 22:59", y: [0, 61, 0, 0] }
                                        ]}
                                        // samples={100}
                                        style={{
                                            min: { stroke: "tomato" },
                                            max: { stroke: "orange" },
                                            q1: { fill: "tomato" },
                                            q3: { fill: "orange" },
                                            median: { stroke: "white", strokeWidth: 2 },
                                            minLabels: { fill: "tomato" },
                                            maxLabels: { fill: "orange" },

                                        }}
                                    />
                                    {/* <VictoryTooltip /> */}
                                </VictoryChart>}
                            </Grid>
                            <Grid>
                                <Grid
                                    className={classes.pieChartContent}
                                >
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={data_2}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={true}
                                            outerRadius={80}
                                            // fill="#8884d8"
                                            dataKey="value"

                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_1}
                                >
                                    <Grid
                                        className={classes.detailColor_1}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[0].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_2}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[1].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_3}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[2].name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid
                            className={classes.buttonContent}
                        >
                            <Button
                                className={classes.buttonGrid}
                            >
                                เทสๆ
                            </Button>
                        </Grid> */}
                        {/* <ChartView /> */}
                    </Grid>}

                    {totalDate != null && <Grid className={classes.bottomContent}>
                        <Grid
                            className={classes.titleGrid}
                        >
                            <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ข้อมูลปริมาณการจราจรเฉลี่ยในแต่ละวัน
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.chart_1Content}
                        >
                            {/* <Grid>
                                
                            </Grid> */}
                            <Grid
                                className={classes.chartData}
                            >
                                {/* <BarChart
                                    width={900}
                                    height={480}
                                    data={totalDate}
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
                                    <Legend /> */}
                                {/* <Bar type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                                {/* <Bar type="monotone" dataKey="total_car" fill="#82ca9d" />
                                </BarChart> */}
                                <TextField
                                    select
                                    className={classes.textField}
                                    label="วันที่เลือก"
                                    variant="outlined"
                                    value={selectMenu}
                                    onChange={(event) => handleChangeSelect(event)}
                                >
                                    {channelSelect.map((option) => (
                                        <MenuItem key={option.value} value={option.value} className={classes.menuList}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {dataDate_3 != null && <VictoryChart domainPadding={{ x: 20 }} width={1000} height={500}>
                                    <VictoryBoxPlot
                                        boxWidth={15}
                                        data={[
                                            { x: "22:00 - 05:59", y: dataDate_3[0] },
                                            { x: "06:00 - 07:59", y: dataDate_3[1] },
                                            { x: "08:00 - 10:59", y: dataDate_3[2] },
                                            { x: "11:00 - 12:59", y: dataDate_3[3] },
                                            { x: "13:00 - 15:59", y: dataDate_3[4] },
                                            { x: "16:00 - 18:59", y: dataDate_3[5] },
                                            { x: "19:00 - 22:59", y: dataDate_3[6] }
                                            // { x: "22:00 - 05:59", y: [0, 0, 0, 0] },
                                            // { x: "06:00 - 07:59", y: [47, 68, 129, 115] },
                                            // { x: "08:00 - 10:59", y: [47, 68, 129, 115] },
                                            // { x: "11:00 - 12:59", y: [47, 68, 129, 115] },
                                            // { x: "13:00 - 15:59", y: [28, 0, 129, 0] },
                                            // { x: "16:00 - 18:59", y: [0, 68, 129, 0] },
                                            // { x: "19:00 - 22:59", y: [0, 61, 0, 0] }
                                        ]}
                                        // samples={100}
                                        style={{
                                            min: { stroke: "tomato" },
                                            max: { stroke: "orange" },
                                            q1: { fill: "tomato" },
                                            q3: { fill: "orange" },
                                            median: { stroke: "white", strokeWidth: 2 },
                                            minLabels: { fill: "tomato" },
                                            maxLabels: { fill: "orange" },

                                        }}
                                    />
                                    {/* <VictoryTooltip /> */}
                                </VictoryChart>}
                            </Grid>
                            <Grid>
                                {data_3 != null && <Grid
                                    className={classes.pieChartContent}
                                >
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={data_3}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={true}
                                            outerRadius={80}
                                            // fill="#8884d8"
                                            dataKey="value"

                                        >
                                            {data_3.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS_DAY[index % COLORS_DAY.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Grid>}
                                <Grid
                                    className={classes.detailChannel_1}
                                >
                                    <Grid
                                        className={classes.detailColor_1}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[0].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_2}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[1].name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.detailChannel_2}
                                >
                                    <Grid
                                        className={classes.detailColor_3}
                                    >

                                    </Grid>
                                    <Typography
                                        className={classes.typoloColor}
                                    >
                                        {channel[2].name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid
                            className={classes.buttonContent}
                        >
                            <Button
                                className={classes.buttonGrid}
                            >
                                เทสๆ
                            </Button>
                        </Grid> */}
                        {/* <ChartView /> */}
                    </Grid>}
                    {/* <Grid item lg={4} md={6} xl={4} xs={12}> */}

                    {/* <MainVideo /> */}
                    {/* </Grid> */}



                    <Grid item lg={4} md={4} xl={4} xs={12}>
                        {/* <MainVideo /> */}
                        {/* <MapView></MapView> */}
                        {/* <DashboardTable /> */}
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
};

export default Statistic;
