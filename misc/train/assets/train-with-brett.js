define('train-with-brett/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].ActiveModelAdapter;

});
define('train-with-brett/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'train-with-brett/config/environment', 'train-with-brett/ext/flatten-array'], function (exports, Ember, Resolver, loadInitializers, config, flatten) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('train-with-brett/ember-pretenderify/config', ['exports', 'pretender', 'train-with-brett/pretender/config', 'ember-pretenderify/store', 'ember-pretenderify/controllers/front', 'train-with-brett/config/environment'], function (exports, Pretender, userConfig, store, frontController, ENV) {

  'use strict';

  var defaults = function () {
    var _this = this;

    this.data = this.data || {};
    this.timing = 400;

    this.store = store['default'];
    this.store.loadData(this.data || {});

    this.frontController = frontController['default'];

    this.prepareBody = function (body) {
      return body ? JSON.stringify(body) : "{\"error\": \"not found\"}";
    };

    this.unhandledRequest = function (verb, path) {
      console.error("Your Ember app tried to " + verb + " '" + path + "', but there was no Pretender route defined to handle this request.");
    };

    this.stub = (function (verb, path, handler, code) {
      var store = this.store;
      var _this = this;
      var timing = ENV['default'].environment === "test" ? 0 : this.timing;
      var namespace = this.namespace || "";
      path = path[0] === "/" ? path.slice(1) : path;

      this[verb].call(this, namespace + "/" + path, function (request) {
        console.log("Successful request: " + verb.toUpperCase() + " " + request.url);

        return _this.frontController.handle(verb, handler, store, request, code);
      }, timing);
    }).bind(this);
  };

  exports['default'] = {
    defaults: defaults,
    userConfig: userConfig['default']
  };

});
define('train-with-brett/ember-pretenderify/testing', ['exports', 'pretender', 'train-with-brett/ember-pretenderify/config'], function (exports, Pretender, pretenderConfig) {

  'use strict';

  exports['default'] = {
    setup: function (application) {
      application.pretender = new Pretender['default'](function () {
        pretenderConfig['default'].defaults.call(this);
        pretenderConfig['default'].userConfig.call(this);
      });

      window.serverData = application.pretender.data;
    }
  };

});
define('train-with-brett/ext/flatten-array', function () {

  'use strict';

  // ember-runtime/lib/computed/reduce_computed_macros.js
  // Credit to Nopik via https://github.com/emberjs/ember.js/pull/3503


  /*
  var item1 = Ember.Object.create({
    tags: [ 'important', 'bug', 'task' ],
  });

  var item2 = Ember.Object.create({
    tags: [ 'urgent', 'feature', 'task' ],
  });

  App.ItemList = Ember.ArrayProxy.extend({
    allTags: Ember.computed.flattenArray( 'content', 'tags' )
  });

  var myList = App.ItemList.create({ content: [ item1, item2 ] });
  myList.get( 'allTags' );
  // -> ["important", "bug", "task", "urgent", "feature", "task"]
  */

  /**
    A computed property which takes an array of arrays, flatten single
    level of them and returns the result.

    Optionally, it can take a list of objects, get a property from
    each object (which is expected to be an array) and return one
    array being a concatenation of those partial ones.

    Example

    ```javascript
    var item1 = Ember.Object.create({
      tags: [ 'important', 'bug', 'task' ],
    });

    var item2 = Ember.Object.create({
      tags: [ 'urgent', 'feature', 'task' ],
    });

    App.ItemList = Ember.ArrayProxy.extend({
      allTags: Ember.computed.flattenArray( 'content', 'tags' )
    });

    var myList = App.ItemList.create({ content: [ item1, item2 ] });
    myList.get( 'allTags' );
    // -> ["important", "bug", "task", "urgent", "feature", "task"]
    ```

    To use without a key:

    ```javascript
    App.ItemList = Ember.ArrayProxy.extend({
      tagMap: Ember.computed.mapBy( 'content', 'tags' );
      allTags: Ember.computed.flattenArray( 'tagMap' )
    });

    var myList = App.ItemList.create({ content: [ item1, item2 ] });
    myList.get( 'allTags' );
    // -> ["important", "bug", "task", "urgent", "feature", "task"]
    ```

    @method computed.flattenArray
    @for Ember
    @param {String} sourceArrayProperty
    @param {String} (optional) if given, values from sourceArray are
    treated as objects, and property named by the `key` will be extracted
    from them. If `key` is not given, the values from sourceArray are
    expected to be the arrays to be flattened.
    @return {Ember.ComputedProperty} computes a new flattened array from
    the input
  */

  Ember.computed.flattenArray = function (nestedArray, key) {
    return Ember.arrayComputed(nestedArray, {
      initialize: function (array, changeMeta, instanceMeta) {
        instanceMeta.lengths = [];
        instanceMeta.listeners = [];
        return array;
      },
      addedItem: function (array, item, changeMeta, instanceMeta) {
        var args, flat, i, len, listener, localIndex;

        if (item != null) {
          if (key != null) {
            flat = item.get(key);
          } else {
            flat = item;
          }
        } else {
          flat = null;
        }
        if (flat != null) {
          listener = Ember.Object.create({
            flat: flat,
            arrayWillChange: function () {},
            arrayDidChange: function (source_list, start, remove_count, add_count) {
              var args, i, idx, lidx, rem_amt, source_slice, len;
              idx = 0;
              lidx = 0;
              for (i = 0, len = instanceMeta.listeners.length; i < len; i++) {
                if (instanceMeta.listeners[i] === this) {
                  break;
                }
                lidx += 1;
                idx += instanceMeta.lengths[i];
              }

              source_slice = [];
              if (add_count < 0) {
                source_slice = source_list.slice(0);
              } else {
                if (add_count > 0) {
                  source_slice = source_list.slice(start, start + add_count);
                }
              }

              rem_amt = 0;
              if (remove_count < 0) {
                rem_amt = instanceMeta.lengths[lidx];
              } else {
                rem_amt = remove_count;
              }
              instanceMeta.lengths[lidx] += source_slice.length - rem_amt;
              args = [idx + start, rem_amt].concat(source_slice);

              array.arrayContentWillChange(idx + start, rem_amt, source_slice.length);
              array.splice.apply(array, args);
              array.arrayContentDidChange(idx + start, rem_amt, source_slice.length);
            }
          });
          flat.addArrayObserver(listener);
        }
        localIndex = 0;
        for (i = 0; i < changeMeta.index; i++) {
          localIndex += instanceMeta.lengths[i];
        }
        if (flat != null) {
          len = flat.get("length");
        } else {
          len = 0;
        }
        instanceMeta.lengths.splice(changeMeta.index, 0, len);
        instanceMeta.listeners.splice(changeMeta.index, 0, listener);
        args = [localIndex, 0];
        if (flat != null) {
          args = args.concat(flat);
        }

        array.arrayContentWillChange(localIndex, 0, len);
        array.splice.apply(array, args);
        array.arrayContentDidChange(localIndex, 0, len);

        return array;
      },
      removedItem: function (array, item, changeMeta, instanceMeta) {
        var i, listener, localIndex, old_len, flat;
        localIndex = 0;
        for (i = 0; i < changeMeta.index; i++) {
          localIndex += instanceMeta.lengths[i];
        }
        old_len = instanceMeta.lengths[changeMeta.index];
        instanceMeta.lengths.splice(changeMeta.index, 1);
        listener = instanceMeta.listeners[changeMeta.index];
        if (listener != null) {
          if ((flat = listener.get("flat")) != null) {
            flat.removeArrayObserver(listener);
          }
        }
        instanceMeta.listeners.splice(changeMeta.index, 1);

        array.arrayContentWillChange(localIndex, old_len, 0);
        array.splice(localIndex, old_len);
        array.arrayContentDidChange(localIndex, old_len, 0);

        return array;
      }
    });
  };

});
define('train-with-brett/initializers/ember-pretenderify', ['exports', 'train-with-brett/config/environment', 'train-with-brett/ember-pretenderify/config', 'ember-pretenderify/load-data'], function (exports, ENV, pretenderConfig, loadData) {

  'use strict';

  exports['default'] = {
    name: "ember-pretenderify",
    initialize: function (container, application) {
      var config = ENV['default']["ember-pretenderify"];

      if (config.setupPretender || config.force) {
        var server = new Pretender(function () {
          pretenderConfig['default'].defaults.call(this);
          loadData['default'](ENV['default'].modulePrefix, this.store);
          pretenderConfig['default'].userConfig.call(this);
        });
      }
    }
  };

});
define('train-with-brett/initializers/export-application-global', ['exports', 'ember', 'train-with-brett/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('train-with-brett/models/card', ['exports', 'ember-data', 'train-with-brett/ext/flatten-array'], function (exports, DS, flatten) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    circuits: DS['default'].hasMany("circuit"),

    name: DS['default'].attr("string"),

    circuitsSorting: ["position"],
    orderedCircuits: Ember.computed.sort("circuits", "circuitsSorting")


  });

});
define('train-with-brett/models/circuit', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    cards: DS['default'].belongsTo("card"),
    exercises: DS['default'].hasMany("exercise"),
    position: DS['default'].attr("number"),
    sets: DS['default'].attr("number"),

    exerciseSummary: (function () {
      return this.get("exercises").mapBy("name").join(", ");
    }).property("exercises.@each.name")

  });

});
define('train-with-brett/models/day', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    routine: DS['default'].belongsTo("routine"),
    card: DS['default'].belongsTo("card"),

    position: DS['default'].attr("number")

  });

});
define('train-with-brett/models/entry', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    exercise: DS['default'].belongsTo("exercise"),

    weight: DS['default'].attr("number"),
    reps: DS['default'].attr("string")

  });

});
define('train-with-brett/models/exercise', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    circuit: DS['default'].belongsTo("circuit"),
    entries: DS['default'].hasMany("entry"),

    name: DS['default'].attr("string"),
    image: DS['default'].attr("string"),

    backgroundImageStyle: (function () {
      var image = this.get("image");
      if (!image) {
        image = "http://thumb101.shutterstock.com/display_pic_with_logo/635953/112549847/stock-photo-dumbbell-weights-symbol-112549847.jpg";
      }
      return "background-image: url(" + image + ")";
    }).property("image") });

});
define('train-with-brett/models/routine', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({

    days: DS['default'].hasMany("day"),

    daysSorting: ["position"],
    orderedDays: Ember.computed.sort("days", "daysSorting")

  });

});
define('train-with-brett/pods/application/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    routine: Ember['default'].computed.alias("model")
  });

});
define('train-with-brett/pods/application/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("routine", 1);
    } });

});
define('train-with-brett/pods/application/template', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('train-with-brett/pods/components/card-summary/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["Card-summary"] });

});
define('train-with-brett/pods/components/card-summary/template', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <p><strong>Circuit ");
    stack1 = helpers._triageMustache.call(depth0, "circuit.position", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(":</strong> ");
    stack1 = helpers._triageMustache.call(depth0, "circuit.exerciseSummary", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n  ");
    return buffer;
    }

    data.buffer.push("<div class='panel-heading'>");
    stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</div>\n\n<div class=\"panel-body\">\n  ");
    stack1 = helpers.each.call(depth0, "circuit", "in", "card.orderedCircuits", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('train-with-brett/pods/components/exercise-card/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["Exercise-card", "panel", "panel-default"],

    latestEntry: (function () {
      debugger;
    }).property()
  });

});
define('train-with-brett/pods/components/exercise-card/template', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression;


    data.buffer.push("<div class=\"Exercise-card__image panel-body\"\n  ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'style': ("exercise.backgroundImageStyle")
    },hashTypes:{'style': "STRING"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n\n</div>\n<div class=\"panel-footer\">\n  <p>");
    stack1 = helpers._triageMustache.call(depth0, "exercise.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n  <p><small>");
    stack1 = helpers._triageMustache.call(depth0, "exercise.entries.firstObject.weight", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" lbs, ");
    stack1 = helpers._triageMustache.call(depth0, "exercise.entries.firstObject.reps", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" reps</small></p>\n</div>\n");
    return buffer;
    
  });

});
define('train-with-brett/pods/day/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return this.store.find("day", 1);
    },

    actions: {
      viewDay: function (day) {
        this.transitionTo("day", day);
      }
    }
  });

});
define('train-with-brett/pods/day/template', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <h2>Circuit ");
    stack1 = helpers._triageMustache.call(depth0, "circuit.position", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</h2>\n    <p>");
    stack1 = helpers._triageMustache.call(depth0, "circuit.sets", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("X</p>\n\n    <div class=\"row\">\n      ");
    stack1 = helpers.each.call(depth0, "exercise", "in", "circuit.exercises", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n  ");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', helper, options;
    data.buffer.push("\n        <div class=\"col-xs-6\">\n          ");
    data.buffer.push(escapeExpression((helper = helpers['exercise-card'] || (depth0 && depth0['exercise-card']),options={hash:{
      'exercise': ("exercise")
    },hashTypes:{'exercise': "ID"},hashContexts:{'exercise': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "exercise-card", options))));
    data.buffer.push("\n        </div>\n      ");
    return buffer;
    }

    data.buffer.push("<header class='header'>\n  ");
    data.buffer.push(escapeExpression((helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "Back", "index", options) : helperMissing.call(depth0, "link-to", "Back", "index", options))));
    data.buffer.push("\n  <p class='pull-right'>Sam Selikoff</p>\n</header>\n\n<div class=\"container-fluid\">\n\n  <div class=\"text-center\">\n    <p class='Day-overview__day-title'>Day ");
    stack1 = helpers._triageMustache.call(depth0, "position", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n    <p class='Day-overview__card-title'>");
    stack1 = helpers._triageMustache.call(depth0, "card.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n  </div>\n\n  ");
    stack1 = helpers.each.call(depth0, "circuit", "in", "card.circuits", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('train-with-brett/pods/index/controller', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    needs: ["application"],
    routine: Ember['default'].computed.alias("controllers.application.model")
  });

});
define('train-with-brett/pods/index/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({

    actions: {
      viewDay: function (day) {
        this.transitionTo("day", day);
      }
    }
  });

});
define('train-with-brett/pods/index/template', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n    <div class=\"Day-summary\">\n      <p class='Day-summary__title'>Day ");
    stack1 = helpers._triageMustache.call(depth0, "day.position", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n      ");
    stack1 = helpers['if'].call(depth0, "day.card", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n  ");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', helper, options;
    data.buffer.push("\n        <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewDay", "day", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
    data.buffer.push(">\n          ");
    data.buffer.push(escapeExpression((helper = helpers['card-summary'] || (depth0 && depth0['card-summary']),options={hash:{
      'card': ("day.card")
    },hashTypes:{'card': "ID"},hashContexts:{'card': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "card-summary", options))));
    data.buffer.push("\n        </div>\n      ");
    return buffer;
    }

  function program4(depth0,data) {
    
    
    data.buffer.push("\n        <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n            <p class='text-muted'>Rest</p>\n          </div>\n        </div>\n      ");
    }

    data.buffer.push("<header class='header'>\n  <p class='text-right'>Sam Selikoff</p>\n</header>\n\n<div class=\"container-fluid\">\n  <h1>Current routine</h1>\n\n  ");
    stack1 = helpers.each.call(depth0, "day", "in", "routine.orderedDays", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n  ");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('train-with-brett/pretender/config', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {
    this.stub("get", "/routines/:id", ["routines", "days", "cards", "circuits", "exercises", "entries"]);
  };

});
define('train-with-brett/pretender/data/cards', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    name: "Strength - Squats",
    circuit_ids: [1, 2]
  }, {
    id: 2,
    name: "Strength - Pullups",
    circuit_ids: [3, 4]
  }];

});
define('train-with-brett/pretender/data/circuits', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    card_id: 1,
    exercise_ids: [1, 2, 3, 4],
    position: 1,
    sets: 4
  }, {
    id: 2,
    card_id: 1,
    exercise_ids: [5, 6, 7, 8],
    position: 2,
    sets: 4
  }, {
    id: 3,
    card_id: 2,
    exercise_ids: [9, 10, 11, 12],
    position: 1,
    sets: 4
  }, {
    id: 4,
    card_id: 2,
    exercise_ids: [13, 14, 15, 16],
    position: 2,
    sets: 4
  }];

});
define('train-with-brett/pretender/data/days', ['exports'], function (exports) {

	'use strict';

	exports['default'] = [{ id: 1, routine_id: 1, position: 1, card_id: 1 }, { id: 2, routine_id: 1, position: 2, card_id: 2 }, { id: 3, routine_id: 1, position: 3 }];

});
define('train-with-brett/pretender/data/entries', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    exercise_id: 1,
    weight: 175,
    reps: "6-8"
  }, {
    id: 2,
    exercise_id: 2,
    weight: 30,
    reps: "15-20"
  }, {
    id: 3,
    exercise_id: 3,
    weight: null,
    reps: "15-20"
  }, {
    id: 4,
    exercise_id: 4,
    weight: 10,
    reps: "15 each"
  }, {
    id: 5,
    exercise_id: 5,
    weight: 65,
    reps: "6-8"
  }, {
    id: 6,
    exercise_id: 6,
    weight: 20,
    reps: "15 each"
  }, {
    id: 7,
    exercise_id: 7,
    weight: null,
    reps: "15-20"
  }, {
    id: 8,
    exercise_id: 8,
    weight: null,
    reps: "15"
  }, {
    id: 9,
    exercise_id: 9,
    weight: null,
    reps: "6-8"
  }, {
    id: 10,
    exercise_id: 10,
    weight: null,
    reps: "10 each"
  }, {
    id: 11,
    exercise_id: 11,
    weight: null,
    reps: "12 each"
  }, {
    id: 12,
    exercise_id: 12,
    weight: null,
    reps: "10 each"
  }, {
    id: 13,
    exercise_id: 13,
    weight: null,
    reps: "6-8"
  }, {
    id: 14,
    exercise_id: 14,
    weight: null,
    reps: "15"
  }, {
    id: 15,
    exercise_id: 15,
    resistence: "8-5 incline",
    reps: ""
  }, {
    id: 16,
    exercise_id: 16,
    weight: 10,
    reps: "15-20"
  }];

});
define('train-with-brett/pretender/data/exercises', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    name: "Squats",
    entry_ids: [1] }, {
    id: 2,
    name: "DB Alternating Rows",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/db_alternating_rows.gif",
    entry_ids: [2] }, {
    id: 3,
    name: "Hold pullups knee raise",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/hold_pullups_knee_raise.gif",
    entry_ids: [3] }, {
    id: 4,
    name: "BB oblique rotation",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/bb_oblique_rotation.gif",
    entry_ids: [4] }, {
    id: 5,
    name: "Front squats",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/front_squats.gif",
    entry_ids: [5] }, {
    id: 6,
    name: "DB Alternating Press",
    entry_ids: [6] }, {
    id: 7,
    name: "Release pushups",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/release_pushups.gif",
    entry_ids: [7] }, {
    id: 8,
    name: "Ball jacknifes",
    image: "https://dl.dropboxusercontent.com/u/8604053/train-with-brett/ball_jacknifes.gif",
    entry_ids: [8] }, {
    id: 9,
    name: "Pullups",
    entry_ids: [9] }, {
    id: 10,
    name: "Kettle bell swing to press",
    entry_ids: [10] }, {
    id: 11,
    name: "Y Raise/Lateral raise",
    entry_ids: [11] }, {
    id: 12,
    name: "Cross v-up",
    entry_ids: [12] }, {
    id: 13,
    name: "Pullups negatives",
    entry_ids: [13] }, {
    id: 14,
    name: "Tricep pushups",
    entry_ids: [14] }, {
    id: 15,
    name: "Incline sprint",
    entry_ids: [15] }, {
    id: 16,
    name: "Russian twist",
    entry_ids: [16] }];

});
define('train-with-brett/pretender/data/routines', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    day_ids: [1, 2, 3]
  }];

});
define('train-with-brett/router', ['exports', 'ember', 'train-with-brett/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("day", { path: "/days/:id" });
  });

  exports['default'] = Router;

});
define('train-with-brett/serializers/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].ActiveModelSerializer;

});
define('train-with-brett/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(false, 'app.js should pass jshint.\napp.js: line 5, col 8, \'flatten\' is defined but never used.\n\n1 error'); 
  });

});
define('train-with-brett/tests/ext/flatten-array.jshint', function () {

  'use strict';

  module('JSHint - ext');
  test('ext/flatten-array.js should pass jshint', function() { 
    ok(false, 'ext/flatten-array.js should pass jshint.\next/flatten-array.js: line 75, col 1, \'Ember\' is not defined.\next/flatten-array.js: line 76, col 10, \'Ember\' is not defined.\next/flatten-array.js: line 95, col 20, \'Ember\' is not defined.\n\n3 errors'); 
  });

});
define('train-with-brett/tests/helpers/resolver', ['exports', 'ember/resolver', 'train-with-brett/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('train-with-brett/tests/helpers/start-app', ['exports', 'ember', 'train-with-brett/app', 'train-with-brett/router', 'train-with-brett/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';

  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
  exports['default'] = startApp;

});
define('train-with-brett/tests/models/card.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/card.js should pass jshint', function() { 
    ok(false, 'models/card.js should pass jshint.\nmodels/card.js: line 11, col 20, \'Ember\' is not defined.\nmodels/card.js: line 2, col 8, \'flatten\' is defined but never used.\n\n2 errors'); 
  });

});
define('train-with-brett/tests/models/circuit.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/circuit.js should pass jshint', function() { 
    ok(true, 'models/circuit.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/models/day.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/day.js should pass jshint', function() { 
    ok(true, 'models/day.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/models/entry.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/entry.js should pass jshint', function() { 
    ok(true, 'models/entry.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/models/exercise.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/exercise.js should pass jshint', function() { 
    ok(false, 'models/exercise.js should pass jshint.\nmodels/exercise.js: line 14, col 138, Missing semicolon.\n\n1 error'); 
  });

});
define('train-with-brett/tests/models/routine.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/routine.js should pass jshint', function() { 
    ok(false, 'models/routine.js should pass jshint.\nmodels/routine.js: line 8, col 16, \'Ember\' is not defined.\n\n1 error'); 
  });

});
define('train-with-brett/tests/pods/application/controller.jshint', function () {

  'use strict';

  module('JSHint - pods/application');
  test('pods/application/controller.js should pass jshint', function() { 
    ok(true, 'pods/application/controller.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pods/application/route.jshint', function () {

  'use strict';

  module('JSHint - pods/application');
  test('pods/application/route.js should pass jshint', function() { 
    ok(true, 'pods/application/route.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pods/components/card-summary/component.jshint', function () {

  'use strict';

  module('JSHint - pods/components/card-summary');
  test('pods/components/card-summary/component.js should pass jshint', function() { 
    ok(true, 'pods/components/card-summary/component.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pods/components/exercise-card/component.jshint', function () {

  'use strict';

  module('JSHint - pods/components/exercise-card');
  test('pods/components/exercise-card/component.js should pass jshint', function() { 
    ok(false, 'pods/components/exercise-card/component.js should pass jshint.\npods/components/exercise-card/component.js: line 7, col 5, Forgotten \'debugger\' statement?\n\n1 error'); 
  });

});
define('train-with-brett/tests/pods/day/route.jshint', function () {

  'use strict';

  module('JSHint - pods/day');
  test('pods/day/route.js should pass jshint', function() { 
    ok(true, 'pods/day/route.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pods/index/controller.jshint', function () {

  'use strict';

  module('JSHint - pods/index');
  test('pods/index/controller.js should pass jshint', function() { 
    ok(true, 'pods/index/controller.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pods/index/route.jshint', function () {

  'use strict';

  module('JSHint - pods/index');
  test('pods/index/route.js should pass jshint', function() { 
    ok(true, 'pods/index/route.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/config.jshint', function () {

  'use strict';

  module('JSHint - pretender');
  test('pretender/config.js should pass jshint', function() { 
    ok(false, 'pretender/config.js should pass jshint.\npretender/config.js: line 12, col 2, Unnecessary semicolon.\n\n1 error'); 
  });

});
define('train-with-brett/tests/pretender/data/cards.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/cards.js should pass jshint', function() { 
    ok(true, 'pretender/data/cards.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/data/circuits.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/circuits.js should pass jshint', function() { 
    ok(true, 'pretender/data/circuits.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/data/days.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/days.js should pass jshint', function() { 
    ok(true, 'pretender/data/days.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/data/entries.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/entries.js should pass jshint', function() { 
    ok(true, 'pretender/data/entries.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/data/exercises.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/exercises.js should pass jshint', function() { 
    ok(true, 'pretender/data/exercises.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/pretender/data/routines.jshint', function () {

  'use strict';

  module('JSHint - pretender/data');
  test('pretender/data/routines.js should pass jshint', function() { 
    ok(true, 'pretender/data/routines.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/serializers/application.jshint', function () {

  'use strict';

  module('JSHint - serializers');
  test('serializers/application.js should pass jshint', function() { 
    ok(true, 'serializers/application.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/test-helper', ['train-with-brett/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

	document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

	QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
	var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
	document.getElementById("ember-testing-container").style.visibility = containerVisibility;

});
define('train-with-brett/tests/train-with-brett/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/helpers');
  test('train-with-brett/tests/helpers/resolver.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/helpers/resolver.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/helpers');
  test('train-with-brett/tests/helpers/start-app.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/helpers/start-app.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests');
  test('train-with-brett/tests/test-helper.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/test-helper.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/adapters');
  test('train-with-brett/tests/unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/models/card-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/models');
  test('train-with-brett/tests/unit/models/card-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/models/card-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/models/exercise-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/models');
  test('train-with-brett/tests/unit/models/exercise-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/models/exercise-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/models/routine-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/models');
  test('train-with-brett/tests/unit/models/routine-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/models/routine-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/pods/components/day-summary/component-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/pods/components/day-summary');
  test('train-with-brett/tests/unit/pods/components/day-summary/component-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/pods/components/day-summary/component-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/pods/components/exercise-card/component-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/pods/components/exercise-card');
  test('train-with-brett/tests/unit/pods/components/exercise-card/component-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/pods/components/exercise-card/component-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/pods/index/route-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/pods/index');
  test('train-with-brett/tests/unit/pods/index/route-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/pods/index/route-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/train-with-brett/tests/unit/serializers/application-test.jshint', function () {

  'use strict';

  module('JSHint - train-with-brett/tests/unit/serializers');
  test('train-with-brett/tests/unit/serializers/application-test.js should pass jshint', function() { 
    ok(true, 'train-with-brett/tests/unit/serializers/application-test.js should pass jshint.'); 
  });

});
define('train-with-brett/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("adapter:application", "ApplicationAdapter", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var adapter = this.subject();
    ok(adapter);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('train-with-brett/tests/unit/models/card-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("card", "Card", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('train-with-brett/tests/unit/models/exercise-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("exercise", "Exercise", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('train-with-brett/tests/unit/models/routine-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel("routine", "Routine", {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test("it exists", function () {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
  });

});
define('train-with-brett/tests/unit/pods/components/day-summary/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("day-summary", "DaySummaryComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('train-with-brett/tests/unit/pods/components/exercise-card/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent("exercise-card", "ExerciseCardComponent", {});

  ember_qunit.test("it renders", function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, "preRender");

    // appends the component to the page
    this.append();
    equal(component._state, "inDOM");
  });
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('train-with-brett/tests/unit/pods/index/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:index", "IndexRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('train-with-brett/tests/unit/serializers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("serializer:application", "ApplicationSerializer", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var serializer = this.subject();
    ok(serializer);
  });
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
/* jshint ignore:start */

define('train-with-brett/config/environment', ['ember'], function(Ember) {
  var prefix = 'train-with-brett';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("train-with-brett/tests/test-helper");
} else {
  require("train-with-brett/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=train-with-brett.map