/* eslint-disable react/prefer-stateless-function */
import ActionCable from 'actioncable';
import { toast } from 'react-toastify';


class ActionCableService {

    createSocket() {
        let URL=null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        {
            URL = 'ws://localhost:3000/cable';
        }
        else {
            URL= 'wss://sdec-backend.herokuapp.com/cable'
        }
        const cable = ActionCable.createConsumer(URL);
        this.chats = cable.subscriptions.create('EmotionChannel', {
            connected: () => {
                toast.info('connected!');
            },
            received: (data) => {
                //console.log(data);
            },
            create(id,time, fc, appear, emot, express, measure,fp) {
                this.perform('create', {
                    video_id: id,
                    timeStamp: time,
                    facesCount: fc,
                    appearance: appear,
                    emotions: emot,
                    expressions: express,
                    measurements: measure,
                    featurePoints: fp
                });
            },
        });
    }

    sendEvent(id,timeStamp,facesCount,appearance,emotions,expressions,measurements,featurePoints) {
        this.chats.create(
            id,
            timeStamp,
            facesCount,
            appearance,
            emotions,
            expressions,
            measurements,
            featurePoints
        );
    }
}

export default ActionCableService;
