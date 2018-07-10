/* eslint-disable react/prefer-stateless-function,no-console,no-restricted-globals,class-methods-use-this */
import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";

class VideoReport extends React.Component {
    constructor(props){
        super(props);
        this.reportID= window.location.href.slice(-1)
    }


    componentWillMount() {
    }

    render() {
        return (
            <div className='container'>
                <Typography variant="display1" gutterBottom>
                    Reporte ID: {this.reportID}
                </Typography>
            </div>
        );
    }
}

export default VideoReport;
