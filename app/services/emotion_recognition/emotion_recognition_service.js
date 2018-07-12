import $ from 'jquery';
import affdex from '../../vendors/affdex';
import title from '../../assets/images/reports/title';
import list from '../../assets/images/reports/list';
import percentage from '../../assets/images/reports/percentage';
import ActionCableService from '../../services/emotion_recognition/action_cable_service'



class EmotionRecognitionService {

  constructor(width, height ,affElement) {
      this.videoId=null;
      this.cable=null;
      this.reporte = '';
      this.positivas = 0;
      this.negativas = 0;
      this.felicidad = 0;
      this.tristeza = 0;
      this.disgusto = 0;
      this.desprecio = 0;
      this.enojo = 0;
      this.miedo = 0;
      this.sorpresa = 0;
    this.width = width;
    this.height = height;

      // SDK Needs to create video and canvas nodes in the DOM in order to function
      // Here we are adding those nodes a predefined div.
      this.affRef = affElement
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
          EmotionRecognitionService.log('#logs', 'Los reportes del detector han inicializado.');
          // Display canvas instead of video feed because we want to draw the feature points on it
          $('#face_video_canvas').css('display', 'block');
          $('#face_video').css('display', 'none');
      });


      // Add a callback to notify when camera access is allowed
      this.detector.addEventListener('onWebcamConnectSuccess', () => {
          EmotionRecognitionService.log('#logs', 'Acceso a la camara permitido !');
      });

      // Add a callback to notify when camera access is denied
      this.detector.addEventListener('onWebcamConnectFailure', () => {
          EmotionRecognitionService.log('#logs', 'webcam denied');
          console.log('Acceso a la camara denegado !');
      });

      // Add a callback to notify when detector is stopped
      this.detector.addEventListener('onStopSuccess', () => {
          EmotionRecognitionService.log('#logs', 'Los reportes del detector han terminado');
          $('#results').html('');
      });

      // Add a callback to receive the results from processing an image.
      // The faces object contains the list of the faces detected in an image.
      this.detector.addEventListener('onImageResultsSuccess', (faces, image, timestamp) => {
          let porcentajeAMostrar = 25;
          const horas = Math.trunc(timestamp / 3600).toString().padStart(2, '0');
          const minutos = Math.trunc((timestamp % 3600) / 60).toString().padStart(2, '0');
          const segundos = Math.trunc(timestamp % 60).toString().padStart(2, '0');
          $('#results').html('');
          console.log(faces[0])
          this.cable.sendEvent(this.videoId,timestamp,faces.length,faces[0].appearance,faces[0].emotions,faces[0].expressions);
          EmotionRecognitionService.log('#results', `<strong>Tiempo en la sesión: </strong>${horas}:${minutos}:${segundos} | HH:MM:SS`);
          if (faces.length > 0) {
              /*
              EmotionRecognitionService.log('#results', `Emotions: ${JSON.stringify(faces[0].emotions, (key, val) => {
                return val.toFixed ? Number(val.toFixed(0)) : val;
              })}`);
              */
              if (faces[0].emotions.joy > porcentajeAMostrar){
                  EmotionRecognitionService.log('#results', "<strong class='text-primary'> Felicidad: </strong> " + faces[0].emotions.joy.toFixed(2), function (key, val) {
                      return val.toFixed ? Number(val.toFixed(2)) : val;
                  });

                  this.positivas += 1;
                  this.felicidad += 1;

                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Felicidad encontrada con un porcentaje de: " + faces[0].emotions.joy + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }


              if(faces[0].emotions.sadness > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-danger'>Tristeza: </strong> " + faces[0].emotions.sadness.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(2)) : val;
                  });

                  this.negativas += 1;
                  this.tristeza += 1;

                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Tristeza encontrada con un porcentaje de: " + faces[0].emotions.sadness + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }

              if(faces[0].emotions.disgust > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-danger'>Disgusto: </strong> " + faces[0].emotions.disgust.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(0)) : val;
                  });
                  this.negativas += 1;
                  this.disgusto += 1;


                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Disgusto encontrado con un porcentaje de: " + faces[0].emotions.disgust  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }

              if(faces[0].emotions.contempt > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-danger'>Desprecio: </strong> " + faces[0].emotions.contempt.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(0)) : val;
                  });
                  this.negativas += 1;
                  this.desprecio += 1;


                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Desprecio encontrado con un porcentaje de: " + faces[0].emotions.contempt  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }

              if(faces[0].emotions.anger > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-danger'>Enojo: </strong> " + faces[0].emotions.anger.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(0)) : val;
                  });
                  this.negativas += 1;
                  this.enojo += 1;

                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Enojo encontrado con un porcentaje de: " + faces[0].emotions.anger  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }

              if(faces[0].emotions.fear > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-danger'>Miedo: </strong> " + faces[0].emotions.fear.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(0)) : val;
                  });
                  this.negativas += 1;
                  this.miedo += 1;

                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Miedo encontrado con un porcentaje de: " + faces[0].emotions.fear  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }
              }

              if(faces[0].emotions.surprise > porcentajeAMostrar)
              {
                  EmotionRecognitionService.log('#results', "<strong class='text-primary'>Sorpresa: </strong> " + faces[0].emotions.surprise.toFixed(2), function(key, val) {
                      return val.toFixed ? Number(val.toFixed(0)) : val;
                  });
                  this.positivas += 1;
                  this.sorpresa += 1;

                  if((timestamp.toFixed(2) % 5) <= 1)
                  {
                      this.reporte += "Sorpresa encontrado con un porcentaje de: " + faces[0].emotions.surprise  + " en el minuto: " + ((timestamp/60).toFixed(2)) + ". \n";
                  }

              }

              EmotionRecognitionService.log('#results', `Emoji acorde a la emoción detectada: </br></br></br></br></br></br></br><div class="emoji">${faces[0].emojis.dominantEmoji}</div>`);
              EmotionRecognitionService.log("#results", " ");
              EmotionRecognitionService.log("#results", "<h3><strong>Otros valores:</strong></h3>");
              EmotionRecognitionService.log('#results', "<strong class='text-primary'>Atención a la cámara: </strong> " + faces[0].emotions.engagement.toFixed(2), function(key, val) {
                  return val.toFixed ? Number(val.toFixed(0)) : val;
              });

              EmotionRecognitionService.drawFeaturePoints(image, faces[0].featurePoints);
          }
      });
  }


    // function executes when Start button is pushed.
    onStart(video_id) {
        if (this.detector && !this.detector.isRunning) {
            $('#logs').html('');

            this.cable = new ActionCableService;
            this.cable.createSocket();

            console.log('Llego el id: '+video_id);
            this.videoId=video_id;
            this.detector.start();
        }
        EmotionRecognitionService.log('#logs', 'Clickeado el boton de iniciar');
    }

    // function executes when the Stop button is pushed.
    onStop() {
        EmotionRecognitionService.log('#logs', 'Clickeado el boton de parar.');
        if (this.detector && this.detector.isRunning) {
            this.detector.removeEventListener();
            this.detector.stop();
        }
    }

    // function executes when the Reset button is pushed.
    onReset() {
        EmotionRecognitionService.log('#logs', 'Clickeado el boton de resetear.');
        if (this.detector && this.detector.isRunning) {
            this.detector.reset();

            $('#results').html('');
        }
    }

    static log(nodeName, msg) {
        $(nodeName).append(`<span class="log_msg">${msg}</span><br />`);
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
        doc.text('Porcentaje de emociones positivas en la sesion: ' + (this.positivas/(this.positivas + this.negativas))*100 + "%", 10, contador);
        contador += 30;
        doc.text('Porcentaje de emociones negativas en la sesion: ' + (this.negativas/(this.positivas + this.negativas))*100 + "%", 10, contador)
        contador += 30;
        doc.addImage(emociones, 'PNG', 0, contador, 720, 88);
        contador += 100;
        doc.setFontSize(27);
        doc.text('Cantidad de veces que estuvo feliz: ' + this.felicidad + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo triste: ' + this.tristeza + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo enojado: ' + this.felicidad + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo sorprendido: ' + this.sorpresa + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo disgustado: ' + this.disgusto + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo despreciable: ' + this.desprecio + '.', 10, contador)
        contador += 20;
        doc.text('Cantidad de veces que estuvo aterrado: ' + this.miedo + '.', 10, contador)
        contador += 30;
        doc.text('------------------------------------------------', 10, contador);
        contador += 20;

        let lineasReporte = this.reporte.split("\n");

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



}

export default EmotionRecognitionService;
