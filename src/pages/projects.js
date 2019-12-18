import React from "react"
import { Title, Img, Container, Lead, Spacer, A } from "../components/ui"
import { Helmet } from "react-helmet"

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Projects</title>
      </Helmet>

      <div className="pb-8">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Projects</Title>

          <Spacer size="lg" />

          <Lead>
            My main open source project is{" "}
            <A href="https://miragejs.com/">Mirage JS</A>, and I'm currently
            working on bringing it from Ember to the wider JavaScript ecosystem.
          </Lead>

          <Lead>
            The rest of my time is spent teaching UI development through videos
            on EmberMap and YouTube. I also run in-person trainings and do
            remote mentoring for a handful of frontend teams.
          </Lead>

          <div className="md:mt-4 ">
            <div className="">
              <div className="md:flex md:-mx-4">
                <div className="mt-12 md:w-1/2 md:mx-4">
                  <a href="https://miragejs.com/">
                    <Img src="mirage.png" className="rounded-lg shadow-lg" />
                  </a>
                </div>
                <div className="mt-12 md:w-1/2 md:mx-4">
                  <a href="https://embermap.com/">
                    <Img src="embermap4.png" className="rounded-lg shadow-lg" />
                  </a>
                </div>
              </div>

              <div className="mt-16 mb-32 md:mt-24">
                <p className="text-2xl font-semibold md:text-2xl">
                  Previous work
                </p>

                <div className="flex flex-wrap mt-4 -mx-2">
                  <div className="w-full px-2 md:w-1/3">
                    <PastProjectCard href="https://ember-learn.github.io/ember-cli-addon-docs/">
                      Addon Docs
                    </PastProjectCard>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <PastProjectCard href="https://embermap.github.io/ember-data-storefront/">
                      Storefront
                    </PastProjectCard>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <PastProjectCard href="https://github.com/embermap/ember-cli-tailwind">
                      Ember CLI Tailwind
                    </PastProjectCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

const PastProjectCard = props => (
  <a
    className="flex items-center justify-center block h-24 px-4 mt-4 font-medium leading-snug text-center text-gray-600 bg-white rounded shadow hover:text-gray-700"
    href={props.href}
  >
    <p>{props.children}</p>
  </a>
)
