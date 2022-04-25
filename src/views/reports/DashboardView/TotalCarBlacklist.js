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
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import theme from '../../../theme';
import WarningIcon from '@material-ui/icons/Warning';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: "#ffffff",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 76,
    width: 76,
    color:colors.grey[100]

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

const Offline = ({ className, ...rest }) => {
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
              Example Card 3
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
              className={classes.textData}
            >
              28
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <WarningIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Offline.propTypes = {
  className: PropTypes.string
};

export default Offline;
