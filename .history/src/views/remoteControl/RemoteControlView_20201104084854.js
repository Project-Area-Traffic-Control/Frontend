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
import {deviceService} from "../../services"

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
const bull = <span className={classes.bullet}>•</span>;

  
  useEffect(()=>{

      deviceService.getAlldevice().then((data)=>{
        setOrders(data.data)

      }).catch((e)=>{
          console.log(e)
      })
  },[])

  return (
    <div>
      {orders.map((order) => ( 
   <Card   className={clsx(classes.root, className)}
           {...rest} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> 
    ))}
    </div>

  );
};

RemoteView.propTypes = {
  className: PropTypes.string
};

export default RemoteView;