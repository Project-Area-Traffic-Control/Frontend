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
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ReportView from './ReportTable';
import SearchTable from './SearchTable';
import ReportTable from './ReportTable';
import * as Yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { junctionService } from '../../services/junction.service';
import { Assignment, NightsStayOutlined, RotateRight } from '@material-ui/icons';
import MyMap from './LocationSearch';
import { channelService } from '../../services/channel.service';
import { planService } from '../../services/plan.service';
import { controlService } from '../../services/control.service';
import theme from '../../theme';
import { phaseService } from '../../services/phase.service';
import socketIOClient from 'socket.io-client';
import { apiConstants } from '../../_constants';
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
        marginLeft: '12.5%'
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

const ChannelManage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState()
    const [channel, setChannel] = useState(0)
    const [globalPosition, setGlobalPosition] = useState([])
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [imgPath_1, setImgPath_1] = useState(null)
    const [imgPath_2, setImgPath_2] = useState(null)
    const [imgPath_3, setImgPath_3] = useState(null)
    const [imgPath_4, setImgPath_4] = useState(null)
    const [imgPath_5, setImgPath_5] = useState(null)
    const [values, setValues] = useState(null)
    var imgWid = '310.5px'
    var imgHei = '247.5px'
    const { junction_id } = useParams()
    const [degree, setDegree] = useState(0)
    const [menu, setMenu] = useState(3);
    const [junction, setJunction] = useState(null)
    const [number_channel, setNumber_channel] = useState(null)
    const handleClose = () => {
        setOpen(false)
    }
    const [valuesName, setValuesName] = useState(null)

    const channel_Formik = useFormik({
        initialValues: {
            name_1: '',
            number_lane_1: '',
            order_1: '',
            port_1_forward: '',
            port_1_turnright: '',
            name_2: '',
            number_lane_2: '',
            order_2: '',
            port_2_forward: '',
            port_2_turnright: '',
            name_3: '',
            number_lane_3: '',
            order_3: '',
            port_3_forward: '',
            port_3_turnright: '',
            name_4: '',
            number_lane_4: '',
            order_4: '',
            port_4_forward: '',
            port_4_turnright: '',
            junction_id: junction_id,
            // ipAddress: '',

        },
        validationSchema: Yup.object({
            name_1: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_1: Yup.string().max(100).required('โปรดกรอกเลน'),
            order_1: Yup.string().max(100),
            port_1_forward: Yup.number(),
            port_1_turnright: Yup.number(),
            name_2: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_2: Yup.string().max(100).required('โปรดกรอกเลน'),
            order_2: Yup.string().max(100),
            port_2_forward: Yup.number(),
            port_2_turnright: Yup.number(),
            name_3: Yup.string().max(100).required('กรุณากรอกชื่อของช่องสัญญาณ'),
            number_lane_3: Yup.string().max(100).required('โปรดกรอกเลน'),
            order_3: Yup.string().max(100),
            port_3_forward: Yup.number(),
            port_3_turnright: Yup.number(),
            name_4: Yup.string().max(100),
            number_lane_4: Yup.string().max(100),
            order_4: Yup.string().max(100),
            port_4_forward: Yup.number(),
            port_4_turnright: Yup.number(),
            junction_id: Yup.string(),
            // areaID: Yup.string()
        }),
        onSubmit: async (values) => {
            setValues(values)
            console.log(values)
            let temp = values
            temp.order_1 = 1
            temp.order_2 = 2
            temp.order_3 = 3
            temp.order_4 = 4
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
        if (number_channel == 3) {
            if (degree == 90 || degree == 270) {
                let temp = imgHei
                imgHei = imgWid
                imgWid = temp
            }
            setImgPath_1(<img src={`/static/3way1_${degree}degree.jpg`} width="440px" height="440px" />)
            setImgPath_2(<img src={`/static/3way2_${degree}degree.jpg`} width="440px" height="440px" />)
            setImgPath_3(<img src={`/static/3way3_${degree}degree.jpg`} width="440px" height="440px" />)
            setImgPath_4(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
            setImgPath_5(<img src='/static/Mock-up_4way1.png' width={imgWid} height={imgHei} />)
        }
        else if (number_channel == 4) {
            setImgPath_1(<img src={`/static/Mock-up_4way${degree}.png`} width="440px" height="440px" />)
            setImgPath_2(<img src={`/static/Mock-up_4way${(degree + 90) % 360}.png`} width="440px" height="440px" />)
            setImgPath_3(<img src={`/static/Mock-up_4way${(degree + 180) % 360}.png`} width="440px" height="440px" />)
            setImgPath_4(<img src={`/static/Mock-up_4way${(degree + 270) % 360}.png`} width="440px" height="440px" />)
            setImgPath_5(<img src='/static/4way1.png' width={imgWid} height={imgHei} />)
        }
    }, [degree])

    const handleSubmit = async () => {
        console.log(valuesName)
        await junctionService.updateJuncionID({
            "name": junction.name,
            "latitude": parseFloat(junction.latitude),
            "longitude": parseFloat(junction.longitude),
            "number_channel": junction.number_channel,
            "area_id": 5,
            "rotate": degree
        }, junction_id)
        for (let index = 0; index < channel.length; index++) {
            await channelService.updateChannel({
                "name": valuesName[index].name,
                "number_lane": parseInt(valuesName[index].number_lane),
                "order": channel[index].order,
                "junction_id": junction_id
            }, channel[index].id)
            if (channel[index].phase.length == 0) {
                if (index == 0) {
                    if (channel.length == 3) {
                        await phaseService.createPhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_1_turnright),
                            "channel_id": channel[index].id
                        })
                    }
                    if (channel.length == 4) {
                        await phaseService.createPhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_1_forward),
                            "channel_id": channel[index].id
                        })
                        await phaseService.createPhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_1_turnright),
                            "channel_id": channel[index].id
                        })
                    }
                }
                if (index == 1) {
                    await phaseService.createPhase({
                        "type": "FORWARD",
                        "port_number": parseInt(values.port_2_forward),
                        "channel_id": channel[index].id
                    })
                    await phaseService.createPhase({
                        "type": "TURN_RIGHT",
                        "port_number": parseInt(values.port_2_turnright),
                        "channel_id": channel[index].id
                    })
                }
                if (index == 2) {
                    if (channel.length == 3) {
                        await phaseService.createPhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_3_forward),
                            "channel_id": channel[index].id
                        })
                    }
                    if (channel.length == 4) {
                        await phaseService.createPhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_3_forward),
                            "channel_id": channel[index].id
                        })
                        await phaseService.createPhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_3_turnright),
                            "channel_id": channel[index].id
                        })
                    }
                }
                if (index == 3) {
                    await phaseService.createPhase({
                        "type": "FORWARD",
                        "port_number": parseInt(values.port_4_forward),
                        "channel_id": channel[index].id
                    })
                    await phaseService.createPhase({
                        "type": "TURN_RIGHT",
                        "port_number": parseInt(values.port_4_turnright),
                        "channel_id": channel[index].id
                    })
                }
            }
            if (channel[index].phase.length == 1) {
                if (index == 0) {
                    if (channel.length == 3) {
                        console.log(values.port_1_forward)
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_1_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                    if (channel.length == 4) {
                        if (channel[index].phase[0].type == "FORWARD") {
                            await phaseService.updatePhase({
                                "type": "FORWARD",
                                "port_number": parseInt(values.port_1_forward),
                                "channel_id": channel[index].id
                            }, channel[index].phase[0].id)
                            await phaseService.createPhase({
                                "type": "TURN_RIGHT",
                                "port_number": parseInt(values.port_1_turnright),
                                "channel_id": channel[index].id
                            })
                        }
                        else {
                            await phaseService.createPhase({
                                "type": "FORWARD",
                                "port_number": parseInt(values.port_1_forward),
                                "channel_id": channel[index].id
                            })
                            await phaseService.updatePhase({
                                "type": "TURN_RIGHT",
                                "port_number": parseInt(values.port_1_turnright),
                                "channel_id": channel[index].id
                            }, channel[index].phase[0].id)
                        }
                    }
                }
                if (index == 1) {
                    if (channel[index].phase[0].type == "FORWARD") {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_2_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                        await phaseService.createPhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_2_turnright),
                            "channel_id": channel[index].id
                        })
                    }
                    else {
                        await phaseService.createPhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_2_forward),
                            "channel_id": channel[index].id
                        })
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_2_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                }
                if (index == 2) {
                    if (channel.length == 3) {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_3_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                    if (channel.length == 4) {
                        if (channel[index].phase[0].type == "FORWARD") {
                            await phaseService.updatePhase({
                                "type": "FORWARD",
                                "port_number": parseInt(values.port_3_forward),
                                "channel_id": channel[index].id
                            }, channel[index].phase[0].id)
                            await phaseService.createPhase({
                                "type": "TURN_RIGHT",
                                "port_number": parseInt(values.port_3_turnright),
                                "channel_id": channel[index].id
                            })
                        }
                        else {
                            await phaseService.createPhase({
                                "type": "FORWARD",
                                "port_number": parseInt(values.port_3_forward),
                                "channel_id": channel[index].id
                            })
                            await phaseService.updatePhase({
                                "type": "TURN_RIGHT",
                                "port_number": parseInt(values.port_3_turnright),
                                "channel_id": channel[index].id
                            }, channel[index].phase[0].id)
                        }
                    }
                }
                if (index == 3) {
                    if (channel[index].phase[0].type == "FORWARD") {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_4_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                        await phaseService.createPhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_4_turnright),
                            "channel_id": channel[index].id
                        })
                    }
                    else {
                        await phaseService.createPhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_4_forward),
                            "channel_id": channel[index].id
                        })
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_4_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                }
            }
            if (channel[index].phase.length == 2) {
                if (index == 0) {
                    if (channel.length == 3) {
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_1_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                    if (channel.length == 4) {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_1_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_1_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[1].id)
                    }
                }
                if (index == 1) {
                    await phaseService.updatePhase({
                        "type": "FORWARD",
                        "port_number": parseInt(values.port_2_forward),
                        "channel_id": channel[index].id
                    }, channel[index].phase[0].id)
                    await phaseService.updatePhase({
                        "type": "TURN_RIGHT",
                        "port_number": parseInt(values.port_2_turnright),
                        "channel_id": channel[index].id
                    }, channel[index].phase[1].id)
                }
                if (index == 2) {
                    if (channel.length == 3) {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_3_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                    }
                    if (channel.length == 4) {
                        await phaseService.updatePhase({
                            "type": "FORWARD",
                            "port_number": parseInt(values.port_3_forward),
                            "channel_id": channel[index].id
                        }, channel[index].phase[0].id)
                        await phaseService.updatePhase({
                            "type": "TURN_RIGHT",
                            "port_number": parseInt(values.port_3_turnright),
                            "channel_id": channel[index].id
                        }, channel[index].phase[1].id)
                    }
                }
                if (index == 3) {
                    await phaseService.updatePhase({
                        "type": "FORWARD",
                        "port_number": parseInt(values.port_4_forward),
                        "channel_id": channel[index].id
                    }, channel[index].phase[0].id)
                    await phaseService.updatePhase({
                        "type": "TURN_RIGHT",
                        "port_number": parseInt(values.port_4_turnright),
                        "channel_id": channel[index].id
                    }, channel[index].phase[1].id)
                }
            }

        }

        console.log(junction_id)
        const socket = socketIOClient(apiConstants.socketUri, { path: "/socket" });
        var data = {
            junction_id: junction_id,
            type: "CHANNEL",
        }
        socket.on('connect', (socketIO) => {
            console.log(socketIO)
            socket.emit("update:setting", data)
        })

        console.log(socket)
        navigate(`/app/junction/${junction_id}`, { replace: true });
    }
    useEffect(() => {
        // console.log(props.channel.length)
        // if (open == true) {
        //     setStatus(channel.length)
        //     channel_Formik.setValues({
        //         name_1: channel[0]?.name,
        //         number_lane_1: channel[0]?.nunmber_lane,
        //         order_1: channel[0]?.order,
        //         name_2: channel[1]?.name,
        //         number_lane_2: channel[1]?.nunmber_lane,
        //         order_2: channel[1]?.order,
        //         name_3: channel[2]?.name,
        //         number_lane_3: channel[2]?.nunmber_lane,
        //         order_3: channel[2]?.order,
        //         junction_id: pathID
        //     })
        // }
        console.log(channel_Formik.values)
        if (channel.length == 3) {
            setValuesName([{
                name: channel_Formik.values.name_1,
                number_lane: channel_Formik.values.number_lane_1
            },
            {
                name: channel_Formik.values.name_2,
                number_lane: channel_Formik.values.number_lane_2
            },
            {
                name: channel_Formik.values.name_3,
                number_lane: channel_Formik.values.number_lane_3
            }])
        }
        if (channel.length == 4) {
            setValuesName([{
                name: channel_Formik.values.name_1,
                number_lane: channel_Formik.values.number_lane_1
            },
            {
                name: channel_Formik.values.name_2,
                number_lane: channel_Formik.values.number_lane_2
            },
            {
                name: channel_Formik.values.name_3,
                number_lane: channel_Formik.values.number_lane_3
            },
            {
                name: channel_Formik.values.name_4,
                number_lane: channel_Formik.values.number_lane_4
            }])
        }
        setValues(channel_Formik.values)
        // console.log(formik)
    }, [channel_Formik.values])
    useEffect(() => {
        channelService.getChannelByJunctionID(junction_id).then((data) => {
            setChannel(data)
            console.log(data)
            channel_Formik.setValues({
                name_1: data[0]?.name,
                number_lane_1: data[0]?.number_lane,
                order_1: data[0]?.order,
                port_1_forward: data[0]?.phase[1]?.port_number,
                port_1_turnright: data[0]?.phase[0]?.port_number,
                name_2: data[1].name,
                number_lane_2: data[1]?.number_lane,
                order_2: data[1]?.order,
                port_2_forward: data[1]?.phase[0]?.port_number,
                port_2_turnright: data[1]?.phase[1]?.port_number,
                name_3: data[2]?.name,
                number_lane_3: data[2]?.number_lane,
                order_3: data[2]?.order,
                port_3_forward: data[2]?.phase[0]?.port_number,
                port_3_turnright: data[2]?.phase[1]?.port_number,
                name_4: data[3]?.name,
                number_lane_4: data[3]?.number_lane,
                order_4: data[3]?.order,
                port_4_forward: data[3]?.phase[0]?.port_number,
                port_4_turnright: data[3]?.phase[1]?.port_number,
                junction_id: junction_id,
            })
            if (data.length == 3) {
                setImgPath_1(<img src={`/static/3way1_${degree}degree.jpg`} width="440px" height="440px" />)
                setImgPath_2(<img src={`/static/3way2_${degree}degree.jpg`} width="440px" height="440px" />)
                setImgPath_3(<img src={`/static/3way3_${degree}degree.jpg`} width="440px" height="440px" />)
            }
            if (data.length == 4) {
                setImgPath_1(<img src={`/static/Mock-up_4way${degree}.png`} width="440px" height="440px" />)
                setImgPath_2(<img src={`/static/Mock-up_4way${(degree + 90) % 360}.png`} width="440px" height="440px" />)
                setImgPath_3(<img src={`/static/Mock-up_4way${(degree + 180) % 360}.png`} width="440px" height="440px" />)
                setImgPath_4(<img src={`/static/Mock-up_4way${(degree + 270) % 360}.png`} width="440px" height="440px" />)
            }
        })
        junctionService.getJunctionByID(junction_id).then((data) => {
            console.log(data)
            setNumber_channel(data.number_channel)
            setJunction(data)
            setDegree(data.rotate)
        })
        // location.pathname.u
        // console.log(junction_id)
    }, [location.pathname])
    return (
        <Page
            className={classes.root}
            title="Channel Manage"
        >
            <Grid
                className={classes.container}
            >
                <Grid
                    className={classes.topGrid}
                >

                    <Grid
                        className={classes.top}
                    >
                        <Grid
                            className={classes.topLeft}
                        >
                            <Grid
                                className={classes.textFieldLeft}
                            >
                                {channel != 0 && < Grid
                                    className={classes.mapGrid}
                                // style={{ backgroundColor: '#ffffff' }}
                                >
                                    <form onSubmit={channel_Formik.handleSubmit}>
                                        <Grid
                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                        >
                                            <Grid
                                                // className={classes.titleGrid}
                                                style={{ width: '100%', marginLeft: '2%', marginBottom: theme.spacing(2), display: 'flex' }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    // className={classes.titleLeft}
                                                    style={{ height: '50px', paddingTop: theme.spacing(2), width: '25%' }}
                                                >
                                                    ข้อมูลช่องสัญญาณจราจรที่ 1
                                                </Typography>
                                                <Grid
                                                    style={{ width: '70%', display: 'flex', justifyContent: 'flex-end', height: '100%', marginTop: theme.spacing(2) }}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            setDegree(degree + 90)
                                                        }}
                                                        style={{ display: 'flex', height: '100%', alignContent: 'center', border: '2px solid #287298' }}
                                                    >
                                                        <Grid
                                                            style={{ display: 'flex', height: '100%', alignContent: 'center' }}
                                                        >
                                                            หมุนรูปภาพ<RotateRight />
                                                        </Grid>

                                                    </Button>

                                                </Grid>
                                            </Grid>
                                            <Divider className={classes.divider} />
                                            <Grid
                                                style={{ width: '80%', marginLeft: '10%', display: 'flex' }}
                                            >
                                                <Grid
                                                    style={{ width: '50%', display: 'flex', justifyContent: 'center', marginTop: theme.spacing(5), marginBottom: theme.spacing(5) }}
                                                >
                                                    {/* <img src='/static/Mock-up_4way0.png' width='440px' height='440px' /> */}
                                                    {imgPath_1}
                                                </Grid>
                                                <Grid
                                                    style={{ width: '50%' }}
                                                >
                                                    <Grid
                                                        style={{ width: '80%', marginLeft: '10%' }}
                                                    >
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5) }}
                                                            fullWidth
                                                            margin="normal"
                                                            name="name_1"
                                                            onChange={channel_Formik.handleChange}
                                                            variant="outlined"
                                                            label="ชื่อช่องสัญญาณที่ 1"
                                                            defaultValue={channel[0].name}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '60%' }}
                                                            // fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="จำนวนเลน"
                                                            name="number_lane_1"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[0].number_lane}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%' }}
                                                            // fullWidth
                                                            name="port_1_turnright"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port เลี้ยวขวา"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[0]?.phase[0]?.port_number}
                                                        />
                                                        {channel.length == 4 && <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%', marginLeft: '2%' }}
                                                            // fullWidth
                                                            name="port_1_forward"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port ทางตรง"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[0]?.phase[1]?.port_number}
                                                        />}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            style={{ width: '100%', backgroundColor: '#ffffff', marginTop: theme.spacing(3) }}
                                        >
                                            <Grid
                                                // className={classes.titleGrid}
                                                style={{ width: '100%', marginLeft: '2%', marginBottom: theme.spacing(2) }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    // className={classes.titleLeft}
                                                    style={{ height: '50px', paddingTop: theme.spacing(2) }}
                                                >
                                                    ข้อมูลช่องสัญญาณจราจรที่ 2
                                                </Typography>
                                            </Grid>
                                            <Divider className={classes.divider} />
                                            <Grid
                                                style={{ width: '80%', marginLeft: '10%', display: 'flex' }}
                                            >
                                                <Grid
                                                    style={{ width: '50%', display: 'flex', justifyContent: 'center', marginTop: theme.spacing(5), marginBottom: theme.spacing(5) }}
                                                >
                                                    {/* <img src='/static/Mock-up_4way0.png' width='440px' height='440px' /> */}
                                                    {imgPath_2}
                                                </Grid>
                                                <Grid
                                                    style={{ width: '50%' }}
                                                >
                                                    <Grid
                                                        style={{ width: '80%', marginLeft: '10%' }}
                                                    >
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5) }}
                                                            fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ชื่อช่องสัญญาณที่ 2"
                                                            name="name_2"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[1].name}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '60%' }}
                                                            // fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            name="number_lane_2"
                                                            onChange={channel_Formik.handleChange}
                                                            label="จำนวนเลน"
                                                            defaultValue={channel[1].number_lane}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%' }}
                                                            // fullWidth
                                                            name="port_2_forward"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port ทางตรง"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[1]?.phase[0]?.port_number}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%', marginLeft: '2%' }}
                                                            // fullWidth
                                                            name="port_2_turnright"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port เลี้ยวขวา"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[1]?.phase[1]?.port_number}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            style={{ width: '100%', backgroundColor: '#ffffff', marginTop: theme.spacing(3) }}
                                        >
                                            <Grid
                                                // className={classes.titleGrid}
                                                style={{ width: '100%', marginLeft: '2%', marginBottom: theme.spacing(2) }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    // className={classes.titleLeft}
                                                    style={{ height: '50px', paddingTop: theme.spacing(2) }}
                                                >
                                                    ข้อมูลช่องสัญญาณจราจรที่ 3
                                                </Typography>
                                            </Grid>
                                            <Divider className={classes.divider} />
                                            <Grid
                                                style={{ width: '80%', marginLeft: '10%', display: 'flex' }}
                                            >
                                                <Grid
                                                    style={{ width: '50%', display: 'flex', justifyContent: 'center', marginTop: theme.spacing(5), marginBottom: theme.spacing(5) }}
                                                >
                                                    {/* <img src='/static/Mock-up_4way0.png' width='440px' height='440px' /> */}
                                                    {imgPath_3}

                                                </Grid>
                                                <Grid
                                                    style={{ width: '50%' }}
                                                >
                                                    <Grid
                                                        style={{ width: '80%', marginLeft: '10%' }}
                                                    >
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5) }}
                                                            fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ชื่อช่องสัญญาณที่ 3"
                                                            name="name_3"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[2].name}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '60%' }}
                                                            // fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="จำนวนเลน"
                                                            name="number_lane_3"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[2].number_lane}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%' }}
                                                            // fullWidth
                                                            name="port_3_forward"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port ทางตรง"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[2]?.phase[0]?.port_number}
                                                        />
                                                        {channel.length == 4 && <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%', marginLeft: '2%' }}
                                                            // fullWidth
                                                            name="port_3_turnright"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port เลี้ยวขวา"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[2]?.phase[1]?.port_number}
                                                        />}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {channel.length == 4 && <Grid
                                            style={{ width: '100%', backgroundColor: '#ffffff', marginTop: theme.spacing(3) }}
                                        >
                                            <Grid
                                                // className={classes.titleGrid}
                                                style={{ width: '100%', marginLeft: '2%', marginBottom: theme.spacing(2) }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    // className={classes.titleLeft}
                                                    style={{ height: '50px', paddingTop: theme.spacing(2) }}
                                                >
                                                    ข้อมูลช่องสัญญาณจราจรที่ 4
                                                </Typography>
                                            </Grid>
                                            <Divider className={classes.divider} />
                                            <Grid
                                                style={{ width: '80%', marginLeft: '10%', display: 'flex' }}
                                            >
                                                <Grid
                                                    style={{ width: '50%', display: 'flex', justifyContent: 'center', marginTop: theme.spacing(5), marginBottom: theme.spacing(5) }}
                                                >
                                                    {/* <img src='/static/Mock-up_4way0.png' width='440px' height='440px' /> */}
                                                    {imgPath_4}

                                                </Grid>
                                                <Grid
                                                    style={{ width: '50%' }}
                                                >
                                                    <Grid
                                                        style={{ width: '80%', marginLeft: '10%' }}
                                                    >
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5) }}
                                                            fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ชื่อช่องสัญญาณที่ 3"
                                                            name="name_4"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[3].name}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '60%' }}
                                                            // fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="จำนวนเลน"
                                                            name="number_lane_4"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[3].number_lane}
                                                        />
                                                        <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%' }}
                                                            // fullWidth
                                                            name="port_4_forward"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port ทางตรง"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[3]?.phase[0]?.port_number}
                                                        />
                                                        {channel.length == 4 && <TextField
                                                            style={{ marginTop: theme.spacing(5), width: '49%', marginLeft: '2%' }}
                                                            // fullWidth
                                                            name="port_4_turnright"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="ตั้งค่า Port เลี้ยวขวา"
                                                            onChange={channel_Formik.handleChange}
                                                            defaultValue={channel[3]?.phase[1]?.port_number}
                                                        />}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>}
                                        <Grid
                                            style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: theme.spacing(5), marginBottom: theme.spacing(5) }}
                                        >
                                            <Button
                                                style={{ width: '110px', height: '43px', backgroundColor: '#287298', color: '#FFFFFF', display: 'flex', justifyContent: 'center', alignContent: 'center', borderRadius: '13px' }}
                                                // type='submit'
                                                onClick={handleSubmit}
                                            >
                                                บันทึก
                                            </Button>
                                        </Grid>
                                    </form>
                                    {/* <MyMap setGlobalPosition={setGlobalPosition} globalPosition={globalPosition} pathID={0} /> */}
                                </Grid>}
                                {/* <Grid
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
                                        <Button
                                            className={classes.buttonConfig}
                                            onClick={() => setOpen(true)}
                                        // type='submit'
                                        >
                                            ตั้งค่าช่องสัญญาณ
                                        </Button>
                                        <Grid
                                            className={classes.top_icon}
                                        >
                                            <Button
                                                className={classes.buttonGrid}
                                                type='submit'
                                            >
                                                บันทึกข้อมูล
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                                {/* <MyMap /> */}
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid >
        </Page >
    );
};

export default ChannelManage;