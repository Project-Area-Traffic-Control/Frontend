import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10

  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">{props.massage}</Alert>
    </div>
  );
}