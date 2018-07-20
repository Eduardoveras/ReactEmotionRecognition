import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    verificarDatos(usuario, contrasena) {
        if (usuario.length > 0 && contrasena.length > 0) {
            window.location.href = "/home";
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <br/>
                        <div className="login">
                            <AppBar position="static" color="default" title="Entra al detector de emociones"/>
                            <div className="login-up">
                                <TextField
                                    hintText="Usuario"
                                    floatingLabelText="Introduce tu usuario"
                                    onChange={(event, newValue) => this.setState({username: newValue})}
                                    required
                                />
                                <br/>
                                <TextField
                                    type="password"
                                    hintText="Contraseña"
                                    floatingLabelText="Introduce tu contraseña"
                                    onChange={(event, newValue) => this.setState({password: newValue})}
                                    required
                                />
                                <br/>
                                <br/>
                                <RaisedButton label="ENTRA !" primary={true}
                                              onClick={(event) => this.verificarDatos(this.state.username, this.state.password)}/>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;