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
import { Text } from 'rebass'
import styled, { themeGet } from '../../util/style'
import RegionsList from '../components/RegionsList'
import RegionDetails from '../components/RegionDetails'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
  overflow-y: hidden;
`

const Help = styled(Flex)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Explore = () => {
  // graphql data stored here as data and index
  // index is the data, but indexed by ccid
  const [data, index] = useData()
  // new state variable called selectedId
  // initially selectedId is null
  const [selectedId, setSelectedId] = useState(null)
  // Ref for the bounds (initial view on map load)
  // bounds are stored so they are updated without rerendering
  const boundsRef = useRef([-106.645646,25.837377,-93.508292,36.500704])
  // new state variables for prevBounds and nextBounds
  // initially the prevBounds are the same ones in boundsRef
  const [{ prevBounds, nextBounds }, setBounds] = useState({
    prevBounds: List([-106.645646,25.837377,-93.508292,36.500704]),
  })
  // ref for showing the zoom Extent button
  // initially yes
  const [showZoom, setShowZoom] = useState(true)

  // get the id and update the selectedId state using setSelectedId
  // when user clicks on map
  // also set the new Bounds (zooms in)
  const handleSelect = id => {
    setSelectedId(id)
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(id.toString()).get('bounds'),
    })
  }
  // get the id and set the Bounds based on the id
  // when user clicks on item in the list
  const handleSelectFromList = id => {
    handleSelect(id)
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(id.toString()).get('bounds'),
    })
    setShowZoom(false)
  }
  // set the Bounds to the bounds of the selectedId
  const handleZoomTo = () => {
    setBounds(() => index.get(selectedId.toString()).get('bounds'))
  }
  // when going back, the selectedId becomes null 
  // the Bounds become the previous bounds before clicking
  // and they zoom back
  const handleBack = () => {
    setSelectedId(null)
    setBounds({ nextBounds: List(prevBounds), prevBounds: List() })
    setShowZoom(true)
  }
  // the current view of the Bounds Ref is the bounds
  const handleBoundsChange = bounds => {
    boundsRef.current = bounds
    console.log('current bounds ref', bounds)
  }

  return (
    // filtered data 
    <CrossfilterProvider data={data} filters={filters}>
    {/* header */}
    <Layout>
      {/* name of the page */}
        <SEO title="Explore" />
        {/* component to wrap all content below the header into it */}
        <Wrapper>
          {/* sidebar */}
            <Sidebar allowScroll={false}>
              {/* if the selectedId isn't null, use it to access the details of every listed region  */}
              {selectedId !== null ? (
                <RegionDetails
                  // referencing the data to use
                  {...index.get(selectedId.toString()).toJS()}
                  // showZoom={showZoom} for the defunct Zoom to Region button
                  // supplying onBack functionality w/ handleBack
                  // onBack, the selectedId is null
                  // which returns you back to the listed items view
                  onBack={handleBack}
                  // supplying onZoomTo functionality w/ handleZoomTo
                  // which is now defunct
                  // onZoomTo={handleZoomTo}
                />
                // if the selectedId is null
                // no access to view details of the listed item
              ) : (
                <>
                  <SidebarHeader title="Explore Environmental Justice Hotspots" icon="map" />
                      <Help>
                      Click on a county or census tract in the list below. Or use the map to navigate and explore data used to calculate the environmental justice risk score.
                      </Help>
                      {/* show list of regions */}
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
