/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ"
  }

export const sources = {
  counties: {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/shelbygreen/env-racism-map/master/geocounty_cumulative_score.json',
    // generateId: true
  }
}

export const layers = [
  {
    id: "counties-fill",
    source: "counties",
    type: 'fill',
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
      'fill-opacity': 0.7
    },
  }
]