import stations from "./stationConfig.js";
import generateStationData from "./dataGenerator.js";

console.clear();

console.log("EV Charging Station Simulator Started...\n");

setInterval(() => {

    console.clear();

    console.log("Live Charging Station Data\n");

    stations.forEach((station) => {

        const data = generateStationData(station);

        console.log(data);

    });

}, 3000);