import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import stationRoutes from './routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/stations', stationRoutes);

app.get('/', (req, res) => {

    res.json({
        service: 'Cloud API',
        status: 'Running'
    });

});

app.listen(PORT, () => {

    console.log(`☁ Cloud API running on http://localhost:${PORT}`);

});