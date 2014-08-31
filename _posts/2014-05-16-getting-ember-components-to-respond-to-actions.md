---
layout: post
title:  "Getting Ember components to respond to actions"
published: true
categories: ember TIL
---

I'm building a map application in Ember, and I need one of my components to invoke a method in another component. The UI is similar to Google Maps, with an overlay panel showing details about the selected pin:

![Map](/images/posts/2014-05/map.png)

<!-- more -->

The router looks something like this:

```js
App.Router.map(function() {

  this.resource('pins', { path: '/' }, function() {
    this.resource('pin', { path: '/:pin_id' });
  });

});
```

and when the user selects a pin, the overlay panel appears. The map making up the main screen is a `FullscreenMapComponent`, and the portion corresponding to "Street View" in the Google snapshot is a `StreetViewComponent`.

**The problem**

When the user clicks "Street View", we want the main map to pan and zoom to the selected pin. How can we accomplish this? The `StreetViewComponent` is in the `PinController`, and the map is a completely seprate component in a different controller.

Using data-binding we could introduce a dummy property, have the street view component change that property, and have the fullscreen component respond to changes on that property; but this feels hackish, and the dummy variable wouldn't really represent anything meaningful in our application.

What we really want is for our `StreetViewComponent` to send out an action called, say, `focusSelectedPin`, and then have our `FullscreenMapComponent` respond to that action and invoke the appropriate method. However, if we send out an action from our street view, whichever controller or route that handles the action won't have a reference to the `FullscreenMapComponent`, so it won't be able to invoke any of the component's methods.

**The solution**

We can solve this problem by having our fullscreen component register a reference to itself upon initialization.

First, add a `_register` method to the component that executes on init:

```js
App.FullscreenMapComponent = Ember.Component.extend({

  ...

  _register: function() {
    this.set('register-as', this); // register-as is a new property
  }.on('init')

});
```

Then, when rendering the component, supply a property to bind `register-as` to:

```js
// templates/pins.hbs

{% raw %}{{fullscreen-map data=mapData register-as=fullscreenMap }}{% endraw %}
```

 
Now, our controller has a reference to the component, and can call methods directly on it. For example, if clicking our street view component sends out a `focusSelectedPin` action, we could handle it like this:

```js
App.PinsRoute = Em.Route.extend({

  ...

  actions: {
    focusSelectedPin: function() {
      this.controller.get('fullscreenMap').panToSelectedPin();
    }
  }

});
```

Presto! Now our components can respond to actions.


<em>Thanks to <a href="http://www.twitter.com/ebryn">@ebryn</a> for this solution.</em>