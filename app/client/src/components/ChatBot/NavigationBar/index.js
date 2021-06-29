import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import './NavigationBar.css';
import appBarLogo from '../../../assets/images/Logo Gangala mediano.png';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: '2px dotted orange'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    backgroundColor: '#FCEDDA'
  },
  logoDiv: {
    [theme.breakpoints.up('lg')]: {
      // flexGrow: 1,
      // border: "2px solid red",
      width: '200px',
      overflow: 'hidden',
      height: '35px',
      marginLeft: '20px'
      // backgroundColor: "green",
    },

    width: '130px',
    height: '30px'
    // backgroundColor: "red"
  },
  container: {
    // border:"4px solid yellow",
    // height: '11vh'
  }
}));

export default function NavigationBar() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <AppBar className={classes.toolbar}>
        <Toolbar>
          <div className={classes.logoDiv}>
            <img
              src={appBarLogo}
              style={{ width: '100%', height: '100%' }}></img>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
