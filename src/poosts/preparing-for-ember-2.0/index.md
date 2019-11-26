---
title: Preparing for Ember 2.0
date: 2015-05-29
---

_This post was originally [a gist](https://gist.github.com/samselikoff/1d7300ce59d216fdaf97), but I wanted to move it here to facilitate better communication._

Components are taking center stage in Ember 2.0. Here are some things you can do today to make the transition as smooth as possible:

- Use Ember CLI
- In general, replace views + controllers with components
- Only use controllers at the top-level for receiving data from the route, and use `Ember.Controller` instead of `Ember.ArrayController` or `Ember.ObjectController`
- Fetch data in your route, and set it as normal properties on your top-level controller. Export an `Ember.Controller`, otherwise a proxy will be generated. You can use Ember.RSVP.hash to simulate setting normal props on your controller.

      ```js

  //controllers/index.js
  import Ember from 'ember';
  export default Ember.Controller;

  //routes/index.js
  model: function() {
  return Ember.RSVP.hash({
  users: this.store.find('user')
  });
  },

  setupController: function(controller, models) {
  controller.setProperties(models);
  }
  `Now you can just refer to the keys in your route's template:`{% raw %}
  //templates/index.js

  <h1>Users</h1>
  {{user-list users=users}}
      ```{% endraw %}
      This controller/template pair will eventually become a routable component.

- In your templates, stay away from things like `ItemController`s and calls to `render()`. Use components instead.
- Don't use views. (You can't avoid this if you need ApplicationView, for instance, but try to avoid them and use components instead.)
- Write your app in the "data down, actions up" paradigm
  - Not currently enforced, but you can still structure your app this way
  - Stay away from two-way bindings and mutability, except perhaps for various `<input>` tags (similar to ReactLink).
- Don't use `each` or `with` in the context-switching form. That is, use

       {% raw %}{{#each users as |user|}}
           {{user.firstName}}
       {{/each}}{% endraw %}

  instead of

       {% raw %}{{#each users}}
           {{firstName}}
       {{/each}}{% endraw %}

- Use pods
- Use `this.route` instead of `this.resource` in `Router.map`. Couple this with pods and you'll quickly understand why you don't want to use `resource` anymore - your directory structure in `pods` will now mirror the view hierarchy of your UI.

**Better apps**

Follow these tips, and your apps will be ready for Ember 2.0. You'll also learn a lot about writing apps that are better structured and easier to understand!

Deprecations will be coming to help you move towards these newer practices. The goal is, if your app runs on the final version of 1.x with no deprecations, it should be able to run in 2.0.
