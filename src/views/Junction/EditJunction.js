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
    MenuItem,
    styled,
    TextField
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchTable from './SearchTable';
import ReportTable from './ReportTable';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { junctionService } from '../../services/junction.service';
import { channelService } from '../../services/channel.service';
import MyMap from './LocationSearch';
import { RotateRight } from '@material-ui/icons';
import { planService } from '../../services/plan.service';
import { apiConstants } from '../../_constants';
import socketIOClient from 'socket.io-client';
import { userService } from '../../services';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: '100%',
        width: '95%',
        marginLeft: '2%'
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
        width: '90%',
        // backgroundColor: '#FFFFFF',
        display: 'flex',
        marginLeft: '5%'
    },
    titleGrid: {
        height: '80px',
        width: '100%',
        display: 'flex-direction',
        justifyContent: 'center',
        // alignItems : 'center'
    },
    titleLeft: {
        color: '#17395C',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(3),
        // paddingLeft: theme.spacing(2)
    },
    divider: {
        backgroundColor: '#287298',
        height: '2px',
        width: '100%'
    },
    textFieldLeft: {
        marginTop: theme.spacing(5),
        width: '100%',
        display: 'flex'
    },
    textFieldLeft_top: {
        // paddingTop: theme.spacing(3),
        width: '100%',
        // display: 'flex'
    },
    textField_name: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(5),
        width: '95%',
    },
    selectField: {
        marginLeft: theme.spacing(3),
        // marginBottom: theme.spacing(5),
        width: '50%',

    },
    menuList: {
        backgroundColor: '#FFFFFF'
    },
    textField_location: {
        marginLeft: theme.spacing(3),
        // paddingBottom: theme.spacing(5),
        width: '75%',
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
        backgroundColor: '#287298',
        marginLeft: '10%',
        color: '#FFFFFF',
        fontSize: '18px'
    },
    deleteGrid: {
        marginTop: theme.spacing(5),
        display: 'flex',
        width: '30%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#ff3633',
        marginLeft: '30%',
        color: '#FFFFFF',
        fontSize: '18px'
    },
    buttonConfig: {
        marginTop: theme.spacing(5),
        display: 'flex',
        width: '50%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        marginLeft: '30%',
        color: '#FFFFFF',
        fontSize: '18px'
    },
    top_icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        // backgroundColor: '#000000'
        // marginLeft: '10%'
    },
    bottom: {
        width: '100%',
        marginTop: theme.spacing(10),
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    mapGrid: {
        width: '75%',
    },
    contentGrid: {
        width: '25%'
    },
    textField_lane: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
        width: '25%',
    },
    textField_order: {
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(3),
        width: '30%',
    },
    channelImg: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    titleText: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    titleDialog: {
        display: 'flex',
        width: '100%'
    }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
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

const EditJunction = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState(0);
    const [channel, setChannel] = useState([]);
    const [junction, setJunction] = useState(null)
    const [config, setConfig] = useState([])
    const [globalPosition, setGlobalPosition] = useState([])
    const [contentMap, setContentMap] = useState(null)
    const [content, setContent] = useState(<></>)
    const [imgPath_1, setImgPath_1] = useState(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_2, setImgPath_2] = useState(<img src='/static/Mock-up_3way2_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_3, setImgPath_3] = useState(<img src='/static/Mock-up_3way3_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_4, setImgPath_4] = useState(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
    const [imgPath_5, setImgPath_5] = useState(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
    var imgWid = '310.5px'
    var imgHei = '247.5px'
    const [degree, setDegree] = useState(0)
    const [menu, setMenu] = useState(0);
    const [status, setStatus] = useState(0)
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [plan, setPlan] = useState(null)
    const location = useLocation();
    const [userData, setUserData] = useState(null)
    const [userPermiss, setUserPermiss] = useState(null)
    // useEffect(() => {
    //     junctionService.getJunctionByID(pathID).then(data => {
    //         setJunction(data)
    //     })
    // }, [])
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user")))
        setContentMap(null)

    }, [location.pathname])
    useEffect(() => {
        if (userData != null) {
            userService.getUserByID(userData.id).then((data) => {
                // console.log(data)
                setUserPermiss(data.permissions)
            })
            setPathID(location.pathname.slice(14, location.pathname.length))
        }
    }, [userData])
    useEffect(() => {
        // let tempJ = 
        // console.log(tempJ)
        if (pathID != 0) {
            junctionService.getJunctionByID(pathID).then(data => {
                setJunction(data)
            })

        }

        // console.log(junction)
        // setJunction(junctionService.getJunctionByID(pathID))
        // setJunction(tempJ)
        // console.log(junction.data)
        // console.log(formik.values)
    }, [pathID])

    useEffect(() => {
        if (userPermiss != null) {
            setContentMap(<MyMap setGlobalPosition={setGlobalPosition} globalPosition={globalPosition} pathID={pathID} permission={userPermiss} />)
        }
    }, [userPermiss])

    useEffect(() => {
        // console.log(junction)
        if (junction != null) {
            formik.setValues({
                junctionName: junction.name,
                lat: junction.latitude,
                lng: junction.longitude,
                number_channel: junction.number_channel,
                areaID: 5,
            })
            setDegree(parseInt(junction.rotate))
            setChannel(junction.channel)
            setPlan(junction.plan)
            setGlobalPosition([junction.latitude, junction.longitude])
            setStatus(junction.channel.length)
            channel_Formik.setValues({
                name_1: junction.channel[0]?.name,
                number_lane_1: junction.channel[0]?.nunmber_lane,
                order_1: junction.channel[0]?.order,
                name_2: junction.channel[1]?.name,
                number_lane_2: junction.channel[1]?.nunmber_lane,
                order_2: junction.channel[1]?.order,
                name_3: junction.channel[2]?.name,
                number_lane_3: junction.channel[2]?.nunmber_lane,
                order_3: junction.channel[2]?.order,
                name_4: junction.channel[3]?.name,
                number_lane_4: junction.channel[3]?.nunmber_lane,
                order_4: junction.channel[3]?.order,
                name_5: junction.channel[4]?.name,
                number_lane_5: junction.channel[4]?.nunmber_lane,
                order_5: junction.channel[4]?.order,
                junction_id: pathID
            })
            // if (junction.channel.length == 3) {
            //     setImgPath_1(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
            //     setImgPath_2(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
            //     setImgPath_3(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
            //     setImgPath_4(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            // }
            // else if(junction.channel.length == 4){
            //     setImgPath_1(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     setImgPath_2(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     setImgPath_3(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     setImgPath_4(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            // }
            setMenu(junction.number_channel)
        }
        // console.log(channel)
    }, [junction])

    useEffect(() => {
        if (globalPosition != []) {
            var temp = formik.values
            temp.lat = globalPosition[0]
            temp.lng = globalPosition[1]
            formik.setValues(temp)
        }
    }, [globalPosition])

    const handleChangeManu = (event) => {
        // console.log("test")
        setMenu(event.target.value);
    };

    useEffect(() => {
        if (degree >= 360) {
            setDegree(0)
        }

        // setImgRotate(<img src={`/static/junction/${props.number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
        // setDegree(360 / temp)
        // console.log(degree)
        if (formik.values.number_channel == 3) {
            if (degree == 90 || degree == 270) {
                let temp = imgHei
                imgHei = imgWid
                imgWid = temp
            }
            setImgPath_1(<img src={`/static/Mock-up_3way1_${degree}degree.png`} width={imgWid} height={imgHei} />)
            setImgPath_2(<img src={`/static/Mock-up_3way2_${degree}degree.png`} width={imgWid} height={imgHei} />)
            setImgPath_3(<img src={`/static/Mock-up_3way3_${degree}degree.png`} width={imgWid} height={imgHei} />)
            setImgPath_4(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
        }
        else if (formik.values.number_channel == 4) {
            setImgPath_1(<img src={`/static/Mock-up_4way${degree}.png`} width={imgWid} height={imgHei} />)
            setImgPath_2(<img src={`/static/Mock-up_4way${(degree + 90) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_3(<img src={`/static/Mock-up_4way${(degree + 180) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_4(<img src={`/static/Mock-up_4way${(degree + 270) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
        }
    }, [degree])

    useEffect(() => {
        if (menu != 0) {
            let temp = {
                junctionName: formik.values.junctionName,
                lat: formik.values.lat,
                lng: formik.values.lng,
            }
            formik.setValues({
                number_channel: menu,
                areaID: 5,
                junctionName: temp.junctionName,
                lat: temp.lat,
                lng: temp.lng
            })
            let temp_2 = channel_Formik.values
            temp_2.order_1 = 1
            temp_2.order_2 = 2
            temp_2.order_3 = 3
            temp_2.order_4 = 4
            temp_2.order_5 = 5
            console.log(temp_2)
            setConfig(temp_2)
        }
        // console.log(channel_Formik.values)
    }, [menu])

    useEffect(() => {
        // console.log(props.channel.length)
        if (open == true) {
            setStatus(channel.length)
            channel_Formik.setValues({
                name_1: channel[0]?.name,
                number_lane_1: channel[0]?.nunmber_lane,
                order_1: channel[0]?.order,
                name_2: channel[1]?.name,
                number_lane_2: channel[1]?.nunmber_lane,
                order_2: channel[1]?.order,
                name_3: channel[2]?.name,
                number_lane_3: channel[2]?.nunmber_lane,
                order_3: channel[2]?.order,
                name_4: channel[3]?.name,
                number_lane_4: channel[3]?.nunmber_lane,
                order_4: channel[3]?.order,
                name_5: channel[4]?.name,
                number_lane_5: channel[4]?.nunmber_lane,
                order_5: channel[4]?.order,
                junction_id: pathID
            })
            setConfig({
                name_1: channel[0]?.name,
                number_lane_1: channel[0]?.nunmber_lane,
                order_1: channel[0]?.order,
                name_2: channel[1]?.name,
                number_lane_2: channel[1]?.nunmber_lane,
                order_2: channel[1]?.order,
                name_3: channel[2]?.name,
                number_lane_3: channel[2]?.nunmber_lane,
                order_3: channel[2]?.order,
                name_4: channel[3]?.name,
                number_lane_4: channel[3]?.nunmber_lane,
                order_4: channel[3]?.order,
                name_5: channel[4]?.name,
                number_lane_5: channel[4]?.nunmber_lane,
                order_5: channel[4]?.order,
                junction_id: pathID
            })
        }

        // console.log(formik)
    }, [open])

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseAlert = () => {
        setAlertOpen(false)
    }

    async function deleteSubmit() {
        for (let index = 0; index < channel.length; index++) {
            await channelService.deleteChannel(channel[index].id)
        }
        for (let index = 0; index < plan.length; index++) {
            await planService.deletePlan(plan[index].id)
        }
        await junctionService.deleteJunction(pathID)
        navigate(`/app/junction`, { replace: true });
    }
    const formik = useFormik({
        initialValues: {
            junctionName: '',
            lat: 0,
            lng: 0,
            number_channel: 3,
            areaID: 5,
            // ipAddress: '',

        },
        validationSchema: Yup.object({
            junctionName: Yup.string().max(100).required('???????????????????????????????????????????????????????????????????????????'),
            lat: Yup.number().required(),
            lng: Yup.number().required(),
            number_channel: Yup.string(),
            // areaID: Yup.string()
        }),
        onSubmit: async (values) => {

            console.log(values)
            await junctionService.updateJuncionID({
                "name": values.junctionName,
                "latitude": parseFloat(values.lat),
                "longitude": parseFloat(values.lng),
                "number_channel": parseInt(values.number_channel),
                "area_id": values.areaID,
                "rotate": degree
            }, pathID)
            if (junction.number_channel == 3 && values.number_channel == 4) {
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 4,
                    "junction_id": pathID
                })
            }
            if (junction.number_channel == 4 && values.number_channel == 3) {
                await channelService.deleteChannel(channel[3].id)
            }
            const socket = socketIOClient(apiConstants.socketUri, { path: '/socket' });
            var data = {
                junction_id: pathID,
                type: "JUNCTION",
            }
            socket.on('connect', (socketIO) => {
                console.log(socketIO)
                socket.emit("update:setting", data)
            })

            console.log(socket)
            // window.location.reload(false)
            navigate(`/app/junction`, { replace: true });
        },
    });

    const channel_Formik = useFormik({
        initialValues: {
            name_1: '',
            number_lane_1: '',
            order_1: '',
            name_2: '',
            number_lane_2: '',
            order_2: '',
            name_3: '',
            number_lane_3: '',
            order_3: '',
            name_4: '',
            number_lane_4: '',
            order_4: '',
            name_5: '',
            number_lane_5: '',
            order_5: '',
            junction_id: pathID,
            // ipAddress: '',

        },
        validationSchema: Yup.object({
            name_1: Yup.string().max(100).required('??????????????????????????????????????????????????????????????????????????????'),
            number_lane_1: Yup.string().max(100).required('?????????????????????????????????'),
            order_1: Yup.string().max(100),
            name_2: Yup.string().max(100).required('??????????????????????????????????????????????????????????????????????????????'),
            number_lane_2: Yup.string().max(100).required('?????????????????????????????????'),
            order_2: Yup.string().max(100),
            name_3: Yup.string().max(100).required('??????????????????????????????????????????????????????????????????????????????'),
            number_lane_3: Yup.string().max(100).required('?????????????????????????????????'),
            order_3: Yup.string().max(100),
            name_4: Yup.string().max(100),
            number_lane_4: Yup.string().max(100),
            order_4: Yup.string().max(100),
            name_5: Yup.string().max(100),
            number_lane_5: Yup.string().max(100),
            order_5: Yup.string().max(100),
            junction_id: Yup.string(),
            // areaID: Yup.string()
        }),
        onSubmit: async (values) => {
            // console.log(values)
            let temp = values
            temp.order_1 = 1
            temp.order_2 = 2
            temp.order_3 = 3
            temp.order_4 = 4
            temp.order_5 = 5
            // console.log(temp)
            setConfig(temp)
            handleClose()
        },
    });

    const menuList = [
        {
            value: 3,
            label: '3 ?????????',
        },
        {
            value: 4,
            label: '4 ?????????',
        }
    ];
    return (
        <Page
            className={classes.root}
            title="Junction_Detail"
        >
            <Grid
                className={classes.container}
            >
                {userPermiss != null && userPermiss.length != 0 && (userPermiss[0].edit == true || userPermiss[0].view == true) && <Grid
                    className={classes.topGrid}
                >
                    <form onSubmit={formik.handleSubmit}>
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
                                        className={classes.mapGrid}
                                    >
                                        {contentMap != null && contentMap}
                                    </Grid>
                                    <Grid
                                        className={classes.contentGrid}
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
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && <TextField
                                            error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                            helperText={formik.touched.junctionName && formik.errors.junctionName}
                                            className={classes.textField_name}
                                            label="???????????????????????????????????????????????????"
                                            variant="outlined"
                                            name="junctionName"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.junctionName}
                                            margin="normal"
                                        />}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && <TextField
                                            className={classes.selectField}
                                            id="outlined-select-menu"
                                            select
                                            name="number_channel"
                                            label="????????????????????????"
                                            value={formik.values.number_channel}
                                            onChange={handleChangeManu}
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {menuList.map((option) => (
                                                <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && <TextField
                                            error={Boolean(formik.touched.lat && formik.errors.lat)}
                                            helperText={formik.touched.lat && formik.errors.lat}
                                            className={classes.textField_location}
                                            label="?????????????????????????????????????????? (Lattitude)"
                                            variant="outlined"
                                            name="lat"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lat}
                                            margin="normal"
                                        />}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && <TextField
                                            error={Boolean(formik.touched.lng && formik.errors.lng)}
                                            helperText={formik.touched.lng && formik.errors.lng}
                                            className={classes.textField_location}
                                            label="?????????????????????????????????????????? (Longitude)"
                                            variant="outlined"
                                            name="lng"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lng}
                                            margin="normal"
                                        />}




                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && userPermiss[0].edit == false && <TextField
                                            error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                            helperText={formik.touched.junctionName && formik.errors.junctionName}
                                            className={classes.textField_name}
                                            label="???????????????????????????????????????????????????"
                                            variant="outlined"
                                            name="junctionName"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.junctionName}
                                            margin="normal"
                                            disabled
                                        />}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && userPermiss[0].edit == false && <TextField
                                            className={classes.selectField}
                                            id="outlined-select-menu"
                                            select
                                            name="number_channel"
                                            label="????????????????????????"
                                            value={formik.values.number_channel}
                                            onChange={handleChangeManu}
                                            variant="outlined"
                                            margin="normal"
                                            disabled
                                        >
                                            {menuList.map((option) => (
                                                <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && userPermiss[0].edit == false && <TextField
                                            error={Boolean(formik.touched.lat && formik.errors.lat)}
                                            helperText={formik.touched.lat && formik.errors.lat}
                                            className={classes.textField_location}
                                            label="?????????????????????????????????????????? (Lattitude)"
                                            variant="outlined"
                                            name="lat"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lat}
                                            margin="normal"
                                            disabled
                                        />}
                                        {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && userPermiss[0].edit == false && <TextField
                                            error={Boolean(formik.touched.lng && formik.errors.lng)}
                                            helperText={formik.touched.lng && formik.errors.lng}
                                            className={classes.textField_location}
                                            label="?????????????????????????????????????????? (Longitude)"
                                            variant="outlined"
                                            name="lng"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lng}
                                            margin="normal"
                                            disabled
                                        />}
                                        {/* <Button
                                            className={classes.buttonConfig}
                                            onClick={() => setOpen(true)}
                                        // type='submit'
                                        >
                                            ???????????????????????????????????????????????????
                                        </Button> */}
                                        {/* <ReportTable number_channel={formik.values.number_channel} channel={channel} pathID={pathID} formik={formik} /> */}
                                        <Grid
                                            className={classes.top_icon}
                                        >
                                            {userPermiss != null && userPermiss.length != 0 && userPermiss[0].edit == true && <Button
                                                className={classes.buttonGrid}
                                                // onClick={() => window.location.reload(false)}
                                                type='submit'
                                            >
                                                ????????????????????????????????????
                                            </Button>}
                                            {userPermiss != null && userPermiss.length != 0 && userPermiss[0].delet == true && <Button
                                                className={classes.deleteGrid}
                                                onClick={() => setAlertOpen(true)}
                                            // type='submit'
                                            >
                                                ????????????????????????
                                            </Button>}
                                        </Grid>
                                    </Grid>
                                    {/* <MyMap /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>}
                {userPermiss != null && (userPermiss.length == 0 || userPermiss[0].view == false) &&
                    < Grid
                        style={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}
                    >
                        <Typography
                            variant='h3'
                            style={{ marginTop: '20%' }}
                        >
                            ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </Typography>
                    </Grid>}
                <Dialog
                    open={alertOpen}
                    onClose={handleCloseAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        ??????????????????????????????????????????????????????
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAlert}>??????????????????</Button>
                        <Button onClick={deleteSubmit} autoFocus>
                            ????????????
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Page >
    );
};

export default EditJunction;