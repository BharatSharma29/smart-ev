const validateStationData = (data) => {

    const requiredFields = [

        'stationId',

        'totalChargers',

        'availableChargers',

        'occupiedChargers',

        'queueLength',

        'averageChargingPower',

        'chargerTemperature',

        'estimatedWaitTime'

    ];

    for (const field of requiredFields) {

        if (!(field in data)) {

            return {

                valid: false,

                message: `Missing field: ${field}`

            };

        }

    }

    return {

        valid: true

    };

};

export default validateStationData;