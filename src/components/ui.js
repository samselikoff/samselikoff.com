import React from "react"
import { Link } from "gatsby"

export const A = ({ children, ...props }) => {
  props.className += ` underline text-blue-600 font-semibold`
  let isInternalLink = props.to && props.to.startsWith("/")
  let LinkComponent = isInternalLink ? Link : `a`

  return <LinkComponent {...props}>{children}</LinkComponent>
}
