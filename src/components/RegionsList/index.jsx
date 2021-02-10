import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { FixedSizeList as List } from 'react-window'
import useDimensions from 'react-use-dimensions'

import {
  Context as CrossfilterContext,
  SET_FILTER,
} from '../Crossfilter'
import { Box, Flex, Columns, Column } from '../Grid'
import styled, { themeGet } from '../../../util/style'
import SearchBar from './SearchBar'
import SortBar from './SortBar'
import ListItem from './ListItem'

// options for sorting the data
// type(county to tract), population(big to small), and risk score(big to small)
const sortOptions = [
    // {
    //   label: "name",
    //   sortFunc: (a, b) => (a.get("name") > b.get("name") ? 1 : -1)
    // },
    { label: "tract", sortFunc: (a, b) => b.get("type") - a.get("type") },
    { label: "population", sortFunc: (a, b) => b.get("total_pop") - a.get("total_pop") },
    { label: "risk score", sortFunc: (a, b) => b.get("final_score") - a.get("final_score") }
]
  
export const Wrapper = styled(Flex).attrs({
    flex: '1 1 auto',
    flexDirection: 'column',
})``
  
export const Count = styled.span`
    color: ${themeGet('colors.grey.600')};
    font-size: 0.8em;
    line-height: 1.2;
`
  
export const ListWrapper = styled.div`
    flex: 1 1 auto;
`
  
export const NoResults = styled(Box)`
    color: ${themeGet('colors.grey.600')};
    margin-top: 2rem;
    text-align: center;
`
// component for the list of regions
const RegionsList = ({ onSelect }) => {
    // initializing the state variable (createContext())
    const { state, dispatch: filterDispatch } = useContext(CrossfilterContext)
    // initializing the list Ref (null)
    const listRef = useRef(null)
    // defining the width and height of the container for the list
    const [listWrapperRef, { height: listHeight }] = useDimensions()
    // use sort option 0 as the initial sortIdx
    const [sortIdx, setSortIdx] = useState(0) // default: county or tract view
  
    const handleQueryChange = value => {
      filterDispatch({
        type: SET_FILTER,
        payload: {
          field: 'name',
          filterValue: value,
        },
      })
    }
  
    const handleSortChange = idx => {
      if (idx === sortIdx) return
  
      setSortIdx(idx)
  
      // reset list to top
      if (listRef.current) {
        listRef.current.scrollTo(0)
      }
    }
    // data from Crossfilter
    const data = state.get('data')
    console.log('regionsListData', data)
    // sortedData based on the options
    // is this where I should sort the list instead???
    const sortedData = data.sort(sortOptions[sortIdx].sortFunc)
    console.log('searchValue/Type', state.get("filters", Map()).get("type"))
  
    return (
      <Wrapper>
        <Columns px="1rem" alignItems="baseline">
          <Column>
            <Count>{data.size} regions visible</Count>
          </Column>
          <Column>
            <SortBar
              index={sortIdx}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </Column>
        </Columns>
  
        <SearchBar
          value={state.get("filters", Map()).get("name", "")}
          placeholder="Enter the name of a county or census tract"
          onChange={handleQueryChange}
        />
  
        {data.size > 0 ? (
          <ListWrapper ref={listWrapperRef}>
            {listHeight ? (
              <List
                ref={listRef}
                itemData={sortedData.toJS()}
                height={listHeight}
                itemSize={64}
                itemCount={sortedData.size}
                itemKey={(i, items) => items[i].id}
              >
                {({ index, data: listData, style }) => {
                  const item = listData[index]
                  return (
                    <ListItem
                      onClick={() => onSelect(item.id)}
                      {...item}
                      style={style}
                    />
                  )
                }}
              </List>
            ) : null}
          </ListWrapper>
        ) : (
          <NoResults>No visible counties or census tracts...</NoResults>
        )}
      </Wrapper>
    )
}
  
RegionsList.propTypes = {
    onSelect: PropTypes.func.isRequired,
}
  
export default RegionsList