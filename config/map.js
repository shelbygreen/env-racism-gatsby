/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ",
    bounds: [-106.645646,25.837377,-93.508292,36.500704],
    styles: ['light-v10', 'satellite-streets-v11'],
    minZoom: 2,
    padding: 0.1
}

// sources for vector tiles
export const sources = {
  counties: {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-gatsby/master/data/georegions.geojson',
    // generateId: true
  },
  tracts: {
    // type: 'vector',
    // url: 'mapbox://shelby-green.txejtracts'
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-gatsby/master/data/georegions.geojson',
    // generateId: true
  },
  facilities: {
    type: 'geojson', 
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/facility.geojson',
    cluster: true, 
    clusterMaxZoom: 10,
    clusterRadius: 45,
    generateId: true
  }

}

// styled layers
export const layers = [
  {
    id: "counties-fill",
    source: "counties",
    type: 'fill',
    maxzoom: 18,
    layout: {
      visibility: 'visible',
    },
    filter: ["==", "type", "county"],
    paint: {
      "fill-color": {
        property: 'final_score', // colors coded by the 'score' attribute
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
    maxzoom: 18,
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
    // 'source-layer': 'txej_ct',
    type: 'fill',
    maxzoom: 18,
    layout: {
      visibility: 'none',
    },
    filter: ["==", "type", "tract"],
    paint: {
      "fill-color": {
        property: 'final_score', // colors coded by the EJ score 
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
    id: 'clusters', // clustered facilities
    source: 'facilities', 
    type: 'circle', 
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'match',
        ['get', 'site_type'],
        'superfund',
        '#FFC527', 
        'toxic release inventory', 
        '#006fbe', 
        /*other*/ "#000"
      ],
      'circle-radius': 12, 
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'points', // unclustered facilities
    source: 'facilities',
    type: 'circle',
    maxZoom: 15,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [
        'match',
        ['get', 'site_type'],
        'superfund',
        '#FFC527', 
        'toxic release inventory', 
        '#006fbe', 
        /*other*/ "#000"
      ],
      'circle-radius': 6,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFFFFF'
    }
  },
  {
    id: 'clusters-label', // label for facilities clusters
    type: 'symbol',
    source: 'facilities',
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
]

// legends
export const legends = {
  clusters: {
    getLegend: () => [
    {
      type: 'circle',
      radius: 12,
      label: 'Sites Cluster. Zoom in to see the sites.',
      color: '#000000',
      borderColor: '#FFF',
      borderWidth: 1,
    }
  ],
  },
  points: {
    getLegend: () => [
      {
        type: 'circle',
        radius: 12,
        label: 'Industrial TRI Site',
        color: '#006fbe',
        borderColor: '#FFF',
        borderWidth: 1,
      },
      {
        type: 'circle',
        radius: 12,
        label: 'Superfund Site',
        color: '#FFC527', 
        borderColor: '#FFF',
        borderWidth: 1,
      },
    ],
  },
}