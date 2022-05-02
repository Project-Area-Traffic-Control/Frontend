import { React, useEffect, useState } from 'react';
import {
    Button,
    Collapse,
    Grid,
    List,
    ListItem,
    makeStyles
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import socketIOClient from 'socket.io-client';
import { EditOutlined, ExpandLess, ExpandMore } from '@material-ui/icons';
import NavItem from '../../layouts/DashboardLayout/NavBar/NavItem';
import { apiConstants } from '../../../src/_constants'

// const ENDPOINT = "http://localhost:3000";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: theme.spacing(5),
        width: '100%',
        display: 'flex'
    },
    container_1: {
        width: '80%',
        height: '64vh',
        // display: 'flex',
        paddingLeft: theme.spacing(15),
        // backgroundColor: '#ffffff'
    },
    container_2: {
        width: '18%',
        height: '64vh',
        // display: 'flex',
        backgroundColor: '#FFFFFF',
        paddingRight: theme.spacing(5),
    },
    titleGrid: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3)
        // backgroundColor: '#000000',
        // display: 'flex'
    },
    content: {
        width: '100%',
        // display: 'flex',
        // marginLeft: '10%',
        // marginTop: theme.spacing(5)
    },
    button: {
        width: '100%',
        display: 'flex',
        // marginLeft: '10%',
        // marginTop: theme.spacing(5)
    },
    detail: {
        width: '100%',
        paddingLeft: theme.spacing(6),
        marginTop: theme.spacing(2)
    },
    editButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(5),
        display: 'flex',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        color: '#FFFFFF',
    },
    buttonGrid: {
        marginTop: theme.spacing(5),
        display: 'flex',
        width: '50%',
        height: '52px',
        borderRadius: '13px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        marginLeft: '40%',
        color: '#FFFFFF',
        fontSize: '12px'
    },
    top_icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        // backgroundColor: '#000000'
        // marginRight: '10%'
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    drawer: {
        // marginTop: theme.spacing(4),
        width: 240,
        flexShrink: 0,

    },
    drawerPaper: {
        marginTop: theme.spacing(8),
        // justifyContent: 'center',
        alignItems: 'center',
        width: 240,
    },
    listItem: {
        color: '#ffffff',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    textField: {
        marginBottom: theme.spacing(1),
        margin: theme.spacing(1),

    },
    paper: {
        padding: theme.spacing(2),
        display: "flex-end",
        minHeight: "400px",
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    typography: {
        marginBottom: theme.spacing(3),
        textAlign: "center",
        width: "100%",
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',
        // height: '380px',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    gridDetail: {
        // marginLeft: theme.spacing(3),
        display: 'flex-between',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: theme.spacing(3)
    },
    detailText: {
        marginBottom: theme.spacing(3),

    },
}));

const Monitor = (props) => {
    const classes = useStyles();
    const [device1, setDevice1] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [device2, setDevice2] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [device3, setDevice3] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [device4, setDevice4] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [device5, setDevice5] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [device6, setDevice6] = useState({
        CAMERA: "",
        IMAGE: "",
        LICENSEPLATE: "",
        PROVINCE: "",
        IP: ""
    })
    const [open, setOpen] = useState([])
    const [camID, setCamID] = useState(1)
    const toggleDetail = (ind) => {
        var temp = open
        for (let index = 0; index < temp.length; index++) {
            if (ind == index) {
                temp[ind] = !temp[ind]
            }
            setOpen(temp)
        }
    }
    // const response = () => {
    //     const socket = socketIOClient("http://localhost:3000")
    //     socket.on('Device11', (messageNew) => {
    //         console.log("Message", messageNew)
    //     })
    //     socket.on('connection', () => {
    //         console.log("Client connect")
    //     })
    //     console.log(socket)
    // }
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     var socketON = `camera${camID}:send`;
    //     console.log(socketON)
    //     socket.on(socketON, data => {
    //         console.log("Message", data)
    //         setDevice1({
    //             // CAMERA: data.CAMERA,
    //             IMAGE: 'data:image/png;base64,' + data.capture,
    //             // LICENSEPLATE: data.LICENSEPLATE,
    //             // PROVINCE: data.PROVINCE,
    //             // IP: data.IP
    //         })
    //         // console.info('NEWDATA')
    //     });
    //     var temp = []
    //     for (let index = 0; index < 3; index++) {
    //         temp.push(false)
    //     }
    //     setOpen(temp)
    // }, [])

    useEffect(() => {
        // socket.
        const socket = socketIOClient(apiConstants.socketUri);
        var socketON = `camera${camID}:send`;
        console.log(socketON)
        if (camID == 1) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice1({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }
        if (camID == 2) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice2({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }
        if (camID == 3) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice3({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }
        if (camID == 4) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice4({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }
        if (camID == 5) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice5({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }
        if (camID == 6) {
            socket.on(socketON, data => {
                console.log("Message", data)
                setDevice6({
                    // CAMERA: data.CAMERA,
                    IMAGE: 'data:image/png;base64,' + data.capture,
                    // LICENSEPLATE: data.LICENSEPLATE,
                    // PROVINCE: data.PROVINCE,
                    // IP: data.IP
                })
                // console.info('NEWDATA')
            });
        }

    }, [camID])
    return (
        <Grid
            className={classes.root}
        >
            <Grid
                className={classes.container_1}
            >
                <Grid item className={classes.grid}>
                    {camID == 1 && <img src={device1.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {camID == 2 && <img src={device2.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {camID == 3 && <img src={device3.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {camID == 4 && <img src={device4.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {camID == 5 && <img src={device5.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {camID == 6 && <img src={device6.IMAGE} width="90%" marginTop="2%" height="100%" />}
                    {/* <Grid item className={classes.gridDetail}>
                    {device1.LICENSEPLATE != '' && <Typography variant='h4' className={classes.detailText}>
                        ป้ายทะเบียน: {device1.LICENSEPLATE}
                    </Typography>}
                    {device1.PROVINCE != '' && <Typography variant='h4' className={classes.detailText}>
                        จังหวัด: {device1.PROVINCE}
                    </Typography>}
                    {device1.IP != '' && <Typography variant='h4' className={classes.detailText}>
                        IP : {device1.IP}
                    </Typography>}
                </Grid> */}

                </Grid>
            </Grid>
            <Grid
                className={classes.container_2}
            >
                <Grid
                    className={classes.titleGrid}
                >
                    <Typography>
                        รายการกล้องในแยกสัญญาณ
                    </Typography>
                </Grid>
                <List>
                    <Grid
                        className={classes.content}
                    >
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 1"
                                icon=""
                                onClick={() => {
                                    setCamID(1)
                                }}
                            />
                        </ListItem>
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 2"
                                icon=""
                                onClick={() => {
                                    setCamID(2)
                                }}
                            />
                        </ListItem>
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 3"
                                icon=""
                                onClick={() => {
                                    setCamID(3)
                                }}
                            />
                        </ListItem>
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 4"
                                icon=""
                                onClick={() => {
                                    setCamID(4)
                                }}
                            />
                        </ListItem>
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 5"
                                icon=""
                                onClick={() => {
                                    setCamID(5)
                                }}
                            />
                        </ListItem>
                        <ListItem >
                            {/* {open[0] ? <ExpandLess /> : <ExpandMore />} */}
                            <NavItem
                                href=""
                                // key={items[1].title}
                                title="กล้องวิดิโอที่ 6"
                                icon=""
                                onClick={() => {
                                    setCamID(6)
                                }}
                            />
                        </ListItem>
                    </Grid>

                </List>
                {/* <Grid
                    className={classes.top_icon}
                >
                    <Button
                        className={classes.buttonGrid}
                        onClick={() => { navigate('/app/create_junction', { replace: true }); }}
                    >
                        Create Junction
                    </Button>
                </Grid> */}
                {/* <Divider /> */}
            </Grid>
        </Grid>


        // <Grid>

        // </Grid>
    );
};

export default Monitor;