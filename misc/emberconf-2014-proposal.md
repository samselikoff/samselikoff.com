# 12/9/2014 draft
EmberConf 2014 Proposal

Title
Services worth spreading: Using Ember to expand TED’s service-oriented architecture


Abstract (600 chars)
In 2006, TED posted the first six TED talks online, backed by a single PHP (Symfony) application. After years of viral growth and myriad new initiatives, the organization needed a more flexible architecture. The tech team chose to break up the main app into multiple distributed Rails services, leveraging Ember for internal front-end development.
In this talk we'll discuss some of the front-end challenges that came along with a service-oriented architecture, and how we used Ember to solve these challenges. We’ll also discuss how Ember’s tooling and conventions have facilitated ongoing refinement of our back-end infrastructure.


Details. (Explain the theme and flow of your talk. What are the intended audience takeaways? Include any pertinent details such as outlines, outcomes or intended audience.)
This high-level talk will discuss some of the advantages of using Ember in an enterprise software environment.
TED's primary technological concern is its video processing pipeline: moving talks from raw video files into a flexible, structured system that enables widespread distribution. TED has built many internal web applications to support this task. Using Ember for front-end development has made our team more productive, our apps more usable, and enabled further improvement of our back-end architecture.
Here's a rough outline:
1. Introduction
2. TED’s move to SOA, and the front-end challenges that came with it
    - Developing new internal web apps off a single monolithic codebase is straight-forward: all the data is right there.
    - But when your data is split across multiple services, how do you piece it together to render new screens?
    - Started by writing lots of Rails view layer code
    - Problem: Rails not really designed for this
    - Problem: TED cares a lot about UX of its internal tools => needed a lot of JavaScript.
    - Problem: Sharing small bits of front-end code across Rails apps is not easy
3. Ember to the rescue
    - Ember is designed to consume APIs. We were already building services, so the APIs were essentially ready.
    - If our services changed, Ember Data was the only abstraction layer we needed to touch to update our front ends
    - Obviously, Ember is much more suitable for building apps with rich, dynamic UIs
    - Addons allow us to share TED code
    - So Ember solved most of the front-end challenges that came along with SOA
4. Ember enabled completely new development workflows
    - Case study: Hoover. Real-time display of file ingests + network transfers during our TED Global 2014 conference
    - Built in less than a month. One Node dev for real-time file system events, one rails dev for persistent data, one ember dev for interface.
        - All built / tested in isolation
        - Plugged it all together, and everything worked in time for the conference
    - SOA + Ember makes it easy for us to independently develop small, niche applications for other employees throughout the company
5. How Ember’s conventions and tooling facilitate ongoing back-end architectural improvements
    - Describe some of our internal tools + back-end needs
    - Talk about moving X number of apps to Ember CLI, separating into different repos, deployment strategy
    - Case study: front_end_builds. Admin panel for managing deployed ember apps. New deploys without needing to redeploy backend.
    - Having all our apps on Ember CLI sets the stage for more innovation in our back-end architecture
6. Ongoing and future improvements from using Ember CLI
    - Building out TED-specific component addons (e.g. image compressor)
    - Blueprint for spinning up a new internal app with commonly used addons already included
    - Features we build for various internal apps (web socket adapter, offline indicator, drag and drop interface) get packaged as addons. Huge productivity boost. And Ember conventions are huge here. All our addons look the same. Compare with Backbone/jQuery plugins.
7. Wrap up


Pitch (why is talk pertinent, what is your involvement in this talk, what makes you qualified)
TED is a web company, through and through. Our main office is in New York City, but our engineers work remotely. So we’ve embraced the web as the building block for all our internal applications.

Our infrastructure needs to be distributed, robust to failure, and flexible. For several years we’ve been building out a service-oriented architecture on the back end. Now with Ember being used as our primary tool for internal front-end development, our development environment is efficient, predictable and scalable.
We'll discuss
* What made Ember a great choice for TED
* How we're using Ember in our SOA environment
* How decoupling our front- and back-end deployments made our distributed services more robust - and how easy Ember made this
* How Ember got even our dev ops guy excited about SPAs
* Some case studies showing off Ember's massive productivity gains


# 12/8/2014 draft
EmberConf 2014 Proposal

Title
Services worth spreading: Using Ember to expand TED’s service-oriented architecture


Abstract (600 chars)
In 2006, TED posted the first six TED talks online, backed by a single PHP (Symfony) application. After years of viral growth and myriad new initiatives, the organization needed a more flexible architecture. The tech team chose to break up the main app into multiple distributed Rails services, leveraging Ember for internal front-end development.
In this talk we'll discuss some of the front-end challenges that came along with a service-oriented architecture, and how we used Ember to solve these challenges. We’ll also discuss how Ember’s tooling and conventions have facilitated ongoing refinement of our back-end infrastructure.


Details. (Explain the theme and flow of your talk. What are the intended audience takeaways? Include any pertinent details such as outlines, outcomes or intended audience.)
This high-level talk will discuss some of the advantages of using Ember in an enterprise software environment.
TED's primary technological concern is its video processing pipeline: moving talks from raw video files into a flexible, structured system that enables widespread distribution. TED has built many internal web applications to support this task. Using Ember for front-end development has made our team more productive, our apps more usable, and enabled further improvement of our back-end architecture.
Here's a rough outline:
1. Introduction
2. TED’s move to SOA, and the front-end challenges that came with it
   1. TED has lots of internal web apps. Developing these off a single monolithic app is easy: all the variables are right there. Rendering a new template is straight-forward.
   2. But when your data comes from multiple services, how do you piece it together?
   3. Started by writing lots of Rails view layer code
   4. Problem: Rails not really designed for this
   5. Problem: TED cares a lot about UX of its internal tools => needed a lot of JavaScript.
   6. Problem: Sharing small bits of front-end code across Rails apps is not easy
1. Ember to the rescue
   1. Ember is designed to consume APIs. We were already building services, so the APIs were essentially ready.
   2. If our services changed, Ember Data was the only abstraction layer we needed to touch to get our front end apps working again
   3. Obviously, Ember is much more suitable for building apps with rich, dynamic UIs
   4. Addons allow us to share TED code
   5. So Ember solved most of the front-end challenges that came along with SOA
1. Ember enabled completely new development workflows
   1. Case study: Hoover. Real-time display of file ingests + network transfers during our TED Global 2014 conference
   2. Built in less than a month. One Node dev for real-time file system events, one rails dev for persistent data, one ember dev for interface.
      1. All built / tested in isolation
      2. Plugged it all together, and everything worked in time for the conference
   1. SOA + Ember makes it easy for us to independently develop small, niche applications for other employees throughout the company
1. How Ember’s conventions and tooling facilitate ongoing back-end architectural improvements
   1. Describe some of our internal tools + back-end needs
   2. Talk about moving X number of apps to Ember CLI, separating into different repos, deployment strategy
   3. Case study: front_end_builds. Admin panel for managing deployed ember apps. New deploys without needing to redeploy backend.
   4. Having all our apps on Ember CLI sets the stage for more innovation in our back-end architecture
1. Future improvements + synergies from using Ember CLI
   1. Building out TED-specific component addon library (e.g. crushinator)
   2. Blueprint for spinning up a new internal app with ted-bootstrap, ted-components, etc. already included
   3. Every time we add a feature in a different app (web sockets hoover, offline usher, dnd tedx etc.), we add that to the pool of shared solutions. Then all of our internal ember apps have access to that - not just a code example to copy and paste, but addons let us package up solutions + makes extremely easy to share.
      1. Ember conventions are huge here. All addons look the same. Compare with backbone/jquery plugins.
1. Wrap up


Pitch (why is talk pertinent, what is your involvement in this talk, what makes you qualified)
Web apps are gaining popularity in enterprise environments.
TED’s a popular online company. It has to maintain increasing demand in its existing channels (like the web) while expanding into new areas (like mobile, tv, education, books). TED’s also a very dynamic organization, and its employees are empowered to experiment with new things. Thus TED requires infrastructure that’s distributed, robust to failure, amenable to experimentation, tools that are flexible. Ember is helping us in all these areas on front end.
Lots of other companies in this same situation. Ember’s conventions mean speed and productivity; its community means latest and greatest web technologies, features and performance; and its growing popularity means a growing labor pool.
We'll discuss
* What made Ember a great choice for TED
* How we're using Ember in our SOA environment
* How decoupling our front- and back-end deployments made our distributed services more robust - and how easy Ember made this
* How Ember got even our dev ops guy excited about SPAs
* Some case studies showing off Ember's massive productivity gains




Other title ideas
[Data worth spreading]
[Services worth spreading]
[Services worth distributing]
[Architecture worth distributing]
[Architecture worth spreading]
[Front ends worth spreading]


How Ember is expanding TED’s service-oriented architecture
Using Ember to expand TED’s service-oriented architecture


Using Ember to expand SOA at TED
Using Ember to Power SOA at TED
Using Ember to power Service-oriented Architecture at TED
Using Ember to Power TED’s Service-oriented Architecture
Using Ember to Grow TED’s Service-oriented Architecture
Expanding TED’s Service-oriented Architecture with Ember
Empowering TED’s Service-Oriented Architecture with Ember
How Ember is fueling TED’s move to a service-oriented architecture
How Ember is Propelling TED’s Move to SOA
How Ember is Powering TED’s Enterprise Infrastructure
How Ember is Powering TED’s Service-oriented Architecture
How Ember is expanding TED’s service-oriented architecture
How Ember is expanding TED’s growing Service-oriented Architecture
How Ember Powers Service-Oriented Architecture at TED
How Ember Powers TED’s Service-Oriented Architecture




EmberConf 2014 Proposal
=======================

## Title

Services worth spreading: Using Ember to expand TED’s service-oriented architecture


## Abstract (600 chars)

TED has come a long way since it posted the first six TED Talks online in 2006. Nearly three years ago, the tech team began moving towards a service-oriented architecture, and recently started using Ember for all its internal front-end development.

In this talk we'll discuss how Ember alleviated some of the challenges that come along with SOA. We'll also talk about how Ember's conventions enabled a clean, hassle-free deployment solution for all our internal apps. Finally, we'll discuss how Ember Data's abstractions are paving the way for our upcoming move to a message bus architecture.


## Details. (Explain the theme and flow of your talk. What are the intended audience takeaways? Include any pertinent details such as outlines, outcomes or intended audience.)

This high-level talk will highlight the advantages of using Ember in an enterprise software environment. TED's primary technological concern is its video processing pipeline: moving talks from raw video files into a flexible, structured system that enables widespread distribution.

We'll discuss

  - What made Ember a great choice for TED
  - How we're using Ember in our SOA environment
  - How decoupling our front- and back-end deployments made our distributed services more robust - and how easy Ember made this
  - How Ember got even our dev ops guy excited about SPAs
  - Some case studies showing off Ember's massive productivity gains

Here's a rough outline:

  1. Overview of front-end challenges that come along with SOA

  2. Delve into TED's internal software requirements
    - TED cares about its internal tools. Designers + wireframes. Lots of rich, dynamic UIs. Care about UX.
    - SOA made it possible to develop smaller, niche applications for employees throughout the company
    - Problem: how to develop myriad internal apps with rich, dynamic functionality, and share code?
    - Solution: Ember 
    - Case study: Hoover

  3. On the front lines: unifying internal application development
    - Quick descriptions of other internal tools
    - Explain fragmentation in rails view code
    - Talk about moving X number of apps to Ember CLI, separating into different repos, deployment strategy
    - Case study: front_end_builds

  4. The present
    - Building out TED-specific component addon library (e.g. crushinator)
    - Ember Data, CLI conventions + deployment pipeline sets us up for being able to modify our back-end architecture in the future
    - Case study: message bus

  5. Wrap up



## Pitch (why is talk pertinent, what is your involvement in this talk, what makes you qualified)





### Other title ideas
[Data worth spreading]
[Services worth spreading]
[Services worth distributing]
[Architecture worth distributing]
[Architecture worth spreading]
[Front ends worth spreading]

How Ember is expanding TED’s service-oriented architecture
Using Ember to expand TED’s service-oriented architecture

Using Ember to expand SOA at TED
Using Ember to Power SOA at TED
Using Ember to power Service-oriented Architecture at TED
Using Ember to Power TED’s Service-oriented Architecture
Using Ember to Grow TED’s Service-oriented Architecture
Expanding TED’s Service-oriented Architecture with Ember
Empowering TED’s Service-Oriented Architecture with Ember
How Ember is fueling TED’s move to a service-oriented architecture
How Ember is Propelling TED’s Move to SOA
How Ember is Powering TED’s Enterprise Infrastructure
How Ember is Powering TED’s Service-oriented Architecture
How Ember is expanding TED’s service-oriented architecture
How Ember is expanding TED’s growing Service-oriented Architecture
How Ember Powers Service-Oriented Architecture at TED
How Ember Powers TED’s Service-Oriented Architecture