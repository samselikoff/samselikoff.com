import React from "react"
import PropTypes from "prop-types"
import "@reach/dialog/styles.css"
import "./layout.css"
import { useSpring, animated, useTransition } from "react-spring"
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedDialogContent = animated(DialogContent)
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  })
  // const [bind, { height }] = useMeasure()
  // const props = useSpring({
  //   height: isOpen ? height : 0,
  // })

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
                {isOpen ? (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className=" h-6 w-6 block"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                  </svg>
                ) : (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="block h-6 w-6 block"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                )}
              </button>
            </div>

            {transitions.map(
              ({ item, key, props: styles }) =>
                item && (
                  <AnimatedDialogOverlay
                    style={{ opacity: styles.opacity }}
                    key={key}
                    onDismiss={() => setIsOpen(false)}
                  >
                    <AnimatedDialogContent
                      className="mt-0 w-full h-full"
                      style={{
                        transform: styles.y.interpolate(
                          value => `translate3d(0px, ${value}px, 0px)`
                        ),
                      }}
                      aria-label="Site nav"
                    >
                      <p>React Spring makes it too easy!</p>
                    </AnimatedDialogContent>
                  </AnimatedDialogOverlay>
                )
            )}
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

function useMeasure() {
  const ref = React.useRef()
  const [bounds, set] = React.useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = React.useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  React.useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}
