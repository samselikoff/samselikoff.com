var data = [
  {
    date: '5/8/14',
    label: 'Before fourth infusion',
    plateletCount: 202,
    neutAbs: 15.1,
    creatininePlasma: 0.69,
    bilirubin: 0.1,
  },

  {
    date: '4/24/14',
    label: 'Before third infusion',
    plateletCount: 194,
    neutAbs: 8.4,
    creatininePlasma: 0.7,
    bilirubin: 0.1
  },
  {
    date: '4/10/14',
    label: 'Before second infusion',
    plateletCount: 170,
    neutAbs: 6.2,
    creatininePlasma: 0.9,
    bilirubin: 0.1

  },
  {
    date: '3/27/14',
    label: 'Before first infusion',
    plateletCount: 222,
    neutAbs: 4.2,
    creatininePlasma: 0.8,
    bilirubin: 0.3
  }
];

var groupNames = [
  {
    key: 'plateletCount',
    label: 'Platelet Count',
    threshold: 100,
    sign: '+'
  },
  {
    key: 'neutAbs',
    label: 'Neut Abs',
    threshold: 1.5,
    sign: '+'
  },
  {
    key: 'creatininePlasma',
    label: 'Creatinine/Plasma',
    threshold: 1.5,
    sign: '-'
  },
  {
    key: 'bilirubin',
    label: 'Bilirubin',
    threshold: 1.5,
    sign: '-'
  }
];

var allSeries = groupNames.map(function(group) {
  return {
    key: group.key,
    label: group.label,
    threshold: group.threshold,
    sign: group.sign,
    values: data
      .sort(function(a, b) {return a.date > b.date;})
      .map(function(obs) {
        return {name: obs.date, value: obs[group.key]};
      })
  };
});

var svg = d3.select('#charts').append('svg')
  .attr('width', '920px')
  .attr('height', '600px');

var groups = svg.selectAll('.group').data(allSeries),
    groupsEnter = groups.enter();

groupsEnter.append('g')
    .attr('class', 'group')
    .attr('transform', function(d, i) {return 'translate(' + i*235 + ',0)';});

groups.append('text').text(function(d) {return d.label;})
  .attr('transform', 'translate(20, 20)');

// groups.selectAll('rect').data(function(d) {return d.values;}).enter()
//   .append('rect')
//     .attr('transform', function(d, i) {return 'translate(' + i*30 + ',0)'})
//     .attr('width', 10)
//     .attr('height', function(d, i) {return d.value;});

groups.each(function(d, i) {
  var colors = ['#FF6138', '#04BFBF', '#00A388', 'rgb(172, 57, 144)'];

  var barChart = d3.select(this).chart('bar-chart')
    .asideWidth(0)
    .width(100)
    .height(550)
    .color(colors[i])
    .margin({top: 80, right: 10, bottom: 80, left: 15});

  barChart.legend.hidden(true);

  barChart.xAxis
    .hideTicks(true)
    .rotation(45);

  barChart.labels.position('top');

  // Add the threshold
  var scale = barChart.yScale();

  barChart.layer('bars').on('enter:transition', function() {
    var domain = scale.domain();

    if (domain[1] < d.threshold) {
      scale.domain([domain[0], d.threshold]);
    }

    g = this.chart().base.select('g')
      .append('g').style('opacity', 0);

    g.append('line')
      .attr('x1', 5)
      .attr('y1', scale(d.threshold))
      .attr('x2', 120)
      .attr('y2', scale(d.threshold))
      .style('stroke', 'black')
      .style('stroke-dasharray', '9')
      .style('stroke-width', '2px');

    var text = (d.sign == '+') ? 'good ('+d.threshold+') -->' : '<-- good('+d.threshold+')';
    g.append('text')
      .text(text)
      .style('font-size', '10px')
      .attr('transform', 'translate(-5,' + scale(d.threshold) + ')rotate(-90)')
      .style('text-anchor', d.sign == '-' ? 'end' : '');

    g.transition().duration(500).style('opacity', 1);
  });


  barChart.draw(d.values);
});
