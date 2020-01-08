// var information = d3.json("https://agile-beyond-24167.herokuapp.com/API/data");

// var parsedInfo = JSON.parse(information.then(function(Response){console.log(Response)}));
const url = "https://agile-beyond-24167.herokuapp.com/API/data"

function genInfo() {
    d3.json(url).then(function(data) {
    
    var lats = [];
    var longs = [];
    var years = [];
    var ages = [];
    var names = [];
    var engs = [];
    var elects = [];
    var addresses = [];
    // var sizes = [];
    
    // console.log(data);

    // console.log(data.data.length);
    for (i = 0; i < data.data.length; i++) {
        lats.push(data.data[i].latitude);
        longs.push(data.data[i].longitude);
        years.push(data.data[i].data_year);
        ages.push(data.data[i].year_built);
        addresses.push(data.data[i].address);
        engs.push(data.data[i].site_eui_kbtu_sq_ft);
        names.push(data.data[i].property_name);
        // console.log(names);
        elects.push(data.data[i].electricity_use_kbtu);
        // sizes.push(data.data[i].whateverthesizeis);
    }
    // console.log(ages);
    // console.log(names);
    // console.log(lats);
    // Create tile layer
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    });

    // Creating map object
    // Chose Merch Mart as the center coordinate
    var map = L.map("map", {
        center: [41.8885, -87.6355],
        zoom: 12,
    });

    lightmap.addTo(map);


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
    
    // d3.csv("Buildings.csv").then((data) => {
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
        // console.log(lats.length);
        // locations = [];
        for (j = 0; j < data.data.length; j++) {
            // console.log(j)
            // console.log(years[j])
            if (Number(years[j]) >= 2017 && Number(engs[j])<=500) {
                // console.log(j);
                // var dataItem = data[i];
                var lat = lats[j];
                // console.log(lat);
                var long = longs[j];
                // console.log(long)
                var energy = engs[j];
                // var sqFt = sizes[j];
                var age = ages[j];
                // console.log(age);
                var color;

                if (age < 1900) {
                    buildingAge = "age_less_1900";
                    color = "red";
                }
                else if (age < 1920) {
                    buildingAge = "age_less_1920";
                    color = "orange-dark";
                }
                else if (age < 1940) {
                    buildingAge = "age_less_1940";
                    color = "blue";
                }
                else if (age < 1960) {
                    buildingAge = "age_less_1960";
                    color = "cyan";
                }
                else if (age < 1980) {
                    buildingAge = "age_less_1980";
                    color = "violet";
                }
                else if (age < 2000) {
                    buildingAge = "age_less_2000";
                    color = "green-dark";
                }
                else {
                    buildingAge = "age_less_2020";
                    color = "black";
                }
                buildingCount[buildingAge]++;
                // var latLong = [lat, long];

                var newIcon = L.ExtraMarkers.icon({
                    icon: "ion-settings",
                    iconColor: "white",
                    markerColor: color,
                    shape: "circle"
                });

                markers.addLayer(L.marker([lat, long]
                    ,
                    {icon: newIcon}
                    )
                    // .addTo(layers[buildingAge])
                
                    .bindPopup("<h1>" + names[j] 
                + "</h1> <hr> <h5>" 
                + "Energy Consumption: " 
                + energy
                + " kBtu/sq ft </h5> <h5>" 
                // + "Square Footage: "
                // + sqFt
                // + " ft^2</h5>"
                // + "<h5>"
                + "Year Built: "
                + age
                + "</h5>"
                ));
                // locations.push(latLong);
                // console.log(latLong);
            }
        }
        // Call the updateLegend function, which will... update the legend!
        updateLegend(buildingCount);


    map.addLayer(markers);
    // });

    // Update the legend's innerHTML with the last updated time and station count
    function updateLegend(buildingCount) {
        document.querySelector(".legend").innerHTML = [
        // "<p class='before-1900'> <div class = 'block-1900' </div> Buildings Built Before 1900: " + buildingCount.age_less_1900 + " </p> <br/> <br/> <br/>",
        // "<p class='between-1900-1920'>Buildings Built Between 1900 and 1920: " + buildingCount.age_less_1920 + "</p> ",
        // "<p class='between-1920-1940'>Buildings Built Between 1920 and 1940: " + buildingCount.age_less_1940 + "</p> ",
        // "<p class='between-1940-1960'>Buildings Built Between 1940 and 1960: " + buildingCount.age_less_1960 + "</p> ",
        // "<p class='between-1960-1980'>Buildings Built Between 1960 and 1980: " + buildingCount.age_less_1980 + "</p> ",
        // "<p class='between-1980-2000'>Buildings Built Between 1980 and 2000: " + buildingCount.age_less_2000 + "</p> ",
        // "<p class='between-2000-2020'>Buildings Built After 2000: " + buildingCount.age_less_2020 + "</p>"
        // ]
       " <div class='my-legend'>" +
            "<div class='legend-title'>Legend</div>" +
            "<div class='legend-scale'>" +
                "<ul class='legend-labels'>" +
                    "<li><span style='background:#e3180e;'></span> Buildings Built Before 1900: " + buildingCount.age_less_1900 + "</li>" +
                    "<li><span style='background:#e37a09;'></span>Buildings Built Between 1900 and 1920: " + buildingCount.age_less_1920 + "</li>" +
                    "<li><span style='background:#0964e3;'></span>Buildings Built Between 1920 and 1940: " + buildingCount.age_less_1940 + "</li>" +
                    "<li><span style='background:#09bfe3;'></span>Buildings Built Between 1940 and 1960: " + buildingCount.age_less_1960 + "</li>" +
                    "<li><span style='background:#610d91;'></span>Buildings Built Between 1960 and 1980: " + buildingCount.age_less_1980 + "</li>" + 
                    "<li><span style='background:#047836;'></span>Buildings Built Between 1980 and 2000: " + buildingCount.age_less_2000 + "</li>" + 
                    "<li><span style='background:#000000;'></span>Buildings Built Between 2000 and 2020: " + buildingCount.age_less_2020 + "</li>" + 
                "</ul>"+
            "</div>"+
            "<div class='legend-source'>Source: <a href='https://data.cityofchicago.org/Environment-Sustainable-Development/Chicago-Energy-Benchmarking/xq83-jr8c'>Chicago Energy Benchmarking</a></div>"+
            "</div>"]
        .join("");
    }
})};

genInfo();