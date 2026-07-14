    const generateAlerts = (station) => {

    const alerts = [];

    if (station.queueLength >= 8) {

        alerts.push('High Queue Length');

    }

    if (station.chargerTemperature >= 60) {

        alerts.push('High Charger Temperature');

    }

    if (station.availableChargers === 0) {

        alerts.push('Station Full');

    }

    return alerts;

};

export default generateAlerts;