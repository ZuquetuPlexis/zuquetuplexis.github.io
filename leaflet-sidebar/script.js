var map = L.map('map').setView([52.53028, 13.79417], 13);

var sidebar = L.control.sidebar({
		autopan: false,       // whether to maintain the centered map point when opening the sidebar
		closeButton: true,    // whether t add a close button to the panes
		container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
		position: 'left',     // left or right
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

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
