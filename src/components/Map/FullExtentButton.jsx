import React from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { Flex } from '../Grid'
import styled from '../../../util/style'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 145px;
  width: 30px;
  height: 30px;
  z-index: 999;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgb(216, 216, 216);
`

const Icon = styled(FaExternalLinkAlt)`
  width: 1em;
  height: 1em;
`

const FullExtentButton = ({ onClick }) => (
  <Wrapper onClick={onClick} title="Zoom to full extent">
    <Icon />
  </Wrapper>
)

FullExtentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default FullExtentButton