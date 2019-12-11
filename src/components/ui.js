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
    <h1 className="text-5xl font-semibold leading-tight text-gray-800 md:text-6xl lg:text-7xl lg:font-medium xl:text-8xl">
      {children}
    </h1>
  )
}

export function Lead({ children }) {
  return (
    <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-2xl">
      {children}
    </p>
  )
}
export function Spacer({ size }) {
  let styles = {
    large: "mt-8 md:mt-10 xl:mt-16",
  }

  return <div className={styles[size]}></div>
}

export function Container({ size, children }) {
  let styles = {
    small: "max-w-sm mx-auto px-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl", // Home
    some: "max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-0", // Podcast, Blog index
    // medium: "max-w-xl px-6 mx-auto lg:max-w-xl lg:px-0 xl:max-w-2xl", // Old Blog post
    measure: "max-w-measure mx-auto", // Blog post
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
