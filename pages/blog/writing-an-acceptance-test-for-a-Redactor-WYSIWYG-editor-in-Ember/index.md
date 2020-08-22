---
title: "Writing an acceptance test for a Redactor WYSIWYG editor in Ember"
date: "2014-12-12"
---

I wrote a simple component to wrap the [Redactor](imperavi.com/redactor/) WYSIWYG editor library. I was having trouble testing it, since it uses `contenteditable`, meaning Ember's built-in `fillIn` helper wouldn't work.

Instead I used jQuery's `.html` method. I also needed to use `triggerEvent` to let Ember know the content had changed. Here's a basic implementation:

```js
visit("/");

andThen(() => {
  $('.Lesson-intro [contenteditable="true"]').html("<p>Blah</p>");
  triggerEvent('.Lesson-intro [contenteditable="true"]', "keyup");
});

andThen(() => {
  var lesson = App.__container__
    .lookup("controller:application")
    .get("attrs.lesson");
  equal(lesson.get("intro"), "<p>Blah</p>");
});
```

This worked, and my test verified that changing the content on the WYSIWYG region updated my model's property.

I then wrapped the redactor logic into a test helper:

```js
import Ember from "ember";

Ember.Test.registerAsyncHelper("fillInRedactor", function (
  app,
  selector,
  content
) {
  var el = `${selector} [contenteditable='true']`;
  $(el).html(content);
  return triggerEvent(el, "keyup");
});

export default {};
```

which simplified my test to

```js
test("I can edit the lesson", function () {
  visit("/");
  fillInRedactor(".Lesson-intro", "<p>Blah</p>");

  andThen(() => {
    var lesson = App.__container__
      .lookup("controller:application")
      .get("attrs.lesson");
    equal(lesson.get("intro"), "<p>Blah</p>");
  });
});
```

which I'm quite happy with!
