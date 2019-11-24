import React from "react"
import { Img } from "../components/ui"

export default function TalksPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Talks</h1>

      <div className="mt-12">
        <Talk
          image="talks/embercamp2018.png"
          talkUrl="https://www.youtube.com/watch?v=dWu2PxfFcUI"
          slidesUrl="https://www.slideshare.net/samselikoff/stop-coding-you-have-a-product-gap"
        />
      </div>
      <div className="mt-12">
        <Talk
          image="talks/emberconf2018.png"
          talkUrl="https://www.youtube.com/watch?v=PVzutIELrf4"
        />
      </div>
      <div className="mt-12">
        <Talk
          image="talks/uipatterns2017.png"
          slidesUrl="https://www.slideshare.net/samselikoff/common-ui-patterns"
        />
      </div>
      <div className="mt-12">
        <Talk
          image="talks/emberconf2015.png"
          talkUrl="https://www.youtube.com/watch?v=iwPsNTkyCcA"
          slidesUrl="https://www.slideshare.net/mobile/samselikoff/frontend-infrastructure"
        />
      </div>
      <div className="mt-12">
        <Talk
          image="talks/openvisconf2014.png"
          talkUrl="https://www.youtube.com/watch?v=ca3pQWc2-Xs"
        />
      </div>
      <div className="mt-12">
        <Talk
          image="talks/introtod32014.png"
          talkUrl="https://www.youtube.com/watch?v=kFCDA1uzGFo"
        />
      </div>

      <div className="mt-16">
        <h1 className="text-3xl font-semibold text-center">Interviews</h1>

        <div className="mt-16">
          <Interview
            url="http://www.fullstackradio.com/106"
            image="interviews/fullstackradio.jpg"
            byline="Full Stack Radio #106"
            title="Sam Selikoff - Single Page Application Architecture"
          />
        </div>

        <div className="mt-16">
          <Interview
            url="http://www.fullstackradio.com/89"
            image="interviews/fullstackradio.jpg"
            byline="Full Stack Radio #89"
            title="Sam Selikoff - Choosing Ember.js in 2018"
          />
        </div>

        <div className="mt-16">
          <Interview
            url="https://frontside.io/podcast/037-ember-cli-mirage-with-sam-selikoff/"
            image="interviews/thefrontside.jpg"
            byline="The Frontside Podcast #37"
            title="Ember CLI Mirage with Sam Selikoff"
          />
        </div>

        <div className="mt-16">
          <Interview
            url="https://emberweekend.com/episodes/consumer-driven-weekend/"
            image="interviews/emberweekend.png"
            byline="Ember Weekend #19"
            title="Consumer Driven Weekend with Sam Selikoff"
          />
        </div>

        <div className="mt-16">
          <Interview
            url="https://devchat.tv/js-jabber/jsj-364-ember-octane-with-sam-selikoff/"
            image="interviews/javascriptjabber.jpg"
            byline="JavaScript Jabber #364"
            title="Ember Octane with Sam Selikoff"
          />
        </div>

        <div className="mt-16">
          <Interview
            url="https://devchat.tv/my-javascript-story/mjs-121-sam-selikoff/"
            image="interviews/myjavascriptstory.jpg"
            byline="My JavaScript Story #121"
            title="Sam Selikoff"
          />
        </div>
      </div>
    </>
  )
}

const Talk = props => {
  let bestUrl = props.talkUrl || props.slidesUrl

  let links = []
  if (props.talkUrl) {
    links.push({ label: "Talk", url: props.talkUrl })
  }
  if (props.slidesUrl) {
    links.push({ label: "Slides", url: props.slidesUrl })
  }

  return (
    <>
      <a href={bestUrl}>
        <Img src={props.image} />
      </a>
      <p className="mt-4 text-center">
        {links
          .map(link => (
            <a
              className="text-blue-500 font-medium"
              key={link.url}
              href={link.url}
            >
              {link.label}
            </a>
          ))
          .reduce((prev, curr, index) => [
            prev,
            <span className="px-2" key={index}>
              ·
            </span>,
            curr,
          ])}
      </p>
    </>
  )
}

const Interview = props => {
  return (
    <div className="w-2/3 mx-auto">
      <div>
        <a href={props.url} className="block shadow">
          <Img src={props.image} aspectRatio={1} />
        </a>
      </div>
      <div className="leading-snug">
        <p className="mt-3 text-sm font-semibold text-gray-500">
          {props.byline}
        </p>
        <p className="mt-1 font-semibold text-lg">
          <a href={props.url}>{props.title}</a>
        </p>
      </div>
    </div>
  )
}
