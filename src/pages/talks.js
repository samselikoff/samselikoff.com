import React from "react"
import { A, Spacer, Lead, Container, H1, Img } from "../components/ui"

export default function TalksPage() {
  return (
    <div className="md:text-lg-">
      <Container size="some">
        <Spacer size="xl" />

        <H1>Talks</H1>

        <Spacer size="large" />

        <Lead>
          I love talking about my favorite technologies, my experience working
          on software teams, and lessons learned running open-source projects.
        </Lead>

        <Lead>
          <A href="mailto:sam@samselikoff.com">Contact me</A> if you think I'd
          be a good fit for your podcast, meetup or conference!
        </Lead>

        <div className="lg:flex lg:flex-wrap lg:-mx-4">
          {talks.map(talk => (
            <div
              className="mt-12 md:mt-16 lg:mt-20 lg:w-1/2 lg:px-4"
              key={talk.url}
            >
              <Talk talk={talk} />
            </div>
          ))}
        </div>

        <div className="mt-20 mb-32 md:mt-32">
          <H1>Interviews</H1>

          <div className="flex flex-wrap md:-mx-3 lg:-mx-4">
            {interviews.map(interview => (
              <div
                className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3 lg:w-1/3 lg:px-4"
                key={interview.url}
              >
                <Interview interview={interview} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

const Talk = ({ talk }) => {
  return (
    <>
      <a href={talk.url} className="block overflow-hidden rounded-lg">
        <Img src={talk.image} />
      </a>
      <div className="leading-snug">
        <p className="mt-3 text-sm font-semibold text-gray-500 md:text-base lg:text-sm">
          {talk.presentedAt}
        </p>
        <p className="text-lg font-semibold md:text-2xl lg:text-xl lg:mt-1">
          <a href={talk.url}>{talk.title}</a>
        </p>
      </div>
    </>
  )
}

const Interview = ({ interview }) => {
  return (
    <>
      <div>
        <a href={interview.url} className="block shadow">
          <Img src={interview.image} aspectRatio={1} />
        </a>
      </div>
      <div className="leading-snug">
        <p className="mt-3 text-sm font-semibold text-gray-500">
          {interview.byline}
        </p>
        <p className="mt-1 text-lg font-semibold">
          <a href={interview.url}>{interview.title}</a>
        </p>
      </div>
    </>
  )
}

const talks = [
  {
    title: "Stop Coding: You Have a Product Gap",
    presentedAt: "EmberCamp 2018",
    image: "talks/embercamp2018.png",
    url: "https://www.youtube.com/watch?v=dWu2PxfFcUI",
  },
  {
    title: "Better Documentation with AddonDocs",
    presentedAt: "EmberConf 2018",
    image: "talks/emberconf2018.png",
    url: "https://www.youtube.com/watch?v=PVzutIELrf4",
  },
  {
    title: "Common Principles of UI Development",
    presentedAt: "Manhattan JS, May 2017",
    image: "talks/uipatterns2017.png",
    url: "https://www.slideshare.net/samselikoff/common-ui-patterns",
  },
  {
    title: "Deploying Ember Apps",
    presentedAt: "Ember NYC, January 2015",
    image: "talks/embernyc2015.png",
    url: "https://youtu.be/nvB8iAwc2QQ?t=4560",
  },
  {
    title: "Bring Sanity to your Frontend Infrastucture with Ember JS",
    presentedAt: "EmberConf 2015",
    image: "talks/emberconf2015.png",
    url: "https://www.youtube.com/watch?v=iwPsNTkyCcA",
  },
  {
    title: "Using D3 with Backbone, Angular and Ember",
    presentedAt: "OpenVis Conf 2014",
    image: "talks/openvisconf2014.png",
    url: "https://www.youtube.com/watch?v=ca3pQWc2-Xs",
  },
  {
    title: "Introduction to D3",
    presentedAt: "Analytics BigData Cloud & Discovery Meetup, February 2014",
    image: "talks/introtod32014.png",
    url: "https://www.youtube.com/watch?v=kFCDA1uzGFo",
  },
]

const interviews = [
  {
    url: "http://www.fullstackradio.com/106",
    image: "interviews/fullstackradio.jpg",
    byline: "Full Stack Radio #106",
    title: "Sam Selikoff - Single Page Application Architecture",
  },
  {
    url: "http://www.fullstackradio.com/89",
    image: "interviews/fullstackradio.jpg",
    byline: "Full Stack Radio #89",
    title: "Sam Selikoff - Choosing Ember.js in 2018",
  },
  {
    url: "https://frontside.io/podcast/037-ember-cli-mirage-with-sam-selikoff/",
    image: "interviews/thefrontside.jpg",
    byline: "The Frontside Podcast #37",
    title: "Ember CLI Mirage with Sam Selikoff",
  },
  {
    url: "https://emberweekend.com/episodes/consumer-driven-weekend/",
    image: "interviews/emberweekend.png",
    byline: "Ember Weekend #19",
    title: "Consumer Driven Weekend with Sam Selikoff",
  },
  {
    url: "https://devchat.tv/js-jabber/jsj-364-ember-octane-with-sam-selikoff/",
    image: "interviews/javascriptjabber.jpg",
    byline: "JavaScript Jabber #364",
    title: "Ember Octane with Sam Selikoff",
  },
  {
    url: "https://devchat.tv/my-javascript-story/mjs-121-sam-selikoff/",
    image: "interviews/myjavascriptstory.jpg",
    byline: "My JavaScript Story #121",
    title: "Sam Selikoff",
  },
]
