import React from "react"
import { H1, A, Img } from "../components/ui"

export default function() {
  return (
    <div className="max-w-xl px-6 pt-8 mx-auto md:pt-12 lg:pt-20 lg:max-w-2xl">
      <H1>Podcast</H1>

      <div className="mt-8 md:text-lg">
        <p className="text-lg">
          For more than two years I've used{" "}
          <A href="https://embermap.com/podcast">The EmberMap Podcast</A> to
          talk about whatever's going on in my day-to-day life doing frontend
          development, along with my co-host Ryan Toronto.
        </p>

        <p className="mt-8 md:mt-6">
          While we originally focused on Ember.js, these days we talk about
          anything going on in the world of JavaScript UI development.
        </p>

        <p className="mt-4 md:mt-6">
          Check out some of my favorite episodes below.
        </p>
        <div className="mt-8">
          <hr />
        </div>

        <div className="mt-10">
          <PodcastCard
            title="Adam Wathan on Tailwind CSS"
            url="https://embermap.com/podcast/adam-wathan-on-tailwind-css"
            imageUrl="podcasts/adam-wathan-on-tailwind-css.jpg"
          >
            I loved this conversation because Adam does a great job breaking the
            utility-first CSS approach down to its first principles.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="Yehuda Katz on Paradigms vs. Abstractions in UI Development"
            url="https://embermap.com/podcast/yehuda-katz-on-paradigms-vs-abstractions-in-ui-development"
            imageUrl="podcasts/yehuda-katz-on-paradigms-vs-abstractions-in-ui-development.jpg"
          >
            Yehuda is a wealth of knowledge. In this episode he shares why he
            believes abstractions should get more attention than paradigms – an
            interesting distinction I wasn't yet familiar with.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="Derrick Reimer on SPA Architecture with Elm and GraphQL"
            url="https://embermap.com/podcast/derrick-reimer-on-spa-architecture-with-elm-and-graphql"
            imageUrl="podcasts/derrick-reimer-on-spa-architecture-with-elm-and-graphql.jpg"
          >
            Derrick shares some really interesting aspects of the tech stack he
            used when building his real-time chat app, Level.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="Edward Faulkner on Embroider, Ember CLI's Modern Build System"
            url="https://embermap.com/podcast/edward-faulkner-on-embroider-ember-cli-s-modern-build-system"
            imageUrl="podcasts/edward-faulkner-on-embroider-ember-cli-s-modern-build-system.jpg"
          >
            Ed is one of those developers who pulls together insights from so
            many different areas of knowledge. I loved learning more about
            compilers in this episode.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="APIs are about Policy"
            url="https://embermap.com/podcast/apis-are-about-policy"
            imageUrl="podcasts/apis-are-about-policy.jpg"
          >
            This is a good representitive episode of the show, because it's just
            Ryan and me talking. It's a bit of a special episode though, because
            in this one we do a deep dive of the wonderful essay "APIs are about
            Policy" by Steven Wittens.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <hr />
        </div>

        <div className="mt-8 mb-24">
          <p>View the rest of the episodes on the show's website:</p>
          <p className="mt-4">
            <a
              className="font-medium text-blue-500 underline"
              href="https://embermap.com/podcast"
            >
              → The EmberMap Podcast
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const PodcastCard = props => (
  <div className="mt-8">
    <h2 className="text-lg font-semibold leading-tight md:text-2xl">
      <a href={props.url}>{props.title}</a>
    </h2>
    <a
      href={props.url}
      className="relative block mt-4 overflow-hidden rounded shadow-md"
    >
      <Img src={props.imageUrl} />
    </a>
    <p className="mt-4">{props.children}</p>
    <p className="mt-2 md:mt-3">
      <a
        className="text-sm font-medium text-blue-500 md:text-lg"
        href={props.url}
      >
        Play episode →
      </a>
    </p>
  </div>
)
