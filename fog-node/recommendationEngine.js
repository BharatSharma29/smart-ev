import stationStore from './stationStore.js';

const recommendStation = (currentStationId) => {

    let bestStation = null;

    for (const station of stationStore.values()) {

        if (station.stationId === currentStationId) {

            continue;

        }

        if (
            !bestStation ||
            station.queueLength < bestStation.queueLength
        ) {

            bestStation = station;

        }

    }

    return bestStation
        ? bestStation.stationId
        : null;

};

export default recommendStation;