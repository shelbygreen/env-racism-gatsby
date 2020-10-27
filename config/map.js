/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ"
  }

export const sources = {
  counties: {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-gatsby/master/data/geocounty_cumulative_score.geojson',
    generateId: true
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
            [0, "#ffffff"],
            [10, "rgb(253,231,37)"],
            [20, "rgb(180,222,44)"],
            [30, "rgb(109,205,89)"],
            [40, "rgb(53,183,121)"],
            [50, "rgb(31,158,137)"],
            [60, "rgb(38,130,142)"],
            [70, "rgb(49,104,142)"],
            [80, "rgb(62,74,137)"],
            [90, "rgb(72,40,120)"],
            [100, "rgb(68,1,84)"]
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