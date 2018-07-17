/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import axios from "axios/index";
import {Line} from 'react-chartjs-2';
import {Doughnut, Bar} from 'react-chartjs-2';
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";

class timelineChart extends React.Component {
    constructor(props) {
        super(props);
        this.api_data = [];
        console.log(this.props.data);
        this.joy_data = [];
        this.sadness_data = [];
        this.anger_data = [];
        this.fear_data = [];
        this.timestamps = [];
        this.disgust_data = [];
        this.contempt_data = [];
        this.surprise_data = [];
    }

    render() {
        this.api_data=this.props.data;
        this.timestamps = this.api_data.map(function (e) {
            return parseFloat(e.timeStamp).toFixed(2);
        });

        this.joy_data = this.api_data.map(function (e) {
            return e.emotions.joy;
        });

        this.sadness_data = this.api_data.map(function (e) {
            return e.emotions.sadness;
        });

        this.anger_data = this.api_data.map(function (e) {
            return e.emotions.anger;
        });

        this.fear_data = this.api_data.map(function (e) {
            return e.emotions.fear;
        });

        this.disgust_data = this.api_data.map(function (e) {
            return e.emotions.disgust;
        });

        this.contempt_data = this.api_data.map(function (e) {
            return e.emotions.contempt;
        });

        this.surprise_data = this.api_data.map(function (e) {
            return e.emotions.surprise;
        });


        let data_line_chart = {
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
                    backgroundColor: 'rgba(196,212,17,0.4)',
                    borderColor: 'rgba(196,212,17,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(196,212,17,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(196,212,17,1)',
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
                },
                {
                    label: 'Surprise',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(17,98,212,0.4)',
                    borderColor: 'rgba(17,98,212,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(17,98,212,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(17,98,212,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.surprise_data
                },

                {
                    label: 'Contempt',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(6,85,45,0.4)',
                    borderColor: 'rgba(6,85,45,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(6,85,45,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(6,85,45,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.contempt_data
                },

                {
                    label: 'Disgust',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(212,37,17,0.4)',
                    borderColor: 'rgba(212,37,17,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(212,37,17,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(212,37,17,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.disgust_data
                }

            ]
        };

        return (this.api_data===[]? null : <Line data={data_line_chart} width={100} height={500}
                                                 options={{
                                                     responsive: true,
                                                     maintainAspectRatio: false,
                                                     title: {
                                                         display: true,
                                                         text: 'Emociones detectadas en el tiempo'
                                                     },
                                                     scales: {
                                                         xAxes: [{
                                                             ticks: {
                                                                 fixedStepSize: 1
                                                             }
                                                         }],
                                                     },
                                                 }}/>);
    }
}

export default timelineChart;
