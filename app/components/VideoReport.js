/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import axios from "axios/index";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import TimelineChart from './fragments/timelineChart'
import EmotionsBarChart from './fragments/EmotionsBarChart'
import EmotionsPieChart from './fragments/EmotionsPieChart'
import PositiveNegativeChart from './fragments/PositiveNegativeEmotionsChart'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChartBar, faFileAlt, faEyeSlash, faDownload} from '@fortawesome/free-solid-svg-icons'

library.add(faChartBar);
library.add(faFileAlt);
library.add(faEyeSlash);
library.add(faDownload);

class VideoReport extends React.Component {
    constructor(props) {
        super(props);
        this.handleGraphsVisible = this.handleGraphsVisible.bind(this);
        this.handleTextVisible = this.handleTextVisible.bind(this);
        this.state = {
            api_data: [],
            report_id: window.location.href.split('/').pop(),
            summary_data: null,
            textVisible: true,
            graphsVisible: true
        };
    }
    componentWillMount() {
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000';
        } else {
            URL = 'https://sdec-backend.herokuapp.com' ;
        }
        axios.get(URL+'/emotions/'+this.state.report_id)
            .then((response) => {
                this.setState({api_data:response.data});
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(URL+'/face_video_analyses/'+this.state.report_id)
            .then((response) => {
                //this.setState({notes: response.data.notes});
                this.setState({summary_data: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleGraphsVisible() {
        this.setState((prevState) => {
            return {
                graphsVisible: !prevState.graphsVisible
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

    cambiarFecha(input) {
        var d = new Date(input);
        return d.getDate() + "/" + (d.getMonth()+ 1) + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }

    render() {
        const cardStyle = {
            margin: '58px 200px',
        };
        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.state.report_id} <Button color="primary" onClick={() => {
                    window.print();
                }}> <FontAwesomeIcon icon="download" style={{color: "grey"}}/> &nbsp;Descargar</Button> /
                    {this.state.graphsVisible ? <Button color="primary" onClick={this.handleGraphsVisible}><FontAwesomeIcon icon="eye-slash" style={{color: "grey"}}/> &nbsp;Ocultar gráficas</Button>: <Button color="primary" onClick={this.handleGraphsVisible}><FontAwesomeIcon icon="chart-bar" style={{color: "grey"}}/> &nbsp;Mostrar graficas</Button>} /
                    {this.state.textVisible ? <Button  color="primary" onClick={this.handleTextVisible}><FontAwesomeIcon icon="eye-slash" style={{color: "grey"}}/> &nbsp;Ocultar resumen</Button>: <Button color="primary" onClick={this.handleTextVisible}><FontAwesomeIcon icon="file-alt" style={{color: "grey"}}/> &nbsp;Mostrar resumen</Button>}
                </Typography>
                <Typography variant="display1" gutterBottom>
                    Notas del reporte: {this.state.summary_data?this.state.summary_data.notes:'loading data...'}
                </Typography>
                {this.state.textVisible &&
                    <Card style={cardStyle}>
                        <CardContent>
                            {this.state.summary_data&&
                            <div>

                                <Typography variant="display1" gutterBottom>
                                    RESUMEN ESTADÍSTICO
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {this.state.summary_data.criminal?"Persona Entrevistada: "+this.state.summary_data.criminal.name:"Unknown person"}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {"Fecha del reporte: "+ this.cambiarFecha(this.state.summary_data.created_at)}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {"Duración: "+this.state.summary_data.duration.substr(0, 6)} segundos
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    El genero detectado de la persona analizada es {this.state.summary_data.average_gender}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                        se estima que su edad esta en el rango de {this.state.summary_data.average_age} años de edad.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                        Los promedios de las emociones principales son los siguientes:
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Felicidad:</b> {this.state.summary_data.emotions_percentage[0]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Miedo:</b> {this.state.summary_data.emotions_percentage[1]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Enojo:</b> {this.state.summary_data.emotions_percentage[2]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Disgusto:</b> {this.state.summary_data.emotions_percentage[3]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Tristeza:</b> {this.state.summary_data.emotions_percentage[4]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Desprecio:</b> {this.state.summary_data.emotions_percentage[6]}%
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <b>Sorpresa:</b> {this.state.summary_data.emotions_percentage[7]} %
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    De todas estas emociones, la principal detectada fue la de <b> {this.state.summary_data.dominant_emotion} </b>, la cual tiene la mayor aparicion.
                                </Typography>
                                    {this.state.summary_data.notable_moments.map(function(d){return (
                                        <Typography variant="body1" gutterBottom>
                                            {d}
                                        </Typography>
                                    )
                                    })}

                            </div>
                            }
                        </CardContent>
                    </Card>
                }
                {this.state.graphsVisible &&
                    <Grid container spacing={32}>
                        <Grid item xs={12}>
                            <TimelineChart data={this.state.api_data}/>
                        </Grid>

                        <Grid item xs={6}>
                            <EmotionsPieChart data={this.state.api_data}/>
                        </Grid>
                        <Grid item xs={6}>
                            <EmotionsBarChart data={this.state.api_data}/>
                        </Grid>
                        <Grid item xs={6}>
                            <PositiveNegativeChart data={this.state.api_data}/>
                        </Grid>
                    </Grid>
                }
                <br/>
            </div>
        );
    }
}

export default VideoReport;
