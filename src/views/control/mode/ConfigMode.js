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
import { useNavigate } from 'react-router-dom';
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
import { controlService } from '../../../services/control.service';
import { planService } from '../../../services/plan.service';
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
    const [current, setCurrent] = useState("")
    const [overview, setOverView] = useState([]);
    const [menu, setMenu] = useState(0)
    const [planList, setPlanList] = useState([])
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
    const handleChangeManu = (event) => {
        setMenu(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenPattern = (phase, index) => {
        setPatternOpen(true);
        setCheck(phase)
        setCurrent(index)
    };
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
            start: "00:00",
            end: "00:00",
            plan: ""
        }
        setEditAble([...data, temp])
        setContent(content)
        console.log(data)
    }

    const removeRow = (index) => {
        const temp = [...data]
        temp.splice(index, 1)
        setData(temp)
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

    const [fixtimeList, setFixtimeList] = useState([])
    const [data, setData] = useState([])
    const [editAble, setEditAble] = useState([])
    useEffect(() => {
        controlService.getAllFixtime().then((data) => {
            setFixtimeList(data)
        })
        planService.getAllPlan().then((data) => {
            setPlanList(data)
        })
    }, [])

    useEffect(() => {
        if (menu == 1) {
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
                                                {row.plan.name}
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
            setContent(<></>)
        }
        else if (menu > 0 && menu % 2 == 1) {
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
                                                <TextField
                                                    // className={classes.textField_name}
                                                    variant="outlined"
                                                    name="start"
                                                    // onBlur={formik.handleBlur}
                                                    // onChange={handleChangeManu}
                                                    // value={formik.values.junctionName}
                                                    // select
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
                                                    // onChange={handleChangeManu}
                                                    // value={formik.values.junctionName}
                                                    // select
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
                                                    // onChange={handleChangeManu}
                                                    defaultValue={row.plan.id}
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
                    <Grid
                        className={classes.bottom_icon}
                    >
                        <Button
                            className={classes.buttonGrid}
                            onClick={() => { setMenu(menu + 2) }}
                            type='submit'
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            )
        }
    }, [menu])

    useEffect(() => {
        if (fixtimeList.length > 0) {
            var temp = []
            for (let index = 0; index < fixtimeList.length; index++) {
                const start = new Date(`${fixtimeList[index].start}`)
                const end = new Date(`${fixtimeList[index].end}`)
                var startM = ""
                var endM = ""
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
                    start: start.getHours() + ":" + startM,
                    end: end.getHours() + ":" + endM,
                    plan: fixtimeList[index].plan
                })
            }
            setData(temp)
            setEditAble(temp)
        }
    }, [fixtimeList])
    const formik = props.formik;
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
                                onClick={() => handleClickOpen()}
                            // type='submit'
                            >
                                โหมดการทำงาน
                            </Typography>
                            <TextField
                                // error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                // helperText={formik.touched.junctionName && formik.errors.junctionName}
                                className={classes.textField_name}
                                label="โหมดที่เลือก"
                                variant="outlined"
                                name="junctionName"
                                // onBlur={formik.handleBlur}
                                onChange={handleChangeManu}
                                // value={formik.values.junctionName}
                                select
                                margin="normal"
                            >
                                {menuList.map((option) => (
                                    <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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