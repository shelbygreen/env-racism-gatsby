import React from "react"
import { graphql } from 'gatsby'
//import query from './Query'
// import PropTypes from "prop-types"
import SEO from "../seo"
import Layout from "../Layout"
import { Flex } from '../Grid'
import styled from '../../../util/style'

const Wrapper = styled(Flex)`
  height: 100%;
`

export const query = graphql`
    query($pagePath: String!) {
        regionsJson(county: {eq: $pagePath} ) {
            id
            name
            total_pop
            county
            final_score
            final_rank
        }
    }
`;

const FactsheetTemplate = (props) => {
    console.log(props)
    const countyData = props.data.regionsJson
    return (
    <Wrapper>
        <div>
            <center><h1>Name of County:{countyData.county}</h1></center>
            <br/>
            <h2><i>Texas Environmental Justice Explorer Summary</i></h2>
        </div>
    </Wrapper>
    )
};

export default FactsheetTemplate

// export default ({ query }) => {
//     const queryNodes = query.allRegionsJson.nodes
//     const selectedCounty = 
//     const filteredQueryNodes = queryNodes.filter(node => node.county == selectedCounty)

//     return (
//       <Layout>
//           <Wrapper>
//             <h1>Name of County: {selectedCounty}</h1>
//             <table>
//             <thead>
//               <tr>
//                 <th>Census Tract</th>
//                 <th>Total Population</th>
//                 <th>EJ Risk Score</th>
//                 <th>EJ Risk Score Percentile</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredQueryNodes.map(node => (
//                 <tr key={node.id}>
//                   <th>{node.name}</th>
//                   <th>{node.total_pop}</th>
//                   <th>{node.final_score.toFixed(2)}</th>
//                   <th>{node.final_rank.toFixed(0)}%</th>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           </Wrapper>
//       </Layout>
//     );
// };