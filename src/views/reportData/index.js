import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ReportView from './ReportTable';
import SearchTable from './SearchTable';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    margin: {
      margin: theme.spacing(1),
    },
}));

const ReportData = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
      <Page
        className={classes.root}
        title="ReportData"
      > 
      {/* <div className={classes.section1}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography color="#000000" gutterBottom variant="h4">
            บันทึกรายงาน
          </Typography>
        </Grid>
        <Grid item>
         <Button  variant="contained" color="primary" size="large" className={classes.margin}
         onClick= {()=>{
                navigate('/app/add_device', { replace: true });
         }}
         >
            Add Device
          </Button>
        </Grid>
        <Grid item>
         <Button  variant="contained" color="primary" size="large" className={classes.margin}>
            Edit Device
          </Button>
        </Grid>
        <Grid item>
         <Button  variant="contained" color="secondary" size="large" className={classes.margin}>
            Remove Device
          </Button>
        </Grid>
      </Grid>
      <Typography color="textSecondary" variant="body2">
        Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the
        hall.
      </Typography>
    </div> */}
    {/* <Divider variant="middle" /> */}
      {/* <Divider light={true}></Divider> */}
        <Container maxWidth={false}>
          <SearchTable />
          <ReportView />
        </Container>
      </Page>
    );
  };
  
export default ReportData;