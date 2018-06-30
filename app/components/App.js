import React from 'react';
import $ from 'jquery';
import affdex from '../vendors/affdex';
import title from '../assets/images/reports/title'
import list from '../assets/images/reports/list'
import percentage from '../assets/images/reports/percentage'
import 'bootstrap/dist/css/bootstrap.css';

let reporte = "";
let positivas = 0;
let negativas = 0;
let felicidad = 0;
let tristeza = 0;
let disgusto = 0;
let desprecio = 0;
let enojo = 0;
let miedo = 0;
let sorpresa = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.width = 640;
    this.height = 480;
  }

  componentDidMount() {
    // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    this.affRef = $(this.refs.affElement)[0]
    this.faceMode = affdex.FaceDetectorMode.LARGE_FACES;
    this.detector = new affdex.CameraDetector(1, this.width, this.height, this.faceMode);
    this.detector = new affdex.CameraDetector(
      $(this.affRef)[0],
      this.width,
      this.height,
      this.faceMode,
    );
    // Enable detection of all Expressions, Emotions and Emojis classifiers.
    this.detector.detectAllEmotions();
    this.detector.detectAllExpressions();
    this.detector.detectAllEmojis();
    this.detector.detectAllAppearance();

    // Add a callback to notify when the detector is initialized and ready for runing.
    this.detector.addEventListener('onInitializeSuccess', () => {
      App.log('#logs', 'Los reportes del detector han inicializado.');
      // Display canvas instead of video feed because we want to draw the feature points on it
      $('#face_video_canvas').css('display', 'block');
      $('#face_video').css('display', 'none');
    });


    // Add a callback to notify when camera access is allowed
    this.detector.addEventListener('onWebcamConnectSuccess', () => {
      App.log('#logs', 'Acceso a la camara permitido !');
    });

    // Add a callback to notify when camera access is denied
    this.detector.addEventListener('onWebcamConnectFailure', () => {
      App.log('#logs', 'webcam denied');
      console.log('Acceso a la camara denegado !');
    });

    // Add a callback to notify when detector is stopped
    this.detector.addEventListener('onStopSuccess', () => {
      App.log('#logs', 'Los reportes del detector han terminado');
      $('#results').html('');
    });

    // Add a callback to receive the results from processing an image.
    // The faces object contains the list of the faces detected in an image.
    this.detector.addEventListener('onImageResultsSuccess', (faces, image, timestamp) => {
        let porcentajeAMostrar = 25;
      $('#results').html('');
      App.log('#results', `Tiempo en la sesion: ${(timestamp.toFixed(2))/60}`);
      if (faces.length > 0) {
          /*
          App.log('#results', `Emotions: ${JSON.stringify(faces[0].emotions, (key, val) => {
            return val.toFixed ? Number(val.toFixed(0)) : val;
          })}`);
          */
          if (faces[0].emotions.joy > porcentajeAMostrar){
              App.log('#results', "<strong> Felicidad: </strong> " + faces[0].emotions.joy, function (key, val) {
                  return val.toFixed ? Number(val.toFixed(2)) : val;
              });

              positivas += 1;
              felicidad += 1;

              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Felicidad encontrada con un porcentaje de: " + faces[0].emotions.joy + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }


          if(faces[0].emotions.sadness > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-danger'>Tristeza: </strong> " + faces[0].emotions.sadness, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(2)) : val;
              });

              negativas += 1;
              tristeza += 1;

              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Tristeza encontrada con un porcentaje de: " + faces[0].emotions.sadness + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }

          if(faces[0].emotions.disgust > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-danger'>Disgusto: </strong> " + faces[0].emotions.disgust, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });
              negativas += 1;
              disgusto += 1;


              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Disgusto encontrado con un porcentaje de: " + faces[0].emotions.disgust  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }

          if(faces[0].emotions.contempt > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-danger'>Desprecio: </strong> " + faces[0].emotions.contempt, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });
              negativas += 1;
              desprecio += 1;


              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Desprecio encontrado con un porcentaje de: " + faces[0].emotions.contemp  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }

          if(faces[0].emotions.anger > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-danger'>Enojo: </strong> " + faces[0].emotions.anger, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });
              negativas += 1;
              enojo += 1;

              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Enojo encontrado con un porcentaje de: " + faces[0].emotions.anger  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }

          if(faces[0].emotions.fear > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-danger'>Miedo: </strong> " + faces[0].emotions.fear, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });
              negativas += 1;
              miedo += 1;

              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Miedo encontrado con un porcentaje de: " + faces[0].emotions.fear  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }
          }

          if(faces[0].emotions.surprise > porcentajeAMostrar)
          {
              App.log('#results', "<strong className='text-primary'>Sorpresa: </strong> " + faces[0].emotions.surprise, function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });
              positivas += 1;
              sorpresa += 1;

              if((timestamp.toFixed(2) % 5) <= 1)
              {
                  reporte += "Sorpresa encontrado con un porcentaje de: " + faces[0].emotions.surprise  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
              }

          }

          App.log('#results', "Emoji acorde a la emocion detectada: " + faces[0].emojis.dominantEmoji);
          App.log("#results", " ");
          App.log("#results", "<h3><strong>Otros valores:</strong></h3>");
          App.log('#results', "<strong className='text-primary'>Atencion a la camara: </strong> " + faces[0].emotions.engagement, function(key, val) {
              return val.toFixed ? Number(val.toFixed(0)) : val;
          });

          App.drawFeaturePoints(image, faces[0].featurePoints);
      }
    });

    // Draw the detected facial feature points on the image
  }


  // function executes when Start button is pushed.
  onStart() {
    if (this.detector && !this.detector.isRunning) {
      $('#logs').html('');
      this.detector.start();
    }
    App.log('#logs', 'Clickeado el boton de iniciar');
  }

  // function executes when the Stop button is pushed.
  onStop() {
    App.log('#logs', 'Clickeado el boton de parar.');
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  }

  // function executes when the Reset button is pushed.
  onReset() {
    App.log('#logs', 'Clickeado el boton de resetear.');
    if (this.detector && this.detector.isRunning) {
      this.detector.reset();

      $('#results').html('');
    }
  }

  static log(nodeName, msg) {
    $(nodeName).append(`<span>${msg}</span><br />`);
  }

  static drawFeaturePoints(img, featurePoints) {
    const contxt = $('#face_video_canvas')[0].getContext('2d');

    contxt.strokeStyle = '#FFFFFF';
    for (const id in featurePoints) {
      contxt.beginPath();
      contxt.arc(
        featurePoints[id].x,
        featurePoints[id].y, 2, 0, 2 * Math.PI,
      );
      contxt.stroke();
    }
  }

  descargarReporte() {
      let count = 1;
      let jsPDF = require('jspdf');
      let doc = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1920, 1080]
      });

      doc.setFontSize(35);

      let imgData = title;
      let posneg = list;
      let emociones = percentage;
      doc.addImage(imgData, 'PNG', 0, 0, 799, 312);
      let contador = 350;
      doc.addImage(posneg, 'PNG', 0, contador, 676, 88);
        contador += 120;
        doc.text('Porcentaje de emociones positivas en la sesion: ' + (positivas/(positivas + negativas))*100 + "%", 10, contador);
        contador += 30;
        doc.text('Porcentaje de emociones negativas en la sesion: ' + (negativas/(positivas + negativas))*100 + "%", 10, contador)
        contador += 30;
        doc.addImage(emociones, 'PNG', 0, contador, 720, 88);
        contador += 100;
        doc.setFontSize(27);
        doc.text('Cantidad de veces que estuvo feliz: ' + felicidad + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo triste: ' + tristeza + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo enojado: ' + felicidad + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo sorprendido: ' + sorpresa + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo disgustado: ' + disgusto + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo despreciable: ' + desprecio + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo aterrado: ' + miedo + '.', 10, contador)
        contador += 30;
        doc.text('------------------------------------------------', 10, contador);
        contador += 20;

        let lineasReporte = reporte.split("\n");

        for(let i = 0; i < lineasReporte.length; i++)
        {
            doc.text(lineasReporte[i], 10, contador);
            contador += 20;
            if(contador % 1000 == 0)
            {
                doc.setFontSize(50);
                doc.text('Pagina [ ' + count + ' ]', 930, contador + 10);
                doc.setFontSize(27);
                count++;
                contador = 80;
                doc.addPage();

            }
        }

        contador += 20;

      doc.output('dataurlnewwindow');
      doc.save('reporteX.pdf');
    }

  render() {
    return (
      <div>
        <div id="affdex_elements" ref="affElement" />
        <div className="center-text" >
          <div id="results" />
          <div>
            <h3>Logs del detector</h3>
            <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <button id="start" className="btn btn-primary" onClick={this.onStart.bind(this)}>Iniciar</button>
            <button id="stop" className="btn btn-success" onClick={this.onStop.bind(this)}>Parar</button>
            <button id="reset" className="btn btn-danger" onClick={this.onReset.bind(this)}>Reiniciar</button>
            <button id="reporte" className="btn btn-warning" onClick={this.descargarReporte.bind(this)}>Descargar</button>
            </div>
          </div>
          <div id="logs" />
        </div>
      </div>
    );
  }
}

export default App;

