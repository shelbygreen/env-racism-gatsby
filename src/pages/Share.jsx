import React from 'react'

import SEO from '../components/seo'
import { Flex } from '../components/Grid'
import styled, { themeGet } from '../../util/style'
import Layout from "../components/Layout/index"
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import { Section, Title } from '../../util/style/styles'
import Feedback from '../components/Form/Feedback'
import ShareMap from '../components/Map/ShareMap'

const Help = styled(Flex)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Wrapper = styled(Flex)`
  height: 100%;
`


const Share = () => {
    return (
        <Layout>
            <SEO title="Share" />
            <Wrapper>
                <Sidebar allowScroll={true}>
                  <SidebarHeader title="Data is abstract." icon=""/>
                    <Help>Especially data that summarizes humans and their social conditions. Without the added layer of emotion and urgency, data is weightless. 
                      We need your voice to add a human element to numbers. To understand how harmful it is to surround neighborhoods with highways.
                      To realize how irresponsible it is to site landfills in predominantly low-income communities. To agree that it's unacceptable to allow
                      waste and pollution to accumulate in any community, yet alone vulnerable ones.
                    </Help>
                    <Feedback allowScroll={true} />
                </Sidebar>
                <ShareMap/>
            </Wrapper>
        </Layout>
    )
}

export default Share