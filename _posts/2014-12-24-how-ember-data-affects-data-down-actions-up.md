---
title: How Ember Data affects data down, actions up
---

In anticipation of Ember 2.0 I've been experimenting with writing one of my applications as a tree of nested components. Something like

```handlebars
<lesson-creator>
  <main-intro> .. </main-intro>

  <question-list questions=lesson.questions>
    {{#each question in lesson.questions}}
      <question-list-item item=question>
    {{/each}}
  </question-list>
</lesson-creator>
```

Building my app like this has forced me to think about how exactly data down, actions up (DDAU) should work in Ember.

In its most pure form, DDAU mandates capturing even `change` events on `<input>` fields, and using our components to handle the events in our data layer:

```js
// pseudo code
$('input').on('change', function(e) {
  e.preventDefault();

  this.send('updateValue', this.val());
});
```

The action is handled upstream, the data is updated, and the new data propagates back down to the `<input>` field and its val is updated.

Though I do see the elegance of structuring your entire application like this, it feels a bit like sacrificing pragmatism on the altar of DDAU. Indeed even React offers [a link helper](http://facebook.github.io/react/docs/two-way-binding-helpers.html), since the entire purpose of an `<input>` element is to mutate data.

So, maybe DDAU is more of a guiding philosophy than a rigid principle. But, what exactly is the philosophy? That two-way bindings are only allowed on input fields? I actually think the scope may be much broader than that.

In a React app, data is being passed around every which way. Each component has its own POJOs, and components render child components sending those POJOs in. One of the main points of DDAU is that parent components own their POJOs, and children shouldn't be able to mutate that data willy nilly from underneath their feet. This makes a lot of sense. The data is just free-floating data within the component's scope, and that component needs to have a guarantee that *it* decides when and how that data will change.

With Ember + Ember Data, though, we're not just dealing with POJOs. Ember Data's store gives us an identity map, and together Ember and ED are responsible for data consistency. I think this has implications for the "actions up" part of DDAU. For instance, say I'm working with an `<answer-list>` that's deeply nested somewhere within my app. This component takes a question and an array of answers (think a teacher writing a multiple-choice question for a test). The `<answer-list>` contains a button that allows the teacher to add a new answer to the question:

```handlebars
//components/answer-list/template.handlebars
{{#each answer in answers}}
  ...
{{/each}}

<button {{action 'addAnswer' question}}>Add a new answer</button>
```

Say I handle the action directly in the `<answer-list>` component, like this:

```js
//components/answer-list/component.js
...
actions: {
  addAnswer: function(question) {
    question.addAnswer(); // assume a method addAnswer exists on the question
  }
}
```

This clearly violates actions up, since whichever parent is rendering the `<action-list>` didn't send the event handler down. However, `question` here isn't simply some local POJO. While the property is in its own scope within the `<action-list>` component, it resolves to the same thing as its parent: a single, unique `question` model within Ember Data's store.

In some sense, this component directly invoking `question.addAnswer` is like sending a message straight to the "top" of our application. The question model creates a new answer model directly in the store, and all changes percolate down through our app's component hierarchy. It's almost like "actions up," except these components have a direct line of communication to the store.

The alternative is for the (say) `<multiple-choice-question>` parent to pass down a `handleAddAnswer` handler into the `<answer-list>`. But `<multiple-choice-answer>` isn't the originator of the question model either; it gets its data from above, and so on, all the way up to the route.

The question is, with Ember Data's identity map, does it really make sense to require that these types of event handlers be defined in the tops of our component trees?

Consider something even more specific: an `<add-answer-button>`. This is a component that's part of our application's domain. Should it know how to add an answer to the `store`? When other developers look at our app and see that component, are they going to be confused about where the new answer is coming from?

Ember allows us to build complex, dynamic UIs. I know personally as I develop Ember apps, the UI changes a lot. "Refactoring" is often rearranging UI elements, for purposes of either styling or functionality. But if I write an `<add-answer-button>`, I'm going to want it to add an answer when the user clicks on it, regardless of where I put it. However, if I require the handler be sent in, refactoring the UI will mean touching many other templates to ensure the action is passed down.

This is even more true for something like a `<logout-button>`. I want this button to logout a user and redirect to the index route, regardless of where I put it. If it happens to be nested within a `<question-list`, is it really necessary to turn `<question-list>` into a middleman for the action handler?

Part of me is playing devil's advocate here, but part of me really thinks the store obviates the need for strict adherence to DDAU. We're using components to divy up our UIs. The store is responsible for data consistency. If we want to create an `<add-answer-button>` component because it is a logical coherant unit of UI + functionality, and we want that button to add an answer, then that component should know how to add a damn answer. It doesn't need to ask its parent. That's its job within the system: to render a button that adds an answer. And that will continue to be its job, regardless of where it lives.

Now, there is one type of component where I think stricter adherence to DDAU makes sense: completely generic, reusable components. Datepickers and such, the kind of thing `Ember.Component` was originally created for.

If I'm working on a `<answer-list>` component within my app, and I want to bring in a fancy 3rd-party `<bootstrap-panel>` to spruce up my UI, I shouldn't have to worry about that component mutating my data. A panel component doesn't know it's part of a Lesson Creator app, and I wouldn't want it touching my store.

But, my current thinking tells me that components specific to our application's domain may have the right to directly mutate data.
