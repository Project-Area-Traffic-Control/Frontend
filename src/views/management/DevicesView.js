import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { deviceService, userService } from "../../services"
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DeviceTable = ({ className, ...rest }) => {
  const classes = useStyles();
  const [users, setusers] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    userService.getAllUser().then((data) => {
      setusers(data)
    })
  }, [])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="ตารางจัดการผู้ใช้" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Firstname
                </TableCell>
                <TableCell>
                  Lastname
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Tel
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            {users != null && <TableBody>
              {users.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                >
                  <TableCell>
                    {row?.username}
                  </TableCell>
                  <TableCell>
                    {row?.profile?.firstname}
                  </TableCell>
                  <TableCell>
                    {row?.profile?.lastname}
                  </TableCell>
                  <TableCell>
                    {row?.profile?.email}
                  </TableCell>
                  <TableCell>
                    {row?.profile?.tel}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        navigate(`/app/${row?.id}/edit_user`, { replace: true });
                      }}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>}
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card >
  );
};

DeviceTable.propTypes = {
  className: PropTypes.string
};

export default DeviceTable;