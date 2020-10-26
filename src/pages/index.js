import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import AboutSection from "./About"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AboutSection />
  </Layout>
)

export default IndexPage
