import React, { useEffect, useState } from 'react';
import {
    Container,
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
    }
}));

const EditJunction = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState(0);
    const [channel, setChannel] = useState([]);
    const [junction, setJunction] = useState(null)
    const [globalPosition, setGlobalPosition] = useState([])
    const [content, setContent] = useState(<></>)
    const location = useLocation();
    useEffect(() => {
        junctionService.getJunctionByID(pathID).then(data => {
            setJunction(data)
        })
    }, [])
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
        // console.log(junction)
        if (junction != null) {
            formik.setValues({
                junctionName: junction.name,
                lat: junction.latitude,
                lng: junction.longitude,
                number_channel: junction.number_channel,
                areaID: 5,
            })
            setChannel(junction.channel)
            setGlobalPosition([junction.latitude, junction.longitude])
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
            junctionName: Yup.string().max(100).required('กรุณากรอกชื่อของแยกสัญญาณ'),
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
                                        {pathID != 0 && <MyMap setGlobalPosition={setGlobalPosition} globalPosition={globalPosition} pathID={pathID} />}
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
                                            onChange={formik.handleChange}
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

export default EditJunction;