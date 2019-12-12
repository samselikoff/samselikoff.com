import React from "react"
import { Spacer, Container, Lead, H1, A, Img } from "../components/ui"

export default function() {
  return (
    <div className="md:text-lg-">
      <Container size="some">
        <Spacer size="xl" />

        <H1>Podcast</H1>

        <Spacer size="large" />

        <Lead>
          For more than two years I've used{" "}
          <A href="https://embermap.com/podcast">The EmberMap Podcast</A> to
          talk about whatever's going on in my day-to-day life doing frontend
          development, along with my co-host Ryan Toronto.
        </Lead>

        <Lead>
          While we originally focused on Ember.js, these days we talk about
          whatever's happening in the world of JavaScript UI development.
        </Lead>

        <Lead>Check out some of my favorite episodes below.</Lead>

        <div className="lg:mt-4 xl:mt-16">
          <div className="lg:flex lg:flex-wrap lg:-mx-4">
            {podcasts.map(podcast => (
              <div className="mt-16 lg:w-1/2 lg:px-4" key={podcast.url}>
                <PodcastCard
                  title={podcast.title}
                  url={podcast.url}
                  imageUrl={podcast.imageUrl}
                >
                  {podcast.description}
                </PodcastCard>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <hr />
          </div>

          <div className="mt-8 mb-24 text-base md:text-lg">
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
      </Container>
    </div>
  )
}

const PodcastCard = props => (
  <>
    <a href={props.url} className="relative block overflow-hidden rounded-lg">
      <Img src={props.imageUrl} />
    </a>
    <h2 className="mt-4 text-lg font-semibold leading-snug text-gray-900 md:text-1-5xl lg:text-xl">
      <a href={props.url}>{props.title}</a>
    </h2>
    <p className="mt-2">{props.children}</p>
    <p className="mt-2 md:mt-3">
      <a
        className="text-sm font-medium text-blue-600 md:text-base"
        href={props.url}
      >
        Play episode →
      </a>
    </p>
  </>
)

const podcasts = [
  {
    title: "Adam Wathan on Tailwind CSS",
    url: "https://embermap.com/podcast/adam-wathan-on-tailwind-css",
    imageUrl: "podcasts/adam-wathan-on-tailwind-css.jpg",
    description: `I loved this conversation because Adam does a great job breaking down the utility-first CSS approach to its first principles.`,
  },
  {
    title: "Yehuda Katz on Paradigms vs. Abstractions in UI Development",
    url:
      "https://embermap.com/podcast/yehuda-katz-on-paradigms-vs-abstractions-in-ui-development",
    imageUrl:
      "podcasts/yehuda-katz-on-paradigms-vs-abstractions-in-ui-development.jpg",
    description: `Yehuda is a wealth of knowledge. In this episode he shares why he believes abstractions should get more attention than paradigms – an interesting distinction I wasn't yet familiar with.`,
  },
  {
    title: "Derrick Reimer on SPA Architecture with Elm and GraphQL",
    url:
      "https://embermap.com/podcast/derrick-reimer-on-spa-architecture-with-elm-and-graphql",
    imageUrl:
      "podcasts/derrick-reimer-on-spa-architecture-with-elm-and-graphql.jpg",
    description: `Derrick shares some really interesting aspects of the tech stack he used when building his real-time chat app, Level.`,
  },
  {
    title: "Edward Faulkner on Embroider, Ember CLI's Modern Build System",
    url:
      "https://embermap.com/podcast/edward-faulkner-on-embroider-ember-cli-s-modern-build-system",
    imageUrl:
      "podcasts/edward-faulkner-on-embroider-ember-cli-s-modern-build-system.jpg",
    description: `Ed is one of those developers who pulls together insights from so many different areas of knowledge. I loved learning more about compilers in this episode.`,
  },
  {
    title: "APIs are about Policy",
    url: "https://embermap.com/podcast/apis-are-about-policy",
    imageUrl: "podcasts/apis-are-about-policy.jpg",
    description: `This is a good representitive episode of the show since it's just Ryan and me talking. It's a bit of a special episode though, because in this one we do a deep dive of the wonderful essay "APIs are about Policy" by Steven Wittens.`,
  },
]
