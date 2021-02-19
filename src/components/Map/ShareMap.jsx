import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl/dist/mapbox-gl.js'
import styled from '../../../util/style'
import { indexBy } from '../../../util/data'
import { getCenterAndZoom, groupByLayer } from '../../../util/map'
import { sources, layers,  config } from '../../../config/map'
import { siteMetadata } from '../../../gatsby-config'
import { hasWindow } from '../../../util/dom'
import FullExtentButton from './FullExtentButton'
import Legend from './Legend'

// container for the map component
const Wrapper = styled.div`
  position: relative;
  flex: 1 0 auto;
  z-index: 1;
`

const Sidebar = styled.div`
    position: absolute;
    overflow-y: auto;
    height: 200px;
    top: calc(47px + 30px);
    z-index: 4000;
    background-color: #fff;
    width: 340px;
    padding: 10px;
    border-radius: 0;
    color: #29323c;
    right: 30px;
    margin: auto;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
`


const ShareMap = ({ onClick }) => {
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

    const mapNode = useRef(null)

    useEffect(() => {
        // mapboxgl access token
        mapboxgl.accessToken = 'pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ'
        const stories = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'name': "Shelby Green",
                        'message': "Why is there a TRI facility located directly across from a school? In a majority black and brown neighborhood?",
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-96.8623239127825, 32.77864944501921]
                    }
                },
            ]}

        const map = new mapboxgl.Map({
            container: mapNode.current,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [-98.419172, 31.691066],
            zoom: 5, 
            minZoom: 2
        })

        // add (fetched) markers to the map
        map.on('load', () => {
            map.addSource('stories', {
                type: 'geojson',
                data: stories
            })

            map.addLayer({
                id:'stories-point',
                source:'stories',
                type:'circle',
                paint:{
                    'circle-color': '#000000',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#FFFFFF'
                }
            })

            // styling for tooltip
            const tooltip = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: false,
                anchor: 'left',
                offset: 20,
            })

            // coordinates
            // const tooltip = document.getElementById('info')

            // add pop-up
            map.on('click', 'stories-point', e => {
                // contents of the tooltip
                const name = e.features[0].properties.name
                const story = e.features[0].properties.message
    
            tooltip
                .setLngLat(e.lngLat)
                .setHTML(`<b>Name: ${name}</b> <br/> ${story}`)
                .addTo(map)

                // const html = `<b>Name: ${name}</b> <br/> ${story}`
                // tooltip.innerHTML = html
            })

            // change cursor to pointer when mouse is over a facility point
            map.on('mouseenter', 'stories-point', function () {
                map.getCanvas().style.cursor = 'pointer';
            })

            // change cursor back when the mouse leaves the facility point
            map.on('mouseleave', 'stories-point', function() {
                map.getCanvas().style.cursor = '';
            })

            // select and store coordinates
            // map.on('click', function (e) {
            //     document.getElementById('info').innerHTML =
            //     // e.point is the x, y coordinates of the mousemove event relative
            //     // to the top-left corner of the map
            //     JSON.stringify(e.point) +
            //     '<br />' +
            //     // e.lngLat is the longitude, latitude geographical position of the event
            //     JSON.stringify(e.lngLat.wrap());
            // });

        })

    })

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
            {/* <Sidebar>
                <div id="info">Coordinates:</div>
            </Sidebar> */}
        </Wrapper>
    )
}

export default ShareMap