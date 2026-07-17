import express from 'express';

import {
    saveStationData,
    getAllStations,
    getStation,
    getDashboard
} from './controller.js';

const router = express.Router();

// Save processed station data
router.post('/', saveStationData);

// Dashboard endpoint (latest record for each station)
router.get('/dashboard', getDashboard);

// Get all stored records
router.get('/', getAllStations);

// Get all records for a specific station
router.get('/:stationId', getStation);

export default router;