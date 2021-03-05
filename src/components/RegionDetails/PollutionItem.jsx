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
  pbn_score_state,
 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen)
  const color = theme.colors.grey[800]

  return (
    <Wrapper>
      <Header onClick={toggle}>
        <Title>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>Pollution Burden Score <Tooltip><TooltipText>This score assesses the presence of environmental hazards in a given location. Higher scores indicate more exposure to environmental hazards, which can lead to a wide range of health impacts.</TooltipText><InfoIcon/></Tooltip></div>
        </Title>
        <Score>{(pbn_score_state).toFixed(1)/10}</Score>
      </Header>
      <Content>
        {isOpen && (
            <Wrapper>
            <HelpText>
            {/* Lead Risk and Exposure */}
            <Labels>
              <Column>Lead Risk and Exposure <Tooltip><TooltipText>The percentage of residences that may have lead-based paint. There is no safe level of exposure to lead.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column>{100*(lead_score).toFixed(1)}%</Column>
            </Labels>
            {/* Ozone Concentration */}
            <Labels>
              <Column>Ozone Concentration (ppb) <Tooltip><TooltipText>Ozone is a type of air pollution, and is more commonly known as “smog.” Ozone is emitted into the atmosphere by oil refineries and plants, as well as by cars, trucks, and trains. The EPA 8-hour ozone standard is 70 ppb.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column>{(ozn_score).toFixed(1)}</Column>
            </Labels>
            {/* PM2.5 concentration */}
            <Labels>
              <Column>PM2.5 Concentration (ppb) <Tooltip><TooltipText>“PM2.5” (or, “particulate matter” smaller than 2.5 micrometers) refers to invisible particles in the air, which are easily inhaled. These particles come from sources like vehicles, power plants, and burning fuels. The EPA annual average PM2.5 standard is 12 ppb.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.3}>{pm25_score.toFixed(1)}</Column>
            </Labels>
            {/* Diesel PM */}
            <Labels>
              <Column>Diesel PM (ppb)  <Tooltip><TooltipText>Diesel Particulate Matter refers to the soot particles that are released from diesel exhaust. The Occupational Safety and Health Administration (OSHA) does not have a permissible exposure limit.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.2}>{dsl_score.toFixed(1)}</Column>
            </Labels>
            {/* air Toxics */}
            <Labels>
              <Column>Air Toxics Cancer Risk Index  <Tooltip><TooltipText>A person’s lifetime risk of getting cancer from inhaling airborne toxics. The EPA’s National Air Toxics Assessment (NATA) estimates most individuals’ air toxics cancer risk to be between 1-in-1 million and 100-in-1 million.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.3}>{100*(txcs_score.toFixed(1))}</Column>
            </Labels>
            {/* Traffic Proximity and Volume */}
            <Labels>
              <Column>Traffic Density (daily vehicles/meter)  <Tooltip><TooltipText>The sum of traffic volume divided by total road length.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={1.2}>{traf_score.toFixed(1)}</Column>
            </Labels>
            {/* Proximity to Superfund Sites */}
            <Labels>
              <Column>Superfund Sites (sites/km)  <Tooltip><TooltipText>Superfund sites, also referred to as Federal Cleanup sites, are abandoned hazardous sites that are awaiting cleanup. This indicator represents the number of these sites per kilometer (0.62 mi) within a census tract or county.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.3}>{cln_score.toFixed(1)}</Column>
            </Labels>
            {/* Proximity to RMP Sites */}
            <Labels>
              <Column>Risk Management Plan Sites (sites/km)  <Tooltip><TooltipText>Risk Management Plan sites store highly toxic, flammable, or explosive substances. This indicator represents the number of these sites per kilometer (0.62 mi) within a census tract or county.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.7}>{chem_score.toFixed(1)}</Column>
            </Labels>
            {/* Proximity to Hazardous Waste Sites */}
            <Labels>
              <Column>Hazardous Waste Sites (sites/km)  <Tooltip><TooltipText>Hazardous waste sites treat, store, or dispose of hazardous waste. This indicator represents the number of these sites per kilometer (0.62 mi) within a census tract or county.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.4}>{hazw_score.toFixed(1)}</Column>
            </Labels>
            {/* Wastewater Discharge */}
            <Labels>
              <Column>Wastewater Discharge (concentration/meter)  <Tooltip><TooltipText>This indicator represents the toxicity-weight concentration of pollutants discharged into streams, divided by the stream length.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={1.5}>{wat_score.toFixed(1)}</Column>
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
  pbn_score_state: PropTypes.number.isRequired,
}
  
export default PollutionListItem