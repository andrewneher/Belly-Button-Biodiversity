// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

function metaData(sample) {
  d3.json("samples.json").then((importedData2) => {
    var metaData = importedData2.metadata;
    var result = metaData.filter(row => row.id == sample)
    console.log(result);
    var result2 = result[0]
    var displayPanel = d3.select("#sample-metadata");
    displayPanel.html("");
    Object.entries(result2).forEach(([key, value]) => {
      displayPanel.append("h6").text(`${key} ${value}`);
    })
  })
}

// metaData("940");

function init() {
  d3.json("samples.json").then((importedData) => {
    console.log(importedData.names);
    var data = importedData.names;
    var display = d3.select("#selDataset")
    data.forEach((sample)=>{
      display.append("option")
      .text(sample)
      .property("value", sample);
    })
    var firstSample = data[0];
    console.log(firstSample);
    metaData(firstSample);
    buildChart(firstSample);
  })
}

init();

// function optionChanged(sampleId) {
//   metaData(sampleId)
// }



// function demoInfo(sampleId) {
//   d3.json("samples.json").then((importedData2) => {
//     console.log(importedData2.metadata);
//     var metaData = importedData2.metadata;
//     var select = metaData.filter(row => row.id == sampleId);
//     console.log(select);
//     })
// }



// function buildChart(chartInfo) {
//   d3.json("samples.json").then((importedData) => {
//     var dataSample = importedData.samples;
//     console.log(dataSample);
//     var select = dataSample.filter(row => row.id == chartInfo);
//     console.log(select);
//   })
// }

// /////// NOT LINKING UP CONSOLE LOG - ERROR 404 /////
// d3.json("samples.json").then((importedData) => {
//     console.log(importedData);
//     var data = importedData;
  
//     // Sort the data array using the greekSearchResults value
//     data.sort(function(a, b) {
//       return parseFloat(b.samples) - parseFloat(a.samples);
//     });
  
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
  
//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
  
//     // Trace1 for the Bar Chart Data
//     var trace1 = {
//       x: data.map(samples => samples.sample_values),
//       y: data.map(samples => samples.otu_ids),
//       text: data.map(samples => samples.otu_ids),
//       name: "OTU ID",
//       type: "bar",
//       orientation: "h"
//     };
  
//     // data
//     var chartData = [trace1];
  
//     // Apply the group bar mode to the layout
//     var layout1 = {
//       title: "Top 10 OTUs Found in the Individual",
//       margin: {
//         l: 50,
//         r: 50,
//         t: 50,
//         b: 50
//       }
//     };
  
//     // Render the plot to the div tag with id "bar"
//     Plotly.newPlot("bar", chartData, layout1);
//   });


  
// //////////////////
// // Bubble Chart //
// //////////////////

//   // set the dimensions and margins of the graph
// var margin = {top: 10, right: 20, bottom: 125, left: 50},
// width = 700 - margin.left - margin.right,
// height = 500 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#bubble")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// // THIS NEEDS TO CHANGE TO JSON
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {

// // Add X axis
// var x = d3.scaleLinear()
// .domain([0, 3500])
// .range([ 0, width ]);
// svg.append("g")
// .attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(x));

// // Add Y axis
// var y = d3.scaleLinear()
// .domain([0, 200])
// .range([ height, 0]);
// svg.append("g")
// .call(d3.axisLeft(y));

// // Add a scale for bubble size
// var z = d3.scaleLinear()
// .domain([200000, 1310000000])
// .range([ 1, 40]);

// // Add dots
// svg.append('g')
// .selectAll("dot")
// .data(data)
// .enter()
// .append("circle")
//   .attr("cx", function (d) { return x(d.gdpPercap); } )
//   .attr("cy", function (d) { return y(d.lifeExp); } )
//   .attr("r", function (d) { return z(d.pop); } )
//   .style("fill", "#69b3a2")
//   .style("opacity", "0.7")
//   .attr("stroke", "black")
  
// })

// //////////////////
// //// JS Gauge ////
// //////////////////

//   var gaugeData = [
//     {
//       domain: { x: [0, 1], y: [0, 1] },
//       value: 250,
//       title: { text: "Belly Button Washing Frequency"},
//       type: "indicator",
//       mode: "gauge+number"
//     }
//   ];
  
//   var layout = { width: 500, height: 400, margin: { t: 25, b: 25 } };

//   Plotly.newPlot('gauge', gaugeData, layout);
  