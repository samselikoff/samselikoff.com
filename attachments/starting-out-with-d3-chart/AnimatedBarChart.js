d3.chart('BaseChart').extend('AnimatedBarChart', {
  initialize : function() {
    var chart = this;

    chart.xScale = d3.scale.ordinal().rangeRoundBands([0, chart.width()], 0.1);
    chart.yScale = d3.scale.linear().range([chart.height(), 0]);
    chart.color = d3.scale.category10();
    chart.duration = 500;

    chart.on('change:width', function(newWidth) {
      chart.xScale.rangeRoundBands([0, newWidth], 0.1);
    });
    chart.on('change:height', function(newHeight) {
      chart.yScale.range([newHeight, 0]);
    });

    // Layers
    chart.layer('bars', chart.base.select('g').append('g').classed('bars', true), {

      dataBind: function(data) {
        return this.selectAll('.bar')
          .data(data);
      },

      insert: function() {
        return this.append('rect')
          .attr('class', 'bar');
      },

      events: {
        'enter': function() {
          var chart = this.chart();

          this.attr('x', function(d) { return chart.xScale(d.name); })
            .attr('y', function(d) { return chart.yScale(0); })
            .attr('fill', function(d) {return chart.color(d.name);})
            .attr('width', chart.xScale.rangeBand())
            .attr('height', 0);
        },

        'enter:transition': function() {
          var chart = this.chart();

          this.duration(chart.duration)
            .attr('y', function(d) { return chart.yScale(d3.max([0, d.value])); })
            .attr('height', function(d) { return Math.abs(chart.yScale(d.value) - chart.yScale(0)); });
        }
      }
    });

  },

  transform: function(data) {
    var chart = this;

    // Update the x-scale.
    chart.xScale.domain(data.map(function(d) { return d.name; }));

    // Update the y-scale.
    chart.yScale.domain([
      d3.min(data, function(d) { return d3.min([d.value, 0]); }),
      d3.max(data, function(d) { return Math.abs(d.value); })
    ]);

    return data;
  }

});