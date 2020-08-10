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

          <Entry week="2020-08-03">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/_OZYvKsn60g">
                I published "Animating Skeleton Screens with Tailwind CSS" on
                YouTube.
              </Entry.Item>
              <Entry.Item>
                Recorded Ep. 107 of Frontend First. Will publish next week.
              </Entry.Item>
              <Entry.Item href="https://www.bhphotovideo.com/c/product/945063-REG/impact_soft_n_natural_4_sockets.html">
                Bought a light box kit + spent some time with a cinemtographer
                friend learning about lighting and color. Still have a lot to
                learn here!
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/building-ui-components-with-storybook/adding-interactivity-using-the-knobs-addon">
                Helped Darin publish Ep. 5 of Building UI Components with
                Storybook on EmberMap.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item>
                I learned more about color correction, white balance and
                exposure. I got some soft boxes that are all 5000K temperature
                lighting and want to get some blackout curtains next so I have
                total control over the lighting in my videos. I played around
                with recording at night and the difference is dramatic when you
                have total control of the light and the camera's white balance
                dialed in correctly. The goal here is to get the look and style
                of all my videos the same. Now that I know a bit more about
                this, looking at my recent videos is kinda stark! They all look
                very different from each other. But I suppose continuous
                improvement is the name of the game.
              </Entry.Item>
              <Entry.Item>
                I also learned about shooting in Log format and using a LUT
                (lookup table) to decompress the image. Shooting in Log prevents
                the camera from losing data on the brightest and darkest parts
                of an image. It does this by compressing the data, so that the
                raw image ends up looking very flat. You then use a LUT to
                decompress it into a standard (REC 709) format where you can
                then make your additional tweaks and grades. The goal here is to
                get my environment set up in such a way that I can record, apply
                a LUT, and have a similar-looking video every time.
              </Entry.Item>
              <Entry.Item>
                While working on my Twitter clone I was asking Adam a question
                about line height. He noticed I had added a font size of 15px
                and said it was going to affect many parts of the UI. I said I
                added it because mobile twitter.com uses 15px, and I wanted to
                match it. It was an interesting conversation and made me realize
                that if you do want to add something like a 15px font size to
                Tailwind's theme, you really should take the time to trace that
                through and think about the corresponding changes to line height
                and the spacing scale that it entails, because many of these
                values are interrelated. For example, with a 15px font size, you
                can't match icons without also adjusting the spacing scale. The
                default scale of a 16px base and a 4 unit scale is, in Adam's
                words, "the hardest to mess up."
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://numinous.productions/timeful/">
                If books were alive.
              </Entry.Item>
              <Entry.Item href="https://romefrontend.dev/blog/2020/08/08/introducing-rome.html">
                The author of Babel announced Rome, his new JS linting project.
              </Entry.Item>
              <Entry.Item href="https://youtu.be/5tSTk1083VY">
                Jaw-dropping story of overcoming adversity, the power of the
                mind, and finding the physical limits of the human body.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-07-27">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/b1uZ4FYHaM8">
                I published "Buffering new Tweets with SWR" on YouTube.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/does-code-splitting-negate-the-benefits-of-building-an-spa">
                Published "Does code splitting negate the benefits of building
                an SPA?", Ep. 106 of Frontend First.
              </Entry.Item>
              <Entry.Item>
                Mirage issues, EmberMap work, and consulting.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item>
                One question that came up a few times from my video was whether
                JavaScript equality (===) could be used to compare two pieces of
                React state. In all my tests, "setBuffer(data)" made the
                "buffer" state an actual reference to the same object that
                "data" referenced, meaning, both pieces of state referred to the
                same JavaScript object. And therefore the equality check could
                be used, even across renders. Definitely a useful thing to know!
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://nextjs.org/blog/next-9-5">
                Next.js 9.5 was released.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/natfriedman/status/1288155000560967680">
                GitHub publicized their product roadmap.
              </Entry.Item>
              <Entry.Item href="https://www.econtalk.org/nassim-nicholas-taleb-on-the-pandemic/">
                Taleb on the history and statistics of pandemics.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-07-20">
            <Entry.Section title="work">
              <Entry.Item href="https://youtu.be/Ra5SUzeXOac">
                I published "Building a Twitter Clone with Tailwind CSS and
                Next.js" on YouTube.
              </Entry.Item>
              <Entry.Item href="https://2020-07-21-mobile-twitter-ui.vercel.app">
                I also tidied the demo from the video and threw it up on Vercel.
              </Entry.Item>
              <Entry.Item>
                We brought on a second person to help make content for EmberMap
                which lead me to write up some notes on my process for making
                videos. Excited to get this knowledge out of my head and more
                formalized so it's easy to share.
              </Entry.Item>
              <Entry.Item>
                Recorded Ep. 106 of Frontend First which we'll publish next
                week.
              </Entry.Item>
              <Entry.Item>
                Caught up on some business admin work + did some consulting.
              </Entry.Item>
            </Entry.Section>
            <Entry.Section title="learnings">
              <Entry.Item>
                My Twitter clone video ended up a bit long. I'd like to get on a
                consistent weekly cadence of publishing videos in the 6-9 minute
                range. However, these longer videos do seem to get a bit more
                attention. So still figuring out what works best for the kind of
                stuff I want to teach.
              </Entry.Item>
              <Entry.Item href="https://css-tricks.com/flexbox-truncated-text/">
                One of the main takeaways from the video was how truncated text
                behaves when it's in a flex child, due to text's "intrinsic
                width." CSS Tricks has a nice little article on it.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://www.apollographql.com/blog/announcing-the-release-of-apollo-client-3-0">
                Apollo Client 3.0 was released.
              </Entry.Item>
              <Entry.Item href="https://www.biotele.com/magenta.html">
                Magenta ain't a color.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/watch?v=VPLCk-FTVvw">
                Mesmerizing rendition of Moon River.
              </Entry.Item>
            </Entry.Section>
          </Entry>

          <Entry week="2020-07-13">
            <Entry.Section title="work">
              <Entry.Item href="https://twitter.com/samselikoff/status/1284303541490900994">
                I prepped my next YouTube video on rendering buffered data from
                SWR. This is the first week I missed publishing in a while, and
                I felt very defeated by it. When the weekend came I knew it'd be
                too much to try to squeeze in, so I listened to my body and gave
                myself permission to rest. Ended up having a glorious beach day
                on Sunday. Still working on finding balance during quarantine +
                excited to get this video up next week.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/docs/advanced/graphql/">
                We got a GraphQL guide added to the Mirage docs! Excited by the
                momentum here, driven by Rocky's ongoing excellent work.
              </Entry.Item>
              <Entry.Item href="https://miragejs.com/repl/v1/231">
                We also shipped GraphQL support in the REPL. Few more
                quality-of-life improvements coming here but excited to start
                sharing more examples soon.
              </Entry.Item>
              <Entry.Item href="https://frontendfirst.fm/episodes/stop-energy">
                Published "Stop Energy", Ep. 105 of Frontend First.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/contextual-components-in-octane/exposing-a-menu-button">
                Published Ep. 7 of Contextual Components in Octane on EmberMap.
              </Entry.Item>
              <Entry.Item href="https://embermap.com/topics/building-ui-components-with-storybook/using-our-first-storybook-addon">
                Published Ep. 4 of Building UI Components with Storybook on
                EmberMap. Darin's doing a great job with this series.
              </Entry.Item>
              <Entry.Item>Consulting.</Entry.Item>
            </Entry.Section>

            <Entry.Section title="learnings">
              <Entry.Item href="http://adamjonrichardson.com/2014/01/13/potentially-pure-functions/">
                In my ongoing quest to understand useEffect, I asked{" "}
                <A href="http://adamjonrichardson.com/2014/01/13/potentially-pure-functions/">
                  a question on Twitter
                </A>{" "}
                about when a function parameter needs to be invoked inside of an
                effect. I'm still not confident about any of the answers, but
                Chris Freeman shared this great article with me on
                Potentially-Pure Functions. It seems that in a langugage like
                JavaScript, the purity of a function can depend on the purity of
                its arguments. The reason I'm spending so much time trying to
                understand this is because of{" "}
                <A href="https://twitter.com/sebmarkbage/status/1161459117342334976">
                  this 2019 tweet from Sebastian
                </A>
                . I'm still not sure how much this stuff matters outside of a
                CM/Suspense world.
              </Entry.Item>
            </Entry.Section>

            <Entry.Section title="interesting-things">
              <Entry.Item href="https://podcasts.apple.com/us/podcast/econtalk/id135066958?i=1000448359339">
                When leaders should lie.
              </Entry.Item>
              <Entry.Item href="https://twitter.com/mattgperry/status/1283412864594784257?s=20">
                Framer Motion 2 is out.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/software-engineering-daily/id1019576853?i=1000481764165">
                Dyanmo's strengths over relational DBs.
              </Entry.Item>
              <Entry.Item href="https://frontend.horse/issues/8/">
                Shaders for frontend devs.
              </Entry.Item>
              <Entry.Item href="https://podcasts.apple.com/us/podcast/econtalk/id135066958?i=1000484613857">
                Using Bitcoin to verify digital property rights in video games.
              </Entry.Item>
              <Entry.Item href="https://www.youtube.com/watch?v=6_pru8U2RmM">
                Delightful Apple video on working from home.
              </Entry.Item>
            </Entry.Section>
          </Entry>

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
                ...and part 2 on Michael and Ryan's plan to sustain development.
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
