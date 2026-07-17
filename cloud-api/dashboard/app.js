const stationsContainer = document.getElementById('stations');

const stationsOnline = document.getElementById('stationsOnline');
const totalAvailable = document.getElementById('totalAvailable');
const totalOccupied = document.getElementById('totalOccupied');
const averageQueue = document.getElementById('averageQueue');
const lastUpdated = document.getElementById('lastUpdated');

const progressBar = (value, max) => {

    const percentage = Math.min((value / max) * 100, 100);

    return `
        <div class="progress">
            <div
                class="progress-fill"
                style="width:${percentage}%"
            ></div>
        </div>
    `;

};

const loadStations = async () => {

    try {

        const response = await fetch('/api/stations/dashboard');

        const stations = await response.json();

        stationsOnline.textContent = stations.length;

        totalAvailable.textContent = stations.reduce(

            (sum, station) => sum + station.availableChargers,

            0

        );

        totalOccupied.textContent = stations.reduce(

            (sum, station) => sum + station.occupiedChargers,

            0

        );

        averageQueue.textContent = stations.length
            ? (
                  stations.reduce(

                      (sum, station) => sum + station.queueLength,

                      0

                  ) / stations.length
              ).toFixed(1)
            : 0;

        lastUpdated.textContent =
            `Last Updated: ${new Date().toLocaleTimeString()}`;

        stationsContainer.innerHTML = '';

        stations.forEach((station) => {

            let status = 'NORMAL';
            let statusClass = 'normal';

            if (

                station.queueLength >= 8 ||

                station.chargerTemperature >= 60

            ) {

                status = 'CRITICAL';
                statusClass = 'critical';

            }

            else if (station.queueLength >= 4) {

                status = 'BUSY';
                statusClass = 'busy';

            }

            let temperatureClass = 'green';

            if (station.chargerTemperature >= 60) {

                temperatureClass = 'red';

            }

            else if (station.chargerTemperature >= 45) {

                temperatureClass = 'orange';

            }

            const recommendation = station.recommendation
                ? `
                    <p><strong>Station:</strong> ${station.recommendation.stationId}</p>
                    <p><strong>Available Chargers:</strong> ${station.recommendation.availableChargers}</p>
                    <p><strong>Queue Length:</strong> ${station.recommendation.queueLength}</p>
                    <p><strong>Estimated Wait:</strong> ${station.recommendation.estimatedWaitTime} min</p>
                    <p>${station.recommendation.reason}</p>
                `
                : `<p>No recommendation available.</p>`;

            const alerts = station.alerts?.length
                ? `
                    <ul>
                        ${station.alerts
                            .map(alert => `<li>${alert}</li>`)
                            .join('')}
                    </ul>
                  `
                : `<p>No Alerts</p>`;

            const card = document.createElement('div');

            card.className = 'station-card';

            card.innerHTML = `

                <h2>${station.stationId}</h2>

                <div class="station-info">

                    <span>Available Chargers</span>

                    <span>${station.availableChargers}</span>

                </div>

                ${progressBar(station.availableChargers, 10)}

                <div class="station-info">

                    <span>Occupied Chargers</span>

                    <span>${station.occupiedChargers}</span>

                </div>

                ${progressBar(station.occupiedChargers, 10)}

                <div class="station-info">

                    <span>Queue Length</span>

                    <span>${station.queueLength}</span>

                </div>

                ${progressBar(station.queueLength, 10)}

                <div class="station-info">

                    <span>Charging Power</span>

                    <span>${station.chargingPower} kW</span>

                </div>

                <div class="station-info">

                    <span>Temperature</span>

                    <span class="${temperatureClass}">
                        ${station.chargerTemperature} °C
                    </span>

                </div>

                <div class="station-info">

                    <span>Estimated Wait</span>

                    <span>${station.estimatedWaitTime} min</span>

                </div>

                <div class="card-section">

                    <h3>Alerts</h3>

                    ${alerts}

                </div>

                <div class="card-section">

                    <h3>Recommendation</h3>

                    ${recommendation}

                </div>

                <div class="status ${statusClass}">

                    ${status}

                </div>

            `;

            stationsContainer.appendChild(card);

        });

    }

    catch (error) {

        console.error(error);

    }

};

loadStations();

setInterval(loadStations, 3000);