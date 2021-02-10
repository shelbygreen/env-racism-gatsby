import React from "react"

import SEO from "../components/seo"
import About from "./About"

// home page
const IndexPage = () => (
  <div>
    <SEO title="Home" />
    {/* The About component: home page's content and link to go to the main page */}
    <About />
  </div>
)

export default IndexPage
