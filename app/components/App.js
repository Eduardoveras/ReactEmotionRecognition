import React from 'react';
import $ from 'jquery';
import EmotionService from '../services/emotion_recognition/emotion_recognition_service'


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
      console.log('WORLD');
      this.emotionService = new EmotionService(640,480,$(this.refs.affElement)[0]);
      console.log('HELLO');
  }

    onStart() {
        this.emotionService.onStart();
    }

    onStop() {
        this.emotionService.onStop();
    }

    onReset() {
        this.emotionService.onReset();
    }

    descargarReporte() {
        this.emotionService.descargarReporte();
    }


  render() {
    return (
      <div>
          <div className="col-md-8 app-column" >
              <div id="affdex_elements" ref="affElement"></div>
              <div className="center-text">
                  <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                      <button id="start" className="btn btn-primary" onClick={this.onStart.bind(this)}>Iniciar</button>
                      <button id="stop" className="btn btn-primary" onClick={this.onStop.bind(this)}>Parar</button>
                      <button id="reset" className="btn btn-primary" onClick={this.onReset.bind(this)}>Reiniciar</button>
                      <button id="reporte" className="btn btn-primary" onClick={this.descargarReporte.bind(this)}>Descargar</button>
                  </div>
                  <div>
                      <h3><strong>Log's del detector</strong></h3>
                  </div>
                  <div id="logs"/>
              </div>
          </div>
          <div className="col-md-5">
              <div className="resultados">
                  <h1><strong>Resultados Detectados</strong></h1>
                  <div id="results" />
              </div>
          </div>
      </div>
    );
  }
}

export default App;

