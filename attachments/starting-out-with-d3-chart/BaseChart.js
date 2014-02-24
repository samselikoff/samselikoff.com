d3.chart('BaseChart', {
  initialize: function() {

    // setup some reasonable defaults
    this._margin = {top: 20, right: 20, bottom: 20, left: 20};
    this._width  = this.base.attr('width') ? this.base.attr('width') - this._margin.left - this._margin.right : 200;
    this._height = this.base.attr('height') ? this.base.attr('height') - this._margin.top - this._margin.bottom : 200;

    // make sure container height and width are set.
    this.updateContainerWidth();
    this.updateContainerHeight();

    // Adjust the margins
    this.base.append('g').attr('transform', 'translate(' + this._margin.left + ',' + this._margin.top + ')');
  },

  updateContainerWidth: function() { this.base.attr('width', this._width + this._margin.left + this._margin.right); },

  updateContainerHeight: function() { this.base.attr('height', this._height + this._margin.top + this._margin.bottom); },

  width: function(newWidth) {
    if (arguments.length === 0) {
      return this._width;
    }

    // only if the width actually changed:
    if (this._width !== newWidth) {

      var oldWidth = this._width;

      this._width = newWidth;

      // set higher container width
      this.updateContainerWidth();

      // trigger a change event
      this.trigger('change:width', newWidth, oldWidth);
    }

    // always return the chart, for chaining magic.
    return this;
  },

  height: function(newHeight) {
    if (arguments.length === 0) {
      return this._height;
    }

    var oldHeight = this._height;

    this._height = newHeight;

    if (this._height !== oldHeight) {

      this.updateContainerHeight();

      this.trigger('change:height', newHeight, oldHeight);
    }

    return this;
  },

  margin: function(newMargin) {
    if (arguments.length === 0) {
      return this._margin;
    }

    this._margin = newMargin;

    return this;
  }
});
