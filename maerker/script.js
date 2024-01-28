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
