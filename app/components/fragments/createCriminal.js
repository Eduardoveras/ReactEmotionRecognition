/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {BASE_URL_PATH} from '../../constants';
import TextField from "@material-ui/core/TextField/TextField";


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
                alert("Created Correctly");
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
            <div className={root}>
                <Button onClick={this.handleOpen}>Create New Person</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()}>
                        <Typography variant="title" id="modal-title">
                            Text in a modal
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        <TextField
                            onChange={this.handleChange}
                            value={this.state.name}
                            label="Name"
                            name="name"
                            margin="normal"
                            variant="outlined"
                        /><br/>
                        <Button onClick={this.handleCreateCriminal}>Create New Person</Button>

                    </div>
                </Modal>

            </div>
        )
    }
}

export default createCriminal;
