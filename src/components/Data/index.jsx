import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */
export const useData = () => {
    const data = useStaticQuery(graphql`
      query CountiesDataQuery {
        allCountiesJson {
          edges {
            node {
                id
                name
                county
                bounds
            }
          }
        }
      }
    `).allCountiesJson.edges.map(({ node }) => {
      // parse data types as needed
      const { id } = node
  
      return {
        ...node,
  
        // convert id back to integer
        id: parseInt(id, 10)
      }
    })
  
    // Create index of data by ID
    const index = data.reduce((result, item) => {
      /* eslint-disable no-param-reassign */
      result[item.id] = item
      return result
    }, {})
  
    if (isDebug) {
      window.data = data
      window.index = index
    }
  
    // return data as immutable objects
    return [fromJS(data), fromJS(index)]
  }