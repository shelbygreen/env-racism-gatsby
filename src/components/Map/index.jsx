import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl/dist/mapbox-gl.js'
import styled from '../../../util/style'
import { indexBy } from '../../../util/data'
import { sources, layers } from '../../../config/map'
import { siteMetadata } from '../../../gatsby-config'
import { hasWindow } from '../../../util/dom'

// container for the map component
const Wrapper = styled.div`
  position: relative;
  flex: 1 0 auto;
  z-index: 1;
`

const Map = ({ data, selectedFeature, bounds, onSelectFeature, onBoundsChange }) => {
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

    // importing accessToken and styles
    // const { accessToken } = config

    // this ref holds the map DOM node so that we can pass it into Mapbox GL
    const mapNode = useRef(null)

    // this ref holds the map object once we have instantiated it, so that we
    // can use it in other hooks
    const mapRef = useRef(null)

    const baseStyleRef = useRef(null)

    const selectedFeatureRef = useRef(selectedFeature)
    
    const index = useMemo(() => indexBy(data.toJS(), 'id'), [data])

    useEffect(() => {
        // mapboxgl access token
        mapboxgl.accessToken = 'pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ'

        const map = new mapboxgl.Map({
            container: mapNode.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-99.514301, 31.616819],
            zoom: 5
        })

        // navigation control
        map.addControl(new mapboxgl.NavigationControl())

        // locate and zoom to user location
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        )

        // adding layers to the map
        map.on("load", () => {
            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current

            // add every source
            Object.entries(sources).forEach(([id, source]) => {
                map.addSource(id, source)
            })

            // add every layer
            layers.forEach(layer => {
                map.addLayer(layer)
            })
            map.resize();
        })

        // styling for tooltip
        const tooltip = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: 'left',
            offset: 20,
        })

        // show tooltip for counties
        map.on('mousemove', 'counties-fill', function (e) {
            map.getCanvas().style.cursor = 'pointer'
            
            // contents of the tooltip
            const name = e.features[0].properties.name
            const score = e.features[0].properties.cmlscore
    
            tooltip
                .setLngLat(e.lngLat)
                .setHTML(`<b>${name}</b><br /><b>Cumulative Risk Score: </b>${score}`)
                .addTo(map)
    
        })
    
        // on click, zoom in for counties
        // map.on('click', 'counties-fill', function (e) {
        //     map.getCanvas().style.cursor = 'pointer'
            
        //     map.flyTo({ 
        //     center: e.lngLat, 
        //     zoom: 9,
        //     bearing: 0, 
        //     speed: 0.8, 
        //     curve: 1 })
        // })

        return () => {
            map.remove()
        }
    }, [])

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }} containerStyle={{height: '100%', weight: '100%'}} />
        </Wrapper>
    )
}

Map.propTypes = {
  data: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ).isRequired,
  bounds: ImmutablePropTypes.listOf(PropTypes.number),
  selectedFeature: PropTypes.number,
  onSelectFeature: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

Map.defaultProps = {
  bounds: List(),
  selectedFeature: null,
  onSelectFeature: () => {},
  onBoundsChange: () => {},
}

export default Map