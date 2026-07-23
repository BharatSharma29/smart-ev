import axios from 'axios';

import stations from './stationConfig.js';
import generateStationData from './dataGenerator.js';

const FOG_NODE_URL = 'http://localhost:3000/api/stations';

console.clear();
console.log('🚀 Edge Simulator Started...\n');

const sendStationData = async (station) => {

    try {

        // Generate sensor data
        const sensorData = generateStationData(station);

        // Send to Fog Node
        const { data: response } = await axios.post(

            FOG_NODE_URL,

            sensorData

        );

        console.log(`\n📤 ${station.id}`);

        console.log('---------------- Station Data ----------------');

        console.table(sensorData);

        console.log('\n✅ Fog Node Response');

        console.log(`Processed Successfully : ${response.success}`);

        console.log(`Station               : ${response.stationId}`);

        if (response.recommendation) {

            console.log('\n🚗 Recommendation');

            console.log(
                `Station               : ${response.recommendation.stationId}`
            );

            console.log(
                `Available Chargers    : ${response.recommendation.availableChargers}`
            );

            console.log(
                `Queue Length          : ${response.recommendation.queueLength}`
            );

            console.log(
                `Estimated Wait        : ${response.recommendation.estimatedWaitTime} min`
            );

            console.log(
                `Reason                : ${response.recommendation.reason}`
            );

        } else {

            console.log('\n🚗 Recommendation : None');

        }

        if (response.alerts.length === 0) {

            console.log('\n⚠ Alerts : None');

        } else {

            console.log('\n⚠ Alerts');

            response.alerts.forEach(

                alert => console.log(`   • ${alert}`)

            );

        }

        console.log('\n📊 Processed Station Data');

        console.log(
            `Available Chargers    : ${response.availableChargers}`
        );

        console.log(
            `Occupied Chargers     : ${response.occupiedChargers}`
        );

        console.log(
            `Queue Length          : ${response.queueLength}`
        );

        console.log(
            `Temperature           : ${response.chargerTemperature} °C`
        );

        console.log(
            `Estimated Wait        : ${response.estimatedWaitTime} min`
        );

        console.log('\n=============================================');

    }

    catch (error) {

        console.error(`\n❌ Failed to send ${station.id}`);

        if (error.response) {

            console.error(`Status Code : ${error.response.status}`);

            console.log(error.response.data);

        }

        else {

            console.error(error.message);

        }

        console.log('\n=============================================');

    }

};

setInterval(async () => {

    console.clear();

    console.log('========== EDGE SIMULATOR ==========\n');

    for (const station of stations) {

        await sendStationData(station);

    }

}, 3000);