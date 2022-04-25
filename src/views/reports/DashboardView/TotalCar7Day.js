import React from 'react';
import clsx from 'clsx';
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
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import theme from '../../../theme';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: "#ffffff"
  },
  avatar: {
    backgroundColor: colors.yellow[600],
    height: 76,
    width: 76,
    color: colors.grey[100]

  },
  textTotal: {
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "bold",
    color: "#9FA2B4"
  },
  textData: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: "#252733",
    marginTop: theme.spacing(4)
  }

}));

const Online = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
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
              variant="h5"
              className={classes.textTotal}
            >
              เวลาที่ตรวจนับจำนวนรถยนต์ได้มากที่สุด
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              className={classes.textData}
            >
              เวลา  {props.max_index < 10 ? `0${props.max_index}` : props.max_index} : 00 จำนวนรถยนต์ {props.maxHour}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TrendingUpIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Online.propTypes = {
  className: PropTypes.string
};

export default Online;
