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
    <h1 className="text-3xl font-semibold leading-tight text-center text-gray-900 md:text-4xl">
      {children}
    </h1>
  )
}

export function Container({ size, children }) {
  let styles = {
    narrow: "max-w-lg px-6 pt-6 pb-8 mx-auto md:pt-12 md:max-w-xl",
    large: "max-w-2xl px-6 pt-6 pb-8 mx-auto md:pt-12 md:max-w-xl",
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
