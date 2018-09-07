/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faChartBar, faFileAlt} from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';

library.add(faHome);
library.add(faChartBar);
library.add(faFileAlt);

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

function ButtonAppBar(props) {

  let infoUser = localStorage.getItem(localStorage.key(0));
  infoUser = infoUser.split(',');
  infoUser = infoUser[0].split(':');
  infoUser.slice(1, infoUser.length - 2);
  console.log(infoUser[1]);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" />
          <Typography variant="title" color="inherit" className={classes.flex}>
              S.D.E.C
          </Typography>
            <Button color="inherit" href="/home"> <FontAwesomeIcon icon="home"/> &nbsp;Inicio</Button>
          <Button color="inherit" href="/reports"><FontAwesomeIcon icon="chart-bar"/> &nbsp;Reportes</Button>
          <Button color="inherit" href="/home"><FontAwesomeIcon icon="file-alt"/>&nbsp;Manuales</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
