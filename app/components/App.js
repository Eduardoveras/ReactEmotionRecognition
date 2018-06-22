import React from 'react';
import $ from 'jquery';
import affdex from '../vendors/affdex';

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
      App.log('#logs', 'The detector reports initialized');
      // Display canvas instead of video feed because we want to draw the feature points on it
      $('#face_video_canvas').css('display', 'block');
      $('#face_video').css('display', 'none');
    });


    // Add a callback to notify when camera access is allowed
    this.detector.addEventListener('onWebcamConnectSuccess', () => {
      App.log('#logs', 'Webcam access allowed');
    });

    // Add a callback to notify when camera access is denied
    this.detector.addEventListener('onWebcamConnectFailure', () => {
      App.log('#logs', 'webcam denied');
      console.log('Webcam access denied');
    });

    // Add a callback to notify when detector is stopped
    this.detector.addEventListener('onStopSuccess', () => {
      App.log('#logs', 'The detector reports stopped');
      $('#results').html('');
    });

    // Add a callback to receive the results from processing an image.
    // The faces object contains the list of the faces detected in an image.
    this.detector.addEventListener('onImageResultsSuccess', (faces, image, timestamp) => {
      $('#results').html('');
      App.log('#results', `Timestamp: ${timestamp.toFixed(2)}`);
      App.log('#results', `Number of faces found: ${faces.length}`);
      if (faces.length > 0) {
        App.log('#results', `Appearance: ${JSON.stringify(faces[0].appearance)}`);
        App.log('#results', `Emotions: ${JSON.stringify(faces[0].emotions, (key, val) => {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        })}`);
        App.log('#results', `Expressions: ${JSON.stringify(faces[0].expressions, (key, val) => {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        })}`);
        App.log('#results', `Emoji: ${faces[0].emojis.dominantEmoji}`);
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
    App.log('#logs', 'Clicked the start button');
  }

  // function executes when the Stop button is pushed.
  onStop() {
    App.log('#logs', 'Clicked the stop button');
    if (this.detector && this.detector.isRunning) {
      this.detector.removeEventListener();
      this.detector.stop();
    }
  }

  // function executes when the Reset button is pushed.
  onReset() {
    App.log('#logs', 'Clicked the reset button');
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

  render() {
    return (
        <div>
            <div id="affdex_elements" ref="affElement" />
            <div className="center-text" >
              <div id="results" />
              <div>
                <h3>Logs del detector</h3>
                <button id="start" onClick={this.onStart.bind(this)}>Start</button>
                <button id="stop" onClick={this.onStop.bind(this)}>Stop</button>
                <button id="reset" onClick={this.onReset.bind(this)}>Reset</button>
              </div>
              <div id="logs" />
      </div>
    </div>
    );
  }
}

export default App;
