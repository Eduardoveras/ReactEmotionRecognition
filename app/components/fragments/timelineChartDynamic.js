/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import {Line} from 'react-chartjs-2';

class timelineChartDynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_data: this.props.api_data,
            joy_data: [1],
            sadness_data: [1],
            anger_data: [1],
            fear_data: [1],
            timestamps: [1],
            disgust_data: [1],
            contempt_data: [],
            surprise_data: [],
        };
        this.addDataToChart = this.addDataToChart.bind(this);

    }

    addDataToChart(data){
        const joined = this.state.api_data.concat(data);
        this.setState({ api_data: joined })
    }

    componentWillMount(){
        this.state.timestamps = this.state.api_data.map(function (e) {
            return parseFloat(e.timeStamp).toFixed(2);
        });

        this.state.joy_data = this.state.api_data.map(function (e) {
            return e.emotions.joy;
        });

        this.state.sadness_data = this.state.api_data.map(function (e) {
            return e.emotions.sadness;
        });

        this.state.anger_data = this.state.api_data.map(function (e) {
            return e.emotions.anger;
        });

        this.state.fear_data = this.state.api_data.map(function (e) {
            return e.emotions.fear;
        });

        this.state.disgust_data = this.state.api_data.map(function (e) {
            return e.emotions.disgust;
        });

        this.state.contempt_data = this.state.api_data.map(function (e) {
            return e.emotions.contempt;
        });

        this.state.surprise_data = this.state.api_data.map(function (e) {
            return e.emotions.surprise;
        });

    }




    render() {



        let data_line_chart = {
            labels: this.state.timestamps,
            datasets: [
                {
                    label: 'Felicidad',
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
                    data: this.state.joy_data
                },
                {
                    label: 'Tristeza',
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
                    data: this.state.sadness_data
                },
                {
                    label: 'Enojo',
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
                    data: this.state.anger_data
                },
                {
                    label: 'Miedo',
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
                    data: this.state.fear_data
                },
                {
                    label: 'Sorpresa',
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
                    data: this.state.surprise_data
                },

                {
                    label: 'Desprecio',
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
                    data: this.state.contempt_data
                },

                {
                    label: 'Disgusto',
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
                    data: this.state.disgust_data
                }

            ]
        };

        return (this.state.api_data === [] ? null : <Line data={data_line_chart} width={900} height={400}
                                                          options={{
                                                              responsive: false,
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

export default timelineChartDynamic;