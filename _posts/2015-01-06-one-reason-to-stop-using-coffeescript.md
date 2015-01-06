---
title: One reason to stop using CoffeeScript
---

CoffeeScript is a great language, but it has started to fall out of favor in the JavaScript community. One reason why is that by using CoffeeScript, you're unable to take advantage of many new JavaScript language features. This is important, because in recent years JavaScript language development has been picking up speed.

This happens because CoffeeScript has no guarantee that its keywords won't be commandeered by future versions of JavaScript. Since CoffeeScript is designed to replace JavaScript rather than supplement it, this can cause problems.

For example, CoffeeScript introduces the `for..of` loop, a simple way to iterate through an object's keys and values. It looks like this:

```coffeescript
yearsOld = max: 10, ida: 9, tim: 11

ages = for child, age of yearsOld
  "#{child} is #{age}"
```

But ES6, the next version of JavaScript, introduces its own `for..of` loop. It looks like this:

```javascript
for (var [child, age] of yearsOld)
  alert(child + ' is ' + age);
```

Certainly, CoffeScript developers will want to take advantage of native JavaScript constructs whenever possible. So the question is, as browser support for JavaScript's native `for..of` loop grows, how will CoffeeScript code be able to start using it?

One thought is to update CoffeeScript's compiler so that CoffeeScript's existing keywords target the new native constructs. Unfortunately, the implementations from the two languages are slightly different. This means that if CoffeeScript simply started targeting new JavaScript language constructs with its current keywords, it would break existing CoffeeScript code; that is, ES6's `for..of` loop is not a drop-in replacement for CoffeeScript's. So, this is not really an option.

Another possibility is for CoffeeScript to introduce new keywords to target the new JavaScript syntax. But this means CoffeeScript would have two different keywords for `for..of` loops in the language. This would be confusing, not only because there would now be two options for accomplishing nearly the same thing, but also because the options differ in semantics. 

Finally, one could use CoffeeScript's "escape hatch," the back tick operator, which lets you write native JavaScript code within CoffeeScript. But, this would also be confusing, since your codebase would now have CoffeeScript's version of `for..of` in some places and JavaScript's in others.

**The takeaway**

Because CoffeeScript is neither a superset of JavaScript (as C++ is of C) nor a strict subset of future versions of ECMAScript (like JavaScript itself is, by definition), it runs the risk of having its keywords comandeered by new native language constructs. This is already happening in ES6 with the `for..in`, `class` and `super` keywords.

As JavaScript continues to evolve, CoffeeScript developers run the risk of not being able to use an increasing number of native implementations. If CoffeeScript developers want to take advantage of these modern language features, they will eventually have to migrate their code to a new, backwards-incompatible version of the CoffeeScript compiler, or abandon CoffeeScript altogether.
