import React, { useState,useEffect } from 'react';
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
import {userService} from "../../services"

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DeviceTable = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders,setOrders] = useState([]);

  useEffect(()=>{

      userService.getAllUser().then((data)=>{
        setOrders(data.data.user)

      }).catch((e)=>{
          console.log(e)
      })
  },[])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Android Devices" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                username
                </TableCell>
             
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                     <Chip
                      color="secondary"
                      label={order.phone_number}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.ownerName}
                  </TableCell>
                  <TableCell>
                    {moment(order.created).format('DD/MM/YYYY')}
                  </TableCell>
                   <TableCell>
                    {moment(order.created).format('HH:mm')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.brand}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

DeviceTable.propTypes = {
  className: PropTypes.string
};

export default DeviceTable;