import axios from 'axios';

const CLOUD_API_URL = 'http://localhost:4000/api/stations';

const sendToCloud = async (stationData) => {

    try {

        const response = await axios.post(

            CLOUD_API_URL,

            stationData

        );

        return response.data;

    }

    catch (error) {

        console.error('\n☁ Cloud API Error');

        if (error.response) {

            console.error(error.response.data);

        } else {

            console.error(error.message);

        }

        return {

            success: false,

            message: 'Cloud API unavailable.'

        };

    }

};

export default sendToCloud;