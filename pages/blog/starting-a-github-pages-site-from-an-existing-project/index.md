---
title: Starting a github pages site from an existing project
date: "2015-04-29"
---

If you already have a project and want to create a `github-pages` branch to start writing documentation, I find it best to start out with a clean branch with no history. Here's how you do it:

```
git checkout master
git checkout --orphan github-pages
```

This gives you a clean branch, but preserves the working files in your directory. Run this command to remove them:

```
git rm -rf .
```

Now you can

```
jekyll new .
```

Add a new .gitignore file (for `_site`, `node_modules` etc.). Also, be sure to `exclude` any dirs like `node_modules` or `bower_components` that may be hanging around from your project's master branch, or else Jekyll will watch + build them. ([docs](http://jekyllrb.com/docs/configuration/)).

Next time you push, your docs site will be up and running!
