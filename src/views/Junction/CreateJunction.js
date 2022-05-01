import React, { useEffect, useState } from 'react';
import {
    Container,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ReportView from './ReportTable';
import SearchTable from './SearchTable';
import ReportTable from './ReportTable';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { junctionService } from '../../services/junction.service';
import { Assignment, RotateRight } from '@material-ui/icons';
import MyMap from './LocationSearch';
import { channelService } from '../../services/channel.service';
import { planService } from '../../services/plan.service';
import { controlService } from '../../services/control.service';
// import ManagementTable from '../../components/table/manageTable';
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
        marginLeft: '40%',
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
        // marginRight: '10%'
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

const CreateJunction = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState()
    const [channel, setChannel] = useState(0)
    const [globalPosition, setGlobalPosition] = useState([])
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [imgPath_1, setImgPath_1] = useState(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_2, setImgPath_2] = useState(<img src='/static/Mock-up_3way2_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_3, setImgPath_3] = useState(<img src='/static/Mock-up_3way3_0degree.png' width={imgWid} height={imgHei} />)
    const [imgPath_4, setImgPath_4] = useState(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
    const [imgPath_5, setImgPath_5] = useState(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
    var imgWid = '310.5px'
    var imgHei = '247.5px'
    const [degree, setDegree] = useState(0)
    const [menu, setMenu] = useState(3);
    const handleClose = () => {
        setOpen(false)
    }
    const formik = useFormik({
        initialValues: {
            junctionName: '',
            lat: '',
            lng: '',
            number_channel: 3,
            areaID: 5,
            // ipAddress: '',
        },
        validationSchema: Yup.object({
            junctionName: Yup.string().max(100).required('กรุณากรอกชื่อของแยกสัญญาณ'),
            lat: Yup.string().max(100).required(),
            lng: Yup.string().max(100).required(),
            number_channel: Yup.string(),
            // areaID: Yup.string()
        }),
        onSubmit: async (values) => {

            console.log(values)
            const res = await junctionService.createJunction({
                "name": values.junctionName,
                "latitude": parseFloat(values.lat),
                "longitude": parseFloat(values.lng),
                "number_channel": values.number_channel,
                "area_id": values.areaID,
                "rotate": degree
            })
            // console.log(channel)
            if (values.number_channel == 3) {
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 1,
                    "junction_id": res.id
                }).then((data) => {
                    console.log(data)
                })
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 2,
                    "junction_id": res.id
                })
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 3,
                    "junction_id": res.id
                })
            }
            else if (values.number_channel == 4) {
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 1,
                    "junction_id": res.id
                })
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 2,
                    "junction_id": res.id
                })
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 3,
                    "junction_id": res.id
                })
                await channelService.createChannel({
                    "name": "",
                    "number_lane": 1,
                    "order": 4,
                    "junction_id": res.id
                })
            }

            await planService.createPlan({
                "name": "ALLRED",
                "yellow_time": 3,
                "delay_red_time": 0,
                "junction_id": res.id
            })
            const planRes = await planService.createPlan({
                "name": "FLASHING",
                "yellow_time": 3,
                "delay_red_time": 0,
                "junction_id": res.id
            })
            // const dateStart = new Date().setHours(0, 0, 0)
            // const dateEnd = new Date().setHours(5, 0, 0)
            // await controlService.createFixtime({
            //     "start": new Date(dateStart),
            //     "end": new Date(dateEnd),
            //     "junction_id": res.id,
            //     "plan_id": planRes.id,
            // })
            // navigate(`/app/junction`, { replace: true });

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
            name_1: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_1: Yup.string().max(100).required('โปรดกรอกเลน'),
            order_1: Yup.string().max(100),
            name_2: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_2: Yup.string().max(100).required('โปรดกรอกเลน'),
            order_2: Yup.string().max(100),
            name_3: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_3: Yup.string().max(100).required('โปรดกรอกเลน'),
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
            setChannel(temp)
            handleClose()
            // setChannel(values)
            // if (status == 0) {
            //     await channelService.createChannel({
            //         "name": values.name_1,
            //         "number_lane": parseInt(values.number_lane_1),
            //         "order": 1,
            //         "junction_id": pathID
            //     })
            //     await channelService.createChannel({
            //         "name": values.name_2,
            //         "number_lane": parseInt(values.number_lane_2),
            //         "order": 2,
            //         "junction_id": pathID
            //     })
            //     await channelService.createChannel({
            //         "name": values.name_3,
            //         "number_lane": parseInt(values.number_lane_3),
            //         "order": 3,
            //         "junction_id": pathID
            //     })
            //     handleClose();
            // }
            // else if (status == 1) {
            //     await channelService.updateChannel({
            //         "name": values.name_1,
            //         "number_lane": parseInt(values.number_lane_1),
            //         "order": 1,
            //         "junction_id": pathID
            //     }, channel[0].id)

            //     await channelService.createChannel({
            //         "name": values.name_2,
            //         "number_lane": parseInt(values.number_lane_2),
            //         "order": 2,
            //         "junction_id": pathID
            //     })

            //     await channelService.createChannel({
            //         "name": values.name_3,
            //         "number_lane": parseInt(values.number_lane_3),
            //         "order": 3,
            //         "junction_id": pathID
            //     })
            //     handleClose();
            // }
            // else if (status == 2) {
            //     await channelService.updateChannel({
            //         "name": values.name_1,
            //         "number_lane": parseInt(values.number_lane_1),
            //         "order": 1,
            //         "junction_id": pathID
            //     }, channel[0].id)

            //     await channelService.updateChannel({
            //         "name": values.name_2,
            //         "number_lane": parseInt(values.number_lane_2),
            //         "order": 2,
            //         "junction_id": pathID
            //     }, channel[1].id)

            //     await channelService.createChannel({
            //         "name": values.name_3,
            //         "number_lane": parseInt(values.number_lane_3),
            //         "order": 3,
            //         "junction_id": pathID
            //     })
            //     handleClose();
            // }
            // else if (status == 3) {
            //     await channelService.updateChannel({
            //         "name": values.name_1,
            //         "number_lane": parseInt(values.number_lane_1),
            //         "order": 1,
            //         "junction_id": pathID
            //     }, channel[0].id)

            //     await channelService.updateChannel({
            //         "name": values.name_2,
            //         "number_lane": parseInt(values.number_lane_2),
            //         "order": 2,
            //         "junction_id": pathID
            //     }, channel[1].id)

            //     await channelService.updateChannel({
            //         "name": values.name_3,
            //         "number_lane": parseInt(values.number_lane_3),
            //         "order": 3,
            //         "junction_id": pathID
            //     }, channel[2].id)
            //     handleClose();
            // }
        },
    });

    const handleChangeManu = (event) => {
        setMenu(event.target.value);
    };
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

    useEffect(() => {
        if (degree >= 360) {
            setDegree(0)
        }

        // setImgRotate(<img src={`/static/junction/${props.number_channel}way${degree}degree.jpg`} width='818px' height='660px' />)
        // setDegree(360 / temp)
        // console.log(degree)
        if (menu == 3) {
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
        else if (menu == 4) {
            setImgPath_1(<img src={`/static/Mock-up_4way${degree}.png`} width={imgWid} height={imgHei} />)
            setImgPath_2(<img src={`/static/Mock-up_4way${(degree + 90) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_3(<img src={`/static/Mock-up_4way${(degree + 180) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_4(<img src={`/static/Mock-up_4way${(degree + 270) % 360}.png`} width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
        }
    }, [degree])

    useEffect(() => {
        if (globalPosition != []) {
            var temp = formik.values
            temp.lat = globalPosition[0]
            temp.lng = globalPosition[1]
            formik.setValues(temp)
        }
    }, [globalPosition])

    useEffect(() => {
        let temp = {
            junctionName: formik.values.junctionName,
            lat: formik.values.lat,
            lng: formik.values.lng
        }
        formik.setValues({
            number_channel: menu,
            areaID: 5,
            junctionName: temp.junctionName,
            lat: temp.lat,
            lng: temp.lng
        })
        if (menu == 3) {
            setImgPath_1(<img src='/static/Mock-up_3way1_0degree.png' width={imgWid} height={imgHei} />)
            setImgPath_2(<img src='/static/Mock-up_3way2_0degree.png' width={imgWid} height={imgHei} />)
            setImgPath_3(<img src='/static/Mock-up_3way3_0degree.png' width={imgWid} height={imgHei} />)
            setImgPath_4(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     let temp = {
            //         name_4: "empty",
            //         number_lane_4: "empty",
            //         name_5: "empty",
            //         number_lane_5: "empty",
            //     }
            //     let temp_2 = channel_Formik.values
            //     channel_Formik.setValues({
            //         name_1: temp_2.name_1,
            //         number_lane_1: temp_2.number_lane_1,
            //         order_1: temp_2.order_1,
            //         name_2: temp_2.name_2,
            //         number_lane_2: temp_2.number_lane_2,
            //         order_2: temp_2.order_2,
            //         name_3: temp_2.name_3,
            //         number_lane_3: temp_2.number_lane_3,
            //         order_3: temp_2.order_3,
            //         name_4: temp.name_4,
            //         number_lane_4: temp.number_lane_4,
            //         order_4: temp_2.order_4,
            //         name_5: temp.name_5,
            //         number_lane_5: temp.number_lane_5,
            //         order_5: temp_2.order_5,
            //         junction_id: temp_2.junction_id
            // })
        }
        else if (menu == 4) {
            setImgPath_1(<img src='/static/Mock-up_4way0.png' width={imgWid} height={imgHei} />)
            setImgPath_2(<img src='/static/Mock-up_4way90.png' width={imgWid} height={imgHei} />)
            setImgPath_3(<img src='/static/Mock-up_4way180.png' width={imgWid} height={imgHei} />)
            setImgPath_4(<img src='/static/Mock-up_4way270.png' width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            //     let temp = {
            //         name_5: "empty",
            //         number_lane_5: "empty",
            //     }
            //     let temp_2 = channel_Formik.values
            //     channel_Formik.setValues({
            //         name_1: temp_2.name_1,
            //         number_lane_1: temp_2.number_lane_1,
            //         order_1: temp_2.order_1,
            //         name_2: temp_2.name_2,
            //         number_lane_2: temp_2.number_lane_2,
            //         order_2: temp_2.order_2,
            //         name_3: temp_2.name_3,
            //         number_lane_3: temp_2.number_lane_3,
            //         order_3: temp_2.order_3,
            //         name_4: temp_2.name_4,
            //         number_lane_4: temp_2.number_lane_4,
            //         order_4: temp_2.order_4,
            //         name_5: temp.name_5,
            //         number_lane_5: temp.number_lane_5,
            //         order_5: temp_2.order_5,
            //         junction_id: temp_2.junction_id
            //     })
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
                junction_id: pathID
            })
        }

        // console.log(formik)
    }, [open])
    // useEffect(() => {
    //     let temp = {
    //         name_4: "empty",
    //         number_lane_4: "empty",
    //         name_5: "empty",
    //         number_lane_5: "empty",
    //     }
    //     let temp_2 = channel_Formik.values
    //     channel_Formik.setValues({
    //         name_1: temp_2.name_1,
    //         number_lane_1: temp_2.number_lane_1,
    //         order_1: temp_2.order_1,
    //         name_2: temp_2.name_2,
    //         number_lane_2: temp_2.number_lane_2,
    //         order_2: temp_2.order_2,
    //         name_3: temp_2.name_3,
    //         number_lane_3: temp_2.number_lane_3,
    //         order_3: temp_2.order_3,
    //         name_4: temp.name_4,
    //         number_lane_4: temp.number_lane_4,
    //         order_4: temp_2.order_4,
    //         name_5: temp.name_5,
    //         number_lane_5: temp.number_lane_5,
    //         order_5: temp_2.order_5,
    //         junction_id: temp_2.junction_id
    //     })
    // }, [])
    return (
        <Page
            className={classes.root}
            title="Junction_Detail"
        >
            <Grid
                className={classes.container}
            >
                <Grid
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
                                        <MyMap setGlobalPosition={setGlobalPosition} globalPosition={globalPosition} pathID={0} />
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
                                                ข้อมูลแยกจราจร
                                            </Typography>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                        <TextField
                                            error={Boolean(formik.touched.junctionName && formik.errors.junctionName)}
                                            helperText={formik.touched.junctionName && formik.errors.junctionName}
                                            className={classes.textField_name}
                                            label="จุดควบคุมการจราจร"
                                            variant="outlined"
                                            name="junctionName"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.junctionName}
                                            margin="normal"
                                        />
                                        <TextField
                                            className={classes.selectField}
                                            id="outlined-select-menu"
                                            select
                                            name="number_channel"
                                            label="จำนวนแยก"
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
                                        </TextField>
                                        <TextField
                                            error={Boolean(formik.touched.lat && formik.errors.lat)}
                                            helperText={formik.touched.lat && formik.errors.lat}
                                            className={classes.textField_location}
                                            label="ตำแหน่งที่ตั้ง (Lattitude)"
                                            variant="outlined"
                                            name="lat"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lat}
                                            margin="normal"
                                        />
                                        <TextField
                                            error={Boolean(formik.touched.lng && formik.errors.lng)}
                                            helperText={formik.touched.lng && formik.errors.lng}
                                            className={classes.textField_location}
                                            label="ตำแหน่งที่ตั้ง (Longitude)"
                                            variant="outlined"
                                            name="lng"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.lng}
                                            margin="normal"
                                        />
                                        {/* <Button
                                            className={classes.buttonConfig}
                                            onClick={() => setOpen(true)}
                                        // type='submit'
                                        >
                                            ตั้งค่าช่องสัญญาณ
                                        </Button> */}
                                        {/* <ReportTable number_channel={formik.values.number_channel} channel={props.channel} pathID={props.pathID} status={props.status} formik={formik} /> */}
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
                                    </Grid>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <Grid
                                            className={classes.titleDialog}
                                        >
                                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                ตั้งค่าช่องสัญญาณ
                                            </BootstrapDialogTitle>
                                            <Grid
                                                className={classes.top_icon}
                                            >
                                                <IconButton
                                                    onClick={() => {
                                                        setDegree(degree + 90)
                                                    }}
                                                >
                                                    <RotateRight />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <form onSubmit={channel_Formik.handleSubmit}>
                                            <DialogContent dividers>
                                                <Grid>
                                                    <Typography variant='h5' className={classes.titleText}>
                                                        ช่องทางเดินรถที่ 1
                                                    </Typography>
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.name_1 && channel_Formik.errors.name_1)}
                                                        helperText={channel_Formik.touched.name_1 && channel_Formik.errors.name_1}
                                                        className={classes.textField_name}
                                                        label="ชื่อช่องทางเดินรถ"
                                                        variant="outlined"
                                                        name="name_1"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.name_1}
                                                    />
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.number_lane_1 && channel_Formik.errors.number_lane_1)}
                                                        helperText={channel_Formik.touched.number_lane_1 && channel_Formik.errors.number_lane_1}
                                                        name="number_lane_1"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.number_lane_1}
                                                        className={classes.textField_lane}
                                                        label="จำนวนเลน"
                                                        variant="outlined"
                                                    />
                                                    <Grid
                                                        className={classes.channelImg}
                                                    >
                                                        {/* <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' /> */}
                                                        {menu >= 3 && imgPath_1}
                                                    </Grid>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant='h5' className={classes.titleText}>
                                                        ช่องทางเดินรถที่ 2
                                                    </Typography>
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.name_2 && channel_Formik.errors.name_2)}
                                                        helperText={channel_Formik.touched.name_2 && channel_Formik.errors.name_2}
                                                        className={classes.textField_name}
                                                        label="ชื่อช่องทางเดินรถ"
                                                        variant="outlined"
                                                        name="name_2"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.name_2}
                                                    />
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.number_lane_2 && channel_Formik.errors.number_lane_2)}
                                                        helperText={channel_Formik.touched.number_lane_2 && channel_Formik.errors.number_lane_2}
                                                        name="number_lane_2"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.number_lane_2}
                                                        className={classes.textField_lane}
                                                        label="จำนวนเลน"
                                                        variant="outlined"
                                                    />
                                                    <Grid
                                                        className={classes.channelImg}
                                                    >
                                                        {/* <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' /> */}
                                                        {menu >= 3 && imgPath_2}
                                                    </Grid>
                                                </Grid>
                                                <Grid>
                                                    <Typography variant='h5' className={classes.titleText}>
                                                        ช่องทางเดินรถที่ 3
                                                    </Typography>
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.name_3 && channel_Formik.errors.name_3)}
                                                        helperText={channel_Formik.touched.name_3 && channel_Formik.errors.name_3}
                                                        className={classes.textField_name}
                                                        label="ชื่อช่องทางเดินรถ"
                                                        variant="outlined"
                                                        name="name_3"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.name_3}
                                                    />
                                                    <TextField
                                                        error={Boolean(channel_Formik.touched.number_lane_3 && channel_Formik.errors.number_lane_3)}
                                                        helperText={channel_Formik.touched.number_lane_3 && channel_Formik.errors.number_lane_3}
                                                        name="number_lane_3"
                                                        onBlur={channel_Formik.handleBlur}
                                                        onChange={channel_Formik.handleChange}
                                                        value={channel_Formik.values.number_lane_3}
                                                        className={classes.textField_lane}
                                                        label="จำนวนเลน"
                                                        variant="outlined"
                                                    />
                                                    <Grid
                                                        className={classes.channelImg}
                                                    >
                                                        {/* <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' /> */}
                                                        {menu >= 3 && imgPath_3}
                                                    </Grid>
                                                </Grid>
                                                {formik.values.number_channel >= 4 &&
                                                    <Grid>
                                                        <Typography variant='h5' className={classes.titleText}>
                                                            ช่องทางเดินรถที่ 4
                                                        </Typography>
                                                        <TextField
                                                            error={Boolean(channel_Formik.touched.name_4 && channel_Formik.errors.name_4)}
                                                            helperText={channel_Formik.touched.name_4 && channel_Formik.errors.name_4}
                                                            className={classes.textField_name}
                                                            label="ชื่อช่องทางเดินรถ"
                                                            variant="outlined"
                                                            name="name_4"
                                                            onBlur={channel_Formik.handleBlur}
                                                            onChange={channel_Formik.handleChange}
                                                            value={channel_Formik.values.name_4}
                                                        />
                                                        <TextField
                                                            error={Boolean(channel_Formik.touched.number_lane_4 && channel_Formik.errors.number_lane_4)}
                                                            helperText={channel_Formik.touched.number_lane_4 && channel_Formik.errors.number_lane_4}
                                                            name="number_lane_4"
                                                            onBlur={channel_Formik.handleBlur}
                                                            onChange={channel_Formik.handleChange}
                                                            value={channel_Formik.values.number_lane_4}
                                                            className={classes.textField_lane}
                                                            label="จำนวนเลน"
                                                            variant="outlined"
                                                        />
                                                        <Grid
                                                            className={classes.channelImg}
                                                        >
                                                            {/* <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' /> */}
                                                            {menu >= 3 && imgPath_4}
                                                        </Grid>
                                                    </Grid>
                                                }
                                                {formik.values.number_channel == 5 &&
                                                    <Grid>
                                                        <Typography variant='h5' className={classes.titleText}>
                                                            ช่องทางเดินรถที่ 5
                                                        </Typography>
                                                        <TextField
                                                            error={Boolean(channel_Formik.touched.name_5 && channel_Formik.errors.name_5)}
                                                            helperText={channel_Formik.touched.name_5 && channel_Formik.errors.name_5}
                                                            className={classes.textField_name}
                                                            label="ชื่อช่องทางเดินรถ"
                                                            variant="outlined"
                                                            name="name_5"
                                                            onBlur={channel_Formik.handleBlur}
                                                            onChange={channel_Formik.handleChange}
                                                            value={channel_Formik.values.name_5}
                                                        />
                                                        <TextField
                                                            error={Boolean(channel_Formik.touched.number_lane_5 && channel_Formik.errors.number_lane_5)}
                                                            helperText={channel_Formik.touched.number_lane_5 && channel_Formik.errors.number_lane_5}
                                                            name="number_lane_5"
                                                            onBlur={channel_Formik.handleBlur}
                                                            onChange={channel_Formik.handleChange}
                                                            value={channel_Formik.values.number_lane_5}
                                                            className={classes.textField_lane}
                                                            label="จำนวนเลน"
                                                            variant="outlined"
                                                        />
                                                        <Grid
                                                            className={classes.channelImg}
                                                        >
                                                            {/* <img src='/static/junction/3way-set-port.jpg' width='310.5px' height='247.5px' /> */}
                                                            {menu >= 3 && imgPath_5}
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus className={classes.buttonGrid} type='submit'>
                                                    บันทึก
                                                </Button>
                                            </DialogActions>
                                        </form>
                                    </BootstrapDialog>
                                    {/* <MyMap /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Page>
    );
};

export default CreateJunction;