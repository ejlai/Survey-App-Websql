var startPoint = [50.735575, 7.096520];
var map = L.map('mapDiv', {editable: true}).setView(startPoint, 14),
    tilelayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {maxZoom: 20, attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'}).addTo(map);

    L.EditControl = L.Control.extend({

        options: {
            position: 'topleft',
            callback: null,
            kind: '',
            html: ''
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                link = L.DomUtil.create('a', '', container);

            link.href = '#';
            link.title = 'Add ' + this.options.kind;
            link.innerHTML = this.options.html;
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                      .on(link, 'click', function () {
                        window.LAYER = this.options.callback.call(map.editTools);
                      }, this);

            return container;
        }

    });

	//add a house
    L.NewHouseMarker = L.EditControl.extend({

        options: {
            position: 'topleft',
            callback: map.editTools.startMarker,
            kind: 'House location',
            html: 'Home'
        }

    });
	
	//add favite parks
	
	    L.NewParkMarker = L.EditControl.extend({

        options: {
            position: 'topleft',
            callback: map.editTools.startMarker,
            kind: 'park location',
            html: 'Park'
        }

    });

    map.addControl(new L.NewHouseMarker());
	map.addControl(new L.NewParkMarker());