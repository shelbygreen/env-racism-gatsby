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
import Factsheet from "../../pages/Factsheet"

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
  final_score,
  final_rank,
  showZoom,
  onBack,
  onZoomTo,
  onClickTo
}) => {

  // Factsheet navigation
  const handleClick = () => {
    onClickTo() // function defined on Explore page
  }

  return (
    <>
      <Header>
        <Columns>
          <Column flex={1}>
            <Title>{name}</Title>
            {/* County or Census Tract */}
          </Column>
          <Column flex={0}>
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
          <Section>
            <TabHeader>Environmental Justice Risk Score:<Score>{(final_score).toFixed(1)}</Score></TabHeader>
            <Progress done={final_score}/>
            <Help
                  snippet="What does this mean?  "
                >
                  The environmental justice risk score models the spatial concentration of chemical and nonchemical environmental 
                  stressors, as well as health conditions and social vulnerability factors that are assumed to exacerbate the effects of environmental stessors. This score was calculated by following the methodology
                  set by CalEnviroScreen, which involves combining the indicators that make up the Pollution Burden Score and the 
                  Population Characteristics Score into a composite cumulative risk score. 
            </Help>
            Expand the sections below to explore the indicators used to calcuate the environmental justice risk score.
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
                <Link county={county} to="/Factsheet">View {county} Factsheet</Link>
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
  final_score:PropTypes.number.isRequired,
  final_rank:PropTypes.number.isRequired,
  showZoom: PropTypes.bool,
  onBack: PropTypes.func,
  onZoomTo: PropTypes.func,
  onClickTo: PropTypes.func
}

RegionDetails.defaultProps = {
  showZoom: true,
  onBack: () => {},
  onZoomTo: () => {},
  onClickTo: () => {}
}
export default RegionDetails
