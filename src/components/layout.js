/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  return (
    <>
      <div className="font-sans antialiased leading-tight text-gray-900">
        <div className="max-w-4xl mx-auto">
          <header className="p-6 flex justify-between">
            <span className="text-lg font-semibold">Sam Selikoff</span>
            <ul className="flex text-gray-600">
              <li className="ml-3">Twitter</li>
              <li className="ml-3">YouTube</li>
              <li className="ml-3">GitHub</li>
            </ul>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
