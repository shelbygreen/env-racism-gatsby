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

const Test = styled(Field)`
  width: 425px;
`

const text = "Click a point on the map for your story's location"
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
  window.alert("Thank you for sharing your story! We’ll moderate then post your story, first name, and rough location publicly alongside others.")
}

const Feedback = () => (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Question>What environmental concerns do you have about your community?</Question>
                <Select>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="air"
                  />{' '}
                  smog and air pollution
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="chemicals"
                  />{' '}
                  chemical spills
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="water"
                  />{' '}
                  water pollution
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="parks"
                  />{' '}
                  lack of trees, parks and/or open spaces
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="floods"
                  />{' '}
                  flooding
                  <br/>
                  <Field
                    name="concerns"
                    component="input"
                    type="checkbox"
                    value="waste"
                  />{' '}
                  illegal dumping and waste sites
                  <br/>
                </Select>
                <br/>
              <Question>How has environmental hazards affected your community?</Question>
                <Input name="ej" component="textarea" placeholder="" />
              <Question>What changes would you like to see to address this problem? Are you aware of efforts to make this change - and if so, what has been the response?</Question>
                <Input name="visions" component="textarea" placeholder="" />
              <Question>What was it like experiencing Winter Storm Uri?</Question>
                <Input name="storm" component="textarea" placeholder="" />
            <SubmitBox>
            <Info>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
              /><br/><br/>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
            </Info>
            <br/>
              <Test
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Email"
                /> 
              <br/><br/>
              <Test
                name="zipcode"
                component="input"
                type="text"
                placeholder={text}
              />
            <br /> <br />
            <Field name="post" component="input" type="checkbox" /> Post my story <br />
            <Field name="cta" component="input" type="checkbox" /> Email me about advocacy efforts happening in my area <br />
            </SubmitBox>
            <center><div className="buttons">
              <button 
                type="submit"
                disabled={submitting || pristine}
              >
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