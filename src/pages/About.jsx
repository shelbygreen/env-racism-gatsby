import React from 'react'

import SEO from '../components/seo'
import { Box, Flex } from '../components/Grid'
// import { Button } from '../components/Button'
import { Text } from 'rebass'
import { Link } from 'gatsby'
import styled, { themeGet } from '../../util/style'
import { Section, Title } from '../../util/style/styles'

const Wrapper = styled(Box).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  padding: 0.75rem 0.5rem;
  flex: 0 0 auto;
  width: 400px;
  border: 1px solid ${themeGet('colors.grey.900')};
`

const Button = styled.div`
  color: ${themeGet('colors.grey.900')};
  border-bottom-color: transparent;
  background-color: #fff !important;
  border: 1px solid ${themeGet('colors.grey.900')}
`

const About = () => (
  <center>
  <Section>
    <SEO title="About" />
    <Wrapper>
    <Title><center>The Texas Environmental Justice Explorer</center></Title>
      <Text fontSize={'0.8rem'}>
        <i>Which communities in Texas are disproportionately exposed to, and burdened by, environmental pollutants and hazards?</i>
        <br/>
        <br/>
        The <b>Texas Environmental Justice Explorer</b> answers this question by aggregating data on pollution, demographics, and health to estimate environmental inequality.
        Using that data, we've made our own cumulative risk score to capture how unequal the polluation impacts are across Texas communities.
        <br/>
        <br/>
        With evidence of the gap between light and dark, upper and lower, valuable and disposable, we can work together to bridge the divide and bring resources to the communities that need it most.
      </Text>
      <br/>
        <center>
        <Button>
          <Link to="/Explore">BEGIN EXPLORING</Link>
        </Button>
        </center>
    </Wrapper>
  </Section>
  </center>
)

export default About