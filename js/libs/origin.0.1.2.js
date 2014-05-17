/*! origin - v0.1.2
 *  License: MIT Expat
 *  Date: 2014-05-14
 */
/* 
  Base labels class. This class is not meant to be used alone.

  On your subclass, create a _getTransformForData method which 
  returns a transform string for each datapoint.
*/

d3.chart('abstract-labels', {
  initialize: function(options) {
    var component = this,
        chart = options.parent;

    this.base.classed('labels', true);

    // Private vars and methods
    this._pos = 'outside';
    this._color = '#333';
    this._duration = chart.duration();
    this._format = function(d) {return d.value;};

    component.layer('labels', component.base, {

      dataBind : function(data) {
        return this.selectAll('.label').data(data);
      },

      insert: function() {
        return this.append('g')
          .attr('class', 'label')
          .attr('opacity', 0);
      },

      events: {
        'enter': function() {
          this.attr('transform', function(d, i) {
            return component._getTransformForData(d);
          });

          this.append('text')
            .classed('category', true)
            .attr('text-anchor', 'middle')
            .attr('fill', component._color)
            .text(function(d) {return component._format(chart.getOriginalData(d));});
        },

        'enter:transition': function() {
          this.duration(component._duration)
            .attr('opacity', 1);
        },

        'update:transition': function() {
          this.duration(component._duration)
              .attr('transform', function(d, i) {
                return component._getTransformForData(d);
              })
            .select('text')
              .text(function(d) {component._format(chart.getOriginalData(d));})
              .tween("text", function(d) {
                var oldNumericValue = parseInt(this.textContent.replace(/[^0-9\.]+/g, ''), 10),
                    d1 = chart.getOriginalData(d),
                    i = d3.interpolate(oldNumericValue, d1.value);

                return function(t) {
                  var tempItem = {name: d1.name, value: Math.round(i(t))};
                  this.textContent = component._format(tempItem);
                };
              })
              ;
        },

        'exit:transition': function() {
          var chart = this.chart();
          this.duration(component._duration / 2)
            .style('opacity', 0)
            .remove();
        }
      }

    });

  },

  // Public vars and methods
  /** 
  * chart.position(*pos*)
  *  
  * Sets the position of the labels. 'outside', 'top', or 'bottom'.
  */
  position: function(pos) {
    if (arguments.length === 0) {
      return this._pos;
    }

    this._pos = pos;

    return this;
  },

  /** 
  * chart.format(*function*)
  *  
  * Sets the function used to format the labels.
  */
  format: function(f) {
    if (arguments.length === 0) {
      return this._format;
    }

    this._format = f;

    return this;
  },

  /** 
  * chart.color(*color*)
  *  
  * Sets the color used for labels.
  */
  color: function(color) {
    if (arguments.length === 0) {
      return this._color;
    }

    this._color = color;

    return this;
  }

});
/* 
This component expects a chart in its constructor with
the following characteristics:
  - an x scale
  - a y scale
  - data points with 'name' and 'value' keys
*/

d3.chart('abstract-labels').extend('bar-labels', {
  initialize: function(options) {
    var component = this,
        chart = options.parent;

    // Private vars and methods
    this._getVerticalOffset = function(d) {
      var offset = "";
      switch(this._pos) {
        case 'outside':
          offset = this._yScale(d3.max([d.value,0])) - 5;
          break;
        case 'top':
          offset = this._yScale(d3.max([d.value,0])) + 20;
          break;
        case 'bottom':
          offset = this._yScale.range()[0] - 8;
          break;
        default:
          offset = this._yScale(d3.max([d.value,0])) - 5;
          break;
      }

      return offset;
    };

    this._getTransformForData = function(d) {
      return "translate("+ (this._xScale(d.name) + (this._xScale.rangeBand() / 2)) + "," + this._getVerticalOffset(d) +")";
    };

    this._xScale = chart._xScale;
    this._yScale = chart._yScale;
    this._duration = chart._duration;

  }

  // Public vars and methods
});
/* 
This component expects a chart in its constructor with
the following characteristics:
  - duration() getter
  - arc() getter
*/

d3.chart('abstract-labels').extend('pie-labels', {
  initialize: function(options) {
    var component = this,
        chart = options.parent;

    this._arc = chart.arc();
    this._rotateLabels = false;

    this._angle = function(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    };

    this._getTransformForData = function(d) {
      var c = this._arc.centroid(d);

      return "rotate(" + (component._rotateLabels ? this._angle(d) : 0) + "," + this._arc.centroid(d) + ")translate(" + c + ")";
    };

    component.base.attr('transform', chart.chartTranslate());
  },

  rotateLabels: function(_) {
    if (arguments.length === 0) {
      return this._rotateLabels;
    }

    this._rotateLabels = _;

    return this;
  }

});
d3.chart('legend', {

  initialize: function(options) {
    var component = this,
        chart = options.parent;

    component.base.classed('legend', true);

    /**
      Private properties and methods
    */
    this._name = 'legend';
    this._parent = chart;
    this._offset = 20;
    this._width = 100;
    this._hidden = false;

    this._updateParentAsideWidth = function() {
      var w = component._hidden
        ? 0
        : this._width;

      this._parent.asideWidth(w);
    };

    this._expanse = function() {
      return Math.round(d3.select('.legend-items')[0][0].getBBox().width);
    };

    this._redraw = function() {
      var offset = this._parent.width() - this.width() + 10;
      this.base.attr('transform', 'translate(' + offset + ',0)');
    };

    this._updateParentAsideWidth();
    this._redraw();

    /**
      Events
    */
    chart.on('change:chartWidth', this._redraw, this);

    /**
      Layers
    */
    this.layer('legend-panel', this.base.append('g').classed('legend-panel', true), {

      dataBind : function(data) {
        return this.selectAll('rect')
          .data([data]);
      },

      insert: function() {
        return this.append('rect')
          .style('fill', 'whitesmoke')
          .attr('opacity', 0)
          ;
      },

      events: {
        'merge:transition': function() {
          var oldHeight = d3.select(this[0][0]).attr('height'),
              newHeight = this[0][0].__data__.length * component._offset + 5, // has to be a better way to get length
              chartDuration = this.chart()._parent.duration(),
              selection = this.duration(chartDuration / 2);

              // Used to stagger duration if panel was shrinking. Don't think it looks better though.
              // selection = newHeight < oldHeight
              //   ? this.delay(chartDuration / 2).duration(chartDuration / 4)
              //   : this.duration(chartDuration / 2);

          selection
            .attr('width', this.chart()._width)
            .attr('height', newHeight)
            .attr('opacity', 0.7)
            ;
        }
      }
    });

    this.layer('legend-items', this.base.append('g').classed('legend-items', true).attr('transform', 'translate(5, 5)'), {

      dataBind : function(data) {
        return this.selectAll('.legend-item').data(data, this.chart()._parent._keyFunction);
        // return this.selectAll('.legend-item').data(data);
        // return this.chart()._parent._keyFunction
        //   ? this.selectAll('.legend-item').data(data, this.chart()._parent._keyFunction)
        //   : this.selectAll('.legend-item').data(data);
      },

      insert: function() {
        return this.append('g')
          .attr('class', 'legend-item')
          .attr('opacity', 0)
          ;
      },

      events: {
        'enter': function() {
          this.attr('transform', function(d, i) {
            return 'translate(0,' + (i * component._offset) + ')';
          });

          this.append('rect')
            .attr('width', 15)
            .attr('height', 15)
            .style('fill', chart._actualColor.bind(chart));
            // .style('fill', function(d, i) {
            //   // return chart._actualColor({name: d}, i);
            //   return chart._actualColor({name: d}, i);
            // });

          this.append('text')
            .attr('x', 20)
            .attr('y', 12)
            .text(function(d) {
              return chart._keyFunction
                ? chart._keyFunction(d)
                : d;
            });

          // Ideally this will update the parent chart before it gets rendered
          // this.chart().width(this.chart().expanse());
        },

        'update:transition': function() {
          this.attr('transform', function(d, i) {
            return 'translate(0,' + (i * component._offset) + ')';
          });
        },

        'enter:transition': function() {
          this.duration(this.chart()._parent.duration())
            .attr('opacity', 1);
        },

        'exit:transition': function() {
          this.duration(this.chart()._parent.duration())
            .attr('opacity', 0)
            .remove();
        }

      }

    });

  },

  /**
    Public methods
  */
  
  /**
   * chart.hidden(*boolean*)
   *
   * Determines whether the component is visible
   */
  hidden: function(bool) {
    if (arguments.length === 0) {
      // return this.base.attr('display') == 'none';
      return this._hidden;
    }

    this._hidden = bool;


    // if (this._hidden) {
    //   this.base.attr('display', 'none');
    // } else {
    //   this.base.attr('display', 'initial');
    // }
    var dis = (this._hidden) ? 'none' : 'initial';
    this.base.attr('display', dis);
    this._updateParentAsideWidth();

    this.trigger('change:hidden', bool, !bool);

    return this;
  },

  width: function(newWidth) {
    if (arguments.length === 0) {
      return this._width;
    }

    this._width = newWidth;
    this._parent.asideWidth(newWidth);
    this._redraw();

    return this;
  }

});

d3.chart('tooltip', {

  initialize: function(options) {
    var component = this;

    this._parent = options.parent;
    this._xScale = options.xScale;
    this._height = options.height;
    this._duration = options.duration;

    this._bisectDate  = d3.bisector(function(d) { return d[component._parent._timeKey]; }).left;
    this._template = function(d) { return 'Customize your template'; };

    this._hoveredData = function(e) {
      var x0 = component._xScale().invert(d3.mouse(e)[0]),
          i = component._bisectDate(component._parent._originalData, x0, 1),
          d0 = component._parent._originalData[i - 1],
          d1 = component._parent._originalData[i],
          d = x0 - d0[component._parent._timeKey] > d1[component._parent._timeKey] - x0 ? d1 : d0;

      return d;
    };

    this.layer('tooltip', component._parent.areas.tooltipOverlay, {
      dataBind: function(data) {
        return this.selectAll('g').data([data]);
      },

      insert: function() {
        return this.append('g');
      },

      events: {
        enter: function() {

          var component = this.chart();

          var line = this.append('line')
            .attr('class', 'tooltip-line')
            .attr('y1', component._height());

          var label = component._parent.areas.tooltipLabel;

          line.style("display", 'none');
          label.style('display', 'none').style('pointer-events', 'none');

          this.append('rect')
            .style('fill', 'transparent')
            .attr("class", 'hitbox')
            .attr("width", component._parent.chartWidth())
            .attr("height", component._height())

            .on("mouseover.base", function() {
              line.style("display", null);
              label.style('display', null);
            })

            .on("mouseout.base", function() {
              if (!d3.event.relatedTarget || !d3.select(d3.event.relatedTarget).classed('tooltip-label')) {
                line.style("display", "none");
                label.style("display", "none");
              } else {
                // debugger;
                component._mousemove.call(this);
              }
            })

            .on("mousemove.base", function() {
              var d = component._hoveredData(this);

              if (d !== component._lastHoveredData) {
                component._lastHoveredData = d;

                var values = Object.keys(d)
                      .filter(function(x) {return x !== component._parent._timeKey;})
                      .map(function(x) {return d[x];}),
                    maxValue = component._parent._yScale(Math.max.apply(null, values));

                line.attr("transform", "translate(" + component._xScale()(d[component._parent._timeKey]) + ",0)");

                var box = line.node().getBoundingClientRect(),
                    maxY = component._parent._yScale.range()[0]/2,
                    j = component._parent._originalData.indexOf(d);

                var originalDataLength = component._parent._originalData.length,
                    distance = j / originalDataLength;

                label
                  .style('left', box.left - ((distance > 0.70) ? (label.node().offsetWidth + 20): 0) + 'px')
                  .style('top', box.top + (component._height()/2) - (label.node().offsetHeight / 2) + window.scrollY + 'px')
                  .html(component._template(d));
              }
            });
        }
      }
    });
  },

  template: function(_) {
    if (arguments.length === 0) {return this._template;}

    this._template = _;

    return this;
  }


});
d3.chart('x-axis', {

  /*
    options.parent must be a chart object that has an xScale and height
  */
  initialize: function(options) {
    var component = this,
        chart = options.parent;

    this._name = 'xAxis';
    this._scale = options.scale;
    this._height = options.height;
    this._duration = options.duration;

    this._xAxis = d3.svg.axis()
      .scale(this._scale())
      .orient('bottom');
      
    this._rotation = 0;

    this.base.classed('x axis', true);

    this._updateContainerHeight = function() {
      component.base.attr('transform', 'translate(0, ' + component._height() +')');
    };
    this._updateContainerHeight();

    chart.on('change:height', this._updateContainerHeight);
    chart.on('change:focusHeight', this._updateContainerHeight);

    this.layer('axis', component.base, {

      dataBind : function(data) {
        return this.selectAll('g').data([data]);
      },

      insert : function() {
        return this.append('g').classed('x axis wrapper', true);
      },

      events: {

        'merge:transition': function() {

          var transformString = 'translate(0, 19)';
          if (component.rotation()) {
            transformString += 'rotate('+component.rotation()+')';
          }

          this.duration(component._duration()).call(component._xAxis)
            .selectAll('text')
            .attr('y', 0)
            .attr('dy', 0)
            .attr('transform', transformString)
            .style('text-anchor', component.rotation() ? 'start' : 'middle')
            ;

        }
      }

    });
  },

 /*
  * chart.rotation(*degrees*)
  *  
  * Sets the rotation of the labels.
  */
  rotation: function(degrees) {
    if (arguments.length === 0) {
      return this._rotation;
    }

    this._rotation = degrees;

    return this;
  },

  /*
   * chart.hide(*boolean*)
   *
   * Determines whether the component is visible
   */
  hide: function(bool) {
    if (arguments.length === 0) {
      return this.base.attr('display') == 'none';
    }

    if (bool) {
      this.base.attr('display', 'none');
    } else {
      this.base.attr('display', 'initial');
    }

    return this;
  },

  /*
   * chart.hideTicks(*bool*)
   * 
   * Determines whether tick marks are shown.
   */
  hideTicks: function(bool) {
    if (arguments.length === 0) {
      return this;
    }

    if (bool) {this._xAxis.tickSize(0);}
    //else {//this.xAxis.tickFormat(');}

    return this;
  },

  /*
   * chart.hideTicks(*bool*)
   * 
   * Determines whether tick marks are shown.
   */
  ticks: function(_) {
    if (arguments.length === 0) {
      return this._xAxis.ticks();
    }

    this._xAxis.ticks(_);

    return this;
  },

  /*
   * chart.axis()
   * 
   * Returns the axis objectj
   */
  axis: function() {
    return this._xAxis;
  }


});
d3.chart('base-chart', {

  safeDraw: function(data) {
    if (data === undefined || data === null || (typeof data === 'object' && data.length === 0) ) {
      var overlay = this.base.selectAll('.empty-overlay')
        .data([true]).enter().append('g').classed('empty-overlay', true);

      overlay.append('rect')
        .attr('width', this.outerWidth())
        .attr('height', this.outerHeight())
        .style('fill', 'white')
        .style('opacity', 0)
        .transition().duration(200)
        .style('opacity', 1)
        ;
        // .append('text').text('no data.');
      // debugger;
      overlay.append('text')
        .attr('transform', 'translate(' + this.outerWidth()/2 + ', ' + this.outerHeight() / 2 + ')')
        .style('text-anchor', 'middle')
        .text(this._nullText)
        .transition().duration(200)
        ;
      // console.log('hi');
      return false;
    } else {
      this.base.select('.empty-overlay').transition().duration(200).style('opacity', 0).remove();
    }

    var ret = this._superDraw.apply(this, arguments);
    this.trigger('draw');
    return ret;
  },

  initialize: function() {
    this._superDraw = this.draw;
    this.draw = this.safeDraw;

    /*
      Private properties and methods
    */
    this._parentElement = this.base.node().parentElement;

    this._margin = {top: 20, right: 20, bottom: 20, left: 20};
    this._innerWidth  = this._parentElement && this.base.attr('width') ? this.base.attr('width') - this._margin.left - this._margin.right :
      (this._parentElement && this._parentElement.offsetWidth ? this._parentElement.offsetWidth - this._margin.left - this._margin.right: 200);
    this._innerHeight = this._parentElement && this.base.attr('height') ? this.base.attr('height') - this._margin.top - this._margin.bottom :
      (this._parentElement && this._parentElement.offsetHeight ? this._parentElement.offsetHeight - this._margin.top - this._margin.bottom: 200);
    this._asideWidth = 0;
    this._duration = 500;
    this._nullText = 'No data.';

    // make sure container height and width are set.
    this.base.attr('width', this.outerWidth());
    this.base.attr('height', this.outerHeight());

    // Adjust the margins
    this.base.append('g').attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');
  },

  transform: function(data) {
    var chart = this;

    // Store a copy of the data
    chart._data = data;

    return data;
  },


  /*
    Public methods
  */
  getOriginalData: function(d) {return d;},
  
  outerWidth: function() { return this._innerWidth + this._margin.left + this._margin.right; },

  outerHeight: function() { return this._innerHeight + this._margin.top + this._margin.bottom; },

  width: function(newWidth) {
    if (arguments.length === 0) {
      return this._innerWidth;
    }

    // only if the width actually changed:
    if (this._innerWidth !== newWidth) {

      var oldWidth = this._innerWidth;

      this._innerWidth = newWidth;

      // set higher container width
      this.base.attr('width', this.outerWidth());

      // trigger a change event
      this.trigger('change:innerWidth', newWidth, oldWidth);
      this.trigger('change:chartWidth', this.chartWidth());
    }

    // always return the chart, for chaining magic.
    return this;
  },

  height: function(newHeight) {
    if (arguments.length === 0) {
      return this._innerHeight;
    }

    if (this._innerHeight !== oldHeight) {
      
      var oldHeight = this._innerHeight;

      this._innerHeight = newHeight;

      this.base.attr('height', this.outerHeight());

      this.trigger('change:height', newHeight, oldHeight);
    }

    return this;
  },

  margin: function(newMargin) {
    if (arguments.length === 0) {
      return this._margin;
    }

    var oldMargin = this._margin;
    this._margin = (typeof newMargin === 'object')
      ? newMargin
      : {top: newMargin, right: newMargin, bottom: newMargin, left: newMargin};

    // Update the inner dimensions
    this._innerHeight = this._innerHeight + oldMargin.top + oldMargin.bottom - this._margin.top - this._margin.bottom;
    this._innerWidth = this._innerWidth + oldMargin.left + oldMargin.right - this._margin.left - this._margin.right;

    // Update the base
    this.base.select('g').attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');
    this.base.attr('width', this.outerWidth());
    this.base.attr('height', this.outerHeight());


    this.trigger('change:margin', this._margin, oldMargin);
    this.trigger('change:height', this.height());
    this.trigger('change:innerWidth', this._innerWidth);
    this.trigger('change:innerHeight', this._innerHeight);
    this.trigger('change:chartWidth', this.chartWidth());
    this.trigger('change:chartHeight', this.height());

    return this;
  },

  chartWidth: function() {
    return this.width() - this._asideWidth;
  },

  chartHeight: function() {
    // debugger;
    return this.height();
  },

  asideWidth: function(newAsideWidth) {
    if (arguments.length === 0) {
      return this._asideWidth;
    }

    var oldAsideWidth = this._asideWidth;
    this._asideWidth = newAsideWidth;

    this.trigger('change:asideWidth', newAsideWidth, oldAsideWidth);
    this.trigger('change:chartWidth', this.chartWidth());

    if (this._data) {
      this.redraw();
    }

    return this;
  },

  duration: function() {
    return this._duration;
  },

  color: function() {
    return this._color;
  },

  /*
    chart.colors(*colors*)
  
    Sets the range of colors used to paint the bars. *colors* can either be a
    single color (which will apply to all bars) or an array.
  */
  colors: function(newColors) {
    if (arguments.length === 0) {
      return this._color.range();
    }

    newColors = (typeof newColors === 'string') ? [newColors] : newColors;
    this._color.range(newColors);

    return this;
  },

  /*
    chart.nullText(*string*)
  
    Sets the text that is displayed if the chart is rendered with no data
    (null or empty array).
  */
  nullText: function(_) {
    if (arguments.length === 0) {
      return this._nullText;
    }

    this._nullText = _;

    return this;
  },

  redraw: function() {
    this.draw(this._data);
  },

  newContainer: function(containerClass, isHTML) {
    return isHTML
      ? d3.select(this._parentElement).append('div').classed(containerClass, true)
      : this.base.select('g').append('g').classed(containerClass, true);
  }

});
d3.chart('base-chart').extend('standard-base-chart', {

  initialize : function() {

    /**
      Private properties and methods
    */
    this._duration = 500;
    this._color = d3.scale.category20();
    this._actualColor = function(d, i) {
      var colors = this._color.range();
      
      return (colors.length ===  1)
        ? d3.rgb(colors[0]).brighter(i/5).toString()
        : this._color(d.name);
    };

  },

  keyFunction: function(_) {
    if (arguments.length === 0) {
      return this._keyFunction;
    }

    this._keyFunction = _;

    return this;
  },

  duration: function(_) {
    if (arguments.length === 0) {
      return this._duration;
    }

    this._duration = _;

    return this;
  },

  color: function(_) {
    return this.colors(_);
  },

  /**
    chart.colors(*colors*)
  
    Sets the range of colors used to paint the chart. *colors* can either be a
    single color (which will apply to all objects) or an array.
  */
  colors: function(newColors) {
    if (arguments.length === 0) {
      return this._color.range();
    }

    newColors = (typeof newColors === 'string') ? [newColors] : newColors;
    this._color.range(newColors);

    return this;
  }


});
d3.chart('standard-base-chart').extend('bar-chart', {

  initialize : function() {
    var chart = this;

    /*
      Private properties and methods
    */
    this._xScale = d3.scale.ordinal();
    this._yScale = d3.scale.linear().range([this.height(), 0]);

    this._updateXScaleRange = function() {
      this._xScale.rangeRoundBands([0, this.chartWidth()], 0.1);
    };

    this._updateXScaleRange();

    /*
      Events
    */
    this.on('change:chartWidth', this._updateXScaleRange);
    this.on('change:height', function(newHeight) {
      this._yScale.range([newHeight, 0]);
    });

    /*
      Layers
    */
    chart.layer('bars', chart.base.select('g').append('g').classed('bars', true), {
      dataBind: function(data) {
        var chart = this.chart();

        // Update the x-scale.
        chart._xScale.domain(data.map(function(d) { return d.name; }));

        // Update the y-scale.
        chart._yScale.domain([
          d3.min(data, function(d) { return d3.min([d.value, 0]); }),
          d3.max(data, function(d) { return d.value; })
        ]);

        return this.selectAll('.bar')
          .data(data);
      },

      insert: function() {
        var chart = this.chart();

        // Append the bars
        return this.append('rect')
          .attr('class', 'bar')
          .attr('height', 0);
      },

      events: {
        'enter': function() {
          var chart = this.chart();

          this.attr('x', function(d) { return chart._xScale(d.name); })
            .attr('y', chart.height())
            .attr('fill', function(d, i) {
              var colors = chart._color.range();
              return (colors.length === 1)
                ? d3.rgb(colors[0]).brighter(i/5).toString()
                : chart._color(d.name);
            })
            .attr('width', chart._xScale.rangeBand())
            .attr('height', 0);
        },

        'merge:transition': function() {
          var chart = this.chart();

          this.duration(chart._duration)
            .attr('x', function(d) { return chart._xScale(d.name); })
            .attr('y', function(d) { return chart._yScale(d3.max([0, d.value])); })
            .attr('width', chart._xScale.rangeBand())
            .attr('height', function(d) { return Math.abs(chart._yScale(d.value) - chart._yScale(0)); });
        },

        'exit:transition': function() {
          this.duration(chart._duration / 2)
            .style('opacity', 0)
            .remove();
        }
      }
    });

    /*
      Components
    */
    chart.xAxis = this.base.select('g').append('g').chart('x-axis', {
      parent: this,
      scale: chart.xScale.bind(chart),
      height: chart.chartHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    this.attach('xAxis', chart.xAxis);

    chart.labels = this.base.select('g').append('g').chart('bar-labels', {parent: this});
    this.attach('labels', chart.labels);

    chart.legend = this.base.select('g').append('g').chart('legend', {parent: this});
    this.attach('legend', chart.legend);

  },

  demux: function(name, data) {
    if (name === 'legend') {
      return data.map(function(d) {return d.name;});
    } else {
      return data;
    }
  },

  /*
    Public methods
  */

  xScale: function() {
    return this._xScale;
  },

  yScale: function() {
    return this._yScale;
  }

});
d3.chart('standard-base-chart').extend('core-line-chart', {

  transform: function(data) {
    var chart = this;

    chart._originalData = data;

    if (data === null) {return data;}
    if (this._name === 'legend' || this._name === 'xAxis') {return data;}

    var currentKeys = d3.keys(data[0]).filter(function(key) { return key !== chart._timeKey && key !== 'meta'; }),
        domainKeys = chart._color.domain();

    currentKeys.forEach(function(k) {
      if (domainKeys.indexOf(k) === -1) {
        domainKeys.push(k);
      }
    });

    chart._color.domain(domainKeys);

    data.forEach(function(d) {
      if (!d[chart._timeKey].getMonth) {
        d[chart._timeKey] = chart._parseDate(d[chart._timeKey]);
      }
    });

    var allSeries = currentKeys.map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          var obj = {};
          obj[chart._timeKey] = d[chart._timeKey];
          obj.count = +d[name];
          return obj;
        })
      };
    });

    // Update the x-scale.
    chart._xScale.domain(d3.extent(data, function(d) { return d[chart._timeKey]; }));
    chart._xScaleBrush.domain(chart._xScale.domain());
      

    // Update the y-scale.
    var all_values = Array();
    data.forEach(function(obj) {
      var objmap = d3.map(obj);
      objmap.forEach(function(k, v) {
        if (k != chart._timeKey) {
          all_values.push(+v);
        }
      });
    });
    chart._yScale.domain(d3.extent(all_values));
    chart._yScaleBrush.domain(chart._yScale.domain());

    return allSeries;
  },

  initialize: function(options) {
    var chart = this;

    /*
      Private properties and methods
    */
    this.margins = {top: 40, right: 40, bottom: 40, left: 40};
    this._xScale = d3.time.scale();
    this._yScale = d3.scale.linear();
    this._timeKey = 'time';
    this._brushHeight = 30;
    this._focusHeight = function() {
      return chart.chartHeight() - 40 - chart._brushHeight; // 40 to compensate for axis. need to fix this.
    };
    this.X = function(d) {
      return chart._xScale(d[chart._timeKey]);
    };
    this.Y = function(d) {
      return chart._yScale(d.count);
    };

    this._line = d3.svg.line().x(chart.X).y(chart.Y)
      .interpolate("basis");
    this._area = d3.svg.area().x(chart.X).y(chart.Y).y0(chart._focusHeight())
      .interpolate("basis");
    this._keyFunction = function(d) {return d.name;};

    chart._parseDate = d3.time.format("%Y-%m-%d %X").parse;

    chart.areas = {};
    chart.areas.lines = chart.newContainer('areas');
    chart.areas.areas = chart.newContainer('areas');
    chart.areas.brushContainer = chart.newContainer('brush-container');
    chart.areas.linesBrush = chart.areas.brushContainer.append('g').attr('class', 'lines-brush');
    chart.areas.areasBrush = chart.areas.brushContainer.append('g').attr('class', 'areas-brush');
    chart.areas.brush = chart.areas.brushContainer.append('g').attr('class', 'x brush');
    chart.areas.tooltipOverlay = chart.newContainer('tooltip-overlay');
    chart.areas.tooltipLabel = chart.newContainer('tooltip-label', true).style('display', 'none');

    // Brush
    this._marginBrush = {right: chart.margin.right, bottom: 30, left: chart.margin.left}; // .top is set dynamically
    this._xScaleBrush = d3.time.scale();
    this._yScaleBrush = d3.scale.linear();
    this.xBrush = function(d) {
      return chart._xScaleBrush(d[chart._timeKey]);
    };
    this.yBrush = function(d) {
      return chart._yScaleBrush(d.count);
    };
    this._lineBrush = d3.svg.line().interpolate("linear").x(chart.xBrush).y(chart.yBrush)
      .interpolate("basis");
    this._areaBrush = d3.svg.area().x(chart.xBrush).y(chart.yBrush).y0(chart._brushHeight)
      .interpolate("basis");

    this._brushed = function() {
      chart._xScale.domain(chart._brush.empty() ? chart._xScaleBrush.domain() : chart._brush.extent());
      var d = chart.duration();
      chart.duration(0);

      chart.layer('lines').draw(chart._data);
      chart.layer('areas').draw(chart._data);
      chart.xAxis.draw(chart._data);

      chart.duration(d);
    };
    this._brush = d3.svg.brush().x(this._xScaleBrush).on('brush', this._brushed);


    /*
      Initialize, events
    */
    this._updateXScaleRange = function() {
      this._xScale.range([0, chart.chartWidth()]);
      this._xScaleBrush.range([0, chart.chartWidth()]);
    };

    this._updateYScaleRange = function() {
      this._yScale.range([chart._focusHeight(), 0]);
      this._yScaleBrush.range([chart._brushHeight, 0]);
    };

    this._updateBrushContainer = function() {
      chart.areas.brushContainer.attr('transform', 'translate(0,'+(chart._focusHeight() + 40)+')');
    };
 
    this._updateXScaleRange();
    this._updateYScaleRange();
    this._updateBrushContainer();

    this.on('change:chartWidth', function() {
      this._updateXScaleRange();
      chart.areas.tooltipOverlay.select('.hitbox')
        .attr("width", this.chartWidth());
    });

    this.on('change:chartHeight', function() {
      this._updateYScaleRange();
      this._area.y0(this._focusHeight());
      this._areaBrush.y0(this.brushHeight());
      chart.areas.tooltipOverlay.select('.hitbox')
        .attr("height", this._focusHeight());
    });

    this.on('change:focusHeight', function() {
      this._updateXScaleRange();
      this._updateYScaleRange();
      this._updateBrushContainer();
      this._area.y0(chart._focusHeight());
      this._areaBrush.y0(chart.brushHeight());
    });

    /*
      Layers
    */

    chart.layer('lines', chart.areas.lines, {
      dataBind: function(data) {
        return this.selectAll('.line').data(data, function(d) {return d.name;});
      },

      insert: function() {
        return this.append('path')
          .attr('class', function(d) { return 'line ' + d.name; })
          .attr('clip-path', 'url(#clip)')
          .style('opacity', 0);
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          // this.style('stroke', chart._actualColor.bind(chart));

          this.on('mouseover', function(d, i) {
            d3.select(this).classed('active', true);
            chart.areas.lines.classed('selected', true);
          }).on('mouseleave', function(d, i) {
            d3.select(this).classed('active', false);
            chart.areas.lines.classed('selected', false);
          });
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart._duration)
            .attr('d', function(d) {return chart._line(d.values);})
            .style('opacity', 1)
            .style('stroke', chart._actualColor.bind(chart));
        },

        'exit:transition': function() {
          this.duration(chart._duration)
            .style('opacity', 0)
            .remove();
        }
      }
    });

    chart.layer('areas', chart.areas.areas, {
      dataBind: function(data) {
        return this.selectAll('.area').data(data, function(d) {return d.name;});
      },

      insert: function() {
        return this.append('path')
          .attr('class', function(d) { return 'area ' + d.name; })
          .attr('clip-path', 'url(#clip)')
          .style('opacity', 0);
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          this
            // .style('opacity', '0.2')
            // .style('fill', function(d) { return chart._color(d.name); })
            .style('fill', chart._actualColor.bind(chart))
            .style('stroke-width', '0')
            .on('mouseover', function(d, i) {
              d3.select(this).classed('active', true);
              chart.areas.lines.classed('selected', true);
            }).on('mouseleave', function(d, i) {
              d3.select(this).classed('active', false);
              chart.areas.lines.classed('selected', false);
            });
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart._duration)
              .attr('d', function(d) { return chart._area(d.values); })
              // .style('fill', function(d, i) { return chart._color(d.name); });
              .style('opacity', '0.2')
              .style('fill', chart._actualColor.bind(chart));
        },

        'exit:transition': function() {
          this.duration(chart._duration)
            .style('opacity', 0)
            .remove();
        }

      }
    });

    // Brush
    chart.layer('brush', chart.areas.brush, {
      dataBind: function(data) {
        return this.selectAll('.line').data(data, function(d) {return d.name;});
      },

      insert: function() {
        chart.base.select('g').append("defs")
          .append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", chart.chartWidth())
            .attr("height", chart._focusHeight());

        chart.areas.brush
            .call(chart._brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", chart._brushHeight + 7);


        return this;
      }
    });

    chart.layer('lines-brush', chart.areas.linesBrush, {
      dataBind: function(data) {
        return this.selectAll('.line').data(data, function(d) {return d.name;});
      },

      insert: function() {
        return this.append('path')
          .attr('class', function(d) { return 'line ' + d.name; })
          .style('opacity', 0);
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          // this.style('stroke', chart._actualColor.bind(chart));

          this.on('mouseover', function(d, i) {
            d3.select(this).classed('active', true);
            chart.areas.lines.classed('selected', true);
          }).on('mouseleave', function(d, i) {
            d3.select(this).classed('active', false);
            chart.areas.lines.classed('selected', false);
          });
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart._duration)
            .attr('d', function(d) {return chart._lineBrush(d.values);})
            .style('opacity', 1)
            .style('stroke', chart._actualColor.bind(chart));
        },

        'exit:transition': function() {
          this.duration(chart._duration)
            .style('opacity', 0)
            .remove();
        }
      }
    });

    chart.layer('areas-brush', chart.areas.areasBrush, {
      dataBind: function(data) {
        return this.selectAll('.area').data(data, function(d) {return d.name;});
      },

      insert: function() {
        return this.append('path')
          .attr('class', function(d) { return 'area ' + d.name; })
          .style('opacity', 0);
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          this
            .style('fill', chart._actualColor.bind(chart))
            .style('stroke-width', '0')
            .on('mouseover', function(d, i) {
              d3.select(this).classed('active', true);
              chart.areas.lines.classed('selected', true);
            }).on('mouseleave', function(d, i) {
              d3.select(this).classed('active', false);
              chart.areas.lines.classed('selected', false);
            });
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart._duration)
              .attr('d', function(d) { return chart._areaBrush(d.values); })
              // .style('fill', function(d, i) { return chart._color(d.name); });
              .style('opacity', '0.2')
              .style('fill', chart._actualColor.bind(chart));
        },

        'exit:transition': function() {
          this.duration(chart._duration)
            .style('opacity', 0)
            .remove();
        }

      }
    });


    chart.legend = this.base.select('g').append('g').chart('legend', {parent: this});
    this.attach('legend', chart.legend);

    var customTickFormat = d3.time.format.multi([
      [".%L", function(d) {return d.getMilliseconds(); }],
      [":%S", function(d) { return d.getSeconds(); }],
      ["%-I:%M", function(d) { return d.getMinutes(); }],
      ["%-I %p", function(d) { return d.getHours(); }],
      ["%a %-d", function(d) { return d.getDay() && d.getDate() != 1; }],
      ["%b %-d", function(d) { return d.getDate() != 1; }],
      ["%B", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }
    ]]);

    chart.xAxis = this.base.select('g').insert('g', '.lines').chart('x-axis', {
      parent: chart,
      scale: chart.xScale.bind(chart),
      height: chart._focusHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    chart.xAxis.axis().tickFormat(customTickFormat);
    this.attach('axis', chart.xAxis);

    chart.xAxisBrush = chart.areas.brushContainer
        .append('g')
        .chart('x-axis', {
      parent: chart,
      scale: chart.xScaleBrush.bind(chart),
      height: chart.brushHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    chart.xAxisBrush.axis().tickFormat(customTickFormat).ticks(10);
    this.attach('axis-brush', chart.xAxisBrush);

    chart.tooltip = this.base.select('g').append('g').chart('tooltip', {
      parent: this,
      xScale: chart.xScale.bind(chart),
      height: chart._focusHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    this.attach('tooltip', chart.tooltip);

  },

  demux: function(name, data) {
    var chart = this;
    // debugger;

    // if (name === 'legend') {
    //   debugger;
    //   return data[0]
    //     ? data.map(function(d) {return d.name;})
    //     // ? Object.keys(data[0]).filter(function(c) { return c !== chart._timeKey; })
    //     : [];

    // } else {
      return data;
    // }
  },

  /*
    Public methods
  */
  xScale: function() {
    return this._xScale;
  },

  xScaleBrush: function() {
    return this._xScaleBrush;
  },

  yScale: function() {
    return this._yScale;
  },

  yScaleBrush: function() {
    return this._yScaleBrush;
  },

  timeKey: function(_) {
    if (arguments.length === 0) {return this._timeKey;}

    this._timeKey = _;

    return this;
  },

  parseDate: function(_) {
    if (arguments.length === 0) {return this._parseDate;}

    this._parseDate = _;

    return this;
  },

  line: function(_) {
    if (arguments.length === 0) {return this._line;}

    this._line = _;

    return this;
  },

  lineBrush: function(_) {
    if (arguments.length === 0) {return this._lineBrush;}

    this._lineBrush = _;

    return this;
  },

  area: function(_) {
    if (arguments.length === 0) {return this._area;}

    this._area = _;

    return this;
  },

  areaBrush: function(_) {
    if (arguments.length === 0) {return this._areaBrush;}

    this._areaBrush = _;

    return this;
  },

  brushHeight: function(_) {
    if (arguments.length === 0) {return this._brushHeight;}

    this._brushHeight = _;
    this.trigger('change:brushHeight', _);
    this.trigger('change:focusHeight', this._focusHeight());

    return this;
  }

});
d3.chart('new-core-line-chart', {

  transform: function(data) {
    var chart = this;

    chart.base.classed('core-line-chart', true);

    chart._originalData = data;

    if (data === null) {return data;}
    if (this._name === 'legend' || this._name === 'xAxis') {return data;}

    var currentKeys = d3.keys(data[0]).filter(function(key) { return key !== chart._timeKey && key !== 'meta'; }),
        domainKeys = chart._color.domain();

    currentKeys.forEach(function(k) {
      if (domainKeys.indexOf(k) === -1) {
        domainKeys.push(k);
      }
    });

    if (!this._colorOverridden) {
      chart._color.domain(domainKeys);
    }

    var allSeries = currentKeys.map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          var obj = {};
          obj[chart._timeKey] = d[chart._timeKey];
          obj.count = +d[name];
          return obj;
        })
      };
    });

    // Update the x-scale.
    if (!this._xScaleOverridden) {
      chart.xScale().domain(d3.extent(data, function(d) { return d[chart._timeKey]; }));
    }

    // Update the y-scale.
    if (!this._yScaleOverridden) {
      var allValues = Array();
      data.forEach(function(obj) {
        var objmap = d3.map(obj);
        objmap.forEach(function(k, v) {
          if (k != chart._timeKey) {
            allValues.push(+v);
          }
        });
      });
      chart._yScale.domain(d3.extent(allValues));
    }

    return allSeries;
  },

  initialize: function(options) {
    var chart = this;

    this._parent = options.parent;

    this._xScale = d3.time.scale().range([0, 100]);
    this._yScale = d3.scale.linear().range([100, 0]);
    this._color = d3.scale.category20();
    this._timeKey = 'date';
    this._duration = 500;

    this.X = function(d) {
      return chart.xScale()(d[chart._timeKey]);
    };
    this.Y = function(d) {
      return chart.yScale()(d.count);
    };

    this._line = d3.svg.line().x(chart.X).y(chart.Y)
      .interpolate("basis");

    chart.linesArea = chart.base.append('g');
    chart.layer('lines', chart.linesArea, {
      dataBind: function(data) {
        return this.selectAll('.line').data(data, function(d) {return d.name;});
      },

      insert: function() {
        return this.append('path')
          .attr('class', function(d) { return 'line ' + d.name; })
          .attr('clip-path', 'url(#clip)')
          .style('opacity', 0);
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          // this.style('stroke', chart._actualColor.bind(chart));

          this.on('mouseover', function(d, i) {
            d3.select(this).classed('active', true);
            chart.linesArea.classed('selected', true);
          }).on('mouseleave', function(d, i) {
            d3.select(this).classed('active', false);
            chart.linesArea.classed('selected', false);
          });
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart.duration())
            .attr('d', function(d) {return chart._line(d.values);})
            .style('opacity', 1)
            .style('stroke', chart.color().bind(chart))
            ;
        },

        'exit:transition': function() {
          this.duration(chart.parent.duration())
            .style('opacity', 0)
            .remove();
        }
      }
    });

    // chart.layer('areas', chart.areas.areas, {
    //   dataBind: function(data) {
    //     return this.selectAll('.area').data(data, function(d) {return d.name;});
    //   },

    //   insert: function() {
    //     return this.append('path')
    //       .attr('class', function(d) { return 'area ' + d.name; })
    //       .attr('clip-path', 'url(#clip)')
    //       .style('opacity', 0);
    //   },

    //   events: {

    //     "enter": function() {
    //       var chart = this.chart();

    //       this
    //         // .style('opacity', '0.2')
    //         // .style('fill', function(d) { return chart._color(d.name); })
    //         .style('fill', chart._actualColor.bind(chart))
    //         .style('stroke-width', '0')
    //         .on('mouseover', function(d, i) {
    //           d3.select(this).classed('active', true);
    //           chart.areas.lines.classed('selected', true);
    //         }).on('mouseleave', function(d, i) {
    //           d3.select(this).classed('active', false);
    //           chart.areas.lines.classed('selected', false);
    //         });
    //     },

    //     "merge:transition": function() {
    //       var chart = this.chart();

    //       this.duration(chart._duration)
    //           .attr('d', function(d) { return chart._area(d.values); })
    //           // .style('fill', function(d, i) { return chart._color(d.name); });
    //           .style('opacity', '0.2')
    //           .style('fill', chart._actualColor.bind(chart));
    //     },

    //     'exit:transition': function() {
    //       this.duration(chart._duration)
    //         .style('opacity', 0)
    //         .remove();
    //     }

    //   }
    // });
  },

  xScale: function(_) {
    if (arguments.length === 0) {return this._xScale;}
  
    this._xScale = _;
    this._xScaleOverridden = 1;
  
    return this;
  },

  yScale: function(_) {
    if (arguments.length === 0) {return this._yScale;}
  
    this._yScale = _;
    this._yScaleOverridden = 1;
  
    return this;
  },

  color: function(_) {
    if (arguments.length === 0) {return this._color;}
  
    this._color = _;
    this._colorOverridden = 1;
  
    return this;
  },

  timekey: function(_) {
    if (arguments.length === 0) {return this._timekey;}
  
    this._timekey = _;
  
    return this;
  },

  line: function(_) {
    if (arguments.length === 0) {return this._line;}

    this._line = _;

    return this;
  },

  duration: function(_) {
    if (arguments.length === 0) {
      return (typeof this._duration === 'function')
        ? this._duration()
        : this._duration;
    }

    this._duration = _;

    return this;
  }
  

  // area: function(_) {
  //   if (arguments.length === 0) {return this._area;}

  //   this._area = _;

  //   return this;
  // }

});
d3.chart('standard-base-chart').extend('fill-chart', {

  initialize: function() {
    var chart = this;

    /*
      Private properties and methods
    */
    this._thickness = 5;
    this._chartTranslate = function() {
      return "translate(" + this.chartWidth() / 2 + "," + this.chartHeight() / 2 + ")";
    };
    this._updateLayerTranslations = function() {
      this._circleBase.attr("transform", this._chartTranslate());
    };
    this._updateRadius = function() {
      var smallestDimension = this.chartWidth() < this.chartHeight() ? this.chartWidth() : this.chartHeight();
      this._radius = (smallestDimension - this._thickness) / 2;
    };

    this._updateValues = function(k) {
      var t0, t1 = k * 2 * Math.PI;

      // Solve for theta numerically.
      if (k > 0 && k < 1) {
        t1 = Math.pow(12 * k * Math.PI, 1 / 3);
        for (var i = 0; i < 10; ++i) {
          t0 = t1;
          t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
        }
        k = (1 - Math.cos(t1 / 2)) / 2;
      }

      chart._fillHeight = 2 * chart._radius * k;
      chart._y = chart._radius - chart._fillHeight;
      chart._a = (Math.PI - t1) / 2;
    };

    this._updateAll = function() {
      chart._updateLayerTranslations();
      chart._updateRadius();
      chart._updateValues();
    };


    /*
      Init, events
    */
    chart._circleBase = chart.base.select('g')
      .append('g').classed('circle', true);

    this._updateAll();

    this.on('change:chartWidth', this._updateAll);
    this.on('change:chartHeight', this._updateAll);


    /*
      Layers
    */

    chart.layer('circle', chart._circleBase, {
      dataBind: function(data) {
        chart._updateValues(data);

        return this.selectAll('.circle-wrapper').data([data]);
      },

      insert: function() {
        var circle = this.append('g').attr('class', 'circle-wrapper');

        circle.append('circle')
          .attr('class', 'filler')
          .attr('r', chart._radius)
          // .attr("clip-path", function(d, i) { return "url(#clipPath"+i+")"; })
          .attr("clip-path", function(d, i) {
            return "url(#clipPath" + (d3.clipPaths ? d3.clipPaths.length : 0) + ')';
          })
          .style('fill', chart._actualColor.bind(chart))
          ;


        circle.append('circle')
          .attr('class', 'ring')
          .attr('r', chart._radius)
          .style('fill', 'none')
          .style('stroke-width', chart._thickness + 'px')
          .style('stroke', function(d, i) {
            return d3.rgb(chart._actualColor(d, i))
              .darker(2);
          })
          ;

        circle.append('clipPath')
            // .attr('id', function(d, i) { return 'clipPath'+i; })
            .attr('id', function() {
              var currentNum = d3.clipPaths ? d3.clipPaths.length : 0;
              d3.clipPaths = d3.clipPaths || [];
              d3.clipPaths.push(1);
              return 'clipPath' + currentNum;
            })
            .attr('class', 'clip-path')
          .append('rect')
            .attr('x', -chart._radius)
            .attr('y', chart._y)
            .attr('width', chart._radius * 2)
            .attr('height', chart._fillHeight);

        return this;
      },

      events: {

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart._duration)
            .select('.clip-path rect')
            .attr('y', chart._y)
            .attr('height', chart._fillHeight);

          this.duration(chart._duration)
            .select('.filler')
            .style('fill', chart._actualColor.bind(chart));

          this.duration(chart._duration)
            .select('.ring')
            .style('stroke', function(d, i) {
              return d3.rgb(chart._actualColor(d, i))
                .darker(2);
            });

        }

      }
    });

  },

  /*
    Public methods
  */
  thickness: function(_) {
    if (arguments.length === 0) {return this._thickness;}

    this._thickness = _;

    return this;
  }

});
d3.chart('base-chart').extend('grouped-bar-chart', {
  initialize : function() {
    var chart = this;

    chart.margin = {top: 40, right: 20, bottom: 40, left: 60};
    chart.xScale = d3.scale.ordinal().rangeRoundBands([0, chart.width()], 0.1);
    chart.x1Scale = d3.scale.ordinal();
    chart.yScale = d3.scale.linear().range([chart.height(), 0]);
    chart.color = d3.scale.category10();
    chart.duration = 500;

    chart.on("change:width", function(newWidth) {
      chart.xScale.rangeRoundBands([0, newWidth], 0.1);
    });
    chart.on("change:height", function(newHeight) {
      chart.yScale.range([newHeight, 0]);
    });

    var barsLayerBase = this.base.append('g')
      .classed('bars', true);

    this.layer('bars', barsLayerBase, {
      dataBind: function(data) {
        var chart = this.chart();

        // Prepare the data
        var _data = data;
        var values = d3.keys(_data[0]).filter(function(key) { return key !== "category"; });
        _data.forEach(function(d) {
          d.values = values.map(function(name) { return {name: name, value: +d[name]}; });
        });

        // Update the scales
        chart.xScale.domain(_data.map(function(d) { return d.category; }));
        chart.x1Scale.domain(values).rangeRoundBands([0, chart.xScale.rangeBand()]);
        chart.yScale.domain([0, d3.max(_data, function(d) { return d3.max(d.values, function(d) { return d.value; }); })]);

        // Bind the data
        return this.selectAll('.category')
          .data(_data);
      },

      insert: function() {
        var chart = this.chart();

        // Append the bars
        return this.append('g')
          .attr('class', 'category');
      },

      events: {

        "enter": function() {
          var chart = this.chart();

          this.attr("transform", function(d, i) {return "translate(" + chart.xScale(d.category) + ",0)"; })
            .selectAll(".bar")
            .data(function(d) {return d.values;})
            .enter()
          .append("rect")
            .attr('class', 'bar')
            .attr("width", chart.x1Scale.rangeBand())
            .style("fill", function(d) { return chart.color(d.name); })
            .attr("x", function(d) { return chart.x1Scale(d.name); })
            .attr("y", chart.height())
            .attr("height", 0)
            ;
        },

        "merge:transition": function() {
          var chart = this.chart();

          this.duration(chart.duration)
            .attr("transform", function(d, i) {return "translate(" + chart.xScale(d.category) + ",0)"; })
            .selectAll(".bar")
            .attr("width", chart.x1Scale.rangeBand())
            .attr("x", function(d) { return chart.x1Scale(d.name); })
            .attr("y", function(d, i) { return chart.yScale(d.value); })
            .attr("height", function(d, i) { return chart.height() - chart.yScale(d.value); });
        }
      }

    });

  }


});
d3.chart('core-line-chart').extend('line-chart', {

  initialize: function() {
    var chart = this;

    chart.legend = this.base.select('g').append('g').chart('legend', {parent: this});
    this.attach('legend', chart.legend);

    var customTickFormat = d3.time.format.multi([
      [".%L", function(d) {return d.getMilliseconds(); }],
      [":%S", function(d) { return d.getSeconds(); }],
      ["%-I:%M", function(d) { return d.getMinutes(); }],
      ["%-I %p", function(d) { return d.getHours(); }],
      ["%a %-d", function(d) { return d.getDay() && d.getDate() != 1; }],
      ["%b %-d", function(d) { return d.getDate() != 1; }],
      ["%B", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }
    ]]);

    chart.xAxis = this.base.select('g').insert('g', '.lines').chart('x-axis', {
      parent: chart,
      scale: chart.xScale.bind(chart),
      height: chart._focusHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    chart.xAxis.axis().tickFormat(customTickFormat);
    this.attach('axis', chart.xAxis);

    chart.xAxisBrush = chart.areas.brushContainer
        .append('g')
        .chart('x-axis', {
      parent: chart,
      scale: chart.xScaleBrush.bind(chart),
      height: chart.brushHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    chart.xAxisBrush.axis().tickFormat(customTickFormat).ticks(10);
    this.attach('axis-brush', chart.xAxisBrush);

    chart.tooltip = this.base.select('g').append('g').chart('tooltip', {
      parent: this,
      xScale: chart.xScale.bind(chart),
      height: chart._focusHeight.bind(chart),
      duration: chart.duration.bind(chart)
    });
    this.attach('tooltip', chart.tooltip);

  }

});
d3.chart('standard-base-chart').extend('pie-chart', {

  transform: function(data) {
    this._updateValues();
    this._currentData = this._data;
    this._data = this._pie(data.sort(function(a, b) {return b.value - a.value;}));

    return this._data;
  },

  initialize : function() {
    var chart = this;

    /**
      Private properties and methods
    */
    this._pie  = d3.layout.pie()
        .value(function(d) { return d.value; })
        .sort(null);

    this._arc = d3.svg.arc();
    this._innerRadius = 3 / 5;

    this._updateRadius = function() {
      var smallestDimension = this.chartWidth() < this.chartHeight() ? this.chartWidth() : this.chartHeight();
      this._radius = smallestDimension / 2;
      this._arc
        .outerRadius(this._radius)
        .innerRadius(this._radius * this._innerRadius);
    };

    this._updateLayerTranslations = function() {
      this._slicesLayerBase.attr("transform", this.chartTranslate());
    };

    this._arcTween = function(a) {
      var i = (a.value === 0)
        ? d3.interpolate(this._current, chart._neighborAngle(a, true))
        : d3.interpolate(this._current, a);

      this._current = i(0);
      return function(t) {
        return chart._arc(i(t));
      };
    };

    this._updateValues = function() {
      this._updateRadius();
      this._updateLayerTranslations();
    };

    this._neighborAngle = function(d, end) {
      var neighbor = (end)
        ? this._data.filter(function(cur) {return cur.value < d.data.value;})[0]
        : this._currentData.filter(function(cur) {return cur.value < d.value;})[0];

      return neighbor
        ? {startAngle: neighbor.startAngle, endAngle: neighbor.startAngle}
        : {startAngle: Math.PI*2, endAngle: Math.PI*2};

    };

    /*
      Events
    */
    this.on('change:width', this._updateValues);
    this.on('change:height', this._updateValues);

    /*
      Layers
    */
    this._slicesLayerBase = this.base.select('g')
        .append('g')
        .classed('slices', true)
        .attr("transform", this.chartTranslate());

    this.layer('slices', this._slicesLayerBase, {

      dataBind: function(data) {
        var chart = this.chart();

        return this.selectAll('.slice')
          .data(data, chart._keyFunction);
      },

      insert: function() {
        var chart = this.chart(),
            isInitial = chart._slicesLayerBase.selectAll('path')[0].length === 0;

        return this.append('path')
          .attr('class', 'slice')
          .each(function(d) {
              this._current = isInitial
                ? {startAngle: 0, endAngle: 0}
                : chart._neighborAngle(d);
          });
      },

      events: {
        'enter': function() {
          var chart = this.chart();

          this.style('fill', chart._actualColor.bind(chart));
        },

        'merge:transition': function() {
          var chart = this.chart();

          this.duration(chart._duration)
            .attrTween('d', chart._arcTween);
        },

        'exit:transition': function() {
          var chart = this.chart();

          this.each(function(d) {d.value = 0;})
            .duration(chart._duration)
            .attrTween('d', chart._arcTween)
            .remove();
 
        }
      }

    });

    /*
      Components
    */
    // this.xAxis = this.mixin('xAxis', this.base.select('g').append('g'), this);
    // this.labels = this.attach('pie-labels', this.base.select('g').append('g'), this);

    chart.legend = this.base.select('g').append('g').chart('legend', {parent: this});
    this.attach('legend', chart.legend);

  },

  /*
    Public methods
  */
  getOriginalData: function(d) {
    return d.data;
  },
  
  duration: function() {
    return this._duration;
  },
  
  arc: function() {
    return this._arc;
  },

  innerRadius: function(_) {
    if (arguments.length === 0) {
      return this._innerRadius;
    }

    this._innerRadius = _;

    return this;
  },

  chartTranslate: function() {
    return "translate(" + this.chartWidth() / 2 + "," + this.chartHeight() / 2 + ")";
  }

});