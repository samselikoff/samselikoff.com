import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

export const A = ({
  children,
  font = "medium",
  underline = true,
  ...props
}) => {
  let border = underline
    ? `border-b border-blue-400 hover:border-blue-500 `
    : ``
  props.className += ` ${border} font-${font} text-blue-600`
  let isInternalLink = props.to && props.to.startsWith("/")
  let LinkComponent = isInternalLink ? Link : `a`

  return <LinkComponent {...props}>{children}</LinkComponent>
}

export function H1({ children }) {
  return (
    <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
      {children}
    </h1>
  )
}

export function Container({ size, children }) {
  let styles = {
    small: "max-w-sm mx-auto px-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl", // Home
    some: "max-w-xl px-6 mx-auto lg:max-w-2xl", // Podcast
    medium: "max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-16", // Blog post
    large: "max-w-2xl px-6 mx-auto md:max-w-xl", // Projects
  }

  return <div className={styles[size]}>{children}</div>
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
