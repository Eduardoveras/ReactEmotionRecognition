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

const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class Cases extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 0,
            rowsPerPage: 10
        };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    deleteCase(id){
        let decision = confirm("Are you sure you want to delete the Case?\nthis cant be undone.");
        if (decision){
            axios.delete(BASE_URL_PATH+'/cases/'+id)
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

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentWillMount() {
        let URL = BASE_URL_PATH+'/cases';
        axios.get(URL)
            .then((response) => {
                console.log(response.data);
                this.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { data, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Casos
                </Typography>

                <Grid container spacing={32} >
                    <Grid item xs={12}>
                        <Paper>
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell numeric>ID</TableCell>
                                            <TableCell >Persona</TableCell>
                                            <TableCell >Notas</TableCell>
                                            <TableCell >Fecha</TableCell>
                                            <TableCell >Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(n => {
                                                let created = new Date(n.created_at)
                                                return (
                                                    <TableRow key={n.id}>
                                                        <TableCell component="th" scope="row">
                                                            {n.id}
                                                        </TableCell>
                                                        <TableCell >Persona Personica</TableCell>
                                                        <TableCell >{n.notes}</TableCell>

                                                        <TableCell numeric>{created.toLocaleDateString('es-DO')}</TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" color="primary" href={"/casos/"+n.id}>
                                                                View
                                                            </Button>
                                                            <Button variant="contained" color="secondary" onClick={this.deleteCase.bind(this, n.id)}>
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <MuiThemeProvider theme={theme}>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    colSpan={3}
                                                    count={data.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onChangePage={this.handleChangePage}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </MuiThemeProvider>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withTheme()(Cases);
