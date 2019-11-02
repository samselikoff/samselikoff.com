import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />

      <div className="text-lg leading-normal">
        <p className="mb-4">Hi!</p>
        <p>
          I'm{" "}
          <a
            className="underline text-blue-600 font-semibold"
            href="https://twitter.com/samselikoff"
          >
            @samselikoff
          </a>
          , and I'm a frontend developer helping teams build better UIs on the
          web.
        </p>
      </div>
    </Layout>
  )
}
