var map;
var effortsGeojson;
var observationsGeojson;
var effortsLayer;
var observationsLayer;
window.onload = function loadMap(){
    //var diaglog = document.getElementById("dialog").hide();
	map = L.map("map");
    // OSM basemap tiles
    var terrain = new L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'OSM | Mapbox',
			id: 'examples.map-9ijuk24y'
		});    
    map.addLayer(terrain);

    var imagery = new L.Google();
    //map.addLayer(imagery);
    
    setEffortsLayerVisibility();
    setObservationsLayerVisibility();
    
    // add a layercontrol
    var layerControl = new L.Control.Layers({'Terrain':terrain, 'Imagery':imagery})
    map.addControl(layerControl);   
    
    // add a scale bar
    L.control.scale().addTo(map);

    // US continent
    //map.setView([43.076155,-89.408472], 2);109.2760062, 34.3846356
    
    // China nation
    map.setView([34.9846356,109.2760062], 4);

    
}

function onEachEffortFeature(feature, layer) {
    var popupContent = "<div class='infowindow'>";
    if(effortsGeojson){
        if (feature.properties){
            popupContent = popupContent + "<p><b><i>Sampling Event ID</i></b>: " + feature.properties['SAMPLING E'] + "</p>";
            popupContent = popupContent + "<p><b><i>Province</i></b>: " + feature.properties.STATE + "</p>";
            popupContent = popupContent + "<p><b><i>Locality</i></b>: " + feature.properties.LOCALITY + "</p>";
            popupContent = popupContent + "<p><b><i>Coordinates</i></b>: (" + feature.properties.LONGITUDE + ", " + feature.properties.LATITUDE + ")</p>";
            popupContent = popupContent + "<p><b><i>Date</i></b>: " + feature.properties.OBSERVATIO + "</p>";            
            popupContent = popupContent + "<p><b><i>Observer</i></b>: " + feature.properties['FIRST NAME'] + " " + feature.properties['LAST NAME'] + "</p>";
            popupContent = popupContent + "<p><b><i>Protocol Type</i></b>: " + feature.properties['PROTOCOL T'] + "</p>";
            popupContent = popupContent + "<p><b><i>Duration</i></b> (min): " + feature.properties['DURATION M'] + "</p>";
            popupContent = popupContent + "<p><b><i>Effort Distance</i></b> (km): " + feature.properties['EFFORT DIS'] + "</p>";
            popupContent = popupContent + "<p><b><i>Effort Area</i></b> (km2): " + feature.properties['EFFORT ARE'] + "</p>";
            popupContent = popupContent + "<p><b><i>Number of Observers</i></b>: " + feature.properties['NUMBER OBS'] + "</p>";
            popupContent = popupContent + "<p><b><i>All Species Reported</i></b>: " + feature.properties['ALL SPECIE'] + "</p></div>"
        }
    }


    layer.bindPopup(popupContent);
}

function onEachObervationFeature(feature, layer) {
    var popupContent = "<div class='infowindow'>";
    if(observationsGeojson){
        if (feature.properties){
            var n = feature.properties.global_uni.split(':').length;
            popupContent = popupContent + "<p><b><i>Observation Record ID</i></b>: " + feature.properties.global_uni.split(':')[n-1] + "</p>";
            popupContent = popupContent + "<p><b><i>Common Name</i></b>: " + feature.properties.common_nam + "</p>";
            popupContent = popupContent + "<p><b><i>Scientific Name</i></b>: <i>" + feature.properties.scientific + "</i></p>";
            popupContent = popupContent + "<p><b><i>Count</i></b>: " + feature.properties.observatio + "</p>";
                        
            popupContent = popupContent + "<p><b><i>Province</i></b>: " + feature.properties.state_prov + "</p>";
            popupContent = popupContent + "<p><b><i>Locality</i></b>: " + feature.properties.locality + "</p>";
            popupContent = popupContent + "<p><b><i>Coordinates</i></b>: (" + feature.properties.longitude + ", " + feature.properties.latitude + ")</p>";
            popupContent = popupContent + "<p><b><i>Date</i></b>: " + feature.properties.observat_1 + "</p>";
            popupContent = popupContent + "<p><b><i>Time</i></b>: " + feature.properties.time_obser + "</p>";            
            popupContent = popupContent + "<p><b><i>Observer</i></b>: " + feature.properties.first_name + " " + feature.properties.last_name + "</p>"; 
            
            popupContent = popupContent + "<p><b><i>Approved</i></b>: " + feature.properties.approved + "</p>";
            popupContent = popupContent + "<p><b><i>Sampling Event ID</i></b>: " + feature.properties.sampling_e + "</p></div>";            
        }
    }


    layer.bindPopup(popupContent);
}


function addEffortsLayer(){
    //geojson = earthquake;
    effortsGeojson = eBird_efforts_China;
    if(!effortsLayer){
        effortsLayer = L.geoJson(effortsGeojson, {
            style: function (feature) {
                    return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachEffortFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#229d1d",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
                });
                }
            });
    } 
    
    map.addLayer(effortsLayer);  
}

function addObservationsLayer(){
    //geojson = earthquake;
    observationsGeojson = eBird_observations_China_cuckoo;
    if(!observationsLayer){
        observationsLayer = L.geoJson(observationsGeojson, {
            style: function (feature) {
                    return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachObervationFeature,

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
    
    map.addLayer(observationsLayer);  
}

function removeEffortsLayer(){

    if(map && effortsLayer){

        map.removeLayer(effortsLayer);
    }
}

function removeObservationsLayer(){

    if(map && observationsLayer){

        map.removeLayer(observationsLayer);
    }
}

function setEffortsLayerVisibility(){
    if(document.getElementById("effortsOn").checked){
        addEffortsLayer();
    } 
    if(document.getElementById("effortsOff").checked){
        removeEffortsLayer();
    }
    
}

function setObservationsLayerVisibility(){
    if(document.getElementById("obsOn").checked){
        addObservationsLayer();
    } 
    if(document.getElementById("obsOff").checked){
        removeObservationsLayer();
    }
    
}