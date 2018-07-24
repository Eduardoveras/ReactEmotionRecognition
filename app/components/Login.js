import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.verifyData=this.verifyData.bind(this);
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

        return (
            <div>
                <div>
                    <br/>
                    <div className="login">
                        <Typography variant="display1" gutterBottom>
                            Iniciar Sesion
                        </Typography>
                        <div className="login-up">
                            <input
                                onChange={this.handleUserChange}
                                required
                            />
                            <br/>
                            <input
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
                </div>
            </div>
        );
    }
}

export default Login;