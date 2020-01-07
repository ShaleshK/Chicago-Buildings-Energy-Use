var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});
var url = "https://raw.githubusercontent.com/ShaleshK/project-two/master/Buildings.csv";
d3.csv(url, function(response) {
  // create empty arrays
  var heat1Array = [];
  var heat2Array = [];
  var heat3Array = [];
  var heat4Array = [];
  var heat5Array = [];
  // totalHeatArray
  for (var i = 0; i < response.length; i++) {
    var location = response[i].Location;
    var Lat = response[i].Latitude;
    var Long = response[i].Longitude;
    var total_eng = response[i]["Electricity Use (kBtu)"]
    if (total_eng < 500000) {
      heat1Array.push([Lat,Long,total_eng]);
    } else if (total_eng < 1000000) {
      heat2Array.push([Lat,Long,total_eng]);
    } else if (total_eng < 5000000) {
      heat3Array.push([Lat,Long,total_eng]);
    } else if (total_eng < 10000000) {
      heat4Array.push([Lat,Long,total_eng])
    } else if (total_eng > 10000000) {
      heat5Array.push([Lat,Long,total_eng])}
  }
  var heat1 = L.heatLayer(heat1Array, {
    radius: 20,
    blur: 35
  })
  var heat2 = L.heatLayer(heat2Array, {
    radius: 20,
    blur: 35
  })
  var heat3 = L.heatLayer(heat3Array, {
    radius: 20,
    blur: 35
  })
  var heat4 = L.heatLayer(heat4Array, {
    radius: 20,
    blur: 35
  })
  var heat5 = L.heatLayer(heat5Array, {
    radius: 20,
    blur: 35
  })
  var basemaps = {
    "Electricity Use < 500,000 kBtu": heat1,
    "Electricity Use < 1,000,000 kBtu": heat2,
    "Electricity Use < 5,000,000 kBtu": heat3,
    "Electricity Use < 10,000,000 kBtu": heat4,
    "Electricity Use > 10,000,000 kBtu": heat5
  }
  var overlays = {
    "Streets": streets
  }
  var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 10.5,
    layers:[streets,heat1]
  });
  var layerDiv = L.control.layers(basemaps, overlays,{collapsed:false});
  layerDiv.addTo(myMap);
});