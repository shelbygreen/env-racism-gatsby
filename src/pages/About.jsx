import React from 'react'
import SEO from '../components/seo'
import { Box, Flex } from '../components/Grid'
import { Text, Image } from 'rebass'
import { Link } from 'gatsby'
import { OutboundLink } from '../components/Link'
import styled, { themeGet } from '../../util/style'
import { Section, Title } from '../../util/style/styles'
import TRLogo from '../images/primary_txr_logo.png'
import CCLogo from '../images/cce_logo.jpg'

const Wrapper = styled(Box).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  padding: 0.75rem 0.5rem;
  flex: 0 0 auto;
  width: 500px;
  border: 1px solid ${themeGet('colors.highlight.100')};
`

const Button = styled.div`
  font-size: 22px;
  background-color: #030303 !important;
  height: 30px;
  width: 500px;
`

const TXLogo = styled(Image).attrs({
  src: TRLogo,
  as: 'img',
  width: '100rem',
  height: '60rem',
  my: '-0.5rem',
  mr: '0.25rem',
})``

const CCELogo = styled(Image).attrs({
  src: CCLogo,
  as: 'img',
  width: '100rem',
  height: '60rem',
  my: '-0.5rem',
  mr: '0.25rem',
})``

// About component, contains purpose of the map and link to the Explore page
const About = () => (
  <center>
  <Section>
    <SEO title="About" />
    <Wrapper>
    <Title><center>The Texas Environmental Justice Explorer</center></Title>
      <Text fontSize={'0.8rem'}>
        Everyone deserves clean air to breathe, clean water to drink, and a healthy environment to live in. Unfortunately, Texans are negatively impacted by pollution and climate change every single day -- and these impacts are not distributed evenly.
        <br/>
        <br/>
        The data is clear: the most vulnerable communities are also the most likely to be exposed to polluted air and water. Across the state, <b>pollution hotspots are concentrated around the places that low-income and minority populations call home.</b>
        <br/>
        <br/>
        This map allows you to <b>explore the uneven social and environmental burdens faced by every county in Texas</b>. Click on a county to <b>see its “cumulative risk score”</b> (based on local pollution, demographic data, and health indicators). And <b>use the “Share your Story” feature to add your personal experience to the map</b>. 
        <br/>
        <br/>
        Built by <OutboundLink to='https://www.climatecabineteducation.org' from='/'>Climate Cabinet Education</OutboundLink> in partnership with <OutboundLink to='https://www.txrising.org' from='/'>Texas Rising</OutboundLink>.
      </Text>
        <center>
          <br/>
          <OutboundLink to='https://www.climatecabineteducation.org' from='/'><CCELogo/></OutboundLink>
          <OutboundLink to='https://www.txrising.org' from='/'><TXLogo/></OutboundLink>
        </center>
    </Wrapper>
    <br/>
    <Button>
      <Title><Link to="/Explore">BEGIN EXPLORING</Link></Title>
    </Button>
  </Section>
  </center>
)

export default About