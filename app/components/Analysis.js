/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Typography from "@material-ui/core/es/Typography/Typography";
import {withTheme} from '@material-ui/core/styles'
import {BASE_URL_PATH} from '../constants';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFileVideo} from '@fortawesome/free-solid-svg-icons'
import DynamicTimelineChart from '../components/fragments/timelineChartDynamic'
import videojs from 'video.js'


library.add(faFileVideo);

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
                   'background-color': 'red'
               },
               markerTip:{
                   display: true,
                   text: function(marker) {
                       return "Break: "+ marker.text;
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
               markers: [
                   {
                       time: 1,
                       text: "put"
                   },
                   {
                       time: 2,
                       text: "any"
                   },
                   {
                       time: 3,
                       text: "text"
                   },
                   {
                       time: 20,
                       text: "here"
                   }
               ]
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

    addMark(text_message){
        if (this.globalPlayer){
            this.globalPlayer.markers.add([{ time: this.globalPlayer.currentTime(), text: this.state.text_field}]);;
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
                            Analisis #{this.state.video_id}
                        </Typography>
                        {this.state.data.video_base64?
                            <video id="example_video_1" controls autoPlay playsInline muted className="video_center video-js" name="media">
                                <source src={this.state.data.video_base64}
                                        type="video/webm"/>
                            </video>:'Loading Video....'}
                            <button onClick={this.nextMark}>NEXT</button>
                        <button onClick={this.prevMark}>PREVIOUS</button>
                        <button onClick={this.addMark.bind(this, 'YOLO')}>ADD MESSAGE</button>
                        <input type="text" name="text_field" onChange={this.handleChange}/>

                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.data.criminal && this.state.data.criminal.name ? this.state.data.criminal.name : 'No se especifico nombre.'}
                        </Typography>
                        <Typography component="p">
                            {this.state.data.notes === '' || this.state.data.notes == null ? 'No notes' : this.state.data.notes}
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

export default withTheme()(Analysis);
