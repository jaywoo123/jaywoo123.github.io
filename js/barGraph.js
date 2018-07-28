
var margin2 = {top: 20, right: 20, bottom: 70, left: 40},
    width2 = 600 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;

// Parse the date / time

var x = d3.scale.ordinal().rangeRoundBands([0, width2], .05);

var y = d3.scale.linear().range([height2, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis2 = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg2 = d3.select('#barchart')
            .attr("width", width2 + margin2.left + margin2.right)
            .attr("height", height2 + margin2.top + margin2.bottom)
            .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("js/BarChartData.csv", function(error, data) {

  x.domain(data.map(function(d) { return d.InitialTypeGroup; }));
  y.domain([0, 23053]);

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Records");

  svg2.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.InitialTypeGroup); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.NumberofRecords); })
      .attr("height", function(d) { return height2 - y(d.NumberofRecords); })
      .style("fill", function(d) {return color(d.InitialTypeGroup); });

});
