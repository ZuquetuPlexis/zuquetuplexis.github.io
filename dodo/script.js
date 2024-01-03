// Leaflet

var map = L.map('map').setView([52.53028, 13.79417], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var busIcon = L.icon({
	html: '<i class="bi bi-bus-front"></i>',
	iconSize: [10, 10],
	iconAnchor: [5, 0]
});

L.marker([52.53028, 13.79417], {icon: busIcon}).addTo(map);

// overpass api

const overpassURL = "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28area%5B%22de%3Aamtlicher_gemeindeschluessel%22%3D%2212064380%22%5D-%3E.dodo%3Bnode%5Bhighway%3Dbus_stop%5D%28area.dodo%29%3B%29%3Bout%20geom%3B";

async function getBusStops() {
	const response = await fetch(overpassURL);
	const busStops = await response.json();
	console.log(busStops);

	console.log(busStops[elements][0]);
}

getBusStops();
