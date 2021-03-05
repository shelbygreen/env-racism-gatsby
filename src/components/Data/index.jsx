import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'
import { isDebug } from '../../../util/dom'

/**
 * Custom react hook to wrap getting data using GraphQL in gatsby
 * Returns [data, index]
 */
export const useData = () => {
    const data = useStaticQuery(graphql`
      query RegionsDataQuery {
        allRegionsJson {
          edges {
            node {
              id 
              bounds
              type
              name
              county
              total_pop
              lead_score
              chem_score
              hazw_score
              cln_score
              wat_score
              ozn_score
              pm25_score
              dsl_score
              traf_score
              txcs_score
              pbn_score
              hbrd_score
              nohs_score
              liso_score
              unem_score
              poc_score
              pov_score
              pop_score
              final_score
              final_rank
            }
          }
        }
      }
    `).allRegionsJson.edges.map(({ node }) => {
      // parse data types as needed
      const { id } = node
  
      return {
        ...node,
  
        // convert id to integer
        id: parseInt(id, 10)
      }
    })
  
    // Create index of data by id
    const index = data.reduce((result, item) => {
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