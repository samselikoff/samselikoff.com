import React from "react"
import { A, Img } from "../components/ui"

export default function() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Podcast</h1>

      <div className="mt-8">
        <p className="text-lg">
          For more than two years I've used <A>The EmberMap Podcast</A> to talk
          about whatever's going on in my day-to-day life doing frontend
          development, along with my co-host Ryan Toronto.
        </p>
        <p className="text-lg mt-4">
          While originally we focused on the Ember.js framework, it has since
          become more broad. These days we talk about anything going on in the
          world of JavaScript UI development.
        </p>
        <p className="text-lg mt-4">
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
            Yehuda is a wealth of knowledge I've learned so much from. In this
            episode he shares why he believes abstractions should get more
            attention than paradigms – an interesting distinction I wasn't yet
            familiar with.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="Derrick Reimer on SPA architecture with Elm and GraphQL"
            url="https://embermap.com/podcast/derrick-reimer-on-spa-architecture-with-elm-and-graphql"
            imageUrl="podcasts/derrick-reimer-on-spa-architecture-with-elm-and-graphql.jpg"
          >
            Derrick shares some really interesting aspects of the tech stack he
            used when building his real-time chat app, Level.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="Edward Faulkner on Embroider, Ember CLI's modern build system"
            url="https://embermap.com/podcast/edward-faulkner-on-embroider-ember-cli-s-modern-build-system"
            imageUrl="podcasts/edward-faulkner-on-embroider-ember-cli-s-modern-build-system.jpg"
          >
            Ed is one of those developers who can pull knowledge from so many
            different areas and provide some truly unique insights. I loved
            learning more about compilers in this episode.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <PodcastCard
            title="APIs are about Policy"
            url="https://embermap.com/podcast/apis-are-about-policy"
            imageUrl="podcasts/apis-are-about-policy.jpg"
          >
            This is a good representitive episode of the show, because it's just
            Ryan and me talking. This one is a bit special though, because in it
            we do a deep dive of the wonderful essay "APIs are about Policy" by
            Steven Wittens.
          </PodcastCard>
        </div>

        <div className="mt-16">
          <hr />
        </div>

        <div className="mt-8 mb-24">
          <p>
            View the rest of the episodes by checking out the show's website:
          </p>
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
    </>
  )
}

const PodcastCard = props => (
  <div className="mt-8">
    <a className="text-lg font-semibold leading-tight" href={props.url}>
      {props.title}
    </a>
    <a
      href={props.url}
      className="relative mt-4 block rounded shadow-md overflow-hidden"
    >
      <Img src={props.imageUrl} />
    </a>
    <p className="mt-4">{props.children}</p>
    <p className="mt-2">
      <a className="text-sm font-medium text-blue-500" href={props.url}>
        Play episode →
      </a>
    </p>
  </div>
)
