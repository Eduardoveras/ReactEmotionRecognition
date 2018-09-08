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
import {faPlayCircle, faStopCircle, faEyeSlash, faEye, faMeh, faGrinAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faPlayCircle);
library.add(faStopCircle);
library.add(faEyeSlash);
library.add(faEye);
library.add(faMeh);
library.add(faGrinAlt);

const paperStyle = {
    padding: "20px",
    textAlign: 'center',
    height: '87vh'
};

const resultStyle = {
    paddingTop: "10px",
    textAlign: 'center',
    height: '50vh'
};

const emojiStyle = {
    textAlign: 'center',
    height: '37vh'
};


class App extends React.Component {
    state = {
        name: '',
        isButtonDisabled: false,
        emojiVisible: true,
        textVisible: true
    };

    constructor(props) {
        super(props);
        this.handleEmojiVisible = this.handleEmojiVisible.bind(this);
        this.handleTextVisible = this.handleTextVisible.bind(this);
        this.showFinishButton = false;
        this.video_id = null;
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    handleEmojiVisible() {
        this.setState((prevState) => {
            return {
                emojiVisible: !prevState.emojiVisible
            };
        });
    }

    handleTextVisible() {
        this.setState((prevState) => {
            return {
                textVisible: !prevState.textVisible
            };
        });
    }

    componentDidMount() {
        this.emotionService = new EmotionService(640, 480, $(this.refs.affElement)[0]);
    }

    onStart() {
        this.setState({
            isButtonDisabled: true
        });

        const face_video_analysis = {
            notes: this.state.name
        };

        let URL = URL_PATH;

        axios.post(URL, {face_video_analysis})
            .then(res => {
                console.log(res);
                console.log(res.data.id);
                this.video_id = res.data.id;
                this.emotionService.onStart(this.video_id);
                this.showFinishButton = true;
                this.forceUpdate();
            });
    }

    onStop() {
        this.emotionService.onStop();
        window.location.pathname = '/reports/' + this.video_id;
    }

    onReset() {
        this.emotionService.onReset();
    }

    render() {
        const inputProps = {
            step: 300,
        };

        return (
            <div className='container' id='container'>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Paper style={paperStyle}>
                            <div>
                                <div id="affdex_elements" ref="affElement"/>
                                <div className="center-text">
                                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                        <label>
                                            <Typography gutterBottom>
                                                Notas:
                                            <input type="text" name="name" onChange={this.handleChange}/>
                                            </Typography>
                                        </label>
                                        <br/>
                                        {this.showFinishButton ? <Button id="stop" onClick={this.onStop.bind(this)}><FontAwesomeIcon icon="stop-circle" style={{color: "grey"}}/> &nbsp;Terminar
                                            sesion</Button> : <Button onClick={this.onStart.bind(this)} disabled={this.state.isButtonDisabled}>
                                            <FontAwesomeIcon icon="play-circle" style={{color: "grey"}}/> &nbsp;Iniciar </Button>}
                                        {this.state.textVisible ?  <Button onClick={this.handleTextVisible}><FontAwesomeIcon icon="eye-slash" style={{color: "grey"}}/> &nbsp;Ocultar texto</Button> : <Button onClick={this.handleTextVisible}><FontAwesomeIcon icon="eye" style={{color: "grey"}}/> &nbsp;Mostrar texto</Button>}
                                        {this.state.emojiVisible ? <Button onClick={this.handleEmojiVisible}><FontAwesomeIcon icon="meh" style={{color: "grey"}}/> &nbsp;Ocultar emoji</Button> : <Button onClick={this.handleEmojiVisible}><FontAwesomeIcon icon="grin-alt" style={{color: "grey"}}/> &nbsp;Mostrar emoji</Button>}
                                    </div>
                                    <div id="logs"/>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper style={resultStyle}>
                            <div className="col-md-5">
                                <div className="resultados">
                                    <Typography variant="display1" gutterBottom>
                                        Resultados detectados
                                    </Typography>
                                    <Typography gutterBottom>
                                        {this.state.textVisible && <div id="results"/>}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                        <Paper style={emojiStyle}>
                            <Typography variant="display1" gutterBottom>
                                Emoji
                            </Typography>
                            <Typography>
                                {this.state.emojiVisible && <div id="emoji"/>}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;

