d3.json('data.json', function(response) {

  var allSeries = response.indicators.map(function(group) {
    return {
      key: group.key,
      label: group.label,
      thresholdHigh: group.thresholdHigh,
      thresholdLow: group.thresholdLow,
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

    d3.select(this).append('h2')
      .text(d.label);

    var chart = d3.select(this).append('div').attr('class', 'chart')
      .append('svg')
        .chart('threshold-chart', {threshold: {high: d.thresholdHigh, low: d.thresholdLow}})
        .asideWidth(0)
        .brushHeight(0)
        .color(colors[i % 4])
        .parseDate(d3.time.format('%m/%d/%y').parse)
        .margin({top: 10, right: 10, bottom: 10, left: 20})
        // .width(100)
        // .height(200)
        ;


    chart.line().interpolate('linear');
    chart.area().interpolate('linear');

    chart.tooltip.template(function(d) {
      return moment(d.time).format("MMM Do") + '<br><strong>' + d.value + '</strong>';
    });

    chart.unlayer('brush');
    chart.unlayer('lines-brush');
    chart.unlayer('areas-brush');

    chart.xAxis.ticks(4).rotation(45);

    chart.xAxisBrush.hide(1);

    chart.legend.hidden(true);



    chart.draw(d.values);
  });
});
