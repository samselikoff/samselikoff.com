---
title: Injecting a global variable into your Ember classes
date: 2014-12-23
---

Ember CLI has brought the wonderful world of ES6 modules to my daily development. Sometimes, though, my apps still rely on globals.

I was working on an app that needed to connect to a node server over web sockets. I created a websocket service to handle the socket events, and the service used [Socket.IO](http://socket.io/). The only way (at the time of this writing) to bring SocketIO into a project was via a global, so one of my files ended up looking like this:

```js
//some-file.js

/* global io */ // <---- gahhh!

export default Ember.Object.extend({
  someMethod: function() {
    io.connect("somewhere-great")
  },
})
```

That `window.io` just kills me.

To make it disappear, we'll use an [initializer](http://emberjs.com/api/classes/Ember.Application.html#toc_initializers). Initializers give us the opportunity to register new classes or objects into Ember's container. We're essentially defining an `io` factory: we're teaching Ember how to get an `io` object whenever one of our classes asks for one.

## Writing the initializer

With Ember CLI, create an initializer like this:

```
ember g initializer register-socket-io
```

That creates a file under `/app/initializers/register-socket-io.js`. Within the `initialize` method, we can register the global variable `socket.io` into Ember's container:

```js
app.register("io:main", window.io, { instantiate: false })
```

Here we set `instantiate` to false. This is because by default, registered factories are instantiated via `#create` (read more [here](http://emberjs.com/api/classes/Ember.Application.html#method_register)). But the global SocketIO variable is already instantiated and ready to use. We don't need Ember to instantiate it for us.

Now that we've registered `io:main` within Ember's container, we can inject it into whichever other classes need it. In my case, my websocket-service needed `io`:

```js
app.inject("service:websocket", "io", "io:main")
```

The first arg is which class we're injecting into, the second is the local property name we're assigning within that class, and the third is the thing in the container we're assigning to that property.

Now from within my `service:websocket` object (defined elsewhere), I can simply access SocketIO via `this.get('io')`. No more `/* global io */`! It's injected directly into the class.

Here's the entire initializer:

```js
export default {
  name: "register-socket-io",
  initialize: function(container, app) {
    app.register("io:main", window.io, { instantiate: false })
    app.inject("service:websocket", "io", "io:main")
  },
}
```

## A seam for testing

A neat side effect of this is that we now have a seam in our code between the websocket service and the SocketIO library. This gives us the ability to stub out SocketIO in our tests, which makes our tests more predictable, isolated and fast.

Now, go forth and inject!
