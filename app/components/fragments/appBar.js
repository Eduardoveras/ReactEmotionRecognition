/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faChartBar, faFileAlt, faSignOutAlt, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { loginURL } from '../../constants';

library.add(faHome);
library.add(faChartBar);
library.add(faFileAlt);
library.add(faSignOutAlt);
library.add(faUserSecret);

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
    }

    state = {
        admin: false,
        administradores: ["oscardns96@gmail.com", "twindark1@gmail.com", "eduardo.storm@gmail.com"],
        logueado: false
    };

    componentDidMount() {
       this.definirUsuario();
    }

    clearStorageLogout(){
        localStorage.clear();
    }
  definirUsuario(){
      let usuario = "";
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
          this.setState({logueado: true});
          usuario = this.infoUser[1];
      } catch(e){
          console.log(e.toString());
      }

      console.log(window.location.href);

      for(let i = 0; i < this.state.administradores.length; i++){
          if(this.state.administradores[i] === usuario){
              this.setState({admin: true});
          }
      }
  }

  render(){

      if(this.state.logueado && window.location.href === loginURL){
          window.location.href = "/home";
      }

      let adminEmail = "";
      let userNormalEmail = "";
      let adminPhoto = "";
      let userNormalPhoto = "";
      try {
          adminEmail = <Typography color="inherit" variant="caption" style={{textShadow: "2px 1px 2px yellow, 0 0 25px yellow, 0 0 20px yellow"}}> &nbsp; | &nbsp; {this.infoUser[1] != null && this.infoUser[1] + " (admin)"}</Typography>;
          userNormalEmail = <Typography color="inherit" variant="caption">&nbsp; | &nbsp; {this.infoUser[1] != null && this.infoUser[1]}</Typography>;
          adminPhoto = <img src={this.userPhoto} style={{width: 42, borderRadius: "50%", border: '1px solid white', boxShadow: "1px 1px 1px yellow, 0 0 5px yellow, 0 0 5px yellow"}}/> ;
          userNormalPhoto = <img src={this.userPhoto} style={{width: 42, borderRadius: "50%", border: '1px solid white'}}/>;
      }catch(e){
          console.log(e.toString())
      }
      //console.log("ES ADMIN? : " + this.state.admin);
      //console.log("ESTA LOGUEADO? : " + this.state.logueado);

      return(
        <div className={root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton style={menuButton} color="inherit" aria-label="Menu" />
              <Typography variant="title" color="inherit" style={flex}>
                  S.D.E.C
              </Typography>
                {this.state.logueado && this.state.admin && adminPhoto}
                {this.state.logueado && this.state.admin && adminEmail}
                {this.state.logueado && this.state.admin === false && userNormalPhoto}
                {this.state.logueado && this.state.admin === false && userNormalEmail}
                {this.state.logueado && <Typography color="inherit" variant="button"> &nbsp; | &nbsp;</Typography>}
                {this.state.logueado && <Button color="inherit" href="/home"> <FontAwesomeIcon icon="home"/> &nbsp;Inicio</Button>}
                {this.state.logueado && <Button color="inherit" href="/reports"><FontAwesomeIcon icon="chart-bar"/> &nbsp;Reportes</Button>}
                {this.state.logueado && <Button color="inherit" href="/casos"><FontAwesomeIcon icon="chart-bar"/> &nbsp;Casos</Button>}
                {this.state.logueado && <Button color="inherit" href="/manuales"><FontAwesomeIcon icon="file-alt"/>&nbsp;Manuales</Button>}
                {this.state.logueado && <Button color="inherit" href="/" onClick={this.clearStorageLogout}><FontAwesomeIcon icon="sign-out-alt"/>&nbsp;Salir</Button>}
            </Toolbar>
          </AppBar>
        </div>
      )
    }
}
export default ButtonAppBar;
