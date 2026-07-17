/*
 * In-memory storage for processed station readings.
 * This will later be replaced with DynamoDB.
 */

const stationData = [];

/*
 * Save a processed station reading.
 */
export const saveStation = async (data) => {

    stationData.push({

        ...data,

        timestamp: new Date().toISOString()

    });

    return {

        success: true,

        message: 'Station data stored successfully.'

    };

};

/*
 * Return every stored reading.
 */
export const getStations = async () => {

    return stationData;

};

/*
 * Return every reading for a specific station.
 */
export const getStationById = async (stationId) => {

    return stationData.filter(

        station => station.stationId === stationId

    );

};

/*
 * Return only the latest reading for each station.
 */
export const getDashboardData = async () => {

    const latestStations = new Map();

    /*
     * Since new readings are always appended,
     * the last reading for each station replaces
     * the previous one.
     */

    for (const station of stationData) {

        latestStations.set(

            station.stationId,

            station

        );

    }

    return Array.from(latestStations.values());

};