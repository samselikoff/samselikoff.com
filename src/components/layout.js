import React from "react"
import PropTypes from "prop-types"
import "@reach/dialog/styles.css"
import "./layout.css"
import {
  useSpring,
  animated,
  useTransition,
  config,
  useChain,
} from "react-spring"
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedDialogContent = animated(DialogContent)

  const springRef = React.useRef()
  // const overlayProps = useSpring({
  //   ref: springRef,
  //   config: config.stiff,
  //   from: { blur: 0, alpha: 0 },
  //   to: { blur: isOpen ? 7 : 0, alpha: isOpen ? 0.35 : 0 },
  // })
  const overlayTransitions = useTransition(isOpen, null, {
    ref: springRef,
    from: { alpha: 0, blur: 0 },
    leave: { alpha: 0, blur: 0 },
    enter: { alpha: 0.35, blur: 7 },
  })

  const transRef = React.useRef()
  const transitions = useTransition(isOpen ? [1, 2, 3, 4, 5] : [], null, {
    ref: transRef,
    unique: true,
    trail: 75,
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
  })

  useChain(isOpen ? [springRef, transRef] : [transRef, springRef], [
    0,
    isOpen ? 0.1 : 0.4,
  ])

  return (
    <>
      <div className="font-sans antialiased text-gray-900">
        <div className="max-w-4xl mx-auto">
          <header>
            <div className="p-4 flex justify-between items-center">
              <Link to="/" className="p-2">
                <span className="text-sm uppercase font-light tracking-wide">
                  Sam<span className="font-bold">Selikoff</span>
                </span>
              </Link>
              <button
                className="p-2 focus:outline-none text-gray-500"
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
                        v => `rgba(255, 255, 255, ${v})`
                      ),
                    }}
                    onDismiss={() => setIsOpen(false)}
                  >
                    {transitions.length > 0 && (
                      <DialogContent
                        className="pointer-events-none mt-0 w-full bg-transparent flex flex-wrap p-4 ml-auto"
                        aria-label="Site nav"
                      >
                        <div className="w-full flex-shrink-0 text-right">
                          <animated.button
                            style={{ ...transitions[0].props }}
                            className="focus:outline-none p-2 text-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              className=" h-6 w-6 block"
                            >
                              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                            </svg>
                          </animated.button>
                        </div>
                        <div className="mt-4 w-1/3 pr-2">
                          <animated.button
                            style={{ ...transitions[1].props }}
                            className="w-full rounded text-white  py-3 text-lg bg-gray-800"
                          >
                            Twitter
                          </animated.button>
                        </div>
                        <div className="mt-4 w-1/3 pr-2">
                          <animated.button
                            style={{ ...transitions[2].props }}
                            className="w-full rounded text-white w-1/3 py-3 text-lg bg-gray-800"
                          >
                            YouTube
                          </animated.button>
                        </div>
                        <div className="mt-4 w-1/3">
                          <animated.button
                            style={{ ...transitions[3].props }}
                            className="w-full rounded text-white w-1/3 py-3 text-lg bg-gray-800"
                          >
                            GitHub
                          </animated.button>
                        </div>
                      </DialogContent>
                    )}
                  </AnimatedDialogOverlay>
                )
            )}

            {/* {transitions.map(
              ({ item, key, props }) =>
                item && (
                  <AnimatedDialogOverlay
                    className={isOpen ? "" : "pointer-events-none"}
                    // style={{ backgroundColor: "white" }}
                    style={{
                      backdropFilter: props.blur.to(v => `blur(${v}px)`),
                      WebkitBackdropFilter: props.blur.to(v => `blur(${v}px)`),
                      background: props.alpha.to(
                        v => `rgba(255, 255, 255, ${v})`
                      ),
                    }}
                    key={key}
                    onDismiss={() => setIsOpen(false)}
                  >
                    <DialogContent
                      // style={contentStyles}
                      className="mt-0 w-full h-full bg-transparent flex flex-col p-4 ml-auto"
                      aria-label="Site nav"
                    >
                      {contentTransitions.map(
                        ({ item, key, props }) =>
                          item && (
                            <animated.button
                              key={key}
                              style={props}
                              className="ml-auto focus:outline-none p-2 text-gray-700"
                              onClick={() => setIsOpen(false)}
                            >
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className=" h-6 w-6 block"
                              >
                                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                              </svg>
                            </animated.button>
                          )
                      )}
                    </DialogContent>
                  </AnimatedDialogOverlay>
                )
            )} */}
          </header>
          <main className="pt-4 px-6 pb-8">{children}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

// function useMeasure() {
//   const ref = React.useRef()
//   const [bounds, set] = React.useState({ left: 0, top: 0, width: 0, height: 0 })
//   const [ro] = React.useState(
//     () => new ResizeObserver(([entry]) => set(entry.contentRect))
//   )
//   React.useEffect(() => {
//     if (ref.current) ro.observe(ref.current)
//     return () => ro.disconnect()
//   }, [ro])
//   return [{ ref }, bounds]
// }

// const transitions = useTransition(isOpen, null, {
//   config: {
//     mass: 1,
//     tension: 200,
//     friction: 20,
//     clamp: true,
//   },
//   from: { alpha: 0, blur: 0, opacity: 0 },
//   leave: { alpha: 0, blur: 0, opacity: 0 },
//   enter: { alpha: 0.35, blur: 7, opacity: 1 },
// })
// blur(12px)
// const [bind, { height }] = useMeasure()
// const contentTransitions = useTransition(isOpen, null, {
//   config: {
//     mass: 1,
//     tension: 200,
//     friction: 20,
//     clamp: true,
//   },
//   delay: 10000,
//   leave: { opacity: 0, transform: "scale(0.8)" },
//   from: { opacity: 0, transform: "scale(0.8)" },
//   enter: { opacity: 1, transform: "scale(1)" },
// })

// const styles = useSpring({ blur: isOpen ? 10 : 0, config: config.stiff })
// const contentStyles = useSpring({
//   delay: 500,
//   from: { opacity: 0, transform: "scale(0.8)" },
//   to: { opacity: 1, transform: "scale(1)" },
// })
// console.log(transitions)
