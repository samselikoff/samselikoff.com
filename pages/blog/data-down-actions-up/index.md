---
title: "Data down, actions up"
date: "2014-11-26"
---

Ember 2.0 is embracing some new patterns to ensure your apps stay clear and maintainable as they grow in complexity. One of these patterns is "data down, actions up." But what does that mean?

Here's a good way to think about it. Let's say we're making something like Trello, and our index route looks like this:

```js
//routes/index.js
export default Ember.Route.extend({
  model: function () {
    return this.store.find("card");
  },
});
```

We want to display the cards in our template:

```handlebars
<!-- templates/index.hbs -->

<div class='board'>
  {{#each card in controller}}
    {{card-summary card=card}}
  {{/each}}
</div>
```

> Note: Soon, this will simply be `each card in cards`. No more proxies.

We've made a `CardSummaryComponent` to wrap up the display logic for each card we're showing. Let's say this summary shows the title of the card, and has an "X" button in the top-right which lets our users delete the card. We can imagine writing something like this:

```handlebars
<!-- templates/components/card-summary.hbs -->

<div class='card'>
  <h2>{{card.title}}</h2>
  <span {{action 'removeCard'}} class='fa fa-remove'> X </span>
</div>
```

and the component code

```js
//components/card-summary.js
export default Ember.Component.extend({
  actions: {
    removeCard: function () {
      return this.get("card").destroyRecord();
    },
  },
});
```

Now, the problem here is that the `CardSummaryComponent` is deleting the data, but it's really the `IndexController` that _owns_ the data. Its the one that passed the `card` into the `CardSummaryComponent`, and now that component has gone and deleted its data right out from under its feet. This is sort of thing that becomes really difficult to trace in larger, more complex applications.

Note that in Ember 2.0, we wouldn't have an `IndexController` but rather a routable component. We don't know exactly how the API will shake out, but somehow we'd end up with a component that has an `attrs.cards` property from the server, which would be the array of cards. We'd probably then make a separate `CardSummaryListComponent` and do something like `{{card-summary-list cards=cards}}`.

In any case, back to the example. This clearly violates "data down", because there was a data change in a child component (`CardSummary`) which affected parent components (in this case the `each` block, in the alternative case the `CardSummaryList` component).

To revise this, first, pretend that you live in a world without two-way bindings. That is, when we render `{{card-summary card=card}}`, what's actually happening is the `card` from the parent scope is being "copied", and passed into component, which now has the data in its own isolated scope. Any change to `card` in the parent scope will re-push that data into the `card-summary` component, which is the "data down" part. But, if the `card-summary` component mutates its own `card` data, none of its parent components will be the wiser. That's one-way bindings.

But of course, we want those interactions in our child components to actually affect our real data. So, we use actions to send those messages back up our hierarchy. This is "actions up", and the idea is that our `card-summary` component is simply "notifying" its parent components that a certain action has taken place - "deleteCard", for example. It's up to the parent components to decide how they want to handle the actions their children are emitting.

In React, those parent components do this by explicitly passing their action handlers into their children. Something like this:

```js
//components/card-summary-list.js

// Here's the JSX template for a <CardSummaryList>
cards.map(function (card) {
  return <CardSummary card={card} onCardDelete={this.handleCardDelete} />;
});
```

Here, `CardSummaryList` is passing a handler down to its child. The `CardSummary` component can then simply invoke this handler in response to whatever event it chooses. The child determines the action, but the parent determines how the action is handled.

In Ember, we're used to doing something more along the lines of

```handlebars
<!-- templates/index.hbs -->

<div class='board'>
  {{#each card in controller}}
    {{card-summary card=card action='deleteCard'}}
  {{/each}}
</div>
```

and then writing the `deleteCard` handler within the parent. This is changing, for a few reasons (read the **Improving Actions** section of [the 2.0 RFC](https://github.com/emberjs/rfcs/pull/15) for more info). In 2.0 we'll be doing things similar to how React does it, by passing actions directly in:

```handlebars
<!-- templates/index.hbs -->

<div class='board'>
  {{#each card in controller}}
    <card-summary card=card deleteCard={{action "valueChanged"}}>
  {{/each}}
</div>
```

The `CardSummary` component will have access to that action via `attrs['deleteCard']`, and will be able to invoke it just like in React. This way, the child component is effectively delegating the event handler to the parent, without knowing anything about what that handler does. As an added bonus, the child can continue to pass the parent's handler further down to its own children - without the need for any `sendAction` boilerplate in the actual JS code.

---

This is a simple example of how "data down, actions up" should be influencing the architecture of your Ember apps. If you haven't already, I highly recommend spending several hours with React. It's a great way to learn about component-based architecture and immutability, two concepts that will be making a strong showing in Ember 2.0.
