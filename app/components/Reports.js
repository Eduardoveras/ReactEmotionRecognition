/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
                return (
                    <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                            {n.id}
                        </TableCell>
                        <TableCell>{n.notes}</TableCell>
                    </TableRow>
                );
            });
        };
        return (
            <div>
                <h3> Reports</h3>


                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell numeric>Calories</TableCell>
                                <TableCell numeric>Fat (g)</TableCell>
                                <TableCell numeric>Carbs (g)</TableCell>
                                <TableCell numeric>Protein (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.reportList ?
                                <div>{renderReportList()}</div>:null}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default Reports;
