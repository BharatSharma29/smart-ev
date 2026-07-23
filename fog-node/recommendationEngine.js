import stationStore from './stationStore.js';

const recommendStation = (currentStationId) => {

    let bestStation = null;

    let highestScore = Number.NEGATIVE_INFINITY;

    for (const station of stationStore.values()) {

        // Skip the station that generated the current reading
        if (station.stationId === currentStationId) {

            continue;

        }

        /*
         * Station Scoring
         *
         * Higher score = Better recommendation
         *
         * Available chargers are weighted heavily.
         * Queue length and waiting time reduce the score.
         */

        const score =

            (station.availableChargers * 10)

            - (station.queueLength * 3)

            - station.estimatedWaitTime;

        if (score > highestScore) {

            highestScore = score;

            bestStation = station;

        }

    }

    if (!bestStation) {

        return null;

    }

    return {

        stationId: bestStation.stationId,

        availableChargers: bestStation.availableChargers,

        occupiedChargers: bestStation.occupiedChargers,

        queueLength: bestStation.queueLength,

        estimatedWaitTime: bestStation.estimatedWaitTime,

        score: highestScore,

        reason:
            'Recommended based on charger availability, queue length, and estimated waiting time.'

    };

};

export default recommendStation;