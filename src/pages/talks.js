import React from "react"
import { H1, Img } from "../components/ui"

export default function TalksPage() {
  return (
    <div className="max-w-xl px-6 pt-8 mx-auto lg:max-w-2xl">
      <H1>Talks</H1>

      <div className="mt-12">
        <Talk
          title="Stop Coding: You Have a Product Gap"
          presentedAt="EmberCamp 2018"
          image="talks/embercamp2018.png"
          url="https://www.youtube.com/watch?v=dWu2PxfFcUI"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Better Documentation with AddonDocs"
          presentedAt="EmberConf 2018"
          image="talks/emberconf2018.png"
          url="https://www.youtube.com/watch?v=PVzutIELrf4"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Common Principles of UI Development"
          presentedAt="Manhattan JS, May 2017"
          image="talks/uipatterns2017.png"
          url="https://www.slideshare.net/samselikoff/common-ui-patterns"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Deploying Ember Apps"
          presentedAt="Ember NYC, January 2015"
          image="talks/embernyc2015.png"
          url="https://youtu.be/nvB8iAwc2QQ?t=4560"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Bring Sanity to your Frontend Infrastucture with Ember JS"
          presentedAt="EmberConf 2015"
          image="talks/emberconf2015.png"
          url="https://www.youtube.com/watch?v=iwPsNTkyCcA"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Using D3 with Backbone, Angular and Ember"
          presentedAt="OpenVis Conf 2014"
          image="talks/openvisconf2014.png"
          url="https://www.youtube.com/watch?v=ca3pQWc2-Xs"
        />
      </div>
      <div className="mt-12">
        <Talk
          title="Introduction to D3"
          presentedAt="Analytics BigData Cloud & Discovery Meetup, February 2014"
          image="talks/introtod32014.png"
          url="https://www.youtube.com/watch?v=kFCDA1uzGFo"
        />
      </div>

      <div className="mt-16 mb-32">
        <h1 className="text-3xl font-semibold text-center">Interviews</h1>

        <div className="flex flex-wrap md:-mx-3">
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="http://www.fullstackradio.com/106"
              image="interviews/fullstackradio.jpg"
              byline="Full Stack Radio #106"
              title="Sam Selikoff - Single Page Application Architecture"
            />
          </div>
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="http://www.fullstackradio.com/89"
              image="interviews/fullstackradio.jpg"
              byline="Full Stack Radio #89"
              title="Sam Selikoff - Choosing Ember.js in 2018"
            />
          </div>
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="https://frontside.io/podcast/037-ember-cli-mirage-with-sam-selikoff/"
              image="interviews/thefrontside.jpg"
              byline="The Frontside Podcast #37"
              title="Ember CLI Mirage with Sam Selikoff"
            />
          </div>
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="https://emberweekend.com/episodes/consumer-driven-weekend/"
              image="interviews/emberweekend.png"
              byline="Ember Weekend #19"
              title="Consumer Driven Weekend with Sam Selikoff"
            />
          </div>
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="https://devchat.tv/js-jabber/jsj-364-ember-octane-with-sam-selikoff/"
              image="interviews/javascriptjabber.jpg"
              byline="JavaScript Jabber #364"
              title="Ember Octane with Sam Selikoff"
            />
          </div>
          <div className="w-2/3 mx-auto mt-16 md:w-1/2 md:px-3">
            <Interview
              url="https://devchat.tv/my-javascript-story/mjs-121-sam-selikoff/"
              image="interviews/myjavascriptstory.jpg"
              byline="My JavaScript Story #121"
              title="Sam Selikoff"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Talk = props => {
  return (
    <>
      <a href={props.url}>
        <Img src={props.image} />
      </a>
      <div className="leading-snug">
        <p className="mt-3 text-sm font-semibold text-gray-500 md:text-base">
          {props.presentedAt}
        </p>
        <p className="text-lg font-semibold md:text-2xl">
          <a href={props.url}>{props.title}</a>
        </p>
      </div>
    </>
  )
}

const Interview = props => {
  return (
    <>
      <div>
        <a href={props.url} className="block shadow">
          <Img src={props.image} aspectRatio={1} />
        </a>
      </div>
      <div className="leading-snug">
        <p className="mt-3 text-sm font-semibold text-gray-500">
          {props.byline}
        </p>
        <p className="mt-1 text-lg font-semibold">
          <a href={props.url}>{props.title}</a>
        </p>
      </div>
    </>
  )
}
