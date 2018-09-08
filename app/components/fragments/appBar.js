/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Redirect from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faChartBar, faFileAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

library.add(faHome);
library.add(faChartBar);
library.add(faFileAlt);
library.add(faSignOutAlt);

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function clearStorageLogout(){
  localStorage.clear();
}

function ButtonAppBar(props) {
    let infoUser = "";
    let userPhoto = "";
    let logueado = false;

    try{
      infoUser = localStorage.getItem(localStorage.key(0));
      infoUser = infoUser.split(',');
      infoUser = infoUser[0].split(':');
      infoUser = infoUser[1].split('"');
      console.log(infoUser);

      userPhoto = localStorage.getItem(localStorage.key(0));
      userPhoto = userPhoto.split(',');
      userPhoto = userPhoto[2].split(':');
      userPhoto = userPhoto[2].split('"');
      userPhoto = "https:" + userPhoto[0];
      console.log(userPhoto);
      logueado = true;
  } catch(e){
    console.log(e.toString());
  }

  console.log(window.location.href);
  if(logueado === true && window.location.href === "http://localhost:8080/"){
      window.location.href = "/home";
  }

  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" />
          <Typography variant="title" color="inherit" className={classes.flex}>
              S.D.E.C
          </Typography>
            {logueado && <img src={userPhoto} style={{width: 42, borderRadius: "50%", border: '1px solid white'}}/>}
            {logueado && <Typography color="inherit" variant="caption">&nbsp; | &nbsp; {infoUser[1] != null && infoUser[1]}</Typography>}
            {logueado &&  <Typography color="inherit" variant="button"> &nbsp; | &nbsp;</Typography>}
            {logueado && <Button color="inherit" href="/home"> <FontAwesomeIcon icon="home"/> &nbsp;Inicio</Button>}
            {logueado && <Button color="inherit" href="/reports"><FontAwesomeIcon icon="chart-bar"/> &nbsp;Reportes</Button>}
            {logueado && <Button color="inherit" href="/home"><FontAwesomeIcon icon="file-alt"/>&nbsp;Manuales</Button>}
            {logueado && <Button color="inherit" href="/" onClick={clearStorageLogout}><FontAwesomeIcon icon="sign-out-alt"/>&nbsp;Salir</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
