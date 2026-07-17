const saveToDynamoDB = async (stationData) => {

    console.log('\n☁ Cloud Layer');

    console.log('Received Data');

    console.log(stationData);

    return {

        success: true,

        message: 'Data received by Cloud API'

    };

};

export default saveToDynamoDB;
