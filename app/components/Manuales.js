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
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';

library.add(faPlayCircle);

const paperStyle = {
    padding: "20px",
    textAlign: 'center',
    height: '87vh',
    marginBottom: "35px"
};

class Manuales extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container' id='container'>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Paper style={paperStyle}>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Manuales;
