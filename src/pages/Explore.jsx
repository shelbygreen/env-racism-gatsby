import React from 'react'

import SEO from "../components/seo"
import Layout from "../components/Layout/index"
import Map from "../components/Map/index"
import { Flex } from '../components/Grid'
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import ExpandableParagraph from '../components/Elements/ExpandableParagraph'
import styled, { themeGet } from '../../util/style'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Help = styled(ExpandableParagraph)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Explore = () => {
    return (
    <Layout>
        <SEO title="Explore" />
        <Wrapper>
            <Sidebar allowScroll={false}>
                <SidebarHeader title="Explore Regions" icon="map" />
                    <Help
                    snippet="Click on a region in the list below or on the map for more
                    detailed information."
                    >
                    Click on a region in the list below or on the map for more
                    detailed information. Use the buttons to toggle between displaying 
                    counties and census tracts. The list below only shows
                    regions visible on the map. Zoom out if you want to see more regions, 
                    and zoom in if you want to less.
                    </Help>
            </Sidebar>
            {/* <Map /> */}
        </Wrapper>
    </Layout>
    )
}
export default Explore