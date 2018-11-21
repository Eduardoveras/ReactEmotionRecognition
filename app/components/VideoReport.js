/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import axios from "axios/index";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import TimelineChart from './fragments/timelineChart'
import EmotionsBarChart from './fragments/EmotionsBarChart'
import EmotionsPieChart from './fragments/EmotionsPieChart'
import PositiveNegativeChart from './fragments/PositiveNegativeEmotionsChart'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartBar, faFileAlt, faEyeSlash, faDownload} from '@fortawesome/free-solid-svg-icons'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {BASE_URL_PATH} from "../constants";

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
            graphsVisible: true,
            porcentajes: []
        };
    }

    componentWillMount() {
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000';
        } else {
            URL = 'https://sdec-backend.herokuapp.com';
        }
        axios.get(URL + '/emotions/' + this.state.report_id)
            .then((response) => {
                this.setState({api_data: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(URL + '/face_video_analyses/' + this.state.report_id)
            .then((response) => {
                //this.setState({notes: response.data.notes});
                this.setState({summary_data: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(BASE_URL_PATH + '/all_emotions')
            .then((response) => {
                this.setState({porcentajes: response.data});
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

    porcentajeRango1(porcentaje, porcentaje2) {
        return (porcentaje >= 0 <= 25 && porcentaje2 >= 0 <= 25)
            || (porcentaje >= 26 <= 50 && porcentaje2 >= 26 <= 50)
            || (porcentaje >= 51 <= 75 && porcentaje2 >= 51 <= 75)
            || (porcentaje >= 76 <= 100 && porcentaje2 >= 76 <= 100);
    }

    sacarEmocion(indice) {
        if (indice === 0) {
            return "Felicidad";
        }
        if (indice === 1) {
            return "Miedo";
        }
        if (indice === 2) {
            return "Enojo";
        }
        if (indice === 3) {
            return "Disgusto";
        }
        if (indice === 4) {
            return "Tristeza";
        }
        if (indice === 5) {
            return "Desprecio";
        }
        if (indice === 6) {
            return "Sorpresa";
        }
    }

    sacarPorcentajes() {

        let cantidadBorrados = 0;
        let arregloExistentes = [];
        this.state.porcentajes.map((e) => {
            arregloExistentes.push(e.id);
        });

        for (let i = 0; i < 1000; i += 1) {
            if (!arregloExistentes.includes(i) && i <= arregloExistentes.pop()) {
                cantidadBorrados += 1;
            }
        }

        console.log("BORRADOS: " + cantidadBorrados);


        let tamanoPorcentajes = this.state.porcentajes.length;
        console.log("TAMANO PORCENTAJES: " + tamanoPorcentajes);
        let Mensaje = "";
        let MensajeEmociones = "";
        let indiceEmociones = 0;
        this.state.porcentajes.map((tabla, indice) => {
            tabla.emotions_percentage.map((porcentaje, indiceP) => {
                if (indiceP === 5) {
                    indiceEmociones = 6;
                }
                if (indice + 1 <= tamanoPorcentajes - 1 && (indiceEmociones + 1) <= 8 && parseInt(this.state.report_id) !== indice + 2) {
                    if (this.porcentajeRango1(this.state.porcentajes[parseInt(this.state.report_id) - cantidadBorrados].emotions_percentage[indiceEmociones], this.state.porcentajes[indice + 1].emotions_percentage[indiceEmociones])) {
                        Mensaje = "El reporte: " + parseInt(this.state.report_id) + " se parece al reporte: " + (indice + 2) + ". Debido a las siguientes situaciones:";
                        MensajeEmociones += " La emoción: " + this.sacarEmocion(indiceP) + " tienen promedios de: "
                            + this.state.porcentajes[parseInt(this.state.report_id) - cantidadBorrados].emotions_percentage[indiceEmociones] + " en el reporte #" + parseInt(this.state.report_id) + " y de: "
                            + this.state.porcentajes[indice + 1].emotions_percentage[indiceEmociones] + " en el reporte #" + (indice + 2) + ". ";
                    }
                }
                indiceEmociones += 1;
            });
        });

        return Mensaje + MensajeEmociones;
    }


    cambiarFecha(input) {
        var d = new Date(input);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }

    render() {
        const cardStyle = {
            margin: '58px 120px',
        };
        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.state.report_id} <Button color="primary" onClick={() => {
                    window.print();
                }}> <FontAwesomeIcon icon="download" style={{color: "grey"}}/> &nbsp;Descargar</Button> /
                    {this.state.graphsVisible ?
                        <Button color="primary" onClick={this.handleGraphsVisible}><FontAwesomeIcon icon="eye-slash"
                                                                                                    style={{color: "grey"}}/> &nbsp;Ocultar
                            gráficas</Button> :
                        <Button color="primary" onClick={this.handleGraphsVisible}><FontAwesomeIcon icon="chart-bar"
                                                                                                    style={{color: "grey"}}/> &nbsp;Mostrar
                            graficas</Button>} /
                    {this.state.textVisible ?
                        <Button color="primary" onClick={this.handleTextVisible}><FontAwesomeIcon icon="eye-slash"
                                                                                                  style={{color: "grey"}}/> &nbsp;Ocultar
                            resumen</Button> :
                        <Button color="primary" onClick={this.handleTextVisible}><FontAwesomeIcon icon="file-alt"
                                                                                                  style={{color: "grey"}}/> &nbsp;Mostrar
                            resumen</Button>}
                </Typography>
                <Typography variant="display1" gutterBottom>
                    Notas del reporte: {this.state.summary_data ? this.state.summary_data.notes : 'loading data...'}
                </Typography>
                {this.state.textVisible &&
                <Card style={cardStyle}>
                    <CardContent>
                        {this.state.summary_data &&
                        <div>
                            <Typography variant="display1" gutterBottom>
                                RESUMEN ESTADÍSTICO
                            </Typography>
                            <hr/>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell numeric><Typography variant="body1">Persona entrevistada {' '} <span
                                            style={{fontSize: "1rem"}}>👨</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Fecha del reporte {' '} <span
                                            style={{fontSize: "1rem"}}>📆</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Duración (seg) {' '} <span
                                            style={{fontSize: "1rem"}}>⏱</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Genero {' '} <span
                                            style={{fontSize: "1rem"}}>🚻</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Rango de edad {' '} <span
                                            style={{fontSize: "1rem"}}>🔞</span></Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell numeric>
                                        {this.state.summary_data.criminal ? this.state.summary_data.criminal.name : "N/A"}
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.cambiarFecha(this.state.summary_data.created_at)}
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.duration.substr(0, 6)} segundos
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.average_gender}
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.average_age} años
                                    </TableCell>
                                </TableBody>
                            </Table>
                            <br/>
                            <Typography variant="subheading" gutterBottom style={{color: "grey"}}>
                                <b><i>Promedios de las emociones</i></b>
                                <hr/>
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell numeric><Typography variant="body1">Felicidad {' '} <span
                                            style={{fontSize: "1rem"}}>😃</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Miedo {' '} <span
                                            style={{fontSize: "1rem"}}>😱</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Enojo {' '} <span
                                            style={{fontSize: "1rem"}}>😡</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Disgusto {' '} <span
                                            style={{fontSize: "1rem"}}>😫</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Tristeza {' '} <span
                                            style={{fontSize: "1rem"}}>😢</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Desprecio {' '} <span
                                            style={{fontSize: "1rem"}}>😕</span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Sorpresa {' '} <span
                                            style={{fontSize: "1rem"}}>😲</span></Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[0]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[1]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[2]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[3]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[4]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[6]}%
                                    </TableCell>
                                    <TableCell numeric>
                                        {this.state.summary_data.emotions_percentage[7]}%
                                    </TableCell>
                                </TableBody>
                            </Table>
                            <br/>
                            <Card style={{
                                marginBottom: "1rem",
                                background: "linear-gradient(45deg, #b6dcfb 0%, #2196F2 50%, #2196F1 100%) no-repeat fixed"
                            }}>
                                <CardHeader title="👁️ Observaciones" subheader="Relaciones entre los reportes"/>
                                <hr/>
                                <CardContent>
                                    <Typography variant="body1">
                                        <span style={{color: "white"}}><b>{this.sacarPorcentajes()}</b></span>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Typography variant="body1" gutterBottom>
                                De todas estas emociones, la principal detectada fue la
                                de <b> {this.state.summary_data.dominant_emotion}</b>, la cual tiene la mayor
                                aparición.
                                Y la de menor aparición fue <b> {this.state.summary_data.lesser_emotion}</b>.
                                <br/>
                                La proporcion de emociones <b>{this.state.summary_data.emotion_trend}</b>
                                <br/> <br/>
                            </Typography>
                            <Typography variant="subheading" gutterBottom style={{color: "grey"}}>
                                <b><i>Momentos en los que hubo emociones paralelas</i></b>
                                <hr/>
                            </Typography>
                            <Table style={{width: "370px"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell numeric><Typography variant="body1">Número {' '} <span
                                            style={{fontSize: "1rem"}}>#️⃣ </span></Typography></TableCell>
                                        <TableCell numeric><Typography variant="body1">Momento (tiempo) {' '} <span
                                            style={{fontSize: "1rem"}}>⏱</span></Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.summary_data.notable_moments.map(function (d, index) {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    {index}
                                                </TableCell>
                                                <TableCell numeric>
                                                    {d.substr(49, 57)}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
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
