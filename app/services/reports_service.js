import axios from 'axios'



class ReportService {

    getReportsList(){
        let Reports = null;
        let URL = null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        {
            URL = `http://localhost:3000/face_video_analyses`;
        }
        else {
            URL= 'https://sdec-backend.herokuapp.com/face_video_analyses'
        }
        axios.get(URL)
            .then(function (response) {
                // handle success
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        return "wtf";

    }





}

export default ReportService;
