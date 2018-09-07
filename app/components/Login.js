import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { authConfig } from '../constants';


firebase.initializeApp(authConfig);

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

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            user: null
        }
    }

    componentDidMount(){
        let fuckJavascript=this;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
            function() {
                fuckJavascript.setState({loaded: true});
            }
        );

        SignIn(styles, this.state.loaded);
    }
}

function SignIn(props, loaded) {
    const { classes } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <img src={require("../assets/images/logosdec.png")} width={128}/>
                    <Typography variant="title">Logueate !</Typography>
                    <Typography variant="caption">Bienvenido a S.D.E.C</Typography>
                    {loaded ? <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> : <p>Loading...</p>}
                </Paper>
            </main>
        </React.Fragment>
    )
}



export default withStyles(styles)(SignIn);