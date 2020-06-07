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
      <h2 className="mt-1 font-bold text-lg">
        <p>
          Week of {month} {day}
          <sup>{suffix}</sup>, {year}
        </p>
      </h2>

      <Spacer />

      <div className="space-y-10 pb-32">{children}</div>
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

      <ul className="list-disc pl-6 pt-4 space-y-3">{props.children}</ul>
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
