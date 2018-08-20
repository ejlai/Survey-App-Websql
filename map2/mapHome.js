if(map){
	map.off();
}

var map;
//function initMap(mapId){
    // initialize map container
    map = L.map("mapDiv").setView([50.735575, 7.096520], 12);

    // get the stamen toner-lite tiles
    var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });

    // add the tiles to the map
    Stamen_Toner.addTo(map); 

    //disable scroll wheel zoom 
    map.scrollWheelZoom.disable();
	
			// Initialise the FeatureGroup to store editable layers
		var drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		
		//custom marker
		var MyCustomMarker = L.Icon.extend({
			options: {
				shadowUrl: null,
				iconAnchor: new L.Point(12, 12),
				iconSize: new L.Point(40, 40),
				iconUrl: 'assets/house.png'
			}
		});

		// Initialise the draw control and pass it the FeatureGroup of editable layers
		var drawControl = new L.Control.Draw({
			position: 'topright',
			edit: {
				featureGroup: drawnItems
			},
			draw:{
				polygon:false,
				polyline:false,
				rectangle:false,
				circle:false,
				marker:{
					icon: new MyCustomMarker()
				}
			}
		});
		map.addControl(drawControl);


		//and keep the drawn items on the map
		map.on('draw:created', function(e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('My house');
				var lnglat = [e.layer._latlng.lng.toFixed(6), e.layer._latlng.lat.toFixed(6)];
				$('#q4').val(lnglat);
			}

			drawnItems.addLayer(layer);
		});
		
		// load GeoJSON from an external file
	  $.getJSON("bonnZip.geojson",function(data){
		L.geoJson(data,{
			style: function(feature){
				var fillColor,area = feature.properties.area_m2;
				if( area > 34000000) fillColor = "#67aeb0";
				else if ( area > 20000000) fillColor = "#85c3ab";
				else if ( area > 15000000) fillColor = "#a4d8a5";
				else if ( area > 10000000) fillColor = "#bae3a9";
				else if ( area > 8000000) fillColor = "#ceebaf";
				else if ( area > 6000000) fillColor = "#e2f3b6";
				else if ( area > 5000000) fillColor = "#f6fbbc";
				else if ( area > 3800000) fillColor = "#fff6b4";
				else if ( area > 3700000) fillColor = "#ffe39e";
				else filleColor = "#e03c2c";
				return {color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6};
			},
			onEachFeature: function(feature,layer){
				layer.on('click', function(){//'mouseover'
					//console.log(feature.properties.name);
					//get name of greenspace by clicking	
					$('#q4').val(feature.properties.zip);
				})
			}
				
		}).addTo(map);
	  });
			
//});