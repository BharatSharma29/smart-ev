import express from 'express';
import processStationData from './processor.js';

const router = express.Router();

router.post('/', (req, res) => {

    const result = processStationData(req.body);

    if (!result.success) {

        return res.status(400).json(result);

    }

    return res.status(200).json(result);

});

export default router;