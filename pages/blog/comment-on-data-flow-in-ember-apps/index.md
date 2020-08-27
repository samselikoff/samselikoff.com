---
title: "Comment on data flow in Ember apps"
date: "2015-09-19"
---

Here's a comment I wrote in response to [this article](http://www.thesoftwaresimpleton.com/blog/2015/03/13/ember-reflux/) on data flow and state management in Ember applications.

---

Thanks for writing this up! Interesting thoughts.

I personally haven't been bit by Ember Data like others have. To me, Ember Data's store is very similar to a flux store - an identity map that any piece of your system can access rather simply. I've started moving actions that mutate Ember Data state to my models. For instance, `user.createPost()` or `user.saveAll()` (to save a graph of objects). I find putting data-only related methods in the data layer provides the same benefit you describe above: pulling it "out" of the UI component hierarchy, making refactoring much easier and eliminating action-sending boilerplate. Ember Data's identity map + Ember's bindings feel like a flux store implementation with a really nice API.

Then, there's non-Ember Data application state. Where should this live? I actually think it's okay to have a few different options. I think the community needs to provide some better guidance around when to use which, but personally I think going completely all-in on lots of little flux stores for every bit of application state is overkill.

If I have a `<panel>` in some component, and it has an `isOpen` boolean, just store that state on the component, and use local `actions` to mutate it. Easy enough.

If I have a series of `<panels>`, and some other template needs a `<button>` to `expandAllPanels`, well now we're in more complex territory. We have application state that's somewhat complex (array of booleans representing which panels are open), and it has nothing to do with persistent state, so we can't leverage Ember Data's identity map. The typical rule with DDAU is to put this state at the lowest point in our component hierarchy that's still above every component that needs it, and declare that component the "owner". Then, the owner passes the data down to everyone else who needs it, and handles actions that mutate it. But, as you say, using our component UI hierarchy to pass around actions like this is brittle and painful. Many components end up being just middlemen for action handling, which makes refactoring difficult. Closure actions will help here, but they still add a lot of noise.

In these situations, I like to use an Ember.Service to hold the app state. This is essentially another way to create a little flux store in my application. I could make a `companyPanels` service (say if I was dealing with a list of companies), and all the routes/components could inject that service if they needed to know the current state, or mutate the state. So individual components that render a `<company-panel>` could have an action that does something like `this.get('companyPanels').open('some-company')`. The `<button>` that needs to expandAll could do `this.get('companyPanels').openAll()`. And each panel could get its `isOpen` status from the service as well. Now, you have all your state for this complicated piece of ui in a single place, and an easy way for components to get or mutate it. Again we have something that gives us most of the benefits of the flux architecture, with a nice API (since we're just leveraging Ember's DI system).

Finally, I think computed properties can be extremely useful, mostly on an individual component level. Component macros are essentially functional transforms, and if we eschew them completely we'll end up rewriting a lot of that code for little gain. I think people can go crazy with CPs, but I find adding some filters and sorts to a component via the packaged Ember.computed CPs is a concise, declarative way to transform data.

Overall, I sympathize a lot with your thoughts, but don't think we need to throw out the baby with the bathwater. I think we can incorporate a lot of principles from flux/react into our Ember apps via Ember Data's store and Services, and just tie simpler application state to component lifecycles. A unified message around this would help address a lot of the pain people feel in more complex Ember applications.
