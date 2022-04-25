import React, { useState } from 'react';
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

const data = [
  {
    id: uuid(),
    ref: '0',
    amount: 30.5,
    customer: {
      name: 'samsung s20'
    },
    createdAt: 1555016400000,
    status: 'Connected'
  },
  {
    id: uuid(),
    ref: '1',
    amount: 25.1,
    customer: {
      name: 'oppo a31'
    },
    createdAt: 1555016400000,
    status: 'Connected'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Location = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Device Locations" />
      <Divider />
      <PerfectScrollbar>

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
