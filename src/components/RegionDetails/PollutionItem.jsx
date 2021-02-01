import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaCaretDown, FaCaretRight, FaInfoCircle  } from "react-icons/fa"

import HelpText from "../Elements/HelpText"
import styled, { themeGet, theme } from "../../../util/style"
import { Flex, Columns, Column } from "../Grid"

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

const Header = styled(Flex).attrs({
  justifyContent: 'space-between',
})`
  cursor: pointer;
`

const Title = styled(Flex).attrs({ alignItems: 'center', flex: 1 })`
  cursor: pointer;
`

const Bar = styled.div`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width}%;
  height: 0.5rem;
  line-height: 1;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.25rem 1rem 0;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
`

const IndicatorWrapper = styled(Flex).attrs({
    flexWrap: "nowrap"
    })`
    height: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${themeGet("colors.grey.200")};
    border: 1px solid ${themeGet("colors.grey.200")};
    overflow: hidden;
`

const Indicator = styled.div`
    background-color: ${({ active }) =>
        active ? themeGet("colors.highlight.500") : themeGet("colors.primary.500")};
    flex-grow: ${({ width }) => width};
    transition: flex-grow 300ms;
`

const Filler = styled.div`
    flex-grow: ${({ width }) => width};
    transition: flex-grow 300ms;
`
const Labels = styled(Columns).attrs({
    justifyContent: "space-between"
  })`
    color: ${({ active }) =>
      active ? themeGet("colors.highlight.500") : themeGet("colors.grey.700")};
    font-size: 0.8rem;
    padding-top: 0.4rem;
`

const Score = styled.div`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${themeGet('colors.grey.700')};
  text-align: end;
  display: absolute;
  padding-top: 0.2em;
`

const Content = styled.div`
  margin-left: 1.5rem;
`

const expandoColor = theme.colors.grey[800]
const expandoSize = '1.5rem'

const CaretDown = styled(FaCaretDown).attrs({
  color: expandoColor,
  size: expandoSize,
})``

const CaretRight = styled(FaCaretRight).attrs({
  color: expandoColor,
  size: expandoSize,
})``

const InfoIcon = styled(FaInfoCircle)`
  width: 0.7em;
  height: 0.7em;
  opacity: 0.5;
  text-align: end;
  &:hover {
      opacity: 1;
  }
`

const Tooltip = styled.span`
  color: black;
  margin: 0;
  padding: 0;
  color: $tooltip - activ;
  position: relative;
  display: inline-block;
  :hover {
    color: black;
  }
`

const TooltipText = styled.span`
  font-size: 0.8rem;
  width: 200px;
  visibility: hidden;
  background-color: ${themeGet('colors.grey.700')};
  color: white; 
  text-align: center;
  padding: 7px 7px;
  border-radius: 6px;
  bottom: 0%;
  left: 0%;
  margin-left: 0px;
  position: absolute;
  z-index: 1;
  opacity: 1;
  transition: opacity 300ms;
}
${Tooltip}:hover & {
  visibility: visible;
  opacity: 1;
}
&::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  margin-left: 5px;
  }
`

const PollutionListItem = ({ 
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
 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen)
  const color = theme.colors.grey[800]

  return (
    <Wrapper>
      <Header onClick={toggle}>
        <Title>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>Pollution Burden Score</div>
        </Title>
        <Score>{pbn_score.toFixed(1)}</Score>
      </Header>
      <Content>
        {isOpen && (
            <Wrapper>
            <HelpText>
            {/* Lead Risk and Exposure */}
            <Labels>
              <Column>Lead Risk and Exposure <Tooltip><TooltipText>The percentage of residences that may have lead-based paint</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.1}>{100*(lead_score).toFixed(1)}%</Column>
            </Labels>
            {/* Ozone Concentration */}
            <Labels>
              <Column>Ozone Concentration <Tooltip><TooltipText>Ground-level ozone is an air pollutant and the main constituent of smog. Ozone is emitted into the atmosphere by oil refineries and plants, as well as by cars, trucks, and trains. The EPA 8-hour ozone standard is 70 ppb. Above this point, air quality becomes unhealthy and potentially hazardous. </TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.4}>{(ozn_score).toFixed(1)} ppb</Column>
            </Labels>
            {/* PM2.5 concentration */}
            <Labels>
              <Column>PM2.5 Concentration <Tooltip><TooltipText>Fine particulate matter, or PM2.5, are microscopic, inhalable particles. PM2.5 is an air pollutant that is emitted into the atmosphere from sources like vehicles, power plants, and operations involving the burning of fuels. The EPA annual average PM2.5 standard is 12 micrograms/cubic meters.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.47}>{pm25_score.toFixed(1)} ug/m3</Column>
            </Labels>
            {/* Diesel PM */}
            <Labels>
              <Column>Diesel PM  <Tooltip><TooltipText>TODO: add description for indicator</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.31}>{dsl_score.toFixed(1)} ug/m3</Column>
            </Labels>
            {/* air Toxics */}
            <Labels>
              <Column>Air Toxics Cancer Risk Index  <Tooltip><TooltipText>Lifetime cancer risk from inhalation of air toxics </TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{txcs_score.toFixed(1)}</Column>
            </Labels>
            {/* Traffic Proximity and Volume */}
            <Labels>
              <Column>Traffic Density  <Tooltip><TooltipText>TODO: add description for indicator. unit: daily traffic count/km to road</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.1}>{traf_score.toFixed(1)}</Column>
            </Labels>
            {/* Proximity to Superfund Sites */}
            <Labels>
              <Column>Proximity to Superfund Sites <Tooltip><TooltipText>TODO: add description for indicator</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={2.4}>{cln_score.toFixed(1)} site count/km</Column>
            </Labels>
            {/* Proximity to RMP Sites */}
            <Labels>
              <Column>Proximity to Risk Management Plan Sites <Tooltip><TooltipText>TODO: add description for indicator</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.4}>{chem_score.toFixed(1)}</Column>
            </Labels>
            {/* Proximity to Hazardous Waste Sites */}
            <Labels>
              <Column>Proximity to Hazardous Waste Sites <Tooltip><TooltipText>TODO: add description for indicator</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.25}>{hazw_score.toFixed(1)}</Column>
            </Labels>
            {/* Wastewater Discharge */}
            <Labels>
              <Column>Wastewater Discharge <Tooltip><TooltipText>TODO: add description for indicator</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={7}>{wat_score.toFixed(1)} toxicity-weighted concentration/m</Column>
            </Labels>
            {/* <IndicatorWrapper>
              <Indicator width={pm_mean_pred}/>
              <Filler width={12-pm_mean_pred} />
            </IndicatorWrapper> */}
            {/* SF sites */}
            </HelpText>
            </Wrapper>
        )}
      </Content>
    </Wrapper>
  )
}


PollutionListItem.propTypes = {
  lead_score: PropTypes.number.isRequired,
	chem_score: PropTypes.number.isRequired,
	hazw_score: PropTypes.number.isRequired,
	cln_score: PropTypes.number.isRequired,
	wat_score: PropTypes.number.isRequired,
	ozn_score: PropTypes.number.isRequired,
	pm25_score: PropTypes.number.isRequired,
	dsl_score: PropTypes.number.isRequired,
	traf_score: PropTypes.number.isRequired,
	txcs_score: PropTypes.number.isRequired,
  pbn_score: PropTypes.number.isRequired,
}
  
export default PollutionListItem