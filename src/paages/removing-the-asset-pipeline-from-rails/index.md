---
title: Removing the Asset Pipeline from Rails
date: 2014-12-22
---

When using Rails as a data layer for a JavaScript application, there's no need to use the Asset Pipeline. Here's how to get rid of as much of it as possible.

In the root of your Rails app,

```sh
rm -rf rails/app/assets
```

In your Gemfile, remove the following gems:

```
sass-rails
uglifier
coffee-rails
jquery-rails
turbolinks
jbuilder
```

Now everything related to the Asset Pipeline is gone.
