---
layout: post
title:  "Yep"
published: false
---


<div id="app"></div>

<script src="/js/libs/google-spreadsheet.js"></script>

<script src="/bower_components/d3/d3.min.js"></script>

<script src="/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/bower_components/handlebars/handlebars.min.js"></script>
<script src="/bower_components/ember/ember.js"></script>

{% raw %}

<script type="text/x-handlebars" data-template-name="developers">
  <p>Hello, world!</p>
  {{scatter-plot data=chartData}}
</script>

<script type="text/x-handlebars" data-template-name="components/scatter-plot">
  <div class="legend"></div>
  <div class="chart-container">
    <div class="y_axis"></div>
    <div class="chart"></div>
    <div class="x_axis"></div>
  </div> 

</script>


<script>
  window.App = Ember.Application.create({
    rootElement: '#app'
  });

  // var key = '0AufLunP9Lyz1dEJOaFE5ai1HTl9BMzNHZ2Z0QlFkUHc';
  // var sample_url = "https://spreadsheets.google.com/pub?key="+key+"&hl=en&output=html";
  // var url_parameter = document.location.search.split(/\?url=/)[1]
  // var url = url_parameter || sample_url;
  // var googleSpreadsheet = new GoogleSpreadsheet();
  // googleSpreadsheet.url(url);
  // googleSpreadsheet.load(function(result) {
  //   debugger;
  //   // $('#results').html(JSON.stringify(result).replace(/,/g,",\n"));
  // }); 

  App.Router.map(function() {
    this.resource('developers', {path: '/'});
  });

  App.DevelopersRoute = Em.Route.extend({
    model: function() {
      return jQuery.get('/data/front-end-developer-survey.csv').then(function(text) {
        var columns = ['timestamp', 'interests', 'title', 'experience', 'salary', 'employer', 'skills'];
        var data = d3.csv.parseRows(text).map(function(a) {
          var obj = {};
          columns.forEach(function(c, i) {
            obj[c] = a[i]
          });
          return obj;
        });
        data.shift();

        return data;
      });
    }
  });

  App.DevelopersController = Em.ArrayController.extend({
    chartData: function() {
      return [
        {
          name: 'first',
          // data: [ { x: 10, y: 40 }, { x: 11, y: 49 }, { x: 13, y: 49 }],
          data: [
            { y: "$50,000 - $80,000", x: "2-5 years" },
            { y: "$50,000 - $80,000", x: "1-2 years" },
            { y: "$30,000 - $50,000", x: "1-2 years" },
          ],
          // data: this
          //   .map(function(d) {return {salary: d.salary, title: d.title};})
          //   .filter(function(d) {return d.salary != undefined && d.title != undefined;}),
          color: 'steelblue'
        }
      ];
    }.property()
  });

  App.ScatterPlotComponent = Em.Component.extend({
  });
  


</script>
{% endraw %}
