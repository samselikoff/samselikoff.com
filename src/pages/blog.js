import React from "react"
import Layout from "../components/layout"

export default function BlogPage() {
  let articles = [
    {
      title: "Lowest Common Ancestor",
      date: "December 8, 2015",
    },
    {
      title:
        "UX Burlington 2015: Why Enterprise software sucks (and how to unsuck it)",
      date: "November 2, 2015",
    },
    { title: "UX Burlington 2015: Scaling UX", date: "November 2, 2015" },
    {
      title: "UX Burlington 2015: Making Design by Committee Work",
      date: "November 2, 2015",
    },
    {
      title: "UX Burlington 2015: Improving the Authoring Experience",
      date: "November 2, 2015",
    },
    {
      title: `UX Burlington 2015: Don't fear the research!`,
      date: "November 2, 2015",
    },
    {
      title: "UX Burlington 2015: Designing with Empathy",
      date: "November 2, 2015",
    },
    { title: "Comment on data flow in Ember apps", date: "September 19, 2015" },
    { title: "Interview with Ember Weekend", date: "August 19, 2015" },
    { title: "Preparing for Ember 2.0", date: "May 29, 2015" },
    { title: "HTTPS in a nutshell", date: "May 2, 2015" },
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-center">Blog</h1>

      <ul className="mt-12">
        {articles.map((article, i) => (
          <li className="mt-6" key={i}>
            <p className="text-xs font-medium text-gray-500">{article.date}</p>
            <h2 className="mt-1 text-lg font-medium ">{article.title}</h2>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
