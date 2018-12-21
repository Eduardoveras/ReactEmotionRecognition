/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import { BASE_URL_PATH } from '../constants';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import videojs from 'video.js'

library.add(faFileVideo);

const cardStyle = {
    width: "25rem"
};
const videoStyle = {
    width: "20rem",
    height: "10rem"
};

class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            case_id: window.location.href.split('/').pop(),
            link:''
        };
        this.updateLink=this.updateLink.bind(this);
    }

    updateLink = () => {
        let decision = prompt("Link:", "http://www.youtube.com");
        let currentThis=this;
        if (decision != null) {
            let URL = BASE_URL_PATH + '/cases/' + this.state.case_id;
            axios.patch(URL, {case: {link: decision}})
                .then(function (response) {
                    console.log(response);
                    currentThis.setState({link: decision})
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };

    componentWillMount() {
        let URL = BASE_URL_PATH + '/cases/' + this.state.case_id;
        axios.get(URL)
            .then((response) => {
                this.setState({ data: response.data },
                    () => this.state.data.face_video_analysis.forEach(function (element) {
                        videojs("example_video_" + element.id, {}, function () {
                            this.markers({
                                markerStyle: {
                                    'width': '8px',
                                    'background-color': 'red'
                                },
                                markers: [
                                    { time: 1, text: "this" },
                                    { time: 2, text: "is" },
                                    { time: 3.5, text: "so" },
                                    { time: 28, text: "cool" }
                                ]
                            });
                        });
                    })
                );
                this.setState({link:response.data.link})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { data } = this.state;

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Publicidad #{this.state.case_id}
                </Typography>
                <Typography variant="subheading" gutterBottom onClick={this.updateLink}>
                    Link: {this.state.link==='' || this.state.link==null? ' No Definido':this.state.link}
                </Typography>
                <Grid
                    container
                    justify="left"
                    spacing={Number(16)}>
                    {data.face_video_analysis ? data.face_video_analysis.map(function (d) {
                        return (

                            <Grid key={d.id} item>
                                <Card style={cardStyle}>

                                    <CardContent>
                                        <video className="video-js" id={"example_video_" + d.id} controls style={videoStyle} name="media">
                                            <source src={d.video_base64}
                                                type="video/webm" />
                                        </video>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            {d.criminal && d.criminal.name ? d.criminal.name : 'No se especifico nombre.'}
                                        </Typography>
                                        <Typography component="p">
                                            {d.notes === '' || d.notes == null ? 'No notes' : d.notes}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button href={'/reports/' + d.id} variant="contained" size="small" color="primary">
                                            <FontAwesomeIcon icon="file-video" /> &nbsp; Ver Reporte
                                    </Button>
                                        <Button href={'/analisis/' + d.id} variant="contained" size="small" color="secondary" style={{ color: "white" }}>
                                            <FontAwesomeIcon icon="search-plus" /> &nbsp; Análisis
                                    </Button>
                                    </CardActions>
                                </Card>

                            </Grid>

                        )
                    }) : 'Loading Data...'}
                </Grid>

            </div>
        );
    }
}

export default Cases;
