/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import axios from "axios/index";
import {Line} from 'react-chartjs-2';
import Button from "@material-ui/core/es/Button/Button";


class VideoReport extends React.Component {
    constructor(props){
        super(props);
        this.reportID= window.location.href.slice(-1);
        this.api_data=[];
        this.joy_data=[];
        this.sadness_data=[];
        this.anger_data=[];
        this.fear_data=[];
        this.timestamps=[];
    }

    componentWillMount() {
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000/emotions/'+this.reportID;
        } else {
            URL = 'https://sdec-backend.herokuapp.com/emotions/'+this.reportID;
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
        this.timestamps = this.api_data.map(function(e) {
            return e.timeStamp;
        });

        this.joy_data = this.api_data.map(function(e) {
            return e.emotions.joy;
        });

        this.sadness_data = this.api_data.map(function(e) {
            return e.emotions.sadness;
        });

        this.anger_data = this.api_data.map(function(e) {
            return e.emotions.anger;
        });

        this.fear_data = this.api_data.map(function(e) {
            return e.emotions.fear;
        });

        let data = {
            labels: this.timestamps,
            datasets: [
                {
                    label: 'Joy',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.joy_data
                },
                {
                    label: 'Sadness',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,0,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.sadness_data
                },
                {
                    label: 'Anger',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.anger_data
                },
                {
                    label: 'Fear',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,0,0,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.fear_data
                }

            ]
        };
        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.reportID} <Button variant="outlined" color="primary" onClick={() => { window.print(); }}> Descargar</Button>
                </Typography>
                <Line data={data} />
            </div>
        );
    }
}

export default VideoReport;
