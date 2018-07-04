/* eslint-disable react/prefer-stateless-function */
import ActionCable from 'actioncable';

class ActionCableService {

    createSocket() {
        const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
        this.chats = cable.subscriptions.create('EmotionChannel', {
            connected: () => {
                alert('connected!');
            },
            received: (data) => {
                console.log(data);
            },
            create(id,time, fc, appear, emot, express) {
                this.perform('create', {
                    video_id: id,
                    timeStamp: time,
                    facesCount: fc,
                    appearance: appear,
                    emotions: emot,
                    expressions: express,
                });
            },
        });
    }

    sendEvent(id,timeStamp,facesCount,appearance,emotions,expressions) {
        this.chats.create(
            id,
            timeStamp,
            facesCount,
            appearance,
            emotions,
            expressions,
        );
    }
}

export default ActionCableService;
