const sendToCloud = async (stationData) => {

    console.log('\n☁ Cloud Service');

    console.log(
        `Preparing payload for ${stationData.stationId}`
    );

    /*
     * AWS API Gateway will be called here later.
     */

    return {

        success: true,

        message: 'Cloud transmission simulated.'

    };

};

export default sendToCloud;