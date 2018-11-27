import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    marginLeft: "20%",
    backgroundColor: "#fffec1"
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
                            <Typography variant="body1" color="inherit" >Bienvenido a la sección de manuales, da click encima de una imagen y se reproducirá la imagen animada correspondiente al título.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo loguearse?</Typography>
                            <GifPlayer gif="https://i.imgur.com/63SPRXA.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href="https://i.imgur.com/63SPRXA.gif">🔎 &nbsp;Ver en grande (loguearse)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo detectar emociones?</Typography>
                            <GifPlayer gif="https://i.imgur.com/9HOQIwG.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href="https://i.imgur.com/9HOQIwG.gif">🔎 &nbsp;Ver en grande (detectar emociones)</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo interactuar con los reportes?</Typography>
                            <GifPlayer gif="https://i.imgur.com/EXzYTvF.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href="https://i.imgur.com/EXzYTvF.gif">🔎 &nbsp;Ver en grande (reportes y resumen)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo interactuar con los casos?</Typography>
                            <GifPlayer gif="https://i.imgur.com/fEaBWNJ.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href="https://i.imgur.com/fEaBWNJ.gif">🔎 &nbsp;Ver en grande (casos)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo interactuar con los ajustes?</Typography>
                            <GifPlayer gif="https://i.imgur.com/2KKEkHS.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href=" https://i.imgur.com/2KKEkHS.gif">🔎 &nbsp;Ver en grande (ajustes)</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={paperStyle}>
                            <Typography variant="title" color="inherit">¿Cómo interactuar con los marcadores?</Typography>
                            <GifPlayer gif="https://i.imgur.com/r1bC4XR.gif" style={{marginTop: "10px", marginBottom: "10px", width: "100%"}}/>
                            <Button variant="extendedFab" color="primary" target="_blank" href=" https://i.imgur.com/r1bC4XR.gif">🔎 &nbsp;Ver en grande (marcadores)</Button>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default Manuales;
