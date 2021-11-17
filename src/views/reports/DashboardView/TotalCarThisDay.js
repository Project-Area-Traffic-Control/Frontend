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
import theme from '../../../theme';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: "#ffffff"
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 76,
    width: 76,
    color:colors.grey[100],
    

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

const TotalCarThisDay = ({ className, ...rest }) => {
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
              className={classes.textTotal}
            >
              Example Card 1
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
              className={classes.textData}
            >
              138
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <DriveEtaIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCarThisDay.propTypes = {
  className: PropTypes.string
};

export default TotalCarThisDay;
