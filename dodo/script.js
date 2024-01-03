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

var map = L.map('map').setView([52.53028, 13.79417], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var busIcon = L.divIcon({
	html: '<i class="bi bi-bus-front"></i>',
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
		'Beleuchtung',
		'Mülleimer',
		'taktile Oberfläche',
		'Überdachung'
	],
	datasets: [{
		label: 'Durchschnitt',
		data: [1, 1, 1, 1, 1],
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
				borderWidth: 3
			}
		}
	}
});

// ----- ----- -----
// overpass api
// ----- ----- -----

const overpassURL = "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28area%5B%22de%3Aamtlicher_gemeindeschluessel%22%3D%2212064380%22%5D-%3E.dodo%3Bnode%5Bhighway%3Dbus_stop%5D%28area.dodo%29%3B%29%3Bout%20geom%3B";

function updateBusChart(nodeTags) {

}

function nodePopupText(nodeTags) {
	let popupText = '';

	popupText += `name: ${nodeTags.name ? nodeTags.name : ''}<br>`;
	popupText += `sitzbank: ${nodeTags.bench ? translate(nodeTags.bench) : ''}<br>`;
	popupText += `mülleimer: ${nodeTags.bin ? translate(nodeTags.bin) : ''}<br>`;
	popupText += `beleuchtet: ${nodeTags.lit ? translate(nodeTags.lit) : ''}<br>`;
	popupText += `überdacht: ${nodeTags.shelter ? translate(nodeTags.shelter) : ''}<br>`;
	popupText += `taktile oberfläche: ${nodeTags.tactile_paving ? translate(nodeTags.tactile_paving) : ''}`;

	return popupText;
}

async function getBusStops() {
	const response = await fetch(overpassURL);
	const busStops = await response.json();

	for (let i in busStops.elements) {
		let node = busStops.elements[i];

		if (node.type == "node") {
			L.marker([node.lat, node.lon], {icon: busIcon}).addTo(map).bindPopup(nodePopupText(node.tags));
		}
	}
}

getBusStops();
