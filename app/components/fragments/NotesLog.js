/* eslint-disable react/forbid-prop-types */
import React from 'react';
import axios from "axios";
import { BASE_URL_PATH } from "../../constants";
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
                this.setState({ data: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <span className={root}>
                <Card style={{ marginTop: "1.3rem", marginLeft: "25%", marginRight: "25%" }}>
                    <CardContent >
                        <Typography variant="display1">
                            📝 Notas de la sesión
                     </Typography>
                        <hr />
                        <div className="notes-log-card">
                            {this.state.data ? this.state.data.logs.map(function (d) {
                                return (
                                    <Typography component="p">{d + "\t"}</Typography>
                                )
                            }) : "Loading..."}
                            {this.state.data && this.state.data.logs.length <= 0 && <Typography variant="headline">💡<span style={{ color: "#CCCC00" }}> No hay notas en esta sesión</span></Typography>}
                        </div>
                    </CardContent>
                </Card>


            </span>
        )
    }
}

export default NotesLog;
