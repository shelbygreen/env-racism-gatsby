// Classify a value into an index depending on what range it falls into
// ranges: [[rangeMin, rangeMax], ..., ]
export const classify = (value, ranges) => {
    let i = 0
    for (i; i < ranges.length; i += 1) {
      if (value >= ranges[i][0] && value < ranges[i][1]) {
        break
      }
    }
    return i
  }
  
  /**
   * Converts an array of ['key:value', ...] to {key: value, }
   * @param {Array of strings} entries - array of ['key:value', ...]
   * @param {function} modifier - modifier function called for each value (optional)
   */
  export const packedToObject = (entries, modifier) =>
    entries.reduce((result, part) => {
      const [key, value] = part.split(':')
      /* eslint-disable no-param-reassign */
      result[key] = modifier ? modifier(value) : value
      return result
    }, {})
  
  /** Flatten an array of arrays into a single array
   * @param {Array of Arrays} - arrays
   */
  export const flatten = arrays =>
    arrays.reduce((result, entry) => result.concat(...entry), [])
  
  /**
   * Index an array on index field, and return an object with
   * values of index field as keys.
   * @param {Array} data
   * @param {String} indexField
   * @param {function} getValue - if present, values are passed into
   * this function for further processing to extract values of interest
   */
  export const indexBy = (data, indexField, getValue = null) =>
    data.reduce(
      (prev, { [indexField]: id, ...rest }) =>
        Object.assign(prev, { [id]: getValue ? getValue(rest) : rest }),
      {}
    )
  