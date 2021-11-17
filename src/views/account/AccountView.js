import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    marginLeft: theme.spacing(4)
  },
  topGrid: {
    minHeight: '50%',
    display: 'flex',
    width: '100%',
    // marginLeft: theme.spacing(8),
    // backgroundColor: '#000000'
  },
  bottomGrid: {
    paddingTop: theme.spacing(10),
    minHeight: '50%',
    display: 'flex',
    width: '100%',
  },
  buttonGrid: {
    marginTop: theme.spacing(10),
    display: 'flex',
    width: '190px',
    height: '52px',
    borderRadius: '13px',
    justifyContent: 'center',
    backgroundColor: '#287298',
    marginLeft: '40%',
    color: '#FFFFFF',
    fontSize: '18px'
  },
  detailTop: {
    marginLeft: theme.spacing(2),
    width: '100%',
    // backgroundColor: '#000000'
  },
  titleGrid: {
    backgroundColor: '#287298',
    width: '190px',
    height: '52px',
    display: 'flex',
    borderRadius: '13px',
    justifyContent: 'center'
  },
  textTitle: {
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center'
  },
  detailGrid: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#000000',
  },
  infoGrid: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
    height: '52px',
    // backgroundColor: '#ffffff',
    display: 'flex'
  },
  bottomInfoGrid: {
    marginTop: theme.spacing(3),
    height: '52px',
    // backgroundColor: '#ffffff',
    display: 'flex'
  },
  infoText: {
    width: '12%',
    height: '100%',
    // backgroundColor: '#F0F0F0',
    display: 'flex',
    alignItems: 'center'
  },
  bottomInfoText: {
    // width: '12%',
    height: '100%',
    // backgroundColor: '#F0F0F0',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(4),
  },
  infoDetail: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '48%',
    background: 'rgba(40, 114, 152, 0.15)',
    // opacity: '0.15',
    borderRadius: '13px'
  },
  bottomInfoDetail: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '16%',
    background: 'rgba(40, 114, 152, 0.15)',
    // opacity: '0.15',
    borderRadius: '13px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '3%'
  },
  textDetail: {
    marginLeft: theme.spacing(3),
    color: '#287298',
  },
  bottomTextDetail: {
    color: '#287298',
  }
}));

const AccountInfo = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid
      className={classes.root}
    >
      <Grid
        className={classes.topGrid}
      >
        <Grid
          className={classes.detailTop}
        >
          <Grid
            className={classes.titleGrid}
          >
            <Typography
              className={classes.textTitle}
              variant='h4'
            >
              ข้อมูลผู้ใช้
            </Typography>
          </Grid>
          <Grid
            className={classes.detailGrid}
          >
            <Grid
              className={classes.infoGrid}
            >
              <Typography
                className={classes.infoText}
                variant='h4'
              >
                ชื่อ
              </Typography>
              <Grid
                className={classes.infoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.textDetail}
                >
                  สิบตรีอี้ป๋อ
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.infoGrid}
            >
              <Typography
                className={classes.infoText}
                variant='h4'
              >
                สกุล
              </Typography>
              <Grid
                className={classes.infoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.textDetail}
                >
                  หวัง
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.infoGrid}
            >
              <Typography
                className={classes.infoText}
                variant='h4'
              >
                อีเมล
              </Typography>
              <Grid
                className={classes.infoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.textDetail}
                >
                  police85@gmail.com
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.infoGrid}
            >
              <Typography
                className={classes.infoText}
                variant='h4'
              >
                ตำแหน่ง
              </Typography>
              <Grid
                className={classes.infoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.textDetail}
                >
                  ผู้บังคับหมู่งานจราจร
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.infoGrid}
            >
              <Typography
                className={classes.infoText}
                variant='h4'
              >
                เบอร์โทร
              </Typography>
              <Grid
                className={classes.infoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.textDetail}
                >
                  0858051005
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        className={classes.bottomGrid}
      >
        <Grid
          className={classes.detailTop}
        >
          <Grid
            className={classes.titleGrid}
          >
            <Typography
              className={classes.textTitle}
              variant='h4'
            >
              ที่อยู่
            </Typography>
          </Grid>
          <Grid
            className={classes.detailGrid}
          >
            <Grid
              className={classes.bottomInfoGrid}
            >
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                เลขที่
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  85
                </Typography>
              </Grid>
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                หมู่ที่
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  5
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.bottomInfoGrid}
            >
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                หมู่บ้าน/อาคาร
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  -
                </Typography>
              </Grid>
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                ซอย
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  -
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.bottomInfoGrid}
            >
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                ถนน
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  ลาดกระบัง
                </Typography>
              </Grid>
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                แขวง/ตำบล
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  ลาดกระบัง
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.bottomInfoGrid}
            >
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                เขต/อำเภอ
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  ลาดกระบัง
                </Typography>
              </Grid>
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                จังหวัด
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  กรุงเทพมหานคร
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.bottomInfoGrid}
            >
              <Typography
                className={classes.bottomInfoText}
                variant='h4'
              >
                รหัสไปรษณีย์
              </Typography>
              <Grid
                className={classes.bottomInfoDetail}
              >
                <Typography
                  variant='h4'
                  className={classes.bottomTextDetail}
                >
                  10520
                </Typography>
              </Grid>
            </Grid>
            <Button
              className={classes.buttonGrid}
              onClick={() => { navigate('/app/edit_account', { replace: true }); }}
            >
              แก้ไขข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};

export default AccountInfo;