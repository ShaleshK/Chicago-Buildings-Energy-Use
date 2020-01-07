
// Create tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    age_less_1900: new L.LayerGroup(),
    age_less_1920: new L.LayerGroup(),
    age_less_1940: new L.LayerGroup(),
    age_less_1960: new L.LayerGroup(),
    age_less_1980: new L.LayerGroup(),
    age_less_2000: new L.LayerGroup(),
    age_less_2020: new L.LayerGroup()
  };

// Creating map object
// Chose Merch Mart as the center coordinate
var map = L.map("map", {
    center: [41.8885, -87.6355],
    zoom: 12,
    layers: [
        layers.age_less_1900,
        layers.age_less_1920,
        layers.age_less_1940,
        layers.age_less_1960,
        layers.age_less_1980,
        layers.age_less_2000,
        layers.age_less_2020
    ]
  });

lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
    "Built Before 1900": layers.age_less_1900,
    "Built Between 1900 and 1920": layers.age_less_1920,
    "Built Between 1920 and 1940": layers.age_less_1940,
    "Built Between 1940 and 1960": layers.age_less_1960,
    "Built Between 1960 and 1980": layers.age_less_1980,
    "Built Between 1980 and 2000": layers.age_less_2000,
    "Built Between 2000 and 2020": layers.age_less_2020
  };

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
    position: "bottomleft"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  
// Initialize an object containing icons for each layer group
// var icons = {
//     age_less_1900: L.ExtraMarkers.icon({
//       icon: "fa-coffee",
//       iconColor: "white",
//       markerColor: "red",
//       shape: "circle"
//     }),
//     age_less_1920: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "blue",
//         shape: "circle"
//       }),
//     age_less_1940: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "green",
//         shape: "circle"
//     }),
//     age_less_1960: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "orange",
//         shape: "circle"
//         }),
//     age_less_1980: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "yellow",
//         shape: "circle"
//         }),
//     age_less_2000: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "black",
//         shape: "circle"
//         }),
//     age_less_2020: L.ExtraMarkers.icon({
//         icon: "fa-coffee",
//         iconColor: "white",
//         markerColor: "purple",
//         shape: "circle"
//         })
// }
d3.csv("Buildings.csv").then((data) => {
        // Create an object to keep of the number of markers in each layer
        var buildingCount = {
            age_less_1900: 0,
            age_less_1920: 0,
            age_less_1940: 0,
            age_less_1960: 0,
            age_less_1980: 0,
            age_less_2000: 0,
            age_less_2020: 0
          };
      
          // Initialize a buildingAge, which will be used as a key to access the appropriate layers, icons, and building age for layer group
          var buildingAge;
      
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // locations = [];
    for (i = 0; i < data.length; i++) {
        if (data[i].Data_Year >= 2017 && Number(data[i].Site_EUI_kBtu_sqft)<=500) {
            var dataItem = data[i];
            var lat = dataItem.Latitude;
            var long = dataItem.Longitude;
            var energy = dataItem.Site_EUI_kBtu_sqft;
            var sqFt = dataItem.SqFt;
            var age = dataItem.Year_Built;
            var color;

            if (age < 1900) {
                buildingAge = "age_less_1900";
                color = "#edf8fb";
            }
            else if (age < 1920) {
                buildingAge = "age_less_1920";
                color = "#ccece6";
            }
            else if (age < 1940) {
                buildingAge = "age_less_1940";
                color = "#99d8c9";
            }
            else if (age < 1960) {
                buildingAge = "age_less_1960";
                color = "#66c2a4";
            }
            else if (age < 1980) {
                buildingAge = "age_less_1980";
                color = "#41ae76";
            }
            else if (age < 2000) {
                buildingAge = "age_less_2000";
                color = "#238b45";
            }
            else {
                buildingAge = "age_less_2020";
                color = "#005824";
            }
            buildingCount[buildingAge]++;
            // var latLong = [lat, long];
            markers.addLayer(L.marker([lat, long]
                // ,
                // {icon: icons[buildingAge]}
                )
                // .addTo(layers[buildingAge])
            
                .bindPopup("<h1>" + data[i].Name 
            + "</h1> <hr> <h3>" 
            + "Energy Consumption: " 
            + energy
            + " kBtu/sq ft </h3> <h3>" 
            + "Square Footage: "
            + sqFt
            + " ft^2</h3>"
            + "<h3>"
            + "Year Built: "
            + age
            + "</h3>"
            ));
            // locations.push(latLong);
            // console.log(latLong);
        }
    }
    // Call the updateLegend function, which will... update the legend!
    updateLegend(buildingCount);


map.addLayer(markers);
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(buildingCount) {
    document.querySelector(".legend").innerHTML = [
      "<p class='before-1900'>Buildings Built Before 1900: " + buildingCount.age_less_1900 + "</p>",
      "<p class='between-1900-1920'>Buildings Built Between 1900 and 1920: " + buildingCount.age_less_1920 + "</p>",
      "<p class='between-1920-1940'>Buildings Built Between 1920 and 1940: " + buildingCount.age_less_1940 + "</p>",
      "<p class='between-1940-1960'>Buildings Built Between 1940 and 1960: " + buildingCount.age_less_1960 + "</p>",
      "<p class='between-1960-1980'>Buildings Built Between 1960 and 1980: " + buildingCount.age_less_1980 + "</p>",
      "<p class='between-1980-2000'>Buildings Built Between 1980 and 2000: " + buildingCount.age_less_2000 + "</p>",
      "<p class='between-2000-2020'>Buildings Built After 2000: " + buildingCount.age_less_2020 + "</p>"
    ].join("");
  }