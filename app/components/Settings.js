import React from 'react';
import axios from "axios";
import {BASE_URL_PATH} from "../constants";


class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            settings:null
        };

        this.switch_emotion = this.switch_emotion.bind(this);
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

    switch_emotion(emotion){
        if(emotion==='fear')
        {axios.patch(BASE_URL_PATH+'/settings/1', { setting: {fear_enabled:!this.state.settings.fear_enabled} })
            .then(function (response) {
                console.log(response);
                this.setState({settings: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                window.location.reload();
            });
        }
    }

    render() {
        return (
            <div className='container' id='container'>
                <h1> Settings</h1>
                {this.state.settings?
                    <div>
                        Joy Enabled: {this.state.settings.joy_enabled?'true':'false'} <button>Enable</button> <br/>
                        Sadness Enabled: {this.state.settings.sadness_enabled?'true':'false'} <button>Enable</button> <br/>
                        Anger Enabled: {this.state.settings.anger_enabled?'true':'false'} <button>Enable</button> <br/>
                        contempt Enabled: {this.state.settings.contempt_enabled?'true':'false'}<button>Enable</button> <br/>
                        disgust Enabled: {this.state.settings.disgust_enabled?'true':'false'}<button>Enable</button> <br/>
                        fear Enabled: {this.state.settings.fear_enabled?'true':'false'}<button onClick={this.switch_emotion.bind(this,'fear')}>Enable</button> <br/>
                        surprise Enabled: {this.state.settings.surprise_enabled?'true':'false'}<button>Enable</button> <br/>
                    </div>

                    :'Loading data...'}
                {}

            </div>
        );
    }
}

export default Settings;
