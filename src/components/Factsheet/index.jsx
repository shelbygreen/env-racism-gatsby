import React from "react"
import { graphql } from 'gatsby'
//import query from './Query'
// import PropTypes from "prop-types"
import SEO from "../seo"
import Layout from "../Layout"
import { Flex } from '../Grid'
import styled from '../../../util/style'
import { Text } from 'rebass'
import { OutboundLink } from '../Link'
import { readibleNumber } from '../../../util/format'

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
            poc_score
            pov_score
            nohs_score
            liso_score
            lead_score
            hbrd_score
            unem_score
        }
    }
`;

const FactsheetTemplate = (props) => {
    const countyData = props.data.regionsJson
    // window.print()
    return (
    <Wrapper>
        <div>
            <br/>
            <center><b>{countyData.county}</b></center>
            <center>Texas Environmental Justice Explorer - Summary</center>
            <br/>
            <span>
                <b>Cumulative Environmental Justice Risk Score: </b>{countyData.final_score.toFixed(2)}/100
                <br/>
                {countyData.county}’s risk score is higher than {countyData.final_rank.toFixed(2)}% of all other counties in Texas.
                <br/>
                <br/>
                <b>Population: </b>{readibleNumber(countyData.total_pop, 0)} residents, where {countyData.poc_score.toFixed(2)}% identify as a person of color.
                <br/>
                <ul>
                    <li>{countyData.nohs_score.toFixed(2)}% are at least 25 years old and don't have a high school degree.</li>
                    <li>{countyData.liso_score.toFixed(2)}% live in households where no one over the age of 5 speaks English “very well.”</li>
                </ul>
                <b><u>Air Quality</u></b>
                <br/>
                <ul>
                    <li>{100*countyData.total_pop/countyData.total_pop.toFixed(2)}% of residents live in a census tract where the air Ozone concentration is above the EPA’s 8-hour standard (70 parts per billion).</li>
                    <li>{100*countyData.total_pop/countyData.total_pop.toFixed(2)}% of residents live in a census tract where the PM 2.5 concentration is above the EPA’s annual average standard (12 parts per billion).</li>
                </ul>
                <b><u>Housing</u></b>
                <br/>
                <ul>
                    <li>{countyData.lead_score.toFixed(2)}% of homes were built before 1980, and may contain lead paint.</li>
                    <li>There are count(tri_sites) toxic release inventory facilities and count(sf_sites) in {countyData.county}. true_tri_sites_score% of these facilities are located in census tracts where the minority population is higher than 50%.</li>
                </ul>
                <b><u>Economy</u></b>
                <br/>
                <ul>
                    <li>{countyData.hbrd_score.toFixed(2)}% are spending more than half of their income on rent.</li>
                    <li>{countyData.pov_score.toFixed(2)}% live in households with an income below double the Federal poverty line ($52,400 for a family of four).</li>
                    <li>{countyData.unem_score.toFixed(2)}% are unemployed.</li>
                </ul>
            </span>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <span>
                <br/>
                <center>Texas Environmental Justice Explorer - Summary</center>
                <center><b>What are these indicators and why are they important?</b></center>
                <br/>
                Environmental Justice: A movement advancing the right for all people and communities to have equal environmental protection under the law.
                <br/>
                <br/>
                <b><u>Cumulative Environmental Justice Risk Score:</u></b>
                <br/>
                This score reflects the combined environmental and social burdens faced by people living in a given county or census tract. Higher scores indicate higher cumulative burdens from environmental and social factors. 
                <br/>
                <br/>
                <b>How it was calculated:</b> The Cumulative Environmental Justice Score combines the Population Characteristics Score and the Pollution Burden Score. See methodology <OutboundLink from="/" to="/">here</OutboundLink>.
                <br/>
                <br/>
                <b><u>Population Characteristics Score:</u></b>
                <br/>
                This score combines the prevalence of sensitive populations, socioeconomic factors, and other vulnerabilities that compound the environmental hazards facing a community. Higher scores indicate more vulnerable populations.
                <br/>
                <br/>
                <b>How it was calculated:</b> The following indicators make up the Population Characteristics Score. See methodology <OutboundLink from="/" to="/">here</OutboundLink>.
                <ul>
                    <li><b>Minority Population</b> - The percentage of the population who don't identify as white. Nonwhite populations are more likely to be affected, and burdened by, toxic environmental conditions.</li>
                    <li><b>Less than High School Education</b> - The percentage of the population who are at least 25 years old and haven't graduated from high school.</li>
                    <li><b>Low-Income Population</b> - The percentage of the population with a household income less than or equal to twice the federal poverty level. Low-income households may be unable to move away from an area burdened by environmental health hazards.</li>
                    <li><b>Housing Burden</b> - The percentage of the population spending more than half of their income on rent.</li>
                    <li><b>Linguistic Isolation</b> - The percentage of households in which no members speak English or speak English fluently.</li>
                    <li><b>Unemployed Population</b> - The percentage of people facing unemployment.</li>
                </ul>
                <br/>
                <br/>
                <b><u>Pollution Burden Score:</u></b>
                <br/>
                This score assesses the presence of environmental hazards in a given location. Higher scores indicate more exposure to environmental hazards, which can lead to a wide range of health impacts.
                <br/>
                <br/>
                <b>How it was calculated:</b> The following indicators make up the Pollution Burden Score. See methodology <OutboundLink from="/" to="/">here</OutboundLink>.
                <ul>
                    <li><b>Lead Risk and Exposure</b> - The percentage of residences that may have lead-based paint. Lead is a toxin that affects the brain and body; it can be breathed in, swallowed, or absorbed.</li>
                        <ul>
                            <li><b>Why is it important?:</b> Lead is a powerful neurotoxin (meaning, it affects the brain and nervous system). Lead poisoning in children can affect behavior and intelligence, potentially leading to aggression, permanent mental disabilities, and death. In adults, lead poisoning can cause anemia, kidney failure, memory loss, weakness, infertility, and more.</li>
                            <li><b>What level is unsafe?:</b> There is no safe level of exposure to lead.</li>
                        </ul>                    
                    <li><b>Ozone Concentration</b> - Ozone is a type of air pollution, and is more commonly known as “smog.” Ozone is emitted into the atmosphere by oil refineries and plants, as well as by cars, trucks, and trains.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Ozone can irritate the lungs, leading to asthma attacks, infections, chronic lung diseases, and more.</li>
                        <li><b>What level is unsafe?:</b> The EPA 8-hour ozone standard is 70 ppb. Above this point, air quality becomes unhealthy and potentially hazardous.</li>
                    </ul>
                    <li><b>PM2.5 Concentration</b> - “PM2.5” (or, “particulate matter” smaller than 2.5 micrometers) refers to invisible particles in the air, which are easily inhaled. These particles come from sources like vehicles, power plants, and burning fuels.</li>
                    <ul>
                        <li><b>Why is it important?:</b> When these tiny particles are breathed in, they can get deep into the lungs and bloodstream. Over time, it can lead to heart disease, lung disease, and premature death.</li>
                        <li><b>What level is unsafe?:</b> The EPA annual average PM2.5 standard is 12 micrograms/cubic meters.</li>
                    </ul>
                    <li><b>Diesel PM</b> - Diesel Particulate Matter refers to the soot particles that are released from diesel exhaust.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Short-term exposure can cause headaches, dizziness, and irritation, while long-term exposure can lead to heart and lung disease and cancer.</li>
                        <li><b>What level is unsafe?:</b> The Occupational Safety and Health Administration (OSHA) does not have a permissible exposure limit. Diesel engines are permitted to release 2.5 grams/hour of Diesel PM.</li>
                    </ul>
                    <li><b>Air Toxics Cancer Risk Index</b> - This indicates a person’s lifetime risk of getting cancer from inhaling airborne toxics. It is calculated by summing the long-term cancer risk of all air toxic compounds listed as carcinogenic or likely carcinogenic to humans. The cancer risk of a specific air toxic is calculated by multiplying the long-term inhalation exposure concentration by its corresponding inhalation unit risk estimate.</li>
                    <ul>
                        <li><b>What level is unsafe?:</b> The EPA’s National Air Toxics Assessment (NATA) estimates most individuals’ air toxics cancer risk to be between 1-in-1 million and 100-in-1 million.</li>
                    </ul>
                    <li><b>Traffic Density</b> - This indicates the percentage of the population living near busy roadways.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Living near high-traffic areas is not only a safety issue, but a pollution issue. People near highways are exposed to air pollution in the form of ozone, particulate matter, diesel, and more. This can lead to respiratory issues like asthma, lung disease, and heart disease.</li>
                    </ul>
                    <li><b>Proximity to Superfund Sites</b> - This number lists the number of superfund sites per kilometer (0.62 miles) within the county or census tract. A “superfund site” is a contaminated site, where hazardous waste has been improperly managed or left out in the open. These sites can include manufacturing plants, landfills, toxic dumping sites, mining sites, and former industrial sites.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Different superfund sites present different hazards. Often, they can lead to water pollution, soil pollution, and air pollution, which may contribute to health impacts including cancer.</li>
                    </ul>
                    <li><b>Proximity to Risk Management Plan (RMP) Sites</b> - This number lists the number of “Risk Management Plan” (RMP) sites per kilometer (0.62 miles) within the county or census tract. An RMP site is a facility that uses “extremely hazardous substances,” according to the EPA. They are required to submit Risk Management Plans to the EPA every 5 years.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Living near facilities with “extremely hazardous substances” is inherently risky, despite companies’ plans to prevent issues and comply with EPA guidelines. </li>
                    </ul>
                    <li><b>Proximity to Hazardous Waste Sites</b> - This number lists the number of hazardous waste sites sites per kilometer (0.62 miles) within the county or census tract. Hazardous waste may be generated from industrial processes, oil and gas processing, and more.</li>
                    <ul>
                        <li><b>Why is it important?:</b> Hazardous waste can include a wide range of things, but by definition, it is waste that can be harmful to human health or the environment.</li>
                    </ul>
                    <li><b>Wastewater Discharge</b> - Facilities are required to report any pollutants they discharge into local streams or rivers. Some pollutants have a greater impact on human health than others, resulting in the need to weigh the “toxicity” by calculating the toxic-weight concentration of the discharge. This concentration is then divided by stream length, yielding the water discharge indicator.</li>
                    <ul>
                        <li><b>Why is it important?:</b>  Wastewater in streams and rivers typically come from industrial, commercial, or agricultural sources. Wastewater contains pollutants that can cause water-borne illnesses and diseases.</li>
                    </ul>
                </ul>
            </span>
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