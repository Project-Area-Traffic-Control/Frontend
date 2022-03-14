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
import { Assignment, Close, ExpandLess, ExpandMore, KeyboardArrowLeft, KeyboardArrowRight, RemoveFromQueueTwoTone, RotateRight } from '@material-ui/icons';
// import ReportTable from './ReportTable';
import { channelService } from '../../../services/channel.service';
import { Slide } from 'react-slideshow-image';
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-slick';
import ImageSlide from '../ImageSlide';
import theme from '../../../theme';
import { planService } from '../../../services/plan.service';
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
        width: '15%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        marginLeft: '40%',
        color: '#FFFFFF',
        fontSize: '18px'
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
        value: 3,
        label: '3 แยก',
    },
    {
        value: 4,
        label: '4 แยก',
    },
    {
        value: 5,
        label: '5 แยก',
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


const EditPlan = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [patternOpen, setPatternOpen] = useState(false);
    const [menu, setManu] = React.useState('mobileUsername');
    const [orders, setOrders] = React.useState({});
    const [channelList, setChannelList] = useState([]);
    const [degree, setDegree] = useState(0);
    const [data, setData] = useState(null);
    const [toggleContent, setToggleContent] = useState([]);
    const [table, setTable] = useState(<></>)
    const number_channel = props.number_channel
    const [check, setCheck] = useState("")
    const [content, setContent] = useState(<></>)
    const [current, setCurrent] = useState("")
    const [overview, setOverView] = useState([]);
    const [plan, setPlan] = useState(null)
    const [patternList, setPattenList] = useState([])
    const [imgRotate, setImgRotate] = useState(<img src={`/static/junction/${number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
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
    const handleClosePattern = () => {
        setPatternOpen(false);
        setCheck("")
    };
    const formik = props.formik;
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
    const channel_Formik = props.channel_Formik
    const channel = props.channel;
    const [formikChannel, setFormikChannel] = useState([]);
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
    const addRow = () => {
        var temp = {
            // number: data.length + 1,
            phase: `เลือกรูปแบบ`,
            time: `วินาที`,
            toggle: false
        }
        setData([...data, temp])
    }

    const removeRow = (index) => {
        const temp = [...data]
        temp.splice(index, 1)
        setData(temp)
    }
    useEffect(() => {
        if (pattern == 1) {
            setData([{
                //number: 1,
                phase: 'รูปแบบที่ 1',
                time: 120,
                toggle: false
            },
            {
                //number: 2,
                phase: 'รูปแบบที่ 2',
                time: 60,
                toggle: false
            },
            {
                //number: 3,
                phase: 'รูปแบบที่ 3',
                time: 120,
                toggle: false
            }])
        }
        if (pattern == 2) {
            setData([{
                //number: 1,
                phase: 'รูปแบบที่ 1',
                time: 120,
                toggle: false
            },
            {
                //number: 2,
                phase: 'รูปแบบที่ 3',
                time: 120,
                toggle: false
            },
            {
                //number: 3,
                phase: 'รูปแบบที่ 2',
                time: 60,
                toggle: false
            }])
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
            for (let index = 0; index < img_path.length; index++) {
                var temp = img_path[index]
                img_path[index] = { url: `/static/Mock-up_3way${temp}.png` }
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
        if (check == 'รูปแบบที่ 1') {
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
                        เลือกรูปแบบการปล่อยรถ
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
                                <img src='/static/Mock-up_3way1.png' width='320px' height='280px' />
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 1") }}
                                >
                                    รูปแบบที่ 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way2.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 2") }}
                                >
                                    รูปแบบที่ 2
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way3.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 3") }}
                                >
                                    รูปแบบที่ 3
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
        if (check == 'รูปแบบที่ 2') {
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
                        เลือกรูปแบบการปล่อยรถ
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
                            <img src='/static/Mock-up_3way1.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 1") }}
                                >
                                    รูปแบบที่ 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                <img src='/static/Mock-up_3way2.png' width='320px' height='280px' />
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 2") }}
                                >
                                    รูปแบบที่ 2
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way3.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 3") }}
                                >
                                    รูปแบบที่ 3
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
        if (check == 'รูปแบบที่ 3') {
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
                        เลือกรูปแบบการปล่อยรถ
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
                            <img src='/static/Mock-up_3way1.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 1") }}
                                >
                                    รูปแบบที่ 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way2.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 2") }}
                                >
                                    รูปแบบที่ 2
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <Grid
                                className={classes.selectBorder}
                            >
                                <img src='/static/Mock-up_3way3.png' width='320px' height='280px' />
                            </Grid>
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 3") }}
                                >
                                    รูปแบบที่ 3
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
        if (check == 'เลือกรูปแบบ') {
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
                        เลือกรูปแบบการปล่อยรถ
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
                            <img src='/static/Mock-up_3way1.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 1") }}
                                >
                                    รูปแบบที่ 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way2.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 2") }}
                                >
                                    รูปแบบที่ 2
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way3.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button
                                    onClick={() => { changePattern(current, "รูปแบบที่ 3") }}
                                >
                                    รูปแบบที่ 3
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

    }, [check])

    useEffect(() => {
        if (patternOpen == false) {
            setContent(<></>)
        }
    }, [patternOpen])

    useEffect(() => {
        planService.getPlanByID(location.pathname.slice(10, location.pathname.length - 10)).then((data) => {
            setPlan(data.data)
        })
    }, [])

    useEffect(() => {
        if (plan != null) {
            setPattenList(plan.pattern)
        }
    }, [plan])

    useEffect(() => {
        if (patternList.length > 0) {

            var temp = []
            for (let index = 0; index < patternList.length; index++) {
                temp.push({
                    phase: `รูปแบบที่ ${patternList[index].pattern.slice(8, patternList.length - 11)}`,
                    time: patternList[index].duration,
                    toggle: false
                })
            }
            console.log(temp)
            setData(temp)
        }
    }, [patternList])
    // useEffect(() => {
    //     var list = []
    //     if (data != null) {
    //         for (let index = 0; index < data.length; index++) {
    //             if (data[index].toggle == true) {
    //                 list.push(<ExpandLess />)
    //             }
    //             else {
    //                 list.push(<ExpandMore />)
    //             }
    //         }
    //     }
    //     // setToggleContent(null)
    //     if (toggleContent == 0) {
    //         setToggleContent(list)
    //     }
    // }, [toggleContent])
    // console.log("data: ", data)
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
                            ตั้งค่ารูปแบบการจัดการสัญญาณไฟ
                        </Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        className={classes.textFieldLeft}
                    >

                        <Grid
                            className={classes.textFieldLeft_top}
                        >
                            {plan != null && <TextField
                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                className={classes.textField_name}
                                label="ชื่อรูปแบบ"
                                variant="outlined"
                                name="junctionName"
                                // onBlur={formik.handleBlur}
                                // onChange={formik.handleChange}
                                defaultValue={plan.name}
                                margin="normal"
                            />}
                            {/* <TextField
                                className={classes.selectField}
                                id="outlined-select-menu"
                                select
                                name="number_channel"
                                label="จำนวนแยก"
                                // value={formik.values.number_channel}
                                // onChange={handleChangeManu}
                                variant="outlined"
                                margin="normal"
                            >
                                {menuList.map((option) => (
                                    <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                            <Button
                                className={classes.buttonPattern}
                                onClick={() => handleClickOpen()}
                            // type='submit'
                            >
                                เลือกชุดรูปแบบ
                            </Button>
                        </Grid>
                        {pattern != 0 && <Grid
                            className={classes.textFieldLeft_bot}
                        >
                            <Grid
                                className={classes.selectPattern_name}
                            >
                                <Typography>
                                    รูปแบบที่เลือก : {pattern}
                                </Typography>
                            </Grid>
                        </Grid>}
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
                                        <StyledTableCell align="center" width="10%"></StyledTableCell>
                                        <StyledTableCell align="center" width="20%">ลำดับที่</StyledTableCell>
                                        <StyledTableCell align="center" width="30%">รูปแบบการปล่อยรถ</StyledTableCell>
                                        <StyledTableCell align="center" width="30%">ระยะเวลาสัญญาณไฟเขียว</StyledTableCell>
                                        <StyledTableCell align="center" width="10%">ลบ</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <StyledTableRow key={row.number}>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    onClick={() => {
                                                        handleToggle(row.number - 1)
                                                    }}
                                                >
                                                    {row.toggle ? <ExpandMore /> : <ExpandLess />}
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
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
                                                    defaultValue={row.time}
                                                    variant="outlined"
                                                >

                                                </TextField>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    onClick={() => {
                                                        removeRow(index)
                                                        goToPrevPicture()
                                                    }}
                                                >
                                                    <Close />
                                                </IconButton>
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
                                    เพิ่มรูปแบบ
                                </Button>
                            </Grid>
                        </TableContainer>
                        <Grid>
                            <TextField
                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                className={classes.textField_delay}
                                label="ระยะเวลาสัญญาณไฟเหลือง"
                                variant="outlined"
                                name="amber"
                                // onBlur={formik.handleBlur}
                                // onChange={formik.handleChange}
                                // value={formik.values.junctionName}
                                defaultValue='5'
                                margin="normal"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                className={classes.textField_delay}
                                label="ระยะเวลาหน่วงสัญญาณไฟแดง"
                                variant="outlined"
                                name="delay"
                                // onBlur={formik.handleBlur}
                                // onChange={formik.handleChange}
                                // value={formik.values.junctionName}
                                defaultValue='3'
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
                            ลักษณะการทำงาน
                        </Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        className={classes.pattern}
                    >
                        {/* <Typography
                                variant='h6'
                                className={classes.text_1}
                            >
                                ไป ARL ลาดกระบัง
                            </Typography> */}
                        <Grid
                            className={classes.overview}
                        >
                            {/* {overview.length > 0 && <SimpleImageSlider
                                width='500px'
                                height='500px'
                                images={overview}
                                // showBullets={true}
                                showNavs={true}
                                style={}
                            />} */}
                            {overview.length != 0 && <div
                                style={{
                                    marginTop: theme.spacing(5),
                                    maxWidth: 600,
                                    flexGrow: 1,
                                }}
                            >
                                {overview[index] != null && <img
                                    src={overview[index].url}
                                    style={{
                                        height: 440,
                                        width: "100%",
                                        maxWidth: 600,
                                        display: "block",
                                        overflow: "hidden",
                                    }}
                                />}
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
                {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
                <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        เลือกลำดับการทำงาน
                    </Typography>
                    <Grid
                        className={classes.dialogDividerGrid}
                    >
                        <Divider className={classes.dialogDivider} />
                    </Grid>
                    <Grid
                        className={classes.bottomImge}
                    >
                        {/* <Grid>
                            <img src='/static/junction/3way-set-port.jpg' width='320px' height='320px' />
                        </Grid>
                        <Grid>
                            <img src='/static/junction/3way-set-port.jpg' width='320px' height='320px' />
                        </Grid> */}
                        <Grid
                            className={classes.pattern}
                        >
                            {/* <Typography
                                variant='h6'
                                className={classes.text_1}
                            >
                                ไป ARL ลาดกระบัง
                            </Typography> */}

                            <SimpleImageSlider
                                width='320px'
                                height='320px'
                                images={images_pattern1}
                                // showBullets={true}
                                showNavs={true}
                            />

                            <Grid
                                className={classes.select_pattern}
                            >
                                <Button
                                    onClick={() => {
                                        setPattern(1)
                                        handleClose()
                                    }}
                                >
                                    รูปแบบที่ 1 (ตามเข็ม)
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <SimpleImageSlider
                                width='320px'
                                height='320px'
                                images={images_pattern2}
                                // showBullets={true}
                                showNavs={true}
                            />
                            <Grid
                                className={classes.select_pattern}
                            >
                                <Button
                                    onClick={() => {
                                        setPattern(2)
                                        handleClose()
                                    }}
                                >
                                    รูปแบบที่ 2 (ทวนเข็ม)
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <Grid
                            className={classes.pattern}
                        >
                            <SimpleImageSlider
                                width='320px'
                                height='320px'
                                images={images_pattern2}
                                // showBullets={true}
                                showNavs={true}
                            />
                            <Grid
                                className={classes.select_pattern}
                            >
                                <Button>
                                    รูปแบบที่ 3 (ทวนเข็ม)
                                </Button>
                            </Grid>
                        </Grid> */}
                        {/* <Grid>
                            <SimpleImageSlider
                                width='320px'
                                height='320px'
                                images={images_pattern2}
                                // showBullets={true}
                                showNavs={true}
                            />
                        </Grid> */}
                        {/* <Grid>
                            <SimpleImageSlider
                                width='320px'
                                height='320px'
                                images={images}
                                // showBullets={true}
                                showNavs={true}
                            />
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            {/* <BootstrapDialog
                open={patternOpen}
                onClose={handleClosePattern}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > */}
            {/* <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
            {/* <DialogContent>
                    <Typography
                        variant='h5'
                        className={classes.dialogTitle}
                    >
                        เลือกรูปแบบการปล่อยรถ
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
                            <img src='/static/Mock-up_3way1.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button>
                                    รูปแบบที่ 1
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way2.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button>
                                    รูปแบบที่ 2
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.pattern}
                        >
                            <img src='/static/Mock-up_3way3.png' width='320px' height='280px' />
                            <Grid
                                className={classes.clickPattern}
                            >
                                <Button>
                                    รูปแบบที่ 3
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent> */}
            {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            {/* </BootstrapDialog> */}
            {content}
            {/* <Grid
                className={classes.bottom}
            > */}
            {/* {overview.length != 0 &&
                    <SimpleImageSlider
                        width='320px'
                        height='320px'
                        images={overview}
                        // showBullets={true}
                        showNavs={true}
                    />} */}
            {/* {props.status == "edit" && <ReportTable number_channel={formik.values.number_channel} channel={props.channel} pathID={props.pathID} status={props.status} formik={formik} />} */}
            {/* </Grid> */}
            <Grid
                className={classes.top_icon}
            >
                <Button
                    className={classes.buttonGrid}
                    // onClick={() => formik.handleSubmit}
                    type='submit'
                >
                    บันทึกข้อมูล
                </Button>
            </Grid>
            {/* </form> */}
        </Grid>
    );
};

export default EditPlan;