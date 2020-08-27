import "./d3.v3";

var width = d3.select("article").style("width").replace("px", "");

var nums = [80, 53, 125, 200, 28, 97];

// #chart1
var svg = d3
  .select("#chart1")
  .append("svg")
  .attr("height", 200)
  .attr("width", 200)
  .style("display", "block")
  .style("margin", "0 auto");
svg
  .selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", function (d) {
    return d;
  })
  .attr("y", function (d) {
    return 200 - d;
  })
  .attr("x", function (d, i) {
    return i * 30;
  });

// #selections1
var selections1 = d3
  .select("#selections1")
  .append("svg")
  .attr("width", width)
  .attr("height", 100);
selectionsLabel(selections1);

// #selections2
var selections2 = d3
  .select("#selections2")
  .append("svg")
  .attr("width", width)
  .attr("height", 350);
selectionsLabel(selections2);

var rep = selections2
  .append("g")
  .attr("transform", "translate(280, 220)")
  .classed("circles", true);
rep.append("circle").style("fill", "#3182bd");
rep.append("text").attr("x", -50).text("Enter");
rep.append("text").attr("x", 60).text("Update");

var dom = selections2
  .append("g")
  .attr("transform", "translate(400, 220)")
  .classed("circles", true);
dom.append("circle").style("fill", "#e6550d");
dom.append("text").attr("x", 50).text("Exit");

selections2.selectAll(".circles text").style("text-anchor", "middle");
selections2
  .selectAll(".circles circle")
  .style("opacity", 0.25)
  .style("stroke", "black")
  .style("stroke-width", "2px")
  .attr("r", 110);

function selectionsLabel(svg) {
  var label = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + ",20)");

  label.append("text").text("Selection");
  label.append("text").text("Representation").attr("y", 65).attr("x", -100);
  label.append("text").text("Current DOM").attr("y", 65).attr("x", 100);

  label
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("font-weight", "bold");

  label
    .append("line")
    .attr("x1", -30)
    .attr("y1", 10)
    .attr("x2", -90)
    .attr("y2", 40);
  label.selectAll("line").style("stroke", "black").style("stroke-width", 2);
  label
    .append("circle")
    .attr("cx", -90)
    .attr("cy", 40)
    .attr("r", 3)
    .attr("stroke", "black");

  label
    .append("line")
    .attr("x1", 30)
    .attr("y1", 10)
    .attr("x2", 90)
    .attr("y2", 40);
  label.selectAll("line").style("stroke", "black").style("stroke-width", 2);
  label
    .append("circle")
    .attr("cx", 90)
    .attr("cy", 40)
    .attr("r", 3)
    .attr("stroke", "black");
}

// #chart2
var svg = d3
  .select("#chart2")
  .append("svg")
  .attr("height", 200)
  .style("display", "block")
  .style("margin", "0 auto");
svg
  .selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", 20);

// #chart3
var svg = d3
  .select("#chart3")
  .append("svg")
  .attr("height", 200)
  // .attr('width', 200)
  .style("display", "block")
  .style("margin", "0 auto");
svg
  .selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("x", function (d, i) {
    return 30 * i;
  });

// #chart4
var svg = d3
  .select("#chart4")
  .append("svg")
  .attr("height", 200)
  // .attr('width', 200)
  .style("display", "block")
  .style("margin", "0 auto");
svg
  .selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("x", function (d, i) {
    return 30 * i;
  })
  .attr("height", function (d, i) {
    return d;
  });

// #chart5
var svg = d3
  .select("#chart5")
  .append("svg")
  .attr("height", 200)
  // .attr('width', 200)
  .style("display", "block")
  .style("margin", "0 auto");
svg
  .selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("x", function (d, i) {
    return 30 * i;
  })
  .attr("height", function (d, i) {
    return d;
  })
  .attr("y", function (d, i) {
    return 200 - d;
  });

const Null = () => null;
export default Null;
