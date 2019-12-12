import React from "react"
import SEO from "../components/seo"
import { A, Lead, Spacer, Title, Container } from "../components/ui"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />

    <Container size="some">
      <Spacer size="xl" />
      <Title>Nothing here...</Title>

      <Lead>
        You hit a missing link. <A to="/">Head back home</A>.
      </Lead>
    </Container>
  </>
)

export default NotFoundPage
