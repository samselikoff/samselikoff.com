import React from "react"
import PropTypes from "prop-types"
import "@reach/dialog/styles.css"
import "./base.css"
import { animated, useTransition, useChain } from "react-spring"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Link, navigate } from "gatsby"

const AnimatedLink = animated(Link)
const AnimatedDialogOverlay = animated(DialogOverlay)

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

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

  function handleClick(location) {
    setIsOpen(false)
    navigate(location)
  }

  return (
    <>
      <div className="font-sans antialiased text-gray-800">
        <div className="max-w-4xl mx-auto">
          <header className=" bg-gray-100">
            <div className="p-4 flex justify-between items-center">
              <Link to="/" className="px-2 py-1">
                <span className="text-sm uppercase font-light tracking-wide">
                  Sam<span className="font-bold">Selikoff</span>
                </span>
              </Link>
              <button
                className="px-2 py-1 focus:outline-none text-gray-500"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="block h-5 w-5 block"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
            {overlayTransitions.map(
              ({ item, key, props }) =>
                item && (
                  <AnimatedDialogOverlay
                    className={isOpen ? "" : "pointer-events-none"}
                    key={key}
                    style={{
                      backdropFilter: props.blur.to(v => `blur(${v}px)`),
                      WebkitBackdropFilter: props.blur.to(v => `blur(${v}px)`),
                      background: props.alpha.to(
                        v => `rgba(120, 120, 120, ${v})`
                      ),
                    }}
                    onDismiss={() => setIsOpen(false)}
                  >
                    {transitions.length > 0 && (
                      <DialogContent
                        className="m-0 w-full bg-transparent p-4"
                        aria-label="Site nav"
                      >
                        <div className="w-full flex flex-wrap">
                          <div className="mt-4 w-1/3 px-2">
                            <animated.a
                              style={{
                                ...transitions[1].props,
                                color: "#00aced",
                              }}
                              href="https://twitter.com/samselikoff"
                              className="w-full h-12 rounded flex items-center justify-center shadow-md bg-white focus:outline-none"
                            >
                              <TwitterLogo className="h-6" />
                            </animated.a>
                          </div>
                          <div className="mt-4 w-1/3 px-2">
                            <animated.a
                              href="https://www.youtube.com/user/samselikoff"
                              style={{
                                ...transitions[2].props,
                                color: "#ff0000",
                              }}
                              className="w-full h-12 rounded flex items-center justify-center shadow-md bg-white  focus:outline-none"
                            >
                              <YouTubeLogo className="h-6" />
                            </animated.a>
                          </div>
                          <div className="mt-4 w-1/3 px-2">
                            <animated.a
                              href="https://github.com/samselikoff"
                              style={{
                                ...transitions[3].props,
                                color: "#24292F",
                              }}
                              className="w-full h-12 rounded flex items-center justify-center shadow-md bg-white focus:outline-none"
                            >
                              <GitHubLogo className="h-6" />
                            </animated.a>
                          </div>
                          {[
                            { label: "Projects", url: "/projects" },
                            { label: "Podcast", url: "/podcast" },
                            { label: "Talks", url: "/talks" },
                            { label: "Blog", url: "/blog" },
                          ].map((link, i) => (
                            <div
                              className="w-1/2 mt-6 flex items-center justify-center"
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
          </header>
          <main className="pt-6 px-6 pb-8">{children}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const ToolboxInternalLink = props => {
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
      className="block w-full text-center bg-white text-gray-800 mx-2 rounded-lg shadow-md py-10 text-2xl font-semibold"
    >
      {props.children}
    </AnimatedLink>
  )
}

const TwitterLogo = props => (
  <svg
    className={`fill-current ${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <title>Twitter</title>
    <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"></path>
  </svg>
)

const YouTubeLogo = props => (
  <svg
    version="1.1"
    viewBox="0 0 176 124"
    className={`fill-current ${props.className}`}
  >
    <g id="XMLID_1_">
      <path
        id="XMLID_3_"
        d="M172.32,19.36c-2.02-7.62-7.99-13.62-15.56-15.66C143.04,0,88,0,88,0S32.96,0,19.24,3.7
		C11.67,5.74,5.7,11.74,3.68,19.36C0,33.18,0,62,0,62s0,28.82,3.68,42.64c2.02,7.62,7.99,13.62,15.56,15.66C32.96,124,88,124,88,124
		s55.04,0,68.76-3.7c7.57-2.04,13.54-8.04,15.56-15.66C176,90.82,176,62,176,62S176,33.18,172.32,19.36z"
      />
      <polygon id="XMLID_2_" fill="#ffffff" points="70,88.17 116,62 70,35.83" />
    </g>
  </svg>
)

const GitHubLogo = props => (
  <svg
    className={`fill-current ${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32.58 31.77"
    {...props}
  >
    <path d="M16.29,0C7.29,0,0,7.29,0,16.29c0,7.2,4.67,13.3,11.14,15.46c0.81,0.15,1.11-0.35,1.11-0.79 c0-0.39-0.01-1.41-0.02-2.77c-4.53,0.98-5.49-2.18-5.49-2.18C6,24.13,4.93,23.62,4.93,23.62c-1.48-1.01,0.11-0.99,0.11-0.99 c1.63,0.12,2.5,1.68,2.5,1.68c1.45,2.49,3.81,1.77,4.74,1.35c0.15-1.05,0.57-1.77,1.03-2.18C9.7,23.08,5.9,21.68,5.9,15.44 c0-1.78,0.63-3.23,1.68-4.37C7.41,10.65,6.85,9,7.73,6.76c0,0,1.37-0.44,4.48,1.67c1.3-0.36,2.69-0.54,4.08-0.55 c1.38,0.01,2.78,0.19,4.08,0.55c3.11-2.11,4.48-1.67,4.48-1.67c0.89,2.24,0.33,3.9,0.16,4.31c1.04,1.14,1.67,2.59,1.67,4.37 c0,6.26-3.81,7.63-7.44,8.04c0.58,0.5,1.11,1.5,1.11,3.02c0,2.18-0.02,3.93-0.02,4.47c0,0.44,0.29,0.94,1.12,0.78 c6.47-2.16,11.13-8.26,11.13-15.45C32.58,7.29,25.29,0,16.29,0z" />
  </svg>
)
