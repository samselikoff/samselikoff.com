---
title: Starting a github pages site from an existing project
---

If you already have a project and want to create a `github-pages` branch to start writing documentation, I find it best to start out with a clean branch with no history. Here's how you do it:

```
git checkout master
git checkout --orphan github-pages
```

This gives you a clean branch, but preserves the working files in your directory. Run this command to remove them:

```
git clean -fd
```

Now you can

```
jekyll new .
```

and next time you push, your docs site will be up and running!
