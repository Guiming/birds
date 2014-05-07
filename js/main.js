window.onload = loadMap();

var map;
var layerGeoJSON;
function loadMap(){

	map = L.map("map");
    // OSM basemap tiles
    var terrain = new L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'OSM|Mapbox',
			id: 'examples.map-9ijuk24y'
		});    
    map.addLayer(terrain);

    var imagery = new L.Google();
    //map.addLayer(imagery);    

    var layerControl = new L.Control.Layers({'Terrain':terrain, 'Imagery':imagery})

    map.addControl(layerControl);   

    // initial zoom & set map coords, these will change
    map.setView([43.076155,-89.408472], 2);

    
}

function onEachFeature(feature, layer) {
    var popupContent = "<p><b>Earthquake information:</b></p>";

    if (feature.properties && feature.properties.mag && feature.properties.place && feature.properties.time) {
        popupContent = popupContent + "<p><i>Mag</i>: " + feature.properties.mag + "</p>";
        popupContent = popupContent + "<p><i>Place</i>: " + feature.properties.place + "</p>";
        popupContent = popupContent + "<p><i>Time</i>: " + feature.properties.time + "</p>";
    }

    layer.bindPopup(popupContent);
}


function addLayerGeoJSON(){

    if(!layerGeoJSON){
        layerGeoJSON = L.geoJson(earthquake, {
            style: function (feature) {
                    return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
                }
            });

        map.addLayer(layerGeoJSON);
    }

}

function removeLayerGeoJSON(){

    if(map && layerGeoJSON){

        map.removeLayer(layerGeoJSON);
        layerGeoJSON = null;
    }
}