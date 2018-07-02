/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ActionCable from 'actioncable';

class Statistics extends React.Component {
  componentWillMount() {
    this.createSocket();
  }

  createSocket() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create('EmotionChannel', {
      connected: () => {
        alert('connected!');
      },
      received: (data) => {
        console.log(data);
      },
      create(time, fc, appear, emot, express) {
        this.perform('create', {
          timeStamp: time,
          facesCount: fc,
          appearance: appear,
          emotions: emot,
          expressions: express,
        });
      },
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(
      '0.1',
      1,
      '{"gender":"Male","glasses":"No","age":"35 - 44","ethnicity":"Caucasian"}',
      '{"joy":0,"sadness":0,"disgust":0,"contempt":0,"anger":0,"fear":0,"surprise":0,"valence":0,"engagement":0}',
      '{"smile":0,"innerBrowRaise":0,"browRaise":0,"browFurrow":0,"noseWrinkle":0,"upperLipRaise":0,"lipCornerDepressor":0,"chinRaise":0,"lipPucker":0,"lipPress":0,"lipSuck":0,"mouthOpen":0,"smirk":0,"eyeClosure":0,"attention":98,"lidTighten":0,"jawDrop":0,"dimpler":0,"eyeWiden":0,"cheekRaise":0,"lipStretch":0}',
    );
  }

  render() {
    return (
      <div>
        <p>hello world stats</p>
        <button
          onClick={e => this.handleSendEvent(e)}
          className="send"
        >
              Send
        </button>
      </div>
    );
  }
}

export default Statistics;
