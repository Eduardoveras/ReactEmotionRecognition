import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.verifyData = this.verifyData.bind(this);
    }

    verifyData() {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            window.location.href = "/home";
        }
    }

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    handleUserChange = event => {
        this.setState({username: event.target.value});
    };


    render() {
        const inputStyle = {
            margin: '18px',
        };
        const cardStyle = {
            margin: '58px 200px',
        };

        return (
            <div>
                <br/>
                <Card style={cardStyle}>
                    <CardContent>

                        <div>
                            <Typography variant="display1" gutterBottom>
                                Iniciar Sesion
                            </Typography>
                            <div className="login-up">
                                <TextField
                                    style={inputStyle}
                                    label="Usuario"
                                    onChange={this.handleUserChange}
                                    required
                                />
                                <br/>
                                <TextField
                                    style={inputStyle}
                                    label="Contraseña"
                                    type="password"
                                    onChange={this.handlePasswordChange}
                                    required
                                />
                                <br/>
                                <br/>
                                <Button variant="contained" color="primary"
                                        onClick={this.verifyData}>Iniciar Session</Button>
                            </div>
                        </div>


                    </CardContent>
                    <CardActions>
                        <Button size="small">Recuperar contraseña</Button>
                    </CardActions>
                </Card>

            </div>
        );
    }
}

export default Login;