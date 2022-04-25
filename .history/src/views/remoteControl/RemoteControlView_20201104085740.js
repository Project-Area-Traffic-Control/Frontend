import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
   Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {deviceService} from "../../services"

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 76,
    width: 76,
    color:colors.grey[100]

  }
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
      <Box m={3}>

   <Card  key={order.id} className={clsx(classes.root, className)}
           {...rest} variant="outlined">
      <CardContent>
           <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              ALL DEVICES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              0
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            <PhonelinkIcon></PhonelinkIcon>
            </Avatar>
          </Grid>
        </Grid>
         </CardContent>
    </Card> 
     </Box>

   ))}

    </div>

  );
};

RemoteView.propTypes = {
  className: PropTypes.string
};

export default RemoteView;