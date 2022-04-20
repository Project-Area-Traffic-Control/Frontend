import { React, useEffect, useState } from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import socketIOClient from 'socket.io-client';


const ENDPOINT = "http://localhost:3000";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        //   paddingTop: theme.spacing(3)
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
        display: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '380px',
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
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        var socketON = "camera1:send";
        console.log(socketON)
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

    }, [])

    return (
        <Grid>
            {device1.CAMERA != '' && <Typography variant="h3" className={classes.typography}>
                Camera: 1
            </Typography>}
            <Grid item className={classes.grid}>
                <img src={device1.IMAGE} width="90%" marginTop="2%" />
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


        // <Grid>

        // </Grid>
    );
};

export default Monitor;