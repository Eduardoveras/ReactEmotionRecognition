/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import axios from "axios/index";
import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import Button from "@material-ui/core/es/Button/Button";

class VideoReport extends React.Component {
    constructor(props){
        super(props);
        this.reportID= window.location.href.split('/').pop();
        this.api_data=[];
        this.joy_data=[];
        this.joyLength = 0;
        this.sadness_data=[];
        this.sadnessLength = 0;
        this.anger_data=[];
        this.angerLength = 0;
        this.fear_data=[];
        this.fearLength = 0;
        this.timestamps=[];
        this.disgust_data=[];
        this.disgustLength = 0;
        this.contempt_data=[];
        this.contemptLength = 0;
        this.surprise_data=[];
        this.surpriseLength=0;
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

        this.disgust_data = this.api_data.map(function(e) {
            return e.emotions.disgust;
        });

        this.contempt_data = this.api_data.map(function(e) {
            return e.emotions.contempt;
        });

        this.surprise_data = this.api_data.map(function(e) {
            return e.emotions.surprise;
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
        let cantidadFelicidad = 1;
        this.joyLength = this.joy_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                 cantidadFelicidad += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadTristeza = 1;
        this.sadnessLength = this.sadness_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadTristeza += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadEnojo = 1;
        this.angerLength = this.anger_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadEnojo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadMiedo = 1;
        this.fearLength = this.fear_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadMiedo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadSorpresa = 1;
        this.surpriseLength = this.surprise_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadSorpresa += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadDisgusto = 1;
        this.disgustLength = this.disgust_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadDisgusto += 1;
            }
            return anterior + siguiente;
        }, 0);


        let cantidadContempt = 1;
        this.contemptLength = this.contempt_data.reduce(function(anterior, siguiente) {
            if(siguiente > 10){
                cantidadContempt += 1;
            }
            return anterior + siguiente;
        }, 0);


        if(cantidadFelicidad <= 1){
            this.joyLength = 0;
        }

        if(cantidadTristeza <= 1){
            this.sadnessLength = 0;
        }

        if(cantidadEnojo <= 1){
            this.angerLength = 0;
        }

        if(cantidadMiedo <= 1){
            this.fearLength = 0;
        }

        if(cantidadSorpresa <= 1){
            this.surpriseLength = 0;
        }

        if(cantidadDisgusto <= 1){
            this.disgustLength = 0;
        }

        if(cantidadContempt === 1){
            this.contemptLength = 0;
        }

        let data2 = {
            labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Contempt'],
                datasets: [{
                data: [this.joyLength / cantidadFelicidad, this.sadnessLength / cantidadTristeza, this.angerLength / cantidadEnojo, this.fearLength / cantidadMiedo, this.surpriseLength / cantidadSorpresa, this.disgustLength / cantidadDisgusto, this.contemptLength / cantidadContempt],
                backgroundColor: [
                    'rgba(75,192,192, 0.4)',
                    'rgba(75,0,192,0.4)',
                    'rgba(196,212,17,0.4)',
                    'rgba(75,0,0,0.4)',
                    'rgba(17,98,212,0.4)',
                    'rgba(212,37,17,0.4)',
                    'rgba(6,85,45,0.4)'
                ],
                borderColor: [
                    'rgba(75,192,192, 1)',
                    'rgba(75,0,192,1)',
                    'rgba(196,212,17,1)',
                    'rgba(75,0,0,1)',
                    'rgba(17,98,212,1)',
                    'rgba(212,37,17,1)',
                    'rgba(6,85,45,1)'
                ],
                borderWidth: 1
            }]
        };

        let data3 = {
            labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Contempt'],
            datasets: [{
                label: 'Promedio de porcentaje de la emocion X',
                data: [this.joyLength / cantidadFelicidad, this.sadnessLength / cantidadTristeza, this.angerLength / cantidadEnojo, this.fearLength / cantidadMiedo, this.surpriseLength / cantidadSorpresa, this.disgustLength / cantidadDisgusto, this.contemptLength / cantidadContempt],
                backgroundColor: [
                    'rgba(75,192,192, 0.4)',
                    'rgba(75,0,192,0.4)',
                    'rgba(196,212,17,0.4)',
                    'rgba(75,0,0,0.4)',
                    'rgba(17,98,212,0.4)',
                    'rgba(212,37,17,0.4)',
                    'rgba(6,85,45,0.4)'
                ],
                borderColor: [
                    'rgba(75,192,192, 1)',
                    'rgba(75,0,192,1)',
                    'rgba(196,212,17,1)',
                    'rgba(75,0,0,1)',
                    'rgba(17,98,212,1)',
                    'rgba(212,37,17,1)',
                    'rgba(6,85,45,1)'
                ],
                borderWidth: 1
            }]
        };


        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.reportID} <Button variant="outlined" color="primary" onClick={() => { window.print(); }}> Descargar</Button>
                </Typography>
                <Typography variant="title" gutterBottom>
                    <strong>Emociones detectadas con sus porcentajes en el tiempo</strong>
                </Typography>
                {this.api_data && <Line data={data} />}
                <Typography variant="title" gutterBottom>
                    <strong>Promedios de porcentajes en forma de circulo</strong>
                </Typography>
                {this.api_data && <Doughnut data={data2}/>}
                <Typography variant="title" gutterBottom>
                    <strong>Promedios de porcentajes en barra</strong>
                </Typography>
                {this.api_data && <Bar data={data3}/>}
            </div>
        );
    }
}

export default VideoReport;
