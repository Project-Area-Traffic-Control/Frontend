import React, { useState,useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  withStyles,
  Grid,
  IconButton,

} from '@material-ui/core';
import Page from '../../components/Page';
import {deviceService} from "../../services"
import { useDispatch, useSelector, } from 'react-redux';
import {alertDialogActions} from '../../_actions';
import Alert from "../../components/Alert";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AssignmentIcon from '@material-ui/icons/Assignment';
const StyledTableCell = withStyles((theme) => ({
head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    
},
body: {
    fontSize: 14,
    color: "#000000",
},
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);
  
function createData(userName, name, surName, userId, roles, detail) {
return { userName, name, surName, userId, roles, detail };
};
  
const rows = [
  createData('test01', 'แจ็ค', 'แปปโฮ', 14682, 'tester'),
  createData('Ice', 'cream', 'sandwich', 84692, 'tester'),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  table: {
      minWidth: "700px"
  },
  tableCon: {
      marginLeft: "2%",
      width: "96%",
  },
  section1: {
    margin: theme.spacing(3, 3),
  },
}));

const UserManageView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const alertDialog = useSelector(state => state.alertDialog);
    const [alert,setAlert] = useState(false)
    const [data,setData] = useState({})
      useEffect(()=>{
      if(alertDialog.type === 'success' && data != {}){
             deviceService.addDevice(data).then((data)=>{
                    console.log(data)
                    if(data.status===200) {
                            setAlert(true)
                    }
                }).catch((e)=>{
                    alert(e)
                })
        
            }
      } ,[alertDialog])

  // const navigate = useNavigate();na

  return (
    <Page
      className={classes.root}
      title="User Manager"
    >
            {alert &&
             <Alert massage="Add Device is Success"></Alert>
            }
            <div className={classes.section1}>
            <Grid item>
                    <Button  variant="contained" color="primary" size="large" className={classes.margin}
                        onClick= {()=>{
                                
                        }}
                        >
                            Add User
                    </Button>
                </Grid>
            </div>
            <TableContainer  className = {classes.tableCon}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center" width = "5%"></StyledTableCell>
                    <StyledTableCell align="center" width = "19%">Username</StyledTableCell>
                    <StyledTableCell align="center" width = "19%">ชื่อ</StyledTableCell>
                    <StyledTableCell align="center" width = "19%">นามสกุล</StyledTableCell>
                    <StyledTableCell align="center" width = "19%">ID</StyledTableCell>
                    <StyledTableCell align="center" width = "19%">หน้าที่</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">
                        <IconButton>
                            <AssignmentIcon />
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {row.userName}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.surName}</StyledTableCell>
                    <StyledTableCell align="center">{row.userId}</StyledTableCell>
                    <StyledTableCell align="center">{row.roles}</StyledTableCell>
                   
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </Page>
  );
};

export default UserManageView;