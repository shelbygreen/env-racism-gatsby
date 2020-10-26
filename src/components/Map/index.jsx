import React, { useEffect, useRef } from "react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl/dist/mapbox-gl.js'
import styled from '../../../util/style'
import { siteMetadata } from '../../../gatsby-config'
import { hasWindow } from '../../../util/dom'

// container for the map component
const Wrapper = styled.div`
  position: relative;
  flex: 1 0 auto;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const Map = () => {
    const { mapboxToken } = siteMetadata

    if (!mapboxToken) {
        console.error(
            'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
        )
    }
    
    // if there is no window, we cannot render this component
    if (!hasWindow) {
        return null
    }

    // this ref holds the map DOM node so that we can pass it into Mapbox GL
    const mapNode = useRef(null)

    // this ref holds the map object once we have instantiated it, so that we
    // can use it in other hooks
    const mapRef = useRef(null)
    
    useEffect(() => {
        // mapboxgl access token
        mapboxgl.accessToken = mapboxToken

        const map = new mapboxgl.Map({
            container: mapNode.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-99.514301, 31.616819],
            zoom: 5
        })

        // detect the map's new width and height and resize it
        map.resize();

        // navigation control on the top right
        map.addControl(new mapboxgl.NavigationControl())
    })

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100vw', height: '100vh' }} />
        </Wrapper>
    )
}

export default Map