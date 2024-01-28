// ----- ----- -----
// Leaflet
// ----- ----- -----

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var layerNoticeAll = L.layerGroup([]);
var layerNoticeDone = L.layerGroup([]);
var layerNoticeWorkedOn = L.layerGroup([]);
var layerNoticeCanceled = L.layerGroup([]);

var map = L.map('map', {
	center: [52.53028, 13.79417],
	zoom: 13,
	layers: [osm]
});

var baseMaps = {
	"OpenStreetMap": osm
};

var overlayMaps = {
  "Alle": layerNoticeAll,
  "fertig": layerNoticeDone,
  "in Bearbeitung": layerNoticeWorkedOn,
  "Verworfen? Rest?": layerNoticeCanceled
}

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map)

layerNoticeAll.addTo(map);

var noticeIconDone = L.divIcon({
	html: '<i class="bi bi-bus-front-fill"></i>',
	iconSize: [8, 8],
	iconAnchor: [4, 4],
	className: 'doneIcon'
});

var noticeIconWorkedOn = L.divIcon({
	html: '<i class="bi bi-bus-front-fill"></i>',
	iconSize: [8, 8],
	iconAnchor: [4, 4],
	className: 'workedOnIcon'
});

// maerker 'api'

var maerkerURL = "https://maerker.brandenburg.de/sixcms/list.php?page=kml_meldungen_p&sv[kommune]=177&sv[status]=online&sv[kat]=&sv[id]=&sv[vt]=&sv[rel_status]=11,12,13,14,15";

async function getNotices() {
	const response = await fetch(maerkerURL);
	const notices = await response.text();

	console.log(notices);
}

getNotices();

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://maerker.brandenburg.de/sixcms/list.php?page=kml_meldungen_p&sv[kommune]=177&sv[status]=online&sv[kat]=&sv[id]=&sv[vt]=&sv[rel_status]=11,12,13,14,15", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
