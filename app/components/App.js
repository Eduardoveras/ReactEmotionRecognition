import React from 'react';
import $ from 'jquery';
import EmotionService from '../services/emotion_recognition/emotion_recognition_service';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import {URL_PATH} from '../constants';
import {BASE_URL_PATH} from '../constants';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Modal from '@material-ui/core/Modal';
import {
    faEye,
    faEyeSlash,
    faGrinAlt,
    faMeh,
    faPlayCircle,
    faStopCircle,
    faStop,
    faPlay,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import blobToBase64 from 'blob-to-base64'
import CreateCriminal from './fragments/createCriminal'

library.add(faPlayCircle);
library.add(faStopCircle);
library.add(faEyeSlash);
library.add(faEye);
library.add(faMeh);
library.add(faGrinAlt);
library.add(faPlay);
library.add(faStop);
library.add(faPlus);

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        backgroundColor: 'white',
        padding: '1.5rem',
    };
}

const paperStyle = {
    padding: "27px",
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
    height: '47vh'
};

const atencionStyle = {
    textAlign: 'center',
    height: '10vh'
};

let recordedBlobs = [];


class App extends React.Component {

    constructor(props) {
        super(props);

        this.showFinishButton = false;
        this.canvas = null;
        this.video = null;
        this.mediaRecorder = null;

        this.state = {
            name: '',
            isButtonDisabled: false,
            emojiVisible: true,
            textVisible: true,
            video_id: -1,
            cases: [],
            selected_case: 1,
            criminals: [],
            selected_criminal: '',
            selected_criminal_id: 0,
            current_notes: '',
            previous_notes: '',
            open: false
        };

        this.handleEmojiVisible = this.handleEmojiVisible.bind(this);
        this.handleTextVisible = this.handleTextVisible.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.updateData = this.updateData.bind(this);
        this.upload_notes_to_backend = this.upload_notes_to_backend.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleRating =this.handleRating.bind(this);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleRating = (the_value) => {
        let selected_case=this.state.selected_case;
        axios.patch(BASE_URL_PATH + '/face_video_analyses/'+this.state.video_id, { face_video_analysis: { rating: the_value } })
            .then(function (response) {
                console.log(response);
                 window.location.href = '/casos/' +selected_case ;
            })
    };

    handleDataAvailable(event) {
        if (recordedBlobs == null) {
            recordedBlobs = [];

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

        //console.log('Created MediaRecorder', this.mediaRecorder, 'with options', {mimeType: 'video/webm;codecs=vp9'});
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
        const {video_id, selected_case} = this.state;

        console.log("video id hack:" + video_id);

        blobToBase64(superBuffer, function (error, base64) {
            if (!error) {
                axios.post(BASE_URL_PATH + '/add_video/' + video_id, {video_file: base64})
                    .then(function (response) {
                        console.log('Video saved correctly');
                    });
            } else {
                console.log("Error converting to base64");
                alert('There was an error saving the video');
            }
        });

        this.handleOpen();
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

    componentWillMount() {
        this.updateData();
    }

    updateData() {
        axios.get(BASE_URL_PATH + '/cases')
            .then((response) => {
                this.setState({cases: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(BASE_URL_PATH + '/criminals')
            .then((response) => {
                this.setState({criminals: response.data});
            })
            .catch((error) => {
                console.log(error);
            });

    }

    onStart() {
        this.setState({
            isButtonDisabled: true
        });

        const face_video_analysis = {
            notes: this.state.name,
            case_id: this.state.selected_case,
            criminal_id: this.state.selected_criminal_id,
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
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleChangeSelect = (event, index, value) => {
        console.log(index.key);
        this.setState({[event.target.name]: event.target.value});
        this.setState({selected_criminal_id: parseInt(index.key, 10)});
    };

    onReset() {
        this.emotionService.onReset();
    }

    upload_notes_to_backend() {
        let minutes = Math.floor(this.emotionService.timeStamp / 60);
        let seconds = this.emotionService.timeStamp - minutes * 60;
        axios.post(BASE_URL_PATH + '/add_logs/' + this.state.video_id, {logs: minutes + ":" + parseInt(seconds) + " - " + this.state.current_notes})
            .then(response => {
                console.log('pushed notes to backenddd');
                this.setState(prevState => ({
                    current_notes: "",
                    previous_notes: prevState.previous_notes + minutes + ":" + parseInt(seconds) + " - " + prevState.current_notes + "\n"
                }));

            });

    }

    render() {
        const {cases, criminals} = this.state;
        return (
            <div className='container' id='container'>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Paper style={paperStyle}>
                            <div>
                                <div id="affdex_elements" ref="affElement"/>
                                {/*<video id="testing_video" autoPlay playsInline muted/>*/}
                                <div className="center-text">
                                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                                        {this.showFinishButton ? <div/> :
                                            <div>
                                                <FormControl style={{marginBottom: "0.5rem", display: "inline-block"}}>
                                                    <Select
                                                        name="selected_criminal"
                                                        value={this.state.selected_criminal}
                                                        onChange={this.handleChangeSelect}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Seleccione persona interrogada
                                                        </MenuItem>
                                                        {criminals.map(function (d) {
                                                            return (
                                                                <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                    <FormHelperText>Persona</FormHelperText>
                                                </FormControl>
                                                <FormControl style={{display: "inline-block"}}>
                                                    <Select
                                                        name="selected_case"
                                                        value={this.state.selected_case}
                                                        onChange={this.handleChange}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Seleccione la publicidad
                                                        </MenuItem>
                                                        {cases.map(function (d) {
                                                            return (
                                                                <MenuItem key={d.id} value={d.id}>{d.id}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                    <FormHelperText>Publicidad</FormHelperText>
                                                </FormControl>
                                                <TextField type="text" name="name" onChange={this.handleChange}
                                                           id="outlined-full-width"
                                                           label="Titulo"
                                                           style={{
                                                               width: "12.75rem",
                                                               height: "2.2rem",
                                                               backgroundColor: "white",
                                                               marginLeft: "1.50rem"

                                                           }}
                                                           placeholder="Titulo de la sesión"
                                                           margin="normal"
                                                           variant="outlined"
                                                           InputLabelProps={{
                                                               shrink: true,
                                                           }}/></div>}


                                        <br/>

                                        {this.showFinishButton ?
                                            <Button id="stop" variant="extendedFab" color="secondary"
                                                    onClick={this.onStop.bind(this)}
                                                    style={{color: "white", marginRight: "1rem"}}><FontAwesomeIcon
                                                icon="stop"/>&nbsp; Terminar sesión</Button> :
                                            <Button variant="extendedFab" onClick={this.onStart.bind(this)}
                                                    disabled={this.state.isButtonDisabled} color="primary"
                                                    style={{color: "white", marginRight: "1rem"}}><FontAwesomeIcon
                                                icon="play"/>&nbsp; Iniciar</Button>}
                                        {this.state.textVisible ?
                                            <Button variant="extendedFab" onClick={this.handleTextVisible}
                                                    style={{marginRight: "1rem"}}><FontAwesomeIcon icon="eye-slash"
                                                                                                   style={{color: "black"}}/> &nbsp;Ocultar
                                                texto</Button> :
                                            <Button variant="extendedFab" onClick={this.handleTextVisible}
                                                    style={{marginRight: "1rem"}}><FontAwesomeIcon icon="eye"
                                                                                                   style={{color: "black"}}/> &nbsp;Mostrar
                                                texto</Button>}
                                        {this.state.emojiVisible ?
                                            <Button variant="extendedFab" onClick={this.handleEmojiVisible}><span
                                                style={{fontSize: "22px"}}>😡</span> &nbsp;Ocultar emoji</Button> :
                                            <Button variant="extendedFab" onClick={this.handleEmojiVisible}><span
                                                style={{fontSize: "22px"}}>😃</span> &nbsp;Mostrar emoji</Button>}
                                        <CreateCriminal action={this.updateData}/>
                                        <br/>
                                        <TextField
                                            id="standard-name"
                                            name="current_notes"
                                            label="Agregar notas"
                                            value={this.state.current_notes}
                                            onChange={this.handleChange}
                                            disabled={!this.showFinishButton}
                                            margin="normal"
                                            style={{marginTop: "5.8rem"}}
                                        />
                                        <Button variant="extendedFab" color="secondary"
                                                disabled={!this.showFinishButton}
                                                onClick={this.upload_notes_to_backend.bind(this)}
                                                style={{
                                                    color: "white",
                                                    marginLeft: "0.7rem",
                                                    marginRight: "1.0rem",
                                                    marginTop: "6.0rem"
                                                }}><FontAwesomeIcon
                                            icon="plus"/>&nbsp;
                                        </Button>
                                        <TextField
                                            id="standard-textarea"
                                            label="Log de notas"
                                            placeholder="Placeholder"
                                            rows="5"
                                            multiline
                                            value={this.state.previous_notes}
                                            disabled
                                            margin="normal"
                                        />
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
                                        {this.state.textVisible && <span id="results"/>}
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
                                <br/>
                                {this.state.emojiVisible && <div id="emoji"/>}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                {this.state.open &&
                <span className={root}>
                <Button variant="extendedFab" onClick={this.handleOpen} style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    marginTop: "0.74rem",
                    display: "inline"
                }}><span style={{fontSize: "22px"}}>👨</span> &nbsp;Crear persona</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()}>
                        <Typography variant="title" id="modal-title">
                            ¿Cuál fue la emoción que predominó en este vídeo para ti?
                        </Typography>
                        <Button color="primary" style={{marginTop: "0.75rem", marginLeft: "25%", marginRight: "25%"}} variant="extendedFab" size="large">
                           Elige una emoción
                        </Button>
                        <hr/>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Felicidad")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😃</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Tristeza")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😢</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Asco")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😫</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Desprecio")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😕</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Enojo")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😡</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Miedo")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😱</span></Button>
                        <Button variant="fab" color="default" onClick={() => {this.handleRating("Sorpresa")}} style={{marginLeft: "1.1rem"}}><span style={{fontSize: "2.5rem"}}>😲</span></Button>
                    </div>
                </Modal>

            </span>
                }
            </div>
        );
    }
}

export default App;

