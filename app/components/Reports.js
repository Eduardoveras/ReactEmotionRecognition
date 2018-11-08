/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/es/Typography/Typography";
import {BASE_URL_PATH, URL_PATH} from '../constants';
import {library} from "@fortawesome/fontawesome-svg-core/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import ReactTable from 'react-table'

library.add(faTrash);
library.add(faEye);


class Reports extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 10,
            sortBy: 'test'
        };
    }

    deleteReport(id){
        let decision = confirm("Estás seguro de que quieres archivar este reporte?\nEsta acción no puede ser deshecha.");
        if (decision){
            let URL = BASE_URL_PATH+'/face_video_analyses/'+id;
            axios.patch(URL, { face_video_analysis: {enabled:false} })
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
        axios.get(URL_PATH)
            .then((response) => {
                this.setState({ data: response.data });
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
            Header: 'Criminal Name',
            accessor: 'criminal.name',
        }, {
            Header: 'Duration',
            accessor: 'duration',
        }, {
            Header: 'test',
            accessor: 'friend.age'
        },{
            Header: 'Ver',
            id: 'edit',
            accessor: 'id',
            Cell: ({value}) => (<Button variant="contained" color="primary" href={"/reports/"+value}>
                <FontAwesomeIcon icon="eye"/> &nbsp;Ver
            </Button>)
        },{
            Header: 'Borrar',
            id: 'delete',
            accessor: 'id',
            Cell: ({value}) => (<Button style={{color: "white"}} variant="contained" color="secondary" onClick={()=>{this.deleteReport(value)}}><FontAwesomeIcon icon="trash"/> &nbsp;Archivar</Button>)
        }];
        const {data} = this.state;
        console.log(data);

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reportes
                </Typography>

                <ReactTable
                    nextText="Siguiente"
                    prevText="Anterior"
                    data={data}
                    columns={columns}
                />
            </div>
        );
    }
}

export default Reports;
