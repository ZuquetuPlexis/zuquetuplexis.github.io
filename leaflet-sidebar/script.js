var map = L.map('map').setView([52.53028, 13.79417], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var sidebar = L.control.sidebar({
		autopan: false,
		//closeButton: true,
		container: 'sidebar',
		position: 'left'
}).addTo(map);

var panelContent = {
	id: 'bus_stop_quality',
	tab: 'LF',
	pane: 'lf-sb',
	title: 'Übersicht Qualität',
	position: 'top'
};

sidebar.addPanel(panelContent);
sidebar.open('bus_stop_quality');
sidebar.enablePanel('bus_stop_quality');
