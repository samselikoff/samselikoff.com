const path = require("path")

/*
  Create blog post pages for each md{x} file in /src/posts directory.
*/
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            parent {
              ... on File {
                relativePath
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  result.data.allMdx.edges.forEach(({ node }, index) => {
    let slug = `/blog/${node.parent.relativePath
      .replace(/\/index.mdx?/, "")
      .toLowerCase()}`

    createPage({
      path: slug,
      component: path.resolve(`./src/layouts/blog-post.js`),
      context: { id: node.id },
    })
  })
}
