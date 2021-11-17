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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {userService} from "../../services"

const useStyles = makeStyles(() => ({
   root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const RemoteView = ({ className, ...rest }) => {
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
    </Card>
  );
};

RemoteView.propTypes = {
  className: PropTypes.string
};

export default RemoteView;