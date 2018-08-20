
//get active element id		
$(document).on('click',"input[type='text']", function() {
	gsNameId = document.activeElement.id;
	//console.log("ID of input element: "+gsNameId);
	
});

var map = L.map('mapGS').setView([50.735575, 7.096520], 11);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);

	// load GeoJSON from an external file
	  $.getJSON("listGreenspaces.geojson",function(data){
		L.geoJson(data,{
			style: function(feature){
				var fillColor,area = feature.properties.area_sqm;
				if( area > 40000000) fillColor = "#117d41";
				else if ( area > 10000000) fillColor = "#23934c";
				else if ( area > 8000000) fillColor = "#51b365";
				else if ( area > 2000000) fillColor = "#6bc072";
				else if ( area > 100000) fillColor = "#85cc7f";
				else if ( area > 90000) fillColor = "#a0d88a";
				else if ( area > 50000) fillColor = "#bce396";
				else if ( area > 35000) fillColor = "#d3eda7";
				else if ( area > 30000) fillColor = "#e9f6ba";
				else filleColor = "#ffffcc";
				return {color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6};
			},
			onEachFeature: function(feature,layer){
				layer.on('click', function(){//'mouseover'
					//console.log(feature.properties.name);
					//get name of greenspace by clicking	
					$('#' + gsNameId).val(feature.properties.Name);
				})
			}
				
		}).addTo(map);
	  });
