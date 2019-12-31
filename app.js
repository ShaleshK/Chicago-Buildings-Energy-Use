d3.csv("Buildings.csv").then((data) => {
  // data = data.filter(data.Data_Year === "2017");  
  var property = [];
  var sqFt = [];
  var age = [];
  var kBtuSqft = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].Data_Year >= 2017 && Number(data[i].Site_EUI_kBtu_sqft)<=500) {
    var dataItem = data[i];
    property.push(dataItem.Name);
    var feet = Number(dataItem.SqFt)/100000;
    if (feet < 5) {
      feet = 10;
    }
    sqFt.push(feet);
    age.push(dataItem.Year_Built);
    kBtuSqft.push(Number(dataItem.Site_EUI_kBtu_sqft));   }
  }
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


