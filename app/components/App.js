import React from 'react';
import $ from 'jquery';
import EmotionService from '../services/emotion_recognition/emotion_recognition_service'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const paperStyle = {
    padding: '20px',
    textAlign: 'center',
    height: '87vh'
};

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.emotionService = new EmotionService(640, 480, $(this.refs.affElement)[0]);
    }

    onStart() {

        const face_video_analysis = {
            notes: 'THIS IS A TEST'
        };
        let URL = null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            URL = `http://localhost:3000/face_video_analyses`;
        }
        else {
            URL = 'https://sdec-backend.herokuapp.com/face_video_analyses'
        }

        let video_id = null;

        axios.post(URL, {face_video_analysis})
            .then(res => {
                console.log(res);
                console.log(res.data.id);
                video_id = res.data.id;
                this.emotionService.onStart(video_id);
            });
    }

    onStop() {
        this.emotionService.onStop();
    }

    onReset() {
        this.emotionService.onReset();
    }

    descargarReporte() {
        this.emotionService.descargarReporte();
    }


    render() {
        return (
            <div className='container' id='container'>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Paper style={paperStyle}>
                            <div>
                                <div id="affdex_elements" ref="affElement"/>
                                <div className="center-text">
                                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                        <Button id="start" color="primary"
                                                onClick={this.onStart.bind(this)}>Iniciar</Button>
                                        <Button id="stop" onClick={this.onStop.bind(this)}>Parar</Button>
                                        <Button id="reset" onClick={this.onReset.bind(this)}>Reiniciar</Button>
                                    </div>
                                    <div>
                                        <Typography variant="headline" gutterBottom>
                                            Log's del detector
                                        </Typography>
                                    </div>
                                    <div id="logs"/>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper style={paperStyle}>
                            <div className="col-md-5">
                                <div className="resultados">
                                    <Typography variant="display1" gutterBottom>
                                        Resultados detectados
                                    </Typography>
                                    <Typography gutterBottom>
                                        <div id="results"/>
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>


            </div>
        );
    }
}

export default App;

