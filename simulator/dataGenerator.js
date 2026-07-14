const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateStationData = (station) => {

    // Simulate how many chargers are currently occupied
    const occupiedChargers = randomNumber(0, station.totalChargers);

    // Calculate available chargers
    const availableChargers =
        station.totalChargers - occupiedChargers;

    /*
     * Queue length depends on occupancy.
     * More occupied chargers generally means more waiting vehicles.
     */

    let queueLength = 0;

    const occupancyRate =
        occupiedChargers / station.totalChargers;

    if (occupancyRate >= 0.9) {

        queueLength = randomNumber(8, 12);

    } else if (occupancyRate >= 0.7) {

        queueLength = randomNumber(4, 8);

    } else if (occupancyRate >= 0.5) {

        queueLength = randomNumber(1, 5);

    }

    /*
     * Charging power only exists when chargers are occupied.
     */

    const averageChargingPower =
        occupiedChargers === 0
            ? 0
            : randomNumber(80, 250);

    /*
     * Temperature increases with charging power.
     */

    const chargerTemperature =
        averageChargingPower === 0
            ? randomNumber(22, 28)
            : Math.min(
                  70,
                  randomNumber(30, 45) +
                  Math.floor(averageChargingPower / 10)
              );

    /*
     * Waiting time depends on queue length.
     */

    const estimatedWaitTime =
        queueLength === 0
            ? 0
            : queueLength * randomNumber(3, 6);

    return {

        stationId: station.id,

        totalChargers: station.totalChargers,

        availableChargers,

        occupiedChargers,

        queueLength,

        averageChargingPower,

        chargerTemperature,

        estimatedWaitTime

    };

};

export default generateStationData;