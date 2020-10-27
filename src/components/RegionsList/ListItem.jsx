import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { Columns, Column } from '../Grid'
import styled, { themeGet, theme } from '../../../util/style'
import { readibleNumber } from '../../../util/format'

const Wrapper = styled(Text).attrs({
    fontSize: ['0.9rem', '0.8rem', '0.9rem'],
})`
    line-height: 1.2;
    padding: 0.5rem 1rem;
    cursor: pointer;

    color: ${themeGet('colors.grey.600')};
    font-weight: 100;

    &:hover {
        background-color: ${theme.colors.primary[100]}50;
    }

    &:not(:first-child) {
        border-top: 1px solid ${themeGet('colors.grey.100')};
        padding-top: 0.5rem;
    }
`

const Name = styled.div`
    color: ${themeGet('colors.primary.500')};
    font-size: 1rem;
    font-weight: normal;
`
  
const ListItem = ({ name, cmlscore, population, ...props }) => (
    <Wrapper {...props}>
      <Columns>
        <Column>
        {/* Add CD numbers to each county/tract */}
          <Name>{name}</Name>
          {/* Congressional District */}
        </Column>
        <Column>
          <Text textAlign="right">
          Risk Score: {cmlscore}
          <br />
          {readibleNumber(population, 0)} residents
          </Text>
        </Column>
      </Columns>
    </Wrapper>
)
  
ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    cmlscore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
}
  
// only rerender on ID change
export default memo(
    ListItem,
    ({ id: prevID }, { id: nextID }) => nextID === prevID
)