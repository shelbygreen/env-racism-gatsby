import React from 'react'
import SEO from '../components/seo'
import { Flex } from '../components/Grid'
import styled, { themeGet } from '../../util/style'
import Layout from "../components/Layout/index"
import Sidebar, { SidebarHeader } from '../components/Sidebar'
import { Section, Title } from '../../util/style/styles'
import Feedback from '../components/Form/Feedback'
// import ShareForm from '../components/Form/Form'
import ShareMap from '../components/Map/ShareMap'

const Help = styled(Flex)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Wrapper = styled(Flex)`
  height: 100%;
`
// const [{ latitude, longitude}, setSelectedCoordinates] = useState({latitude:-93.508292, longitude:36.500704})

// const handleCoordinates = coordinates => {
//     console.log('onSelect', coordinates)
//     setSelectedCoordinates({
//         latitude: coordinates.lat,
//         longitude: coordinates.lng
//     })
// }

const Share = () => {
    return (
        <Layout>
            <SEO title="Share" />
            <Wrapper>
                <Sidebar allowScroll={true}>
                  <SidebarHeader title="Data is abstract." icon=""/>
                    <Help>
                      Pollution is personal. Please share your experience with pollution in Texas to help us shine light on the people behind this data -- and to help call for change.
                      <br/><br/>
                      No experience is trivial! We want to hear about how you’ve been impacted by environmental harms -- from refineries, fracking pads, and polluting facilities, to landfills, dumping sites, highways, unsafe buildings. and more. What do you notice about the places you live, learn, and work?
                      <br/><br/>
                      Note: all of these questions are optional. Please share as much as you are comfortable with. We will review the submission and then display it on the map. 
                    </Help>
                    <Feedback 
                      allowScroll={true} />
                    {/* <ShareForm/> */}
                </Sidebar>
                <ShareMap/>
            </Wrapper>
        </Layout>
    )
}

export default Share