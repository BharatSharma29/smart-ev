import stationStore from './stationStore.js';
import validateStationData from './validator.js';
import generateAlerts from './alertEngine.js';
import recommendStation from './recommendationEngine.js';
import sendToCloud from '../cloud/cloudService.js';

const processStationData = async (data) => {

    console.log('\n===================================');
    console.log(`📥 Data received from ${data.stationId}`);

    /*
     * Step 1 - Validate incoming data
     */
    const validation = validateStationData(data);

    if (!validation.valid) {

        console.log('❌ Validation Failed');

        return {

            success: false,

            message: validation.message

        };

    }

    console.log('✅ Validation Passed');

    /*
     * Step 2 - Store latest station reading
     */
    stationStore.set(

        data.stationId,

        data

    );

    console.log('💾 Latest reading stored');

    /*
     * Step 3 - Generate alerts
     */
    const alerts = generateAlerts(data);

    if (alerts.length > 0) {

        console.log('⚠ Alerts');

        alerts.forEach(

            alert => console.log(`   • ${alert}`)

        );

    }
    else {

        console.log('✅ No Alerts');

    }

    /*
     * Step 4 - Generate recommendation
     */
    const recommendation = recommendStation(

        data.stationId

    );

    if (recommendation) {

        console.log('🚗 Recommendation');
        console.log(`   Station             : ${recommendation.stationId}`);
        console.log(`   Available Chargers  : ${recommendation.availableChargers}`);
        console.log(`   Queue Length        : ${recommendation.queueLength}`);
        console.log(`   Estimated Wait Time : ${recommendation.estimatedWaitTime} min`);
        console.log(`   Reason              : ${recommendation.reason}`);

    }
    else {

        console.log('🚗 No Recommendation');

    }

    /*
     * Step 5 - Build processed payload
     */
    const processedData = {

        ...data,

        alerts,

        recommendation

    };

    /*
     * Step 6 - Send processed data to Cloud
     */
    const cloudResponse = await sendToCloud(

        processedData

    );

    if (cloudResponse.success) {

        console.log('☁ Successfully prepared for cloud transmission');

    }
    else {

        console.log('☁ Cloud transmission failed');

    }

    console.log('===================================\n');

    return {

        success: true,

        ...processedData,

        cloud: cloudResponse

    };

};

export default processStationData;