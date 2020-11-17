import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image } from 'rebass'
import { FaMarker, FaBinoculars } from 'react-icons/fa'

import { Link } from 'gatsby'

import { Flex } from '../Grid'
import styled, { themeGet } from '../../../util/style'

// import SiteLogo from 'images/...'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  padding: 0.75rem 0.5rem;
  flex: 0 0 auto;
  border-bottom: 1px solid ${themeGet('colors.grey.900')};
`

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  flex-grow: 1;
  line-height: 1;

  & * {
    text-decoration: none;
  }
`

// const Logo = styled(Image).attrs({
//   src: SiteLogo,
//   as: 'img',
//   width: ['3rem'],
//   my: '-0.5rem',
//   mr: '0.25rem',
// })``

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 100;

  &:hover {
    text-decoration: underline;
  }
`

const NavItem = styled(Flex).attrs({
  alignItems: 'center',
  px: ['0.5em', '0.5rem', '1rem'],
})``

const ExploreIcon = styled(FaBinoculars)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const ShareIcon = styled(FaMarker)`
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
  opacity: 0.6;
`

const Header = ({ siteTitle }) => (
  <Wrapper as="header">
    <Title>
      <Link to="/">
        <Flex alignItems="center" flexWrap="wrap">
          {/* <Logo /> */}
          <Text fontSize={['1.5rem', '1.5rem', '1.75rem']}>{siteTitle}</Text>
        </Flex>
      </Link>
    </Title>
    <Text as="h2" fontSize={['1.25rem']} m={0}>
      <Flex>
      <NavLink to="/Explore">
          <NavItem>
            <ExploreIcon />
            <div>Explore</div>
          </NavItem>
        </NavLink>
        <NavLink to="/Share">
          <NavItem>
            <ShareIcon />
            Share Your Story
          </NavItem>
        </NavLink>
      </Flex>
    </Text>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header
