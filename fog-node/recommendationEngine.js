import stationStore from './stationStore.js';

const recommendStation = (currentStationId) => {

    let bestStation = null;

    for (const station of stationStore.values()) {

        /*
         * Skip the station that sent the data.
         */
        if (station.stationId === currentStationId) {

            continue;

        }

        /*
         * First station becomes the initial recommendation.
         */
        if (!bestStation) {

            bestStation = station;

            continue;

        }

        /*
         * Prefer the station with:
         * 1. More available chargers
         * 2. Lower queue length
         * 3. Lower estimated waiting time
         */

        if (

            station.availableChargers > bestStation.availableChargers ||

            (

                station.availableChargers === bestStation.availableChargers &&

                station.queueLength < bestStation.queueLength

            ) ||

            (

                station.availableChargers === bestStation.availableChargers &&

                station.queueLength === bestStation.queueLength &&

                station.estimatedWaitTime < bestStation.estimatedWaitTime

            )

        ) {

            bestStation = station;

        }

    }

    if (!bestStation) {

        return null;

    }

    return {

        stationId: bestStation.stationId,

        availableChargers: bestStation.availableChargers,

        queueLength: bestStation.queueLength,

        estimatedWaitTime: bestStation.estimatedWaitTime,

        reason:
            'Highest charger availability with the shortest expected waiting time.'

    };

};

export default recommendStation;