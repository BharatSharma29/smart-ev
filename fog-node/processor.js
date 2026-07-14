import stationStore from './stationStore.js';
import validateStationData from './validator.js';
import generateAlerts from './alertEngine.js';
import recommendStation from './recommendationEngine.js';

const processStationData = (data) => {

    console.log('\n===================================');
    console.log(`📥 Data received from ${data.stationId}`);

    // Validate incoming data
    const validation = validateStationData(data);

    if (!validation.valid) {

        console.log('❌ Validation Failed');

        return {
            success: false,
            message: validation.message
        };

    }

    console.log('✅ Validation Passed');

    // Store latest station reading
    stationStore.set(data.stationId, data);

    console.log('💾 Latest reading stored');

    // Generate alerts
    const alerts = generateAlerts(data);

    if (alerts.length > 0) {

        console.log('⚠ Alerts');

        alerts.forEach(alert =>
            console.log(`   • ${alert}`)
        );

    } else {

        console.log('✅ No Alerts');

    }

    // Recommend another charging station
    const recommendation = recommendStation(data.stationId);

    if (recommendation) {

        console.log(`🚗 Recommendation: ${recommendation}`);

    } else {

        console.log('🚗 No Recommendation');

    }

    console.log('===================================\n');

    return {

        success: true,

        station: data.stationId,

        alerts,

        recommendation,

        summary: {

            queueLength: data.queueLength,

            availableChargers: data.availableChargers,

            chargerTemperature: data.chargerTemperature

        }

    };

};

export default processStationData;