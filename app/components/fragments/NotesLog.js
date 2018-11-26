/* eslint-disable react/forbid-prop-types */
import React from 'react';
import axios from "axios";
import {BASE_URL_PATH} from "../../constants";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

class NotesLog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            report_id: props.report_id,
            data: ''

        };

    }

    componentWillMount() {
        axios.get(BASE_URL_PATH + '/face_video_analyses/' + this.props.report_id)
            .then((response) => {
                this.setState({data: response.data});
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {

        return (
            <span className={root}>
                <Card>

                 <CardContent >
                     <Typography gutterBottom variant="h5" component="h2">
                         Notas de la session
                     </Typography>
                     <div className="notes-log-card">
                         {this.state.data?this.state.data.logs.map(function (d) {
                             return (
                                 <Typography component="p">{d + "\t"}</Typography>
                             )
                         }):"Loading..."}</div>
                 </CardContent>

                </Card>


            </span>
        )
    }
}

export default NotesLog;
