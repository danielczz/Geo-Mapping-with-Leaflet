function getColor(color) {
  return color <= 1 ? '#FFFFFF' :
    color <= 2 ? '#99CCFF' :
    color <= 3 ? '#33FF99' :
    color <= 4 ? '#FF9933' :
    color <= 5 ? '#FF0000' :
    '#660000' ;
}
// All Hour
// var queryUrl_EQ = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// All Week
var queryUrl_EQ = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// All Month
// var queryUrl_EQ = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


d3.json(queryUrl_EQ, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {

    layer.bindPopup(
      "<h3>" + "Location: " + feature.properties.place +
      "</h3><hr><p>" + "Time: " + new Date(feature.properties.time) +
      "</h3><p>" + "Magnitude: " + feature.properties.mag + "</p>");

  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, layer_circle) {
      var Markers_EQ = {
        radius: 5 * feature.properties.mag,
        fillColor: getColor(feature.properties.mag),
        weight: 1,
        fillOpacity: 0.90
      };
      return L.circleMarker(layer_circle, Markers_EQ)
    }
  });

  console.log(earthquakes);

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes by magnitude": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      29.09, -95.71
    ],
    zoom: 3.5,
    layers: [streetmap, earthquakes]
  });

  var legend = L.control({position: 'topright'});

  legend.onAdd = function (map) { 
    // var div = L.DomUtil.create('div', 'info legend'), grades = [0,500,5000,10000,80000,200000,5000000];

    var div = L.DomUtil.create('div', 'info legend'), grades = [1,2,3,4,5,6];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
      }
      legend.addTo(myMap);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(overlayMaps, baseMaps, {
    collapsed: false
  }).addTo(myMap);
  
}


