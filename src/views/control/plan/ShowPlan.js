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
import { ArrowLeftRounded, ArrowRightAltOutlined, ArrowRightSharp, Assignment, Close, ExpandLess, ExpandMore, KeyboardArrowLeft, KeyboardArrowRight, RemoveFromQueueTwoTone, RotateRight } from '@material-ui/icons';
// import ReportTable from './ReportTable';
import { channelService } from '../../../services/channel.service';
import { Slide } from 'react-slideshow-image';
import SimpleImageSlider from "react-simple-image-slider";
import Slider from 'react-slick';
import ImageSlide from '../ImageSlide';
import theme from '../../../theme';
import { planService } from '../../../services/plan.service';
import { junctionService } from '../../../services/junction.service';
import { userService } from '../../../services';
// import {recordservice} from "../../services"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        // height: '100%',
        width: '100%',
        display: 'flex',
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
        display: 'flex',
        // justifyContent: 'center'
    },
    buttomGrid: {
        width: '50%',
        height: '80px',
        display: 'flex',
        alignItems: 'center'
    },
    buttomCreate: {
        marginLeft: '80%'

    },
    titleLeft: {
        color: '#17395C',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        width: '50%',
        height: '80px',
    },
    divider: {
        backgroundColor: '#287298',
        height: '2px'
    },
    textFieldLeft: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    textFieldLeft_top: {
        width: '85%',
        display: 'flex',
        justifyContent: 'center'
    },
    content: {
        paddingBottom: theme.spacing(7),
        paddingTop: theme.spacing(3),
        width: '100%',
        // display: 'flex',
        // justifyContent: 'center'
    },
    planContent: {
        width: '100%',
        // display: 'flex'
    },
    planName: {
        width: '100%',
        height: '58px',
        // marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        alignItems: 'center',
        display: 'flex'
    },
}));
const menuList = [
    {
        value: 3,
        label: '3 ?????????',
    },
    {
        value: 4,
        label: '4 ?????????',
    },
    {
        value: 5,
        label: '5 ?????????',
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


const ShowPlan = (props) => {
    const classes = useStyles()
    const [planList, setPlanList] = useState([])
    const [juncID, setJuncID] = useState(null)
    const initialLength = 21
    const location = useLocation();
    const [userData, setUserData] = useState(null)
    const [userPermiss, setUserPermiss] = useState(null)
    useEffect(() => {
        // planService.getAllPlan().then((data) => {
        //     setPlanList(data)
        // })
        setUserData(JSON.parse(localStorage.getItem("user")))
        setJuncID(location.pathname.slice(14, 15 + (location.pathname.length - initialLength)))
        // else{

        // }
    }, [location.pathname])

    useEffect(() => {
        if (userData != null) {
            userService.getUserByID(userData.id).then((data) => {
                // console.log(data)
                setUserPermiss(data.permissions)
            })
            // setPathID(location.pathname.slice(14, location.pathname.length))
        }
    }, [userData])

    useEffect(() => {
        if (juncID != null) {
            junctionService.getJunctionByID(juncID).then((data) => {
                setPlanList(data.plan)
            })
            console.log(juncID)
        }
    }, [juncID])
    const navigate = useNavigate();
    const checkPlan = (index) => {
        if (planList[index].name == "FLASHING") {
            navigate(`/app/junction/${juncID}/flashing_plan`, { replace: true });
        }
        else if (planList[index].name == "ALLRED") {
            navigate(`/app/junction/${juncID}/allred_plan`, { replace: true });
        }
        else {
            navigate(`/app/plan/${planList[index].id}/edit_plan`, { replace: true });
        }
    }
    return (
        <Grid
            className={classes.root}
        >
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Grid
                className={classes.top}
            >
                {userPermiss != null && userPermiss.length != 0 && (userPermiss[2].view == true || userPermiss[2].edit == true) && <Grid
                    className={classes.topLeft}
                >
                    <Grid
                        className={classes.titleGrid}
                    >
                        <Typography
                            variant='h4'
                            className={classes.titleLeft}
                        >
                            ?????????????????????????????????????????????????????????????????????
                        </Typography>
                        <Grid
                            className={classes.buttomGrid}
                        >
                            {userPermiss != null && userPermiss.length != 0 && userPermiss[2].edit == true && juncID != null && <Button
                                className={classes.buttomCreate}
                                onClick={() => { navigate(`/app/junction/${juncID}/create_plan`, { replace: true }); }}
                            >
                                <img src='/static/button/Plus.png' />
                            </Button>}
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        className={classes.textFieldLeft}
                    >
                        <Grid
                            className={classes.textFieldLeft_top}
                        >
                            <Grid
                                className={classes.content}
                            >
                                {planList.map((plan, index) => (
                                    <Grid
                                        className={classes.planContent}
                                    >
                                        <Grid
                                            className={classes.planName}
                                        >
                                            {/* <IconButton>
                                                <ArrowRightSharp />
                                            </IconButton> */}
                                            {plan.name != 'FLASHING' && plan.name != 'ALLRED' && <Button
                                                onClick={() => { checkPlan(index) }}
                                            >
                                                <img src='/static/button/ArrowRight Circle.png' />
                                            </Button>}
                                            {plan.name != 'FLASHING' && plan.name != 'ALLRED' && <Typography
                                                variant='h5'
                                            >
                                                {plan.name}
                                            </Typography>}
                                            {(plan.name == 'FLASHING' || plan.name == 'ALLRED') && <Typography
                                                variant='h5'
                                                style={{ marginLeft: theme.spacing(8) }}
                                            >
                                                {plan.name}
                                            </Typography>}
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>}
                {userPermiss != null && (userPermiss.length == 0 || userPermiss[2].view == false) &&
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
            </Grid>
        </Grid >
    );
};

export default ShowPlan;