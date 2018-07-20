/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import {Bar} from 'react-chartjs-2';

class EmotionsBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.api_data = [];
        this.joy_data = [];
        this.joyLength = 0;
        this.sadness_data = [];
        this.sadnessLength = 0;
        this.anger_data = [];
        this.angerLength = 0;
        this.fear_data = [];
        this.fearLength = 0;
        this.disgust_data = [];
        this.disgustLength = 0;
        this.contempt_data = [];
        this.contemptLength = 0;
        this.surprise_data = [];
        this.surpriseLength = 0;
    }

    render() {
        this.api_data=this.props.data;

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


        let cantidadFelicidad = 1;
        this.joyLength = this.joy_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadFelicidad += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadTristeza = 1;
        this.sadnessLength = this.sadness_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadTristeza += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadEnojo = 1;
        this.angerLength = this.anger_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadEnojo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadMiedo = 1;
        this.fearLength = this.fear_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadMiedo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadSorpresa = 1;
        this.surpriseLength = this.surprise_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadSorpresa += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadDisgusto = 1;
        this.disgustLength = this.disgust_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadDisgusto += 1;
            }
            return anterior + siguiente;
        }, 0);


        let cantidadContempt = 1;
        this.contemptLength = this.contempt_data.reduce(function (anterior, siguiente) {
            if (siguiente > 10) {
                cantidadContempt += 1;
            }
            return anterior + siguiente;
        }, 0);


        if (cantidadFelicidad <= 1) {
            this.joyLength = 0;
        }

        if (cantidadTristeza <= 1) {
            this.sadnessLength = 0;
        }

        if (cantidadEnojo <= 1) {
            this.angerLength = 0;
        }

        if (cantidadMiedo <= 1) {
            this.fearLength = 0;
        }

        if (cantidadSorpresa <= 1) {
            this.surpriseLength = 0;
        }

        if (cantidadDisgusto <= 1) {
            this.disgustLength = 0;
        }

        if (cantidadContempt === 1) {
            this.contemptLength = 0;
        }

        let data_bar_char = {
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
            <div>
                        {this.api_data===[]?null:
                        <Bar data={data_bar_char} width={100} height={500}
                             legend={{
                                 display: true,
                                 position: 'top',
                                 fullWidth: true,
                                 reverse: false,
                                 labels: {
                                     fontColor: 'rgb(0, 0, 0)'
                                 }
                             }}
                             options={{
                                 responsive: true,
                                 maintainAspectRatio: false,
                                 title: {
                                     display: true,
                                     text: 'Promedios de porcentajes en barra'
                                 }
                             }}
                        />}
            </div>
        );
    }
}

export default EmotionsBarChart;
