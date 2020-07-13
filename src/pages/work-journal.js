import React from "react"
import { A, Spacer, Lead, Container, Title } from "../components/ui"
import { Helmet } from "react-helmet"
import { format, parse } from "date-fns"

function Entry({ week, children }) {
  let dateObject = parse(week, "yyyy-MM-dd", new Date())
  let dayWithSuffix = format(dateObject, "do")
  let day = format(dateObject, "d")
  let suffix = dayWithSuffix.replace(day, "")
  let month = format(dateObject, "MMMM")
  let year = format(dateObject, "yyyy")

  return (
    <>
      <h2 className="mt-1 text-lg font-bold">
        <p>
          Week of {month} {day}
          <sup>{suffix}</sup>, {year}
        </p>
      </h2>

      <Spacer />

      <div className="pb-32 space-y-10">{children}</div>
    </>
  )
}

Entry.Section = function(props) {
  const titles = {
    work: (
      <>
        <span role="img" className="pr-1" aria-label="construction">
          🏗
        </span>{" "}
        Work
      </>
    ),
    learnings: (
      <>
        <span role="img" className="pr-1" aria-label="star">
          💫
        </span>{" "}
        Learnings
      </>
    ),
    "interesting-things": (
      <>
        <span role="img" className="pr-1" aria-label="interest">
          😮
        </span>{" "}
        Interesting things
      </>
    ),
  }
  return (
    <section>
      <p className="font-bold">{titles[props.title]}</p>

      <ul className="pt-4 pl-6 space-y-3 list-disc">{props.children}</ul>
    </section>
  )
}

Entry.Item = function({ children, href }) {
  return (
    <li>
      {children}
      {href && (
        <>
          {" "}
          <A href={href}>Link</A>
        </>
      )}
    </li>
  )
}

export default function TalksPage() {
  return (
    <>
      <Helmet>
        <title>Work journal</title>
      </Helmet>

      <div className="md:text-lg-">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Work journal</Title>

          <Spacer size="lg" />

          <Lead>Doings and learnings. Updated weekly.</Lead>

          <Spacer size="lg" />

          <Entry week="2020-07-06">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/Ba0fnSkT37E">
                I published "The Rule of Least Power" on YouTube.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/repl">
                We enabled the REPL on miragejs.com! The Share links also now
                save the request method, URL and body, in addition to the server
                config. Finally, we debounced updates so typing feels much more
                responsive.
              </Entry.Item>
              <Entry.Item href="https://github.com/miragejs/graphql">
                Rocky Neurock shipped v0.1.0 of @miragejs/graphql! I reviewed
                his work but it was really all him. Stoked to add GraphQL
                support to the REPL so we can properly show it off soon. Very
                excited for this.
              </Entry.Item>
              <Entry.Item>
                Did some consulting, as well as some Mirage maintenance work.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="https://github.com/miragejs/site/commit/30d02d38044d037af4393fada6ed6df071a686f9">
                Dependabot has been churning through our Netlify build resources
                for miragejs.com. We automerge in-range dependency updates, so
                the Netlify preview builds for Dependabot PRs were literally
                going unused. I learned that you can tell Netlify not to build a
                PR if the commit message has "[skip netlify]" in it, so I
                customized our Dependabot config to add this – and it worked!
                Still need to smooth this out a bit as the builds are ignored
                when merged to master, but for now it is helping alleviate the
                problem. Check out the link for our current config.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://termible.io">
                Slick embeddable terminals that run in the browser.
              </Entry.Item>
              <Entry.Item href="https://stripe.com/">
                Stripe launched a new homepage.
              </Entry.Item>
              <Entry.Item href="https://swr.vercel.app">
                SWR's docs site also got a refresh.
              </Entry.Item>
              <Entry.Item href="https://mailbrew.com">
                Neat app that rolls up your social feeds into a daily email.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/react-podcast/id1341969432?i=1000481895112">
                Part 1 of an interview about the technology behind Remix.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/react-podcast/id1341969432?i=1000483769761">
                ...and part 2 on Michael and Ryan plan to sustain development.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/peter-thiel-a-conversation-with-niall-ferguson/id1443583377?i=1000443467592">
                Fascinating interview with Peter Thiel from 2019.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/plibin/status/1280532633391263744">
                The best product demo I've seen in recent memory.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-06-29">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/S73wYY6N5Ms">
                I published "Authorizing anonymous users in Hasura using Netlify
                Functions" on YouTube.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/repl">
                We deployed a Hasura backend for miragejs.com and shipped Share
                links to the REPL. Had a lot of fun building this.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/tech-debt-vs-platform-risk">
                Published "Tech debt vs. platform risk", Ep. 104 of Frontend
                First.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/building-ui-components-with-storybook/working-with-context">
                Published Darin's video "Working with Context", Ep. 3 of
                Building UI Components with Storybook on EmberMap.
              </Entry.Item>
              <Entry.Item>Did some consulting work.</Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="https://hasura.io/docs/1.0/graphql/manual/auth/authentication/unauthenticated-access.html">
                Hasura lets you configure permissions for unauthenticated users,
                which is perfect for making certain queries public (like the
                blog posts for your homepage) without needing to add support for
                user accounts. The docs are confusing and also incorrect in a
                few places, but all you need to do is set the
                `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` environment variable and it
                works regardless if you happen to be using either webhooks or
                JWTs elsewhere.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://stripe.com/blog/billing-customer-portal">
                Stripe launched a customer portal.
              </Entry.Item>
              <Entry.Item href="https://hasura.io/blog/announcing-hasura-cloud-managed-graphql-for-your-database-and-services/">
                Hasura launched a premium hosted version of their platform. Was
                only a matter of time. Exciting!
              </Entry.Item>
              <Entry.Item href="https://medium.com/linear-app/practices-for-building-linear-is-now-open-for-all-234f7cf9a3d0">
                Linear, a beautiful web-based productivity app, now has open
                signups.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/watch?v=qkJJ9v4eryM">
                Ryan Singer and Adam Wathan chatted about how Shape Up applies
                to small teams.
              </Entry.Item>
              <Entry.Item href="https://www.twitch.tv/videos/667925289">
                React Core Team Q&A.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-06-22">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/QiR9viVIJgo">
                I published "React is a programming language for UIs" on
                YouTube.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/tutorial">
                I finally shipped the official Mirage Tutorial! Stoked to figure
                out my next priority.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/safety-and-idempotence">
                Published "Safety and idempotence", Ep. 103 of Frontend First.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/contextual-components-in-octane/yielding-a-divider">
                Published "Yielding a Divider", Ep. 6 of Contextual Components
                with Octane on EmberMap.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://baremetrics.com/features/messaging">
                Baremetrics launched a minimal Intercom alternative.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/jaredpalmer/status/1276523015652741120">
                Interesting thread on challenges of auth when using a
                backend-as-a-service.
              </Entry.Item>
              <Entry.Item href="https://www.kickstarter.com/projects/ugmonk/analog-the-simplest-productivity-system">
                Neat physical productivity tool.
              </Entry.Item>
              <Entry.Item href="https://youtu.be/w1GDzE5s_Z0">
                Video refresher on the story of Last of Us Part 1.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/econtalk/id135066958?i=1000475691965">
                Adding historical context to the current wave of protests.
              </Entry.Item>
              <Entry.Item href="https://synthetic.transistor.fm/episodes/opacity-and-creativity">
                Taleb's fat tails applied to software projects.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-06-15">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/G_0yKeh0Sf0">
                I published "Levels of abstraction in testing" on YouTube.
              </Entry.Item>
              <Entry.Item>
                Worked on the Mirage tutorial some more. Need to give myself a
                hard deadline or this will keep filling up space.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/drew-powers-on-how-pikas-making-the-web-faster">
                Interviewed + published Ep. 102 of Frontend First, which was an
                interview with Drew Powers about Pika. Also recorded next week's
                episode with Ryan.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/building-ui-components-with-storybook/writing-our-first-story">
                Published Ep. 2 of our Storybook series on EmberMap. Darin's
                doing an awesome job with these. We also planned out Ep. 3.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://youtu.be/UCeYTysLyGI">
                Jason Fried gave a video walkthrough of HEY.
              </Entry.Item>
              <Entry.Item href="https://synthetic.transistor.fm/episodes/category-theory-affordances-and-convexity-of-media">
                Ryan Singer has a new podcast.
              </Entry.Item>
              <Entry.Item href="https://www.theobservereffect.org/marc.html">
                Great interview with pmarca. Lots of insights about processes
                and systems.
              </Entry.Item>
              <Entry.Item href="https://www.techspot.com/news/85630-counter-strike-16-can-now-played-web-browser.html">
                CS 1.6 in the browser. Cue extreme nostalgia.
              </Entry.Item>
              <Entry.Item href="https://www.playstation.com/en-us/ps5/">
                Sony announced the PS5.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-06-08">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/F5eDWtJRYaI">
                I published "React Router v6 Preview: Nested Routing". This
                started as a simpler idea for making a NavLink component that
                supported an `inactiveClassName` prop, but turned into more of a
                semi-livestream experimenting with several cool new features of
                React Router v6.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/tom-preston-werner-on-architecture-decisions-in-redwood-js">
                We interviewed Tom Preston-Werner about Redwood JS for this
                week's podcast. Great conversation on how Tom & company are
                trying to ameliorate some of the architecture woes endemic in
                larger Rails apps.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/contextual-components-in-octane/yielding-a-menu-item">
                Published "Yielding a Menu Item" on EmberMap's series on
                Contextual Components.
              </Entry.Item>
              <Entry.Item>
                I got the four tests written + passing for the last part of the
                Mirage tutorial, so now I just need to finish writing them up.
                Was hoping to ship the tutorial but it was a short week. Next
                week this is my number 1 goal!
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="https://github.com/ReactTraining/react-router/blob/dev/docs/installation/getting-started.md">
                This WIP guide from the dev branch of React Router gives a great
                overview of the v6 features of the library.
              </Entry.Item>
              <Entry.Item>
                Got more practice with React Testing Library + Jest this week. I
                was struck by the amount of boilerplate required to wire up a
                test with my app and React Router running. A lot of the testing
                primitives in the React ecosystem seem to be at the wrong level
                of abstraction to me – my app only ever runs in production with
                a router, for example. I wish these tools would just let you
                visit("/some-url") rather than render(&lt;Provider&gt;&lt;App
                /&gt;&lt;/Provider&gt;).
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://podcasts.apple.com/us/podcast/serverless-chats/id1470600803?i=1000477152868">
                It was fun hearing the creator of AWS Lambda talk serverless.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-06-01">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/PPBrwm4tr50">
                I published "CAP theorem explained for Frontend Developers" on
                YouTube. Fun to think about how many apps we use on a daily
                basis have an Optimistic UI.
              </Entry.Item>
              <Entry.Item>
                No podcast this week but we did record an interview with Tom
                Preston-Werner about Redwood JS. Coming next week.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/tutorial/part-8/">
                I finished Part 8 of Mirage's tutorial on Factories. Was hoping
                to get the whole thing done this week, but alas.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/contextual-components-in-octane/making-the-button-and-menu-reusable">
                Published two new videos in EmberMap's series on Contextual
                Components.
              </Entry.Item>
              <Entry.Item>
                I got Firebase auth working in my Hasura/Next.js app in two
                different ways: JWT and Session Cookies. Planning on making a
                YouTube video about it soon.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="https://codahale.com/you-cant-sacrifice-partition-tolerance/">
                This post from Coda Hale helped me understand some interesting
                things about CAP as I was prepping this week's video.
              </Entry.Item>
              <Entry.Item>
                In reading about auth I learned a bit about symmetric vs.
                asymmetric encryption. How asymmetric encryption works is really
                fascinating. I have some more learning to do here but might make
                for good future video content.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://changelog.com/gotime/132">
                The podcast episode that inspired this week's video on CAP.
              </Entry.Item>
              <Entry.Item href="https://changelog.com/gotime/128">
                Another fascinating episode from Go Time on Immediate mode GUIS.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/watch?v=TxBj8R7XKe4">
                NASA and SpaceX launched a rocket. You may get emotional.
              </Entry.Item>
              <Entry.Item href="https://youtu.be/o-_WXXVye3Y">
                MKBHD on BLM.
              </Entry.Item>
              <Entry.Item href="https://syntax.fm/show/254/headless-cms-break-down-and-roundup">
                Comprehensive breakdown of modern CMS options.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-05-25">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/5F_k9q9HbAc">
                I published "Why frontend build tools are getting an overhaul"
                on YouTube. Proud of how this video turned out + how many
                lightbulb moments I had doing the research for it.
              </Entry.Item>
              <Entry.Item href="https://youtu.be/j1s_3zytAcM">
                Ep. 100 of the podcast! More about ES modules, and the desire
                for integrated JS tools.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/tutorial/intro/">
                I completed Mirage's tutorial up to Part 7. Very excited to get
                this guy done + live on the site soon. The demo's hosted on
                Vercel.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item>
                ES modules are stateful singletons, but in a different way than
                CJS modules are. I still need to understanding exactly how.
              </Entry.Item>
              <Entry.Item href="https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/">
                I've been adding auth to my Next.js/Hasura side project. It's
                the first time I've worked with JWTs and boy are these flows
                complex. Lots of bad / poorly written articles out there, but
                this was one from Hasura was the most helpful so far.
              </Entry.Item>
              <Entry.Item href="https://firebase.google.com/docs/auth/web/start">
                On the other hand, Firebase's Auth service is incredible and the
                docs are clear as day. If only their data store used GraphQL...
              </Entry.Item>
              <Entry.Item>
                On the video production side, I learned that{" "}
                <em>color correction</em> is fixing issues with raw footage
                (like adjusting white balance or correcting exposure) while{" "}
                <em>color grading</em> is applying effects for stylistic
                purposes (like adding a cyan tint for a movie-like look).
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://www.serverlesschats.com/50">
                Guillermo Rauch wants to stop on-demand computing.
              </Entry.Item>
              <Entry.Item href="https://reactpodcast.simplecast.com/episodes/96">
                Pete Hunt thinks Hooks are hard. I feel seen.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/adamwathan/status/1266033105229529092">
                Adam Wathan is building renderless UI components for Tailwind.
              </Entry.Item>
              <Entry.Item href="https://excalidraw.com/">
                Beautiful browser-based drawing tool that loads instantly.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/user/dslrvideoshooter">
                My favorite YouTube channel about videomaking.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-05-18">
            <Entry.Section title="work">
              <Entry.Item href="https://frontendfirst.fm/episodes/read-and-discuss-second-guessing-the-modern-web">
                This week's podcast was an interesting chat about the "modern
                web," the state of SPA development, and how React is planning on
                moving more work to the server. Loved Rich Harris's take.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/repl/?body=%7B%0A%20%20user%3A%20%7B%0A%20%20%20%20name%3A%20%22You%21%22%0A%20%20%7D%0A%7D&config=aW1wb3J0IHsgU2VydmVyLCBSZXN0U2VyaWFsaXplciwgTW9kZWwsIGJlbG9uZ3NUbyB9IGZyb20gIm1pcmFnZWpzIgoKZXhwb3J0IGRlZmF1bHQgbmV3IFNlcnZlcih7CiAgc2VyaWFsaXplcnM6IHsKICAgIGFwcGxpY2F0aW9uOiBSZXN0U2VyaWFsaXplcgogIH0sCiAgCiAgbW9kZWxzOiB7CiAgICB1c2VyOiBNb2RlbCwKICAgIG1lc3NhZ2U6IE1vZGVsLmV4dGVuZCh7CiAgICAgIHVzZXI6IGJlbG9uZ3NUbygpLAogICAgfSksCiAgfSwKCiAgc2VlZHMoc2VydmVyKSB7CiAgICBzZXJ2ZXIuY3JlYXRlKCJ1c2VyIiwgeyBuYW1lOiAiUnlhbiIgfSkKICAgIHNlcnZlci5jcmVhdGUoInVzZXIiLCB7IG5hbWU6ICJTYW0iIH0pCiAgfSwKCiAgcm91dGVzKCkgewogICAgdGhpcy5yZXNvdXJjZSgidXNlciIpCiAgfSwKfSk%3D&method=POST&url=%2Fusers">
                Added CRUD operations to Mirage's REPL. Had fun learning about
                nested (hierarchical) states in XState. State machines are
                powerful, I’d like to continue exploring using them in my work.
              </Entry.Item>
              <Entry.Item>
                Made some videos on contextual components in Octane. Still my
                favorite component API for sharing both rendering and state
                – even prefer it to Hooks for this use case.
              </Entry.Item>
              <Entry.Item>
                Prepped a YouTube video explaining why tools like Snowpack and
                Vite are pushing us to stop bundling our apps in development.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="https://webpack.js.org/guides/tree-shaking/">
                Webpack supports a <code>sideEffects: false</code> option you
                can use to tell build tools if your library is tree-shakable. We
                added it to Mirage because even though it does have side
                effects, they shouldn't stop it from being tree-shaken.
              </Entry.Item>
              <Entry.Item href="https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/">
                Excellent article on how ES modules work. The spec is a
                fascinating accomplishment of engineering. Asynchrony ruins
                everything it touches.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://changelog.com/podcast/395">
                Jason Warner talks about leading GitHub to its $7.5 billion
                acquisition. The part about GitHub knowing what value it brought
                to the table was a highlight.
              </Entry.Item>
              <Entry.Item href="http://youtube.com/mattdavella">
                The YouTuber Matt D'Avella has been inspiring me.
              </Entry.Item>
              <Entry.Item href="https://macwright.org/2020/05/10/spa-fatigue.html">
                Second-guessing the modern web.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/dan_abramov/status/1259614150386425858">
                ...along with Dan Abramov's commentary.
              </Entry.Item>
              <Entry.Item href="https://dev.to/richharris/in-defense-of-the-modern-web-2nia">
                ...and Rich Harris's response.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/watch?v=2Wwx-lF5NhE">
                Why we added tooling to the web, and how we're going to remove
                it.
              </Entry.Item>
            </Entry.Section>
          </Entry>
        </Container>
      </div>
    </>
  )
}
