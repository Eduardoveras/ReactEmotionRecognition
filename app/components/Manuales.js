import React from 'react';
import $ from 'jquery';
import EmotionService from '../services/emotion_recognition/emotion_recognition_service';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { URL_PATH } from '../constants';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearchPlus} from '@fortawesome/free-solid-svg-icons';
var GifPlayer = require('react-gif-player');

library.add(faSearchPlus);

const paperStyle = {
    padding: "20px",
    textAlign: 'center',
    height: '61vh',
    marginBottom: "10px"
};

const welcomeStyle = {
    padding: "20px",
    textAlign: 'center',
    marginRight: "20%",
    marginLeft: "20%"
};

class Manuales extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container' id='container'>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper style={welcomeStyle}>
                            <Typography variant="body1" color="inherit">Bienvenido a la sección de manuales, da click encima de una imagen y se reproducirá la imagen animada correspondiente al título.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo loguearse?</Typography>
                            <GifPlayer gif="https://i.imgur.com/63SPRXA.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="contained" color="primary" target="_blank" href="https://i.imgur.com/63SPRXA.gif"> <FontAwesomeIcon icon="search-plus"/> &nbsp;Ver en grande (loguearse)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo detectar emociones?</Typography>
                            <GifPlayer gif="https://i.imgur.com/YCyzT8A.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="contained" color="primary" target="_blank" href="https://i.imgur.com/YCyzT8A.gif"> <FontAwesomeIcon icon="search-plus"/> &nbsp;Ver en grande (detectar emociones)</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo interactuar con los reportes?</Typography>
                            <GifPlayer gif="https://i.imgur.com/4xp7ak2.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="contained" color="primary" target="_blank" href="https://i.imgur.com/4xp7ak2.gif"> <FontAwesomeIcon icon="search-plus"/> &nbsp;Ver en grande (reportes)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">Otro a poner luego</Typography>
                            <GifPlayer gif="#" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="contained" color="primary" target="_blank" href="#"><FontAwesomeIcon icon="search-plus"/> &nbsp;Ver en grande (otro)</Button>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default Manuales;
