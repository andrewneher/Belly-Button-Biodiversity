

////////////////
/// METADATA ///
////////////////

function metadataTable(importedData) {
  d3.json("samples.json").then((data) => {
      console.log(data)
      var metaData = data.metadata
      var sampleOutput = metaData.filter(row => row.id  === parseInt(importedData));
      var result = sampleOutput[0]
      var panel = d3.select("#sample-metadata")
      
      panel.html("")
      
      Object.entries(result).forEach(([key,value])=> {
          panel.append("h6").text(`${key.toUpperCase()} : ${value}`);
      })
  })
} 

/////////////////
/// BAR GRAPH ///
/////////////////

function buildChart(importedData) {
  d3.json("samples.json").then((data) => {
      var idSamp = data.samples.filter(x => parseInt(x.id) === parseInt(importedData))
      var sampValues = idSamp[0].sample_values.slice(0,10)
      sampValues = sampValues.reverse()
      var otuValues = idSamp[0].otu_ids.slice(0,10)
      otuValues = otuValues.reverse()
      var singOTUValue = otuValues.map(x => `OTU ${x}`)
      
      var trace = {
          x: sampValues,
          y: singOTUValue,
          mode: "markers",
          marker: {size:10},
          text: singOTUValue,
          type: "bar",
          orientation: "h"
        };

        var data1 = [trace];
        var layout = {
            title: `Top 10 OTUs Found in ID ${importedData}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
        };

        Plotly.newPlot("bar", data1, layout)

  })
}

//////////////////
// BUBBLE GRAPH //
//////////////////

function buildBubble(importedData) {
  d3.json("samples.json").then((data) => {
      var idSamp = data.samples.filter(x => (parseInt(x.id)) === parseInt(importedData))
      var indivSampValue = idSamp[0].sample_values
      var indivOtuValue = idSamp[0].otu_ids

      var trace1 = {
      x: indivSampValue,
      y: indivOtuValue,
      mode: 'markers',
      marker: {
          size: indivSampValue,
          color: indivOtuValue
      },
      text: indivOtuValue
      };
      
      var data2 = [trace1];
      
      var layout = {
      title: "OTU ID",
      showlegend: false,
      height: 500,
      width: 850
      };
      Plotly.newPlot("bubble", data2, layout);
  })    
}



////////////
/// MENU ///
////////////

function optionChanged(importedData) {
  metadataTable(importedData)
  buildChart(importedData)
  buildBubble(importedData)
}


////////////////
// INITIALIZE //
////////////////

function init() {
  d3.json("samples.json").then((data) => {
      d3.select("#selDataset").html(""); 
      var metaData = data.metadata
      metaData.forEach(row => {d3.select ("#selDataset").append('option').attr('value', row.id).text(row.id);
      });
      sampleID = d3.select("#selDataset").node().value 
      metadataTable(importedData)
      buildChart(importedData)
      buildBubble(importedData)
  });

}
init()



//////////////////
//// JS Gauge ////
//////////////////

  var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 250,
      title: { text: "Belly Button Washing Frequency"},
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 500, height: 400, margin: { t: 25, b: 25 } };

  Plotly.newPlot('gauge', gaugeData, layout);
  



// function init() {
//   d3.json("samples.json").then((importedData) => {
//     var data = importedData.names;
//     var display = d3.select("#selDataset")
//     data.forEach((sample)=>{
//       display.append("option")
//       .text(sample)
//       .property("value", sample);
//     })
//     var firstSample = data[0];
//     metaData_table(importedData, firstSample);
//     // buildChart(firstSample);
//   })
// }

// function metaData_table(importedData, sample) {
//   var displayPanel = d3.select("#sample-metadata");
//   displayPanel.html("");
//   var metaData = importedData.metadata
//   var filteredData = metaData.filter(row => row.id == sample)[0]
//   Object.entries(filteredData).forEach(([key, value]) => {
//   displayPanel.append("h6").text(`${key} ${value}`);
//   })
// }

// init();
// metaData_table();

// function metaData(sample) {
//   d3.json("samples.json").then((importedData2) => {
//     // console.log(importedData2.metadata);
//     var metaData = importedData2.metadata;
//     var result = metaData.filter(row => row.id == sample)
//     // console.log(result);
//     var result2 = result[0]
//     var displayPanel = d3.select("#sample-metadata");
//     console.log(result2);
//     displayPanel.html("");
//     Object.entries(result2).forEach(([key, value]) => {
//       displayPanel.append("h6").text(`${key} ${value}`);
//     })
//   })
// }






///////////////
// BAR CHART //
///////////////

// function buildChart(chartInfo) {
//   d3.json("samples.json").then((importedData) => {
//     var dataSample = importedData.samples;
//     console.log(dataSample);
//     var select = dataSample.filter(row => row.id == chartInfo);
//     console.log(select);
//   })
// }

/////// NOT LINKING UP CONSOLE LOG - ERROR 404 /////
// d3.json("samples.json").then((importedData3) => {
//     console.log(importedData3);
//     var data = importedData3;
  
//     // Sort the data array using the importedData value
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
  