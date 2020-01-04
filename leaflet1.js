// Creating map object
// Chose Merch Mart as the center coordinate
var map = L.map("map", {
    center: [41.8885, -87.6355],
    zoom: 12
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

d3.csv("Buildings.csv").then((data) => {
    
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // locations = [];
    for (i = 0; i < data.length; i++) {
        if (data[i].Data_Year >= 2017 && Number(data[i].Site_EUI_kBtu_sqft)<=500) {
            var dataItem = data[i];
            var lat = dataItem.Latitude;
            var long = dataItem.Longitude;
            // var latLong = [lat, long];
            markers.addLayer(L.marker([lat, long]).bindPopup(data[i].Name));
            // locations.push(latLong);
            // console.log(latLong);
        }
    }
map.addLayer(markers);
});