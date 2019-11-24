import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

export const A = ({ children, ...props }) => {
  props.className += ` underline text-blue-600 font-semibold`
  let isInternalLink = props.to && props.to.startsWith("/")
  let LinkComponent = isInternalLink ? Link : `a`

  return <LinkComponent {...props}>{children}</LinkComponent>
}

export const Img = props => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `)
  let aspectRatio = props.aspectRatio || 16 / 9

  let imageData = data.allFile.nodes.find(
    file => file.relativePath === props.src
  ).childImageSharp.fluid

  return (
    <GatsbyImage
      className={props.className}
      fluid={{ ...imageData, aspectRatio }}
    />
  )
}
