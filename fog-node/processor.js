import stationStore from './stationStore.js';
import validateStationData from './validator.js';
import generateAlerts from './alertEngine.js';
import recommendStation from './recommendationEngine.js';

const processStationData = (data) => {

    // Validate incoming data
    const validation = validateStationData(data);

    if (!validation.valid) {
        return validation;
    }

    // Store the latest reading
    stationStore.set(data.stationId, data);

    // Generate alerts
    const alerts = generateAlerts(data);

    // Find the best alternative station
    const recommendation = recommendStation(data.stationId);

    return {
        valid: true,
        station: data.stationId,
        alerts,
        recommendation
    };
};

export default processStationData;