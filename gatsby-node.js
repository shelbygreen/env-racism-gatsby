//  creating dynamic factsheet pages
//  * via: https://hasura.io/blog/building-a-dynamic-listing-web-app-with-pagination-and-dynamic-pages-using-gatsby-2ddee9ec2dc3/
//  * and: https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/
//  * and: https://egghead.io/lessons/gatsby-build-a-blog-post-template-with-graphql-and-gatsby

const path = require("path") // use path library for navigation

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    // Query for allRegionJson nodes to use in creating the factsheet pages for every county.
    const result = await graphql(`
        {
          allRegionsJson {
            edges {
              node {
                  county
              }
            }
          }
        }
      `)
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    // Create pages for each county factsheet.
    const factsheetTemplate = path.resolve(`src/components/Factsheet/index.jsx`) // factsheet query and template
    result.data.allRegionsJson.edges.forEach(({ node }) => {
      const path = `Factsheet/${node.county.replace(/\s+/g, '-')}` // dynamic path of the county factsheet, .replace(/\s+/g, '-')
      createPage({
        path,
        component: factsheetTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          pagePath: node.county,
        },
      })
    })
}
