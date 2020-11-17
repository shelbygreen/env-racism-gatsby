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
    population_score,
    poverty_p,
    nwpopulation_p, 
    educational_attainment_p,
    housing_burden_p,
    age_0to9_p,
    age_65_p,
    cardiovascular_disease,
    low_birth_weight,
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
        <Score>{population_score}</Score>
      </Header>
      <Content>
        {isOpen && (
            <Wrapper>
            <HelpText>
            {/* Young and Old Population */}
            <Labels>
              <Column>Presence of Children and the Elderly <Tooltip><TooltipText>The percentage of the population who are children (10 years old or younger) and the elderly (65 years old or older)</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{(age_0to9_p+age_65_p).toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={age_0to9_p+age_65_p}/>
                    <Filler width={100-(age_0to9_p+age_65_p)} />
            </IndicatorWrapper>
            {/* nonwhite population */}
            <Labels>
              <Column>Nonwhite Population <Tooltip><TooltipText>The percentage of the population who don't identify as white. Nonwhite populations are more likely to be affected, and burdened by, toxic environmental conditions.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{nwpopulation_p.toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={nwpopulation_p}/>
                    <Filler width={100-nwpopulation_p} />
            </IndicatorWrapper>
            {/* Low Birth Weight */}
            <Labels>
              <Column>Infants with Low Birth Weight <Tooltip><TooltipText>Infants born early or underweight, weighing 5 lbs and 8 oz or less.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{low_birth_weight.toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={low_birth_weight}/>
                    <Filler width={100-low_birth_weight} />
            </IndicatorWrapper>
            {/* Educational Attainment */}
            <Labels>
              <Column>Educational Attainment <Tooltip><TooltipText>The percentage of the population who are at least 25 years old and haven't graduated from high school. </TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{educational_attainment_p.toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={educational_attainment_p}/>
                    <Filler width={100-educational_attainment_p} />
            </IndicatorWrapper>
            {/* Poverty */}
            <Labels>
              <Column>Poverty <Tooltip><TooltipText>The percentage of the population with an income below the Federal poverty level.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{poverty_p.toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={poverty_p}/>
                    <Filler width={100-poverty_p} />
            </IndicatorWrapper>
            {/* Housing Burden */}
            <Labels>
              <Column>Housing Burden <Tooltip><TooltipText>The percentage of the population spending more than half of their income on rent.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{housing_burden_p.toFixed(1)}%</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={housing_burden_p}/>
                    <Filler width={100-housing_burden_p} />
            </IndicatorWrapper>
            {/* Cardiovascular Rate */}
            <Labels>
              <Column>Cardiovascular Disease Mortality Rate <Tooltip><TooltipText>The annual number of deaths from cardiovascular disease per 100,000 people.</TooltipText><InfoIcon/></Tooltip></Column>
              <Column flex={0}>{cardiovascular_disease.toFixed(1)}</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={cardiovascular_disease}/>
                    <Filler width={1000-cardiovascular_disease} />
            </IndicatorWrapper>
            </HelpText>
            </Wrapper>
        )}
      </Content>
    </Wrapper>
  )
}

PopulationListItem.propTypes = {
  population_score: PropTypes.number.isRequired,
  age_0to9_p: PropTypes.number.isRequired,
  age_65_p: PropTypes.number.isRequired,
  low_birth_weight: PropTypes.number.isRequired,
  cardiovascular_disease: PropTypes.number.isRequired,
  educational_attainment_p: PropTypes.number.isRequired,
  poverty_p: PropTypes.number.isRequired,
  nwpopulation_p: PropTypes.number.isRequired,
  housing_burden_p: PropTypes.number.isRequired
}

export default PopulationListItem