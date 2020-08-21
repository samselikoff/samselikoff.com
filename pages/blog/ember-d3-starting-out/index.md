---
title: "Ember and D3: Starting out"
date: "2013-07-23"
---

Over the past few months I've worked on several data reporting projects. For the actual visualizations I've been using [D3.js](http://www.d3js.org), but at the start I was writing the rest of the architecture by hand. It didn't take long for my projects to become unwieldy; adding just a few filters and controls introduced the need to maintain application state, which dramatically increased each project's complexity. Without much experience in Javascript or application design, my apps quickly turned into unmaintainable piles of spaghetti.

As I looked into cleaning up my Javascript, one of the first resources I came across was [this slideshare presentation](http://www.slideshare.net/rmurphey/cleaner-leaner-meaner-refactoring-your-jquery). It's a great introduction to using OOP to organize JS DOM manipulations and event handling. After that, I started using [Backbone.js](http://backbonejs.org/). (For anyone starting out with Backbone, I highly recommend taking a look at [this article](https://github.com/kjbekkelund/writings/blob/master/published/understanding-backbone.md).) I learned a great deal through writing and re-writing several of my JS projects in Backbone, though I still felt ill-equipped in my decision-making - and Backbone certainly left me with a lot of decisions to make.

Recently, a friend recommended I give [Ember.js](http://www.emberjs.com) a shot. Ember's opinionated architecture and design are exactly what I'd been looking for. I could now scaffold a project and be confident in its foundation. Interactive data visualizations can get tricky really fast, but I've already caught a glimpse of several Ember features that can smooth out these rough spots. I'm just starting out, but I'd like to share what I've learned about how these two technologies can work together.

## The data

One of the first design decisions I encountered when making visualizations in Ember was how to separate the data from the actual rendering. Any sort of dynamic visualization really needs this separation, since your users will be loading and filtering new data without refreshing the page. Backbone's data layer is pretty straightforward: models hold objects, and collections hold arrays of models. This fit nicely with D3, as you're typically manipulating arrays of objects. Collections are thus the natural choice for the data layer in Backbone.

Ember also has models, but instead of collections it uses controllers to store arrays of data. Why the new name? Because controllers actually serve a different purpose than collections. There is little functional difference between models and collections in Backbone - when working with data, sometimes you are working with many blog posts (a collection) and sometimes a single post (a model). Both Backbone objects essentially start out as data stores with some additional functionality, and allow you to add your own properties and methods as you see fit. But controllers in Ember serve a specific and distinct purpose from models. From [the guide](http://emberjs.com/guides/controllers/),

> ...controllers allow you to decorate your models with display logic. In general, your models will have properties that are saved to the server, while controllers will have properties that your app does not need to save to the server.

So, our raw server data will be stored in models, and our controllers will act as a layer on top of that raw data. Controllers have the express purpose of 'decorating' our data, allowing us to slice it up in various ways and massage it into a form suitable for our visualizations.

Using controllers in this way may seem strange to folks coming from server-side MVC\* frameworks like Rails or Symfony (it did to me!), but once you drop the comparison things ease up. Essentially, your raw data is loaded into models, processed and transformed by controllers, and the finished product is handed off to your views/templates for rendering. As an added bonus, controllers are only instantiated when requested, and hang around for the life of your application. This works well for applications centered around data visualization, which tend to reuse data considerably.

There are other perks that come with using controllers, such as the ability to mimick any nested relationships that exist in your data, but suffice it to say that Ember's data layer will serve our needs well.

_This is Part 1 in a series of posts on building a basic interactive dashboard using [D3.js](http://www.d3js.org) and [Ember.js](http://www.emberjs.com)._
