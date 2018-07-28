// Define margins
var margin = {top: 20, right: 80, bottom: 30, left: 50},
width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

// Define date parser
var parseDate = d3.time.format("%B").parse;

// Define scales
var xScale = d3.time.scale().range([0, width]);
var yScale = d3.scale.linear().range([height, 0]);
var color = d3.scale.ordinal()
      .range(['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#CFECF9', '#7F7F7F', '#BCBD22', '#17BECF']);

// Define axes
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

// Define lines
var line = d3.svg.line().interpolate("linear")
            .x(function(d) { return xScale(d["date"]); })
            .y(function(d) { return yScale(d["concentration"]); });

// Define svg canvas
var svg = d3.select('#chart')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read in data
d3.csv("js/StackedLineData.csv", function(error, data){
  if (error) throw error;

  // Set the color domain equal to the three product categories
  var productCategories = d3.keys(data[0]).filter(function(key){return (key !== "Month")})
  color.domain(productCategories);

  // console.log(JSON.stringify(data, null, 2)) // to view the structure

  // Format the data field
  data.forEach(function(d){
    d["Month"] = parseDate(d["Month"])
  });

  // Filter the data to only include a single metric
  // var subset = data.filter(function(el) {return el.metric === "Quantity" });
  // console.log(JSON.stringify(subset, null, 2))

  // Reformat data to make it more copasetic for d3
  // data = An array of objects
  // concentrations = An array of three objects, each of which contains an array of objects
  var concentrations = productCategories.map(function(category){
    return {category: category, datapoints: data.map(function(d){
      return {date: d["Month"], concentration: +d[category]}
    })}
  })
  // console.log(JSON.stringify(concentrations, null, 2)) // to view the structure

  // Set the domain of the axes
  xScale.domain(d3.extent(data, function(d) {return d["Month"]; }));

  yScale.domain([0, 2000]);

  // Place the axes on the chart
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "label")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Incidents");


  var products = svg.selectAll(".category")
        .data(concentrations)
        .enter().append("g")
        .attr("class", "category");

  products.append("path")
          .attr("class", "line")
          .attr("d", function(d) {return line(d.datapoints); })
          .style("stroke", function(d) {return color(d.category); });

  products.append("text")
            .attr("class", "annotation")
            .text(function(d) { return "Annotation: Crime rates decrease in the winter" })
            .attr("transform", function(d) { return "translate(" + xScale(parseDate("June")) + "," + yScale(1000) + ")"; } )


    // console.log(JSON.stringify(d3.values(concentrations), null, 2)) // to view the structure
    console.log(d3.values(concentrations)); // to view the structure
    console.log(concentrations);
    // console.log(concentrations.map(function()))
});

// Define responsive behavior
function resize() {
  var width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
  height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

  // Update the range of the scale with new width/height
  xScale.range([0, width]);
  yScale.range([height, 0]);

  // Update the axis and text with the new scale
  svg.select('.x.axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.select('.y.axis')
    .call(yAxis);

  // Force D3 to recalculate and update the line
  svg.selectAll('.line')
    .attr("d", function(d) { return line(d.datapoints); });

  // Update the tick marks
  xAxis.ticks(Math.max(width/75, 2));
  yAxis.ticks(Math.max(height/50, 2));

};

// Call the resize function whenever a resize event occurs
d3.select(window).on('resize', resize);

// Call the resize function
resize();
