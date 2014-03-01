---
layout: writing
title:  "An Intro to D3, with applications to Big Data"
slug: "intro-to-d3-big-data"
date: February 24, 2014
---

[D3.js](http://www.d3js.org) is a JavaScript library used to create interactive visualizations in the browser. This tutorial discusses some motivations for learning D3, presents a brief introduction to the library, and concludes with some applications of D3 to big data.


Why data vis?
-------------
"Big Data" is something of a buzzword, but beneath it is an important idea: that data can be so complex, it's incomprehensible.

Data visualization provides an answer to this problem. Visualizations distill lots of information into something we humans can understand, typically by focusing on an aggregate view or subset of the data.

Visualizations help us in two ways: _communication_ and _exploration_. First, take this press release about Apple's revenues:

> 

How long did it take you to consume this information? What if the author was simply trying give you a high-level understanding of Apple's performance over the past few years?

Now consider this:

  [time series chart]

How long did it take you to understand the main trend of the chart? Do you feel like you have a better grasp of the data? The density of information in the chart helps us easily communicate a particular insight we have to others. Importantly, in data visualization we _have_ control over the information density - unlike in text.

Visualizations also help us explore. Sometimes we don't know anything about our data, but we simply can't investigate it in its raw form. Visualizations help by presenting the data in a way that's more suitable for exploration.

Take this calendar chart:

  [show calendar chart of daily stock prices]

With chart, we're able to quickly scan several years' of data and look for something interesting; indeed, the end of 2008 looks like an area worth exploring.

So data vis is more than just pretty charts. Effective data vis makes our data more valuable, by facilitating communication and exploration.

  
What's D3?
----------
D3 stands for Data-Driven Documents. Sounds like it could be useful for big data - but what the heck does it mean?

The word "document" in D3 refers to the DOM, which is what you see when you view a webpage (like this one). It's the parsed and rendered HTML and CSS. But it's more than that; it's a living, breathing thing. Javascript can manipulate the DOM, creating and deleting HTML and CSS. This is how we add behavior to web apps.

At a higher level, the DOM is an agreed-upon set of terms for representing, updating, and querying information from documents. It's what enables CSS queries and DOM events. It's the raw stuff of the platform that all web developers are familiar with.

Over time, JavaScript development on the web has gotten better, and we've learned how to do some pretty cool things. We've used libraries like jQuery to iron out cross-browser issues, and we've built plugins to make our UIs more interactive. But most of these innovations are related to GUI programming - because most of the time, we're building user interfaces for web applications.

But we want to do data vis! And data vis isn't quite the same as building GUIs. It's about relating data (a time series dataset) to elements on the screen (bars, circles, or points).

Building visualizations with tools that are suited for GUI programming is difficult and verbose. For example, if we were to set the heights of some hypothetical bars that exist in an HTML document with vanilla JavaScript, it'd look something like this:

    var nums = [80, 53, 125, 200, 28, 97];

    var bars = document.getElementsByTagName("rect");
    for (var i = 0; i < bars.length; i++) {
      var bar = bars.item(i);
      bar.setAttribute("height", nums[i]);
    }

With d3, its

    d3.selectAll('rect')
      .attr('height', function(d, i) {return nums[i];});

In addition to being shorter, there are a few benefits to the second apparoch:

  - D3's embraces [declarative programming](http://en.wikipedia.org/wiki/Declarative_programming), and we can see that here: the `.attr` method lets us set the heights on the entire set of elements all at once, rather than using a `for` loop. Declarative code abstracts away implementation details, making complicated transformations easier to reason about. It's a powerful paradigm, but definitely takes some getting used to.

  - We're getting a little ahead of ourselves, but as you can see we're using a function to set the heights. And the function is smart; it _knows_ about our data, and makes the relevant datum (and index) available to the transformation. This is the standard way we set attributes of elements that are bound to data.

So D3 is really about providing an API that's well-suited for DOM creation and manipulation, based on the data; hence, data-driven documents. 


What D3 isn't
-------------
It may surprise you to learn that D3 doesn't come with any prebuilt visualizations; there's no d3.barchart, for instance. This is because D3 aims to be low-level and flexible. There are many excellent charting libraries out there, and several built on top of D3. If your goal is to render a few standard charts as quickly as possible, you may want to consider using a library instead of writing them by hand.

D3 is also not a compatability layer, though it does take care of a few cross-browser quirks. D3 is built to work on modern browsers.

Finally, you should know that D3 is about web standards. Remember, the first D in D3 refers to the DOM. That's web standards talk: HTML, CSS, and JavaScript. There's no new technology here: no Flash, no Java applets, no proprietary plugins. D3 works in any modern browser on any device, out of the box. So learning D3 involves learning about web standards, which is the language of modern web development.


Can D3 help in the context of big data?
---------------------------------------
Because it is low-level, D3 may seem like a bad fit for big data analysis. Indeed, it won't help you run gigabytes of data through a model; but after you've done this with some other tool, D3 can help you make sense of the result.

Recall the two primary uses of data visualization: explaining and exploring.

If you're focused on exploring data, D3 can be awesome. But, don't underestimate the learning curve. If you need to crank out a dozen pie and bar charts by the end of the week, you probably shouldn't write them from scratch using D3. Instead, use a library with visualizations built-in: NVD3, flot, Google charts, etc.

Sometimes, though, existing solutions aren't enough, and you need a custom way to explore your data. Remember the calendar chart from above?

  [calendar chart]

This is a pretty unique chart, and it's probably not available as a built-in chart in Excel. The point is, D3 is low-level, which means if you can dream it, you can build it. Learning D3 can be a great way to explore your data, because you have complete control over the representation and interaction of the visualization.

It's also good for explaining - again, because of the control.

  [show nytimes connections between grammys]

The authors of this visualization wanted to explain relationships they had found in the data. They could have written an article, but instead used D3 to communicate the insights much more immediately (and beautifully). Again, this visualization is not found in Excel. 

The point is, if you have a specific idea or concept you want to explain - which people in big data often do - learning D3 can give you the power to do so in a unique and effective way.

Alright, enough ceremony. Lets learn it!


Learning D3
-----------
This tutorial won't go over all the different pieces of the D3 toolbelt; there are plenty of existing resources on that. Instead, it will introduce some of the main conceptual hurdles to learning D3, primarily selections and data bindings. Once you get a handle of these, the code in the myriad [examples]() from the community should make much more sense. Armed with [D3's documentation] as a reference, you'll be on your way to making your own visualizations.

I like learning through an example, so we'll work through this bar chart:

  [bar chart]

sSurely, not as exciting as some of the community examples. But its simplicity will let us focus on D3's primitive objects.

This chart is rendered in SVG; open up the inspector (CMD+CONTROL+i/Control+Shift+i) and see:

  [picture of inspector showing the bar chart]

The SVG is in the DOM. Its parsed and ready to style and manipulate. D3 is not just about SVG; we can use it to create an HTML table, for example. But SVG lets us do all the cool visualizations that we typically use D3 for.

### Selections

Lets start with the bars. Our initial document is

```html
<html>
  <body>
    <script src="d3.v3.min.js" charset="utf-8"></script>
    <script>
      // Our code
    </script> 
  </body>
</html>
```

We're referencing a copy of d3 in our folder. Here's the data driving this visualization:

```js
var nums = [80, 53, 125, 200, 28, 97];
```

Now, to render an SVG rect, we first need an `<svg>` container element. Let's add one to the DOM:

```js
d3.select('body').append('svg');
```

`d3` is the d3 global object - think `$` from jQuery. And also similar to jQuery, d3 allows us to select elements in the DOM. Here, we select the `<body>` element. Selecting something in d3 produces a [d3 selection](https://github.com/mbostock/d3/wiki/Selections). **Selections** are a powerful abstraction that let us apply transformations to groups of elements, rather than using imperative code, via something like a `for` loop. We'll see their full power soon.

For now, just think of the selection as an object that wraps the `<body>` tag, and provides some useful methods. For example, they let us change CSS properties:

```js
d3.select('body').style('background-color', 'blue');
```

And as we saw, they also let us `append` other elements to the DOM. When we call `append('svg')`, d3 appends an `<svg>` element to the `<body>` element. Check out the inspector - there it is!

Now, we probably append things to the DOM in order to do something with them. Conveniently, after D3 appends a new element to the dom, it returns a new d3 selection wrapping the element that was just appended. So, we can do something like this:

```js
var svg = d3.select('body').append('svg');
```

and work with our new selection using this local variable, just as if we had written `d3.select('svg')`.

It's time to create some `<rect>` elements. Maybe we could just `append` them, like we did the `svg` element. We have 6 data points, so...

```js
// Recall, var nums = [80, 53, 125, 200, 28, 97];

svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
```

If we check the inspector, the bars are there! But this is d3, and the whole point is to use the data to drive the creation of our documents. Clearly, this solution falls short.


### Selecting arrays of elements

Before we learn how its really done, we need to learn a bit more about selections. 

We've seen d3.select used on single elements: d3.select('body'), d3.select('svg'), and so on. There's another method which gives us a selection: **`d3.selectAll()`**. This produces a selection that wraps an _array_ of all matching elements. For example,

```js
var paragraphs = d3.selectAll('p');
```

returns a d3 selection wrapping all `<p>` tags on the page. So, what is a selection, really? We can select single elements, or groups of them, but what does the selection itself represent? Think of it as higher-level than the elements themselves. It represents a powerful object that references some set of elements in the document, it knows details about them, and can apply transformations to them.

**Understanding selections is key to writing d3 code.** It takes some time to wrap your head around, so after playing with the code a bit, be sure to read as much as you can on them from the docs and from other tutorials.

Now, remember when we changed the color of the 'body' element earlier? If you wanted to do that for all our page's paragraphs, you might try something like this:

```js
paragraphs.forEach(function(p) {
  p.style('background-color', 'green');
});
```

But this is not how we do things in d3. Remember, a selection should be thought of and acted upon as a single managing object. Because of this, when it comes time to transform elements in the DOM, you operate on the selection itself:

```js
paragraphs.style('background-color', 'green');
```

The selection applies the transformation to each element it references.

This style of programming is called _declarative programming_, because we declare our intention (_what_ we want to do), rather than imperative programming, where we write out each step our program needs to accomplish a given task (_how_ to do it). 

As you can already see, declarative programming is a powerful abstraction that can reduce complexity and open the door for more powerful code. It is the style in which d3 code is written.


### Selecting no elements

Now, we come to an interesting point. Currently, our DOM looks like this:

```html
<body>
  <svg>
    <rect></rect>
    <rect></rect>
    <rect></rect>
    <rect></rect>
    <rect></rect>
    <rect></rect>
  </svg>
</body>
```

And we can use `selectAll` to grab the bars:

```js
var bars = d3.selectAll('rect');
```

But what if we had selected the bars before we had appended them? 

```
// index.html
<body>
  <svg>
  </svg>
</body>

// script.js
var bars = d3.selectAll('rect');
```

Clearly, we're selecting something that doesn't exist, so it will return null, right? It's as if we applied a CSS rule to a #home element, but that element doesn't exist. Or used jQuery to find all the `<h5>` elements, `$('h5')`, but none exists, so we get a null, an empty set, a vacuous solution.

Actually, even though our selection _is_ empty, the return value is not vacuous. Remember, selections are a higher-level thing, a managing object. In this case, `bars` doesn't reference anything in the DOM, it's true; but it still _represents_ an array of `<rect>` elements.

So, you can think of selections as having two pieces. The first is this abstract, Platonic thing that they represent, like a single 'body' tag, or an array of '<rect>' elements. The second is the actual set of elements the selection matched in the DOM as it currently exists - for example, the 6 rect elements that we can see in the inspector, right now. 

Having both pieces is the key to how d3 operates.


### The data join and subselections

As you may have already figured out, d3 can compare both parts of a selection - the elements that the selection represents, and the elements that the selection matched in the DOM - and tell us where they are similar, and where they are different.

The elements matched in the DOM simply come from the DOM - so that's easy. But how does d3 know what our selection should represent? So far, it has just represented either a single element, or an array of elements. But how big is the array? And what are the elements of the array which the selection represents?

This is where the data join comes in. The data join gives us a way to specify exactly what our selections represent. We do it like this:

```js
var nums = [80, 53, 125, 200, 28, 97];

var bars = svg.selectAll('rect')
  .data(data);
```

Now we have a selection, but one that is bound to data. d3 knows _exactly_ what that selection represents: an array of 6 different `<rect>` elements, each which maps to the corresponding integer in the array.

Now that d3 knows exactly what our selection represents, and it also knows what's currently in the DOM (since it performed a `selectAll`), it can tell us what's the same and what's different between the two pieces. It does this by creating **subselections**: selections that represent a subset of the original selection. There are three subselections: **enter**, **exit**, and **update**:

  [venn diagram]

The names are pretty straightforward. The enter subselection represents elements that (typically) will be entering into the DOM: they're in the data that was joined to our selection, but they're not currently in the DOM. And exit represents elements that will be leaving the DOM: they're in the DOM right now, but not in the data that was joined to the selection. Update refers to those elements that are in both groups.

So how does this look in practice? Well, what are we trying to do again? Create bars. We have a selection

```js
var nums = [80, 53, 125, 200, 28, 97];

var bars = svg.selectAll('rect')
  .data(data);
```

But the rects don't exist in the dom. That means there are six rects in our enter subselection - we can get to them like this:

```js
bars.enter()
```

Now, we are holding the matched elements. We can do whatever we want with them. In this case, for each element in our representation, we want to append an actual bar element to the DOM:

```js
bars.enter()
    .append('rect');
```

Check the inspector - there are our bars!

### Data is stored in the dom

Now, when the elements are inserted into the DOM, d3 actually stores the data with them, too. This leads us to another fact about selections: **selections are transient.** If you ever need to reselect elements that have been inserted into the DOM, you simply reselect them:

```
d3.selectAll('rect')
```

Inspect those in the console, and you'll see the data. You can also call d3.selectAll('rect').data().

Congratulate yourself - we're over the hump! Selections are the main hurdle in d3, and as you practice more and more with them, the rest will become much easier.


### Data-driven transformations

Ok, so now we have data-bound `<rect>` elements in the DOM. This is exciting, because now we get to to data-driven transformations, like we saw in the very beginning.

First, lets set the width and height of each bar to 20 to see what we're working with:

```js
d3.selectAll('rect')
    .attr('width', 20)
    .attr('height', 20);
```

We see something! But they're all lined up. What's going on? [inspector]. They're all there, for sure. But we haven't moved them.

Now finish the chart.
