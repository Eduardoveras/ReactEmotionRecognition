/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from "axios/index";
import {BASE_URL_PATH} from "../../constants";

class EmotionsPieChart extends React.Component {
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
        this.state={
            settings:null
        }
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
            if (siguiente > 0) {
                cantidadFelicidad += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadTristeza = 1;
        this.sadnessLength = this.sadness_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
                cantidadTristeza += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadEnojo = 1;
        this.angerLength = this.anger_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
                cantidadEnojo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadMiedo = 1;
        this.fearLength = this.fear_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
                cantidadMiedo += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadSorpresa = 1;
        this.surpriseLength = this.surprise_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
                cantidadSorpresa += 1;
            }
            return anterior + siguiente;
        }, 0);

        let cantidadDisgusto = 1;
        this.disgustLength = this.disgust_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
                cantidadDisgusto += 1;
            }
            return anterior + siguiente;
        }, 0);


        let cantidadContempt = 1;
        this.contemptLength = this.contempt_data.reduce(function (anterior, siguiente) {
            if (siguiente > 0) {
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

        let data_circle_char = {
            labels: [],
            datasets: [{
                data: [],
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

        if(this.state.settings) {
            if (this.state.settings.joy_enabled) {
                data_circle_char.labels.push('Felicidad');
                data_circle_char.datasets[0].data.push(this.joyLength / cantidadFelicidad);

            }
            if (this.state.settings.sadness_enabled) {
                data_circle_char.labels.push('Tristeza');
                data_circle_char.datasets[0].data.push(this.sadnessLength / cantidadTristeza);

            }
            if (this.state.settings.anger_enabled) {
                data_circle_char.labels.push('Enojo');
                data_circle_char.datasets[0].data.push(this.angerLength / cantidadEnojo);

            }
            if (this.state.settings.surprise_enabled) {
                data_circle_char.labels.push('Sorpresa');
                data_circle_char.datasets[0].data.push(this.surpriseLength / cantidadSorpresa);

            }
            if (this.state.settings.disgust_enabled) {
                data_circle_char.labels.push('Disgusto');
                data_circle_char.datasets[0].data.push(this.disgustLength / cantidadDisgusto);

            }
            if (this.state.settings.contempt_enabled) {
                data_circle_char.labels.push('Desprecio');
                data_circle_char.datasets[0].data.push(this.contemptLength / cantidadContempt);

            }

            if (this.state.settings.fear_enabled) {
                data_circle_char.labels.push('Miedo');
                data_circle_char.datasets[0].data.push(this.fearLength / cantidadMiedo);

            }
        }

        return (
            <div className='container'>
                {this.api_data===[]?null:<Doughnut data={data_circle_char} width={100} height={500}
                                                   options={{
                                                       responsive: true,
                                                       maintainAspectRatio: false,
                                                       title: {
                                                           display: true,
                                                           text: 'Promedios de porcentajes en forma de circulo'
                                                       },
                                                       tooltips: {
                                                           callbacks: {
                                                               label: function(tooltipItem, data) {
                                                                   let dataset = data.datasets[tooltipItem.datasetIndex];
                                                                   let total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                                                       return previousValue + currentValue;
                                                                   });
                                                                   let currentValue = dataset.data[tooltipItem.index];
                                                                   let precentage = Math.floor(((currentValue/total) * 100)+0.5);
                                                                   return precentage + "%";
                                                               }
                                                           }
                                                       }
                                                   }}/>}
            </div>
        );
    }
}

export default EmotionsPieChart;
