var map = L.map('map').setView([52.53028, 13.79417], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var sidebar = L.control.sidebar({
	autopan: false,
	container: "sidebar",
	position: "left"
}).addTo(map);

//sidebar.open('home');

/*
// add panels dynamically to the sidebar
sidebar
		.addPanel({
				id:   'js-api',
				tab:  '<i class="fa fa-gear"></i>',
				title: 'JS API',
				pane: '<p>The Javascript API allows to dynamically create or modify the panel state.<p/><p><button onclick="sidebar.enablePanel(\'mail\')">enable mails panel</button><button onclick="sidebar.disablePanel(\'mail\')">disable mails panel</button></p><p><button onclick="addUser()">add user</button></b>',
		})
		// add a tab with a click callback, initially disabled
		.addPanel({
				id:   'mail',
				tab:  '<i class="fa fa-envelope"></i>',
				title: 'Messages',
				button: function() { alert('opened via JS callback') },
				disabled: true,
		})

// be notified when a panel is opened
sidebar.on('content', function (ev) {
		switch (ev.id) {
				case 'autopan':
				sidebar.options.autopan = true;
				break;
				default:
				sidebar.options.autopan = false;
		}
});

var userid = 0
function addUser() {
		sidebar.addPanel({
				id:   'user' + userid++,
				tab:  '<i class="fa fa-user"></i>',
				title: 'User Profile ' + userid,
				pane: '<p>user ipsum dolor sit amet</p>',
		});
}
*/
