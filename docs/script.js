var geojson = new XMLHttpRequest();
geojson.open("GET", "https://raw.githubusercontent.com/Roldans/gpx2json/master/ANDALUCIA%3A%20Cebadillas%20-%20Refugio%20Poquera%20-%20Mulhacen%20-%20Acequia.geojson");
geojson.addEventListener("load", geojsonLoaded);
geojson.send()

function geojsonLoaded() {
	featuresObject = JSON.parse(geojson.response)
	
	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff5000",
		color: "#ffffff",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.75
	};
	function pointToLayer(feature, latlng) {
		geojsonMarkerOptions.fillColor = feature.properties["marker-color"]
		return L.circleMarker(latlng, geojsonMarkerOptions);
	}
	
	function onEachFeature(feature, layer) {
		layer.bindPopup(feature.properties.title + "</br>" + 
			feature.properties.description + "</br>" +
			feature.properties.type);
	}
	
	var mymap = L.map('mapid').setView([37.6,  -4.5], 8.5);
	//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | ' + featuresObject.features.length + ' caches found'
	}).addTo(mymap);
	L.geoJSON(featuresObject, {
		pointToLayer: pointToLayer,
		onEachFeature: onEachFeature
	}).addTo(mymap)
}
