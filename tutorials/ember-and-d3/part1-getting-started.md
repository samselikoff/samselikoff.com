Ember and D3: Building a simple dashboard
=========================================

Getting started
===============

The app
-------

We're going to make a simple financial report. The report will show monthly revenues by company. It will end up looking something like this:

[picture]

Some controls on the top will let us filter our data.


Dependencies
------------

The dependencies of this project are

	- Ember starter kit (1.0.0)
	- d3.v3.js
	- bootstrap
	- ember-data-1.0.0-beta.2
	- moment.js
	- bootstrap-datepicker
	- my d3 charts

Ember data is one of many persistence libraries that you can use with Ember. It's beign developed by the Ember core team, but as of this writing it's not as stable as Ember itself. This is just something to be aware of.

The D3 charts we'll be using are just some sample charts I have written in the past. As you'll see, we will learn how to generically meld them with our Ember project, so you could easily add new charts of your own, or examples that you find elsewhere online.	


Scaffolding
-----------

First off, let's create the scaffolding of our app. The first thing we need to do to kick off our Ember application is create an instance of it:

```js
App = Ember.Application.create();
```

Of course, this doesn't do much. To actually display some html, we need to render a template.

In Ember, templates are rendered when their associated route is entered. It turns out that even though we haven't explicitly declared them, Ember has given us some routes for free. One is the `ApplicationRoute`, which is entered when the application first boots up. This will render its associated template, which will actually persist for the entire life of the application. If we look at our mockup, we can see that the application template will be the perfect place to put both the header, and the sidebar with the datepicker.

To write our Application template, we just need to define a handlebars template with a data-template-name of `application`:

```js
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

Notice the `{{outlet}}` in our template. This is a handlebars helper we use to tell Ember where to draw the dynamic parts of our app. Thinking back to our mockup, the center panel is where the changing graphs will be drawn.

If we ran the app right now, the outlet in `center-panel` would be empty. We can actually create our first piece of dynamic content by hooking into the Index route. Just like the `ApplicationRoute`, we also get the `IndexRoute` for free. Whereas the application route is entered when the app first boots up, and never exits during the life of the application, the index route is entered when the application enters the root URL (at '/').

By default, our app starts at the root URL. This means our index route will enter on booting up - so all we need to do is define an index template for the route to display:

```js
<script type="text/x-handlebars" data-template-name="index">
  <h3>Select a month</h3>
</script>
```

Now we can run the app to see what we have so far:

