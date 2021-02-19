import React from 'react'
import { render } from 'react-dom'
// import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import styled, { themeGet } from "../../../util/style"
import { Flex, Box } from "../Grid"

const Wrapper = styled(Flex)`
  height: 100%;
`

const Question = styled(Box)`
  font-size: 1.0rem;
  margin: 0 1rem 0rem;
  color: ${themeGet("colors.primary.500")};
`

const Info = styled.div`
  display: block;
  flex-wrap: wrap;
  flex: 1 1 auto;
  width: 91%;
  margin: 10px 0px 5px 0px;
`

const SubmitBox = styled(Box)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet("colors.grey.700")};
  border-top: 1px solid ${themeGet('colors.grey.800')};
  border-padding: 1px;
  line-height: 1;
`

const Input = styled(Field)`
  flex: 1 1 auto;
  font-size: 0.8rem;
  outline: none;
  border: none;
  padding: 0.1em 0.5em;
  color: ${themeGet("colors.grey.800")};
  display: block;
  width: 91%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  margin: 0 1rem 1rem;
`

const Select = styled.label`
  display: block;
  width: 90%;
  height: 100px;
  padding: 5px 15px;
  margin: 0 1rem 1rem;
  font-size: 14px;
  color: ${themeGet("colors.grey.800")};
}
`

const ShareForm = () => (
    <Wrapper>
        the form goes here
    </Wrapper>
)

export default ShareForm