/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ"
  }

export const sources = {
  counties: {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/county_population_score.json'
  },
}

export const layers = [
  {
    id: "counties-fill",
    source: "counties",
    type: 'fill',
    paint: {
      "fill-color": {
        property: 'score', // colors coded by the 'score' attribute
          stops: [
            [1, "rgb(253,231,37)"],
            [2, "rgb(180,222,44)"],
            [3, "rgb(109,205,89)"],
            [4, "rgb(53,183,121)"],
            [5, "rgb(31,158,137)"],
            [6, "rgb(38,130,142)"],
            [7, "rgb(49,104,142)"],
            [8, "rgb(62,74,137)"],
            [9, "rgb(72,40,120)"],
            [10, "rgb(68,1,84)"]
          ]
        },
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.7,
        0.7
      ]
    },
  },
]