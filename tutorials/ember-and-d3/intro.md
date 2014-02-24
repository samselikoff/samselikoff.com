Ember and D3: Building a simple dashboard
=========================================

Intro
=====

Dynamic dashboards built with technologies like D3.js have become very popular. These apps can get pretty complex - and like most complex projects, they start off easy. But by their very nature, they tend to yield numerous parts that are all interconnected.

The data binding feature of Ember.js reduces the complexity associated with building and maintaining these types of applications. It alleviates the need for the programmer to wire together a system of communication between his various charts and controls - all while providing an unobtrusive API that stays out of the way of designing his application.

In this tutorial we'll build a simple dashboard with D3.js and Ember.js. You will see how these two technologies can work together to yield an application that is powerful, maintainable, and most importantly, extensible - all in about 200 lines of code. 

Audience
--------

This tutorial assumes no familiarity with Ember.js. However, if you've never worked with any client-side MVC framework, some of the concepts may seem obscure. No matter - these concepts are best grasped through repetition, and now is a great time to take your first dip!

Having a basic understanding of how D3 is used to render charts on a webpage may help you better appreciate the pain points Ember solves, but it is not necessary. We won't be writing any D3 code - we'll use existing charts for this app. 

Of course, you'll need to learn D3 when it comes time to build your own dashboards. For that, I suggest starting with Scott Murray's very approachable [web tutorials], followed by his [book], [the d3.js examples page], and, most importantly, lots of tinkering.

Motivation
----------

Developers are doing some amazing things with D3. The project's [examples page] reveals some very complex, coordinated visualizations that are definitely getting the job done. So why bother using a framework for our D3 code?

### Separation of concerns

Like in all our code, we should strive for a separation of concerns. Some of the main concerns when building dashboards are:

  - **Caching data.** Dashboards need data, and that data needs to be stored somewhere, so it can be accessed and reused. Some popular candidates are: a global object, the DOM, and a proper model layer separate from the rest of your applicaiton. You'll probably want the last option.

  - **Handling events.** Users will be able to interact with your dashboard, and you need to coordinate these events across your entire application. D3 has an event system built in, but it is really designed specifically for (what?). A mature dashboard will have objects that need to know when a specific dashboard is clicked, when a filter is selected, when new data comes in, when an animation has finished executing, and more. A well thought-out event system is crucial to the success and extensibility of a dashboard.

  - **Routing.** Dashboards can provide very useful views into particular subsets of data, as a result are the types of things users will want to be able to bookmark and share. Adding proper routing and URL support to a JavaScript dashboard after the fact can be quite difficult, so it's good to think of it from the start.

  - **Reusable components.** We will most likely want to reuse the charts and controls we build. Reusability should be a baked into the design and architecture of our app.

Dealing with all these concerns by hand requires a lot of reinventing the wheel. Since modern Javascript frameworks have all these features built-in, we should really use a framework.


### Why Ember.js?

So, we should use a framework. But why choose Ember, from among the myriad available options?

Data visualization is first and foremost about data, and data is really a first-class citizen in Ember's object model. Every object in Ember inherits from a base class that sets up a powerful obsever system. Because of this, objects can observe changes in properties on any other object - but Ember takes this one step farther. You can actually declare properties on one object that depend on properties on another object - called computed properties. Changes to the 'parent' object automatically update the computed properties, which in turn could update any computed properties further down the chain. This means for your entire data level, you have a very simple way to specify your dependency graph. Since computed properties only update when their dependencies update, you avoid unnecessary calculations and redraws, making your app faster and your charts more responsive. Additionally, there are also some nice conveniences we get, for example Fixtures when using Ember data. 

Another reason to use Ember is the role of controllers. It's almost guaranteed that no matter what data vis project you're working on, you'll need to massage the raw data from the server before you're ready to display it. Some web archictures mix this data massaging into the same layer as raw data storage, but this can get messy fast. In Ember, the raw model layer is kept separate from the data massaging layer - the controllers. This gives you a nice, isolated layer in which to do your massaging.

In Ember, everything starts with the Route. This means your forced to think of how the user may want to bookmark different pieces of your app from the beginning. It also pushes you to spend some time thinking about how you will expose your server data as resources.

Ember also gives us components, which are completley reusable objects. As we will see, these are perfect candidates to use as buidling blocks for our interactive dashboards.


### Keeping our D3 code separate

One potential concern with using a framework to build our dashboards is that we'll be tying our D3 code down to an Ember app. However, we want to avoid this, both because there are a lot of existing D3 examples out there that we should be able to use, and because we don't want to limit the reusability of our own D3 code. So instead, we'll learn how to effectively wrap our D3 charts with Ember components, and hook into the power of the Ember bindings system.


Now, we're ready to get started!