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

      <div className="mt-16">
        <p className="text-xl text-center">Past</p>
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
