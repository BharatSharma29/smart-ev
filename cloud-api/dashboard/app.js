const API_URL = '/api/stations/dashboard';

const stationContainer = document.getElementById('stationContainer');

const stationCount = document.getElementById('stationCount');
const availableChargers = document.getElementById('availableChargers');
const occupiedChargers = document.getElementById('occupiedChargers');
const averageQueue = document.getElementById('averageQueue');
const lastUpdated = document.getElementById('lastUpdated');

async function loadDashboard() {

    try {

        const response = await fetch(API_URL);

        const stations = await response.json();

        updateSummary(stations);

        renderStations(stations);

        lastUpdated.textContent =
            `Last Updated: ${new Date().toLocaleTimeString()}`;

    }

    catch (error) {

        console.error(error);

        stationContainer.innerHTML = `

            <div class="station-card">

                <h2>Cloud API Offline</h2>

                <p>Unable to retrieve dashboard data.</p>

            </div>

        `;

    }

}

function updateSummary(stations) {

    stationCount.textContent = stations.length;

    availableChargers.textContent = stations.reduce(

        (sum, station) => sum + station.availableChargers,

        0

    );

    occupiedChargers.textContent = stations.reduce(

        (sum, station) => sum + station.occupiedChargers,

        0

    );

    averageQueue.textContent = (

        stations.reduce(

            (sum, station) => sum + station.queueLength,

            0

        ) / stations.length

    ).toFixed(1);

}

function progressBar(value, max) {

    const percentage = Math.min(

        100,

        Math.round((value / max) * 100)

    );

    return `

        <div class="progress">

            <div
                class="progress-fill"
                style="width:${percentage}%">

            </div>

        </div>

    `;

}

function renderStations(stations) {

    stationContainer.innerHTML = '';

    stations.forEach(station => {

        let status = '🟢 NORMAL';
        let statusClass = 'normal';

        if (

            station.queueLength >= 8 ||

            station.chargerTemperature >= 60

        ) {

            status = '🔴 CRITICAL';

            statusClass = 'critical';

        }

        else if (

            station.queueLength >= 4

        ) {

            status = '🟡 BUSY';

            statusClass = 'busy';

        }

        let temperatureClass = 'green';

        if (station.chargerTemperature >= 60) {

            temperatureClass = 'red';

        }

        else if (station.chargerTemperature >= 50) {

            temperatureClass = 'orange';

        }

        const alerts = station.alerts.length === 0

            ? '<p>No Alerts</p>'

            : `<ul>${station.alerts.map(

                alert => `<li>${alert}</li>`

            ).join('')}</ul>`;

        const occupiedPercent =

            (station.occupiedChargers /

                station.totalChargers) * 100;

        const queueMax = 10;

        const card = document.createElement('div');

        card.className = 'station-card';

        card.innerHTML = `

            <h2>🚗 ${station.stationId}</h2>

            <div class="station-info">

                <span>⚡ Available Chargers</span>

                <span>${station.availableChargers}</span>

            </div>

            <div class="station-info">

                <span>🔌 Occupied Chargers</span>

                <span>${station.occupiedChargers}/${station.totalChargers}</span>

            </div>

            ${progressBar(

                occupiedPercent,

                100

            )}

            <div class="station-info">

                <span>👥 Queue Length</span>

                <span>${station.queueLength}</span>

            </div>

            ${progressBar(

                station.queueLength,

                queueMax

            )}

            <div class="station-info">

                <span>🌡 Temperature</span>

                <span class="${temperatureClass}">

                    ${station.chargerTemperature}°C

                </span>

            </div>

            <div class="station-info">

                <span>⚡ Charging Power</span>

                <span>${station.averageChargingPower} kW</span>

            </div>

            <div class="station-info">

                <span>⏱ Estimated Wait</span>

                <span>${station.estimatedWaitTime} min</span>

            </div>

            <hr>

            <div class="card-section">

                <h3>🚨 Alerts</h3>

                ${alerts}

            </div>

            <div class="card-section">

                <h3>🧭 Recommendation</h3>

                <p>

                    Redirect new vehicles to

                    <strong>

                        ${station.recommendation}

                    </strong>

                </p>

            </div>

            <div class="status ${statusClass}">

                ${status}

            </div>

        `;

        stationContainer.appendChild(card);

    });

}

loadDashboard();

setInterval(

    loadDashboard,

    3000

);