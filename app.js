var globalData;
function init(data) {
  d3.csv("Buildings.csv").then(data => {
    globalData = data;
    var property = [];
    var sqFt = [];
    var age = [];
    var kBtuSqft = [];
    var propertyTypes = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].Data_Year >= 2017 && Number(data[i].Site_EUI_kBtu_sqft)<=500) {
        var dataItem = data[i];
        var feet = Number(dataItem.SqFt)/100000;
        if (feet < 5) {
          feet = 10;
        }
        property.push(dataItem.Name);
        sqFt.push(feet);
        age.push(dataItem.Year_Built);
        kBtuSqft.push(Number(dataItem.Site_EUI_kBtu_sqft));
        if (!propertyTypes.includes(data[i]["Primary Property Type"])) {
          propertyTypes.push(data[i]["Primary Property Type"])
        }   
      }
    }
    // console.log(propertyTypes);
    var dropdown = d3.select("#selDataset");
    
    dropdown.append("option")
      .text("All")
      .property("value", "all");

    propertyTypes.forEach(function(type) {
      dropdown.append("option")
      .text(type)
      .property("value", type.replace(/\s/g, ''));
    })
    // dropdown.selectAll("option").data(propertyTypes).enter()
    //   .append("option")
    //   .text(d => d)
    //   .property("value", d => d.replace(/\s/g, ''));
    
  
    // console.log(sqFt);
    console.log(kBtuSqft);
    // Bubble Chart
    var trace1 = {
        x: age,
        y: kBtuSqft,
        text: property,
        mode: 'markers',
        marker: {
        size: sqFt,
        color: age, 
        colorscale:"Earth"
        }
    };
    var data = [trace1];
    var layout = {
        title: 'Energy Efficiency (kBtu per SqFt) by Age of Building',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"Age of Building"},
        margin: {t:30}
    };
    Plotly.newPlot('bubble', data, layout); 
  });
}

function buildChart(propertyType) {
  console.log("buildChart")
  if (propertyType == "all") {
    data = globalData;
  } else {
    data = globalData.filter(x => x["Primary Property Type"].replace(/\s/g, '') == propertyType)
  }
  console.log(data);
  var property = [];
  var sqFt = [];
  var age = [];
  var kBtuSqft = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].Data_Year >= 2017 && Number(data[i].Site_EUI_kBtu_sqft)<=500) {
      var dataItem = data[i];
      var feet = Number(dataItem.SqFt)/100000;
      if (feet < 5) {
        feet = 10;
      }
      property.push(dataItem.Name);
      sqFt.push(feet);
      age.push(dataItem.Year_Built);
      kBtuSqft.push(Number(dataItem.Site_EUI_kBtu_sqft));
    }
  }   
  var trace1 = {
    x: age,
    y: kBtuSqft,
    text: property,
    mode: 'markers',
    marker: {
      size: sqFt,
      color: age, 
      colorscale:"Earth"
    }
  };

  var data = [trace1];
  var layout = {
    title: 'Energy Efficiency (kBtu per SqFt) by Age of Building',
    showlegend: false,
    hovermode: 'closest',
    xaxis: {title:"Age of Building"},
    margin: {t:30}
  };
  
  console.log("age: ", age);
  console.log("kBtuSqft", kBtuSqft);
  Plotly.restyle('bubble', {x:[age], y:[kBtuSqft], marker:{size: sqFt, color: age}});
  
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildChart(newSample);
}
// Initialize the dashboard
init();
