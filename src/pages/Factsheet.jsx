import React from "react"
import { graphql } from 'gatsby'
import PropTypes from "prop-types"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { Flex } from '../components/Grid'
import styled, { themeGet } from '../../util/style'

const Wrapper = styled(Flex)`
  height: 100%;
`

// const Factsheet = ({county, onClick }) => (
//     <Layout>
//         <Wrapper onClick={onClick}>
//         <SEO title="Factsheet" />
//         <h1> NAME: {county} </h1>
//         </Wrapper>
//     </Layout>
// )

// Factsheet.propTypes = {
//     county: PropTypes.string.isRequired,
// }

// export default Factsheet

export const query = graphql`
  query {
    allRegionsJson(sort: {fields: final_rank, order: DESC}) {
      nodes {
        id
        name
        total_pop
        county
        final_score
        final_rank
      }
    }
  }
  `;
  
  export default ({ data, county }) => {
    // const queryNodes = data.allRegionsJson.nodes
    // const selectedCounty = 'Rockwall County'
    // const filteredQueryNodes = queryNodes.filter(node => node.county == selectedCounty)

    return (
      <Layout>
          <SEO title="Factsheet" />
          <Wrapper>
            <h1>TODO: dropdown navigation here to county factsheets</h1>
          </Wrapper>
      </Layout>
    );
};