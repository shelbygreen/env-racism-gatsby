import React from "react"
import { graphql } from 'gatsby'
import PropTypes from "prop-types"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import styled, { themeGet } from '../../util/style'

const Wrapper = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${themeGet('colors.grey.900')}
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
    const queryNodes = data.allRegionsJson.nodes
    const selectedCounty = 'Dallas County'
    const filteredQueryNodes = queryNodes.filter(node => node.county == selectedCounty)

    return (
      <Layout>
          <SEO title="Factsheet" />
        <h1>Name of County!</h1>
        <table>
        <thead>
          <tr>
            <th>Census Tract</th>
            <th>Total Population</th>
            <th>Texas County</th>
            <th>EJ Risk Score</th>
            <th>EJ Risk Score Percentile</th>
          </tr>
        </thead>
        <tbody>
          {filteredQueryNodes.map(node => (
            <tr key={node.id}>
              <th>{node.name}</th>
              <th>{node.total_pop}</th>
              <th>{node.county}</th>
              <th>{node.final_score.toFixed(2)}</th>
              <th>{node.final_rank.toFixed(0)}%</th>
            </tr>
          ))}
        </tbody>
      </table>
      </Layout>
    );
};