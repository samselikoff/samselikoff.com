import React from "react"
import Layout from "../components/layout"
import { A } from "../components/ui"

export default function BlogPage({ data }) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center">Podcast</h1>

      <div className="mt-8">
        <p className="text-lg">
          For more than two years <A>The EmberMap Podcast</A> has been mine and
          Ryan's place to talk about whatever's going on in our day-to-day lives
          doing frontend development.
        </p>
      </div>
    </Layout>
  )
}
