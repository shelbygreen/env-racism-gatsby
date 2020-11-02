import React from 'react'
import { render } from 'react-dom'
// import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import styled, { themeGet } from "../../../util/style"
import { Flex, Box } from "../Grid"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const Wrapper = styled(Flex)`
  height: 100%;
`
const Question = styled(Box)`
  font-size: 1.0rem;
  margin: 0 1rem 0rem;
  color: ${themeGet("colors.grey.700")};
`

const Input = styled(Field)`
  flex: 1 1 auto;
  font-size: 0.8rem;
  outline: none;
  border: none;
  padding: 0.1em 0.5em;
  color: ${themeGet("colors.grey.800")};
  display: block;
  width: 90%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  margin: 0 1rem 1rem;
  font-size: 14px;
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

const Feedback = () => (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <br/>
            <Question>How has environmental (in)justice affected your community?</Question>
              <Input name="ej" component="textarea" placeholder="" />
            <Question>I'm concerned about the ____ in my community:</Question>
                <Select>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="air"
                  />{' '}
                  air quality
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="water"
                  />{' '}
                  water quality
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="parks"
                  />{' '}
                  lack of parks and open spaces
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="grocery"
                  />{' '}
                  lack of quality and affordable grocery stores
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="transit"
                  />{' '}
                  public transportation options
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="vacant"
                  />{' '}
                  number of vacant lots
                  <br/>
                </Select>
                <br/>
              <Question>What do you enjoy about your community?</Question>
              <Input name="enjoy" component="textarea" placeholder="" />
              <Question>What do you want your community to look like 5 years from now?</Question>
              <Input name="want" component="textarea" placeholder="" />
            <center><div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div></center>
          </form>
        )}
      />
    </Wrapper>
)

export default Feedback