/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {BASE_URL_PATH} from '../../constants';
import TextField from "@material-ui/core/TextField/TextField";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle);

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        //width: '50px',
        backgroundColor: 'white',
        //boxShadow: theme.shadows[5],
        padding: '1.5rem',
    };
}

class createCriminal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            name: ''

        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateCriminal = this.handleCreateCriminal.bind(this);
    }

    componentDidMount() {

    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleCreateCriminal = () => {

        axios.post(BASE_URL_PATH + '/criminals',
            {
                criminal:
                    {
                        name: this.state.name
                    }
            })
            .then((response) => {
                alert("Persona a interrogar creada correctamente.");
                this.props.action();
                this.setState({open: false, name:''});

            })
            .catch((error) => {
                console.log(error);
            });

    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };


    render() {

        return (
            <span className={root}>
                <Button variant="extendedFab" onClick={this.handleOpen} style={{marginLeft: "1rem", marginBottom: "1rem", marginTop: "0.74rem", display: "inline"}}><span style={{fontSize: "22px"}}>👨</span> &nbsp;Crear persona</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()}>
                        <Typography variant="title" id="modal-title">
                            Crea una nueva persona
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                            Escribe el nombre de la persona interrogada aqui:
                        </Typography>
                        <TextField
                            onChange={this.handleChange}
                            value={this.state.name}
                            label="Nombre"
                            name="name"
                            margin="normal"
                            variant="outlined"
                        /><br/>
                        <Button variant="contained" color="primary" onClick={this.handleCreateCriminal}><FontAwesomeIcon icon="user-circle"/>&nbsp;Crear persona</Button>

                    </div>
                </Modal>

            </span>
        )
    }
}

export default createCriminal;
