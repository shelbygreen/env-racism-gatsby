import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaCaretDown, FaCaretRight, FaInfoCircle  } from "react-icons/fa"
import HelpText from "../Elements/HelpText"
import styled, { themeGet, theme } from "../../../util/style"
import { Flex, Columns, Column } from "../Grid"
import { formatNumber } from "../../../util/format"

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

const PopulationListItem = ({ 
  hbrd_score,
	nohs_score,
	liso_score,
	unem_score,
	poc_score,
	pov_score,
	pop_score
 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen)
  const color = theme.colors.grey[800]

  return (
    <Wrapper>
      <Header onClick={toggle}>
        <Title>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>Population Characteristics Score</div>
        </Title>
        <Score>{(pop_score/10).toFixed(1)}</Score>
      </Header>
      <Content>
        {isOpen && (
            <Wrapper>
            <HelpText>
            {/* Young and Old Population */}
            {/* <Labels>
              <Column>Presence of Children and the Elderly <Tooltip><TooltipText>The percentage of the population who are children (10 years old or younger) and the elderly (65 years old or older)</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{(age_0to9_p+age_65_p).toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={age_0to9_p+age_65_p}/>
                    <Filler width={100-(age_0to9_p+age_65_p)} />
            </IndicatorWrapper> */}
            {/* nonwhite population */}
            {/* Low Birth Weight */}
            {/* <Labels>
              <Column>Infants with Low Birth Weight <Tooltip><TooltipText>Infants born early or underweight, weighing 5 lbs and 8 oz or less.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{low_birth_weight.toFixed(1)}%</Column>
            </Labels> */}
            {/* Cardiovascular Rate */}
            {/* <Labels>
              <Column>Cardiovascular Disease Mortality Rate <Tooltip><TooltipText>The annual number of deaths from cardiovascular disease per 100,000 people.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{cardiovascular_disease.toFixed(1)}</Column>
            </Labels> */}
            {/* Under Age 5 Population */}
            {/* Over Age 64 Population */}
            <Labels>
              <Column>Minority Population <Tooltip><TooltipText>The percentage of the population who don't identify as white. Nonwhite populations are more likely to be affected, and burdened by, toxic environmental conditions.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.23}>{poc_score.toFixed(1)}%</Column>
            </Labels>
            {/* Educational Attainment */}
            <Labels>
              <Column>Less than High School Education<Tooltip><TooltipText>The percentage of the population who are at least 25 years old and haven't graduated from high school. </TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.4}>{nohs_score.toFixed(1)}%</Column>
            </Labels>
            {/* Poverty */}
            <Labels>
              <Column>Low-income Population <Tooltip><TooltipText>The percentage of the population with a household income less than or equal to twice the federal poverty level.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.27}>{pov_score.toFixed(1)}%</Column>
            </Labels>
            {/* Housing Burden */}
            <Labels>
              <Column>Housing Burden <Tooltip><TooltipText>The percentage of the population spending more than half of their income on rent.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.17}>{hbrd_score.toFixed(1)}%</Column>
            </Labels>
            {/* Linguistic Isolation */}
            <Labels>
              <Column>Linguistic Isolation <Tooltip><TooltipText>TODO: add description</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.23}>{liso_score.toFixed(1)}%</Column>
            </Labels>
            {/* Unemployed Population */}
            <Labels>
              <Column>Unemployed Population <Tooltip><TooltipText>TODO: add description</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0.28}>{unem_score.toFixed(1)}%</Column>
            </Labels>
            </HelpText>
            </Wrapper>
        )}
      </Content>
    </Wrapper>
  )
}

PopulationListItem.propTypes = {
  hbrd_score: PropTypes.number.isRequired,
	nohs_score: PropTypes.number.isRequired,
	liso_score: PropTypes.number.isRequired,
	unem_score: PropTypes.number.isRequired,
	poc_score: PropTypes.number.isRequired,
	pov_score: PropTypes.number.isRequired,
	pop_score: PropTypes.number.isRequired
}

export default PopulationListItem