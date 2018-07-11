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
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";

const paperStyle = {
    padding: '20px',
    textAlign: 'center',
    height: '87vh'
};

class Reports extends React.Component {
    constructor(props){
        super(props);
        this.reportList=[];
    }


    componentWillMount() {
        console.log('Component will mount with reports: '+this.reportList);
        let URL = null;
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            URL = 'http://localhost:3000/face_video_analyses';
        } else {
            URL = 'https://sdec-backend.herokuapp.com/face_video_analyses';
        }
        axios.get(URL)
            .then((response) => {
                this.reportList = response.data;
                console.log('Component will mount with reports: '+this.reportList);
                this.forceUpdate()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {


        let renderReportList = () => {
            return this.reportList.map((n) => {
                let created = new Date(n.created_at)
                return (
                    <TableRow key={n.id}>
                        <TableCell>
                            {n.id}
                        </TableCell>
                        <TableCell><Button href={"/reports/"+n.id}>Pepito Pepe</Button></TableCell>
                        <TableCell>{n.notes}</TableCell>
                        <TableCell>{created.toLocaleDateString('es-DO')}</TableCell>
                    </TableRow>
                );
            });
        };
        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reportes
                </Typography>

                <Grid container spacing={24} >
                    <Grid item xs={9}>
                        <Paper style={paperStyle}>
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
                                    {this.reportList ? renderReportList():null}
                                </TableBody>
                            </Table>
                        </Paper>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Reports;
