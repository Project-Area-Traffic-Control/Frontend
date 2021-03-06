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
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
//import LocationSearchInput from './LocationSearch';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { Assignment, BarChart, Close, ExpandLess, ExpandMore, KeyboardArrowLeft, KeyboardArrowRight, RemoveFromQueueTwoTone, RotateRight, VerticalAlignBottom } from '@material-ui/icons';
// import ReportTable from './ReportTable';
import { channelService } from '../../../services/channel.service';
import { Slide } from 'react-slideshow-image';
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-slick';
import ImageSlide from '../ImageSlide';
import theme from '../../../theme';
import { planService } from '../../../services/plan.service';
import { patternService } from '../../../services/pattern.service';
import { junctionService } from '../../../services/junction.service';
import { vehicleService } from '../../../services/vehicle.service';
// import {recordservice} from "../../services"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        // height: '100%',
        width: '100%',
        // display: 'flex'
        // paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
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
    titleGrid: {
        // height: '80px',
        // width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        alignContent: 'center',
        height: '80px',
        width: '100%',
        // display: 'flex',
    },
    titleLeft: {
        color: '#17395C',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        width: '88%'
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
        marginLeft: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        width: '45%',
    },
    textField_delay: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: '25%',
    },
    selectPattern_name: {
        marginLeft: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        width: '45%',
    },
    buttonPattern: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // paddingBottom: theme.spacing(5),
        width: '15%',
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
        width: '30%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        // alignContent: 'center',
        backgroundColor: '#287298',
        // marginLeft: '40%',
        color: '#FFFFFF',
        fontSize: '18px'
    },
    buttomCreate: {
        marginLeft: '50%',
        // marginTop: theme.spacing(3)
        display: 'flex',
        alignContent: 'center',
        height: '100%',
        width: '100%',
    },
    top_icon: {
        width: '52%',
        display: 'flex',
        justifyContent: 'end',
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
    bottomTime: {
        marginTop: theme.spacing(5),
        // width: '320px',
        // height: '320px',
        // display: ,
        // justifyContent: 'center'
        height: '250px',
        width: '400px'
    },
    startTimeCalculate: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80'
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
    },
    channelText: {
        position: 'absolute',
        marginBottom: '30%'
    }
}));
const menuList = [
    {
        value: 3,
        label: '3 ?????????',
    },
    {
        value: 4,
        label: '4 ?????????',
    },
    {
        value: 5,
        label: '5 ?????????',
    }
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        minWidth: '1000px'
    },
    '& .MuiDialog-paper': {
        minWidth: '1000px',
        minHeight: '550px'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialog_2 = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {

    },
    '& .MuiDialog-paper': {

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


const CreatePlan = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [patternOpen, setPatternOpen] = useState(false);
    const [menu, setManu] = React.useState('mobileUsername');
    const [channelContent, setChannelContent] = useState(null)
    const [data, setData] = useState(null);
    const [toggleContent, setToggleContent] = useState([]);
    const [check, setCheck] = useState("")
    const [content, setContent] = useState(<></>)
    const [current, setCurrent] = useState("")
    const [overview, setOverView] = useState([]);
    const [juncID, setJuncID] = useState(null)
    const [junction, setJunction] = useState([])
    const [channel, setChannel] = useState(null)
    const [degree, setDegree] = useState(null)
    const [plan, setPlan] = useState(null)
    const [imgSlide1, setImgSlide1] = useState(null)
    const [imgSlide2, setImgSlide2] = useState(null)
    const [calculate_list, setCalculate_List] = useState(null)
    const [vehicle_List, setVehicle_List] = useState(null)
    const [openCalculate, setOpenCalculate] = useState(false)
    const [dateSearch, setDateSearch] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    var initHei = '440px'
    var initWid = '600px'
    const [search, setSearch] = React.useState({
        search: "",
        options: "mobileUsername",
        page: 10,
        pageSize: 10,
        timeRangeBegin: "",
        timeRangeEnd: ""
    })
    const [pattern, setPattern] = useState(0)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenPattern = (phase, index) => {
        setPatternOpen(true);
        setCheck(phase)
        setCurrent(index)
    };
    const changePattern = (index, phase) => {
        var temp = [...data]
        temp[index].phase = phase
        setData(temp)
        setCheck(phase)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseCalculate = () => {
        setOpenCalculate(false);
    };
    const handleClosePattern = () => {
        setPatternOpen(false);
        setCheck("")
    };
    const toggleCalculate = () => {
        setOpenCalculate(true)
    }
    const formik = useFormik({
        initialValues: {
            planName: "",
            yellow_time: 5,
            delay_red_time: 3,
            junction_id: "",
        },
        validationSchema: Yup.object({
            planName: Yup.string().required(),
            yellow_time: Yup.string().required(),
            delay_red_time: Yup.string().required(),
            junction_id: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            // console.log(values)
        },
    });
    const handleChangeStartCalculate = (event) => {
        setStartTime(event.target.value.slice(0, 2))
        // console.log(event.target.value.slice(0, 2))
    }
    const handleChangeEndCalculate = (event) => {
        setEndTime(event.target.value.slice(0, 2))
        // console.log(event.target.value)
    }
    const handleChangeDateCalculate = (event) => {
        setDateSearch(new Date(event.target.value))
        // console.log(event.target.value)
    }
    const handleChangeManu = (event) => {
        setSearch({
            ...search,
            options: event.target.value
        })
        setManu(event.target.value);
    };
    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const goToPrevPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [index, setActiveStep] = React.useState(0);
    const images_pattern1 = [
        { url: `/static/3way1_${degree}degree.jpg` },
        { url: `/static/3way2_${degree}degree.jpg` },
        { url: `/static/3way3_${degree}degree.jpg` },
    ];
    const images_pattern2 = [
        { url: `/static/3way1_${degree}degree.jpg` },
        { url: `/static/3way3_${degree}degree.jpg` },
        { url: `/static/3way2_${degree}degree.jpg` },
    ];
    const images_pattern3 = [
        { url: `/static/4way${(((degree / 90) + 1) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 2) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 3) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 4) % 5)}.jpg` },
    ]
    const images_pattern4 = [
        { url: `/static/4way${(((degree / 90) + 1) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 4) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 3) % 5)}.jpg` },
        { url: `/static/4way${(((degree / 90) + 2) % 5)}.jpg` },
    ]
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

    const handleToggle = (id) => {
        console.log(id)
        var temp = data
        for (let index = 0; index < temp.length; index++) {
            if (index == id) {
                temp[index].toggle = !temp[index].toggle
                console.log(temp[index].toggle)
            }
        }
        setData(temp)
    }

    const handleChangeDuration = (event, ind) => {
        var temp = data
        for (let index = 0; index < temp.length; index++) {
            if (ind == index) {
                temp[ind].time = event.target.value
            }
        }
        setData(temp)
    };
    const addRow = () => {
        var temp = {
            // number: data.length + 1,
            phase: `?????????????????????????????????`,
            time: 30,
            toggle: false
        }
        setData([...data, temp])
    }

    const removeRow = (index) => {
        const temp = [...data]
        temp.splice(index, 1)
        setData(temp)
        // if (index == 0) {
        //     goToNextPicture()
        // }
        // else {
        //     goToPrevPicture()
        // }
        setActiveStep(0)
    }

    async function submitPlan() {
        var temp = formik.values
        temp.junction_id = parseInt(juncID)
        formik.setValues(temp)
        await planService.createPlan({
            name: formik.values.planName,
            yellow_time: formik.values.yellow_time,
            delay_red_time: formik.values.delay_red_time,
            junction_id: formik.values.junction_id
        }).then((data) => {
            setPlan(data.data.id)
            // submitPattern()
        })

    }

    const submitPattern = () => {
        for (let index = 0; index < data.length; index++) {
            var temp = {
                pattern: `PATTERN_${data[index].phase.slice(10, data[index].phase.length)}_${junction.number_channel}_WAYS`,
                order: index + 1,
                duration: data[index].time,
                plan_id: plan
            }
            patternService.createPattern({
                pattern: temp.pattern,
                order: temp.order,
                duration: temp.duration,
                plan_id: plan
            }).then((data) => {
            })
        }
    }

    async function calculateCycle() {
        // console.log(new Date(dateSearch))
        const start = new Date(dateSearch)
        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
        // console.log(start.toLocaleDateString())
        console.log(juncID)
        await vehicleService.getTotalBySearch({
            start: start,
            end: end,
            junction_id: parseInt(juncID)
        }).then((data) => {
            // console.log(data)
            setVehicle_List(data)
        })
        handleCloseCalculate()
    }

    useEffect(() => {
        if (vehicle_List != null) {
            var temp = []
            for (let index = 0; index < data.length; index++) {
                temp.push({
                    count: 0,
                    channel: parseInt(data[index].phase[data[index].phase.length - 1]) - 1
                })
            }
            for (let index = 0; index < vehicle_List.length; index++) {
                var tempTime = new Date(vehicle_List[index].create_time)
                if (tempTime.getHours() >= 10 && tempTime.getHours() <= 16) {
                    if (vehicle_List[index].channel?.id == channel[0]?.id) {
                        for (let index = 0; index < temp.length; index++) {
                            if (temp[index].channel == 0) {
                                temp[index].count += 1
                            }
                        }
                        // temp[0] += 1
                    }
                    if (vehicle_List[index].channel?.id == channel[1]?.id) {
                        for (let index = 0; index < temp.length; index++) {
                            if (temp[index].channel == 1) {
                                temp[index].count += 1
                            }
                        }
                        // temp[1] += 1
                    }
                    if (vehicle_List[index].channel?.id == channel[2]?.id) {
                        for (let index = 0; index < temp.length; index++) {
                            if (temp[index].channel == 2) {
                                temp[index].count += 1
                            }
                        }
                        // temp[2] += 1
                    }
                    if (vehicle_List[index].channel?.id == channel[3]?.id) {
                        for (let index = 0; index < temp.length; index++) {
                            if (temp[index].channel == 3) {
                                temp[index].count += 1
                            }
                        }
                        // temp[3] += 1
                    }
                    if (vehicle_List[index].channel?.id == channel[4]?.id) {
                        for (let index = 0; index < temp.length; index++) {
                            if (temp[index].channel == 4) {
                                temp[index].count += 1
                            }
                        }
                        // temp[4] += 1
                    }
                }
            }
            setCalculate_List(temp)
            console.log(temp)
        }
    }, [vehicle_List])
    useEffect(() => {
        if (calculate_list != null) {
            // console.log(data)
            const lost_time = (parseInt(formik.values.yellow_time) + parseInt(formik.values.delay_red_time)) * data.length
            var sum = 0.0
            for (let index = 0; index < channel.length; index++) {
                sum += parseFloat((parseInt(calculate_list[index].count) / parseInt(channel[index].nunmber_lane)) / 1800)

            }
            console.log(sum)
            const cycleTime = parseInt(((1.5 * lost_time) + 5) / (1 - sum)) + 1
            const greenTime = cycleTime - lost_time
            var temp_green = []
            for (let index = 0; index < calculate_list.length; index++) {
                // console.log(channel[calculate_list[index].channel].nunmber_lane)
                temp_green.push(parseInt((parseFloat((parseInt(calculate_list[index].count) / parseInt(channel[calculate_list[index].channel].nunmber_lane)) / 1800) / sum) * greenTime))
            }
            console.log(temp_green)
            var temp_data = data
            for (let index = 0; index < temp_data.length; index++) {

                temp_data[index].time = temp_green[index]

            }
            setData(temp_data)
            // console.log(lost_time)
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];

            // }
        }

    }, [calculate_list])
    useEffect(() => {
        if (plan != null) {
            submitPattern()
            console.log(juncID)
            navigate(`/app/junction/${juncID}/plans`, { replace: true });
        }
        // submitPattern()

    }, [plan])

    useEffect(() => {
        if (pattern == 1) {
            if (junction.number_channel == 3) {
                setData([{
                    //number: 1,
                    phase: '??????????????????????????? 1',
                    time: 120,
                    toggle: false
                },
                {
                    //number: 2,
                    phase: '??????????????????????????? 2',
                    time: 60,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 3',
                    time: 120,
                    toggle: false
                }])
            }
            else if (junction.number_channel == 4) {
                setData([{
                    //number: 1,
                    phase: '??????????????????????????? 1',
                    time: 120,
                    toggle: false
                },
                {
                    //number: 2,
                    phase: '??????????????????????????? 2',
                    time: 60,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 3',
                    time: 60,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 4',
                    time: 60,
                    toggle: false
                }])
            }

        }
        if (pattern == 2) {
            if (junction.number_channel == 3) {
                setData([{
                    //number: 1,
                    phase: '??????????????????????????? 1',
                    time: 120,
                    toggle: false
                },
                {
                    //number: 2,
                    phase: '??????????????????????????? 3',
                    time: 60,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 2',
                    time: 120,
                    toggle: false
                }])
            }
            else if (junction.number_channel == 4) {
                setData([{
                    //number: 1,
                    phase: '??????????????????????????? 1',
                    time: 120,
                    toggle: false
                },
                {
                    //number: 2,
                    phase: '??????????????????????????? 4',
                    time: 60,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 3',
                    time: 120,
                    toggle: false
                },
                {
                    //number: 3,
                    phase: '??????????????????????????? 2',
                    time: 120,
                    toggle: false
                }])
            }
        }
    }, [pattern])

    useEffect(() => {
        var list = []
        var img_path = []
        if (data != null) {
            for (let index = 0; index < data.length; index++) {
                if (data[index].toggle == true) {
                    list.push(<ExpandLess />)
                }
                else {
                    list.push(<ExpandMore />)
                }

                img_path.push(data[index].phase[10])
            }
            // console.log(img_path)
            let swap = initHei
            initHei = initWid
            initWid = swap
            for (let index = 0; index < img_path.length; index++) {
                var temp = img_path[index]
                if (junction.number_channel == 3) {
                    img_path[index] = { url: `/static/3way${temp}_${degree}degree.jpg` }
                }
                else if (junction.number_channel == 4) {
                    if (temp == 1 || temp == 2 || temp == 3 || temp == 4) {
                        img_path[index] = { url: `/static/4way${((degree / 90) + temp) % 5}.jpg` }
                    }
                    else {
                        if (temp == 5) {
                            if (degree == 0 || degree == 180) {
                                img_path[index] = { url: `/static/4way5.jpg` }
                            }
                            else {
                                img_path[index] = { url: `/static/4way6.jpg` }
                            }
                        }
                        if (temp == 6) {
                            if (degree == 0 || degree == 180) {
                                img_path[index] = { url: `/static/4way6.jpg` }
                            }
                            else {
                                img_path[index] = { url: `/static/4way5.jpg` }
                            }
                        }
                        if (temp == 7) {
                            if (degree == 0 || degree == 180) {
                                img_path[index] = { url: `/static/4way7.jpg` }
                            }
                            else {
                                img_path[index] = { url: `/static/4way8.jpg` }
                            }
                        }
                        if (temp == 8) {
                            if (degree == 0 || degree == 180) {
                                img_path[index] = { url: `/static/4way8.jpg` }
                            }
                            else {
                                img_path[index] = { url: `/static/4way7.jpg` }
                            }
                        }
                    }

                }
            }
            setOverView(img_path)
        }

        // setToggleContent(null)
        if (toggleContent == 0) {
            setToggleContent(list)
        }
        // console.log(img_path)
    }, [data])

    useEffect(() => {
        if (check == '??????????????????????????? 1') {
            if (junction.number_channel == 3) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/3way1_${degree}degree.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way2_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way3_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way4_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
            else if (junction.number_channel == 4) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/4way${((degree / 90) + 1) % 4}.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/4way${((degree / 90) + 2) % 4}.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/4way${((degree / 90) + 3) % 4}.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/4way4.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                    >
                                        ??????????????????????????? 5
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                    >
                                        ??????????????????????????? 6
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                    >
                                        ??????????????????????????? 7
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                    >
                                        ??????????????????????????? 8
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }

        }
        if (check == '??????????????????????????? 2') {
            if (junction.number_channel == 3) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way1_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/3way2_${degree}degree.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way3_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >

                                <img src={`/static/3way4_${degree}degree.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
            else if (junction.number_channel == 4) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                <img src={`/static/4way${((degree / 90) + 1) % 4}.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/4way${((degree / 90) + 2) % 4}.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/4way4.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/4way${((degree / 90) + 4) % 4}.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                    >
                                        ??????????????????????????? 5
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                    >
                                        ??????????????????????????? 6
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                    >
                                        ??????????????????????????? 7
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                    >
                                        ??????????????????????????? 8
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }

        }
        if (check == '??????????????????????????? 3') {
            if (junction.number_channel == 3) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way1_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way2_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/3way3_${degree}degree.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way4_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
            else if (junction.number_channel == 4) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                <img src={`/static/4way${((degree / 90) + 1) % 4}.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >

                                <img src={`/static/4way4.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/4way${((degree / 90) + 3) % 4}.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/4way${((degree / 90) + 4) % 4}.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                    >
                                        ??????????????????????????? 5
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                    >
                                        ??????????????????????????? 6
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                    >
                                        ??????????????????????????? 7
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                    >
                                        ??????????????????????????? 8
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
        }
        if (check == '??????????????????????????? 4') {
            if (junction.number_channel == 3) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way1_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way2_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way3_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/3way4_${degree}degree.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
            if (junction.number_channel == 4) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                <img src={`/static/4way4.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >

                                <img src={`/static/4way${((degree / 90) + 2) % 4}.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                <img src={`/static/4way${((degree / 90) + 3) % 4}.jpg`} width='280px' height='280px' />

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <Grid
                                    className={classes.selectBorder}
                                >
                                    <img src={`/static/4way${((degree / 90) + 4) % 4}.jpg`} width='280px' height='280px' />
                                </Grid>
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                    >
                                        ??????????????????????????? 5
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                    >
                                        ??????????????????????????? 6
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                    >
                                        ??????????????????????????? 7
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                    >
                                        ??????????????????????????? 8
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
        }
        if (check == '??????????????????????????? 5') {
            setContent(<BootstrapDialog
                open={patternOpen}
                onClose={handleClosePattern}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        ???????????????????????????????????????????????????????????????
                    </Typography>
                    <Grid
                        className={classes.dialogDividerGrid}
                    >
                        <Divider className={classes.dialogDivider} />
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                >
                                    ??????????????????????????? 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                >
                                    ??????????????????????????? 2
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                >
                                    ??????????????????????????? 3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                >
                                    ??????????????????????????? 4
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                            </Grid>


                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                >
                                    ??????????????????????????? 5
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                >
                                    ??????????????????????????? 6
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                >
                                    ??????????????????????????? 7
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                >
                                    ??????????????????????????? 8
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </BootstrapDialog >)
        }
        if (check == '??????????????????????????? 6') {
            setContent(<BootstrapDialog
                open={patternOpen}
                onClose={handleClosePattern}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        ???????????????????????????????????????????????????????????????
                    </Typography>
                    <Grid
                        className={classes.dialogDividerGrid}
                    >
                        <Divider className={classes.dialogDivider} />
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                >
                                    ??????????????????????????? 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                >
                                    ??????????????????????????? 2
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                >
                                    ??????????????????????????? 3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                >
                                    ??????????????????????????? 4
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                >
                                    ??????????????????????????? 5
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                >
                                    ??????????????????????????? 6
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                >
                                    ??????????????????????????? 7
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                >
                                    ??????????????????????????? 8
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </BootstrapDialog >)
        }
        if (check == '??????????????????????????? 7') {
            setContent(<BootstrapDialog
                open={patternOpen}
                onClose={handleClosePattern}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        ???????????????????????????????????????????????????????????????
                    </Typography>
                    <Grid
                        className={classes.dialogDividerGrid}
                    >
                        <Divider className={classes.dialogDivider} />
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                >
                                    ??????????????????????????? 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                >
                                    ??????????????????????????? 2
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                >
                                    ??????????????????????????? 3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                >
                                    ??????????????????????????? 4
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                >
                                    ??????????????????????????? 5
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                >
                                    ??????????????????????????? 6
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                >
                                    ??????????????????????????? 7
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                >
                                    ??????????????????????????? 8
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </BootstrapDialog >)
        }
        if (check == '??????????????????????????? 8') {
            setContent(<BootstrapDialog
                open={patternOpen}
                onClose={handleClosePattern}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        ???????????????????????????????????????????????????????????????
                    </Typography>
                    <Grid
                        className={classes.dialogDividerGrid}
                    >
                        <Divider className={classes.dialogDivider} />
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                >
                                    ??????????????????????????? 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                >
                                    ??????????????????????????? 2
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {degree == 0 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                >
                                    ??????????????????????????? 3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >

                            {degree == 0 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                            {degree == 90 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                            {degree == 180 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                            {degree == 270 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                >
                                    ??????????????????????????? 4
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                >
                                    ??????????????????????????? 5
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                >
                                    ??????????????????????????? 6
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        <Grid
                            className={classes.pattern}
                        >

                            {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}

                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                >
                                    ??????????????????????????? 7
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                            style={{ marginLeft: theme.spacing(5) }}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                >
                                    ??????????????????????????? 8
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </BootstrapDialog >)
        }
        if (check == '?????????????????????????????????') {
            if (junction.number_channel == 3) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way1_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way2_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                <img src={`/static/3way3_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                <img src={`/static/3way4_${degree}degree.jpg`} width='280px' height='280px' />
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog>)
            }
            else if (junction.number_channel == 4) {
                setContent(<BootstrapDialog
                    open={patternOpen}
                    onClose={handleClosePattern}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ???????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {degree == 0 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                                {degree == 90 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                                {degree == 180 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                                {degree == 270 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 1") }}
                                    >
                                        ??????????????????????????? 1
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >

                                {degree == 0 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                                {degree == 90 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                                {degree == 180 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                                {degree == 270 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 2") }}
                                    >
                                        ??????????????????????????? 2
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {degree == 0 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}
                                {degree == 90 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                                {degree == 180 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                                {degree == 270 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 3") }}
                                    >
                                        ??????????????????????????? 3
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >

                                {degree == 0 && <img src={`/static/4way4.jpg`} width='280px' height='280px' />}
                                {degree == 90 && <img src={`/static/4way1.jpg`} width='280px' height='280px' />}
                                {degree == 180 && <img src={`/static/4way2.jpg`} width='280px' height='280px' />}
                                {degree == 270 && <img src={`/static/4way3.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 4") }}
                                    >
                                        ??????????????????????????? 4
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {((degree == 0 || degree == 180)) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                {((degree == 90 || degree == 270)) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 5") }}
                                    >
                                        ??????????????????????????? 5
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way6.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way5.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 6") }}
                                    >
                                        ??????????????????????????? 6
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >

                                {(degree == 0 || degree == 180) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}

                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 7") }}
                                    >
                                        ??????????????????????????? 7
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {(degree == 0 || degree == 180) && <img src={`/static/4way8.jpg`} width='280px' height='280px' />}
                                {(degree == 90 || degree == 270) && <img src={`/static/4way7.jpg`} width='280px' height='280px' />}
                                <Grid
                                    className={classes.clickPattern}
                                >
                                    <Button
                                        onClick={() => { changePattern(current, "??????????????????????????? 8") }}
                                    >
                                        ??????????????????????????? 8
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
                </BootstrapDialog >)
            }
        }
    }, [check])

    useEffect(() => {
        if (patternOpen == false) {
            setContent(<></>)
        }
    }, [patternOpen])

    useEffect(() => {
        setJuncID(location.pathname.slice(14, location.pathname.length - 12))
        // console.log(juncID)
    }, [])

    useEffect(() => {
        if (juncID != null) {
            console.log(juncID)
            junctionService.getJunctionByID(juncID).then((data) => {
                // console.log(data)
                setJunction(data)
            })

        }

    }, [juncID])

    useEffect(() => {
        if (junction != null) {
            console.log(junction.rotate)
            setDegree(junction.rotate)
            setChannel(junction.channel)
            // if (junction.number_channel == 3) {
            //     setImgSlide1(images_pattern1)
            //     setImgSlide2(images_pattern2)
            // }
            // else if (junction.number_channel == 4) {
            //     setImgSlide1(images_pattern3)
            //     setImgSlide2(images_pattern4)
            // }
        }
    }, [junction])

    useEffect(() => {
        if (degree != null) {
            if (junction.number_channel == 3) {
                setImgSlide1(images_pattern1)
                setImgSlide2(images_pattern2)
            }
            else if (junction.number_channel == 4) {
                setImgSlide1(images_pattern3)
                setImgSlide2(images_pattern4)
            }
        }
    }, [degree])
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid
                className={classes.root}
            >
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
                                ??????????????????????????????????????????????????????????????????????????????????????????
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.textFieldLeft}
                        >

                            <Grid
                                className={classes.textFieldLeft_top}
                            >
                                <TextField
                                    error={Boolean(formik.touched.planName && formik.errors.planName)}
                                    helperText={formik.touched.planName && formik.errors.planName}
                                    className={classes.textField_name}
                                    label="??????????????????????????????"
                                    variant="outlined"
                                    name="planName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.planName}
                                    margin="normal"
                                />
                                <Button
                                    className={classes.buttonPattern}
                                    onClick={() => handleClickOpen()}
                                // type='submit'
                                >
                                    ??????????????????????????????????????????
                                </Button>
                            </Grid>
                            {/* <LocationSearchInput /> */}
                        </Grid>
                    </Grid>
                </Grid>
                {data != null && <Grid
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
                                ???????????????????????????????????????
                            </Typography>
                            <Grid
                                className={classes.buttomGrid}
                            >

                                {/* {juncID != null && <IconButton
                                    className={classes.buttomCreate}
                                    onClick={() => { toggleCalculate() }}
                                >
                                    <Typography
                                        variant='h5'>
                                        ???????????????
                                    </Typography> */}
                                    {/* <img src='/static/button/Plus.png' /> */}
                                    {/* <BarChart style={{ marginLeft: theme.spacing(1) }} />
                                </IconButton>} */}
                            </Grid>
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
                                            {/* <StyledTableCell align="center" width="10%"></StyledTableCell> */}
                                            <StyledTableCell align="center" width="20%">????????????????????????</StyledTableCell>
                                            <StyledTableCell align="center" width="30%">????????????????????????????????????????????????</StyledTableCell>
                                            <StyledTableCell align="center" width="30%">???????????????????????????????????????????????????????????????</StyledTableCell>
                                            <StyledTableCell align="center" width="10%">??????</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, index) => (
                                            <StyledTableRow key={row.number}>
                                                {/* <StyledTableCell align="center">
                                                    <IconButton
                                                        onClick={() => {
                                                            handleToggle(row.number - 1)
                                                        }}
                                                    >
                                                        {row.toggle ? <ExpandMore /> : <ExpandLess />}
                                                    </IconButton>
                                                </StyledTableCell> */}
                                                <StyledTableCell align="center">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">

                                                    {/* <img src=''/> */}
                                                    <div
                                                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                                                    >
                                                        {row.phase != '?????????????????????????????????' && junction.number_channel == 3 && <img src={`/static/3way${row.phase.slice(10, row.phase.length)}_${degree}degree.jpg`} width='144px' height='144px' />}
                                                        {/* {row.phase != '?????????????????????????????????' && row.phase != '??????????????????????????? 5' && row.phase != '??????????????????????????? 6' && row.phase != '??????????????????????????? 7' && row.phase != '??????????????????????????? 8' && junction.number_channel == 4 && <img src={`/static/4way${((degree / 90) + (parseInt(row.phase.slice(10, row.phase.length)))) % 5}.jpg`} width='144px' height='144px' />} */}
                                                        {row.phase == '??????????????????????????? 1' && degree == 0 && <img src={`/static/4way1.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 1' && degree == 90 && <img src={`/static/4way2.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 1' && degree == 180 && <img src={`/static/4way3.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 1' && degree == 270 && <img src={`/static/4way4.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 2' && degree == 0 && <img src={`/static/4way2.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 2' && degree == 90 && <img src={`/static/4way3.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 2' && degree == 180 && <img src={`/static/4way4.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 2' && degree == 270 && <img src={`/static/4way1.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 3' && degree == 0 && <img src={`/static/4way3.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 3' && degree == 90 && <img src={`/static/4way4.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 3' && degree == 180 && <img src={`/static/4way1.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 3' && degree == 270 && <img src={`/static/4way2.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 4' && degree == 0 && <img src={`/static/4way4.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 4' && degree == 90 && <img src={`/static/4way1.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 4' && degree == 180 && <img src={`/static/4way2.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 4' && degree == 270 && <img src={`/static/4way3.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 5' && (degree == 0 || degree == 180) && junction.number_channel == 4 && <img src={`/static/4way5.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 5' && (degree == 90 || degree == 270) && junction.number_channel == 4 && <img src={`/static/4way6.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 6' && (degree == 0 || degree == 180) && junction.number_channel == 4 && <img src={`/static/4way6.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 6' && (degree == 90 || degree == 270) && junction.number_channel == 4 && <img src={`/static/4way5.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 7' && (degree == 0 || degree == 180) && junction.number_channel == 4 && <img src={`/static/4way7.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 7' && (degree == 90 || degree == 270) && junction.number_channel == 4 && <img src={`/static/4way8.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 8' && (degree == 0 || degree == 180) && junction.number_channel == 4 && <img src={`/static/4way8.jpg`} width='144px' height='144px' />}
                                                        {row.phase == '??????????????????????????? 8' && (degree == 90 || degree == 270) && junction.number_channel == 4 && <img src={`/static/4way7.jpg`} width='144px' height='144px' />}
                                                    </div>
                                                    <Button
                                                        onClick={() => {
                                                            handleClickOpenPattern(row.phase, index)
                                                        }}
                                                    >
                                                        {row.phase}
                                                    </Button>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <TextField
                                                        // error={Boolean(formik.touched.yellow_time && formik.errors.yellow_time)}
                                                        // helperText={formik.touched.yellow_time && formik.errors.yellow_time}
                                                        // className={classes.textField_delay}
                                                        // label="??????????????????????????????????????????????????????????????????"
                                                        variant="outlined"
                                                        name="time_duration"
                                                        // onBlur={formik.handleBlur}
                                                        onChange={(event) => { handleChangeDuration(event, index) }}
                                                        defaultValue={row.time}
                                                        // defaultValue='5'
                                                        margin="normal"

                                                    >

                                                    </TextField>
                                                </StyledTableCell>
                                                < StyledTableCell align="center">
                                                    {data.length != 1 && <IconButton
                                                        onClick={() => {
                                                            removeRow(index)
                                                            // goToPrevPicture()
                                                        }}
                                                    >
                                                        <Close />
                                                    </IconButton>}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Grid
                                    className={classes.top_icon}
                                >
                                    <Button
                                        // className={classes.buttonGrid}
                                        onClick={addRow}
                                    // type='submit'
                                    >
                                        ?????????????????????????????????
                                    </Button>
                                </Grid>
                            </TableContainer>
                            <Grid>
                                <TextField
                                    error={Boolean(formik.touched.yellow_time && formik.errors.yellow_time)}
                                    helperText={formik.touched.yellow_time && formik.errors.yellow_time}
                                    className={classes.textField_delay}
                                    label="??????????????????????????????????????????????????????????????????"
                                    variant="outlined"
                                    name="yellow_time"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.yellow_time}
                                    // defaultValue='5'
                                    margin="normal"
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    error={Boolean(formik.touched.delay_red_time && formik.errors.delay_red_time)}
                                    helperText={formik.touched.delay_red_time && formik.errors.delay_red_time}
                                    className={classes.textField_delay}
                                    label="????????????????????????????????????????????????????????????????????????"
                                    variant="outlined"
                                    name="delay_red_time"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.delay_red_time}
                                    // defaultValue='3'
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>}
                {data != null && <Grid
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
                                ??????????????????????????????????????????
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid
                            className={classes.pattern}
                        >
                            <Grid
                                className={classes.overview}
                                style={{ marginBottom: theme.spacing(10), marginTop: theme.spacing(10) }}
                            >
                                {overview.length != 0 && <div
                                    style={{
                                        marginTop: theme.spacing(5),
                                        maxWidth: 500,
                                        maxHeight: 500,
                                        flexGrow: 1,
                                        position: 'relative'
                                    }}
                                >
                                    {data[index].phase != '?????????????????????????????????' && overview[index] != null && <img
                                        src={overview[index].url}
                                        style={{
                                            height: 500,
                                            width: "100%",
                                            width: 500,
                                            display: "block",
                                            overflow: "hidden",
                                        }}
                                    />}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 3 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 0 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 90 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 180 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '20%', marginLeft: '0%', fontSize: '24px', backgroundColor: 'white', }} > {junction.channel[0].name}</div >}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '-10%', marginLeft: '50%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[1].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '72%', marginLeft: '82%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[2].name}</div>}
                                    {data[index].phase != '?????????????????????????????????' && degree == 270 && junction.number_channel == 4 && <div style={{ position: 'absolute', color: 'black', top: '103%', marginLeft: '30%', fontSize: '24px', backgroundColor: 'white', }} >{junction.channel[3].name}</div>}
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
                </Grid>}
                <BootstrapDialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ??????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomImge}
                        >
                            <Grid
                                className={classes.pattern}
                            >
                                {imgSlide1 != null && <SimpleImageSlider
                                    width='320px'
                                    height='320px'
                                    images={imgSlide1}
                                    // showBullets={true}
                                    // showNavs={true}
                                    autoPlay
                                    autoPlayDelay='1'
                                />}

                                <Grid
                                    className={classes.select_pattern}
                                >
                                    <Button
                                        onClick={() => {
                                            setPattern(1)
                                            handleClose()
                                        }}
                                    >
                                        ??????????????????????????? 1 (?????????????????????)
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.pattern}
                                style={{ marginLeft: theme.spacing(5) }}
                            >
                                {imgSlide2 != null && <SimpleImageSlider
                                    width='320px'
                                    height='320px'
                                    images={imgSlide2}
                                    // showBullets={true}
                                    // showNavs={true}
                                    autoPlay
                                    autoPlayDelay='1'
                                />}
                                <Grid
                                    className={classes.select_pattern}
                                >
                                    <Button
                                        onClick={() => {
                                            setPattern(2)
                                            handleClose()
                                        }}
                                    >
                                        ??????????????????????????? 2 (?????????????????????)
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </BootstrapDialog>
                <BootstrapDialog_2
                    open={openCalculate}
                    onClose={handleCloseCalculate}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <Typography
                            variant='h5'
                            className={classes.dialogTitle}
                        >
                            ?????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.dialogDividerGrid}
                        >
                            <Divider className={classes.dialogDivider} />
                        </Grid>
                        <Grid
                            className={classes.bottomTime}
                        >
                            <Grid
                                className={classes.startTimeCalculate}
                            >
                                <Typography>
                                    ????????????????????????????????????????????????
                                </Typography>
                                <TextField
                                    // className={classes.textField_name}
                                    style={{ marginLeft: theme.spacing(3) }}
                                    variant="outlined"
                                    name="start"
                                    // onBlur={formik.handleBlur}
                                    onChange={(event) => { handleChangeStartCalculate(event) }}
                                    // value={formik.values.junctionName}
                                    // select
                                    type="time"
                                    margin="normal"
                                // defaultValue={row.start}
                                />
                            </Grid>

                            <Grid
                                className={classes.startTimeCalculate}
                            >
                                <Typography>
                                    ?????????????????????????????????????????????
                                </Typography>
                                <TextField
                                    // className={classes.textField_name}
                                    style={{ marginLeft: theme.spacing(3) }}
                                    variant="outlined"
                                    name="end"
                                    // onBlur={formik.handleBlur}
                                    onChange={(event) => { handleChangeEndCalculate(event) }}
                                    // value={formik.values.junctionName}
                                    // select
                                    type="time"
                                    margin="normal"
                                // defaultValue={row.start}
                                />
                            </Grid>

                            <Grid
                                className={classes.startTimeCalculate}
                            >
                                <Typography>
                                    ?????????????????????????????????
                                </Typography>
                                <TextField
                                    // className={classes.textField_name}
                                    style={{ marginLeft: theme.spacing(7) }}
                                    variant="outlined"
                                    name="date"
                                    // onBlur={formik.handleBlur}
                                    onChange={(event) => { handleChangeDateCalculate(event) }}
                                    // value={formik.values.junctionName}
                                    // select
                                    type="Date"
                                    margin="normal"
                                // defaultValue={row.start}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={ha}>Disagree</Button> */}
                        <Button onClick={() => { calculateCycle() }} autoFocus>
                            ????????????
                        </Button>
                    </DialogActions>
                </BootstrapDialog_2>
                {content}
                <Grid
                    className={classes.top_icon}
                >
                    <Button
                        className={classes.buttonGrid}
                        onClick={() => {
                            submitPlan()
                        }}
                        type='submit'
                    >
                        ????????????????????????????????????
                    </Button>
                </Grid>
                {/* </form> */}
            </Grid>
        </form >
    );
};

export default CreatePlan;