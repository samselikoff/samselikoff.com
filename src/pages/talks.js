import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function TalksPage({ data }) {
  let talks = [
    {
      image: "embercamp2018",
      links: [
        {
          label: "Talk",
          url: "https://www.youtube.com/watch?v=dWu2PxfFcUI",
        },

        {
          label: "Slides",
          url:
            "https://www.slideshare.net/samselikoff/stop-coding-you-have-a-product-gap",
        },
      ],
    },
    {
      image: "emberconf2018",
      links: [
        {
          label: "Talk",
          url: "https://www.youtube.com/watch?v=PVzutIELrf4",
        },
      ],
    },
    {
      image: "uipatterns2017",
      links: [
        {
          label: "Slides",
          url: "https://www.slideshare.net/samselikoff/common-ui-patterns",
        },
      ],
    },
    {
      image: "emberconf2015",
      links: [
        {
          label: "Talk",
          url: "https://www.youtube.com/watch?v=iwPsNTkyCcA",
        },
        {
          label: "Slides",
          url:
            "https://www.slideshare.net/mobile/samselikoff/frontend-infrastructure",
        },
      ],
    },
    {
      image: "openvisconf2014",
      links: [
        {
          label: "Talk",
          url: "https://www.youtube.com/watch?v=ca3pQWc2-Xs",
        },
      ],
    },
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center">Talks & Interviews</h1>

      {talks.map(talk => (
        <div className="mt-12" key={talk.image}>
          <a href={talk.links[0].url}>
            <Img
              className="shadow-lg rounded-lg "
              fluid={{
                ...data[talk.image].childImageSharp.fluid,
                aspectRatio: 16 / 9,
              }}
            />
          </a>
          <p className="mt-4 text-center text-sm">
            {talk.links
              .map(link => (
                <a key={link.url} href={link.url}>
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
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    embercamp2018: file(relativePath: { eq: "talks/embercamp2018.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    emberconf2018: file(relativePath: { eq: "talks/emberconf2018.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    uipatterns2017: file(relativePath: { eq: "talks/uipatterns2017.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    emberconf2015: file(relativePath: { eq: "talks/emberconf2015.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    openvisconf2014: file(relativePath: { eq: "talks/openvisconf2014.png" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
