import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { GroupAdd, SportsRugbySharp } from '@material-ui/icons';
import { Form, useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { junctionService } from '../../services/junction.service';
// import AccountInfo from './AccountView'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        // height: '100%',
        width: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        // display: 'flex',
    },
    container: {
        padding: theme.spacing(2, 5),
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    testGrid: {
        width: '100%',
        display: 'flex',
        marginLeft: '13%'
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
        width: '100%',
        // display: 'flex'
    },
    textFieldLeft_top: {
        // paddingTop: theme.spacing(3),
        width: '100%',
        display: 'flex'
    },
    textField_name: {
        marginLeft: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        width: '65%',
    },
    selectField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(5),
        marginBottom: theme.spacing(5),
        width: '45%',
        backgroundColor: '#FFFFFF'
    },
    buttonGrid: {
        marginTop: theme.spacing(2),
        display: 'flex',
        padding: '5px 50px 5px 50px',
        borderRadius: '6px',
        justifyContent: 'center',
        backgroundColor: '#287298',
        marginLeft: '70%',
        color: '#FFFFFF',
        fontSize: '18px'
    },
}));

// mock data
// get data from server change this value
// dataList = get_data_from_db() -> return object
const dataList = [
    {
        value: 'ถนนลาดกระบัง',
        label: 'ถนนลาดกระบัง',
    },
    {
        value: 'ไปพาซิโอ',
        label: 'ไปพาซิโอ',
    },
    {
        value: 'ไป ARL ลาดกระบัง',
        label: 'ไป ARL ลาดกระบัง',
    }
];

const flashList = [
    {
        value: 'กระพริบสีแดง',
        label: 'กระพริบสีแดง',
    },
    {
        value: 'กระพริบสีเหลือง',
        label: 'กระพริบสีเหลือง',
    },
]

const AllRed = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [juncID, setJuncID] = useState(null)
    const [channelList, setChannelList] = useState([])
    const [def, setDefult] = useState("")
    useEffect(() => {
        setJuncID(location.pathname.slice(14, location.pathname.length - 12))
        setDefult(location.pathname.slice(16, location.pathname.length - 5).toUpperCase())
    }, [])
    useEffect(() => {
        if (juncID != null) {
            junctionService.getJunctionByID(juncID).then((data) => {
                setChannelList(data.channel)
            })
            // console.log(def)
        }
    }, [juncID])
    return (
        <Page
            className={classes.root}
            title="All Red"
        >
            {/* <Grid
        className={classes.container}
      >
        <Grid
          className={classes.testGrid}
        >
          <Grid
            className={classes.profileImg}
          >
            <img src='/static/avatar/avatar_test.png' width='216px' height='188px' />
          </Grid>
          //  <AccountInfo />
          </Grid>
        </Grid> */}
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
                            variant='h3'
                            className={classes.titleLeft}
                        >
                            ตั้งค่ารูปแบบการจัดการสัญญาณไฟ
                        </Typography>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        className={classes.textFieldLeft}
                    >

                        <Grid
                            className={classes.textFieldLeft_top}
                        >
                            <TextField
                                className={classes.textField_name}
                                label="ชื่อรูปแบบ"
                                value={def}
                                variant="outlined"
                                name="patternName"
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        {channelList.map((items) => (
                            <>
                                <TextField
                                    className={classes.selectField}
                                    id="outlined-select-menu"
                                    name="channelName"
                                    label="ช่องทางเดินรถ"
                                    variant="outlined"
                                    margin="normal"
                                    value={items.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                                <TextField
                                    className={classes.selectField}
                                    id="outlined-select-menu"
                                    select
                                    name="flash_color"
                                    label="สัญญาณไฟกระพริบ"
                                    variant="outlined"
                                    margin="normal"
                                // value=ford fighting ฝากทำหน่อยนะ ทำไม่เป็น ._.
                                >
                                    {flashList.map((option) => (
                                        <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </>
                        ))}
                        {/* <TextField
              className={classes.selectField}
              id="outlined-select-menu"
              select
              name="channelName"
              label="ช่องทางเดินรถ"
              variant="outlined"
              margin="normal"
            >
               {arkList.map((option) => (
                  <MenuItem key={option.id} value={option.value} className={classes.menuList}>
                    {option.label}
                  </MenuItem>
                ))} 
            </TextField> */}
                        {/* <TextField
              className={classes.selectField}
              id="outlined-select-menu"
              select
              name="flash_color"
              label="สัญญาณไฟกระพริบ"
              variant="outlined"
              margin="normal"
            /> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                className={classes.top_icon}
            >
                <Button
                    className={classes.buttonGrid}

                    startIcon={<SaveAltIcon />}
                    // onClick={() => formik.handleSubmit}
                    type='submit'
                >
                    บันทึก
                </Button>
            </Grid>
        </Page>
    );
};

export default AllRed;