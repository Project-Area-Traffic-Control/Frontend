import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Map from "../../../map"
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  withStyles,
  IconButton,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import theme from '../../../../theme';
const useStyles = makeStyles(() => ({
  root: {
    // height:"560px",
    backgroundColor: "#ffffff",
    overflow: 'true',
  },
  actions: {
    justifyContent: 'flex-end',
    backgroundColor: "#ffffff"
  },
  cardHeader: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "#111214",
  },
  tableCon: {
    marginTop: theme.spacing(3),
    maxHeight: '500px',
  },
  table: {
    overflow: 'visible',

  },
}));
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
  createData('test01', 'แจ็ค', 'แปปโฮ'),
  createData('Ice8', 'cream', 'sandwich'),
  createData('Eclair8', 262, 16.0),
  createData('Cupcake8', 305, 3.7),
  createData('Gingerbread2', 356, 16.0),
  createData('Gingerbread2', 356, 16.0),
  createData('Eclair8', 262, 16.0),
  createData('Cupcake8', 305, 3.7),
  createData('Gingerbread2', 356, 16.0),
];

const Location = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardHeader title="ตารางแสดงข้อมูลของแยกจราจรล่าสุด" className={classes.cardHeader} />
      {/* <Divider /> */}
      <TableContainer className={classes.tableCon}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell align="center" width="10%"></StyledTableCell> */}
              <StyledTableCell align="center" width="33%">เวลาที่บันทึก</StyledTableCell>
              <StyledTableCell align="center" width="34%">ชื่อแยกจราจร</StyledTableCell>
              <StyledTableCell align="center" width="33%">ชื่อช่องสัญญาณ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <StyledTableRow >
                {/* <StyledTableCell align="center">
                  <IconButton>
                    <AssignmentIcon />
                  </IconButton>
                </StyledTableCell> */}
                <StyledTableCell align="center">
                  {new Date(row?.create_time).getHours()} : {new Date(row?.create_time).getMinutes()}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.junction?.name}</StyledTableCell>
                <StyledTableCell align="center">{row?.channel?.name}</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

Location.propTypes = {
  className: PropTypes.string
};

export default Location;
