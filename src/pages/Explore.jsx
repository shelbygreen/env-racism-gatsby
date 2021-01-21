import React, { useState, useRef } from 'react'
import { List } from 'immutable'
import { useData } from '../components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from '../components/Crossfilter'
import SEO from "../components/seo"
import Layout from "../components/Layout/index"
import { Flex } from '../components/Grid'
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import ExpandableParagraph from '../components/Elements/ExpandableParagraph'
import styled, { themeGet } from '../../util/style'
import Map from '../components/Map/index'
import RegionsList from '../components/RegionsList'
import RegionDetails from '../components/RegionDetails'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Help = styled(ExpandableParagraph)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Explore = () => {
  const [data, index] = useData()
  const [selectedId, setSelectedId] = useState(null)
  const boundsRef = useRef([-106.645646,25.837377,-93.508292,36.500704]) // store bounds so they are updated without rerendering
  const [{ prevBounds, nextBounds }, setBounds] = useState({
    prevBounds: List([-106.645646,25.837377,-93.508292,36.500704]),
  })
  const [showZoom, setShowZoom] = useState(true)

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  const handleSelectFromList = id => {
    handleSelect(id)
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(id.toString()).get('bounds'),
    })
    setShowZoom(false)
  }

  const handleZoomTo = () => {
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(selectedId.toString()).get('bounds'),
    })
  }

  const handleBack = () => {
    setSelectedId(null)
    setBounds({ nextBounds: List(prevBounds), prevBounds: List() })
    setShowZoom(true)
  }

  const handleBoundsChange = bounds => {
    boundsRef.current = bounds
  }

  return (
    <CrossfilterProvider data={data} filters={filters}>
    <Layout>
        <SEO title="Explore" />
        <Wrapper>
            <Sidebar allowScroll={false}>
              {selectedId !== null ? (
                <RegionDetails
                  {...index.get(selectedId.toString()).toJS()}
                  showZoom={showZoom}
                  onBack={handleBack}
                  onZoomTo={handleZoomTo}
                />
              ) : (
                <>
                  <SidebarHeader title="Explore Regions" icon="map" />
                      <Help
                      snippet="~~Click on a region in the list below or on the map for more
                      detailed information."
                      >
                      Click on a region in the list below or on the map for more
                      detailed information. Use the buttons to toggle between displaying 
                      counties and census tracts. The list below only shows
                      regions visible on the map. Zoom out if you want to see more regions, 
                      and zoom in if you want to less.
                      </Help>
                      <RegionsList onSelect={handleSelectFromList} />
                </>
              )}
              </Sidebar>
            <FilteredMap
              bounds={nextBounds}
              selectedFeature={selectedId}
              onSelectFeature={handleSelect}
              onBoundsChange={handleBoundsChange}
            />
        </Wrapper>
    </Layout>
    </CrossfilterProvider>
  )
}
export default Explore
