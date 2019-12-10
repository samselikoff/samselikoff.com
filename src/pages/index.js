import React from "react"
import SEO from "../components/seo"
import { Link as InternalLink } from "gatsby"
import { A, Img } from "../components/ui"
import { Twitter, GitHub, YouTube } from "../components/logos"

export default function IndexPage() {
  return (
    <>
      <SEO />

      <div className="mb-12 leading-normal md:text-xl">
        <section className="py-10 mx-auto font-light bg-gray-100 md:border-b md:border-t md:border-gray-200 md:py-20 lg:py-32 text-lg- xs:text-xl sm:text-2xl sm:tracking-none lg:text-3xl">
          {/* tracking-normal here is a hack, it loses to font-size */}
          <div className="max-w-xs px-6 mx-auto tracking-normal xs:max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-5xl">
            <div className="relative md:flex">
              <div className="absolute right-0 md:static xs:pt-1 md:pt-0 md:pr-8 lg:pr-12">
                <div>
                  <Img
                    className="w-16 border border-gray-800 rounded-full sm:border-2 xs:w-20 sm:w-32 md:w-32 lg:w-48 lg:border-3"
                    src="profile.jpeg"
                    aspectRatio={1}
                  />
                </div>
              </div>
              <div>
                <p>
                  Hey there!{" "}
                  <span role="img" aria-label="wave">
                    👋
                  </span>
                </p>

                <p className="mt-4">
                  I'm{" "}
                  <A
                    href="https://twitter.com/samselikoff"
                    font="normal"
                    underline={false}
                  >
                    @samselikoff
                  </A>
                  , and <br className="md:hidden" /> since 2016 I've made a
                  <br className="md:hidden" /> living teaching JavaScript
                  <br className="md:hidden" /> UI development on the web.
                </p>

                <div className="items-center hidden mt-6 text-xl font-normal lg:flex">
                  <a
                    href="https://twitter.com/samselikoff"
                    className="flex items-center mr-10"
                  >
                    <Twitter className="h-5 mr-3" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://www.youtube.com/user/samselikoff"
                    className="flex items-center mr-10"
                  >
                    <YouTube className="h-5 mr-3" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://github.com/samselikoff"
                    className="flex items-center mr-10"
                  >
                    <GitHub className="h-5 mr-3" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-sm px-6 mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
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
                where I make videos about design, development and testing using
                Ember.js, along with my friend{" "}
                <A href="https://twitter.com/ryantotweets">Ryan Toronto</A>.
              </p>
            </SectionBody>
          </Section>

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

          <Section>
            <SectionTitle link="/blog">Blog</SectionTitle>
            <SectionBody>
              <p>
                You can find my writing on <A to="/blog">my blog</A>. I haven't
                been writing much lately but I'm planning on starting up again.
              </p>
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Life</SectionTitle>
            <SectionBody>
              <p>
                I was born in upstate New York, lived in Florida for 15 years,
                and have since made my way back to the Northeast.
              </p>
              <p className="mt-6">
                I currently live in New York City + absolutely love it here!
              </p>
            </SectionBody>
          </Section>
        </div>

        <div className="mt-8 lg:mt-16">
          <ImageCard
            src="new-york.jpeg"
            title="New York City"
            date="2015–Present"
          />
          <div className="flex">
            <ImageCard
              src="burlington.jpeg"
              title="Burlington"
              date="2014–2015"
              className="w-1/2"
              aspectRatio={1}
            />
            <ImageCard
              src="boston.jpg"
              title="Boston"
              date="2010–2014"
              className="w-1/2"
              aspectRatio={1}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function Section({ children }) {
  return <section className="mt-10 md:mt-16 lg:mt-20">{children}</section>
}

function SectionTitle({ link, children }) {
  if (link) {
    return (
      <InternalLink to={link} className="inline-block">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-2-5xl">
          {children}
          <Chevron className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </h2>
      </InternalLink>
    )
  } else {
    return (
      <h2 className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
        {children}
      </h2>
    )
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

function ImageCard({ src, title, date, className, aspectRatio = 16 / 9 }) {
  return (
    <div className={`relative ${className}`}>
      <Img src={src} aspectRatio={aspectRatio} />
      <div
        className="absolute bottom-0 w-full py-2 pl-3 text-white md:pl-4 md:py-4"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p className="text-sm font-semibold sm:text-base md:text-xl">{title}</p>
        <p className="text-xs sm:text-sm md:text-lg">{date}</p>
      </div>
    </div>
  )
}
