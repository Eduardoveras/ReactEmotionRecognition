import React from 'react';
import axios from "axios";
import {BASE_URL_PATH} from "../constants";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

library.add(faEye);
library.add(faEyeSlash);

const tableStyle = {
    minWidth: 700,
    textAlign: 'center'
};

const welcomeStyle = {
    padding: "20px",
    textAlign: 'center',
    marginRight: "20%",
    marginLeft: "20%"
};

const paperStyle = {
    padding: "20px",
    textAlign: 'center',
    height: '30vh',
    marginBottom: "35px"
};


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            settings:null
        };

        this.switch_emotion = this.switch_emotion.bind(this);
    }
    componentWillMount(){

        axios.get(BASE_URL_PATH+'/settings')
            .then((response) => {
                this.setState({ settings: response.data[0] });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    switch_emotion(emotion){
        if(emotion==='fear')
        {axios.patch(BASE_URL_PATH+'/settings/1', { setting: {fear_enabled:!this.state.settings.fear_enabled} })
            .then(function (response) {
                console.log(response);
                this.setState({settings: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                window.location.reload();
            });
        }else if(emotion==='sadness'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {sadness_enabled:!this.state.settings.sadness_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else if(emotion==='joy'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {joy_enabled:!this.state.settings.joy_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else if(emotion==='anger'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {anger_enabled:!this.state.settings.anger_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else if(emotion==='contempt'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {contempt_enabled:!this.state.settings.contempt_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else if(emotion==='disgust'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {disgust_enabled:!this.state.settings.disgust_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else if(emotion==='surprise'){
            axios.patch(BASE_URL_PATH+'/settings/1', { setting: {surprise_enabled:!this.state.settings.surprise_enabled} })
                .then(function (response) {
                    console.log(response);
                    this.setState({settings: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }else {
            console.log('invalid emotion ma fren')
        }
    }

    render() {
        return (
            <div className='container' id='container'>
                <Typography variant="display1">Ajustes</Typography> <br/>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper style={welcomeStyle}>
                            <Typography variant="body1" color="inherit">Quita o agrega de los gráficos cualquier emoción que desees, el botón de color azul significa habilitar y el boton gris deshabilitar.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper style={paperStyle}>
                            <div>
                                {this.state.settings?
                                    <div>
                                        <Table style={tableStyle}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell numeric>Felicidad</TableCell>
                                                    <TableCell numeric>Tristeza</TableCell>
                                                    <TableCell numeric>Enojo</TableCell>
                                                    <TableCell numeric>Desprecio</TableCell>
                                                    <TableCell numeric>Disgusto</TableCell>
                                                    <TableCell numeric>Miedo</TableCell>
                                                    <TableCell numeric>Sorpresa</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableCell numeric>
                                                    {this.state.settings.joy_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'joy')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'joy')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.sadness_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'sadness')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'sadness')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.anger_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'anger')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'anger')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.contempt_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'contempt')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'contempt')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.disgust_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'disgust')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'disgust')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.fear_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'fear')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'fear')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.state.settings.surprise_enabled ?
                                                        <Button variant="fab" color="default" onClick={this.switch_emotion.bind(this, 'surprise')}>
                                                            <FontAwesomeIcon icon="eye-slash" size={10}/>
                                                        </Button>
                                                        :
                                                        <Button variant="fab" color="primary" onClick={this.switch_emotion.bind(this, 'surprise')}>
                                                            <FontAwesomeIcon icon="eye" size={10}/>
                                                        </Button>
                                                    }
                                                </TableCell>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    :'Loading data...'}
                                {}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Settings;
