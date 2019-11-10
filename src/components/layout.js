import React, { useState } from "react"
import PropTypes from "prop-types"
import "./layout.css"

const Layout = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="font-sans antialiased leading-tight text-gray-900">
        <div className="max-w-4xl mx-auto">
          <header className={`p-6 ${isOpen ? "bg-gray-200" : ""}`}>
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Sam Selikoff</span>
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="text-black h-6 w-6 block"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                  </svg>
                ) : (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="block text-black h-6 w-6 block"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                )}
              </button>
            </div>
            {isOpen ? (
              <nav className="mt-4 ">
                <a className="block py-2 my-1">Twitter</a>
                <a className="block py-2 my-1">YouTube</a>
                <a className="block py-2 my-1">GitHub</a>
              </nav>
            ) : null}
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
