import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Img } from "../components/ui"

// const MyH1 = props => <h1 style={{ color: "tomato" }} {...props} />
// const MyParagraph = props => <p style={{ fontSize: "18px", lineHeight: 1.6 }} />

const components = {
  // h1: MyH1,
  h2: props => (
    <h2 className="text-lg font-semibold leading-tight mt-8">
      {props.children}
    </h2>
  ),
  p: props => <p className="mt-5">{props.children}</p>,
  hr: () => <hr className="mt-4" />,
  ol: props => <ol className="list-decimal ml-6">{props.children}</ol>,
  li: props => <li className="mt-4">{props.children}</li>,
  inlineCode: props => (
    <code className="text-sm bg-gray-100 px-1 py-px">{props.children}</code>
  ),
  pre: props => (
    <pre className="mt-4 max-w-full overflow-x-scroll bg-gray-200 text-sm p-4">
      {props.children}
    </pre>
  ),
  // img: props => {
  //   console.log(props)
  //   //   let src = props.src
  //   //   if (src[0] === "/") {
  //   //     src = src.slice(1)
  //   //   }
  //   return <span>hi</span>
  //   // return <img src={props.src} />
  // },
}

export default props => {
  return (
    <MDXProvider components={components}>
      <div className="mb-10 text-center">
        <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
          {props.pageContext.frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          {props.pageContext.frontmatter.date}
        </p>
      </div>
      {props.children}
    </MDXProvider>
  )
}
