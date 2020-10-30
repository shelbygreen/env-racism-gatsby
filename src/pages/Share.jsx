import React from 'react'

import SEO from '../components/seo'
import { Flex } from '../components/Grid'
import styled, { themeGet } from '../../util/style'
import Layout from "../components/Layout/index"
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import { Section, Title } from '../../util/style/styles'

const Columns = styled(Flex).attrs({
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})``

const Help = styled(Flex)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`


const Share = () => {
    return (
        <Layout>
            <SEO title="Share" />
            <Sidebar allowScroll={false}>
                <SidebarHeader title="Mapping Tool Feedback" icon="map" />
                    <Help>
                        Please share the experience you had while using the map. Your feedback will be used to improve the mapping tool before the official launch!
                    </Help>
                {/* form here */}
            </Sidebar>
        </Layout>
    )
}

export default Share