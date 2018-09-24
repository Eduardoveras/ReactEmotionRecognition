/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import axios from 'axios/index';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import { withTheme } from '@material-ui/core/styles'
import {BASE_URL_PATH} from '../constants';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";

const cardStyle = {
    width: "25rem"
};
const videoStyle = {
    width: "20rem",
    height: "10rem"
};

class Cases extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            case_id: window.location.href.split('/').pop(),
        };
    }

    componentWillMount() {
        let URL = BASE_URL_PATH+'/cases/'+this.state.case_id;
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
        const { data } = this.state;

        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Caso #{this.state.case_id}
                </Typography>
                <Grid
                    container
                    justify="left"
                    spacing={Number(16)}>
                    {data.face_video_analysis? data.face_video_analysis.map(function(d){return (

                        <Grid key={d.id} item>
                            <Card style={cardStyle}>

                                <CardContent>
                                    <video controls style={videoStyle} name="media">
                                        <source src={d.video_base64}
                                                type="video/webm"/>
                                    </video>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        Fulanito Fulano
                                    </Typography>
                                    <Typography component="p">
                                        {d.notes===''||d.notes==null?'No notes':d.notes}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button href={'/reports/'+d.id} size="small" color="primary">
                                        View Report
                                    </Button>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>

                        </Grid>

                    )
                    }):'Loading Data...'}
                </Grid>

            </div>
        );
    }
}

export default withTheme()(Cases);
