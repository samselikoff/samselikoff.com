import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function BlogPage({ data }) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center">Projects</h1>

      <div className="mt-12">
        <Img
          className="shadow-lg rounded-lg "
          fluid={{
            ...data.mirage.childImageSharp.fluid,
            aspectRatio: 16 / 9,
          }}
        />
      </div>
      <div className="mt-12">
        <Img
          className="shadow-lg rounded-lg"
          fluid={{
            ...data.embermap.childImageSharp.fluid,
            aspectRatio: 16 / 9,
          }}
        />
      </div>

      <div className="mt-16">
        <p className="text-xl text-center">Past</p>
      </div>
    </Layout>
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
