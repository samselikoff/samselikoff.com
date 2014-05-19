d3.chart('core-line-chart').extend('threshold-chart', {

  initialize: function(options) {

    var chart = this;

    this.thresholds = options.threshold;

    chart.tooltip.layer('tooltip').on('enter', function() {
      // Add circle to hovered point
      var component = this.chart(),
          dot = this.append('circle')
            .style('display', 'none')
            .style('pointer-events', 'none')
            .attr('r', 4);

      this.select('.hitbox')
        .on('mouseover', function() {
          dot.style('display', null);
        })

        .on('mouseout', function() {
          if (!d3.event.relatedTarget || !d3.select(d3.event.relatedTarget).classed('tooltip-label')) {
            dot.style('display', 'none');
          }
        })

        .on('mousemove', function() {
          var d = component._hoveredData(this);

          dot
            .attr('cx', component._parent._xScale(d.time))
            .attr('cy', component._parent._yScale(d.value));

          // Adjust tooltip position
          var label = chart.areas.tooltipLabel,
              box = chart.areas.tooltipOverlay.node().getBoundingClientRect()
              ;

          // label.style('top', box.top + (component._height()/2) - (component._parent._yScale(d.value)) + window.scrollY + 'px');
          label.style('top', box.top + (component._parent._yScale(d.value)) + window.scrollY + 'px');
        });

    });


    // Add the threshold
    var scale = chart.yScale();
    chart.layer('lines').on('enter:transition', function() {
      var domain = scale.domain();

      if (domain[0] > chart.thresholds.low) {
        scale.domain([chart.thresholds.low, domain[1]]);
      }
      if (domain[1] < chart.thresholds.high) {
        scale.domain([domain[0], chart.thresholds.high]);
      }

      g = this.chart().base.select('g')
        .append('g').style('opacity', 0);

      var y = (chart.thresholds.high == undefined)
        ? scale(chart.thresholds.low)
        : scale(chart.thresholds.high);

      g.append('rect')
        .attr('class', 'threshold')
        .attr('x', 0)
        .attr('y', y)
        .attr('width', chart.xScale().range()[1])
        .attr('height', function(d) {
          var val = scale(chart.thresholds.low) - scale(chart.thresholds.high);
          return isNaN(val) ? 1 : val;
        })
        // .style('stroke', '#777')
        // .style('fill', 'rgb(40, 174, 197)')
        // .style('opacity', '0.3')
        // .style('stroke-dasharray', '9')
        // .style('stroke-width', '2px')
        ;

      if (chart.thresholds.high == undefined || chart.thresholds.low == undefined) {

        var direction = ((chart.thresholds.high == undefined) ? '-' : '+' ),
            translate = direction == '+' ? 15 : 10;

        g.append('text')
          .text('-->')
          .style('font-size', '10px')
          .attr('transform', 'translate(-' + translate + ',' + y + ')rotate(' + direction + '90)')
          ;

      }

      g.transition().duration(500).style('opacity', 1);
    });

  }

});
