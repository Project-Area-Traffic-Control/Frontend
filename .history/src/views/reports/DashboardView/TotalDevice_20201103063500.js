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
import PhonelinkIcon from '@material-ui/icons/Phonelink';
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

const AllDevice = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
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
  );
};

AllDevice.propTypes = {
  className: PropTypes.string
};

export default AllDevice;
