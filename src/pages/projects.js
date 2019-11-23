import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function BlogPage({ data }) {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Projects</h1>

      <div className="mt-12">
        <a href="https://miragejs.com/">
          <Img
            className="shadow-lg rounded-lg "
            fluid={{
              ...data.mirage.childImageSharp.fluid,
              aspectRatio: 16 / 9,
            }}
          />
        </a>
      </div>
      <div className="mt-12">
        <a href="https://embermap.com/">
          <Img
            className="shadow-lg rounded-lg"
            fluid={{
              ...data.embermap.childImageSharp.fluid,
              aspectRatio: 16 / 9,
            }}
          />
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

export const query = graphql`
  query {
    mirage: file(relativePath: { eq: "mirage.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    embermap: file(relativePath: { eq: "embermap4.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const PastProjectCard = props => (
  <a
    className="block leading-snug font-semibold border border-gray-400 rounded bg-gray-200 text-gray-900 h-24 flex items-center justify-center px-4 text-center"
    href={props.href}
  >
    <p>{props.children}</p>
  </a>
)
