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

const PollutionListItem = ({ 
    pollution_score,
    o3_max_pred,
    pm_mean_pred,
    SFcount,
    TRIcount
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
        <Score>{pollution_score}</Score>
      </Header>
      <Content>
        {isOpen && (
            <Wrapper>
            <HelpText>
            {/* Ozone Concentration */}
            <Labels>
              <Column>Ozone Concentration <InfoIcon /> </Column>
              <Column flex={0.4}>{(o3_max_pred).toFixed(1)} ppb</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={o3_max_pred}/>
                    <Filler width={65-(o3_max_pred)} />
            </IndicatorWrapper>
            {/* PM2.5 concentration */}
            <Labels>
              <Column>PM2.5 Concentration <InfoIcon /> </Column>
              <Column flex={0.6}>{pm_mean_pred.toFixed(1)} ug/m3</Column>
            </Labels>
            <IndicatorWrapper>
                <Indicator width={pm_mean_pred}/>
                    <Filler width={12-pm_mean_pred} />
            </IndicatorWrapper>
            {/* SF sites */}
            <Labels>
              <Column>Superfund Sites <InfoIcon /> </Column>
              <Column flex={0}>{SFcount}</Column>
            </Labels>
            {/* TRI sites */}
            <Labels>
              <Column>Toxic Release Inventory Facilities <InfoIcon /> </Column>
              <Column flex={0}>{TRIcount}</Column>
            </Labels>
            </HelpText>
            </Wrapper>
        )}
      </Content>
    </Wrapper>
  )
}


PollutionListItem.propTypes = {
    score_y: PropTypes.number.isRequired,
    o3_max_pred: PropTypes.number.isRequired,
    pm_mean_pred: PropTypes.number.isRequired,
    SFcount: PropTypes.number.isRequired,
    TRIcount: PropTypes.number.isRequired
}
  
export default PollutionListItem