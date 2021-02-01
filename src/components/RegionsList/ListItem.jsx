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
        background-color: ${theme.colors.primary[100]};
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
  
const ListItem = ({ name, final_score, total_pop, ...props }) => (
    <Wrapper {...props}>
      <Columns>
        <Column>
          <Name>{name}</Name>
          {readibleNumber(total_pop, 0)} residents
        </Column>
        <Column>
          <Text textAlign="right">
          Risk Score: {final_score.toFixed(1)}
          </Text>
        </Column>
      </Columns>
    </Wrapper>
)
  
ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    final_score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    total_pop: PropTypes.number.isRequired,
}
  
// only rerender on ID change
export default memo(
    ListItem,
    ({ id: prevID }, { id: nextID }) => nextID === prevID
)