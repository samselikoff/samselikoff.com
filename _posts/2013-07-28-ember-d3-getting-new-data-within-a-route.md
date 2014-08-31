---
layout: post
title:  "Ember and D3: Getting new data within a route"
categories: Programming Ember D3 Datavis
---

When doing datavis, you'll often want to display new data without changing the route of your appplication. For example, you may want to supplement a time series chart with a baseline render. These types of UI interactions are not meaningful enough to change the URL[^1], but they still may require an additional call to the server.

<!-- more -->

Ember places a lot of emphasis on routing, so examples of fetching data from the server when switching routes are prevalent. But here, I want to look at fetching data without changing the route. Let's say part of our `IndexRoute` has a datepicker, and each time a user selects a month, we want to add some data to an existing chart. 

The first thing to remember is that in Ember, controllers can be thought of as data containers. Models act as proxies to your actual data on the server, but when it comes to actually displaying and manipulating data in your Ember app, controllers take center stage. So, to get some new data, the first step is to make a new controller. We'll use an `ArrayController` to hold all the months the user has selected:

{% highlight javascript %}
App.MonthsController = Ember.ArrayController.extend({
});
{% endhighlight %}

This will be the container for our models.

Now, we want to add some models to our controller. Again, because many Ember apps will only need new data upon entering a new route, you'll come across numerous guides on how to accomplish this that will point you to a controller's `init` function, or to the `model` or `setupController` hooks within a route. But that's not what we're interested in here. These components are part of Ember's sophisticated routing system, and while they work nicely when changing routes, we'll have to find another way.

First, let's model our data:

{% highlight javascript %}
App.Month = DS.Model.extend({
    min: DS.attr('number'),
    max: DS.attr('number'),
    (other data)
    ...
});
{% endhighlight %}

How can we get new `Month` models into our controller? Let's start with the UI. Usually when dealing with datepickers, you'll need to write some Javascript. This means we'll probably need more than just a template to handle our user interactions. Let's create a view for our datepicker

{% highlight javascript %}
App.DatepickerView = Ember.View.extend({
    init: function() {
        this.$().datepicker();
        ...
    }
{% endhighlight %}

and add it to our `IndexRoute`

{% highlight html %}
// index.html
<body>
    <script type="text/x-handlebars" data-template-name="index">
        <h1>Welcome to may app!</h1>
        ...
        <aside>
            {% raw %}{{view App.DatepickerView}}{% endraw %}
        </aside>
    </script>
    ...
</body>
{% endhighlight %}

Now, when a user clicks a month on our datepicker, we want to fetch some new data. Ultimately, we'll use the data to rerender our D3 chart - but in this post, I just want to focus on getting the data. If we were transitioning to a new route, we'd use the standard {% raw %}`{{linkTo}}`{% endraw %} helper, and specify our data in the `model` hook of our route. Here, we'll have to write some custom methods. 

First, we'll want to handle the click event in our view. The details will vary depending on what datepicker you're using (or if you're writing your own), but you'll probably be able to access the selected date from the datepicker's api. But what are we going to do with the selected date? The view shouldn't be responsible for calling the server directly to get the new data - we already have a controller that should be managing that. So that's what we'll do - trigger an event that tells the controller to get some new data. First, tell the view to trigger the event:

{% highlight javascript %}
App.DatepickerView = Ember.View.extend({
    click: function(e) {
        var id = this.$().datepicker().getDate();
        this.get('controller.controllers.months').send('addMonth', id);
    }
{% endhighlight %}

In this example, the `DatepickerView` is in the `IndexRoute`, so its context is the `IndexController`. Since we need to send the `addMonth` event to the `MonthsController`, we need to teach our `IndexController` how to find the `MonthsController`. We do this using the `needs` property:

{% highlight javascript %}
App.IndexController = Ember.Controller.extend({
    needs: ['months']
});
{% endhighlight %}

Now, every time a user clicks a month, the view sends an `addMonth` event to the `MonthsController`. Let's write a method to handle this event. The goal is to fetch the new model from the server, and once it fetches, add it to the `MonthsController`. Any view that reads data from the `MonthsController` (for example, our hypothetical D3 chart) will then automatically update once the data comes in.

Here's the method:

{% highlight javascript %}
App.MonthsController = Ember.ArrayController.extend({
    actions: {
        addMonth: function(id) {
            var _this = this;
            App.Month.find(id).then(function(month) {
                _this.pushObject(month);
            });
        }
    }
});

{% endhighlight %}

Pretty simple, right? We add the month to the controller once its returned. And that's how you can get data to your controllers without changing routes.

*This is Part 2 in a series of posts on building a basic interactive dashboard using [D3.js](http://www.d3js.org) and [Ember.js](http://www.emberjs.com).*


[^1]: In other words, it may not be appropriate to structure the output resulting from the user's interaction as a new resource.