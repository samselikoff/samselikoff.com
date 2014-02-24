I still consider myself a Javascript neophyte, but at this point I've used all three major frameworks. I don't have a strong personal preference for any particular one; what I look for is which tool is most appropriate for the job at hand.

So, what job are we dealing with? The OP mentioned several things:

 - "...confusion between what goes where"
 - "...complete lack of data binding"
 - "No memory management for views"
 - "Really ugly routing"
 - "Our code is really really fragile"

These items seem to be grasping for a holistic solution. As others have mentioned, the three frameworks exist on a continuum of comprehensiveness. A corollary of a comprehensive solution is one that is inflexible. So one way to think of the frameworks is

```
Less comprehensiveness,                                            More comprehensiveness,
more flexibility                                                          less flexibility

<------|------------------------------------|-------------------------------------|------>
    Backbone                            Angular                                 Ember

  Minimal solution               Midsize solution                  Comprehensive solution
  High flexibility               Moderately flexible                      Low flexibility  
```

It is clear Ghost is looking for a complete solution. Some have mentioned paring Backbone with React or Angular with non-Angular modules to get there. This is one approach. And the flexibility can certainly be a plus. But because these approaches were not designed from the ground up to _specifically_ address all the points in the above list - and more - there will be architectural questions without an idiomatic answer.

This is also something to keep in mind when discussing the communities. Because Backbone and Angular are multipurpose, their communities are more diverse. As Ghost members start to build out their system, the community members, tutorials, and resources that will be most valuable will be those that pertain to the particular type of app they're building: namely, a complex client-side application to serve as a complete solution for Ghost's admin interface.

Building this type of app is the explicit goal of the Ember framework. [Backbone's docs](http://backbonejs.org/#FAQ-why-backbone) mention not painting you into a corner and [Angular's](http://angularjs.org/#embed-and-inject) discuss the ease with which multiple small Angular apps can be injected into a single page, perhaps within an existing app. This means Backbone and Angular are more suitable for many jobs that Ember is not.

But Ember seems particularly well-suited for the job at hand: building an ambitious web application. Somewhat ironically, this is the one thing that Ember does, and does well.