import React from "react"
import PropTypes from "prop-types"
import "@reach/dialog/styles.css"
import "./base.css"
import { animated, useTransition, useChain } from "react-spring"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Link, navigate } from "gatsby"
import { Twitter, GitHub, YouTube } from "../components/logos"

const AnimatedLink = animated(Link)
const AnimatedDialogOverlay = animated(DialogOverlay)

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  function handleClick(location) {
    setIsOpen(false)
    navigate(location)
  }

  return (
    <>
      <div className="font-sans text-base antialiased text-gray-800">
        <header className="px-6">
          <div className="pt-4 mx-auto max-w-7xl md:pt-6 xl:pt-8">
            <div className="flex justify-between pb-4 md:pb-0 md:border-b md:border-gray-200 md:justify-start">
              <Link to="/">
                <span className="text-sm font-light tracking-wide uppercase md:text-base lg:text-xl">
                  Sam<span className="font-bold">Selikoff</span>
                </span>
              </Link>
              <MobileNavButton isOpen={isOpen} setIsOpen={setIsOpen} />
              <DesktopNav />
            </div>
            <MobileNav
              isOpen={isOpen}
              handleClick={handleClick}
              closeMenu={() => setIsOpen(false)}
            />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

function MobileNavButton({ isOpen, setIsOpen }) {
  return (
    <button
      className="p-2 -m-2 text-gray-700 focus:outline-none md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg fill="currentColor" viewBox="0 0 20 20" className="block w-4 h-4">
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </button>
  )
}

function ToolboxInternalLink(props) {
  function handleClick(e) {
    let isUnmodifiedLeftClick =
      (e.which === undefined || e.which === 1) && !e.ctrlKey && !e.metaKey

    if (isUnmodifiedLeftClick) {
      e.preventDefault()
      props.onClick(props.to)
    }
  }

  return (
    <AnimatedLink
      to={props.to}
      style={props.style}
      onClick={handleClick}
      className="block w-full py-10 mx-2 text-2xl font-semibold text-center text-gray-800 bg-white rounded-lg shadow-md"
    >
      {props.children}
    </AnimatedLink>
  )
}

function MobileNav({ isOpen, handleClick, closeMenu }) {
  const springRef = React.useRef()
  const overlayTransitions = useTransition(isOpen, null, {
    ref: springRef,
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
      clamp: true,
    },
    from: { alpha: 0, blur: 0 },
    leave: { alpha: 0, blur: 0 },
    enter: { alpha: 0.3, blur: 25 },
  })

  const transRef = React.useRef()
  const transitions = useTransition(
    isOpen ? [1, 2, 3, 4, 5, 6, 7, 8] : [],
    null,
    {
      ref: transRef,
      unique: true,
      trail: 30,
      config: isOpen
        ? { mass: 1, tension: 180, friction: 14 }
        : { mass: 1, tension: 300, friction: 20, clamp: true },
      from: { opacity: 0, transform: "scale(0.9)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.9)" },
    }
  )

  useChain(isOpen ? [springRef, transRef] : [transRef, springRef], [
    0,
    isOpen ? 0 : 0.1,
  ])

  return (
    <div className="md:hidden">
      {overlayTransitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedDialogOverlay
              className={isOpen ? "" : "pointer-events-none"}
              key={key}
              style={{
                backdropFilter: props.blur.to(v => `blur(${v}px)`),
                WebkitBackdropFilter: props.blur.to(v => `blur(${v}px)`),
                background: props.alpha.to(v => `rgba(120, 120, 120, ${v})`),
              }}
              onDismiss={closeMenu}
            >
              {transitions.length > 0 && (
                <DialogContent
                  className="w-full max-w-lg p-4 m-0 mx-auto bg-transparent"
                  aria-label="Site nav"
                >
                  <div className="flex flex-wrap">
                    <div className="w-1/3 px-2 mt-4">
                      <animated.a
                        style={{
                          ...transitions[1].props,
                          color: "#00aced",
                        }}
                        href="https://twitter.com/samselikoff"
                        className="flex items-center justify-center w-full h-12 bg-white rounded shadow-md focus:outline-none"
                      >
                        <Twitter className="h-6" />
                      </animated.a>
                    </div>
                    <div className="w-1/3 px-2 mt-4">
                      <animated.a
                        href="https://www.youtube.com/user/samselikoff"
                        style={{
                          ...transitions[2].props,
                          color: "#ff0000",
                        }}
                        className="flex items-center justify-center w-full h-12 bg-white rounded shadow-md focus:outline-none"
                      >
                        <YouTube className="h-6" />
                      </animated.a>
                    </div>
                    <div className="w-1/3 px-2 mt-4">
                      <animated.a
                        href="https://github.com/samselikoff"
                        style={{
                          ...transitions[3].props,
                          color: "#24292F",
                        }}
                        className="flex items-center justify-center w-full h-12 bg-white rounded shadow-md focus:outline-none"
                      >
                        <GitHub className="h-6" />
                      </animated.a>
                    </div>
                    {[
                      { label: "Projects", url: "/projects" },
                      { label: "Podcast", url: "/podcast" },
                      { label: "Talks", url: "/talks" },
                      { label: "Blog", url: "/blog" },
                    ].map((link, i) => (
                      <div
                        className="flex items-center justify-center w-1/2 mt-6"
                        key={link.url}
                      >
                        <ToolboxInternalLink
                          style={{
                            ...transitions[4 + i].props,
                          }}
                          to={link.url}
                          onClick={handleClick}
                        >
                          {link.label}
                        </ToolboxInternalLink>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              )}
            </AnimatedDialogOverlay>
          )
      )}
    </div>
  )
}

function DesktopNav() {
  return (
    <div className="items-center hidden ml-auto md:flex">
      <DesktopNavLink to="/projects">Projects</DesktopNavLink>
      <DesktopNavLink to="/podcast">Podcast</DesktopNavLink>
      <DesktopNavLink to="/talks">Talks</DesktopNavLink>
      <DesktopNavLink to="/blog">Blog</DesktopNavLink>
    </div>
  )
}

function DesktopNavLink({ to, children }) {
  return (
    <Link
      className="pb-4 ml-6 -mb-px text-gray-600 border-b border-transparent xl:pb-6 lg:ml-8 lg:text-base xl:text-lg hover:text-gray-900"
      activeClassName="text-gray-900"
      to={to}
      partiallyActive={true}
    >
      {children}
    </Link>
  )
}
