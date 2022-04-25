import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Map from "../../../map"
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useStyles = makeStyles(() => ({
  root: {
        height:"560px"
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Location = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Device Locations" />
      <Divider />
      <PerfectScrollbar>
            <Map></Map>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View Detail
        </Button>
      </Box>
    </Card>
  );
};

Location.propTypes = {
  className: PropTypes.string
};

export default Location;
