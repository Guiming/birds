window.onload = loadMap();

var map;
var geojson;
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
    
    setVisibility();

    var layerControl = new L.Control.Layers({'Terrain':terrain, 'Imagery':imagery})

    map.addControl(layerControl);   

    // US continent
    //map.setView([43.076155,-89.408472], 2);109.2760062, 34.3846356
    
    // China nation
    map.setView([34.9846356,109.2760062], 4);

    
}

function onEachFeature(feature, layer) {
    var popupContent = "<p><b>Record information:</b></p>";
    
    if(geojson == earthquake){
        if (feature.properties && feature.properties.mag && feature.properties.place && feature.properties.time){
            popupContent = popupContent + "<p><i>Mag</i>: " + feature.properties.mag + "</p>";
            popupContent = popupContent + "<p><i>Place</i>: " + feature.properties.place + "</p>";
            popupContent = popupContent + "<p><i>Time</i>: " + feature.properties.time + "</p>";
        }
    }
    
    if(geojson == eBird_efforts_China){
        if (feature.properties){
            popupContent = popupContent + "<p><i>Province</i>: " + feature.properties.STATE + "</p>";
            popupContent = popupContent + "<p><i>Locality</i>: " + feature.properties.LOCALITY + "</p>";
            popupContent = popupContent + "<p><i>Coordinates</i>: (" + feature.properties.LONGITUDE + ", " + feature.properties.LATITUDE + ")</p>";
            popupContent = popupContent + "<p><i>Date</i>: " + feature.properties.OBSERVATIO + "</p>";
            
            popupContent = popupContent + "<p><i>Observer</i>: " + feature.properties["FIRST NAME"] + " " + feature.properties["LAST NAME"] + "</p>";
        }
    }


    layer.bindPopup(popupContent);
}


function addLayerGeoJSON(){
    //geojson = earthquake;
    geojson = eBird_efforts_China;
    if(!layerGeoJSON){
        layerGeoJSON = L.geoJson(geojson, {
            style: function (feature) {
                    return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
                }
            });
    } 
    
    map.addLayer(layerGeoJSON);  
}

function removeLayerGeoJSON(){

    if(map && layerGeoJSON){

        map.removeLayer(layerGeoJSON);
        //layerGeoJSON = null;
    }
}

function setVisibility(){
    if(document.getElementById("on").checked){
        addLayerGeoJSON();
    } 
    if(document.getElementById("off").checked){
        removeLayerGeoJSON();
    }
    
}