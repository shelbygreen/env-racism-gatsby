/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ",
    bounds: [-106.645646,25.837377,-93.508292,36.500704],
    minZoom: 2,
    padding: 0.1
  }

// sources for vector tiles
export const sources = {
  counties: {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/geocounty_cumulative_score.json',
    // generateId: true
  },
  tracts: {
    type: 'vector',
    url: 'mapbox://shelby-green.txejtracts'
  },
  sf: {
    type: 'geojson', 
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/sf_county.geojson',
    cluster: true, 
    clusterMaxZoom: 10,
    clusterRadius: 45,
    generateId: true
  },
  tri: {
    type: 'geojson', 
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/tri_county.geojson',
    cluster: true, 
    clusterMaxZoom: 10,
    clusterRadius: 45,
    generateId: true
  },
  hw: {
    type: 'geojson', 
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/hw_county.geojson',
    cluster: true, 
    clusterMaxZoom: 10,
    clusterRadius: 45,
    generateId: true
  },

}

// cluster information
// const clusters = [
//   {
//     threshold: 10,
//     label: '< 10 estuaries',
//     color: '#74a9cf',
//     borderColor: '#2b8cbe',
//     radius: defaultRadius,
//   },
//   {
//     threshold: 100,
//     label: '10 - 100 estuaries',
//     color: '#2b8cbe',
//     borderColor: '#045a8d',
//     radius: 20,
//   },
//   {
//     threshold: Infinity,
//     label: '> 100 estuaries',
//     color: '#045a8d',
//     borderColor: '#000',
//     radius: 25,
//   },
// ]
// const clusterRadii = createSteps(clusters, 'radius')

// styled layers
export const layers = [
  {
    id: "counties-fill",
    source: "counties",
    type: 'fill',
    layout: {
      visibility: 'visible',
    },
    paint: {
      "fill-color": {
        property: 'cmlscore', // colors coded by the 'score' attribute
          stops: [
            [1, "rgb(253,231,37)"],
            [10, "rgb(180,222,44)"],
            [20, "rgb(109,205,89)"],
            [30, "rgb(53,183,121)"],
            [40, "rgb(31,158,137)"],
            [50, "rgb(38,130,142)"],
            [60, "rgb(49,104,142)"],
            [70, "rgb(62,74,137)"],
            [80, "rgb(72,40,120)"],
            [90, "rgb(68,1,84)"]
          ]
        },
      'fill-opacity': 0.75
    }, 
  },
  {
    id: 'counties-outline-highlight',
    source: 'counties',
    // minzoom: 4,
    // maxzoom: 22,
    type: 'line',
    filter: ['in', 'name', ''],
    paint: {
      'line-color': '#ffffff', 
      'line-width': 2
    },
  },
  {
    id: "tracts-fill",
    source: "tracts",
    'source-layer': 'txej_ct',
    type: 'fill',
    // minzoom: 8,
    layout: {
      visibility: 'none',
    },
    paint: {
      "fill-color": {
        property: 'final_rank', // colors coded by the EJ score 
          stops: [
            [1, "rgb(253,231,37)"],
            [10, "rgb(180,222,44)"],
            [20, "rgb(109,205,89)"],
            [30, "rgb(53,183,121)"],
            [40, "rgb(31,158,137)"],
            [50, "rgb(38,130,142)"],
            [60, "rgb(49,104,142)"],
            [70, "rgb(62,74,137)"],
            [80, "rgb(72,40,120)"],
            [90, "rgb(68,1,84)"]
          ]
        },
      'fill-opacity': 0.75
    }, 
  },
  {
    id: 'sf-clusters', // clustered sf sites
    source: 'sf', 
    type: 'circle', 
    filter: ['has', 'point_count'], // double check this
    paint: {
      'circle-color': "#FFC527",
      'circle-radius': 12, 
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'sf-points', // unclustered sf sites
    source: 'sf',
    type: 'circle',
    maxZoom: 15,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#FFC527', 
      'circle-radius': 3,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'sf-clusters-label',
    type: 'symbol',
    source: 'sf',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 10,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    },
    paint: {
      'text-color': '#FFFFFF',
      'text-opacity': 1,
      'text-halo-color': '#000',
      'text-halo-blur': 1,
      'text-halo-width': 0.5,
    }
  },
  {
    id: 'tri-clusters', // clustered tri sites
    source: 'tri', 
    type: 'circle', 
    filter: ['has', 'point_count'], 
    paint: {
      'circle-color': "#008000",
      'circle-radius': 12, 
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'tri-points', // unclustered tri sites
    source: 'tri',
    type: 'circle',
    maxZoom: 15,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#008000', 
      'circle-radius': 3,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'tri-clusters-label',
    type: 'symbol',
    source: 'tri',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 10,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    },
    paint: {
      'text-color': '#FFFFFF',
      'text-opacity': 1,
      'text-halo-color': '#000',
      'text-halo-blur': 1,
      'text-halo-width': 0.5,
    }
  },
  {
    id: 'hw-clusters', // clustered hw sites
    source: 'hw', 
    type: 'circle', 
    filter: ['has', 'point_count'], 
    paint: {
      'circle-color': "#FF5733",
      'circle-radius': 12, 
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'hw-points', // unclustered hw sites
    source: 'hw',
    type: 'circle',
    maxZoom: 15,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#FF5733', 
      'circle-radius': 3,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'hw-clusters-label',
    type: 'symbol',
    source: 'hw',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 10,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    },
    paint: {
      'text-color': '#FFFFFF',
      'text-opacity': 1,
      'text-halo-color': '#000',
      'text-halo-blur': 1,
      'text-halo-width': 0.5,
    }
  }
]