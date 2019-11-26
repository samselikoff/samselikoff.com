import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Code from "../components/code"
import { graphql } from "gatsby"

// export const Code = ({ className, ...rest }) => (
//   <CodeCompVonent
//     className={`sm:rounded-lg overflow-hidden -mx-5 md:mx-0 my-8 ${className}`}
//     {...rest}
//   />
const components = {
  h2: props => (
    <h2 className="text-lg font-semibold leading-tight mt-12">
      {props.children}
    </h2>
  ),
  p: props => <p className="mt-5">{props.children}</p>,
  hr: () => <hr className="mt-4" />,
  ol: props => <ol className="list-decimal ml-6">{props.children}</ol>,
  ul: props => <ul className="list-disc ml-6">{props.children}</ul>,
  li: props => <li className="mt-4">{props.children}</li>,
  inlineCode: props => (
    <code className="text-sm bg-gray-100 px-1 py-px">{props.children}</code>
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
      <div className="sm:rounded-lg overflow-hidden my-8 -mx-6 md:mx-auto">
        <Code {...props} />
      </div>
    )
  },
}

export default props => {
  let mdx = props.data.mdx

  return (
    <MDXProvider components={components}>
      <div className="mb-10 text-center">
        <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
          {props.data.mdx.frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          {props.data.mdx.frontmatter.date}
        </p>
      </div>

      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
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
