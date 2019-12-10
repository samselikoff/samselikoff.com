import React from "react"
import { H1, Img, Container } from "../components/ui"

export default function BlogPage() {
  return (
    <div className="pt-6 pb-8 md:pt-12">
      <Container size="large">
        <H1>Projects</H1>

        <div className="max-w-lg mx-auto md:max-w-full md:mt-4 ">
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
              <p className="text-xl text-center md:text-2xl">Past</p>

              <div className="flex flex-wrap mt-4 -mx-2">
                <div className="w-1/2 px-2 md:w-1/3">
                  <PastProjectCard href="https://ember-learn.github.io/ember-cli-addon-docs/">
                    Addon Docs
                  </PastProjectCard>
                </div>
                <div className="w-1/2 px-2 md:w-1/3">
                  <PastProjectCard href="https://embermap.github.io/ember-data-storefront/">
                    Storefront
                  </PastProjectCard>
                </div>
                <div className="w-1/2 px-2 md:w-1/3">
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
  )
}

const PastProjectCard = props => (
  <a
    className="flex items-center justify-center block h-24 px-4 mt-4 font-semibold leading-snug text-center text-gray-900 bg-gray-200 border border-gray-400 rounded"
    href={props.href}
  >
    <p>{props.children}</p>
  </a>
)
