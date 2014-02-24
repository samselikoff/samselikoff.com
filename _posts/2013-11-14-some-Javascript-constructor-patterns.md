---
layout: post
title:  "Some Javascript constructor patterns, and when to use them"
categories: Javascript
published: true
---

As I've been writing more and more JavaScript, I've learned something about the community: Javascripters like to do things differently. Ask two developers, or look at two different popular open-source projects, and you'll probably come across two different solutions for doing the same thing, whether it's as trivial as writing getter/setter methods or as complicated as loading modules. Sometimes I'm able to find a consensus around these solutions, but often I get lost among the alternatives, and find it difficult to determine which is most appropriate for my specific use case.

One example is writing constructors. I've come across several ways to do it - but which way is right? Why do some libraries choose one method, and some another? In this post, I'd like to explore some of the techniques I've encountered for writing constructor functions, their pros and cons, and when to use them.

Generic advice - using the `new` keyword (Mozilla)
--------------------------------------------------

If I had to describe the 'standard' constructor pattern I've seen, it's probably this:

{% highlight javascript %}
// The constructor - like a class, but actually, not really
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.fullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
}

// Use it like this:
var sam = new Person('Sam', 'Selikoff');
sam.firstName;    // "Sam"
sam.fullName();   // "Sam Selikoff"

sam.firstName = 'Samuel';
sam.fullName(); // Samuel Selikoff
{% endhighlight %}

This looks a lot like something you'd see in other languages - but don't get too comfortable. If you instantiate two objects this way, they won't necessarily always have the same properties and methods. This is because Javascript lets you mutate objects at run-time:

```js
// Add a gender property to this instance only
sam.gender = 'male';
```

You are also able to change existing methods and properties on your objects, and this may lead to behavior you don't expect. For example, if you changed the `fullName` method on a single object, those changes wouldn't be shared across other objects. This is because the `fullName` method is an anonymous function that's attached directly to an instance variable. Each object will get its own copy of the function.

If you wanted the function to be shared across all `Person` objects, you could do it like this:

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + ' ' + this.lastName;
};
```

This constructor shares the `fullName` method across all instances. But how does it work?

Some Javascript eccentricities
------------------------------

Whenever we create objects using the `new` keyword (as we've been doing), those objects get a special reference to the `Person.prototype` dictionary. (In Javascript, dictionaries are synonymous with objects, but I'm using the term here to describe objects that are used mainly as key-value references). Prototypes in Javascript give objects a chain of dictionaries used to look up methods. This means that if we call a method on an object, but that method isn't defined directly on the object, Javscript will look for the method in the next level of the object's *prototype chain*. If it finds it, it will invoke the method; if not, it will keep looking up the chain.

In our first example, we didn't define a prototype on the `Person` constructor, so all instances of `Person` had prototype chains that were only one level deep, so to speak; that is, they only contained the default `Object.prototype` dictionary. This dictionary contains methods that all objects tend to have in other languages - `toString`, for instance.

In our second example, we explicitly created a dictionary on the `prototype` property of the constructor. The `new` keyword is aware of this property: it is designed to check if there's a dictionary at `.prototype`, and if there is, it adds it to the prototype chain of the object it's currently instantiating. This means that when we call `sam.fullName()`, Javascript first looks (unsuccessfully) for the method directly on the `sam` instance, and then moves on to the next level of `sam`'s prototype chain, which is the dictionary we created. Because that dictionary *does* have the `fullName` method, that method gets invoked. And because all objects that get instantiated from the `Person` constructor have a reference to the same prototype dictionary, they all refer to the same method. So this is how we can share methods across objects.

Before moving on to the next pattern, we should cover our use of the `this` keyword. I'm sure you've come across many JavaScript posts outlining the dangers of being ignorant of `this`. We use it in the above construct - so what do we need to be careful of?

First, a brief overview. `this` is a keyword that's available in every Javascript function. It's really just a pointer. But what does it point to? **The `this` keyword points to the object that's invoking the current function.**

So, the `this` keyword is really just a pointer to an object. But the `new` keyword does something nice for us: it tells `this` to point to the object that's being instantiated. In this example from above,

```js
var sam = new Person('Sam', 'Selikoff');
```

`this` pointed to `sam` whenever it was used inside the `Person` constructor function. If we hadn't used `new`, though, `this` would have referred to the global object, since that was the object executing the constructor function. For example:

```js
var george = Person('George', 'Foreman'); // forgot 'new'
george; // undefined
```

Poor `george` is undefined! This is because when `Person` was invoked, `this` referred to the global object. That means these two lines within our constructor function

```js
this.firstName = firstName;
this.lastName = lastName;
```

really just created two new global variables, `firstName` and `lastName`. When `Person` finished executing, it returned `undefined` (which happened by default, since it didn't return anything). So `george` is undefined, and you've got two new globals - most certainly not what you intended!

Therefore, it's important to remember to use the `new` keyword when using this pattern. Typically, constructors are capitalized (and instances lower-cased) to remind developers of this rule.

Closures with getter-setters (D3.js, jQuery)
--------------------------------------------

We just saw that when using the above pattern, you need to manage the context of `this` by using the `new` keyword. If this troubles you, there is another technique which avoids `this` altogether.

Here's an example of how it's used:

```js
function Person(firstName, lastName) {
  var _firstName = firstName,
      _lastName = lastName;

  var my = {
    firstName: _firstName,
    lastName: _lastName
  };

  my.fullName = function() {
    return _firstName + ' ' + _lastName;
  };

  // Getter/setters
  my.firstName = function(value) {
    if (!arguments.length) return _firstName;
    _firstName = value;
    
    return my;
  };

  my.lastName = function(value) {
    if (!arguments.length) return _lastName;
    _lastName = value;

    return my;
  };

  return my;
}

// Use it like this:
var mark = Person('Mark', 'Twain'); // note: no `new` keyword!

mark.firstName('Samuel');
mark.lastName('Clemens');

mark.fullName(); // Samuel Clemens
```

I was confused about this pattern when I first encountered it; the first pattern seems much more intuitive and familiar. But notice that since we never use `this`, we simply don't have to worry about managing its context. No matter where we call `mark.fullName()`, or `mark.firstName('Mark')`, the instance variables we're manipulating (`_firstName` and `_lastName`) will be the correct ones.

It turns out that the biggest benefit of this technique has nothing to do with `this`, though. Rather, it's the ability to give your objects private properties and methods. In the example above, as you may have guessed, `_firstName` and `_lastName` are not publically accessible:

```js
mark._firstName;
// undefined
```

How does this work?

Typically, when a function finishes executing, the variables declared within that function fall out of scope and get destroyed. But there's an exception: if any code outside the function holds a reference to these variables after the function finishes executing, they won't be cleaned up. Instead, a closure will be formed, and those variables will remain in memory.

In the example above, since the `Person` constructor function returns the inner object `my`, and since `my` refers to the local variables `_firstName` and `_lastName` (both in the getter/setters and in the `fullName` method), the variables are not destroyed. When the getter/setters are invoked, they are operating on those same local variables. 

But why do this? Why go through this bizarre set of steps just to create what are essentially instance variables on an object - something we already know how to do? The difference between the local variables that the closure has access to and the instance variables on the objects we made earlier is that *the outside world does not have direct access to the local variables*.

In the objects from our first pattern, anybody with a reference to the `sam` object could change the `firstName` property to anything he pleases: 

```js
sam.firstName = 'Peter';
```

But the only way to access the variables using the current technique are through the getter/setter methods that we attached to `my`. By attaching those methods to `my`, we made them public; but the local variables themselves remain private. We can now add validation and other logic to our getter/setters, giving us more control over our object's interfaces.

So we see that closures with getter/setters give us the ability to have private properties and methods, a feature of OOP we've come to expect from other languages.

The best of both worlds?
------------------------

As we've seen, prototypes (from the first pattern) give us method sharing, and closures (from the second pattern) give us private properties. A natural follow-up question is: can we have both?

It turns out the that there's no way for shared methods that live on the constructor's prototype to access the object's hidden, private properties. This means that you effectively have to choose one or the other. But which one should you choose, and why?

If performance is crucial - for example, if you plan on making thousands of objects - you'll want to go with prototypes and shared methods. Removing redundant copies of methods is going to be a suggestion that any consultant or book on performance will make.

On the other hand, if the object you're making is large and complex, and is designed mainly for public consumption, the flexibility that comes with having private properties and methods will probably win out, and you'll want to take advantage of closures. This is why libraries like jQuery and D3 tend to use closures: users will almost certainly only be using one instance of the library, which means that method sharing becomes less of an issue.

As a clarifying note, you can certainly use prototypes and closures on the same object. But only the closures - which are *not* shared across instances - will have access to your object's private variables. The shared methods on the object's prototype will not.

Custom constructors (Ember.js, Backbone.js, etc.)
-------------------------------------------------

Sometimes when making objects within a framework or library, you'll avoid native Javascript constructors altogether. This allows the library to have more control over the objects in your application.

In Ember, for example, you define objects by extending the base `Ember.Object` object, and then calling the `create` method on that object. You set properties by passing them into the constructor.

Here's how it works:

```js
Person = Ember.Object.extend({
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }
});

var tim = Person.create({
  firstName: "Tim",
  lastName: "Tebow"
});

tim.fullName();
// Tim Tebow
```

Custom methods like this may feel unnecessary or cumbersome, but they give a lot of power to library authors.

For example, one of Ember's core features is its data bindings system, which requires that each object in an application have the ability to observe the properties of other objects. By giving developers a custom constructor function, Ember can implement this functionality in a consistent and controlled way, without requiring developers to write additional code just to mix in the behavior. So in this case, the custom constructor simplifies use of the framework for Ember developers. Underneath the hood, these custom constructors are simply wrappers around one of the two methods we covered.

So depending on what you're designing and who you're designing it for, a custom constructor function may be the way to go.

No constructor, a.k.a. the object literal
----------------------------------------

Of course, you can always create an object using no constructor at all:

```js
var sam = {
    firstName: "Sam",
    lastName: "Selikoff",
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
}
```

This is known as an object literal. But you probably are interested in writing constructors because you plan on making many objects. Object literals won't help you there - but they do have plenty of uses, including storing configuration settings or raw data, or reducing the number of globals in your library.

Summary
-------

The takeaway is that there are many ways to create objects in Javascript, each with its own costs and benefits. It's good to know the kinds of things these patterns let you accomplish, and how other developers have used them, so you can decide for yourself when a technique is appropriate in your own work.

Here's a recap of what we discussed. Hopefully the next time you need to make some objects, you'll be better equipped to choose the appropriate method:

  - **Prototypes** let you share public methods across objects. (They also let you use inheritance).

  - **Closures** let you have private properties and methods. They are often used in libraries. (Closures are part of a larger pattern called the Module pattern).

  - **Custom constructors** can be useful when building specialized APIs.

  - **Object literals** are often used to store and pass around isolated chunks of data, like configuration settings or the parameters to an AJAX request. They can also help reduce the number of globals in your code.

Learn more
----------

  - [Mozilla: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) 
  - [A great SO answer on the `new` keyword](http://stackoverflow.com/a/3658673/1406664)
  - [Yehuda Katz: Understanding prototypes in Javascript](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
  - [Mozilla: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
  - [Eric Miraglia, a Yahoo engineer, describes the Module pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/)
  - [Mike Bostock, the author of D3, suggests using closures to build reusable charts](http://bost.ocks.org/mike/chart/)
  - [Douglas Crockford: Private Members in Javascript](http://www.crockford.com/javascript/private.html)