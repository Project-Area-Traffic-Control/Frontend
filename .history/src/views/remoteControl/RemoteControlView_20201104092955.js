import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
   Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import AirplayIcon from '@material-ui/icons/Airplay';
import {deviceService} from "../../services"
import PhonelinkIcon from '@material-ui/icons/Phonelink';
import CardHeader from '@material-ui/core/CardHeader';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
     '& svg': {
      fontSize: 75
    },
    backgroundColor: colors.indigo[600],
    
    height: 128,
    width: 128,
    color:colors.grey[100],

  }
  ,status: {

  },
  setting:{
    backgroundColor: colors.yellow[300],
    height: 128,
    width: 128,
    color:colors.grey[100],
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
        <CardHeader
        titleTypographyProps={{variant:'h2' }}
        title={order.brand}
        subheader= {moment(order.created).format('DD/MM/YYYY')}
        />
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item >
           <Grid
          container
          spacing={3}
          >
           <Grid item>
            <Avatar className={classes.avatar} >
            <PhonelinkIcon></PhonelinkIcon>
            </Avatar>
          </Grid>
            
          <Grid item>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              Owner Name : {order.ownerName}              
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
            Phone Number : {order.phone_number}              
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
            Ip Adress  {order.ipAddress}
            </Typography>
                  </Grid>
              </Grid>
            </Grid> 
          
          <Grid item >
          <Grid
          container
          spacing={3}
          >
          <Grid item>

           <Avatar className={classes.setting} >
          <SettingsIcon></SettingsIcon>
            </Avatar>
          </Grid>
          <Grid item>

           <Avatar className={classes.avatar} >
            <AirplayIcon></AirplayIcon>
            </Avatar>
          </Grid>
          </Grid>

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