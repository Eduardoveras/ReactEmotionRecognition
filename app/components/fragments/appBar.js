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

const root = {
    flexGrow: 1
};

const flex = {
    flex: 1
};

const menuButton = {
    marginLeft: -12,
    marginRight: 20,
};

class ButtonAppBar extends React.Component {

    constructor(props) {
        super(props);
        this.infoUser = "";
        this.userPhoto = "";
        this.logueado = false;
    }

    state = {
        admin: false,
        administradores : ["oscardns96@gmail.com", "twindark1@gmail.com", "eduardo.storm@gmail.com"]
    };



  clearStorageLogout(){
        localStorage.clear();
  }
  definirUsuario(){
      try{
          this.infoUser = localStorage.getItem(localStorage.key(0));
          this.infoUser = this.infoUser.split(',');
          this.infoUser = this.infoUser[0].split(':');
          this.infoUser = this.infoUser[1].split('"');
          console.log(this.infoUser);

          this.userPhoto = localStorage.getItem(localStorage.key(0));
          this.userPhoto = this.userPhoto.split(',');
          this.userPhoto = this.userPhoto[2].split(':');
          this.userPhoto = this.userPhoto[2].split('"');
          this.userPhoto = "https:" + this.userPhoto[0];
          console.log(this.userPhoto);
          this.logueado = true;
      } catch(e){
          console.log(e.toString());
      }

      console.log(window.location.href);
      if(this.logueado === true && window.location.href === "http://localhost:8080/"){
          window.location.href = "/home";
      }

      const that = this;
      this.state.administradores.forEach(function (administrador) {
          if(administrador === that.infoUser){
              this.setState({admin: true});
          }
      });
  }

  render(){
      this.definirUsuario();
      return(
        <div className={root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={menuButton} color="inherit" aria-label="Menu" />
              <Typography variant="title" color="inherit" className={flex}>
                  S.D.E.C
              </Typography>
                {this.logueado && <img src={this.userPhoto} style={{width: 42, borderRadius: "50%", border: '1px solid white'}}/>}
                {this.logueado && <Typography color="inherit" variant="caption">&nbsp; | &nbsp; {this.infoUser[1] != null && this.infoUser[1]}</Typography>}
                {this.logueado && <Typography color="inherit" variant="button"> &nbsp; | &nbsp;</Typography>}
                {this.logueado && <Button color="inherit" href="/home"> <FontAwesomeIcon icon="home"/> &nbsp;Inicio</Button>}
                {this.logueado && <Button color="inherit" href="/reports"><FontAwesomeIcon icon="chart-bar"/> &nbsp;Reportes</Button>}
                {this.logueado && <Button color="inherit" href="/home"><FontAwesomeIcon icon="file-alt"/>&nbsp;Manuales</Button>}
                {this.logueado && <Button color="inherit" href="/" onClick={this.clearStorageLogout}><FontAwesomeIcon icon="sign-out-alt"/>&nbsp;Salir</Button>}
            </Toolbar>
          </AppBar>
        </div>
      )
    }
}
export default ButtonAppBar;
