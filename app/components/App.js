import React from 'react';
import $ from 'jquery';
import affdex from '../vendors/affdex'

const divStyle = {
  width: '130px',
  height: '130px',
};

const colStyle = {
  width: '680px',
  height: '520px',
};

const affStyle = {
  height: '100%',
  marginTop: '14px',
};

const centerTextStyle = {
  textAlign: 'center',
};


class App extends React.Component {


  constructor(props)
  {
      super(props);

      // SDK Needs to create video and canvas nodes in the DOM in order to function
      // Here we are adding those nodes a predefined div.
      this.width = 640;
      this.height = 480;
      this.faceMode = affdex.FaceDetectorMode.LARGE_FACES;
      this.detector = new affdex.CameraDetector(1, this.width, this.height, this.faceMode);

      // Enable detection of all Expressions, Emotions and Emojis classifiers.
      this.detector.detectAllEmotions();
      this.detector.detectAllExpressions();
      this.detector.detectAllEmojis();
      this.detector.detectAllAppearance();
  }

  componentDidMount() {
      console.log($(this.refs.affElement)[0]);
      this.detector = new affdex.CameraDetector($(this.refs.affElement)[0], this.width, this.height, this.faceMode);

    // Add a callback to notify when the detector is initialized and ready for runing.
    this.detector.addEventListener('onInitializeSuccess', () => {
      this.log('#logs', 'The detector reports initialized');
      // Display canvas instead of video feed because we want to draw the feature points on it
      $('#face_video_canvas').css('display', 'block');
      $('#face_video').css('display', 'none');
    });


    // Add a callback to notify when camera access is allowed
    this.detector.addEventListener('onWebcamConnectSuccess', () => {
      this.log('#logs', 'Webcam access allowed');
    });

    // Add a callback to notify when camera access is denied
    this.detector.addEventListener('onWebcamConnectFailure', () => {
      this.log('#logs', 'webcam denied');
      console.log('Webcam access denied');
    });

    // Add a callback to notify when detector is stopped
    this.detector.addEventListener('onStopSuccess', () => {
      this.log('#logs', 'The detector reports stopped');
      $('#results').html('');
    });

    // Add a callback to receive the results from processing an image.
    // The faces object contains the list of the faces detected in an image.
    this.detector.addEventListener('onImageResultsSuccess', (faces, image, timestamp) => {
      $('#results').html('');
      this.log('#results', `Timestamp: ${timestamp.toFixed(2)}`);
      this.log('#results', `Number of faces found: ${faces.length}`);
      if (faces.length > 0) {
        this.log('#results', `Appearance: ${JSON.stringify(faces[0].appearance)}`);
        this.log('#results', `Emotions: ${JSON.stringify(faces[0].emotions, (key, val) => {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        })}`);
        this.log('#results', `Expressions: ${JSON.stringify(faces[0].expressions, (key, val) => {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        })}`);
        this.log('#results', `Emoji: ${faces[0].emojis.dominantEmoji}`);
        this.drawFeaturePoints(image, faces[0].featurePoints);
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
    this.log('#logs', 'Clicked the start button');
  }

  // function executes when the Stop button is pushed.
  onStop() {
    this.log('#logs', 'Clicked the stop button');
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  }

  // function executes when the Reset button is pushed.
  onReset() {
    this.log('#logs', 'Clicked the reset button');
    if (this.detector && this.detector.isRunning) {
      this.detector.reset();

      $('#results').html('');
    }
  }

  log(node_name, msg) {
    $(node_name).append(`<span>${msg}</span><br />`);
  }

  drawFeaturePoints(img, featurePoints) {
    const contxt = $('#face_video_canvas')[0].getContext('2d');

    const hRatio = contxt.canvas.width / img.width;
    const vRatio = contxt.canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);

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

  render() {
      return <div>
          <div className="sidenav">
              <img alt="yolo" style={divStyle} src="../assets/images/logosdec.png"/>
              <a href="manual.html">Manual</a>
              <a href="demo.html">Deteccion</a>
              <a href="reportes.html">Reportes</a>
              <a href="estadisticas.html">Estadisticas</a>
          </div>
          <div className="container-fluid main">
              <div className="row border border-primary rounded main-box">
                  <div className="col-md-8" style={colStyle}>
                      <div id="affdex_elements" style={affStyle} ref="affElement"/>
                      <div className="center-text" style={centerTextStyle}>
                          <div id="results"/>
                          <div>
                              <h3>Logs del detector</h3>
                              <button id="start" onClick={this.onStart.bind(this)}>Start</button>
                              <button id="stop" onClick={this.onStop.bind(this)}>Stop</button>
                              <button id="reset" onClick={this.onReset.bind(this)}>Reset</button>
                          </div>
                          <div id="logs"/>
                      </div>
                  </div>

              </div>
          </div>
      </div>;
  }
}

export default App;
