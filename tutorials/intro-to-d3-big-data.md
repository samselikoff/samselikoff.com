---
layout: writing
title:  "An Intro to D3, with applications to Big Data"
slug: "intro-to-d3-big-data"
date: February 24, 2014
---

[D3.js](http://www.d3js.org) is a JavaScript library used to create interactive visualizations in the browser. This tutorial discusses some motivations for learning D3, presents a brief introduction to the library, and concludes with some applications to big data.


Why data vis?
-------------
"Big Data" is something of a buzzword, but beneath it is an important idea: that data can be so complex, it's incomprehensible.

Data visualization is an answer to this problem. Visualizations distill lots of information into something we humans can understand, typically by focusing on an aggregate or subset view of the data.

Visualizations help in two ways: _communication_ and _exploration_. Take this press release about Apple's revenues:

  > Apple® today announced financial results for its fiscal 2013 fourth quarter ended September 28, 2013. The Company posted quarterly revenue of $37.5 billion and quarterly net profit of $7.5 billion, or $8.26 per diluted share. These results compare to revenue of $36 billion and net profit of $8.2 billion, or $8.67 per diluted share, in the year-ago quarter. Gross margin was 37 percent compared to 40 percent in the year-ago quarter. International sales accounted for 60 percent of the quarter’s revenue.[1]

How long did it take you to consume this information? Now consider this:

  ![Stock chart](/images/posts/2014-03/intro-d3-stock-chart.png)

How long did it take you to understand the main trend of the chart? Do you feel like you have a better grasp of the data? By increasing the density of information, data visualization helps us communicate our insights quickly and effectively.

Visualizations also help us explore. Sometimes we don't know anything about our data, and investigating it in its raw form is impossible. We can use data vis to present the data in a form more suitable for exploration. Take this calendar chart, which shows daily percentage changes in the DOW stock index over several years:

  ![Calendar chart](/images/posts/2014-03/intro-d3-calendar-chart.png)

With this chart, we're able to quickly scan several years' of data and see if there's anything interesting; indeed, the end of 2008 seems to merit further exploration.

So data vis is about more than just making pretty charts. By facilitating communication and exploration, visualizations make our data more valuable.

  
What's D3?
----------
D3 stands for Data-Driven Documents. Sounds like it could be useful for big data - but what does it mean?

The word "document" in D3 refers to the DOM, which is what you see when you view a webpage (like this one). It's the parsed and rendered HTML and CSS. But it's more than that; it's a living, breathing thing. Javascript can manipulate the DOM, creating and deleting parts of it. This is how we add behavior to web applications.

At a higher level, the DOM is an agreed-upon set of terms for representing, updating, and querying information from documents. It's what enables CSS queries and DOM events. It's the raw stuff of the browser that all web developers are familiar with.

Over time, JavaScript development on the web has gotten better, and we've learned how to do some pretty cool things. We've used libraries like jQuery to iron out cross-browser issues, and we've built plugins to make our UIs more interactive. But most of these innovations are related to GUI programming - because most of the time, we're building user interfaces for web applications.

But we want to create data visualizations. And data vis isn't quite the same as building GUIs. It's about mapping data (a time series dataset) to elements on the screen (bars, circles, or points).

Building visualizations with tools that are suited for GUI programming is difficult and verbose. For example, if we were to set the heights of some hypothetical bars that exist in an HTML document with vanilla JavaScript, it'd look something like this:

```js
var nums = [80, 53, 125, 200, 28, 97];

var bars = document.getElementsByTagName("rect");
for (var i = 0; i < bars.length; i++) {
  var bar = bars.item(i);
  bar.setAttribute("height", nums[i]);
}
```

With d3, its

```js
d3.selectAll('rect')
  .attr('height', function(d, i) {return nums[i];});
```

In addition to being less code, the second apparoch has a few benefits:

  - D3 embraces [declarative programming](http://en.wikipedia.org/wiki/Declarative_programming), and we can see that here: we're able to set the height for all elements in the set using `.attr`, rather than having to set them individually using a `for` loop. Declarative code abstracts away implementation details, making complicated transformations easier to reason about. It's a powerful paradigm, but definitely takes some getting used to.

  - We're getting a little ahead of ourselves, but as you can see we're using a function to set the heights. And the function is smart; it _knows_ about our data, and makes the relevant datum (and index) available to the transformation. This is the standard way we set attributes of elements that are bound to data.

So D3 is really about giving us an API that's well-suited for DOM creation and manipulation, based on the data; hence the name Data-Driven Documents. 


What D3 isn't
-------------
It may surprise you to learn that D3 doesn't come with any prebuilt visualizations; there's no `d3.barchart`, for instance. That's because D3 aims to be low-level and flexible. There are many excellent charting libraries out there, and several built on top of D3. If your goal is to render a few standard charts as quickly as possible, you may want to consider using a library instead of writing them by hand.

D3 is also not a compatability layer, though it does take care of a few cross-browser quirks. D3 is built to work in modern browsers.

Finally, you should know that D3 is about web standards. Recall that the first D in D3 refers to the DOM. That's web standards talk: HTML, CSS, and JavaScript. There's no new technology here, no Flash, Java applets or proprietary plugins. D3 works in any modern browser on any device, out of the box. So learning D3 involves learning about web standards and modern web development.


Can D3 help in the context of big data?
---------------------------------------
Because it is low-level, D3 may seem like a bad fit for big data analysis. Indeed, it won't help you run gigabytes of data through a model; but once you use some other tool to do this, D3 can help you make sense of the result.

Recall the two primary uses of data visualization: explanation, and exploration.

If you have a unique insight about a dataset, D3 gives you the control to communicate it effectively:

  ![Nominees connections](/images/posts/2014-03/intro-d3-nominees.png)

This screenshot is taken from a [New York Times interactive](http://www.nytimes.com/interactive/2013/02/20/movies/among-the-oscar-contenders-a-host-of-connections.html?_r=0), and shows various relationships among Oscar nominees. These authors could have written an article, but instead used data vis to create a compelling (and beautiful) diagram to communicate their insights. This is a pretty unique visualization - and the point is, it's not found in Excel's built-in charts.

So if you have a specific idea or concept you want to explain - which people in big data often do - learning D3 can give you the power to do so in a unique and effective way.

Second, if you're focused on exploring data, D3 can be useful - but don't underestimate the learning curve. If you need to crank out a dozen pie and bar charts by the end of the week, you probably shouldn't write them from scratch using D3. Instead, use a library with built-in visualizations, like [Rickshaw](http://code.shutterstock.com/rickshaw/), [Highcharts](http://www.highcharts.com/) or [NVD3](http://nvd3.org/).

Sometimes, though, existing solutions aren't enough, and you need a custom way to explore your data. Remember the calendar chart from above? It was very useful for detecting trends, and also probably not available in Excel. So D3 can be a valuable aid in data exploration, because it gives you control over the representation of your data, and adds interactivity.


Alright, enough ceremony. Lets learn it!


Learning D3
-----------
This tutorial won't cover all the different parts of the D3 toolbelt; there are plenty of existing resources that do that. Instead, it will introduce some of the library's main conceptual hurdles: selections and data bindings. Once you get a handle on these, the code in the [scores of community examples](https://github.com/mbostock/d3/wiki/Gallery) should make much more sense, and with [D3's documentation](https://github.com/mbostock/d3/wiki/API-Reference) by your side you'll be equipped to start working on your own.

I like learning through examples, so in this tutorial we'll build a simple bar chart:

<div id="chart1"></div>

Not as exciting as some of the examples you've seen, I know. But its simplicity will help us focus on D3's primitives.

The chart is rendered in SVG; open up the inspector (`Command-Option-I` on Mac, `Ctrl-Shift-I` on Windows) and see for yourself:

  ![inspector](/images/posts/2014-03/intro-d3-inspector.png)

The SVG is right there in the DOM, the same place as the rest of this document. Its parsed and ready to style and manipulate.

D3 is not just about SVG; we can use it to create an HTML table, for instance. But SVG lets us do all the cool stuff we see in other visualizations.

### Selections

To start out, say our initial document is

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

<aside>We're referencing a local copy of D3 here; you can also link directly to the latest release with `src="http://d3js.org/d3.v3.min.js"`.</aside>

The data driving this chart is

```js
var nums = [80, 53, 125, 200, 28, 97];
```

Now, the bars are actually SVG `<rect>` elements. To render an SVG rectangle, we first need an `<svg>` container element. Let's add one to the DOM:

```js
d3.select('body').append('svg');
```

Breaking this down, `d3` is the D3 global object - think `$` from jQuery. And also similar to jQuery, `d3` lets us select elements in the DOM. Here we're selecting the `<body>` element.

Selecting something in D3 produces a [D3 selection](https://github.com/mbostock/d3/wiki/Selections). **Selections** are at the heart of D3; we'll see their full power soon. For now, just think of a selection as an object that wraps a DOM element and provides some useful methods. (Aside?) For instance, you can change CSS properties:

```js
d3.select('body').style('background-color', 'blue');
```

Above, we used the `append` method on a selection to create an `<svg>` element. Because we typically append things to the DOM in order to do something with them, D3 conveniently returns a new selection after a call to `.append`. This new selection wraps the newly created element, letting us write the following:

```js
var svg = d3.select('body').append('svg');
```

Now, we can work with this local variable `svg`, just as if we had written `d3.select('svg')`.

It's time to create some `<rect>` elements. We could just `append` them, like we did the `svg` element. We have six data points, so let's append six rectangles:

```js
// Recall, var nums = [80, 53, 125, 200, 28, 97];

svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
svg.append('rect');
```

Indeed this works - you can try it yourself in the inspector. But this is D3, and the whole point is to use the data to drive the creation of our documents. Clearly, this solution falls short.

### Selecting arrays of elements

Before we see how it's really done, we need to learn more about selections. 

We've seen `d3.select` used on single elements, like `d3.select('body')` and `d3.select('svg')`. But there's another method in D3 that produces a selection: `d3.selectAll()`. This selection wraps an _array_ of all matching elements, instead of just the first matched element on the page. For example,

```js
var paragraphs = d3.selectAll('p');
```

returns a D3 selection wrapping all `<p>` tags on the page. 

Even though these selections wrap arrays of element, the selection itself is still singular; there is only one selection. So, what is a selection, really? We can select single elements, or groups of them, but what does the selection itself represent?

Think of selections as higher-level than the DOM elements themselves. A selection is a managing object that references some set of elements in the DOM; it knows details about them, and can apply transformations to them, but it also knows more.

**Understanding selections is central to using D3.** It takes some time to wrap your head around them, so after playing with the code a bit, be sure to read as much as you can about them from the docs and other tutorials.

Now, remember when we changed the color of the `<body>` element earlier? If you wanted to do that for all the paragraphs in our page, you might try something like this:

```js
paragraphs.forEach(function(p) {
  p.style('background-color', 'green');
});
```

But this is not how we do things in D3. Remember, a selection should be thought of and acted upon as a single managing object. So when it comes time to transform elements in the DOM, you operate on the selection itself:

```js
paragraphs.style('background-color', 'green');
```

The selection applies the transformation to each element it references.

This style of programming is called _declarative programming_, because we declare our intention (_what_ we want to do), rather than imperative programming, where we write out each step our program takes to accomplish a given task (_how_ to do it). 

As you can already see, declarative programming is a powerful abstraction that  reduces complexity and opens the door for more powerful code. It is the programming style D3 has adopted.


### Selecting no elements

We now come to an interesting twist. Say our DOM looks like this:

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

We can use `selectAll` to grab the bars:

```js
var bars = d3.selectAll('rect');
```

which gives us a selection that wraps all six elements in the page. But what if we had selected the bars before we appended them? Say our DOM looked like this

```html
<body>
  <svg>
  </svg>
</body>
```

and we wrote this

```js
var bars = d3.selectAll('rect');
```

Clearly, we're selecting something that doesn't exist, so it will return null - right? It's as if we applied a CSS rule to a `#home` element that doesn't exist, or used jQuery to find all the `<h5>` elements - `$('h5')` - but none are in the DOM. So we should get a null response, an empty set, a vacuous solution.

Actually, even though our selection _is_ empty, the return value is not vacuous. Remember, selections are higher-level than the actual DOM elements. In this case, `bars` doesn't reference anything that actually exists in the DOM; but it still _represents_ an array of `<rect>` elements.

So, you can think of selections as having two pieces:

<div id="selections1"></div>

The first is this Platonic piece that represents elements in the abstract; think, _a single body tag_, or _an array of rect elements_. These things don't actually exist anywhere. The second piece is the actual set of elements the selection matched in the current DOM - for example, the six `<rect>` elements that we can see in the inspector, right now. 

Having both pieces is the key to how D3 operates.


### The data join and subselections

As you may have guessed, D3 can compare both parts of a selection - the elements that the selection represents, and the elements that the selection matched in the DOM - and tell us how they're similar, and how they're different.

The elements matched in the DOM simply come from the DOM - so getting them is easy. But how does D3 know what our selection should represent? So far, it has either represented a single element, or an array of elements. But how big is the array? And what are the actual elements of the array which the selection refers to? _An array of rect elements_ is very different from _an array of three rect elements whose values are 2, 5 and 10_.

This is where the **data join** comes in. The data join gives us a way to specify exactly what our selections represent. We use it like this:

```js
var nums = [80, 53, 125, 200, 28, 97];

var bars = svg.selectAll('rect')
  .data(data);   // there it is!
```

Now we have a selection, but one that is bound to data. D3 knows _exactly_ what that selection represents: an array of six different `<rect>` elements, each which maps to the corresponding integer in the array (the first `<rect>` corresponds to 80, the second to 53, and so on).

Now that D3 knows exactly what our selection represents, and it also knows what's currently in the DOM (since it performed a `.selectAll()`), it can tell us what's similar and what's different between these two pieces. It does this by creating **subselections**: selections that represent a subset of the original selection. There are three subselections in D3: **enter**, **exit**, and **update**:

<div id="selections2"></div>

<aside>Adapted from http://bost.ocks.org/mike/join/</aside>

The names are appropriate: 

  - **enter** refers to elements in the data that were joined to our selection, but are not currently in the DOM. Typically these elements will be entering the DOM via `.append()` - hence the name _enter_.

  - **exit** refers to elements in the current DOM, but not in the data that was joined to the selection. Typically these will be exiting the DOM via `.remove()`.

  - **update** refers to elements in both groups, but which may have certain properties that have changed.

So how does this look in practice? Recall what we're trying to do: create bars. We're working with the following selection,

```js
var nums = [80, 53, 125, 200, 28, 97];

var bars = svg.selectAll('rect')
  .data(data);
```

but the `<rect>`s don't exist in the dom. That means there are six rects in our enter subselection. We access them like this:

```js
bars.enter()
```

Now we have a hold of the new elements, and we can do whatever we want with them. In this case, for each element in our representation, we want to append an actual `<rect>` element to the DOM:

```js
bars.enter().append('rect');
```

If you try this out yourself, the DOM will be what you expect.

```html
<body>
  <script>
    var nums = [80, 53, 125, 200, 28, 97];

    var bars = svg.selectAll('rect')
      .data(data);

    bars.enter().append('rect');
  </script>

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

Congratulations - you've just created your first data-driven document!


### Data is stored in the DOM (is it?)

You may be thinking that the data used in the join is stored in D3 somewhere. In fact, when the elements are inserted into the DOM, D3 actually stores the data as attributes on the elements themselves. You can see this in the inspector:

    [image]

This leads us to another fact about selections: **selections are transient.** If you ever need to reselect elements that have been inserted into the DOM, you simply reselect them:

```
d3.selectAll('rect')
```

Inspect those in the console, and you'll see the data. You can also call `d3.selectAll('rect').data()`, to return the original array.

And with that, we're over the hump! Selections are the main hurdle in D3, and as you practice with them, the rest of the library will make much more sense.

### Some data-driven transformations

Ok, so now we have data-bound `<rect>` elements in the DOM. This is exciting, because now we can apply additional data-driven transformations, and complete the chart.

First, while the elements exist, they don't actually render anything out because they don't have a width or height. Lets set them, to see what we're working with:

```js
d3.selectAll('rect')
    .attr('width', 20)
    .attr('height', 20);
```

We see something! But they're all lined up. What's going on? [inspector]. They're all there, for sure. But we haven't moved them.

Now finish the chart.


More resources
--------------


<script src="/js/d3.v3.min.js"></script>
<script>
  var width = d3.select('.content').style('width').replace("px","");

  var nums = [80, 53, 125, 200, 28, 97];

  // #chart1
  var svg = d3.select('#chart1').append('svg')
    .attr('height', 200)
    .attr('width', 200)
    .style('display', 'block')
    .style('margin', '0 auto');
  svg.selectAll('rect')
      .data(nums)
    .enter().append('rect')
      .attr('width', 20)
      .attr('height', function(d) {return d;})
      .attr('y', function(d) {return 200 - d;})
      .attr('transform', function(d, i) {return 'translate(' + i*30 + ', 0)';});

  // #selections1
  var selections1 = d3.select('#selections1').append('svg')
      .attr('width', width)
      .attr('height', 100)
  selectionsLabel(selections1);
  
  // #selections2
  var selections2 = d3.select('#selections2').append('svg')
      .attr('width', width)
      .attr('height', 350)
  selectionsLabel(selections2);

  var rep = selections2.append("g").attr("transform", "translate(280, 220)").classed('circles', true);
  rep.append("circle")
      .style("fill", "#3182bd");
  rep.append("text").attr("x", -50).text("Enter");
  rep.append("text").attr("x", 60).text("Update");

  var dom = selections2.append("g").attr("transform", "translate(400, 220)").classed('circles', true);
  dom.append("circle")
      .style("fill", "#e6550d");
  dom.append("text").attr("x", 50).text("Exit");


  selections2.selectAll(".circles text")
    .style('text-anchor', 'middle');
  selections2.selectAll(".circles circle")
    .style('opacity', .25)
    .style("stroke", "black")
    .style("stroke-width", "2px")
    .attr("r", 110);



  function selectionsLabel(svg) {
    var label = svg.append('g')
        .attr('transform', 'translate(' + width/2 + ',20)');

    label.append('text').text('Selection');
    label.append("text").text("Representation")
        .attr("y", 65)
        .attr("x", -100);
    label.append("text").text("Current DOM")
        .attr("y", 65)
        .attr("x", 100);

    label.selectAll('text').style('text-anchor', 'middle') .style('font-weight', 'bold');

    label.append('line')
        .attr('x1', -30)
        .attr('y1', 10)
        .attr('x2', -90)
        .attr('y2', 40);
    label.selectAll('line').style('stroke', 'black').style('stroke-width', 2);
    label.append('circle')
        .attr('cx', -90)
        .attr('cy', 40)
        .attr('r', 3)
        .attr('stroke', 'black')

    label.append('line')
        .attr('x1', 30)
        .attr('y1', 10)
        .attr('x2', 90)
        .attr('y2', 40);
    label.selectAll('line').style('stroke', 'black').style('stroke-width', 2);
    label.append('circle')
        .attr('cx', 90)
        .attr('cy', 40)
        .attr('r', 3)
        .attr('stroke', 'black')
  }

</script>


---

[1]: Source: http://www.apple.com/pr/library/2013/10/28Apple-Reports-Fourth-Quarter-Results.html?sr=hotnews.rss