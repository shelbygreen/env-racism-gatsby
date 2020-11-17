import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'

import { Columns, Column, Flex } from '../Grid'
import ExpandableParagraph from '../Elements/ExpandableParagraph'
import Tabs, { Tab as BaseTab } from '../Tabs'
import styled, { themeGet } from '../../../util/style'
import { readibleNumber } from '../../../util/format'

import { Button } from '../Button'
import Progress from './ProgressBar'
import PopulationListItem from "./PopulationItem"
import PollutionListItem from "./PollutionItem"

const Header = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${themeGet("colors.primary.100")};
  border-bottom: 1px solid ${themeGet("colors.grey.200")};
  line-height: 1.2;
`

const Title = styled(Text).attrs({
  fontSize: ["1rem", "1rem", "1.5rem"]
})``

const Subtitle = styled(Text).attrs({
  fontSize: ["0.8rem", "0.8rem", "1rem"]
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

const TabHeader = styled(Flex).attrs({
  justifyContent: 'space-between',
})`
  font-size: 1.25rem;
`

const Value = styled.div`
  padding-left: 0rem;
  color: ${themeGet("colors.grey.900")};
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
  name,
  population,
  nwpopulation_p,
  poverty_p,
  educational_attainment_p,
  housing_burden_p,
  age_0to9_p,
  age_65_p,
  age_0to9,
  age_65,
  cardiovascular_disease,
  low_birth_weight,
  o3_max_pred,
  pm_mean_pred,
  SFcount,
  TRIcount,
  population_score,
  pollution_score,
  cmlscore,
  showZoom,
  onBack,
  onZoomTo
}) => {

  const handleZoom = () => {
    onZoomTo()
  }

  return (
    <>
      <Header>
        <Columns>
          <Column flex={1}>
            <Title>{name}</Title>
            {/* Congressional District */}
          </Column>
          <Column flex={0}>
            <BackIcon onClick={onBack} />
          </Column>
        </Columns>
        {/* <Subtitle width="100%">
          <Columns>
            <Column>{stateNames[state]}</Column>
            <Column>
              <Acres>{formatNumber(acres, 0)} acres</Acres>
            </Column>
          </Columns>
        </Subtitle> */}
      </Header>

      <Tab>
        <Section>
            <TabHeader>Background:</TabHeader>
            The 2018 American Community Survey estimated {readibleNumber(population, 0)} people live in {name}, where {readibleNumber(age_0to9, 0)} are children 
            and {readibleNumber(age_65, 0)} are seniors. 
          </Section>
          <Section>
            <TabHeader>Cumulative Risk Score:<Score>{cmlscore}</Score></TabHeader>
            <Progress done={cmlscore}/>
            <Help
                  snippet="What does this mean?  "
                >
                  The cumulative risk score models the spatial concentration of chemical and nonchemical environmental 
                  stressors, as well as health conditions and social vulnerability factors that are assumed to exacerbate the effects of environmental stessors. This score was calculated by following the methodology
                  set by CalEnviroScreen, which involves combining the indicators that make up the Pollution Burden Score and the 
                  Population Characteristics Score into a composite cumulative risk score. 
            </Help>
            Expand the sections below to explore the indicators used to calcuate the cumulative risk score.
            <PopulationListItem
            population_score={population_score}
            age_0to9_p={age_0to9_p}
            age_0to9={age_0to9}
            age_65_p={age_65_p}
            age_65={age_65}
            nwpopulation_p={nwpopulation_p}
            educational_attainment_p={educational_attainment_p}
            housing_burden_p={housing_burden_p}
            cardiovascular_disease={cardiovascular_disease}
            low_birth_weight={low_birth_weight}
            poverty_p={poverty_p}
            population={population}/>
            <PollutionListItem
            pollution_score={pollution_score}
            o3_max_pred={o3_max_pred}
            pm_mean_pred={pm_mean_pred}
            SFcount={SFcount}
            TRIcount={TRIcount}/>
          </Section>
      </Tab>
    </>
  )
}

RegionDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  nwpopulation_p: PropTypes.number.isRequired,
  poverty_p: PropTypes.number.isRequired,
  educational_attainment_p: PropTypes.number.isRequired,
  housing_burden_p: PropTypes.number.isRequired,
  age_0to9_p: PropTypes.number.isRequired,
  age_65_p: PropTypes.number.isRequired,
  age_0to9: PropTypes.number.isRequired,
  age_65: PropTypes.number.isRequired,
  cardiovascular_disease: PropTypes.number.isRequired,
  low_birth_weight: PropTypes.number.isRequired,
  o3_max_pred: PropTypes.number.isRequired,
  pm_mean_pred: PropTypes.number.isRequired,
  SFcount: PropTypes.number.isRequired,
  TRIcount: PropTypes.number.isRequired,
  population_score: PropTypes.number.isRequired,
  pollution_score: PropTypes.number.isRequired,
  cmlscore: PropTypes.number.isRequired,
  showZoom: PropTypes.bool,
  onBack: PropTypes.func,
  onZoomTo: PropTypes.func
}

RegionDetails.defaultProps = {
  showZoom: true,
  onBack: () => {},
  onZoomTo: () => {}
}
export default RegionDetails
