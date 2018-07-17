/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import axios from "axios/index";
import {Doughnut, Bar} from 'react-chartjs-2';
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import TimelineChart from './fragments/timelineChart'
import EmotionsBarChart from './fragments/EmotionsBarChart'
import EmotionsPieChart from './fragments/EmotionsPieChart'
import PositiveNegativeChart from './fragments/PositiveNegativeEmotionsChart'

class VideoReport extends React.Component {
    constructor(props) {
        super(props);
        this.reportID = window.location.href.split('/').pop();
        this.api_data = [];
    }

    componentWillMount() {
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000/emotions/' + this.reportID;
        } else {
            URL = 'https://sdec-backend.herokuapp.com/emotions/' + this.reportID;
        }
        axios.get(URL)
            .then((response) => {
                this.api_data = response.data;
                this.forceUpdate()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.reportID} <Button variant="outlined" color="primary" onClick={() => {
                    window.print();
                }}> Descargar</Button>
                </Typography>
                {this.api_data===[]?<p>Loading...</p>:<Grid container spacing={32}>
                    <Grid item xs={12}>
                        <TimelineChart data={this.api_data}/>
                    </Grid>

                    <Grid item xs={6}>
                        <EmotionsPieChart data={this.api_data}/>
                    </Grid>
                    <Grid item xs={6}>
                        <EmotionsBarChart data={this.api_data}/>
                    </Grid>
                    <Grid item xs={6}>
                        <PositiveNegativeChart data={this.api_data}/>
                    </Grid>
                </Grid>}


            </div>
        );
    }
}

export default VideoReport;
