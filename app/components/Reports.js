/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import {Table, TableBody, TableCell,TableHead, TableRow, withTheme, Paper, Grid} from '@material-ui/core/';
import Typography from "@material-ui/core/es/Typography/Typography";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core/styles/index";
import purple from "@material-ui/core/colors/purple";
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";
import '../assets/scss/app/reports.scss'

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
            rowsPerPage: 10
        };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentWillMount() {
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000/face_video_analyses';
        } else {
            URL = 'https://sdec-backend.herokuapp.com/face_video_analyses';
        }
        axios.get(URL)
            .then((response) => {
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
                    Reportes
                </Typography>

                <Grid container spacing={24} >
                    <Grid item xs={9}>
                        <Paper>
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell numeric>ID</TableCell>
                                            <TableCell >Persona</TableCell>
                                            <TableCell >Notas</TableCell>
                                            <TableCell >Fecha</TableCell>
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

export default withTheme()(Reports);
