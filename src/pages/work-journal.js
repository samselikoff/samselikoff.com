import React from "react"
import { A, Spacer, Lead, Container, Title } from "../components/ui"
import { Helmet } from "react-helmet"

function SectionItem({ children, href }) {
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
function Section(props) {
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

      <ul className="list-disc pl-6 pt-4 space-y-6">{props.children}</ul>
    </section>
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

          <h2 className="mt-1 font-bold text-lg">
            May 18<sup>th</sup>, 2020
          </h2>

          <Spacer />

          <div className="space-y-10 pb-32">
            <Section title="work">
              <SectionItem href="https://frontendfirst.fm/episodes/read-and-discuss-second-guessing-the-modern-web">
                This week's podcast was an interesting chat about the "modern
                web," the state of SPA development, and how React is planning on
                moving more work to the server. Loved Rich Harris's take.
              </SectionItem>
              <SectionItem href="https://miragejs.com/repl/?body=%7B%0A%20%20user%3A%20%7B%0A%20%20%20%20name%3A%20%22You%21%22%0A%20%20%7D%0A%7D&config=aW1wb3J0IHsgU2VydmVyLCBSZXN0U2VyaWFsaXplciwgTW9kZWwsIGJlbG9uZ3NUbyB9IGZyb20gIm1pcmFnZWpzIgoKZXhwb3J0IGRlZmF1bHQgbmV3IFNlcnZlcih7CiAgc2VyaWFsaXplcnM6IHsKICAgIGFwcGxpY2F0aW9uOiBSZXN0U2VyaWFsaXplcgogIH0sCiAgCiAgbW9kZWxzOiB7CiAgICB1c2VyOiBNb2RlbCwKICAgIG1lc3NhZ2U6IE1vZGVsLmV4dGVuZCh7CiAgICAgIHVzZXI6IGJlbG9uZ3NUbygpLAogICAgfSksCiAgfSwKCiAgc2VlZHMoc2VydmVyKSB7CiAgICBzZXJ2ZXIuY3JlYXRlKCJ1c2VyIiwgeyBuYW1lOiAiUnlhbiIgfSkKICAgIHNlcnZlci5jcmVhdGUoInVzZXIiLCB7IG5hbWU6ICJTYW0iIH0pCiAgfSwKCiAgcm91dGVzKCkgewogICAgdGhpcy5yZXNvdXJjZSgidXNlciIpCiAgfSwKfSk%3D&method=POST&url=%2Fusers">
                Added CRUD operations to Mirage's REPL. Had fun learning about
                nested (hierarchical) states in XState. State machines are
                powerful, I’d like to continue exploring using them in my work.
              </SectionItem>
              <SectionItem>
                Made some videos on contextual components in Octane. Still my
                favorite component API for sharing both rendering and state
                – even prefer it to Hooks for this use case.
              </SectionItem>
              <SectionItem>
                Prepped a YouTube video explaining why tools like Snowpack and
                Vite are pushing us to stop bundling our apps in development.
              </SectionItem>
            </Section>

            <Section title="learnings">
              <SectionItem href="https://webpack.js.org/guides/tree-shaking/">
                Webpack supports a <code>sideEffects: false</code> option you
                can use to tell build tools if your library is tree-shakable. We
                added it to Mirage because even though it does have side
                effects, they shouldn't stop it from being tree-shaken.
              </SectionItem>
              <SectionItem href="https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/">
                Excellent article on how ES modules work. The spec is a
                fascinating accomplishment of engineering. Asynchrony ruins
                everything it touches.
              </SectionItem>
            </Section>

            <Section title="interesting-things">
              <SectionItem href="https://webpack.js.org/guides/tree-shaking/">
                Jason Warner talks about leading GitHub to its $7.5 billion
                acquisition. The part about GitHub knowing what value it brought
                to the table was a highlight.
              </SectionItem>
              <SectionItem href="http://youtube.com/mattdavella">
                The YouTuber Matt D'Avella has been inspiring me.
              </SectionItem>
              <SectionItem href="https://macwright.org/2020/05/10/spa-fatigue.html">
                Second-guessing the modern web.
              </SectionItem>
              <SectionItem href="https://twitter.com/dan_abramov/status/1259614150386425858">
                ...along with Dan Abramov's commentary.
              </SectionItem>
              <SectionItem href="https://dev.to/richharris/in-defense-of-the-modern-web-2nia">
                ...and Rich Harris's response.
              </SectionItem>
              <SectionItem href="https://www.youtube.com/watch?v=2Wwx-lF5NhE">
                Why we added tooling to the web, and how we're going to remove
                it.
              </SectionItem>
            </Section>
          </div>
        </Container>
      </div>
    </>
  )
}
