import React from "react"
import SEO from "../components/seo"
import { Link as InternalLink } from "gatsby"
import { Lead, Title, Spacer, Container, A, Img } from "../components/ui"
import { Twitter, GitHub, YouTube } from "../components/logos"

export default function IndexPage() {
  return (
    <>
      <SEO />

      <Container size="some">
        <Spacer size="xl" />

        <Title>Hello!</Title>

        <Spacer size="lg" />

        <Lead>
          I'm Sam Selikoff, and since 2016 I've made a living teaching
          JavaScript UI development on the web.
        </Lead>
      </Container>

      <div className="mt-6 sm:hidden">
        <Img
          src="sam-at-desk-edited3.jpeg"
          aspectRatio={15 / 9}
          imgStyle={{
            objectPosition: "bottom",
          }}
        />
      </div>

      <Container size="some">
        <div className="flex items-center justify-between mt-5 text-xs font-medium text-gray-700 sm:justify-start smm:justify-center smm:text-sm lg:text-base lg:mt-8">
          <a
            href="https://twitter.com/samselikoff"
            className="flex items-center hover:text-gray-800 smm:px-4 sm:pl-0 sm:pr-6 lg:pr-8"
          >
            <Twitter className="h-4 mr-2" />
            <span>Twitter</span>
          </a>
          <a
            href="https://www.youtube.com/user/samselikoff"
            className="flex items-center hover:text-gray-800 smm:px-4 sm:pl-0 sm:pr-6 lg:pr-8"
          >
            <YouTube className="h-4 mr-2" />
            <span>YouTube</span>
          </a>
          <a
            href="https://github.com/samselikoff"
            className="flex items-center hover:text-gray-800 smm:px-4 sm:pl-0 sm:pr-6 lg:pr-8"
          >
            <GitHub className="h-4 mr-2" />
            <span>GitHub</span>
          </a>
        </div>

        <div className="hidden mt-12 overflow-hidden rounded-lg sm:block">
          <Img
            src="sam-at-desk-edited3.jpeg"
            aspectRatio={15 / 9}
            imgStyle={{
              objectPosition: "bottom",
            }}
          />
        </div>

        <div className="mt-16 md:text-lg lg:flex lg:flex-wrap lg:-mx-4">
          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/projects">Projects</SectionTitle>
              <SectionBody>
                <p>
                  I'm currently working on{" "}
                  <A href="https://miragejs.com/">Mirage JS</A>, an API mocking
                  library that lets frontend developers build complete features
                  without touching their backends.{" "}
                </p>
                <p className="mt-6">
                  I also run <A href="https://embermap.com/">embermap.com</A>{" "}
                  where I make videos about design, development and testing
                  using Ember.js, along with my friend{" "}
                  <A href="https://twitter.com/ryantotweets">Ryan Toronto</A>.
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/podcast">Podcast</SectionTitle>
              <SectionBody>
                <p>
                  Join me, Ryan + guests on a weekly podcast where we chat about
                  all things JavaScript UI development – not just Ember!
                </p>
                <p className="mt-6">
                  <A href="https://embermap.com/podcast">
                    → Check out The EmberMap podcast
                  </A>
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/talks">Talks & Interviews</SectionTitle>
              <SectionBody>
                <p>
                  I've given several conference talks and talked about my open
                  source work on a few podcasts.{" "}
                  <A to="/talks">Check them out here.</A>
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/blog">Blog</SectionTitle>
              <SectionBody>
                <p>
                  You can find my writing on <A to="/blog">my blog</A>. I
                  haven't been writing much lately but I'm planning on starting
                  up again.
                </p>
              </SectionBody>
            </Section>
          </div>
        </div>
      </Container>

      <div className="mt-20 md:mt-32 lg:mt-48">
        <Container size="some">
          <Title size="sm">Life</Title>
          <Lead>
            I was born in upstate New York, lived in Florida for 15 years, and
            have since made my way back to the Northeast.
          </Lead>
          <Lead>
            I currently live in New York City + absolutely love it here!
          </Lead>
        </Container>
      </div>

      <div className="mx-auto mt-16 xl:max-w-6xl">
        <ImageCard
          src="new-york.jpeg"
          title="New York City"
          date="2015–Present"
        />
        <div className="flex xl:mt-10 xl:-mx-6">
          <div className="w-1/2 xl:px-6">
            <ImageCard
              src="burlington.jpeg"
              title="Burlington"
              date="2014–2015"
              aspectRatio={1}
            />
          </div>
          <div className="w-1/2 xl:px-6">
            <ImageCard
              src="boston.jpg"
              title="Boston"
              date="2010–2014"
              aspectRatio={1}
            />
          </div>
        </div>
      </div>

      <div className="mt-16" />
    </>
  )
}

function Section({ children }) {
  return <section className="mt-10 md:mt-16 lg:mt-20">{children}</section>
}

function SectionTitle({ link, children }) {
  const T = ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-900 md:text-2xl lg:text-2-5xl">
      {children}
    </h2>
  )

  if (link) {
    return (
      <InternalLink to={link} className="inline-block">
        <T>
          {children}
          <Chevron className="w-4 h-4 ml-1 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </T>
      </InternalLink>
    )
  } else {
    return <T>{children}</T>
  }
}

function SectionBody({ children }) {
  return <div className="mt-2 md:mt-4 lg:mt-6">{children}</div>
}

function Chevron(props) {
  return (
    <svg
      className={`inline fill-current ${props.className}`}
      viewBox="0 0 20 20"
    >
      <g id="Page-1" stroke="none" strokeWidth="1">
        <g id="icon-shape">
          <polygon
            id="Combined-Shape"
            points="12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

function ImageCard({ src, title, date, aspectRatio = 16 / 9 }) {
  return (
    <div className="relative">
      <div className="xl:rounded-lg xl:overflow-hidden">
        <Img src={src} aspectRatio={aspectRatio} />
      </div>
      <div className="absolute bottom-0 w-full py-2 pl-3 text-white md:pl-4 md:py-4 bg-gradient-vignette xl:bg-gradient-none xl:static xl:text-gray-900 xl:px-0">
        <p className="text-sm font-semibold sm:text-base xl:text-lg xl:font-medium">
          {title}
        </p>
        <p className="text-xs sm:text-sm xl:text-gray-700">{date}</p>
      </div>
    </div>
  )
}
