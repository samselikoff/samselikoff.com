---
layout: post
title:  "When to traverse an object graph"
categories: programming
published: true
---

I've been refactoring a .NET app for the past several weeks. It's my first time really digging into a desktop app, and the architectural similarities with Javascript applications are surprising. Each type of app, being long-lived, requires management of a UI that is typically nested, which in turn raises some interesting questions regarding object responsibility.

<!-- more -->

One 'rule' I've found many Javascripters agree on is that child UI elements should never reach into their parents. So, a UserCollectionView object may render a `<ul>`, and many UserView objects would render their own `<li>` elements; but an individual UserView would never reach into the parent collection to, let's say, check whether another user was currently selected. That's probably a code smell, pointing to the need for a `selectedUser` property on the collection.

So, from my time building front ends in both Javascript and .NET, I've developed an instinct for not reaching into parent objects. Recently, though, I've been working on some back-end code with a fairly complex object graph, and many times I've found it appropriate to reach from child objects into their parents. For example, say I have a business contract, and I need to know what the previous contract was, in order to calculate a fee change. To me, it seems completely appropriate to reach into the parent company, look for the latest contract before this one, and get some data from it. A contract should know its own fee change. However, each time I've deemed it appropriate, I've also had to fight a visceral urge to stop myself.

So, what's going on here? Even if you disagree with me in this particular case, what are some of the general 'rules' that guide this kind of reaching across object relationships? Do the responsibilities for objects in parent-child relationships change so drastically when those objects belong to a GUI, rather than a business domain? What rules apply to *all* objects in parent-child relationships? Are there rules more specific than looking out for [feature envy](http://sourcemaking.com/refactoring/feature-envy) in our objects?

I welcome your thoughts.