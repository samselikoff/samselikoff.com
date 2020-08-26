import "./d3.v3";
import "./d3.chart";
import "./BaseChart.js";
import "./BarChart.js";
import "./AnimatedBarChart.js";
import "./ProfitLossBarChart.js";

var data = [
  { name: "A", value: 4 },
  { name: "B", value: -36 },
  { name: "C", value: 19 },
  { name: "D", value: -2 },
  { name: "E", value: 6 },
];

// Standard bar chart
var barChart = d3.select("#bar-chart").append("svg").chart("BarChart");

barChart.draw(data);

// Wide bar chart
var wideBarChart = d3
  .select("#wide-bar-chart")
  .append("svg")
  .chart("BarChart")
  .width(500);

wideBarChart.draw(data);

// Animated bar chart
function drawAnimatedBarChart() {
  var animatedBarChart = d3
    .select("#animated-bar-chart")
    .html("")
    .append("svg")
    .chart("AnimatedBarChart")
    .draw(data);
}

d3.select("#draw-animated-bar-chart").on("click", drawAnimatedBarChart);

// Profit and loss bar chart
var profitLossBarChart = d3
  .select("#profit-loss-bar-chart")
  .append("svg")
  .chart("ProfitLossBarChart");

profitLossBarChart.draw(data);

const Named = () => null;

export default Named;
