/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/es/Typography/Typography";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles/index";
import purple from "@material-ui/core/colors/purple";
import { withTheme } from '@material-ui/core/styles'
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";
import { URL_PATH } from '../constants';
import {BASE_URL_PATH} from '../constants';
import {faChartBar, faFileAlt, faHome, faSignOutAlt, faUserSecret} from "@fortawesome/free-solid-svg-icons/index";
import {library} from "@fortawesome/fontawesome-svg-core/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faEye} from '@fortawesome/free-solid-svg-icons'
import ReactTable from 'react-table'
import 'react-table/react-table.css'



library.add(faTrash);
library.add(faEye);


const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class Reports extends React.Component {
    constructor(props){
        super(props);
        this.reportList=[];
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 10,
            sortBy: 'test'
        };
        //this.handleChangeSort = this.handleChangeSort.bind(this);
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
      let URL = URL_PATH;
      axios.get(URL)
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
        const { data, rowsPerPage, page } = this.state;
        console.log(data);
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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

export default withTheme()(Reports);
