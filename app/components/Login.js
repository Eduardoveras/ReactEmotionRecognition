import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyB1mWTY9UZvone47npIeYcmNbxDzwU1JDg",
    authDomain: "vue-path-maker.firebaseapp.com",
    databaseURL: "https://vue-path-maker.firebaseio.com",
    projectId: "vue-path-maker",
    storageBucket: "vue-path-maker.appspot.com",
    messagingSenderId: "813989253785"

};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/home',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};



class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state = { loaded: false }
    }



    componentDidMount(){
        let fuckJavascript=this;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
            function() {
                console.log("yolooooooooooooo");
                fuckJavascript.setState({loaded: true});
            }
        );
    }

    render() {

        return (
            <div>
                <br/><br/><br/><br/><br/>
                {this.state.loaded ? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> : <p>Loading</p>}
            </div>
        );
    }
}

export default Login;