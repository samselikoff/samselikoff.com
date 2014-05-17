d3.json('data.json', function(response) {

  var allSeries = response.indicators.map(function(group) {
    return {
      key: group.key,
      label: group.label,
      threshold: group.threshold,
      sign: group.sign,
      values: response.data
        .sort(function(a, b) {return a.date > b.date;})
        .map(function(obs) {
          return {time: obs.date, value: obs[group.key]};
        })
    };
  });

  var colors = ['#FF6138', '#04BFBF', 'rgb(172, 57, 144)', '#00A388'];

  var containers = d3.select('body').selectAll('.chart-container').data(allSeries);

  containers.enter().append('div').attr('class', 'chart-container');

  containers.each(function(d, i) {

    var chart = d3.select(this).append('div').attr('class', 'chart')
      .append('svg')
        .chart('core-line-chart')
        .asideWidth(0)
        .brushHeight(0)
        .color(colors[i % 4])
        .parseDate(d3.time.format('%m/%d/%y').parse)
        // .width(100)
        // .height(200)
        ;

    chart.line().interpolate('linear');
    chart.area().interpolate('linear');

    chart.tooltip.template(function(d) {return d.value;});

    chart.unlayer('brush');
    chart.unlayer('lines-brush');
    chart.unlayer('areas-brush');

    chart.xAxis.ticks(4).rotation(45);

    chart.xAxisBrush.hide(1);

    chart.legend.hidden(true);

    // Add the threshold
    var scale = chart.yScale();
    chart.layer('lines').on('enter:transition', function() {
      var domain = scale.domain();

      if (domain[1] < d.threshold) {
        scale.domain([domain[0], d.threshold]);
      }

      g = this.chart().base.select('g')
        .append('g').style('opacity', 0);

      g.append('line')
        .attr('x1', 0)
        .attr('y1', scale(d.threshold))
        .attr('x2', chart.xScale().range()[1])
        .attr('y2', scale(d.threshold))
        .style('stroke', 'black')
        .style('stroke-dasharray', '9')
        // .style('stroke-width', '2px')
        ;

      var text = (d.sign == '+') ? 'normal ('+d.threshold+') -->' : '<-- normal ('+d.threshold+')';
      g.append('text')
        .text(text)
        .style('font-size', '10px')
        .attr('transform', 'translate(-5,' + scale(d.threshold) + ')rotate(-90)')
        .style('text-anchor', d.sign == '-' ? 'end' : '');

      g.transition().duration(500).style('opacity', 1);
    });


    chart.draw(d.values);

  });
});
