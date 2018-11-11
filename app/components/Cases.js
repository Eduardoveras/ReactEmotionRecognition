/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/es/Typography/Typography";
import {BASE_URL_PATH} from '../constants';
import {library} from "@fortawesome/fontawesome-svg-core/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import ReactTable from "react-table";

library.add(faTrash);
library.add(faEye);
library.add(faPlus);

class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 10
        };
    }

    deleteCase(id) {
        let decision = confirm("Estás seguro de que quieres archivar este caso?\nEsta acción no puede ser deshecha.");
        if (decision) {
            axios.patch(BASE_URL_PATH + '/cases/' + id, {case: {enabled: false}})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    window.location.reload();
                });
        }


    }

    componentWillMount() {
        let URL = BASE_URL_PATH + '/cases';
        axios.get(URL)
            .then((response) => {
                console.log(response.data);
                this.setState({data: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    createNewCase() {
        let URL = BASE_URL_PATH + '/cases';
        axios.post(URL,
            {
                case:
                    {
                        notes: ''
                    }
            })
            .then((response) => {
                window.location.pathname = '/casos/' + response.data.id;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const columns = [{
            Header: 'ID',
            accessor: 'id'
        }, {
            Header: 'Notas',
            accessor: 'notes',
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
        }, {
            Header: 'Fecha',
            accessor: 'created_at',
            filterMethod: (filter, row) =>
                row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
        }, {
            Header: 'Ver',
            id: 'edit',
            accessor: 'id',
            Cell: ({value}) => (<Button variant="contained" color="primary" href={"/casos/" + value}>
                <FontAwesomeIcon icon="eye"/> &nbsp;Ver
            </Button>),
            Filter: ({ filter, onChange }) => <div>---</div>
        }, {
            Header: 'Archivar',
            id: 'delete',
            accessor: 'id',
            Cell: ({value}) => (<Button style={{color: "white"}} variant="contained" color="secondary" onClick={() => {
                this.deleteCase(value)
            }}><FontAwesomeIcon icon="trash"/> &nbsp;Archivar</Button>),
            Filter: ({ filter, onChange }) => <div>---</div>
        }];
        const {data} = this.state;

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Casos {'  '}
                    <Button variant="fab" color="primary" aria-label="Add" onClick={this.createNewCase.bind(this)}>
                        <FontAwesomeIcon icon="plus"/>
                    </Button>
                </Typography>

                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Paper>
                            <div>
                                <ReactTable
                                    nextText="Siguiente"
                                    prevText="Anterior"
                                    data={data}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]) === filter.value}
                                    columns={columns}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Cases;
