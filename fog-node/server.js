import express from 'express';
import cors from 'cors';

import stationRoutes from './routes.js';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/stations', stationRoutes);

app.get('/', (req, res) => {

    res.json({
        message: 'Fog Node is running successfully.'
    });

});

app.listen(PORT, () => {

    console.log(`🚀 Fog Node running on http://localhost:${PORT}`);

});