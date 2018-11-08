/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/es/Typography/Typography";
import {BASE_URL_PATH} from '../constants';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import DynamicTimelineChart from '../components/fragments/timelineChartDynamic'
import videojs from 'video.js'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBackward, faForward, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

library.add(faThumbtack);
library.add(faBackward);
library.add(faForward);

class Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            api_data: null,
            video_id: window.location.href.split('/').pop(),
            text_field:'',
        };
        this.globalPlayer=null;
        this.setPlayer=this.setPlayer.bind(this);
        this.nextMark=this.nextMark.bind(this);
        this.prevMark=this.prevMark.bind(this);
        this.addMark=this.addMark.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentWillMount() {
        let URL = BASE_URL_PATH + '/face_video_analyses/' + this.state.video_id;
        axios.get(URL)
            .then((response) => {
                this.setState({data: response.data},this.setPlayer
                );
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(BASE_URL_PATH+'/emotions/'+ this.state.video_id)
            .then((response) => {
                this.setState({api_data: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setPlayer(){

       this.globalPlayer= videojs("example_video_1", {}, function(){

           this.markers({
               markerStyle: {
                   'width':'7px',
                   'border-radius': '30%',
                   'background-color': '#2196F3'
               },
               markerTip:{
                   display: true,
                   text: function(marker) {
                       return "Marcador: "+ marker.text;
                   },
                   time: function(marker) {
                       return marker.time;
                   }
               },
               breakOverlay:{
                   display: false,
                   displayTime: 3,
                   style:{
                       'width':'100%',
                       'height': '20%',
                       'background-color': 'rgba(0,0,0,0.7)',
                       'color': 'white',
                       'font-size': '17px'
                   },
                   text: function(marker) {
                       return "Break overlay: " + marker.overlayText;
                   }
               },
               markers: []
           });

        });

       if (this.globalPlayer){


       }


    }

    nextMark(){
        if (this.globalPlayer){
            this.globalPlayer.markers.next();
        }else {
            console.log("Error...");
        }

    }
    prevMark(){
        if (this.globalPlayer){
            this.globalPlayer.markers.prev();
        }else {
            console.log("Error");
        }

    }

    addMark() {
        if (this.globalPlayer){
            this.globalPlayer.markers.add([{time: this.globalPlayer.currentTime(), text: this.state.text_field}]);
        }else {
            console.log("Error");
        }

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {

        return (
            <div className='container'>
                <Card>{this.state.data?
                    <CardContent>
                        <Typography variant="display1" gutterBottom>
                            Análisis #{this.state.video_id}
                        </Typography>
                        {this.state.data.video_base64?
                            <video id="example_video_1" controls autoPlay playsInline muted className="video_center video-js" name="media">
                                <source src={this.state.data.video_base64}
                                        type="video/webm"/>
                            </video>:'Loading Video....'}

                            <div className="button_center">
                                <Button variant="extendedFab" color="default" onClick={this.prevMark} style={{marginRight: "1rem"}}><FontAwesomeIcon icon="backward"/>&nbsp; Anterior</Button>
                                <Button variant="extendedFab" color="default" onClick={this.nextMark} style={{marginRight: "1rem"}}><FontAwesomeIcon icon="forward"/>&nbsp; Siguiente</Button>
                                <Button variant="extendedFab" color="primary" onClick={this.addMark.bind(this, 'YOLO')} style={{marginRight: "1rem"}}><FontAwesomeIcon icon="thumbtack"/>&nbsp; Añadir marcador</Button>
                                <TextField type="text" name="text_field" onChange={this.handleChange}
                                       id="outlined-adornment-amount"
                                       variant="outlined"
                                       label="Texto del marcador"
                                       InputProps={{
                                           startAdornment: <InputAdornment position="start">📌</InputAdornment>,
                                       }}
                                />
                            </div>
                        <hr style={{color: "black", marginTop: "1rem", marginBottom: "1rem"}}/>
                        <Typography gutterBottom variant="headline" component="h2">
                            <strong>Nombre de la persona: </strong>{this.state.data.criminal && this.state.data.criminal.name ? this.state.data.criminal.name : 'No se especifico nombre.'}
                        </Typography>
                        <Typography component="p">
                            <strong>Notas: </strong>{this.state.data.notes === '' || this.state.data.notes == null ? 'No notes' : this.state.data.notes}
                        </Typography>
                        {this.state.api_data?
                            <DynamicTimelineChart api_data={this.state.api_data}/>:'Loading data............'
                        }

                    </CardContent>
                    :'Loading....'}

                </Card>
            </div>
        );
    }
}

export default Analysis;
