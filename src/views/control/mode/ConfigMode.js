import React, { useEffect, useState } from 'react';
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Select,
    styled,
    withStyles,
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableHead,
    TableBody
} from '@material-ui/core';
import Page from '../../../components/Page';
// import VIsView from './VideoHistoryPage';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
//import LocationSearchInput from './LocationSearch';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { Assignment, Close, ExpandLess, ExpandMore, KeyboardArrowLeft, KeyboardArrowRight, RemoveFromQueueTwoTone, RotateRight, SaveAltOutlined } from '@material-ui/icons';
// import ReportTable from './ReportTable';
import { channelService } from '../../../services/channel.service';
import { Slide } from 'react-slideshow-image';
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-slick';
import ImageSlide from '../ImageSlide';
import theme from '../../../theme';
import { controlService } from '../../../services/control.service';
import { planService } from '../../../services/plan.service';
import { junctionService } from '../../../services/junction.service';
import { fixtimeService } from '../../../services/fixtime.service';
import { apiConstants } from '../../../_constants';
import socketIOClient from 'socket.io-client';

// import {recordservice} from "../../services"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        width: '100%',
        // display: 'flex'
        // paddingBottom: theme.spacing(3),
        // paddingTop: theme.spacing(3)
    },
    top: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    topLeft: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        // display: 'flex'
    },
    bottomLeft: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        // marginLeft: '10%'
        // display: 'flex'
    },
    bottomLeft_2: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        marginLeft: '10%'
        // display: 'flex'
    },
    bottomLeft_3: {
        marginTop: theme.spacing(8),
        width: '80%',
        backgroundColor: '#FFFFFF',
        marginLeft: '10%'
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
    textFieldLeft: {
        paddingTop: theme.spacing(3),
        width: '100%',
        // display: 'flex'
    },
    textFieldLeft_top: {
        // paddingTop: theme.spacing(3),
        width: '100%',
        display: 'flex'
    },
    textFieldLeft_bot: {
        // paddingTop: theme.spacing(3),
        width: '100%',
        display: 'flex'
    },
    textField_name: {
        marginLeft: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        width: '55%',
    },
    textField_plan: {
        // marginLeft: theme.spacing(5),
        // paddingBottom: theme.spacing(5),
        width: '35%',
    },
    textField_delay: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: '25%',
    },
    selectPattern_name: {
        marginLeft: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        width: '45%',
    },
    buttonPattern: {
        marginLeft: theme.spacing(8),
        marginTop: theme.spacing(4),
        // paddingBottom: theme.spacing(5),
        width: '100%',
        height: '52px',
        fontFamily: 'Roboto'
    },
    selectField: {
        marginLeft: theme.spacing(8),
        marginBottom: theme.spacing(5),
        width: '16%',
        backgroundColor: '#FFFFFF'
    },
    menuList: {
        backgroundColor: '#FFFFFF'
    },
    textField_location: {
        marginLeft: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        width: '45%',
    },
    topRight: {
        width: '45%',
        backgroundColor: '#FFFFFF',
        marginLeft: theme.spacing(12)
        // display: 'flex'
    },
    textRight: {
        paddingTop: theme.spacing(5),
        width: '100%',
        // display: 'flex'
    },
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
        fontSize: '18px'
    },
    top_icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: '#000000'
        // marginRight: '10%'
    },
    bottom_icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        // backgroundColor: '#000000'
        // marginRight: '10%'
    },
    bottom: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(10),
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    bottom_content2: {
        height: '100%',
        width: '100%',
        // display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(10),
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    textFieldLeft_content2: {
        paddingTop: theme.spacing(3),
        width: '100%',
        display: 'flex'
    },
    content2: {
        width: '100%',
        display: 'flex',
        marginTop: theme.spacing(5),
    },
    content2_img: {
        width: '100%',
        display: 'flex',
        marginLeft: '25%',
        marginTop: theme.spacing(5),
        backgroundColor: '#000000',
        justifyContent: 'center'
    },
    content2_title: {
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        paddingLeft: theme.spacing(2)
    },
    content2_select: {
        width: '75%',
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        marginLeft: '10%'
        // paddingLeft: theme.spacing(2)
    },
    textField_Junction: {
        width: '30%'
    },
    dialogTitle: {
        marginTop: theme.spacing(5),
        color: '#287298',
        display: 'flex',
        justifyContent: 'center'
    },
    dialogDividerGrid: {
        marginTop: theme.spacing(1),
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    dialogDivider: {
        backgroundColor: '#287298',
        width: '168px',
        height: '2px'
    },
    bottomImge: {
        marginTop: theme.spacing(5),
        // width: '320px',
        // height: '320px',
        display: 'flex',
        justifyContent: 'center'
    },
    pattern: {
        display: 'flex-end',
        // position: 'relative'
    },
    select_pattern: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        // position: 'relative',
        // minWidth: '100%'
    },
    text_1: {
        position: 'absolute'
    },
    clickPattern: {
        display: 'flex',
        justifyContent: 'center'
    },
    selectBorder: {
        // border: '5px',
        borderColor: '#F00000',
        borderStyle: 'solid'
    },
    overview: {
        display: 'flex',
        justifyContent: 'center'
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
    }
}));
const menuList = [
    {
        value: 1,
        label: 'Fixed time mode',
    },
    {
        value: 2,
        label: 'Area offset mode',
    }
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        minWidth: '985px'
    },
    '& .MuiDialog-paper': {
        minWidth: '985px',
        minHeight: '550px'
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


const ConfigMode = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [patternOpen, setPatternOpen] = useState(false);
    const [orders, setOrders] = React.useState({});
    const [channelList, setChannelList] = useState([]);
    const [degree, setDegree] = useState(0);
    const [toggleContent, setToggleContent] = useState([]);
    const [table, setTable] = useState(<></>)
    const number_channel = props.number_channel
    const [check, setCheck] = useState("")
    const [content, setContent] = useState(<></>)
    const [editAble, setEditAble] = useState([]);
    const [current, setCurrent] = useState("")
    const [junctionData, setJunctionData] = useState(null);
    const [menu, setMenu] = useState(null)
    const [planList, setPlanList] = useState([])
    const [dataFixtime, setDataFixtime] = useState(null)
    const [fixtimeList_id, setFixtimeList_id] = useState(null)
    const [imgRotate, setImgRotate] = useState(<img src={`/static/junction/${number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
    const [addRowContent, setAddRowContent] = useState(null)
    const [addRowStatus, setAddRowStatus] = useState(null)
    const [startIndex, setStartIndex] = useState(null)
    const { junction_id } = useParams();
    const [search, setSearch] = React.useState({

        search: "",
        options: "mobileUsername",
        page: 10,
        pageSize: 10,
        timeRangeBegin: "",
        timeRangeEnd: ""
    })
    const slideImages = [
        {
            url: '/static/Mock-up_3way1.png',
            caption: 'Slide 1'
        },
        {
            url: '/static/Mock-up_3way2.png',
            caption: 'Slide 2'
        },
        {
            url: '/static/Mock-up_3way3.png',
            caption: 'Slide 3'
        },
    ];
    const [pattern, setPattern] = useState(0)
    const handleChangeManu = (event) => {
        setMenu(event.target.value);
        console.log(index)
    };
    const handleChangeData = (event, ind, type) => {
        var temp = editAble
        // console.log(event.target.value)
        for (let index = 0; index < temp.length; index++) {
            if (ind == index) {
                if (type == 0) {
                    console.log(event)
                    temp[ind].start = event
                }
                else if (type == 1) {
                    temp[ind].end = event.target.value
                    console.log(event.target.value)
                    console.log(ind)
                    if (ind != editAble.length - 1) {
                        setStartIndex({
                            data: temp[ind].end,
                            index: ind + 1
                        })
                    }
                    // temp_str = temp[ind].start
                }
                else if (type == 2) {
                    planService.getPlanByID(event.target.value).then((data) => {
                        let plan = data.data
                        temp[ind].plan = plan
                    })
                }
            }
        }

        setEditAble(temp)
    };
    useEffect(() => {
        if (startIndex != null) {
            var temp = editAble
            if (startIndex.data.slice(3, 5) >= 59) {
                if (parseInt(startIndex.data.slice(0, 2)) + 1 <= 9) {
                    temp[startIndex.index].start = `0${parseInt(startIndex.data.slice(0, 2)) + 1}:00`
                }
                if (parseInt(startIndex.data.slice(0, 2)) + 1 > 9) {
                    temp[startIndex.index].start = `${parseInt(startIndex.data.slice(0, 2)) + 1}:00`
                }
            }
            else {
                if (startIndex.data.slice(3, 5) >= 9 && startIndex.data.slice(0, 2) >= 9) {
                    temp[startIndex.index].start = `${startIndex.data.slice(0, 2)}:${parseInt(startIndex.data.slice(3, 5)) + 1}`
                }
                if (startIndex.data.slice(3, 5) >= 9 && startIndex.data.slice(0, 2) < 9) {
                    temp[startIndex.index].start = `${startIndex.data.slice(0, 2)}:${parseInt(startIndex.data.slice(3, 5)) + 1}`
                }
                if (startIndex.data.slice(3, 5) < 9 && startIndex.data.slice(0, 2) >= 9) {
                    temp[startIndex.index].start = `${startIndex.data.slice(0, 2)}:0${parseInt(startIndex.data.slice(3, 5)) + 1}`
                }
                if (startIndex.data.slice(3, 5) < 9 && startIndex.data.slice(0, 2) < 9) {
                    temp[startIndex.index].start = `${startIndex.data.slice(0, 2)}:0${parseInt(startIndex.data.slice(3, 5)) + 1}`
                }
            }
            console.log(startIndex)
            setEditAble(temp)
        }
    }, [startIndex])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenPattern = (phase, index) => {
        setPatternOpen(true);
        setCheck(phase)
        setCurrent(index)
    };
    async function handleSubmit() {
        console.log(editAble)
        if (editAble[editAble.length - 1].end.slice(0, 2) == 23 && editAble[editAble.length - 1].end.slice(3, 5) == 59 && editAble.length != 0) {
            if (editAble.length == fixtimeList_id.length) {
                console.log("เท่ากัน")
                for (let index = 0; index < editAble.length; index++) {
                    console.log(parseInt(editAble[index].start), parseInt(editAble[index].end))
                    const date = new Date()
                    // const endDate = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    // console.log("start : ", new Date(start).toString(), " end", new Date(end).toString())
                    await controlService.updateFixtime({
                        'start': new Date(start),
                        'end': new Date(end),
                        'junction_id': junctionData.id,
                        'plan_id': editAble[index].plan.id
                    }, fixtimeList_id[index])
                    // console.log(new Date(starDate).toLocaleTimeStringString())
                    // console.log(new Date(endDate).toLocaleTimeString())
                    // console.log()
                }
            }
            else if (editAble.length - fixtimeList_id.length > 0) {
                for (let index = 0; index < fixtimeList_id.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.updateFixtime({
                        start: new Date(start),
                        end: new Date(end),
                        junction_id: junctionData.id,
                        plan_id: editAble[index].plan.id
                    }, fixtimeList_id[index])
                    // console.log(new Date(start))
                    // console.log(new Date(end))
                    // console.log()
                }
                for (let index = fixtimeList_id.length; index < editAble.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.createFixtime({
                        start: new Date(start),
                        end: new Date(end),
                        junction_id: junctionData.id,
                        plan_id: editAble[index].plan.id
                    })
                }
            }
            else if (fixtimeList_id.length - editAble.length > 0) {
                console.log(fixtimeList_id)
                for (let index = 0; index < editAble.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.updateFixtime({
                        'start': new Date(start),
                        'end': new Date(end),
                        'junction_id': junctionData.id,
                        'plan_id': editAble[index].plan.id
                    }, fixtimeList_id[index])
                }
                for (let index = editAble.length; index < fixtimeList_id.length; index++) {
                    await controlService.deleteFixtime(fixtimeList_id[index])
                    // console.log(fixtimeList_id[index])
                }
            }
        }
        else if (editAble.length != 0) {
            var temp = editAble
            temp[editAble.length - 1].end = "23:59"
            setEditAble(temp)
            if (editAble.length == fixtimeList_id.length) {
                console.log("เท่ากัน")
                for (let index = 0; index < editAble.length; index++) {
                    console.log(parseInt(editAble[index].start), parseInt(editAble[index].end))
                    const date = new Date()
                    // const endDate = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    // console.log("start : ", new Date(start).toString(), " end", new Date(end).toString())
                    await controlService.updateFixtime({
                        'start': new Date(start),
                        'end': new Date(end),
                        'junction_id': junctionData.id,
                        'plan_id': editAble[index].plan.id
                    }, fixtimeList_id[index])
                    // console.log(new Date(starDate).toLocaleTimeStringString())
                    // console.log(new Date(endDate).toLocaleTimeString())
                    // console.log()
                }
            }
            else if (editAble.length - fixtimeList_id.length > 0) {
                for (let index = 0; index < fixtimeList_id.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.updateFixtime({
                        start: new Date(start),
                        end: new Date(end),
                        junction_id: junctionData.id,
                        plan_id: editAble[index].plan.id
                    }, fixtimeList_id[index])
                    // console.log(new Date(start))
                    // console.log(new Date(end))
                    // console.log()
                }
                for (let index = fixtimeList_id.length; index < editAble.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.createFixtime({
                        start: new Date(start),
                        end: new Date(end),
                        junction_id: junctionData.id,
                        plan_id: editAble[index].plan.id
                    })
                }
            }
            else if (fixtimeList_id.length - editAble.length > 0) {
                console.log(fixtimeList_id)
                for (let index = 0; index < editAble.length; index++) {
                    const date = new Date()
                    const start = date.setHours(parseInt(editAble[index].start.slice(0, 2)), parseInt(editAble[index].start.slice(3, 5)))
                    const end = date.setHours(parseInt(editAble[index].end.slice(0, 2)), parseInt(editAble[index].end.slice(3, 5)))
                    await controlService.updateFixtime({
                        'start': new Date(start),
                        'end': new Date(end),
                        'junction_id': junctionData.id,
                        'plan_id': editAble[index].plan.id
                    }, fixtimeList_id[index])
                }
                for (let index = editAble.length; index < fixtimeList_id.length; index++) {
                    await controlService.deleteFixtime(fixtimeList_id[index])
                    // console.log(fixtimeList_id[index])
                }
            }
        }
        const socket = socketIOClient(apiConstants.socketUri, { path: '/socket' });
        var dataSocket = {
            junction_id: junction_id,
            type: "FIXTIME",
        }
        socket.on('connect', (socketIO) => {
            console.log(socketIO)
            socket.emit("update:setting", dataSocket)
        })
        setData(editAble)
    }
    const addRow = () => {
        if (editAble.length == 0) {
            var temp = {

                // number: data.length + 1,
                start: `00:00`,
                end: `23:59`,
                plan: ""
            }
            setEditAble([temp])
            setContent(null)
        }
        else if (editAble[editAble.length - 1].end.slice(0, 2) == 23 && editAble[editAble.length - 1].end.slice(3, 5) == 59) {
            console.log("test")
        }
        else {
            var minute_str = parseInt(editAble[editAble.length - 1].end.slice(editAble[editAble.length - 1].end.length - 2, editAble[editAble.length - 1].end.length))
            var hour_Str = parseInt(editAble[editAble.length - 1].end.slice(0, 2))
            var str_temp = ''
            var end_temp = '23:59'

            if (hour_Str >= 9) {
                if (minute_str == 59) {
                    str_temp = `${hour_Str + 1}:00`
                }
                else if (minute_str >= 9) {
                    if (hour_Str == 9) {
                        str_temp = `0${hour_Str}:${minute_str + 1}`
                    }
                    else {
                        str_temp = `${hour_Str}:${minute_str + 1}`
                    }
                }
                else if (minute_str < 9) {
                    str_temp = `0${hour_Str}:0${minute_str + 1}`
                }
            }
            if (hour_Str < 9) {
                if (minute_str == 59) {
                    str_temp = `0${hour_Str + 1}:00`
                }
                else if (minute_str >= 9) {
                    str_temp = `0${hour_Str}:${minute_str + 1}`
                }
                else if (minute_str < 9) {
                    str_temp = `0${hour_Str}:0${minute_str + 1}`
                }
            }
            var temp = {

                // number: data.length + 1,
                start: `${str_temp}`,
                end: `${end_temp}`,
                plan: ""
            }
            setEditAble([...editAble, temp])
            setContent(null)
        }
    }

    // console.log(str)
    // if (start.getMinutes() < 10) {
    //     startM = `0${start.getMinutes()}`
    // }
    // else if (start.getMinutes() >= 10) {
    //     startM = start.getMinutes()
    // }
    // if (end.getMinutes() < 10) {
    //     endM = `0${end.getMinutes()}`
    // }
    // else if (end.getMinutes() >= 10) {
    //     endM = end.getMinutes()
    // }

    // console.log(str)


    const removeRow = (index) => {
        const temp = [...editAble]
        temp.splice(index, 1)
        setEditAble(temp)
        setContent(null)
    }
    const changePattern = (index, phase) => {
        var temp = [...data]
        temp[index].phase = phase
        setData(temp)
        setCheck(phase)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClosePattern = () => {
        setPatternOpen(false);
        setCheck("")
    };

    const [fixtimeList, setFixtimeList] = useState(null)
    const [data, setData] = useState([])

    const formik = useFormik({
        initialValues: editAble,
        validationSchema: Yup.object({
            // areaID: Yup.string()
        }),
        onSubmit: async (values) => {
            console.log(values)
        },
    });
    useEffect(() => {
        // controlService.getAllFixtime().then((data) => {

        // })
        // planService.getAllPlan().then((data) => {

        // })
        console.log(location.pathname.slice(14, location.pathname.length - 12))
        junctionService.getJunctionByID(location.pathname.slice(14, location.pathname.length - 12)).then((data) => {
            console.log(data)
            setJunctionData(data)
            setChannelList(data.channel)
            setPlanList(data.plan)
            // var temp = []
            // for (let index = 0; index < data?.fixtime_plan?.length; index++) {
            //     temp.push({
            //         start: `${data.fixtimeList[index].start}`,
            //         end: `${data.fixtimeList[index].end}`,
            //         plan: ""
            //     })

            // }
            // setMenu(1)
        })
        fixtimeService.getAllFixtime().then((data) => {
            // console.log(data)
            setFixtimeList(data)
        })

    }, [location.pathname])

    useEffect(() => {
        if (menu != null) {
            if (menu == 1 || menu == 0) {
                setContent(<Grid
                    className={classes.bottom}
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
                            {/* {table} */}
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
                                        {data.map((row, index) => (
                                            <StyledTableRow key={row.number}>
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
                        <Grid
                            className={classes.top_icon}
                        >
                            <Button
                                className={classes.buttonGrid}
                                onClick={() => { setMenu(menu + 2) }}
                                type='submit'
                            >
                                แก้ไขข้อมูล
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>)
            }
            else if (menu == 2) {
                setContent(<Grid
                    className={classes.bottom_content2}
                >
                    <Grid
                        className={classes.bottomLeft_2}
                    >
                        <Grid
                            className={classes.titleGrid}
                        >
                            {junctionData != null && <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ตั้งค่าการเชื่อมต่อ ณ {junctionData.name}
                            </Typography>}
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.textFieldLeft}
                        >
                            <Grid
                                className={classes.content2}
                            >
                                <Grid
                                    className={classes.content2_title}
                                >
                                    <Typography
                                        variant='h5'
                                    >
                                        ช่องทางเดินรถ
                                    </Typography>
                                </Grid>
                                <Grid
                                    className={classes.content2_select}
                                >
                                    {channelList.length != 0 && <TextField
                                        // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                        // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                        className={classes.textField_Junction}
                                        variant="outlined"
                                        name="junctionName"
                                        // onBlur={formik.handleBlur}
                                        // onChange={(event) => { handleChangeManu(event) }}
                                        // value={formik.values.junctionName}
                                        select
                                        margin="normal"
                                    >
                                        {channelList.map((option, index) => (
                                            <MenuItem key={option.id} value={option.id} className={classes.menuList}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                                </Grid>

                            </Grid>
                            {/* <img src='/static/Mock-up_3way1.png' /> */}
                            <Grid
                                classes={classes.content2_img}
                            >
                                <img src='/static/Mock-up_3way1.png' />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomLeft_3}
                    >
                        <Grid
                            className={classes.titleGrid}
                        >
                            {junctionData != null && <Typography
                                variant='h4'
                                className={classes.titleLeft}
                            >
                                ตั้งค่าการเชื่อมต่อกับจุดควบคุมการจราจรใกล้เคียง
                            </Typography>}
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.top}
                        >
                            <Grid
                                className={classes.topLeft}
                            >

                                <Grid
                                    className={classes.textFieldLeft}
                                >
                                    <Grid
                                        className={classes.textFieldLeft_top}
                                    >
                                        <TextField
                                            className={classes.textField_name}
                                            id="outlined-select-menu"
                                            select
                                            name="channelName"
                                            label="จุดควบคุมการจราจร"
                                            variant="outlined"
                                            margin="normal"
                                        >

                                        </TextField>
                                    </Grid>
                                    <Grid
                                        className={classes.textFieldLeft_top}
                                    >
                                        <TextField
                                            className={classes.selectField}
                                            id="outlined-select-menu"
                                            select
                                            name="channelName"
                                            label="ช่องทางเดินรถ"
                                            variant="outlined"
                                            margin="normal"
                                        >

                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.top_icon}
                        >
                            <Button
                                className={classes.buttonGrid}

                                startIcon={<SaveAltOutlined />}
                                // onClick={() => formik.handleSubmit}
                                type='submit'
                            >
                                บันทึก
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>)
            }
            else if (menu > 0 && menu % 2 == 1) {
                console.log(data)
                setEditAble(data)
                setContent(
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            className={classes.bottom}
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
                                    {/* {table} */}
                                    <TableContainer className={classes.tableCon}>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center" width="25%">เวลาเริ่มต้น</StyledTableCell>
                                                    <StyledTableCell align="center" width="25%">เวลาสิ้นสุด</StyledTableCell>
                                                    <StyledTableCell align="center" width="40%">รูปแบบการจัดการสัญญาณไฟ</StyledTableCell>
                                                    <StyledTableCell align="center" width="10%">ลบ</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {editAble.map((row, index) => (
                                                    <StyledTableRow key={row.number}>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                // className={classes.textField_name}
                                                                variant="outlined"
                                                                name="start"
                                                                // onBlur={formik.handleBlur}
                                                                onChange={(event) => { handleChangeData(event, index, 0) }}
                                                                // value={formik.values.junctionName}
                                                                // select
                                                                disabled
                                                                type="time"
                                                                margin="normal"
                                                                defaultValue={row.start}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                // className={classes.textField_name}
                                                                variant="outlined"
                                                                name="end"
                                                                // onBlur={formik.handleBlur}
                                                                onChange={(event) => { handleChangeData(event, index, 1) }}
                                                                // value={formik.values.junctionName}
                                                                // select
                                                                type="time"
                                                                margin="normal"
                                                                defaultValue={row.end}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <TextField
                                                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                                                className={classes.textField_plan}
                                                                label="เลือก Plan"
                                                                variant="outlined"
                                                                name="planID"
                                                                // onBlur={formik.handleBlur}
                                                                onChange={(event) => { handleChangeData(event, index, 2) }}
                                                                defaultValue={row?.plan?.id}
                                                                select
                                                                margin="normal"
                                                                fullWidth
                                                            >
                                                                {planList.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id} className={classes.menuList}>
                                                                        {option.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <IconButton
                                                                onClick={() => {
                                                                    removeRow(index)
                                                                    //  goToPrevPicture()
                                                                }}
                                                            >
                                                                <Close />
                                                            </IconButton>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                < Grid
                                    className={classes.top_icon}
                                >
                                    <Button
                                        // className={classes.buttonGrid}
                                        style={{ border: '2px solid #287298', marginTop: theme.spacing(3) }}
                                        onClick={addRow}
                                    // type='submit'
                                    >
                                        เพิ่มรูปแบบ
                                    </Button>
                                </Grid>
                                <Grid
                                    className={classes.bottom_icon}
                                >
                                    <Button
                                        className={classes.buttonGrid}
                                        onClick={() => {
                                            setMenu(1)
                                            setData(editAble)
                                            // formik.setValues(editAble)
                                            handleSubmit()
                                        }}
                                        type='submit'
                                    >
                                        บันทึกข้อมูล
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form >
                )
            }
        }
    }, [menu])

    useEffect(() => {
        if (fixtimeList != null) {
            console.log(fixtimeList)
            var temp_fixtime = []
            for (let index = 0; index < fixtimeList.length; index++) {
                if (fixtimeList[index]?.junction?.id == location.pathname.slice(14, location.pathname.length - 12)) {
                    // console.log('test' + index)
                    temp_fixtime.push(fixtimeList[index])
                }
            }
            setDataFixtime(temp_fixtime)

            // setMenu(1)
        }
    }, [fixtimeList])

    useEffect(() => {
        if (dataFixtime != null) {
            var index_list = []
            var temp = []
            for (let index = 0; index < dataFixtime.length; index++) {
                const start = new Date(`${dataFixtime[index].start}`)
                const end = new Date(`${dataFixtime[index].end}`)
                var startH = ""
                var endH = ""
                var startM = ""
                var endM = ""
                index_list.push(dataFixtime[index].id)
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
                temp.push({
                    start: startH + ":" + startM,
                    end: endH + ":" + endM,
                    plan: dataFixtime[index].plan
                })
            }
            console.log(temp)
            setData(temp)
            setEditAble(temp)
            setFixtimeList_id(index_list)
            setMenu(1)
        }
    }, [dataFixtime])
    useEffect(() => {
        if (editAble.length != 0) {
            if (editAble[editAble.length - 1].end.slice(0, 2) == 23 && editAble[editAble.length - 1].end.slice(3, 5) == 59) {
                setAddRowStatus(0)
            }
            else {
                setAddRowStatus(1)
            }
        }
    }, [editAble])
    useEffect(() => {
        if (content == null) {
            setContent(
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        className={classes.bottom}
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
                                {/* {table} */}
                                <TableContainer className={classes.tableCon}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center" width="25%">เวลาเริ่มต้น</StyledTableCell>
                                                <StyledTableCell align="center" width="25%">เวลาสิ้นสุด</StyledTableCell>
                                                <StyledTableCell align="center" width="40%">รูปแบบการจัดการสัญญาณไฟ</StyledTableCell>
                                                <StyledTableCell align="center" width="10%">ลบ</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {editAble.map((row, index) => (
                                                <StyledTableRow key={row.number}>
                                                    <StyledTableCell align="center">
                                                        <TextField
                                                            // className={classes.textField_name}
                                                            variant="outlined"
                                                            name="start"
                                                            // onBlur={formik.handleBlur}
                                                            onChange={(event) => { handleChangeData(event, index, 0) }}
                                                            // value={formik.values.junctionName}
                                                            // select
                                                            type="time"
                                                            margin="normal"
                                                            disabled
                                                            defaultValue={row.start}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <TextField
                                                            // className={classes.textField_name}
                                                            variant="outlined"
                                                            name="end"
                                                            // onBlur={formik.handleBlur}
                                                            onChange={(event) => { handleChangeData(event, index, 1) }}
                                                            // value={formik.values.junctionName}
                                                            // select
                                                            type="time"
                                                            margin="normal"
                                                            defaultValue={row.end}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <TextField
                                                            // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                                            // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                                            className={classes.textField_plan}
                                                            label="เลือก Plan"
                                                            variant="outlined"
                                                            name="planID"
                                                            // onBlur={formik.handleBlur}
                                                            onChange={(event) => { handleChangeData(event, index, 2) }}
                                                            defaultValue={row.plan?.id}
                                                            select
                                                            margin="normal"
                                                            fullWidth
                                                        >
                                                            {planList.map((option) => (
                                                                <MenuItem key={option.id} value={option.id} className={classes.menuList}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            onClick={() => {
                                                                removeRow(index)
                                                            }}
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid
                                className={classes.top_icon}
                            >
                                <Button
                                    // className={classes.buttonGrid}
                                    onClick={addRow}
                                // type='submit'
                                >
                                    เพิ่มรูปแบบ
                                </Button>
                            </Grid>
                            {addRowContent != null && addRowContent}
                            <Grid
                                className={classes.bottom_icon}
                            >
                                <Button
                                    className={classes.buttonGrid}
                                    onClick={() => {
                                        setMenu(1)
                                        setData(editAble)
                                        // formik.setValues(editAble)
                                        handleSubmit()
                                    }}
                                // type='submit'
                                >
                                    บันทึกข้อมูล
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            )
        }
    }, [content])
    const [index, setActiveStep] = React.useState(0);
    const images_pattern1 = [
        { url: "/static/Mock-up_3way1.png" },
        { url: "/static/Mock-up_3way2.png" },
        { url: "/static/Mock-up_3way3.png" },
    ];
    const images_pattern2 = [
        { url: "/static/Mock-up_3way1.png" },
        { url: "/static/Mock-up_3way3.png" },
        { url: "/static/Mock-up_3way2.png" },
    ];
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

    return (
        <Grid
            className={classes.root}
        >
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Grid
                className={classes.top}
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
                            ตั้งค่าโหมดการทำงาน
                        </Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        className={classes.textFieldLeft}
                    >

                        <Grid
                            className={classes.textFieldLeft_top}
                        >
                            <Typography
                                className={classes.buttonPattern}
                            // onClick={() => handleClickOpen()}
                            // type='submit'
                            >
                                โหมดการทำงาน Fixtime Mode
                            </Typography>
                            {/* <TextField
                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                className={classes.textField_name}
                                label="โหมดที่เลือก"
                                variant="outlined"
                                name="junctionName"
                                // onBlur={formik.handleBlur}
                                onChange={(event) => { handleChangeManu(event) }}
                                // value={formik.values.junctionName}
                                select
                                margin="normal"
                            >
                                {menuList.map((option) => (
                                    <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {content}
            {/* </form> */}
        </Grid>
    );
};

export default ConfigMode;