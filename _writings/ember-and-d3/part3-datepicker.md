---
layout: default
title: "part3"
primary: false
---

The datepicker, our first Ember component
-----------------------------------------

We'll be using an [Ember component](http://emberjs.com/guides/components/) for our datepicker. Think of a component in Ember as a reusable chunk of your GUI - a chart, a datepicker, whatever. The component doesn't know about its surroundings, such as where it's rendered, but it can transmit data back and forth to the Ember app it belongs to. This makes it a perfect candidate for our datepicker.

The first step in building a component is to think about the _contract_ it will offer to its presenter. In our case, our datepicker component needs:

 1. To know the current month
 2. To notify the app when its month changes

In this app, we don't need to worry about changing days, so we'll stick to a monthly datepicker. Let's dive right in. Components in Ember must be named with two or more words(), so we'll use "monthly datepicker":

```js
App.MonthlyDatepickerComponent = Ember.Component.extend({
});
```

When it comes to rendering the componetn in a Handlebars template, When the component is loaded up and ready to go, we need to draw the datepicker itself. Recall that we've included a datepicker library [] - we're not writing a datepicker ourselves here; rather, we're wrapping an existing library's object in an Ember componet to facilitate reuse and communication in our Ember app (as well as other apps we (or others) may develop down the road)j.

The library we're using provides the following simple API for initializing a datepicker on a jQuery selection: `.datepicker(options)`. So, once our component's root element has been inserted into the DOM, we'll initialize a new datepicker. Ember gives us easy access to the jQuery-selected root element via `this.$()`, so our code looks like this:

```js
App.MonthlyDatepickerComponent = Ember.Component.extend({

  didInsertElement: function() {
    this.$().datepicker({format: 'M-yyyy', minViewMode: 'months'});
  }

});
```

Ok, so now our component will render a datepicker to its root element. Now let's think about the contract. First, we need to notify the Ember app if the date changes. The datepicker library we're using exposes a hook for this very action: `on.('changeDate', handler)`. So, let's add the handler to our datepicker:

```diff
App.MonthlyDatepickerComponent = Ember.Component.extend({
  
  didInsertElement: function() {
+   var _this = this;
    this.$().datepicker({format: 'M-yyyy', minViewMode: 'months'})
+     .on('changeDate', function(e) {
+       this.sendAction('action', e.format());
+     });
  }

});
```

Now our component will emit an action whenever its date changes, which we'll be able to handle in a controller or router, just like we would any other action from a view or helper. The first parameter "action" means this is primary action of our component. The second parameter is which date was selected.

<aside>
Read more about actions in components [here](http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/).
</aside>

We'll see how to actually handle the action soon. First, let's finish the component. The only other piece we need is to tie our datepicker to the current month our application has selected.

Now, if we think back to our application mockup, it may seem that the `changeDate` action is all we really need. After all, the datepicker is going to be the primary driver of our user's interaction. He'll select a new month, and see the report show up in the main panel. So why do we need to tell our datepicker what the selected month is? Won't it already know?

When building Ember apps, it's important to always think in terms of two-way data binding. In this case, that means we need to account for some other interaction that would change the selected month. Even though right now we may not plan on having another part of our GUI change the date, it's always a possibilty. So the best practice is to ensure two-way binding with our component and its data. That way, if we (or a team member) ever changes the selected month anywhere in the app, we know our datepicker component will stay up to date and accurately represent the new date.

With that being said, let's add an `update` method to our datepicker:

```diff
App.MonthlyDatepickerComponent = Ember.Component.extend({
  
  didInsertElement: function() {
    var _this = this;
    this.$().datepicker({format: 'M-yyyy', minViewMode: 'months'})
      .on('changeDate', function(e) {
        this.sendAction('action', e.format());
      });

+   this.update(); 
  },

+ update: function() {
+   if (this.get('month')) {
+     this.$().datepicker('update', this.get('month').toDate());
+   } else {
+     this.$('.month.active').removeClass('active');
+   }
+ }.observes('month')
}

});
```

To understand what's going on here, first let's consider the possible values the selected month will be: it will either be a particular month, or it will be null. If it's a particular month (first branch of the `if` statement), we need to update the datepicker. `.datepicker('update', month)` is the API of the library we're using, so we just call that, passing in a Javascript date object as the new month. Note that `this.get('month')` is getting a property called `month` on the component itself. We haven't actually defined or set this property anywhere yet - we'll get to that shortly.

On the other hand, if the current month is undefined (second branch of the conditional), we clear the active month from our datepicker's UI.

Next, we add `.observes('month')`. This tells Ember that this function should be invoked each time the variable `month` changes. Writing observers in this declarative style saves us from having to explicitly attach a handler to the value changed event of the `month` variable. This style of coding is very much embraced by Ember.js.

Finally, we add a call to `this.update()` within the `didInsertElement` hook, so that on initialization our datepicker will be up to date with whatever the initial value of `month` is.

That's it - our first component!

Using our datepicker
--------------------

### Giving it data 

To actually use our component, we render it in a Handlebars template, like this:

{% raw %}
```js
{{monthly-datepicker }}
```
{% endraw %}

But our component doesn't exist in a vaccuum - it interacts with our application. So, we need to feed it the data it needs to communicate. We can do it right in the Handlebars template:

{% raw %}
```js
{{monthly-datepicker
  month=controller.controllers.monthlyReport.date
  action="changeMonth"}}
```
{% endraw %}

Here, we bind the month property on our component to the date property on our `MonthlyReportController`. When we declared the `monthlyReport` resource in our router, we get an associated `MonthlyReportController` which will take the current resource, and pass it to the template. Also, when we defined the `monthlyReport` model, we created a `date` property on it, which was a moment.js object. So, that's what's happening here: we're binding the month property on our component the date property of the active `monthlyReport` model on the `MonthlyReportController`.

But, there's one more thing we have to do. Recall our application template:

{% raw %}
```html
<script type="text/x-handlebars" data-template-name="application">
  <header class="title">
    <h1>Ember and D3</h1>
    <h2>Scaffolding</h2>
  </header>

  <div class="content"> 
    <div id="left-panel">
      <h3>The datepicker</h3>
    </div>
    
    <div id="center-panel">
      {{outlet}}
    </div>
  </div>
</script>
```
{% endraw %}

The datepicker is actually rendered in the application template, while the actual monthly report (the charts) will be rendered to the center panel. This means that the _context_ of the datepicker is the `ApplicationController`. Since we want to bind something being rendered by the `ApplicationController` to data that lives on the `MonthlyReportController`, we need to teach our `ApplicationController` where the `MonthlyReportController` lives. We do it like this:

```js
App.ApplicationController = Ember.Controller.extend({
    needs: ['monthlyReport']
});
```

<aside>
Templates in Ember are rendered within a _context_, which simply refers to the controller that owns the view or component being rendered. Read more about template context [here](http://emberjs.com/guides/controllers/#toc_a-note-on-coupling).
</aside>

Now within our application template, we can access any data on the monthly report controller like this: `controller.controllers.monthlyReport.[data]`. This is how we bind our datepicker to our report model.

### Handling the action

We built our component to emit an action whenever the user changes the date - but what actual action is emitted? We provide a name for our component's action when we render it in a template. We do this for reusability: we can now use this same component in another application and give the action a different name, one that's meaningful to that specific app. Here, we've given that action the name `changeMonth`, but it could have been anything we want.

So, we now have an action that's emitted whenever the user clicks a new month. How do we handle this action?

All actions in Ember must be handled. The first object to receive an action is the sending template's controller. If the action is not handled there, it bubbles up to the active route, and then finally to the application route. 

We're going to handle the action directly in the component's context, the application controller:

```diff
App.ApplicationController = Ember.Controller.extend({
    needs: ['monthlyReport'],

+   actions: {

+     changeMonth: function(id) {
+      this.transitionToRoute( 
+        'monthlyReport', 
+        this.get('store').find('monthlyReport', id )
+      );
+     }

+   }
});
```

When the user changes the month, we use the `transititonToRoute` method to a transition to a new route that represents the selected month (for example, `/Jan-2013`). The first paraemters `monthlyReport` is the name of our route (which comes from when we created a `monthlyReport` resource), and the second parameter is the model that will back that route. Remember our component's action sends the id of the month (e.g. "Jan-2013") as a parameter. Here, we use that id to find the corresponding model for our route.

Now we've rendered a component that can transition our app to different routes!

Our first computed property
---------------------------

Computed properties gives us a clean way to add view-layer logic to our model's raw data. Here, we want to give our monthly report a title. If you recall, our `MonthlyReport` model has a date property that refers to a `moment` date object. We can create a `title` property that formats that object, and which we'll use as a header for our report in the center panel.

<aside>
  Read more about computed properties [here](http://emberjs.com/guides/object-model/computed-properties/).
</aside>

```js
App.MonthlyReportController = Ember.ObjectController.extend({
  title: function() {
    // format the moment object (http://momentjs.com/docs/#/displaying/format/)
    return this.get('date').format('MMMM YYYY');
  }.property('model')
});
```

This will give us a nice title for our month, like "January 2013". We can now display it in our template:

{% raw %}
```html
<script type="text/x-handlebars" data-template-name="monthlyReport">
  <h1>{{ title }}</h1>
</script>
```
{% endraw %}

Now we've got the datepicker working: it changes our application's routes, and the report's template updates accordingly.

We're ready to add some charts!
