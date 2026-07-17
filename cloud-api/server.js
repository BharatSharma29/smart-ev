import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes.js';

const app = express();

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());

/*
 * Serve dashboard files
 */
app.use(

    express.static(

        path.join(__dirname, 'dashboard')

    )

);

/*
 * API routes
 */
app.use('/api/stations', routes);

/*
 * Start server
 */
app.listen(PORT, () => {

    console.log(`Cloud API running on port ${PORT}`);

});