// general

function translate(text) {
	switch (text) {
		case 'yes':
			return 'ja';
		case 'no':
			return 'nein';
		default:
			return '';
	}
}

// ----- ----- -----
// Leaflet
// ----- ----- -----

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var layerBusStopAll = L.layerGroup([]);
var layerBusStopBench = L.layerGroup([]);
var layerBusStopBin = L.layerGroup([]);
var layerBusStopLit = L.layerGroup([]);
var layerBusStopShelter = L.layerGroup([]);
var layerBusStopTactile = L.layerGroup([]);
var layerBusStopNothing = L.layerGroup([]);

/*
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

var map = L.map('map', {
	center: [52.53028, 13.79417],
	zoom: 13,
	layers: [osm]
});

var baseMaps = {
	"OpenStreetMap": osm
};

var overlayMaps = {
	"Alle Bushaltestellen": layerBusStopAll,
	"Sitzbank": layerBusStopBench,
	"Mülleimer": layerBusStopBin,
	"Beleuchtung": layerBusStopLit,
	"Überdachung": layerBusStopShelter,
	"taktile Oberfläche": layerBusStopTactile,
	"ohne Komfort": layerBusStopNothing
}

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map)

layerBusStopAll.addTo(map);

var busIcon = L.divIcon({
	html: '<i class="bi bi-bus-front-fill"></i>',
	iconSize: [8, 8],
	iconAnchor: [4, 4],
	className: 'busIcon'
});

// ----- ----- -----
// chart js
// ----- ----- -----

const ctx = document.getElementById('bus_stop_qual');

let chartData = {
	labels: [
		'Sitzbank',
		'Mülleimer',
		'Beleuchtung',
		'Überdachung',
		'taktile Oberfläche'
	],
	datasets: [{
		label: 'mit Komfort',
		data: [0, 0, 0, 0, 0],
		fill: true
	}, {
		label: 'ohne Komfort',
		data: [0, 0, 0, 0, 0],
		fill: true
	}, {
		label: 'unbekannter Komfort',
		data: [0, 0, 0, 0, 0],
		fill: true
	}, {
		label: 'Selektion',
		data: [0, 0, 0, 0, 0],
		fill: true
	}]
};

const busQualChart = new Chart('bus_stop_qual', {
  type: 'radar',
  data: chartData,
  options: {
		elements: {
			line: {
				borderWidth: 1
			},
			point: {
				pointRadius: 4
			}
		},
		scales: {
			r: {
				max: 10
			}
		}
	}
});

// ----- ----- -----
// overpass api
// ----- ----- -----

const overpassURL = "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28area%5B%22de%3Aamtlicher_gemeindeschluessel%22%3D%2212064380%22%5D-%3E.dodo%3Bnode%5Bhighway%3Dbus_stop%5D%28area.dodo%29%3B%29%3Bout%20geom%3B";

function busChartAddData(nodeTags, chartData, datasetNr) {
	/*
	if(nodeTags.bench == 'yes') {chartData.datasets[datasetNr].data[0] += 1;}
	if(nodeTags.bin == 'yes') {chartData.datasets[datasetNr].data[1] += 1;}
	if(nodeTags.lit == 'yes') {chartData.datasets[datasetNr].data[2] += 1;}
	if(nodeTags.shelter == 'yes') {chartData.datasets[datasetNr].data[3] += 1;}
	if(nodeTags.tactile_paving == 'yes') {chartData.datasets[datasetNr].data[4] += 1;}
	*/

	let tags = ['bench', 'bin', 'lit', 'shelter', 'tactile_paving'];

	tags.forEach((value, index, array) => {
		switch (nodeTags[value]) {
			case 'yes':
				chartData.datasets[index].data[index] += 1;
				break;
			case 'no':
				chartData.datasets[index].data[index] += 1;
				break;
			default:
				chartData.datasets[index].data[index] += 1;
				break;
		}
	});

	//console.log(nodeTags['bench']);
	/*
	switch (nodeTags.bench) {
		case 'yes':
			chartData.datasets[datasetNr].data[0] += 1;
			break;
		case 'no':
			chartData.datasets[datasetNr+1].data[0] += 1;
			break;
		default:
			chartData.datasets[datasetNr+2].data[0] += 1;
			break;
	}

	switch (nodeTags.bin) {
		case 'yes':
			chartData.datasets[datasetNr].data[1] += 1;
			break;
		case 'no':
			chartData.datasets[datasetNr+1].data[1] += 1;
			break;
		default:
			chartData.datasets[datasetNr+2].data[1] += 1;
			break;
	}

	switch (nodeTags.lit) {
		case 'yes':
			chartData.datasets[datasetNr].data[2] += 1;
			break;
		case 'no':
			chartData.datasets[datasetNr+1].data[2] += 1;
			break;
		default:
			chartData.datasets[datasetNr+2].data[2] += 1;
			break;
	}

	switch (nodeTags.shelter) {
		case 'yes':
			chartData.datasets[datasetNr].data[3] += 1;
			break;
		case 'no':
			chartData.datasets[datasetNr+1].data[3] += 1;
			break;
		default:
			chartData.datasets[datasetNr+2].data[3] += 1;
			break;
	}

	switch (nodeTags.tactile_paving) {
		case 'yes':
			chartData.datasets[datasetNr].data[4] += 1;
			break;
		case 'no':
			chartData.datasets[datasetNr+1].data[4] += 1;
			break;
		default:
			chartData.datasets[datasetNr+2].data[4] += 1;
			break;
	}
	*/
}

function nodePopupText(nodeTags) {
	let popupText = '';

	popupText += `name: ${nodeTags.name ? nodeTags.name : ''}<br>`;
	popupText += `sitzbank: ${nodeTags.bench ? translate(nodeTags.bench) : 'unbekannt'}<br>`;
	popupText += `mülleimer: ${nodeTags.bin ? translate(nodeTags.bin) : 'unbekannt'}<br>`;
	popupText += `beleuchtet: ${nodeTags.lit ? translate(nodeTags.lit) : 'unbekannt'}<br>`;
	popupText += `überdacht: ${nodeTags.shelter ? translate(nodeTags.shelter) : 'unbekannt'}<br>`;
	popupText += `taktile oberfläche: ${nodeTags.tactile_paving ? translate(nodeTags.tactile_paving) : 'unbekannt'}`;

	return popupText;
}

async function getBusStops() {
	const response = await fetch(overpassURL);
	const busStops = await response.json();

	let nrOfBusStops = 0;
	let nrOfBusStopsZeroComfort = 0;
	let zeroComfort = true;

	for (let i in busStops.elements) {
		let node = busStops.elements[i];

		if (node.type == "node") {
			L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopAll).bindPopup(nodePopupText(node.tags));

			nrOfBusStops++;

			if (node.tags.bench == 'yes') {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopBench).bindPopup(nodePopupText(node.tags));
				zeroComfort = false;
			}

			if (node.tags.bin == 'yes') {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopBin).bindPopup(nodePopupText(node.tags));
				zeroComfort = false;
			}

			if (node.tags.lit == 'yes') {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopLit).bindPopup(nodePopupText(node.tags));
				zeroComfort = false;
			}

			if (node.tags.shelter == 'yes') {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopShelter).bindPopup(nodePopupText(node.tags));
				zeroComfort = false;
			}

			if (node.tags.tactile_paving == 'yes') {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopTactile).bindPopup(nodePopupText(node.tags));
				zeroComfort = false;
			}

			if (zeroComfort) {
				L.marker([node.lat, node.lon], {icon: busIcon}).addTo(layerBusStopNothing).bindPopup(nodePopupText(node.tags));
				nrOfBusStopsZeroComfort++;
			}
		}

		busChartAddData(node.tags, chartData, 0);
		// reset comfort
		zeroComfort = true;
	}

	//busQualChart.options.scales.r.max = nrOfBusStops;
	busQualChart.update();

	document.getElementById('max_bus_stops').innerHTML = nrOfBusStops;
	document.getElementById('bus_stops_no_comfort').innerHTML = nrOfBusStopsZeroComfort;
}

getBusStops();
