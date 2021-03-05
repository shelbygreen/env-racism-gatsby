import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Link } from 'gatsby'
import { Columns, Column, Flex } from '../Grid'
import ExpandableParagraph from '../Elements/ExpandableParagraph'
import Tabs, { Tab as BaseTab } from '../Tabs'
import styled, { themeGet } from '../../../util/style'
import { readibleNumber } from '../../../util/format'
// import { useData } from '../Data'
import { Button } from '../Button'
import Progress from './ProgressBar'
import PopulationListItem from "./PopulationItem"
import PollutionListItem from "./PollutionItem"
import { OutboundLink } from '../Link'

const Header = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${themeGet("colors.primary.100")};
  border-bottom: 1px solid ${themeGet("colors.grey.200")};
  line-height: 1.2;
`

const Title = styled(Text).attrs({
  fontSize: ["1rem", "1rem", "1.5rem"]
})``

const Help = styled(ExpandableParagraph)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet("colors.grey.700")};
`

const BackIcon = styled(FaRegTimesCircle).attrs({ size: "1.5rem" })`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: ${themeGet("colors.grey.600")};
  &:hover {
    color: ${themeGet("colors.grey.900")};
  }
`

const Score = styled(Text).attrs({ textAlign: "right" })`
  font-size: 1.25rem;
`

const ZoomButton = styled(Button)`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  padding: 0.1rem 0.5rem;
`

const FactsheetButton = styled(Button)`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  padding: 0.1rem 0.5rem;
`

const TabHeader = styled(Flex).attrs({
  justifyContent: 'space-between',
})`
  font-size: 1.25rem;
`
const Section = styled.section`
  &:not(:first-child) {
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid ${themeGet("colors.grey.200")};
  }
`

const TabContainer = styled(Tabs)`
  height: 100%;
`

const Tab = styled(BaseTab)`
  padding: 1rem;
  flex: 1 1 auto;
  overflow-y: auto;
`
// component for the details of the listed region
// get fields from the index variable for the selectedId
const RegionDetails = ({
  id, 
  type,
  name,
  county,
  total_pop,
  lead_score,
	chem_score,
	hazw_score,
	cln_score,
	wat_score,
	ozn_score,
	pm25_score,
	dsl_score,
	traf_score,
	txcs_score,
  pbn_score,
  hbrd_score,
	nohs_score,
	liso_score,
	unem_score,
	poc_score,
	pov_score,
  pop_score,
  final_score_state,
  onBack,
}) => {

  return (
    <>
      <Header>
        <Columns>
          <Column flex={1}>
            <Title>{name}</Title>
            {readibleNumber(total_pop, 0)} residents
          </Column>
          <Column flex={0.1}>
            {/* show the back icon */}
            <BackIcon onClick={onBack} />
          </Column>
        </Columns>
      </Header>

      <Tab>
        {/* <Section> */}
            {/* <TabHeader>Background:</TabHeader> */}
            {/* The 2018 American Community Survey estimated {readibleNumber(population, 0)} people live in {name}, where {readibleNumber(age_0to9, 0)} are children 
            and {readibleNumber(age_65, 0)} are seniors.  */}
          {/* </Section> */}

          {/* <Section>
            {showZoom && (
              <Text textAlign="center">
                <ZoomButton primary onClick={handleZoom}>
                  Zoom To Region
                </ZoomButton>
              </Text>
            )}
          </Section> */}

          <Section>
            <TabHeader>Environmental Justice Risk Score:<Score>{(final_score_state).toFixed(1)}</Score></TabHeader>
            <Progress done={final_score_state}/>
            <Help
                  snippet="What does this mean?  "
                >
                  This score reflects the combined environmental and social burdens faced by people living in a given county or census tract. Higher scores indicate higher cumulative burdens from environmental and social factors. 
                  <br/><br/>
                  The Cumulative Environmental Justice Score combines the Population Characteristics Score and the Pollution Burden Score. See methodology <OutboundLink from="/" to="https://docs.google.com/document/d/1bMsI1HZU71_HtmHxKGRBpkEU31ghP6vNvuXfKyo2wvM/edit?usp=sharing">here</OutboundLink>.
            </Help>
            Expand the sections below to explore the indicators used to calcuate the environmental justice risk score.<br/><br/>
            <PopulationListItem
            hbrd_score={hbrd_score}
            nohs_score={nohs_score}
            liso_score={liso_score}
            unem_score={unem_score}
            poc_score={poc_score}
            pov_score={pov_score}
            pop_score={pop_score}/>
            <PollutionListItem
            lead_score={lead_score}
            chem_score={chem_score}
            hazw_score={hazw_score}
            cln_score={cln_score}
            wat_score={wat_score}
            ozn_score={ozn_score}
            pm25_score={pm25_score}
            dsl_score={dsl_score}
            traf_score={traf_score}
            txcs_score={txcs_score}
            pbn_score={pbn_score}/>
          </Section>
          <Section>
            {/* View Factsheet Button */}
            <center>
              <FactsheetButton>
                <Link to={`/Factsheet/${county.replace(/\s+/g, '-')}`}>View {county}'s Factsheet</Link>
              </FactsheetButton>
            </center>
          </Section>
      </Tab>
    </>
  )
}

RegionDetails.propTypes = {
  id:PropTypes.number.isRequired, 
  type:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  county: PropTypes.string.isRequired,
  total_pop:PropTypes.number.isRequired,
  lead_score:PropTypes.number.isRequired,
	chem_score:PropTypes.number.isRequired,
	hazw_score:PropTypes.number.isRequired,
	cln_score:PropTypes.number.isRequired,
	wat_score:PropTypes.number.isRequired,
	ozn_score:PropTypes.number.isRequired,
	pm25_score:PropTypes.number.isRequired,
	dsl_score:PropTypes.number.isRequired,
	traf_score:PropTypes.number.isRequired,
	txcs_score:PropTypes.number.isRequired,
  pbn_score:PropTypes.number.isRequired,
  hbrd_score:PropTypes.number.isRequired,
	nohs_score:PropTypes.number.isRequired,
	liso_score:PropTypes.number.isRequired,
	unem_score:PropTypes.number.isRequired,
	poc_score:PropTypes.number.isRequired,
	pov_score:PropTypes.number.isRequired,
  pop_score:PropTypes.number.isRequired,
  final_score_state:PropTypes.number.isRequired,
  final_rank:PropTypes.number.isRequired,
  onBack: PropTypes.func,
}

RegionDetails.defaultProps = {
  onBack: () => {},
}
export default RegionDetails
