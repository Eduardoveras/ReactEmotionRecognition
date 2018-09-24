import React from 'react';
import $ from 'jquery';
import EmotionService from '../services/emotion_recognition/emotion_recognition_service';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {URL_PATH} from '../constants';
import {BASE_URL_PATH} from '../constants';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash, faGrinAlt, faMeh, faPlayCircle, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import blobToBase64 from 'blob-to-base64'

library.add(faPlayCircle);
library.add(faStopCircle);
library.add(faEyeSlash);
library.add(faEye);
library.add(faMeh);
library.add(faGrinAlt);

const paperStyle = {
    padding: "20px",
    textAlign: 'center',
    height: '87vh',
    marginBottom: "35px"
};

const resultStyle = {
    paddingTop: "10px",
    textAlign: 'center',
    height: '30vh'
};

const emojiStyle = {
    textAlign: 'center',
    height: '37vh'
};

const atencionStyle = {
    textAlign: 'center',
    height: '20vh'
};

let recordedBlobs=[];


class App extends React.Component {

    constructor(props) {
        super(props);

        this.showFinishButton = false;
        this.canvas=null;
        this.video=null;
        this.mediaRecorder=null;

        this.state = {
            name: '',
            isButtonDisabled: false,
            emojiVisible: true,
            textVisible: true,
            video_id:1
        };

        this.handleEmojiVisible = this.handleEmojiVisible.bind(this);
        this.handleTextVisible = this.handleTextVisible.bind(this);
        this.stopRecording= this.stopRecording.bind(this);
        this.startRecording= this.startRecording.bind(this);

    }

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    handleDataAvailable(event) {
        if (recordedBlobs==null){
            recordedBlobs=[];

        }
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    startRecording() {
        try {
            this.mediaRecorder = new MediaRecorder(this.canvas.captureStream(), {mimeType: 'video/webm;codecs=vp9'});
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }

        console.log('Created MediaRecorder', this.mediaRecorder, 'with options', {mimeType: 'video/webm;codecs=vp9'});
        this.mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
        };
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(10); // collect 10ms of data
        console.log('MediaRecorder started', this.mediaRecorder);
    }

    stopRecording() {
       this.mediaRecorder.stop();
        console.log('Recorded Blobs: ', recordedBlobs);
        const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
        this.video.src = null;
        this.video.srcObject = null;
        this.video.src = window.URL.createObjectURL(superBuffer);
        this.video.controls = true;
        this.video.play();
        let video_id_hack=this.state.video_id;
        console.log("video id hack:"+video_id_hack);
        blobToBase64(superBuffer, function (error, base64) {
            if (!error) {
                axios.post(BASE_URL_PATH+'/add_video/'+video_id_hack, { video_file: base64 })
                    .then(function(response){
                        console.log('Video saved correctly')
                    });
            }else {
                console.log("Error converting to base64");

            }
        })


    }

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
            notes: this.state.name,
            case_id: 2

        };

        let URL = URL_PATH;

        axios.post(URL, {face_video_analysis})
            .then(res => {
                this.video_id = res.data.id;
                this.setState({video_id: res.data.id});
                this.emotionService.onStart(this.state.video_id);
                this.showFinishButton = true;
                this.forceUpdate();

                this.canvas = document.querySelector('canvas');
                this.video = document.querySelector('video#testing_video');


                this.startRecording();
            });
    }

    onStop() {
        this.emotionService.onStop();
        this.stopRecording();
        //window.location.pathname = '/reports/' + this.video_id;
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
                                <video id="testing_video" autoPlay playsInline muted/>
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
                                    <Typography variant="headline" gutterBottom>
                                        Resultados detectados
                                    </Typography>
                                    <Typography gutterBottom>
                                        {this.state.textVisible && <spam id="results"/>}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                        <Paper style={atencionStyle}>
                            <Typography variant="title" gutterBottom>
                                Atención a la cámara
                            </Typography>
                                <div id="atencion"/>
                        </Paper>
                        <Paper style={emojiStyle}>
                            <Typography variant="title" gutterBottom>
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

