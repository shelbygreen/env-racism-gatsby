import React from 'react'

import SEO from '../components/seo'
import { Flex } from '../components/Grid'
import styled, { themeGet } from '../../util/style'
import Layout from "../components/Layout/index"
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import { Section, Title } from '../../util/style/styles'
import Feedback from '../components/Form/Feedback'
import ShareMap from '../components/Map/ShareMap'

const Columns = styled(Flex).attrs({
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})``

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
                <Sidebar allowScroll={false}>
                    <Feedback />
                </Sidebar>
                <ShareMap/>
            </Wrapper>
        </Layout>
    )
}

export default Share