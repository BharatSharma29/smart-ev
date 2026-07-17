import {
    saveStation,
    getStations,
    getStationById,
    getDashboardData
} from './storageService.js';

/*
 * Save processed station data
 */
export const saveStationData = async (req, res) => {

    try {

        const response = await saveStation(req.body);

        return res.status(200).json(response);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
 * Return all stored station readings
 */
export const getAllStations = async (req, res) => {

    try {

        const stations = await getStations();

        return res.status(200).json(stations);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
 * Return all readings for a specific station
 */
export const getStation = async (req, res) => {

    try {

        const station = await getStationById(req.params.stationId);

        return res.status(200).json(station);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
 * Return the latest reading for each station
 */
export const getDashboard = async (req, res) => {

    try {

        const dashboardData = await getDashboardData();

        return res.status(200).json(dashboardData);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};