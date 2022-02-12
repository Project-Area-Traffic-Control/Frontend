import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    IconButton,
    makeStyles,
    styled,
    TextField
} from '@material-ui/core';
import Page from '../../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
// import ReportView from './ReportTable';
// import SearchTable from './SearchTable';
// import ReportTable from './ReportTable';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { junctionService } from '../../../services/junction.service';
// import ConfigView from './ConfigView';
import ConfigPlan from './ConfigPlan';
import { planService } from '../../../services/plan.service';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: theme.spacing(5),
        width: '100%',
        height: '100%'
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
        width: '80%',
        
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
    },
    listGrid: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%'
    }
}));

const ControlView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [number_lane, setNumber_lane] = useState(3)
    const [pathID, setPathID] = useState()
    const [junctionList, setJunctionList] = useState([])
    const location = useLocation();
    const [planList, setPlanList] = useState([])

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
            await junctionService.createJunction({
                "name": values.junctionName,
                "latitude": parseFloat(values.lat),
                "longitude": parseFloat(values.lng),
                "number_channel": values.number_channel,
                "area_id": values.areaID
            })

            await junctionService.getAllJunction().then(data => {
                setJunctionList(data)
            })




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

    useEffect(() => {
        for (let index = 0; index < junctionList.length; index++) {
            if (junctionList[index].name == formik.values.junctionName) {
                setPathID(junctionList[index].id)
                console.log(junctionList[index].name)
            }
        }
        console.log(pathID)
    }, [junctionList])

    useEffect(() => {
        planService.getAllPlan().then((data) => {
            setPlanList(data)
        })
    }, [])
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
                    {/* test */}
                    {/* <ConfigView /> */}
                    <ConfigPlan />
                    {/* <Grid
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
                                    รูปแบบการจัดการสัญญาณไฟ
                                </Typography>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid
                                className={classes.listGrid}
                            >
                                {planList.map((plan, index) => (
                                    <Grid
                                        className={classes.textFieldLeft}
                                    >

                                        <Grid
                                            className={classes.textFieldLeft_top}
                                        >
                                            <Button>
                                                {plan.name}
                                            </Button>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
        </Page>
    );
};

export default ControlView;