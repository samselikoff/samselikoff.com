import React from "react"
import { Img } from "../components/ui"

export default function BlogPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Projects</h1>

      <div className="mt-12">
        <a href="https://miragejs.com/">
          <Img src="mirage.png" className="shadow-lg rounded-lg" />
        </a>
      </div>
      <div className="mt-12">
        <a href="https://embermap.com/">
          <Img src="embermap4.png" className="shadow-lg rounded-lg" />
        </a>
      </div>

      <div className="mt-16 mb-32">
        <p className="text-xl text-center">Past</p>

        <div className="flex mt-8 -mx-2">
          <div className="w-1/2 mx-2">
            <PastProjectCard href="https://ember-learn.github.io/ember-cli-addon-docs/">
              Addon Docs
            </PastProjectCard>
          </div>
          <div className="w-1/2 mx-2">
            <PastProjectCard href="https://embermap.github.io/ember-data-storefront/">
              Storefront
            </PastProjectCard>
          </div>
        </div>
        <div className="flex mt-4 -mx-2">
          <div className="w-1/2 mx-2">
            <PastProjectCard href="https://github.com/embermap/ember-cli-tailwind">
              Ember CLI Tailwind
            </PastProjectCard>
          </div>
          <div className="w-1/2 mx-2"></div>
        </div>
      </div>
    </>
  )
}

const PastProjectCard = props => (
  <a
    className="block leading-snug font-semibold border border-gray-400 rounded bg-gray-200 text-gray-900 h-24 flex items-center justify-center px-4 text-center"
    href={props.href}
  >
    <p>{props.children}</p>
  </a>
)
