// Leaflet

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

L.marker([52.53028, 13.79417], {icon: busIcon}).addTo(map);

// overpass api

const overpassURL = "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28area%5B%22de%3Aamtlicher_gemeindeschluessel%22%3D%2212064380%22%5D-%3E.dodo%3Bnode%5Bhighway%3Dbus_stop%5D%28area.dodo%29%3B%29%3Bout%20geom%3B";

async function getBusStops() {
	const response = await fetch(overpassURL);
	const busStops = await response.json();
	//console.log(busStops);
	//console.log(Object.keys(busStops));
	//console.log(busStops.elements);

	for (let i in busStops.elements) {
		//console.log(busStops.elements[i]);
		if (busStops.elements[i].type == "node") {
			L.marker([busStops.elements[i].lat, busStops.elements[i].lon], {icon: busIcon}).addTo(map);
		}
	}

	//console.log(busStops.elements[0]);
	//console.log(busStops.elements[0].id);
	//console.log(busStops.elements[0].tags.lit);
}

getBusStops();

// chart js
const ctx = document.getElementById('bus_stop_qual');

const chartData = {
	labels: [
		'Sitzbank',
		'Beleuchtung',
		'Mülleimer',
		'taktile Oberfläche',
		'Überdachung'
	],
	datasets: [{
		label: 'Bus Stop Qual',
		data: [1, 1, 1, 1, 1],
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