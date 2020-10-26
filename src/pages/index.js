import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutSection from "./About"

const IndexPage = () => (
  <div>
    <SEO title="Home" />
    <AboutSection />
  </div>
)

export default IndexPage
