import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Code from "../components/code"
import { Img } from "../components/ui"
import { Link, graphql } from "gatsby"

const components = {
  h2: ({ children, ...rest }) => (
    <h2
      className="mt-12 text-lg font-semibold leading-tight md:text-xl"
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: () => {
    throw new Error("Selikoff: Don't use an h3 in your blog posts, dude")
  },
  p: props => <p className="mt-5">{props.children}</p>,
  a: ({ children, ...rest }) => (
    <a className="text-blue-500 underline" {...rest}>
      {children}
    </a>
  ),
  hr: () => <hr className="mt-4" />,
  ol: props => <ol className="pl-6 list-decimal" {...props} />,
  ul: props => <ul className="pl-6 list-disc" {...props} />,
  li: props => <li className="mt-4" {...props} />,
  blockquote: props => (
    <blockquote className="pl-4 italic border-l-4">{props.children}</blockquote>
  ),
  inlineCode: props => (
    <code className="px-1 py-px text-sm bg-gray-100">{props.children}</code>
  ),
  pre: props => <div {...props} />,

  // MDX assigns a className of something like `language-jsx{1,5-10}`
  code: ({ className, children }) => {
    let props = { children }
    let languageMatch = className && className.match("language-([^{]+)")
    if (languageMatch) {
      props.language = languageMatch[1]
    }
    let highlightedLinesMatch = className && className.match("{(.+)}")
    if (highlightedLinesMatch) {
      props.highlightedLines = highlightedLinesMatch[1]
    }

    return (
      <div className="my-8 -mx-6 overflow-hidden sm:rounded-lg md:mx-auto">
        <Code {...props} />
      </div>
    )
  },
}

export default props => {
  let mdx = props.data.mdx

  return (
    <>
      <div className="md:mt-4 md:-mx-escape-xl">
        <div className="md:max-w-2xl md:mx-auto md:px-8">
          <article className="">
            <MDXProvider components={components}>
              <div className="mb-10 text-center md:text-left">
                <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
                  {props.data.mdx.frontmatter.title}
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-600 md:text-base md:mt-1">
                  {props.data.mdx.frontmatter.date}
                </p>
              </div>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </article>

          <hr className="mt-10" />

          <div className="mt-10">
            <div>
              <Link to="/">
                <Img
                  className="w-16 h-16 mx-auto rounded-full"
                  src="profile.jpeg"
                  aspectRatio={1}
                />
              </Link>
            </div>

            <div className="mt-2 leading-none text-center">
              <p className="pt-2 text-xs font-medium tracking-wider text-gray-600 uppercase">
                Written by
              </p>
              <p className="pt-1 text-xl font-semibold">
                <Link to="/">Sam Selikoff</Link>
              </p>
            </div>
          </div>

          <div className="mt-8 mb-16 text-center">
            <Link className="font-medium text-blue-500" to="/blog">
              ← View all posts
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
        title
      }
    }
  }
`
