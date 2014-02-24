d3.chart('AnimatedBarChart').extend('ProfitLossBarChart', {
  initialize: function() {
    var chart = this;

    chart.layer('bars').on('enter', function() {
      this.style('fill', function(d) { return d.value < 0 ? 'red' : 'blue'; });
    });
  }
});
