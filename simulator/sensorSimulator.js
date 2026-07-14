import axios from 'axios';

import stations from './stationConfig.js';
import generateStationData from './dataGenerator.js';

const FOG_NODE_URL = 'http://localhost:3000/api/stations';

console.clear();
console.log('🚀 Edge Simulator Started...\n');

const sendStationData = async (station) => {

    try {

        // Generate sensor data
        const data = generateStationData(station);

        // Send to Fog Node
        const { data: response } = await axios.post(
            FOG_NODE_URL,
            data
        );

        console.log(`\n📤 ${station.id}`);

        console.log('---------------- Station Data ----------------');

        console.table(data);

        console.log('\n✅ Fog Node Response');

        console.log(`Processed Successfully : ${response.success}`);

        console.log(`Station               : ${response.station}`);

        console.log(
            `Recommendation        : ${
                response.recommendation ?? 'None'
            }`
        );

        if (response.alerts.length === 0) {

            console.log('Alerts                : None');

        } else {

            console.log('Alerts');

            response.alerts.forEach(alert =>
                console.log(`   • ${alert}`)
            );

        }

        console.log('\nSummary');

        console.log(
            `Queue Length          : ${response.summary.queueLength}`
        );

        console.log(
            `Available Chargers    : ${response.summary.availableChargers}`
        );

        console.log(
            `Temperature           : ${response.summary.chargerTemperature}°C`
        );

        console.log('\n=============================================');

    } catch (error) {

        console.error(`\n❌ Failed to send ${station.id}`);

        if (error.response) {

            console.error(`Status Code : ${error.response.status}`);

            console.error('Fog Node Response:');

            console.log(error.response.data);

        } else {

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