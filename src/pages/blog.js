import React from "react"
import { Link, graphql } from "gatsby"
import { H1 } from "../components/ui"

export default function BlogPage({ data }) {
  let articles = data.allMdx.edges.map(edge => ({
    title: edge.node.frontmatter.title,
    date: edge.node.frontmatter.date,
    url: `/blog/${edge.node.parent.relativePath
      .replace(/\/index.mdx?/, "")
      .toLowerCase()}`,
  }))

  return (
    <div className="max-w-lg px-6 pt-6 pb-8 mx-auto mb-16 md:pt-12 md:max-w-5xl">
      <H1>Blog</H1>

      <ul className="mt-12 leading-snug">
        {articles.map(article => (
          <li className="mt-6 md:mt-10" key={article.url}>
            <p className="text-xs font-medium text-gray-400 md:text-sm">
              {article.date}
            </p>
            <Link to={article.url} className="inline-block">
              <h2 className="mt-1 text-lg font-semibold md:text-xl">
                {article.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query BlogIndexQuery {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { listed: { ne: false } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  }
`
