import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// import 'mapbox-gl/dist/mapbox-gl.js'
import styled from '../../../util/style'
import { indexBy } from '../../../util/data'
import { getCenterAndZoom, groupByLayer } from '../../../util/map'
import { sources, layers, legends, config } from '../../../config/map'
import { siteMetadata } from '../../../gatsby-config'
import { hasWindow } from '../../../util/dom'
import FullExtentButton from './FullExtentButton'
import Legend from './Legend'
import LayerToggle from './LayerToggle'
import StyleSelector from './StyleSelector'

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

    // importing mapbox styles for the style selector
    const { styles } = config

    // this ref holds the map DOM node so that we can pass it into Mapbox GL
    const mapNode = useRef(null)

    // this ref holds the map object once we have instantiated it, so that we
    // can use it in other hooks
    const mapRef = useRef(null)

    const baseStyleRef = useRef(null)

    const selectedFeatureRef = useRef(selectedFeature)

    const [legendEntries, setLegendEntries] = useState([])
    
    const index = useMemo(() => indexBy(data.toJS(), 'id'), [data])

    const [activeLayer, setActiveLayer] = useState('counties')

    useEffect(() => {
        const { padding, bounds: initBounds } = config

        let { center, zoom } = config

        const targetBounds = bounds.isEmpty() ? initBounds : bounds.toJS()

        // If bounds are available, use these to establish center and zoom when map first loads
        if (targetBounds && targetBounds.length === 4) {
            const {
            current: { offsetWidth, offsetHeight },
            } = mapNode
  
            const { center: boundsCenter, zoom: boundsZoom } = getCenterAndZoom(
            targetBounds,
            offsetWidth,
            offsetHeight,
            padding
            )
            center = boundsCenter
            zoom = boundsZoom
        }

        // mapboxgl access token
        mapboxgl.accessToken = 'pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ'

        const map = new mapboxgl.Map({
            container: mapNode.current,
            style: `mapbox://styles/mapbox/${styles[0]}`,
            center: center || [0,0],
            zoom: zoom || 0, 
            minZoom: config.minZoom || 0
        })

        mapRef.current = map
        window.map = map

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

        // get id of feature on click
        map.on('click', e => {
            const [feature] = map.queryRenderedFeatures(e.point, {
                layers: ['clusters', 'points'], //TODO: add 'counties-fill' layer
            })
    
            if (!feature) return
            const {
                layer: { id: layerId },
                properties,
            } = feature
    
            onSelectFeature(properties.geoid)
            // if (layerId === 'counties-fill') {
            //     onSelectFeature(properties.id)
            // } else {
            //     onSelectFeature(properties.geoid)
            // }
        })

        // clicking on clusters zooms in
        map.on('click', 'clusters', e => {
            const [feature] = map.queryRenderedFeatures(e.point, {
                layers: ['clusters'],
            })
            map
                .getSource('facilities')
                .getClusterExpansionZoom(
                    feature.properties.cluster_id,
                    (err, targetZoom) => {
                        if (err) return
  
                        map.easeTo({
                            center: feature.geometry.coordinates,
                            zoom: targetZoom + 1,
                        })
                    }
                )
        })

        // styling for tooltip
        const tooltip = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            anchor: 'left',
            offset: 20,
        })

        // show tooltip for points on click
        map.on('click', 'points', function (e) {
            // contents of the tooltip
            const name = e.features[0].properties.name
            const url = e.features[0].properties.url
    
            tooltip
                .setLngLat(e.lngLat)
                .setHTML(`<h4>${name}</h4>Click <a href="${url}">here</a> to navigate to the EPA Database for more information about this site.`)
                .addTo(map)
        })

        // change cursor to pointer when mouse is over a facility point
        map.on('mouseenter', 'points', function () {
            map.getCanvas().style.cursor = 'pointer';
        })

        // change cursor back when the mouse leaves the facility point
        map.on('mouseleave', 'places', function() {
            map.getCanvas().style.cursor = '';
        })

        // updates the list to show the visible regions
        map.on('moveend', () => {
            const [lowerLeft, upperRight] = map.getBounds().toArray()
            onBoundsChange(lowerLeft.concat(upperRight))
        })

        map.on('idle', () => {
            // update legend after drawing layers
            setLegendEntries(getLegendEntries())
        })

        return () => {
            map.remove()
        }
    }, [])

    // Update selected point / polygon
    useEffect(() => {
        selectedFeatureRef.current = selectedFeature

        const { current: map } = mapRef
        if (!(map && map.isStyleLoaded())) return

        map.setFilter('counties-outline-highlight', ['==', 'id', selectedFeature || Infinity])
    }, [selectedFeature])

    // update bounds to match incoming bounds
    useEffect(() => {
        if (!bounds.isEmpty()) {
            const { current: map } = mapRef

            if (!map) return
            
            map.fitBounds(bounds.toJS(), { padding: 20, maxZoom: 14, duration: 2000 })
        }
    }, [bounds])

    // updating layer hightlighting and legends
    const getLegendEntries = () => {
        const { current: map } = mapRef
        // if (!(map && map.isStyleLoaded())) return []
        if (!(map)) return []

        const queryLayers = [
            'clusters',
            'points'
        ]

        // create an index that preserves the above order for sorting
        const layerIndex = { ...queryLayers }

        // Group layers with visible features
        const visibleFeatures = map.queryRenderedFeatures({ layers: queryLayers })
        const grouped = groupByLayer(visibleFeatures)

        // show points and clusters, when in view

        let entries = []
        Object.entries(grouped)
            .sort(([leftLayer], [rightLayer]) =>
                layerIndex[leftLayer] > layerIndex[rightLayer] ? -1 : 1
             )
            .forEach(([layer, features]) => {
                if (legends[layer]) {
                    entries = entries.concat(legends[layer].getLegend(features))
                }
            })

        return entries
    }

    // change map styles
    const handleBasemapChange = styleID => {
        const { current: map } = mapRef
        const { current: baseStyle } = baseStyleRef
    
        const snapshot = fromJS(map.getStyle())
        const baseSources = baseStyle.get('sources')
        const baseLayers = baseStyle.get('layers')
    
        // diff the sources and layers to find those added by the user
        const userSources = snapshot
          .get('sources')
          .filter((_, key) => !baseSources.has(key))
        const userLayers = snapshot
          .get('layers')
          .filter(layer => !baseLayers.includes(layer))
    
        map.setStyle(`mapbox://styles/mapbox/${styleID}`)
    
        map.once('style.load', () => {
          // after new style has loaded
          // save it so that we can diff with it on next change
          // and re-add the sources / layers back on it
    
          // save base for new style
          baseStyleRef.current = fromJS(map.getStyle())
    
          userSources.forEach((source, id) => {
            map.addSource(id, source.toJS())
          })
    
          userLayers.forEach(layer => {
            map.addLayer(layer.toJS())
          })
        })
      }    

    // full extent button
    const goToFullExtent = () => {
        const { current: map } = mapRef

        if (!(map && map.isStyleLoaded)) return

        map.fitBounds(config.bounds, { padding: 20, duration: 1000 })
    }

    // layer toggle button for counties and census tracts
    const handleLayerToggle = newLayer => {
        const { current: map } = mapRef

        if (!(map && map.isStyleLoaded)) return

        setActiveLayer(newLayer)

        const isCounty = newLayer === 'counties'
        map.setLayoutProperty(
            'counties-fill',
            'visibility',
            isCounty ? 'visible' : 'none'
        )
        map.setLayoutProperty(
            'tracts-fill',
            'visibility',
            isCounty ? 'none' : 'visible'
        )
    }

    return (
        <Wrapper>
            <div ref={mapNode} style={{ width: '100%', height: '100%' }}/>
            <Legend entries={legendEntries} />
            {mapRef.current && mapRef.current.isStyleLoaded && (
                <>
                    <LayerToggle
                        value={activeLayer}
                        options={[
                            {value:'counties', label: 'Counties'},
                            {value:'tracts', label:'Tracts'},
                        ]}
                        onChange={handleLayerToggle}
                    />
                    <StyleSelector
                        styles={styles}
                        // token={accessToken}
                        onChange={handleBasemapChange}
                    />
                    <FullExtentButton onClick={goToFullExtent} />
                </>
            )}
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