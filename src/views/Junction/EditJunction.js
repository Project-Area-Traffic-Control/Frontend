import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    IconButton,
    makeStyles,
    styled
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
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: theme.spacing(5),
        width: '100%'
    },
    container: {
        width: '100%',
        height: '100%',
        // display: 'flex',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10)
    },
    topGrid: {
        width: '100%',
        height: '50%',
        // backgroundColor: '#000000',
        display: 'flex'
    },
    bottomGrid: {
        marginTop: theme.spacing(5),
        width: '100%',
        height: '50%',
        display: 'flex',
        backgroundColor: '#000000'
    }
}));

const EditJunction = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState(0);
    const [channel, setChannel] = useState([]);
    const [junction, setJunction] = useState({})
    const location = useLocation();
    useEffect(() => {
        setPathID(location.pathname.slice(14, location.pathname.length))
    }, [location.pathname])
    useEffect(() => {
        // let tempJ = 
        // console.log(tempJ)
        junctionService.getJunctionByID(pathID).then(data => {
            setJunction(data)

        })
        // console.log(junction)
        // setJunction(junctionService.getJunctionByID(pathID))
        // setJunction(tempJ)
        // console.log(junction.data)
        // console.log(formik.values)
    }, [pathID])
    useEffect(() => {
        // console.log(junction.channel)
        formik.setValues({
            junctionName: junction.name,
            lat: junction.latitude,
            lng: junction.longitude,
            number_channel: junction.number_channel,
            areaID: 5,
        })
        setChannel(junction.channel)
        // console.log(channel)
    }, [junction])

    // console.log(channel)
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
            await junctionService.updateJuncionID({
                "name": values.junctionName,
                "latitude": parseFloat(values.lat),
                "longitude": parseFloat(values.lng),
                "number_channel": values.number_channel,
                "area_id": values.areaID
            }, pathID)
            // if (addDrawerState) {
            //     var res = await addLocation(values)
            //     if (res.status === 200) {
            //         let tempData = locations.copyWithin();
            //         tempData.push(res.data)
            //         setLocations([])
            //         setLocations(tempData)
            //         setAddDrawerState(false)
            //     }
            //     else if (res.status == 400) {
            //         if (res.data.errno == 1062) {
            //             alert("Duplicate entry")
            //         }
            //     }
            // }

            // if (editDrawerState) {
            //     // alert("Edit")
            //     console.info(values)
            //     editLocation(values)

            // }
        },
    });


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
                    <SearchTable formik={formik} channel={channel} pathID={pathID} status="edit" />
                </Grid>
                {/* <Grid
                    className={classes.bottomGrid}
                >
                    <ReportTable number_channel={formik.values.number_channel} />
                </Grid> */}
            </Grid>
        </Page>
    );
};

export default EditJunction;